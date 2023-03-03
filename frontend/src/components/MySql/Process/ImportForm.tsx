import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'react-toastify'
import Loader from '../../Common/Loader'
import { MdClear } from 'react-icons/md'
import SyntaxDisplay from '../../Common/SyntaxDisplay'
import { scroller } from 'react-scroll'

const schema = z.object({
  user: z.string().min(1),
  password: z.string().min(1),
  hostname: z.string().min(1),
  port: z.string().min(1),
  database: z.string().min(1),
})

type ImportFormSchema = z.infer<typeof schema>

export default function ImportForm() {
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [solidityDetails, setSolidityDetails] = useState<any>([])

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
    sessionStorage.setItem('mysql_w3_id', timestamp.toString())
    const output = {
      ...data,
      id: timestamp.toString(),
    }
    fetch('https://www.trf.ink/mysql-import', {
      body: JSON.stringify(output),
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('FIRST REQ', data)
        setIsSubmitting(false)
        setShowModal(true)
        toast.success(data?.message)
      })
      .catch(() => {
        setIsSubmitting(false)
        toast.error('An error occured')
      })
  }

  const generateSolidityCode = () => {
    setIsGenerating(true)
    setIsSubmitting(false)
    setShowModal(false)

    const id = sessionStorage.getItem('mysql_w3_id') as string

    fetch(`https://www.trf.ink/process/mysql/${id}`, {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('SECOND REQ', data)

        toast.success('Process complete')
        setSolidityDetails(data)
        setIsGenerating(false)
        scrollToPage('syntax_display')
      })
      .catch(() => {
        setIsGenerating(false)
        toast.error('An error occured')
      })
  }

  // Scrolls to the generated code area
  const scrollTarget = (target: string) =>
    scroller.scrollTo(target, { smooth: true, duration: 700 })

  const scrollToPage = async (target: string) => {
    scrollTarget(target)
  }

  return (
    <div className="max-w-[1300px] mx-auto px-5 md:px-12 xl:px-20">
      {isSubmitting && <Loader isImporting />}
      {isGenerating && <Loader isGeneratingCode />}
      <GenerateSolidityCodeModal
        showModal={showModal}
        setShowModal={setShowModal}
        generateSolidityCode={generateSolidityCode}
      />

      <div className="mt-10 max-w-[600px] mx-auto text-center">
        <h2 className="text-dark text-xl font-semibold">
          Import MySQL Database
        </h2>
        <p className="text-sm text-dark mt-2">
          Import existing MySQL database and generate Solidity Code.
        </p>

        <div className="mt-10 text-gray-600 inline-block text-xs bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg">
          <p>mysql://root:password@localhost:port/databasename</p>
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
            placeholder="root"
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
            placeholder="localhost"
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
            placeholder="port"
            type="text"
            {...register('port')}
          />
        </div>

        <div className="flex flex-col pt-5">
          <label
            className="text-sm text-dark font-medium mb-2 pl-2"
            htmlFor="database"
          >
            Database
            {errors && errors?.database && (
              <span className="text-red-500 text-[10px]"> *</span>
            )}
          </label>
          <input
            className="border border-slate-400 h-[45px] bg-transparent rounded-lg text-sm px-4 outline-none"
            id="database"
            placeholder="database name"
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
            placeholder="* * * * * * *"
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
      {solidityDetails && <SyntaxDisplay data={solidityDetails} />}
    </div>
  )
}

const GenerateSolidityCodeModal = ({
  showModal = false,
  setShowModal,
  generateSolidityCode,
}: {
  showModal?: boolean
  setShowModal: any
  generateSolidityCode: () => void
}) => {
  return (
    <div
      className={`fixed w-full h-full left-0 top-0 bg-[#e9d5ff8f] ${
        showModal ? 'flex' : 'hidden'
      } justify-center items-center`}
    >
      <div className="bg-[#7e46b3] w-[250px] py-7 rounded-lg flex justify-center items-center relative">
        <button
          className="absolute top-2 right-3"
          onClick={() => setShowModal(false)}
        >
          <MdClear color="white" size="1rem" />
        </button>

        <div className="w-full px-3 h-full text-center">
          <p className="text-white font-medium text-lg">Import complete</p>
          <p className="text-white text-sm font-medium mt-3">
            Generate solidity code
          </p>
          <div className="mt-10">
            <button
              type="button"
              className="bg-white text-black rounded-lg w-full py-3 text-sm font-semibold"
              onClick={generateSolidityCode}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
