import { create } from 'ipfs-http-client';
import { NextPageWithLayout } from './_app';
import { AppLayout } from '@da-tokenization/components';
import { FileUpload } from 'react-ipfs-uploader';
import { DropZoneElement } from '@da-tokenization/components';
import React, { ReactElement, useState } from 'react'
import { uploadToipfs } from '@da-tokenization/components';
import { toast } from 'react-hot-toast';
import classes from './secret.module.css';
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Page: NextPageWithLayout = () => {

  interface ISetting {
    logo: string;
  }
 

  const [cid, setCid] = useState(null)
  const [file, setFile] = useState<File>(undefined)
  async function handleFileUpload(event) {
    if(file == undefined)
    toast.loading('Uploading...',{
      duration:500,
    })
    
    setFile(event.target.files[0])
    console.log(event.target.files[0])
    
    
    const cid = await uploadToipfs(event.target.files[0])
    console.log(cid)
    toast.success(`File uploaded to IPFS `,{
      duration:2000,
    });
    setCid(cid)
  }

  const [companyName,setCompanyName] = useState('');
  const handleNameChange = event =>{
    setCompanyName(event.target.value);
  }

  const onSubmit = ()=>{

  }

  return (
    <>
      <div className="">
        <div className='header-area'>

          <h2>Secret Page</h2>
        </div>
        <div className='text-center'>
          <label htmlFor="company-name">Secret Name</label><br></br>
          <input type="text" value={companyName} onChange={handleNameChange} name="companyName" style={{width:'30%'}}/><br></br>
          <label htmlFor="logo" className="mb-2">Secret Image</label><br></br>
        
            <input type="file" name="logo"  className={classes.file} onChange={handleFileUpload} 

            />
         
          {cid && <p>File uploaded to IPFS with CID {cid}</p>}<br></br>
          <button name="upload" className="mt-2" onClick={onSubmit}>Upload</button>
        </div>
      </div>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;