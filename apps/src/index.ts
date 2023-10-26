import { FireblocksWeb3Provider, ChainId } from "@fireblocks/fireblocks-web3-provider";
import Web3 from "web3";
import * as dotenv from "dotenv";
import { Contract } from "web3-eth-contract";

dotenv.config();

let ApiBaseUrl = {
    Sandbox: "https://sandbox-api.fireblocks.io",
}

console.log(process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH)

const eip1193Provider = new FireblocksWeb3Provider({
    apiBaseUrl: ApiBaseUrl.Sandbox, // If using a sandbox workspace
    privateKey: process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH || '',
    apiKey: process.env.FIREBLOCKS_API_KEY || '',
    vaultAccountIds: process.env.FIREBLOCKS_VAULT_ACCOUNT_IDS,
    chainId: ChainId.GOERLI,
})

// Import the Goerli USDC ABI
const ABI = require("../PROXY.json");
// Goerli USDC Contract Address
const CONTRACT_ADDRESS = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";

(async () => {
    const web3: Web3 = new Web3(eip1193Provider);
    //console.log(web3)
    const myAddr: string[] = await web3.eth.getAccounts()
    const contract: Contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    const spenderAddr = myAddr[0] // Address to approve
    console.log(spenderAddr)

    // 1 USDC to approve 
    const amount = 1e6
    
    // Invoke approve method
    const resu = await contract.methods.approve(spenderAddr, amount).send({
            from: myAddr[0]
        })
    console.log(resu)
    

})().catch(error => {
    console.log(error)
});