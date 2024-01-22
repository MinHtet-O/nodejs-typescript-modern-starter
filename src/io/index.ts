import fs from 'fs';


const writeJsonToFile = async (jsonObject: any, filename?: string): Promise<void> => {
    const name = filename || 'output.json';
    const jsonString = JSON.stringify(jsonObject, null, '');
    fs.writeFileSync(name, jsonString);
    console.log(`data has been written to ${filename}`);
  }
  
export {writeJsonToFile};