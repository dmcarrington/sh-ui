import React, { useContext, useState } from 'react';
import type { NextPage } from 'next'
import Image from 'next/image'
import { useAuth } from '../context/AuthContext'
import DashboardCard from '../components/DashboardCard'
import styles from '../styles/Settings.module.css'
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
import axios from "axios"
import NextLink from "next/link"
import { AxiosError} from 'axios';

const satoshisHiveLogo = require('../public/satoshis_hive_logo.png')
const userIcon = require('../public/dashboard/user.png')

const Settings: NextPage = () => {
  const { accountData, logout} = useAuth();
  console.log(accountData)
  const [name, setName] = useState(accountData.name)
  const [email, setEmail] = useState(accountData.email)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [updateFailed, setUpdateFailed] = useState(false)

  const setAccountData = async () => {
    try {
    const response = await axios({
        method: "put",
        url: "user/update-account",
        data: { email: email, name: name },
      });
      console.log(response)
      if(response.status == 200){
        setUpdateSuccess(true)
        setUpdateFailed(false)
      }else{
        setUpdateFailed(true)
        setUpdateSuccess(false)
      }
      return response;
    } catch(e){
        console.log(e)
        setUpdateFailed(true)
        setUpdateSuccess(false)
        return e
    }
      
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
        <Box display="grid" justifyContent="center">
            <Box z-index="999" position="relative" width="800px" maxW="90vw" maxH="95vh" marginBottom="10px">
                <Box gridArea="1 / 1" padding="10px" border="1px" width="100%" borderColor="black" marginY="15px" shadow="lg" rounded="md" bg={useColorModeValue(
                            'rgba(255,255,255,0.8)',
                            'rgba(0,0,0,0.25)'
                        )}>
                    <Box padding={10}>
                    {updateSuccess ? (
                        <Alert
                            status='success'
                            variant='subtle'
                            flexDirection='column'
                            alignItems='center'
                            justifyContent='center'
                            textAlign='center'
                            height='200px'
                            >
                            <AlertIcon boxSize='40px' mr={0} />
                            <AlertTitle mt={4} mb={1} fontSize='lg'>
                                Details Updated!
                            </AlertTitle>
                            <AlertDescription maxWidth='sm'>
                                Your details were successfully updated on the server.
                            </AlertDescription>
                        </Alert>
                        ) : (<></>)
                    }
                    {updateFailed ? (
                        <Alert
                            status='error'
                            variant='subtle'
                            flexDirection='column'
                            alignItems='center'
                            justifyContent='center'
                            textAlign='center'
                            height='200px'
                            >
                            <AlertIcon boxSize='40px' mr={0} />
                            <AlertTitle mt={4} mb={1} fontSize='lg'>
                                Update Failed!
                            </AlertTitle>
                            <AlertDescription maxWidth='sm'>
                                Failed to update your details.
                            </AlertDescription>
                        </Alert>
                        ) : (<></>)
                    }
                    </Box>
                    <Stack spacing = {4} alignItems="center">
                        <Heading>Account Settings</Heading>    
                        <InputGroup borderColor="black">
                            <InputLeftAddon children='Name: ' />
                            <Input value={name} onChange = {(e) => setName(e.target.value)} />
                        </InputGroup>
                        <InputGroup borderColor="black">
                            <InputLeftAddon children='Email: ' />
                            <Input value={email} onChange = {(e) => setEmail(e.target.value)} />
                        </InputGroup>
                        <Button onClick={setAccountData} width="50%">Save</Button>
                        <Button width="50%"><NextLink href="/dashboard">Exit</NextLink></Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    </section>
  )
}

export default Settings