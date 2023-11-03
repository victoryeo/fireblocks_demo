import { create } from 'ipfs-http-client';
import { NextPageWithLayout } from './_app';
import { AppLayout } from '@da-tokenization/components';
import { FileUpload } from 'react-ipfs-uploader';
import { DropZoneElement } from '@da-tokenization/components';
import React, { ReactElement, useState } from 'react'
import { uploadToipfs } from '@da-tokenization/components';
import { toast } from 'react-hot-toast';
import classes from './settings.module.css';

const Page: NextPageWithLayout = () => {

  interface ISetting {
    logo: string;
  }

  const [cid, setCid] = useState(null)
  const [file, setFile] = useState<File>(undefined)

  const onSubmit = ()=>{

  }

  return (
    <>
      <div className="">
        <div className='header-area'>

          <h2>DID Page</h2>
        </div>
        <div className='text-center'>
          <label htmlFor="company-name">DID Name</label><br></br>
        </div>
      </div>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;