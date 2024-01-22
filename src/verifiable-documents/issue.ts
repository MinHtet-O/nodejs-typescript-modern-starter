import { DocumentStoreFactory } from "@govtechsg/document-store";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import {Wallet, ethers} from 'ethers';

const issueDoc = async (privateKey: string, docStoreAddr: string, hash: string )=> {
    const unconnectedWallet = new Wallet(privateKey);
    const provider = ethers.getDefaultProvider("sepolia");
    const wallet = unconnectedWallet.connect(provider);
    const documentStore = DocumentStoreFactory.connect(docStoreAddr, wallet);
    console.log(`Connected Document Store Name: ${await documentStore.name()}`);
    const tx = await documentStore.issue(`0x${hash}`);
    const receipt = await tx.wait();
    return receipt;
}

const isIssued = async (privateKey: string, docStoreAddr: string, hash: string): Promise<boolean> => {
    const unconnectedWallet = new Wallet(privateKey);
    const provider = ethers.getDefaultProvider("sepolia");
    const wallet = unconnectedWallet.connect(provider);
    const documentStore = DocumentStoreFactory.connect(docStoreAddr, wallet);
    const isIssued = await documentStore.isIssued(`0x${hash}`);
    console.log(`Has been Issued: ${isIssued}`); // Has been Issued: true
    return isIssued;
}
export {issueDoc, isIssued};