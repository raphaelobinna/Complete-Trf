import React from 'react'
import dynamic from 'next/dynamic'

const [Navbar, Hero, Databases, Footer] = [
  dynamic(() => import('../Layout/Navbar')),
  dynamic(() => import('@components/Home/Hero'), {
    loading: () => (
      <div className="w-screen h-screen flex justify-center items-center">
        <div
          className="w-10 h-10 rounded-full animate-spin
        border-2 border-solid border-[#7e46b3] border-t-transparent"
        />
      </div>
    ),
  }),
  dynamic(() => import('@components/Home/Databases'), {
    loading: () => (
      <div className="w-screen h-screen flex justify-center items-center">
        <div
          className="w-10 h-10 rounded-full animate-spin
        border-2 border-solid border-[#7e46b3] border-t-transparent"
        />
      </div>
    ),
  }),
  dynamic(() => import('../Layout/Footer')),
]

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Databases />
      <Footer />
    </div>
  )
}
