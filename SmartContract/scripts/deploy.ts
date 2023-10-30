import hre from "hardhat";

async function main() {
  const factory = await hre.ethers.getContractFactory("HelloWorld");
  const contract = await factory.deploy();

  await contract.deployed();

  console.log("contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
