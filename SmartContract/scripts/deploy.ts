import hre from "hardhat";

async function main() {
  /*const factory1 = await hre.ethers.getContractFactory("HelloWorld");
  const contract1 = await factory1.deploy();

  await contract1.deployed();
  console.log("Hello contract deployed to:", contract1.address);*/

  const signer: any[] = await hre.ethers.getSigners()
  console.log(signer[0].address)

  const factory2 = await hre.ethers.getContractFactory("SpaceBunnies");
  const contract2 = await factory2.deploy("N_name", "N_symbol", signer[0].address);

  await contract2.deployed();
  console.log("NFT contract deployed to:", contract2.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
