import dynamic from 'next/dynamic'
import Head from 'next/head'
const HomeView = dynamic(() => import('@containers/Home'))

export default function Home() {
  return (
    <>
      <Head>
        <title>TRF</title>
        <meta name="title" content="TRF" />
        <meta name="description" content="Database Transfer" />
      </Head>
      <HomeView />
    </>
  )
}
