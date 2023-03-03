import dynamic from 'next/dynamic'
import Head from 'next/head'

const PSqlView = dynamic(() => import('@containers/PostgreSql/PSqlProcess'), {
  ssr: false,
})

export default function PostgreSQL() {
  return (
    <div>
      <Head>
        <title>DB Transfer - PostgreSQL</title>
        <meta name="title" content="DB Transfer - PostgreSQL" />
        <meta name="description" content="DB Transfer- PostgreSQL" />
      </Head>
      <PSqlView />
    </div>
  )
}
