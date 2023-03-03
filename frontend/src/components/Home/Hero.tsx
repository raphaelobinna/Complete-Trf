import React from 'react'
import { scroller } from 'react-scroll'
import { useRouter } from 'next/router'

export default function Hero() {
  const router = useRouter()

  const scrollTarget = (target: string) => {
    scroller.scrollTo(target, { smooth: true, duration: 700 })
  }

  const scrollToPage = async (target: string) => {
    if (router.pathname !== '/') {
      await router.push('/')
    }
    scrollTarget(target)
  }
  return (
    <div className="max-w-[1300px] mx-auto px-5 md:px-12 xl:px-20">
      <div className="py-[100px] lg:py-[150px]">
        <h1 className="text-4xl md:text-5xl 2xl:text-7xl text-center text-dark font-black">
          DATABASE TRANSFER
        </h1>
        <p className="text-slate-800 leading-6 2xl:text-lg max-w-[700px] mx-auto text-center mt-10">
          The process of transferring your database from one platform to another
          simplified! Whether you want to move your data to a more secure or
          decentralized platform or simply need to transfer your database, TRF
          makes it easy for you to seamlessly transfer your data. We use
          advanced technologies and protocols, such as APIs, encryption, and
          blockchain-based solutions, to ensure that your data is transferred
          securely and efficiently. Experience the freedom of seamless data
          transfer with TRF.
        </p>

        <div className="text-center mt-10">
          <button
            className="bg-primary hover:bg-[#7e46b3e0] text-white rounded-lg w-48 2xl:w-56 py-4 2xl:py-5 shadow-lg"
            onClick={() => scrollToPage('relational_db')}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}
