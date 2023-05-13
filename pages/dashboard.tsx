import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { AuthContext } from '../context/AuthContext'
import styles from '../styles/Dashboard.module.css'
import { useContext } from 'react';
const crypto = require('crypto');
import NostrPanel from '../components/nostr'
import DashboardCard from '../components/DashboardCard'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Box,
  useColorModeValue,
  SimpleGrid
} from '@chakra-ui/react'
const satoshisHiveLogo = require('../public/satoshis_hive_logo.png')



const Home: NextPage = () => {
  const { lnData , accountData} = useContext(AuthContext);
  const key = accountData.key; 
  const email = accountData.email
  let name = "Anon"
  if(accountData.name){
    name = accountData.name
  }

  const backgroundImg = {
    height: '100%',
    width:'100%',
    minH: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundImage: 'satoshis_hive_logo.png',
    position:'absolute'
  }
  return (
    <>
    <Box display="grid" justifyContent="center">
      
      <Box sx={backgroundImg}></Box>
        <Box z-index="999" position="relative" width="800px" maxW="90vw">
        <Box gridArea="1 / 1" border="1px" width="100%" borderColor="black" marginY="15px" shadow="lg" rounded="md" bg={useColorModeValue(
                          'rgba(255,255,255,0.8)',
                          'rgba(0,0,0,0.25)'
                      )}>
            <Image src={satoshisHiveLogo} width={100} height={100} />
        </Box>
        <SimpleGrid columns={3} spacing={10} >
              <DashboardCard title="card1" content="content1" background="dfdfsdf"></DashboardCard>
              <DashboardCard title="card1" content="content1" background="dfdfsdf"></DashboardCard>
              <DashboardCard title="card1" content="content1" background="dfdfsdf"></DashboardCard>
              <DashboardCard title="card1" content="content1" background="dfdfsdf"></DashboardCard>
              <DashboardCard title="card1" content="content1" background="dfdfsdf"></DashboardCard>
              <DashboardCard title="card1" content="content1" background="dfdfsdf"></DashboardCard>
        </SimpleGrid>
        </Box>
      
      
      </Box>
    
    </>
  )
}

export default Home
