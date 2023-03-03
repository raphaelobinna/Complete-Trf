import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className="bg-primary mt-[100px] py-14 text-white">
      <div className="max-w-[1300px] mx-auto px-5 md:px-12 xl:px-20">
        <div className="flex flex-col lg:flex-row gap-5 justify-between items-center">
          <Link href="/">
            <h1 className="text-white font-bold text-2xl xl:text-3xl">TRF</h1>
          </Link>

          <p className="text-xs">
            Copyright © 2022 TRF Limited. All rights reserved
          </p>
        </div>
      </div>
    </div>
  )
}
