import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import path from 'path';
import { FireblocksSDK } from "fireblocks-sdk";

type ResponseData = {
  message: string
}

const privateKey = fs.readFileSync(
  path.resolve(process.env.NX_FIREBLOCKS_API_PRIVATE_KEY_PATH ?? ''), "utf8");
const apiKey = process.env.NX_FIREBLOCKS_API_KEY ?? '';
// Choose the right api url for your workspace type 
const baseUrl = "https://sandbox-api.fireblocks.io";
const fireblocks = new FireblocksSDK(privateKey, apiKey, baseUrl);
//console.log(privateKey)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});
  console.log(vaultAccounts)
  console.log("vault connected")

  res.status(200).json({ message: 'Hello from Next.js!' })
}