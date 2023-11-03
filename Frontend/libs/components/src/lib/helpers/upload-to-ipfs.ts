import { create } from 'ipfs-http-client';

export async function uploadToipfs(file: File) {
  const ipfsClient = create({
    host: process.env['NEXT_PUBLIC_IPFS_API'],
    protocol: 'https',
    port: 443,
    headers: {
      "x-auth-token":`${process.env['NEXT_PUBLIC_IPFS_API_KEY']}`,
    },
  });
  const path = `/${Date.now()}-${file?.name}`;
  // console.log(path)

   await ipfsClient.files.write(path, file, {
    create: true,
    parents: true,
    cidVersion: 1,
    hashAlg: 'sha2-256',
  });

  const { cid } = await ipfsClient.files.stat(path);
  console.log(`${cid}`)
  return `${cid}`;
}

