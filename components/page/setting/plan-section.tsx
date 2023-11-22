/* eslint-disable no-unused-vars */
/* eslint-disable jsdoc/require-returns */
'use client'

import {InputText} from '@/components/shared/input-text'
import {ADMIN_EMAIL, SINDARIN_API_URL} from '@/lib/constants'
import {useApiKey} from '@/lib/hooks/use-api-key'
import {useZustand} from '@/lib/store/use-zustand'
import React, {useEffect} from 'react'

/**
 *
 */
export default function PlanSection({apiKeyIndex, data}: any) {
  const {apiKeyArr, setApiKeyArr, curEmail, team} = useZustand()
  const isAdmin = curEmail === ADMIN_EMAIL
  const isManager = isAdmin || curEmail === apiKeyArr.find((apiKeyObj) => apiKeyObj.emailArr.find((emailObj: any) => emailObj.name === curEmail))?.manager
  const apiKey = useApiKey()

  const onApiKeyChange = (event: any) => {
    const newApiKeyArr = [...apiKeyArr]
    newApiKeyArr[apiKeyIndex].apiKey = event.target.value
    setApiKeyArr(newApiKeyArr)
  }

  const messagesUsedString = `${team?.currentMessagesCount || 0} / ${team?.monthlyMessageLimit || 0}`
  const isOver90Percent = team?.currentMessagesCount / team?.monthlyMessageLimit > 0.9
  const nextMessageReset = team?.nextMessageResetDate ? new Date(team?.nextMessageResetDate).toLocaleString() : 'N/A'
  console.log('messagesUsedString HERE', messagesUsedString)

  return (
    <div className="flex flex-col w-full gap-3 p-6 border border-gray-200 rounded-lg bg-bg-gray">
      <div className='text-xs whitespace-nowrap'>Tier:</div>
      <InputText
        classNames='w-fit'
        value={team?.tier || 'free'}
        placeholder="Tier"
        // onChange={onApiKeyChange}
        disabled={true}
      />
      <div className='text-xs whitespace-nowrap'>Messages used this month:</div>
      <InputText
        classNames={`w-fit ${isOver90Percent ? 'text-red-500 border-red-500' : ''}`}
        value={messagesUsedString}
        placeholder="Messages used this month"
        // onChange={onApiKeyChange}
        disabled={true}
      />
      <div className='text-xs whitespace-nowrap'>Monthly messages reset at:</div>
      <InputText
        classNames='w-fit'
        value={nextMessageReset}
        placeholder="Messages used this month"
        // onChange={onApiKeyChange}
        disabled={true}
      />
    </div>
  )
}
