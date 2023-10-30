import {
  FireblocksSDK,
} from "fireblocks-sdk";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { inspect } from "util";

dotenv.config();

console.log(process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH)
const privateKey = fs.readFileSync(
  path.resolve(process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH ?? ''), "utf8");
const apiKey = process.env.FIREBLOCKS_API_KEY ?? '';

// Choose the right api url for your workspace type 
const baseUrl = "https://sandbox-api.fireblocks.io";
const fireblocks = new FireblocksSDK(privateKey, apiKey, baseUrl);

(async () => {
  const name: string = "Counter-Party Wallet #2";
  const externalWallet = await fireblocks.createExternalWallet(name);
  console.log(JSON.stringify(externalWallet, null, 2));

  const walletContainerId = externalWallet.id;
  const assetId = "USDC_T";
  const address = "0xEA6A3E367e96521fD9E8296425a44EFa6aee82da";
  const tag = "0x12345678";
  const externalWalletAsset = await fireblocks.createExternalWalletAsset(walletContainerId, assetId, address, tag);
  console.log(JSON.stringify(externalWalletAsset, null, 2));

})().catch((e) => {
  console.error(`Failed: ${e}`);
})
