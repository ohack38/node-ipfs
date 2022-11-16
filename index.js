import { create } from "ipfs-http-client";
 
async function ipfsClient() {
  const ipfs = create({host: "ipfs.infura.io", port: 5001, protocol: "https"});
  return ipfs;
}

async function test() {
  let ipfs = await ipfsClient();

  let result = await ipfs.add('Hello World');
  console.log(result);
}

test()
