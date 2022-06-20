import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Flex, Text, FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react'
import React, { useEffect } from 'react'

const Home: React.FC = () => {
  const router = useRouter()

  return (
    <Box>
      <Text textAlign='center'>ハロー</Text>
      <Head>
        <title>Awosome To Do</title>
        <meta name="description" content="awesome to do app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Box>
  )
}

export default Home