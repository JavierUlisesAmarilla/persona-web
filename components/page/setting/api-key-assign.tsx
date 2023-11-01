/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsdoc/require-returns */
'use client'

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
    <div className="flex flex-col items-center w-full gap-2 p-4 border border-gray-900 rounded">
      <div className="flex items-center justify-center gap-4">
        <div className="text-xl">API Key Assignment</div>
        {status ?
          <div className='text-xl text-text-notify'>{status}</div> :
          isAdmin &&
          <div
            className='px-3 py-1 rounded cursor-pointer text-text-btn bg-bg-btn hover:text-black'
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
