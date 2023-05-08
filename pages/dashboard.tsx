import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { AuthContext } from '../context/AuthContext'
import styles from '../styles/Dashboard.module.css'
import { useContext } from 'react';
const crypto = require('crypto');
import NostrPanel from '../components/nostr'

const Home: NextPage = () => {
  const { lnData , accountData} = useContext(AuthContext);
  const key = accountData.key; 
  const email = accountData.email
  let name = "Anon"
  if(accountData.name){
    name = accountData.name
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
         Dashboard - {name}
        </h1>
        { key != undefined ?
          <span><b>Key: </b>{key}</span>
          : 
          <br></br>
        }
        { email != undefined ?
          <span><b>email: </b>{email}</span>
          :
          <br></br>
        }
        
        <NostrPanel />
      </main>
    </div>
  )
}

export default Home
