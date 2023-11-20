/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsdoc/require-returns */
'use client'

import React, {useState} from 'react'

import {useZustand} from '@/lib/store/use-zustand'

/**
 *
 */
export default function CredentialSection({apiKeyIndex, data}: any) {
  const {team} = useZustand()
  const [status1, setStatus1] = useState('')
  const [status2, setStatus2] = useState('')


  return (
    <div className="flex flex-col w-full gap-3 p-6 border border-gray-200 rounded-lg bg-bg-gray">
      <div className='text-xs whitespace-nowrap'><strong>PRIVATE API Key</strong> (Keep this secret!):</div>
      <div
        className='flex items-center justify-between w-fit h-6 px-3 py-2 text-sm text-gray-500 bg-white rounded cursor-pointer'
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
      <div className={`flex fade-out transition-opacity duration-2000 text-sm text-gray-500 ${status1 ? 'opacity-0' : 'opacity-100'}`}>{status1}</div>
      <div className='text-xs whitespace-nowrap'><strong>PUBLIC API Key</strong> (Use this in the Browser client):</div>
      <div
        className='flex items-center justify-between w-fit h-6 px-3 py-2 text-sm text-gray-500 bg-white rounded cursor-pointer'
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
      <div className={`flex fade-out transition-opacity duration-2000 text-sm text-gray-500 ${status2 ? 'opacity-0' : 'opacity-100'}`}>{status2}</div>
    </div>
  )
}
