const hre = require("hardhat");

const WalletAddress = "0x0c31032a21945fae995b967050b0e653A46539fD";

async function main() {
  console.log("deploying start");

  // Step 1: Deploy ERC20 Token (APS) first
  const erc20Factory = await hre.ethers.getContractFactory("APS");
  console.log("ERC20 contract Deploying...");
  const erc20Contract = await erc20Factory.deploy();
  await erc20Contract.waitForDeployment();
  const ercDeployAddress = await erc20Contract.getAddress();
  console.log("✅ ERC20 Token deployed to:", ercDeployAddress);

  // Step 2: Deploy required libraries
  const PassManagementFactory = await hre.ethers.getContractFactory(
    "PassManagement"
  );
  const passManagementLib = await PassManagementFactory.deploy();
  await passManagementLib.waitForDeployment();
  const passManagementAddress = await passManagementLib.getAddress();
  console.log("📚 PassManagement deployed at:", passManagementAddress);

  const PassValidationFactory = await hre.ethers.getContractFactory(
    "PassValidation"
  );
  const passValidationLib = await PassValidationFactory.deploy();
  await passValidationLib.waitForDeployment();
  const passValidationAddress = await passValidationLib.getAddress();
  console.log("📚 PassValidation deployed at:", passValidationAddress);

  // Step 3: Deploy AccessPassSystem with libraries linked
  const APSContractFactory = await hre.ethers.getContractFactory(
    "AccessPassSystem",
    {
      libraries: {
        "contracts/PassManagement.sol:PassManagement": passManagementAddress,
        "contracts/PassValidation.sol:PassValidation": passValidationAddress,
      },
    }
  );

  console.log("Access Pass System Contract Deploying...");
  const APSContract = await APSContractFactory.deploy(
    ercDeployAddress,
    WalletAddress
  );

  await APSContract.waitForDeployment();
  const APSContractAddress = await APSContract.getAddress();
  console.log("✅ Access Pass System deployed to:", APSContractAddress);

  // Final summary
  console.log("\n" + "=".repeat(50));
  console.log("🎉 DEPLOYMENT COMPLETED!");
  console.log("ERC20 Token Address: ", ercDeployAddress);
  console.log("Access Pass System Address: ", APSContractAddress);
  console.log("=".repeat(50));
}

main().catch((err) => {
  console.error("❌ Deployment failed:", err);
});
