import React, { useState, useEffect, useContext, useMemo, ReactNode } from 'react';
import { loginWithLN, loginWithEmail, pusherKey, pusherChannel, pusherCluster, registerWithEmail} from '../api';
import { useRouter } from 'next/router';

import Pusher from 'pusher-js';

interface LNData {
  encoded: string;
  secret: string;
  url: string;
  key: string;
}

interface AccountData {
  key: string
  email: string
  password: string
  name: string
  nostrSk: string
  nostrPk: string
}

interface Props {
  children: React.ReactNode;
}

interface IAuthContext {
  handleLoginWithLN: () => void;
  handleLoginWithEmail: (credentials: any) => void;
  handleRegisterWithEmail: (credentials: any) => void;
  lnData: LNData;
  accountData: AccountData;
}

const defaultState = {
  handleLoginWithLN: () => {},
  handleLoginWithEmail: (credentials: any) => {},
  handleRegisterWithEmail: (credentials: any) => {},
  // TODO: get a unified account model merging ln and email fields from mongo
  lnData: {encoded: "", secret: "", url: "", key: ""},
  accountData: {key: "", email: "", password: "", name: "", nostrSk: "", nostrPk: ""}
};

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export function AuthContextProvider({ children }:{children:ReactNode;}): JSX.Element {
  const [lnData, setLnData] = useState(defaultState.lnData);
  const [accountData, setAccountData] = useState(defaultState.accountData)

  const router = useRouter();

  useEffect(() => {
    const getEventsSocket = () => {
      const pusher = new Pusher(pusherKey!,{
        cluster: pusherCluster!
      });
      
      const channel =  pusher.subscribe(pusherChannel!)
      
      channel.bind("auth", function(data:any) {
          let accountdata = accountData
          accountdata.key = data.key
          accountdata.email = data.email
          accountdata.name = data.name
          accountdata.nostrSk = data.nostrSk
          accountdata.nostrPk = data.nostrPk
          console.log(accountdata)
          setAccountData(accountdata)
          router.push('/dashboard')
      })

      return (() => {
        pusher.unsubscribe('lnd-auth')
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    getEventsSocket()
  }, []);

  const handleLoginWithLN = async () => {
    const response = await loginWithLN();
    if(response){
      setLnData(response.data)
    }
    
  }

  const handleLoginWithEmail = async(credentials: { email: string; password: string; }) => {
    console.log("handleLoginWithEmail: " + credentials)
    const response = await loginWithEmail(credentials);
    if(response){
      setAccountData(response.data)
    }
  }

  const handleRegisterWithEmail = async(credentials: { email: string; password: string; }) => {
    console.log("handleRegisterWithEmail: " + credentials)
    const response = await registerWithEmail(credentials);
    if(response){
      router.push('/login')
    }
  }

  const contextValue = {
    lnData,
    accountData,
    handleLoginWithLN,
    handleLoginWithEmail,
    handleRegisterWithEmail
  };

  // Make the provider update only when it should
  const memoedValue = useMemo(
    () => ({
      lnData,
      accountData,
      handleLoginWithEmail,
      handleLoginWithLN,
      handleRegisterWithEmail
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lnData, accountData]
  );

  return (
    <AuthContext.Provider value={memoedValue as IAuthContext}>{children}</AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}