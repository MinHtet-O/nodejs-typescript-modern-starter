import { writeJsonToFile } from "./io";
import { mint } from "./transferable-documents";
import { verifyDoc } from "./ttverify/verify";
import { depoyDocStore } from "./verifiable-documents/document-store";
import { isIssued, issueDoc } from "./verifiable-documents/issue";
import { wrapVerifiableDocument } from "./wrap";
import { isValid, verify } from "@tradetrust-tt/tt-verify";

const main = async () => {
    // await mint();
    const privateKey = "0x6e092a87dda6a5471ec41cf6939a7e32f767d2828bd92dccc7b96ab41d7a5116"
    const docStoreAddr = "0xA58d72Ea58c64F0525419c311A103164a05885c9"
    const dns = "living-cyan-worm.sandbox.fyntech.io";
    // let address = await depoyDocStore(privateKey);
    const wrappedDoc = await wrapVerifiableDocument("0xA58d72Ea58c64F0525419c311A103164a05885c9", dns);
    const hash = wrappedDoc.signature.merkleRoot;
    const receipt = await issueDoc(privateKey,docStoreAddr, hash);
    const isDocIssued = await isIssued(privateKey,docStoreAddr, hash);
    if(isDocIssued){
        writeJsonToFile(wrappedDoc);
    } else {
        throw Error("Doc is not issued");
    }
    await verifyDoc(wrappedDoc);
    };


main();
