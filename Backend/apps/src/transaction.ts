import {
  FireblocksSDK,
  PeerType,
} from "fireblocks-sdk";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

console.log(process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH)
const privateKey = fs.readFileSync(
  path.resolve(process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH ?? ''), "utf8");

async function createTransaction(
  assetId: string, amount: string, srcId:any, destId: any) {
  const fireblocks = new FireblocksSDK(
    privateKey,
    process.env.FIREBLOCKS_API_KEY ?? '',
    "https://sandbox-api.fireblocks.io",
  );

  let payload = {
    assetId,
    amount,
    source: {
      type: PeerType.VAULT_ACCOUNT,
      id: String(srcId)
    },
    destination: {
      type: PeerType.VAULT_ACCOUNT,
      id: String(destId)
    },
    note: "Your first transaction!"
  };
  const result = await fireblocks.createTransaction(payload);
  console.log(JSON.stringify(result, null, 2));
}

(async () => {
  createTransaction(
    "ETH_TEST3", //Goerli ETH
    "0.001", //amount
    "0", // Source Vault Account ID
    "0"  // Destination Vault Account ID
  );
})().catch(error => {
  console.log(error)
})