import { Provider } from '~/components/layouts/Provider'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp