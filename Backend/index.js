const express = require("express");
const cors = require("cors");
const { FireblocksSDK } = require('fireblocks-sdk');
const fs = require('fs');
const path = require('path');
const { inspect } = require("util");

require("dotenv").config();

const app = express();
const port = 8090;

console.log(process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH)
const privateKey = fs.readFileSync(
  path.resolve(process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH ?? ''), "utf8");
const apiKey = process.env.FIREBLOCKS_API_KEY ?? '';
// Choose the right api url for your workspace type 
const baseUrl = "https://sandbox-api.fireblocks.io";
const fireblocks = new FireblocksSDK(privateKey, apiKey, baseUrl);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.get("/", (req, res) => {
  res.send(
    `Welcome to your backend Fireblocks SDK server! There are ${Object.keys(apiPath).length
    } routes available: ${Object.values(apiPath).join(" and ")}.`
  );
});


const server = app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

const apiPath = {
  helloworld: "/api/helloworld",
  createVault: "/api/createVault",
};

app.get(apiPath.helloworld, (req, res) => {
  return res.status(200).set("Content-Type", "application/json").send("helloworld\n");
});

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
