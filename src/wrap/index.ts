import { wrapDocument } from "@govtechsg/open-attestation";
import { writeJsonToFile } from "../io";

const defaultRenderer = "https://tutorial-renderer.openattestation.com";
const prepRawVerifiableDocument = async (documentStoreAddr: string, dns: string, rendererUrl?: string)=> {
    const document = {
        "name": "Certificate of Completion",
        "$template": {
          "name": "main",
          "type": "EMBEDDED_RENDERER",
          "url": rendererUrl || defaultRenderer,
        },
        "recipient": {
          "name": "John Doe"
        },
        "issuers": [
          {
            "name": "Demo Issuer",
            "documentStore": documentStoreAddr,
            "identityProof": {
              "type": "DNS-TXT",
              "location": dns,
            }
          }
        ]
      } as any;
      return document;
}

const wrapVerifiableDocument = async (documentStoreAddr: string, dns:string,rendererUrl?: string )=> {
    const rawDoc = await prepRawVerifiableDocument(documentStoreAddr, dns, rendererUrl);
    const wrappedDocument = wrapDocument(rawDoc);
    return wrappedDocument;
}

export {wrapVerifiableDocument};