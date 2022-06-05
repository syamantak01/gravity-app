import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import { GravityProvider } from '../context/GravityContext'
import { ModalProvider } from 'react-simple-hook-modal'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
    >
      <GravityProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </GravityProvider>
    </MoralisProvider>
  )
}

export default MyApp
