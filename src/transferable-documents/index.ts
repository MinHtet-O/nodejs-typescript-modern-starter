import {Wallet, ethers} from "ethers";
import { TradeTrustToken__factory } from "@govtechsg/token-registry/contracts";

const mint = async ()=> {
    console.log('Started Minting');
    const privateKey = "0x6e092a87dda6a5471ec41cf6939a7e32f767d2828bd92dccc7b96ab41d7a5116";
    const tokenRegistryAddress = "0x5b10A8A851eA4a11aa96f8FC39BC05A990363fA1";
    const owner = "0x7020BE74E640aFa14430f2C807F511b1559C5F60";
    const holder = "0x7020BE74E640aFa14430f2C807F511b1559C5F60";
    const tokenId = "0xc634227c1726bbd1dc8573d048bc06b3e6b1da3dbd55568288f880a94373982c";
    const unconnectedWallet = new Wallet(privateKey);
    const provider = ethers.getDefaultProvider("sepolia");
    const wallet = unconnectedWallet.connect(provider);
    const connectedRegistry = TradeTrustToken__factory.connect(tokenRegistryAddress, wallet);
    const tx = await connectedRegistry.mint(owner, holder, tokenId);
    const receipt = await tx.wait();
    console.log(`Receipt: ${JSON.stringify(receipt)}`);
    console.log('Successfully Minted');
}


export {mint};