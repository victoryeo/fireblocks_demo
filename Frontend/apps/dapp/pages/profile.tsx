import { NextPageWithLayout } from './_app';
import { AppLayout } from '@da-tokenization/components';
import { ReactElement, useState } from 'react';
import QRCode from "react-qr-code";

const Page: NextPageWithLayout = () => {
  const [show,setShow] = useState<boolean>(false)
  const [copy,setCopy] = useState<string>('Copy')


  return (
    <>
      <div className="content-area">

      </div>
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;
