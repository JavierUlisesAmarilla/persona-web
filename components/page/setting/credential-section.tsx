/* eslint-disable jsdoc/require-returns */
'use client'

import {InputText} from '@/components/shared/input-text'
import {ADMIN_EMAIL} from '@/lib/constants'
import {useZustand} from '@/lib/store/use-zustand'
import React, {useState} from 'react'

/**
 *
 */
export default function CredentialSection({apiKeyIndex, data}: any) {

  const {apiKeyArr, setApiKeyArr, curEmail, team} = useZustand()
  const [status1, setStatus1] = useState('')
  const [status2, setStatus2] = useState('')
  const isAdmin = curEmail === ADMIN_EMAIL
  const isManager = isAdmin || curEmail === apiKeyArr.find((apiKeyObj) => apiKeyObj.emailArr.find((emailObj: any) => emailObj.name === curEmail))?.manager

  const onApiKeyChange = (event: any) => {
    const newApiKeyArr = [...apiKeyArr]
    newApiKeyArr[apiKeyIndex].apiKey = event.target.value
    setApiKeyArr(newApiKeyArr)
  }

  return (
    <div className="flex flex-col w-full gap-3 p-6 border border-gray-200 rounded-lg bg-bg-gray">
      <div className='text-xs whitespace-nowrap'>Private API Key:</div>
      <div
        className='flex w-2/5 items-center justify-between px-3 py-2 text-sm text-gray-500 bg-white rounded cursor-pointer h-6'
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
      <div className='text-xs whitespace-nowrap'>Public API Key:</div>
      <div
        className='flex w-2/5 items-center justify-between px-3 py-2 text-sm text-gray-500 bg-white rounded cursor-pointer h-6'
        onClick={async () => {
          await navigator.clipboard.writeText(team?.webapp.publicToken)
          setStatus2('Copied.')
          setTimeout(() => setStatus2(''), 2000)
        }}
      >
        <span className='mr-2'>{team?.webapp.publicToken}</span>
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
