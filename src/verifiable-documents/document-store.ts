import { DocumentStoreFactory } from "@govtechsg/document-store";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { Wallet, ethers } from "ethers";

const depoyDocStore = async(privateKey: string): Promise<string>=> {
    const unconnectedWallet = new Wallet(privateKey);
    const provider = ethers.getDefaultProvider("sepolia");
    const wallet = unconnectedWallet.connect(provider);
    const walletAddress = await wallet.getAddress();
    const factory = new DocumentStoreFactory(wallet);
    const transaction = await factory.deploy("Demo Document Store", walletAddress);
    const transactionReceipt = await transaction.deployTransaction.wait();
    const documentStoreAddress = transactionReceipt.contractAddress;
    return documentStoreAddress;
}

export {depoyDocStore};
