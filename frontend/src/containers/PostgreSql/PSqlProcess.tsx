import React from 'react'
import dynamic from 'next/dynamic'

const [Navbar, ImportForm, Footer] = [
  dynamic(() => import('../Layout/Navbar')),
  dynamic(() => import('@components/PostgreSql/Process/ImportForm'), {
    loading: () => (
      <div className="w-full h-screen flex justify-center items-center">
        <div
          className="w-10 h-10 rounded-full animate-spin
        border-2 border-solid border-[#7e46b3] border-t-transparent"
        />
      </div>
    ),
  }),
  dynamic(() => import('../Layout/Footer'), {
    loading: () => (
      <div className="w-full h-screen flex justify-center items-center">
        <div
          className="w-10 h-10 rounded-full animate-spin
        border-2 border-solid border-[#7e46b3] border-t-transparent"
        />
      </div>
    ),
  }),
]

export default function PSqlView() {
  return (
    <div>
      <Navbar />
      <ImportForm />
      <Footer />
    </div>
  )
}
