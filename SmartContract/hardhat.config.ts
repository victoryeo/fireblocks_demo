import "@fireblocks/hardhat-fireblocks";
import { ApiBaseUrl } from "@fireblocks/fireblocks-web3-provider";
import * as dotenv from "dotenv";
//import "@nomiclabs/hardhat-waffle";

dotenv.config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "development",
  networks: {
    development: {
      url: "http://127.0.0.1:9545"
    },
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      fireblocks: {
        apiBaseUrl: ApiBaseUrl.Sandbox, // If using a sandbox workspace
        privateKey: process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH,
        apiKey: process.env.FIREBLOCKS_API_KEY,
        vaultAccountIds: process.env.FIREBLOCKS_VAULT_ACCOUNT_IDS,
      }
    },
    hardhat: {},
  },
};
