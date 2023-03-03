import React from 'react'
import SyntaxHighlighter from './SyntaxHighlighter'
import { convertToHtml } from '@lib/htmlConverter'

export default function SyntaxDisplay({ data }: any) {
  return (
    <div className="mt-16" id="syntax_display">
      {data?.result?.map((item: any) => {
        const text = item.choices[0].text as string
        const res = convertToHtml(text)

        return (
          <div key={item.id} className="mb-5">
            <div className="max-w-[1000px] mx-auto">
              <SyntaxHighlighter code={res} language="html" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
