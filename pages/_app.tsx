import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Provider } from '~/components/layouts/Provider'
import { parseCookies } from 'nookies'
import { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    (async() => {
      const pathIsAuthEntryPoint = router.pathname === '/sign-in' || router.pathname === '/sign-up'
      const { token } = parseCookies()
      if (!pathIsAuthEntryPoint && !token) {
        await router.push('/sign-in')
      }
      setInitialized(true)
    })()
  }, [])

  return (
    <>
      <Head>
        <title>Awosome To Do</title>
        <meta name="description" content="awesome to do app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider initialized={initialized}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp