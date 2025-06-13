// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract AccessPassSystem is Ownable, ReentrancyGuard {
    // Constants
    uint256 public constant MAX_PASSES_PER_EVENT = 10000;
    uint256 public constant MAX_DURATION = 365 days;
    uint256 public constant MIN_DURATION = 1 hours;
    uint256 public constant MIN_IPFS_HASH_LENGTH = 44; // Minimum for CIDv0/v1
    uint256 public constant MAX_IPFS_HASH_LENGTH = 62; // Maximum reasonable length

    struct PassData {
        bool active;
        uint256 expiry;
        uint256 eventId;
        string accessLevel;
        bool exists; // Track if pass was ever created
    }

    struct EventData {
        uint256 price;
        uint256 duration;
        uint256 maxPasses;
        string ipfsHash;
        bool active;
    }

    // State variables
    mapping(address => mapping(uint256 => PassData)) public userPasses;
    mapping(uint256 => EventData) public events;
    mapping(address => uint256) public userPassCount;
    mapping(uint256 => uint256) public eventPassCount;
    mapping(uint256 => address[]) public eventPassHolders; // Track pass holders per event
    mapping(address => bool) public eventManagers;

    IERC20 public paymentToken;
    uint256 public nextEventId;
    address public treasury;

    // Events
    event PassCreated(
        address indexed user,
        uint256 indexed eventId,
        uint256 expiry
    );
    event PassExtended(
        address indexed user,
        uint256 indexed eventId,
        uint256 newExpiry
    );
    event PassRevoked(address indexed user, uint256 indexed eventId);
    event PassRenewed(
        address indexed user,
        uint256 indexed eventId,
        uint256 newExpiry
    );
    event EventCreated(uint256 indexed eventId, uint256 price, string ipfsHash);
    event EventUpdated(
        uint256 indexed eventId,
        uint256 newPrice,
        uint256 newDuration,
        uint256 newMaxPasses
    );
    event EventDeactivated(uint256 indexed eventId);
    event PaymentReceived(
        address indexed user,
        uint256 amount,
        uint256 indexed eventId
    );
    event PaymentTokenChanged(address oldToken, address newToken);
    event PaymentWithdrawn(address indexed recipient, uint256 value);
    event EventManagerAdded(address indexed manager);
    event EventManagerRemoved(address indexed manager);
    event TreasuryUpdated(
        address indexed oldTreasury,
        address indexed newTreasury
    );

    // Modifiers
    modifier onlyAdmin() {
        require(owner() == msg.sender, "Not Admin");
        _;
    }

    modifier onlyEventManager() {
        require(
            eventManagers[msg.sender] || owner() == msg.sender,
            "Not Event Manager"
        );
        _;
    }

    modifier validEvent(uint256 _eventId) {
        require(_eventId > 0 && _eventId < nextEventId, "Invalid Event ID");
        require(events[_eventId].active, "Event Not Active");
        _;
    }

    modifier passExists(address user, uint256 eventId) {
        require(userPasses[user][eventId].exists, "Pass does not exist");
        _;
    }

    modifier validAddress(address _address) {
        require(_address != address(0), "Invalid address");
        _;
    }

    // Constructor
    constructor(
        address _paymentToken,
        address _treasury
    ) Ownable(msg.sender) validAddress(_paymentToken) validAddress(_treasury) {
        paymentToken = IERC20(_paymentToken);
        treasury = _treasury;
        nextEventId = 1;
    }

    // Admin Functions
    function createEvent(
        uint256 price,
        uint256 duration,
        uint256 maxpass,
        string calldata ipfsHash
    ) external onlyAdmin {
        require(price > 0, "Price must be greater than 0");
        require(duration >= MIN_DURATION, "Duration below minimum");
        require(duration <= MAX_DURATION, "Duration exceeds maximum");
        require(
            maxpass > 0 && maxpass <= MAX_PASSES_PER_EVENT,
            "Invalid max passes"
        );
        require(_isValidIPFSHash(ipfsHash), "Invalid IPFS hash");

        events[nextEventId] = EventData({
            price: price,
            duration: duration,
            maxPasses: maxpass,
            ipfsHash: ipfsHash,
            active: true
        });

        emit EventCreated(nextEventId, price, ipfsHash);
        nextEventId++;
    }

    function updateEvent(
        uint256 eventId,
        uint256 _price,
        uint256 _duration,
        uint256 _maxpasses
    ) external onlyAdmin validEvent(eventId) {
        EventData storage ED = events[eventId];

        require(_price > 0, "Price must be greater than 0");
        require(_duration >= MIN_DURATION, "Duration below minimum");
        require(_duration <= MAX_DURATION, "Duration exceeds maximum");
        require(
            _maxpasses >= eventPassCount[eventId],
            "Cannot set max passes below current sold passes"
        );
        require(_maxpasses <= MAX_PASSES_PER_EVENT, "Max passes exceeds limit");

        ED.price = _price;
        ED.duration = _duration;
        ED.maxPasses = _maxpasses;

        emit EventUpdated(eventId, _price, _duration, _maxpasses);
    }

    function deactivateEvent(
        uint256 eventId
    ) external onlyAdmin validEvent(eventId) {
        events[eventId].active = false;
        emit EventDeactivated(eventId);
    }

    function revokePass(
        address user,
        uint256 eventId
    ) external onlyAdmin validEvent(eventId) passExists(user, eventId) {
        PassData storage pass = userPasses[user][eventId];
        require(pass.active, "Pass already deactivated");

        pass.active = false;

        if (userPassCount[user] > 0) {
            userPassCount[user]--;
        }
        if (eventPassCount[eventId] > 0) {
            eventPassCount[eventId]--;
        }

        emit PassRevoked(user, eventId);
    }

    function extendPass(
        address user,
        uint256 eventId,
        uint256 additionalTime
    ) external passExists(user, eventId) validEvent(eventId) onlyAdmin {
        PassData storage pass = userPasses[user][eventId];
        require(pass.active, "Pass is not active");
        require(additionalTime > 0, "Additional time must be greater than 0");
        require(
            additionalTime <= MAX_DURATION,
            "Additional time exceeds maximum"
        );

        if (pass.expiry > block.timestamp) {
            pass.expiry += additionalTime;
        } else {
            pass.expiry = block.timestamp + additionalTime;
        }

        emit PassExtended(user, eventId, pass.expiry);
    }

    function setPaymentToken(
        address tokenAddress
    ) external onlyAdmin validAddress(tokenAddress) {
        require(_isContract(tokenAddress), "Not a contract address");

        address oldToken = address(paymentToken);
        paymentToken = IERC20(tokenAddress);

        emit PaymentTokenChanged(oldToken, tokenAddress);
    }

    function setTreasury(
        address _treasury
    ) external onlyAdmin validAddress(_treasury) {
        address oldTreasury = treasury;
        treasury = _treasury;
        emit TreasuryUpdated(oldTreasury, _treasury);
    }

    function addEventManager(
        address manager
    ) external onlyAdmin validAddress(manager) {
        eventManagers[manager] = true;
        emit EventManagerAdded(manager);
    }

    function removeEventManager(address manager) external onlyAdmin {
        eventManagers[manager] = false;
        emit EventManagerRemoved(manager);
    }

    function withdrawFunds() external onlyAdmin {
        uint256 balance = paymentToken.balanceOf(address(this));
        require(balance > 0, "Insufficient balance");

        bool success = paymentToken.transfer(treasury, balance);
        require(success, "Transfer failed");

        emit PaymentWithdrawn(treasury, balance);
    }

    // User Functions
    function purchasePass(
        uint256 eventId
    ) external validEvent(eventId) nonReentrant {
        EventData storage ED = events[eventId];

        require(eventPassCount[eventId] < ED.maxPasses, "Event sold out");
        require(
            !userPasses[msg.sender][eventId].exists,
            "Pass already exists for this event"
        );

        _validatePayment(eventId, ED.price);
        _createPass(msg.sender, eventId);

        emit PaymentReceived(msg.sender, ED.price, eventId);
    }

    function renewPass(
        uint256 eventId
    )
        external
        validEvent(eventId)
        passExists(msg.sender, eventId)
        nonReentrant
    {
        PassData storage pass = userPasses[msg.sender][eventId];
        EventData storage ED = events[eventId];

        require(
            !pass.active || pass.expiry <= block.timestamp,
            "Pass is still active"
        );

        _validatePayment(eventId, ED.price);

        pass.active = true;
        pass.expiry = block.timestamp + ED.duration;

        emit PassRenewed(msg.sender, eventId, pass.expiry);
        emit PaymentReceived(msg.sender, ED.price, eventId);
    }

    // View Functions
    function isPassValid(
        address user,
        uint256 eventId
    ) external view returns (bool) {
        PassData storage pass = userPasses[user][eventId];
        return pass.exists && pass.active && pass.expiry > block.timestamp;
    }

    function getPassExpiry(
        address user,
        uint256 eventId
    ) external view passExists(user, eventId) returns (uint256) {
        return userPasses[user][eventId].expiry;
    }

    function getEventDetails(
        uint256 eventId
    ) external view returns (EventData memory) {
        require(eventId > 0 && eventId < nextEventId, "Invalid Event ID");
        return events[eventId];
    }

    function getUserActivePassCount(
        address user
    ) external view returns (uint256) {
        uint256 activeCount = 0;

        // Note: This is not gas-efficient for large numbers of events
        for (uint256 i = 1; i < nextEventId; i++) {
            PassData storage pass = userPasses[user][i];
            if (pass.exists && pass.active && pass.expiry > block.timestamp) {
                activeCount++;
            }
        }

        return activeCount;
    }

    function getUserPasses(
        address user
    ) external view returns (PassData[] memory userPassesArray) {
        // Count user's passes first
        uint256 passCount = 0;
        for (uint256 i = 1; i < nextEventId; i++) {
            if (userPasses[user][i].exists) {
                passCount++;
            }
        }

        // Create array and populate
        userPassesArray = new PassData[](passCount);
        uint256 index = 0;

        for (uint256 i = 1; i < nextEventId; i++) {
            if (userPasses[user][i].exists) {
                userPassesArray[index] = userPasses[user][i];
                index++;
            }
        }

        return userPassesArray;
    }

    function getPassesByEvent(
        uint256 eventId
    ) external view returns (address[] memory) {
        require(eventId > 0 && eventId < nextEventId, "Invalid Event ID");
        return eventPassHolders[eventId];
    }

    function getContractBalance() external view returns (uint256) {
        return paymentToken.balanceOf(address(this));
    }

    // Internal Functions
    function _createPass(address user, uint256 eventId) internal {
        EventData storage ED = events[eventId];
        uint256 expiryTime = block.timestamp + ED.duration;

        PassData memory newPass = PassData({
            active: true,
            expiry: expiryTime,
            eventId: eventId,
            accessLevel: "Standard",
            exists: true
        });

        userPasses[user][eventId] = newPass;
        eventPassHolders[eventId].push(user);

        userPassCount[user]++;
        eventPassCount[eventId]++;

        emit PassCreated(user, eventId, expiryTime);
    }

    function _validatePayment(uint256 eventId, uint256 amount) internal {
        EventData storage ED = events[eventId];
        require(amount == ED.price, "Incorrect payment amount");

        uint256 allowance = paymentToken.allowance(msg.sender, address(this));
        require(allowance >= amount, "Insufficient allowance");

        uint256 balance = paymentToken.balanceOf(msg.sender);
        require(balance >= amount, "Insufficient balance");

        bool success = paymentToken.transferFrom(
            msg.sender,
            address(this),
            amount
        );
        require(success, "Payment transfer failed");
    }

    function _updatePassExpiry(
        address user,
        uint256 eventId,
        uint256 newExpiry
    ) internal passExists(user, eventId) {
        require(
            newExpiry > block.timestamp,
            "New expiry must be in the future"
        );
        userPasses[user][eventId].expiry = newExpiry;
    }

    function _isValidIPFSHash(
        string calldata ipfsHash
    ) internal pure returns (bool) {
        bytes memory hashBytes = bytes(ipfsHash);
        uint256 length = hashBytes.length;

        if (length < MIN_IPFS_HASH_LENGTH || length > MAX_IPFS_HASH_LENGTH) {
            return false;
        }

        if (length >= 2) {
            if (hashBytes[0] == "Q" && hashBytes[1] == "m") {
                return length == 46;
            }

            if (hashBytes[0] == "b") {
                return length >= 44;
            }
        }

        return false;
    }

    function _isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
