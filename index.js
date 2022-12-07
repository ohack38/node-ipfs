import { create } from 'ipfs-http-client';
import fs from 'fs'
import * as dotenv from 'dotenv' 
dotenv.config()

let INFURA_ID = process.env.INFURA_ID
let INFURA_SECRET_KEY = process.env.INFURA_SECRET
 
async function ipfsClient() {
  const auth = 'Basic ' + Buffer.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString('base64');
  const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
  });
  return ipfs;
}


async function addFile(filePath) {
  let ipfs = await ipfsClient();
 
  const files = fs.readdirSync(filePath)
  console.log(files)

  for(let file of files) {
    const buffer = fs.readFileSync(`${filePath}/${file}`)
    const result = await ipfs.add(buffer)
    console.log(result)
  }
}

addFile('./img')
