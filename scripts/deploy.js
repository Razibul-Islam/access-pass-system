const hre = require("hardhat");

const WalletAddress = "0x0c31032a21945fae995b967050b0e653A46539fD";

async function main() {
  console.log("deploying start");

  // Step 1: Deploy ERC20 Token (APS) first
  const erc20Factory = await hre.ethers.getContractFactory("APS");
  console.log("ERC20 contract Deploying...");

  // Actually deploy the contract (you were missing this step!)
  const erc20Contract = await erc20Factory.deploy();

  await erc20Contract.waitForDeployment();
  const ercDeployAddress = await erc20Contract.getAddress();
  console.log("✅ ERC20 Token deployed to:", ercDeployAddress);

  // Step 2: Deploy AccessPassSystem with ERC20 address
  const APSContractFactory = await hre.ethers.getContractFactory(
    "AccessPassSystem"
  );
  console.log("Access Pass System Contract Deploying...");

  // Deploy AccessPassSystem with the ERC20 address as constructor parameter
  const APSContract = await APSContractFactory.deploy(
    ercDeployAddress, // These are constructor parameter
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
