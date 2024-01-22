// index.ts
import { isValid, verify  } from "@tradetrust-tt/tt-verify";
import * as document from "../document/document.json";


const verifyDoc = async ()=> {
    const fragments = await verify(document as any);
    console.log({isValidFragments: isValid(fragments),
    }); // output true
}

export {verifyDoc};