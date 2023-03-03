import dynamic from 'next/dynamic'
import Head from 'next/head'

const MySqlView = dynamic(() => import('@containers/MySql/MySqlProcess'), {
  ssr: false,
})

export default function MySQL() {
  return (
    <div>
      <Head>
        <title>DB Transfer - MySQL</title>
        <meta name="title" content="DB Transfer - MySQL" />
        <meta name="description" content="DB Transfer- MySQL" />
      </Head>
      <MySqlView />
    </div>
  )
}
