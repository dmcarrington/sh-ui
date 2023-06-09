import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../context/AuthContext';
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ChakraProvider>
        
        <Component {...pageProps} />
    
      </ChakraProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
