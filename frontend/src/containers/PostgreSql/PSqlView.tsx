import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const [Navbar, ImportForm, ExportForm, Footer] = [
  dynamic(() => import('../Layout/Navbar')),
  dynamic(() => import('@components/PostgreSql/ImportForm'), {
    loading: () => (
      <div className="w-full h-screen flex justify-center items-center">
        <div
          className="w-10 h-10 rounded-full animate-spin
        border-2 border-solid border-[#7e46b3] border-t-transparent"
        />
      </div>
    ),
  }),
  dynamic(() => import('@components/PostgreSql/ExportForm'), {
    loading: () => (
      <div className="w-full h-screen flex justify-center items-center">
        <div
          className="w-10 h-10 rounded-full animate-spin
        border-2 border-solid border-[#7e46b3] border-t-transparent"
        />
      </div>
    ),
  }),
  dynamic(() => import('@containers/Layout/Footer')),
]

export default function PSqlView() {
  const router = useRouter()
  const { im } = router.query
  return (
    <div>
      <Navbar />
      <div className={`${im !== 'true' ? 'block' : 'hidden'}`}>
        <ImportForm />
      </div>
      <div className={`${im === 'true' ? 'block' : 'hidden'}`}>
        <ExportForm />
      </div>
      <Footer />
    </div>
  )
}
