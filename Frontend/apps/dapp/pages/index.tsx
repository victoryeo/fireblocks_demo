import * as React from 'react';
import Router from 'next/router';
import { ChangeEvent, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { NextPageWithLayout } from './_app';
import { Form } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { Center, Card, Image, CardBody, Container } from "@chakra-ui/react";
import Fireblocks from './Fireblocks';
// Fetching data from the JSON file
import fsPromises from 'fs/promises';
import path from 'path';

interface ILogin {
  username: string;
  password: string;
}
interface IUser {
  email: string;
  username: string;
  password: string;
}

const Page: NextPageWithLayout = (props) => {
  const [user, setUser] = useState<ILogin | undefined>(undefined);
  const [userErr, setUserErr] = useState('');
  const [passwordErr, setpasswordErr] = useState('');
  const [user_actErr, setUser_acountErr] = useState('');
  const [atLogin, setAtLogin] = useState(true);
  const [passwordType, setPasswordType] = useState('password');
  const [provedAccessBirthday, setProvedAccessBirthday] = useState(false);
  const keyData = props;

  useEffect(() => {
    //console.log(keyData)
  }, []);

  useEffect(() => {
    if (provedAccessBirthday == true) {
      localStorage.setItem('user', 'polygonID');
      Router.push('/secret');
    }
  }, [provedAccessBirthday]);

  const [userDetailSignUp, setuserDetailSignUp] = useState<IUser | undefined>(
    undefined
  );

  const handleChangeSignUp = (name: keyof IUser, value: IUser[keyof IUser]) => {
    setuserDetailSignUp({ ...userDetailSignUp, [name]: value, email: 't' });
  };

  const handleSubmitSignUp = async () => {
    event.preventDefault();
    const response = await fetch('/api/createUser').then((response) =>
      response.json()
    );

  };

  const handleChange = (name: keyof ILogin, value: ILogin[keyof ILogin]) => {
    setUser({ ...user, [name]: value });
  };

  const handleClick = () => {
    Router.push('/secret');
  }

  return (
    <>
      <div className="bg-info">
        <div className="row">

          <div className="col-md-6">
            <div className="right-wrap">
              {provedAccessBirthday ? (
                <button type="button" onClick={handleClick}>
                  Loading...
                </button>
              ): (
                <div className="right-box">
                  <div className="logo">
                    <img src="/SettleMint_log-bk.png" alt="preview" />
                  </div>

                  <h2 className="header-text">
                    Fireblocks Demo
                  </h2>
                  <Center className="vc-check-page">
                    <Container>
                    <Card
                      style={{
                        border: "2px solid #805AD5",
                      }}
                    >
                    <CardBody style={{ paddingBottom: 10, paddingTop: 10, marginLeft:10 }}>
                    <p>
                      This dapp is using Fireblocks {" "}
                        <a href="https://developers.fireblocks.com/docs/sandbox-quickstart">
                        (SDK and Sandbox)
                      </a>{" "}
                      for interfacing to web3 and for custody. The demo will mint an NFT to Fireblocks vault wallet address.
                    </p>
                    If you don't have a Fireblocks vault, you can create one.
                    <Fireblocks keyData={keyData}/>
                    </CardBody>
                    </Card>
                    </Container>
                  </Center>
                </div>
              )}
            </div>
          </div>
        
        </div>
      </div>
    </>
  );
};

// Page.getLayout = function getLayout(page: ReactElement) {
//   return <AppLayout>{page}</AppLayout>;
// };
export default Page;

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'fireblocks_secret.key');
  const keyData = await fsPromises.readFile(filePath, 'utf-8');
  //console.log(keyData)

  return {
    props: { keyData }
  }
}
