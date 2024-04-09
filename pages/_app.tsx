import '@/styles/globals.css'
import Crisp from '@/components/Crisp'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Divider from '@/components/Divider'
import { Archivo } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import Pirsch from '@/components/Analytics/Pirsch'

const font = Archivo({
  subsets: ['latin'],
})

declare global {
  interface Window {
    // crisp global selector
    $crisp: any
    // google analytics data layer
    dataLayer: any
    // Lemon Squeezy window object
    LemonSqueezy: any
    // crisp enabled flag
    enabled_crisp: any
    // posthog enabled flag
    enabled_posthog: any
    // Lemon Squeezy flag
    hasLemonSqueezy: any
    // crsip ID
    CRISP_WEBSITE_ID: any
    // Lemon Squeezy instance
    createLemonSqueezy: any
  }
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className={['bg-white', font.className].join(' ')}>
        <Header />
        <Divider className="mt-3 border-gray-100/50" />
        <Component {...pageProps} />
        <Divider className="mt-3 border-gray-100/50" />
        <Footer twitter="rishi_raj_jain_" brand_name="launchfa.st" />
        <Crisp ID="c3341803-a246-4aa6-93f0-e1049480a5f8" />
        <Pirsch ID="c27typUzqqEbIT3JgD8GMiuJhbzuvyDE" />
      </div>
    </SessionProvider>
  )
}
