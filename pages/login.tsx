import React, { useContext, useState } from 'react';
import { LightningIcon } from '../assets/icons';
import type { NextPage } from 'next';
import styles from '../styles/Login.module.css';
import { useAuth } from '../context/AuthContext';
import QR from '../components/QR';
import Image from 'next/image'
import Link from 'next/link'
const satoshisHiveLogo = require('../public/satoshis_hive_logo.png')
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

const Login: NextPage = () => {
  const { handleLoginWithLN, lnData, handleLoginWithEmail, accountData} = useAuth();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e:any) => {
    e.preventDefault()
    console.log(`submit: ${email}, ${password}`)
    handleLoginWithEmail({email:email, password:password})
  }

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
    <section className={styles.container}>
      <Box sx={backgroundImg}></Box>
      <Box z-index="999" position="relative" width="800px" maxW="90vw" maxH="95vh" marginBottom="10px">
                <Box gridArea="1 / 1" padding="10px" border="1px" width="100%" borderColor="black" marginY="15px" shadow="lg" rounded="md" bg={useColorModeValue(
                            'rgba(255,255,255,0.8)',
                            'rgba(0,0,0,0.25)'
                        )}>
      <Image id={styles.logo} src={satoshisHiveLogo} width={150} height={150}/>
      {lnData.encoded ? (
        <QR />
      ) : (
        
        <aside className={styles.content}>
          <h3 className={styles.copy}>Login to view your dashboard</h3>
          <button
            onClick={handleLoginWithLN}
            className={`${styles.btn} ${styles.btn_lightning}`}
          >
            <LightningIcon fill="#fff" className={styles.ln_icon} /> Login via
            Lightning
          </button>
          <p>or</p>
          <form onSubmit={handleSubmit}>
            <label className={styles.input_label} htmlFor="emailInput">
              Email
            </label>
            <input
              id="emailInput"
              className={styles.input}
              type="email"
              placeholder="email@example.com"
              onChange = {(e) => setEmail(e.target.value)} value = {email}
            />
            <label className={styles.input_label} htmlFor="pwdInput">
              Password
            </label>
            <input
              id="pwdInput"
              aria-label="pwd"
              className={styles.input}
              type="password"
              onChange = {(e) => setPassword(e.target.value)} value = {password}
            />
            <button
              // TODO: make disabled until a valid email and password have been entered
              disabled={password == "" || email == ""}
              id="submit"
              type="submit"
              className={`${styles.btn} ${styles.btn_primary}`}
            >
              Login via Email
            </button>
            <Link  href="/register">
            <a className={styles.navigate}>Create account</a>
          </Link>
          </form>
        </aside>
      )}
      </Box>
      </Box>
    </section>
  );
};

export default Login;
