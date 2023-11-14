/* eslint-disable jsdoc/require-returns */
'use client'

import React, {useEffect, useState} from 'react'

import {BlueButton} from '@/components/shared/button'
import {UserSelect} from '@/components/shared/user-select'
import {ADMIN_EMAIL} from '@/lib/constants'
import {useZustand} from '@/lib/store/use-zustand'
import axios from 'axios'
import CredentialSection from './credential-section'
import PlanSection from './plan-section'
import TeamSection from './team-section'

/**
 *
 */
export default function ApiKeyAssign() {
  const [selApiKeyIndex, setSelApiKeyIndex] = useState<number>(0)
  const {apiKeyArr, setApiKeyArr, status, curEmail, setTeam} = useZustand()
  const isAdmin = curEmail === ADMIN_EMAIL

  const onTeamChange = (e: any) => {
    setSelApiKeyIndex(e.target.value)
  }

  const onAddTeam = () => {
    setSelApiKeyIndex(apiKeyArr.length)
    setApiKeyArr([
      ...apiKeyArr,
      {
        name: '',
        apiKey: '',
        emailArr: [],
      },
    ])
  }

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const apiKey = apiKeyArr[selApiKeyIndex]?.apiKey

        if (apiKey) {
          const res = await axios.get(`https://api.sindarin.tech/api/team?apikey=${apiKey}`)
          console.log('res.data', res.data)
          setTeam(res.data)
        }
      } catch (error) {
        console.error('Error fetching team:', error)
      }
    }

    fetchTeam()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selApiKeyIndex])

  return (
    <div className="flex flex-col items-start w-full gap-3 p-6 border rounded-lg border-border-gray bg-bg-light">
      <div className="flex items-center justify-start gap-3">
        <h2 className='text-2xl'>Team</h2>
        {apiKeyArr.length > 1 &&
          <UserSelect
            value={selApiKeyIndex}
            onChange={onTeamChange}
          >
            {apiKeyArr.map((apiKey, index) => (
              <option key={index} value={index}>{apiKey.name}</option>
            ))}
          </UserSelect>
        }
        {status ?
          <div className='text-text-gray'>{status}</div> : isAdmin &&
          <BlueButton onClick={onAddTeam}>Add Team</BlueButton>
        }
      </div>
      {!status && apiKeyArr[selApiKeyIndex] &&
        <TeamSection
          apiKeyIndex={selApiKeyIndex}
          data={apiKeyArr[selApiKeyIndex]}
        />
      }
      <h2 className='text-2xl'>Credentials</h2>
      <div className="flex items-center justify-start gap-3">
        {status ?
          <div className='text-text-gray'>{status}</div> : isAdmin &&
          <BlueButton onClick={onAddTeam}>Add Credential</BlueButton>
        }
      </div>
      {!status && apiKeyArr[selApiKeyIndex] &&
        <CredentialSection
          apiKeyIndex={selApiKeyIndex}
          data={apiKeyArr[selApiKeyIndex]}
        />
      }
      <h2 className='text-2xl'>Plan</h2>
      <div className="flex items-center justify-start gap-3">
        {status ?
          <div className='text-text-gray'>{status}</div> : isAdmin &&
          <BlueButton onClick={onAddTeam}>Update Plan</BlueButton>
        }
      </div>
      {!status && apiKeyArr[selApiKeyIndex] &&
        <PlanSection
          apiKeyIndex={selApiKeyIndex}
          data={apiKeyArr[selApiKeyIndex]}
        />
      }
    </div>
  )
}
