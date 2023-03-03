import React from 'react'
import Image from 'next/image'
import { BiLinkExternal } from 'react-icons/bi'
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'

export default function Databases() {
  const dbList = [
    {
      label: 'MySQL',
      image: '/images/mysql-logo.png',
      description:
        'Relational database management system (RDBMS) developed by Oracle that is based on structured query language (SQL).',
      route: '/mysql',
    },
    {
      label: 'PostgreSQL',
      image: '/images/postgresql-logo.png',
      description:
        'Powerful object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads.',
      route: '/postgresql',
    },
  ]

  const dbWeb3List = [
    {
      label: 'MySQL',
      image: '/images/mysql-logo.png',
      description:
        'Migrate your MySQL database to Web3, a solidity code will be generated for you.',
      route: '/mysql/w3',
    },
    {
      label: 'PostgreSQL',
      image: '/images/postgresql-logo.png',
      description:
        'Migrate your PostgreSQL database to Web3, a solidity code will be generated for you.',

      route: '/postgresql',
    },
  ]

  return (
    <div className="max-w-[1300px] mx-auto px-5 md:px-12 xl:px-20">
      <div>
        <h2 className="text-2xl text-dark font-semibold" id="relational_db">
          Relational Database Management Systems
        </h2>

        <div className="flex items-center text-xs font-semibold text-slate-600 mt-3">
          <p>Web2 </p>
          <div className="px-2">
            <BsArrowRight />
          </div>
          <p>Web2 </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14 mt-10">
          {dbList.map((item) => {
            return (
              <Link
                key={item.label}
                className="hover:bg-slate-100 group p-3 rounded-2xl"
                href={item.route}
                passHref
              >
                <div className="flex gap-5">
                  <div className="border border-slate-300 bg-slate-100 shadow-lg w-[60px] h-[60px] rounded-full flex justify-center items-center">
                    <Image
                      alt=""
                      src={item.image}
                      width={40}
                      height={40}
                      priority
                    />
                  </div>

                  <div className="w-4/5 pt-2">
                    <div className="flex item-center gap-2">
                      <p className="font-semibold text-dark">{item.label}</p>
                      <p className="group-hover:text-xl text-xs transition-all duration-500 text-slate-500">
                        <BiLinkExternal />
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl text-dark font-semibold">
          Decentralized Database Management Systems
        </h2>

        <div className="flex items-center text-xs font-semibold text-slate-600 mt-3">
          <p>Web2 </p>
          <div className="px-2">
            <BsArrowRight />
          </div>
          <p>Web3 </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14 mt-10">
          {dbWeb3List.map((item) => {
            return (
              <Link
                key={item.label}
                className="hover:bg-slate-100 group p-3 rounded-2xl"
                href={item.route}
                passHref
              >
                <div className="flex gap-5">
                  <div className="border border-slate-300 bg-slate-100 shadow-lg w-[60px] h-[60px] rounded-full flex justify-center items-center">
                    <Image
                      alt=""
                      src={item.image}
                      width={40}
                      height={40}
                      priority
                    />
                  </div>

                  <div className="w-4/5 pt-2">
                    <div className="flex item-center gap-2">
                      <p className="font-semibold text-dark">{item.label}</p>
                      <p className="group-hover:text-xl text-xs transition-all duration-500 text-slate-500">
                        <BiLinkExternal />
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
