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
  SimpleGrid,
  LinkOverlay
} from '@chakra-ui/react'
import {
  BrowserRouter as Router,
  Route,
  Link as RouteLink
} from "react-router-dom";
import NextLink from 'next/link'

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
    backgroundImage: 'sp_logo.jpg',
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
              <LinkOverlay href='/announcements'><DashboardCard title="Announcements" content="Offical announcements from the Satoshi's Place team" background="dashboard/announcements.png"></DashboardCard></LinkOverlay>
              <LinkOverlay href='/forum'><DashboardCard title="Forum" content="Open forum for users to chat" background="dashboard/forum.jpg"></DashboardCard></LinkOverlay>
              <LinkOverlay href='/marketplace'><DashboardCard title="Marketplace" content="Buy and sell, either in person or online" background="dashboard/marketplace.png"></DashboardCard></LinkOverlay>
              <LinkOverlay href='/resources'><DashboardCard title="Resources" content="Helpful Bitcoin resources for all levels of experience" background="dashboard/resources.jpg"></DashboardCard></LinkOverlay>
              <LinkOverlay href='/messages'><DashboardCard title="Messages" content="Direct Messages" background="dashboard/messages.png"></DashboardCard></LinkOverlay>
              <LinkOverlay href='/events'><DashboardCard title="Events" content="Upcoming events at Satoshi's Place and elsewhere" background="dashboard/events.png"></DashboardCard></LinkOverlay>
        </SimpleGrid>
        </Box>
    </Box>
    
    </>
  )
}

export default Home
