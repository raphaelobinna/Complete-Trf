import React from 'react'
import { FaArrowRight, FaArrowLeft, FaArrowDown } from 'react-icons/fa'
import { GiCycle } from 'react-icons/gi'

interface Props {
  isImporting?: boolean
  isExporting?: boolean
  isGeneratingCode?: boolean
}

export default function Loader({
  isImporting,
  isExporting,
  isGeneratingCode,
}: Props) {
  return (
    <div className="fixed w-full h-full left-0 top-0 bg-[#e9d5ff8f] flex justify-center items-center">
      {isImporting && (
        <div className="bg-[#7e46b3] w-[200px] h-[130px] rounded-lg flex flex-col justify-center items-center gap-3">
          <FaArrowDown size="2rem" className="arrow_down" color="#ffffff" />
          <p className="text-white text-xs">Importing Database</p>
        </div>
      )}

      {isExporting && (
        <div className="bg-[#7e46b3] w-[200px] h-[130px] rounded-lg flex flex-col justify-center items-center gap-3">
          <FaArrowRight size="2rem" className="arrow_right" color="#ffffff" />
          <FaArrowLeft size="2rem" className="arrow_left" color="#ffffff" />
          <p className="text-white text-xs">Exporting Database</p>
        </div>
      )}

      {isGeneratingCode && (
        <div className="bg-[#7e46b3] w-[200px] h-[150px] rounded-lg flex flex-col justify-center items-center gap-3">
          <GiCycle size="2.5rem" className="rotate" color="#ffffff" />

          <p className="text-white text-xs">Generating Solidity Code</p>
        </div>
      )}
    </div>
  )
}
