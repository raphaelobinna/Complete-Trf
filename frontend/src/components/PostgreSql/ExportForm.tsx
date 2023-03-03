import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import Loader from '../Common/Loader'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const schema = z.object({
  user: z.string().min(1),
  password: z.string().min(1),
  hostname: z.string().min(1),
  port: z.string().min(1),
  database: z.string().min(1),
})

type ImportFormSchema = z.infer<typeof schema>

export default function ExportForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [generatedId, setGeneratedId] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ImportFormSchema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = useCallback(
    async (data: ImportFormSchema) => {
      setIsSubmitting(true)

      const output = {
        ...data,
        id: generatedId,
      }

      fetch('https://www.trf.ink/psql-export', {
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
        .then(() => {
          setIsSubmitting(false)
          toast.success('Database exported successfully')
          router.push({
            pathname: router.route,
            query: {
              im: false,
            },
          })
        })
        .catch(() => {
          setIsSubmitting(false)
          toast.error('An error occured')
        })
    },
    [generatedId, router]
  )

  useEffect(() => {
    const genId = sessionStorage.getItem('psql_id') as string
    if (genId) {
      setGeneratedId(genId)
    } else if (genId === null) {
      router.push({
        pathname: router.route,
        query: {
          im: false,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="max-w-[1300px] mx-auto px-5 md:px-12 xl:px-20">
      {/* <Toaster /> */}
      {isSubmitting && <Loader isExporting />}
      <div className="mt-10 max-w-[600px] mx-auto text-center">
        <h2 className="text-dark text-xl font-semibold">
          Export to a New PostgreSQL Database
        </h2>
        <p className="text-sm text-dark mt-2">
          Fill in the details of your new to complete the transfer.
        </p>

        <div className="mt-10 text-gray-600 inline-block text-xs bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg">
          <p>postgres://User:Password@Hostname:Port/Database</p>
        </div>
      </div>

      <form
        className="max-w-[600px] mx-auto mt-5 bg-gray-50 shadow-lg lg:px-7 py-7 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label
            className="text-sm text-dark font-medium mb-2 pl-2"
            htmlFor="_user"
          >
            User
            {errors && errors?.user && (
              <span className="text-red-500 text-[10px]"> *</span>
            )}
          </label>

          <input
            className="border border-slate-400 h-[45px] bg-transparent rounded-lg text-sm px-4 outline-none"
            id="_user"
            {...register('user')}
            placeholder="User"
            type="text"
          />
        </div>

        <div className="flex flex-col pt-5">
          <label
            className="text-sm text-dark font-medium mb-2 pl-2"
            htmlFor="_hostname"
          >
            Host name
            {errors && errors?.hostname && (
              <span className="text-red-500 text-[10px]"> *</span>
            )}
          </label>
          <input
            className="border border-slate-400 h-[45px] bg-transparent rounded-lg text-sm px-4 outline-none"
            id="_hostname"
            placeholder="Hostname"
            type="text"
            {...register('hostname')}
          />
        </div>

        <div className="flex flex-col pt-5">
          <label
            className="text-sm text-dark font-medium mb-2 pl-2"
            htmlFor="_port"
          >
            Port
            {errors && errors?.port && (
              <span className="text-red-500 text-[10px]"> *</span>
            )}
          </label>
          <input
            className="border border-slate-400 h-[45px] bg-transparent rounded-lg text-sm px-4 outline-none"
            id="_port"
            placeholder="Port"
            type="text"
            {...register('port')}
          />
        </div>

        <div className="flex flex-col pt-5">
          <label
            className="text-sm text-dark font-medium mb-2 pl-2"
            htmlFor="_database"
          >
            Database Name
            {errors && errors?.database && (
              <span className="text-red-500 text-[10px]"> *</span>
            )}
          </label>
          <input
            className="border border-slate-400 h-[45px] bg-transparent rounded-lg text-sm px-4 outline-none"
            id="_database"
            placeholder="Database"
            type="text"
            {...register('database')}
          />
        </div>

        <div className="flex flex-col pt-5">
          <label
            className="text-sm text-dark font-medium mb-2 pl-2"
            htmlFor="_password"
          >
            Password
            {errors && errors?.password && (
              <span className="text-red-500 text-[10px]"> *</span>
            )}
          </label>
          <input
            className="border border-slate-400 h-[45px] bg-transparent rounded-lg text-sm px-4 outline-none"
            id="_password"
            placeholder="Password"
            type="password"
            {...register('password')}
          />
        </div>

        <button
          type="submit"
          className="mt-10 bg-primary hover:bg-[#7e46b3e0] text-white rounded-lg w-full py-4 2xl:py-5 shadow-lg"
        >
          Export
        </button>
      </form>
    </div>
  )
}
