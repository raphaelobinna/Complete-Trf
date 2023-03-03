import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="border-b">
      <nav className="max-w-[1300px] mx-auto px-5 md:px-12 xl:px-20 h-[80px]">
        <div className="h-full flex items-center">
          <Link href="/">
            <h1 className="text-dark font-bold text-2xl xl:text-3xl">TRF</h1>
          </Link>
        </div>
      </nav>
    </div>
  )
}
