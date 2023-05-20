import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
const satoshisHiveLogo = require('../public/satoshis_hive_logo.png')
import Favicon from '../components/Favicon';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  useColorModeValue,
  SimpleGrid,
  Flex,
  Spacer,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Heading
} from '@chakra-ui/react'

const Home: NextPage = () => {
  const backgroundImg = {
    height: '100%',
    width:'100%',
    minH: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundImage: 'manchester.jpg',
    position:'absolute'
  }
  return (
    <div className={styles.container}>
      <Box display="grid" justifyContent="center">
      <Box sx={backgroundImg}></Box>
            <Box z-index="999" position="relative" width="800px" maxW="90vw" height="800px" maxH="50vh" marginBottom="10px">
                <Box gridArea="1 / 1" padding="10px" border="1px" width="100%" borderColor="black" marginY="15px" shadow="lg" rounded="md" bg={useColorModeValue(
                            'rgba(255,255,255,0.8)',
                            'rgba(0,0,0,0.25)'
                        )}>
      <Head>
        <title>Satoshi's Hive </title>
        <meta name="description" content="Bitcoin, Lightning" />
        <Favicon />
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
      </Box>
      </Box>
      </Box>
    </div>
  )
}

export default Home
