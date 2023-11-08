/* eslint-disable jsdoc/require-returns */
'use client'

import {InputText} from '@/components/shared/input-text'
import {ADMIN_EMAIL} from '@/lib/constants'
import {useZustand} from '@/lib/store/use-zustand'
import React from 'react'

/**
 *
 */
export default function CredentialSection({apiKeyIndex, data}: any) {
  const {apiKeyArr, setApiKeyArr, curEmail} = useZustand()
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
      <InputText
        classNames='w-1/3'
        value={data?.apiKey}
        placeholder="API Key"
        onChange={onApiKeyChange}
        disabled={!isAdmin && !isManager}
      />
      <div className='text-xs whitespace-nowrap'>Public API Key:</div>
      <InputText
        classNames='w-1/3'
        value={data?.apiKey}
        placeholder="API Key"
        onChange={onApiKeyChange}
        disabled={!isAdmin && !isManager}
      />
    </div>
  )
}
