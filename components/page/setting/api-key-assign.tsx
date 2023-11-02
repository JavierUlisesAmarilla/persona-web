

/* eslint-disable jsdoc/require-returns */
'use client'

import {Button} from '@/components/shared/button'
import {ADMIN_EMAIL} from '@/lib/constants'
import {useZustand} from '@/lib/store/use-zustand'
import React from 'react'
import TeamKey from './team-key'


/**
 *
 */
export default function ApiKeyAssign() {
  const {apiKeyArr, setApiKeyArr, status, curEmail} = useZustand()
  const isAdmin = curEmail === ADMIN_EMAIL

  const onAddTeam = () => {
    setApiKeyArr([
      ...apiKeyArr,
      {
        name: '',
        apiKey: '',
        emailArr: [],
      },
    ])
  }

  return (
    <div className="flex flex-col items-center w-full gap-2 p-4 border border-gray-200 rounded">
      <div className="flex items-center justify-center gap-4">
        <div className="text-sm font-bold">API Key Assignment</div>
        {status ?
          <div className='text-sm text-text-notify'>{status}</div> :
          isAdmin &&
          <Button onClick={onAddTeam}>Add Team</Button>
        }
      </div>
      {!status && apiKeyArr?.map((apiKeyObj, index) =>
        <TeamKey
          key={index}
          apiKeyIndex={index}
          data={apiKeyObj}
        />,
      )}
    </div>
  )
}
