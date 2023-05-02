import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
const satoshisHiveLogo = require('../public/satoshis_hive_logo.png')

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Bitcoin, Lightning" />
      </Head>

      <main className={styles.main}>
        <Image src={satoshisHiveLogo} width={200} height={200}  />
        <h1 className={styles.title}>
          Welcome to Satoshi's Hive
        </h1>

        <p className={styles.description}>
          Get started by navigating to the {' '}
          <Link  href="/login">
            <a className={styles.navigate}>Login Page</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

export default Home
