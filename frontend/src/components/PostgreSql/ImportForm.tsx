import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
// import axios from 'axios'
// import toast, { Toaster } from 'react-hot-toast'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Loader from '../Common/Loader'

const schema = z.object({
  user: z.string().min(1),
  password: z.string().min(1),
  hostname: z.string().min(1),
  port: z.string().min(1),
  database: z.string().min(1),
})

type ImportFormSchema = z.infer<typeof schema>

export default function ImportForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ImportFormSchema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: ImportFormSchema) => {
    setIsSubmitting(true)
    const timestamp = Date.now()
    sessionStorage.setItem('psql_id', timestamp.toString())
    const output = {
      ...data,
      id: timestamp.toString(),
    }
    fetch('https://www.trf.ink/psql-import', {
      body: JSON.stringify(output),
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSubmitting(false)
        toast.success(data?.message)
        router.push({
          pathname: router.route,
          query: {
            im: true,
          },
        })
      })
      .catch(() => {
        setIsSubmitting(false)
        toast.error('An error occured')
      })
  }

  // const onSubmit = useCallback(
  //   async (data: ImportFormSchema) => {
  //     try {
  //       setIsSubmitting(true)

  //       const timestamp = Date.now()
  //       sessionStorage.setItem('psql_id', timestamp.toString())
  //       const output = {
  //         ...data,
  //         id: timestamp.toString(),
  //       }
  //       const res = await axios.post(
  //         'http://138.68.72.216:5500/psql-import',
  //         output
  //       )

  //       if (res.status === 200) {
  //         toast('Import successful', {
  //           duration: 40000,
  //           style: {
  //             border: '1px solid #15d64c',
  //             color: '#15d64c',
  //           },
  //         })
  //         console.log(res.data)
  //         router.push({
  //           pathname: router.route,
  //           query: {
  //             im: true,
  //           },
  //         })
  //       }
  //     } catch (error: any) {
  //       console.log(error)
  //       toast('Error', {
  //         duration: 40000,
  //         style: {
  //           border: '1px solid #d62515',
  //           color: '#d62515',
  //         },
  //       })
  //     } finally {
  //       setIsSubmitting(false)
  //     }
  //   },
  //   [router]
  // )

  return (
    <div className="max-w-[1300px] mx-auto px-5 md:px-12 xl:px-20">
      {/* <Toaster /> */}
      {isSubmitting && <Loader isImporting />}

      <div className="mt-10 max-w-[600px] mx-auto text-center">
        <h2 className="text-dark text-xl font-semibold">
          Import PostgreSQL Database
        </h2>
        <p className="text-sm text-dark mt-2">
          Import an existing PostreSQL database and transfer it to a new
          database by filling out the form below with the old database details.
        </p>

        <div className="mt-10 text-gray-600 inline-block text-xs bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg">
          <p>postgres://User:Password@Hostname:Port/Database</p>
        </div>
      </div>

      <form
        className="max-w-[600px] mx-auto mt-5 bg-gray-50 shadow-lg lg:px-7 py-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label
            className="text-sm text-dark font-medium mb-2 pl-2"
            htmlFor="user"
          >
            User
            {errors && errors?.user && (
              <span className="text-red-500 text-[10px]"> *</span>
            )}
          </label>

          <input
            className="border border-slate-400 h-[45px] bg-transparent rounded-lg text-sm px-4 outline-none"
            id="user"
            placeholder="User"
            type="text"
            {...register('user')}
          />
        </div>

        <div className="flex flex-col pt-5">
          <label
            className="text-sm text-dark font-medium mb-2 pl-2"
            htmlFor="hostname"
          >
            Host name
            {errors && errors?.hostname && (
              <span className="text-red-500 text-[10px]"> *</span>
            )}
          </label>
          <input
            className="border border-slate-400 h-[45px] bg-transparent rounded-lg text-sm px-4 outline-none"
            id="hostname"
            placeholder="Hostname"
            type="text"
            {...register('hostname')}
          />
        </div>

        <div className="flex flex-col pt-5">
          <label
            className="text-sm text-dark font-medium mb-2 pl-2"
            htmlFor="port"
          >
            Port
            {errors && errors?.port && (
              <span className="text-red-500 text-[10px]"> *</span>
            )}
          </label>
          <input
            className="border border-slate-400 h-[45px] bg-transparent rounded-lg text-sm px-4 outline-none"
            id="port"
            placeholder="Port"
            type="text"
            {...register('port')}
          />
        </div>

        <div className="flex flex-col pt-5">
          <label
            className="text-sm text-dark font-medium mb-2 pl-2"
            htmlFor="database"
          >
            Database Name
            {errors && errors?.database && (
              <span className="text-red-500 text-[10px]"> *</span>
            )}
          </label>
          <input
            className="border border-slate-400 h-[45px] bg-transparent rounded-lg text-sm px-4 outline-none"
            id="database"
            placeholder="Database"
            type="text"
            {...register('database')}
          />
        </div>

        <div className="flex flex-col pt-5">
          <label
            className="text-sm text-dark font-medium mb-2 pl-2"
            htmlFor="password"
          >
            Password
            {errors && errors?.password && (
              <span className="text-red-500 text-[10px]"> *</span>
            )}
          </label>
          <input
            className="border border-slate-400 h-[45px] bg-transparent rounded-lg text-sm px-4 outline-none"
            id="password"
            placeholder="Password"
            type="password"
            {...register('password')}
          />
        </div>

        <button
          type="submit"
          className="mt-10 bg-primary hover:bg-[#7e46b3e0] text-white rounded-lg w-full py-4 2xl:py-5 shadow-lg"
        >
          Import
        </button>
      </form>
    </div>
  )
}
