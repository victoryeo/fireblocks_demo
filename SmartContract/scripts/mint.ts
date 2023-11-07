import hre from "hardhat";

async function main() {
  // on goerli testnet
  //const collectionAddress = "0x55C9775DAb2325bb69B279cABf6702cF9fF2789b";
  const collectionAddress = "0x4A9a39C9a9403C9a5FFD65331f29DFf693813AB5";

  const signer: any[] = await hre.ethers.getSigners()
  const signerAddress = await signer[0].getAddress()
  console.log("signerAddress", signerAddress)
  const nftContract = await hre.ethers.getContractAt("SpaceBunnies", collectionAddress);

  let overrides = {
    // The maximum units of gas for the transaction to use
    gasLimit: 230000,
    gasPrice: hre.ethers.utils.parseUnits("10", "gwei"),
  };

  const tx = await nftContract.safeMint(signerAddress, overrides);
  const resu = await tx.wait()
  //console.log(resu)
  const nftInx = Number(resu.events[0].args[2])
  console.log("A new NFT index ", nftInx, "has been minted" );
  console.log("tokenURI:", await nftContract.tokenURI(nftInx))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
