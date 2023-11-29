/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsdoc/require-returns */
'use client'

import {useZustand} from '@/lib/store/use-zustand'
import {useState} from 'react'

/**
 *
 */
export default function CredentialSection({apiKeyIndex, data}: any) {
  const {team} = useZustand()
  const [status1, setStatus1] = useState('')
  const [status2, setStatus2] = useState('')


  return (
    <div className="flex flex-col w-full px-6 border border-gray-200 rounded-lg bg-bg-light">
      <div className='flex items-center justify-between w-full py-6 border-b border-b-border-gray'>
        <div className='flex items-center gap-2 text-xs whitespace-nowrap'>
          <div className='text-base font-medium'>PRIVATE API Key</div>
          <div>(Keep this secret!):</div>
        </div>
        <div className='relative flex items-center justify-center'>
          <div
            className='flex items-center justify-between h-6 px-2 py-3 text-sm text-gray-500 bg-white border rounded cursor-pointer w-fit border-border-gray'
            onClick={async () => {
              await navigator.clipboard.writeText(data?.apiKey)
              setStatus1('Copied.')
              setTimeout(() => setStatus1(''), 2000)
            }}
          >
            <span className='mr-2'>{data?.apiKey}</span>
            <img
              className="w-4 h-4"
              src="/copy-to-clipboard.svg"
              alt="Copy to clipboard"
            />
          </div>
          <div className={`absolute -right-12 flex fade-out transition-opacity duration-2000 text-sm text-gray-500 ${status1 ? 'opacity-0' : 'opacity-100'}`}>{status1}</div>
        </div>
      </div>
      <div className='flex items-center justify-between w-full py-6'>
        <div className='flex items-center gap-2 text-xs whitespace-nowrap'>
          <div className='text-base font-medium'>PUBLIC API Key</div>
          <div>(Use this in the Browser client):</div>
        </div>
        <div className='relative flex items-center justify-center'>
          <div
            className='flex items-center justify-between h-6 px-2 py-3 text-sm text-gray-500 bg-white border rounded cursor-pointer w-fit border-border-gray'
            onClick={async () => {
              await navigator.clipboard.writeText(team?.webapp?.publicToken)
              setStatus2('Copied.')
              setTimeout(() => setStatus2(''), 2000)
            }}
          >
            <span className='mr-2'>{team?.webapp?.publicToken}</span>
            <img
              className="w-4 h-4"
              src="/copy-to-clipboard.svg"
              alt="Copy to clipboard"
            />
          </div>
          <div className={`absolute -right-12 flex fade-out transition-opacity duration-2000 text-sm text-gray-500 ${status2 ? 'opacity-0' : 'opacity-100'}`}>{status2}</div>
        </div>
      </div>

    </div>
  )
}
