/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsdoc/require-returns */
'use client'

import React from 'react'
import {useZustand} from '@/lib/store/use-zustand'
import TeamKey from './team-key'
import {ADMIN_EMAIL} from '@/lib/constants'


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
    <div className="flex flex-col items-center w-full gap-2 p-4 border border-gray-900 rounded">
      <div className="flex items-center justify-center gap-4">
        <div className="text-xl">API Key Assignment</div>
        {status ?
          <div className='text-xl text-blue-500'>{status}</div> : isAdmin &&
          <div
            className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
            onClick={onAddTeam}
          >
            Add Team
          </div>
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
