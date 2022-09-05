import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import 'src/styles/globals.css'
import { Box, CircularProgress } from '@mui/material'

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => {
      setLoading(true)
    }

    const end = () => {
      setLoading(false)
    }

    Router.events.on("routeChangeStart", start)
    Router.events.on("routeChangeComplete", end)
    Router.events.on("routeChangeError", end)

    return () => {
      Router.events.off("routeChangeStart", start)
      Router.events.off("routeChangeComplete", end)
      Router.events.off("routeChangeError", end)
    }
  }, [])

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        minWidth="100vw"
      >
        <CircularProgress />
      </Box>
    )
  }

  return <Component {...pageProps} />
}

export default MyApp
