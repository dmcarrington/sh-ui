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
  AlertDescription
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

  /*let _name = "Anon"
  if(accountData.name){
    _name = accountData.name
  }
  setName(_name)

  let _email = ""
  if(accountData.email){
    _email = accountData.email
  }
  setEmail(_email)*/

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

  return (
    <section className={styles.container}>
        <Box display="grid" justifyContent="center">
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
            <Stack spacing = {4}>
            <InputGroup>
                <InputLeftAddon children='Name: ' />
                <Input value={name} onChange = {(e) => setName(e.target.value)} />
            </InputGroup>
            <InputGroup>
                <InputLeftAddon children='Email: ' />
                <Input value={email} onChange = {(e) => setEmail(e.target.value)} />
            </InputGroup>
            <Button onClick={setAccountData}>Save</Button>
            <Button><NextLink href="/dashboard">Exit</NextLink></Button>
            </Stack>
        </Box>
    </section>
  )
}

export default Settings