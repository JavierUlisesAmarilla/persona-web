

/* eslint-disable jsdoc/require-returns */
'use client'

import {removeData, saveData} from '@/lib/mongodb/mongodb-client'
import React, {useState} from 'react'

import {BlueButton} from '@/components/shared/button'
import {InputText} from '@/components/shared/input-text'
import {UserSelect} from '@/components/shared/user-select'
import {ADMIN_EMAIL} from '@/lib/constants'
import {useZustand} from '@/lib/store/use-zustand'
import {AiOutlineCloseCircle} from 'react-icons/ai'

/**
 *
 */
export default function CredentialSection({apiKeyIndex, data}: any) {
  const {apiKeyArr, setApiKeyArr, curEmail, team} = useZustand()
  const [status, setStatus] = useState('')
  const isAdmin = curEmail === ADMIN_EMAIL
  const isManager = isAdmin || curEmail === apiKeyArr.find((apiKeyObj) => apiKeyObj.emailArr.find((emailObj: any) => emailObj.name === curEmail))?.manager

  const onApiKeyChange = (event: any) => {
    const newApiKeyArr = [...apiKeyArr]
    newApiKeyArr[apiKeyIndex].apiKey = event.target.value
    setApiKeyArr(newApiKeyArr)
  }

  return (
    <div className="flex flex-col w-full gap-3 p-6 border border-gray-200 rounded-lg bg-bg-gray">
      <div className='text-xs whitespace-nowrap'>Tier:</div>
      <InputText
        classNames='w-1/3'
        value={team?.tier}
        placeholder="Tier"
        onChange={onApiKeyChange}
        disabled={!isAdmin && !isManager}
      />
    </div>
  )
}
