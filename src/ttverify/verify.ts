// index.tsverify
import { verificationBuilder, openAttestationVerifiers, Verifier, isValid } from "@tradetrust-tt/tt-verify";
import { getData } from "@govtechsg/open-attestation";
import * as document from "../document/document.json";

let document = {
  name : '123'
};

const customVerifier: Verifier<any> = {
    skip: async (_: any) => {
        return {
          status: "SKIPPED",
          type: "DOCUMENT_INTEGRITY123",
          name: "CustomVerifier",
          reason: {
            code: 0,
            codeString: "SKIPPED",
            message: `Document doesn't have version equal to 'https://schema.openattestation.com/2.0/schema.json'`,
          },
        };
      },
      test: ( document: any) => document.version === "https://schema.openattestation.com/2.0/schema.json",
    verify: async (document: any) => {
      const documentData = getData(document);
      console.log({documentData});
      if (documentData.name !== "Certificate of Completion") {
        return {
          type: "DOCUMENT_INTEGRITY123",
          name: "CustomVerifier",
          data: documentData.name,
          reason: {
            code: 1,
            codeString: "INVALID_NAME",
            message: `Document name is ${documentData.name}`,
          },
          status: "INVALID",
        };
      }
      return {
        type: "DOCUMENT_INTEGRITY123",
        name: "CustomVerifier",
        data: documentData.name,
        status: "VALID",
      };
    },
  };

const verifyDoc = async (document: any)=> {
    const verify1 = verificationBuilder([...openAttestationVerifiers, customVerifier], { network: "sepolia" });

    const promisesCallback = (verificationMethods: any) => {
      for (const verificationMethod of verificationMethods) {
        verificationMethod.then((fragment: any) => {
          console.log(`${fragment.name} has been resolved with status ${fragment.status}`);
        });
      }
    };
    const fragments = await verify1(document as any, promisesCallback);
    const valid = isValid(fragments);
    console.log({fragments});
    console.log({valid});
    return fragments;
}

export {verifyDoc};