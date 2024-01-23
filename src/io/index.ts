import fs from 'fs';


const writeJsonToFile = async (jsonObject: any, filename?: string): Promise<void> => {
    const name = filename || 'output.json';
    const dir = 'output';
    const path = `${dir}/${name}`;
    const jsonString = JSON.stringify(jsonObject, null, '');
    fs.writeFileSync(path, jsonString);
    console.log(`data has been written to ${name}`);
  }
  
export {writeJsonToFile};