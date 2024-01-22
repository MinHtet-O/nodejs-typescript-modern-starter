import { mint } from "./transferable-documents";
import { verifyDoc } from "./ttverify/verify";
import { depoyDocStore } from "./verifiable-documents/document-store";

const main = async () => {
    // await mint();
    const privateKey = "0x6e092a87dda6a5471ec41cf6939a7e32f767d2828bd92dccc7b96ab41d7a5116"
    let address = await depoyDocStore(privateKey);
    console.log(address);

};

main();
