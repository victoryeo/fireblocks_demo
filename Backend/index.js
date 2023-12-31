const express = require("express");
const cors = require("cors");
const { FireblocksSDK } = require('fireblocks-sdk');
const { FireblocksWeb3Provider, ChainId } = require ("@fireblocks/fireblocks-web3-provider");
const fs = require('fs');
const path = require('path');
const { inspect } = require("util");
const Web3 = require("web3");
const https = require('https');
const nftAddress = require("./config/nftAddress.json");

require("dotenv").config();

const app = express();
const port = 9090;

console.log(process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH)
const privateKey = fs.readFileSync(
  path.resolve(process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH ?? ''), "utf8");
const apiKey = process.env.FIREBLOCKS_API_KEY ?? '';
// Choose the right api url for your workspace type 
const baseUrl = "https://sandbox-api.fireblocks.io";
const fireblocks = new FireblocksSDK(privateKey, apiKey, baseUrl);

// Create a fireblocks provider instance
const eip1193Provider = new FireblocksWeb3Provider({
  apiBaseUrl: baseUrl, // If using a sandbox workspace
  privateKey: process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH ?? '',
  apiKey: process.env.FIREBLOCKS_API_KEY ?? '',
  vaultAccountIds: process.env.FIREBLOCKS_VAULT_ACCOUNT_IDS,
  chainId: ChainId.GOERLI,
})

const ABI = require("./config/nftAbi.json");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.get("/", (req, res) => {
  res.send(
    `Welcome to your backend Fireblocks SDK server! There are ${Object.keys(apiPath).length
    } routes available: ${Object.values(apiPath).join(" and ")}.\n`
  );
});

const options = {
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('fullchain.pem')
};

const server = https
  .createServer(
    options,
    app
  )
  .listen(port, function () {
    console.log(
      `server running on port ${port}`
    );
  });

const apiPath = {
  helloworld: "/api/helloworld",
  createVault: "/api/createVault",
  getVault: "/api/getVault",
  mintNFT: "/api/mintNFT",
};

app.get(apiPath.helloworld, (req, res) => {
  return res.status(200).set("Content-Type", "application/json").send("helloworld\n");
});

app.get(apiPath.getVault, async (req, res) => {
  // Print vaults before creation
  let vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});
  console.log(inspect(vaultAccounts, false, null, true));

  return res
    .status(200)
    .set("Content-Type", "application/json")
    .send(vaultAccounts.accounts[0]);
})

app.post(apiPath.createVault, async (req, res) => {
  // Print vaults before creation
  let vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});
  console.log(inspect(vaultAccounts, false, null, true));

  const vaultCreation = await fireblocks.createVaultAccount("Demo_Vault" + Number(vaultAccounts.accounts[0].id)+1);
  console.log(inspect(vaultCreation, false, null, true));  

  return res
    .status(200)
    .set("Content-Type", "application/json")
    .send(vaultCreation);
})

app.post(apiPath.mintNFT, async (req, res) => {
  // mint an NFT
  const web3 = new Web3(eip1193Provider);
  //console.log(web3)
  const myAddr = await web3.eth.getAccounts()
  console.log("myAddr", myAddr)
  console.log("Balance", await web3.eth.getBalance(myAddr[0]))
  console.log("nftAddress", nftAddress.nftAddress)
  const nftContract = new web3.eth.Contract(ABI, nftAddress.nftAddress)
  //console.log(nftContract)

  try {
  const txHash = await nftContract.methods.safeMint(myAddr[0]).send(
    {from: myAddr[0], gas: 1000000});
  console.log("txHash", txHash)
  
  const txReceipt = await web3.eth.getTransactionReceipt(txHash.transactionHash);
  console.log("txReceipt", txReceipt)
  console.log(txReceipt.logs)
  //console.log(txReceipt.logs[0].topics[3])
  
  const nftInx = Number(txReceipt.logs[0]?.topics[3]) ?? 0 ;
  console.log("A new NFT index ", nftInx, "has been minted")
  console.log("tokenURI:", await nftContract.methods.tokenURI(nftInx).call())

  return res
    .status(200)
    .set("Content-Type", "application/json")
    .send(JSON.stringify({ 
      nftAddress: nftAddress.nftAddress, nftInx: nftInx
    }));
  } catch (err) {
    console.error(err)
  }
})