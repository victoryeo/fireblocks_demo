import { createWalletClient, createPublicClient, custom, http } from "viem";
import { polygonMumbai } from "viem/chains";
import "viem/window";

export function ConnectWalletClient() {
    // Check for window.ethereum
    let transport;
    if (window.ethereum) {
        transport = custom(window.ethereum);
    } else {
        const errorMessage ="MetaMask or another web3 wallet is not installed. Please install one to proceed.";
        throw new Error(errorMessage);
    }
    
    // Delcalre a Wallet Client
    const walletClient = createWalletClient({
        chain: polygonMumbai,
        transport: transport,
    });
    
    return walletClient;
}

export function ConnectPublicClient() {
    // Check for window.ethereum
    let transport;
    if (window.ethereum) {
        transport = custom(window.ethereum);
    } else {
        const errorMessage ="MetaMask or another web3 wallet is not installed. Please install one to proceed.";
        throw new Error(errorMessage);
    }
    
    // Delcare a Public Client
    const publicClient = createPublicClient({
        chain: polygonMumbai,
        transport: transport,
    });
    
    return publicClient;
}