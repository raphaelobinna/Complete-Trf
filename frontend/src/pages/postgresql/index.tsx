import dynamic from 'next/dynamic'
import Head from 'next/head'

const PSqlView = dynamic(() => import('@containers/PostgreSql/PSqlView'))

export default function PostgreSQL() {
  return (
    <>
      <Head>
        <title>DB Transfer - PostgreSQL</title>
        <meta name="title" content="DB Transfer - PostgreSQL" />
        <meta name="description" content="DB Transfer- PostgreSQL" />
      </Head>
      <PSqlView />
    </>
  )
}
