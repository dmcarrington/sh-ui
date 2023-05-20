import type { NextPage } from 'next'
import Image from 'next/image'
import { useAuth } from '../context/AuthContext'
import styles from '../styles/Dashboard.module.css'
import NostrPanel from '../components/nostr'
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

const Forum: NextPage = () => {
  const { accountData} = useAuth();
  console.log(accountData)
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
    backgroundImage: 'manchester.jpg',
    position:'absolute'
  }

  return (
    <div className={styles.container}>
      <Box sx={backgroundImg}></Box>
      <Box display="grid" justifyContent="center" width="100%">
        <Box z-index="999" position="relative"  maxH="95vh" marginBottom="10px">
          <Box gridArea="1 / 1" padding="10px" border="1px" width="100%" borderColor="black" marginY="15px" shadow="lg" rounded="md" bg={useColorModeValue(
                'rgba(255,255,255,0.8)',
                'rgba(0,0,0,0.25)'
            )}>
            <div className={styles.side}>
            <Image src={satoshisHiveLogo} width={100} height={100} />
            </div>
            
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
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Forum
