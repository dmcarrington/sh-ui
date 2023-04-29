import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { AuthContext } from '../context/AuthContext'
import styles from '../styles/Dashboard.module.css'
import { useContext } from 'react';
const crypto = require('crypto');

const Home: NextPage = () => {
  const { lnData , accountData} = useContext(AuthContext);
  const key = lnData.key; 
  const email = accountData.email
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
         <a>Ln-Auth Authenticated!</a> Dashboard
        </h1>
        <b>Key:</b> {key}
        <b>email:</b> {email}
      </main>
    </div>
  )
}

export default Home
