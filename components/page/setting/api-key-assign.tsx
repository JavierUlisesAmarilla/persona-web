

/* eslint-disable jsdoc/require-returns */
'use client'

import {BlueButton} from '@/components/shared/button'
import {ADMIN_EMAIL} from '@/lib/constants'
import {useZustand} from '@/lib/store/use-zustand'
import React, {useEffect, useState} from 'react'
import TeamSection from './team-section'
import CredentialSection from './credential-section'
import PlanSection from './plan-section'
import axios from 'axios'

/**
 *
 */
export default function ApiKeyAssign() {
  const {apiKeyArr, setApiKeyArr, status, curEmail, team, setTeam} = useZustand()
  const isAdmin = curEmail === ADMIN_EMAIL

  const API_KEY = apiKeyArr.find((apiKeyObj) => apiKeyObj.emailArr.find((emailObj: any) => emailObj.name === curEmail))?.apiKey

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

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(`https://api.sindarin.tech/api/team?apikey=${API_KEY}`);
        console.log('res.data', res.data)
        setTeam(res.data)
      } catch (error) {
        console.error('Error fetching team:', error)
      }
    }
    fetchTeam()
  }, [])


  return (
    <div className="flex flex-col items-start w-full gap-3 p-6 border rounded-lg border-border-gray bg-bg-light">
      <div className="flex items-center justify-start gap-3">
        <h2 className='text-2xl'>Team</h2>
        {status ?
          <div className='text-text-gray'>{status}</div> : isAdmin &&
          <BlueButton onClick={onAddTeam}>Add Team</BlueButton>
        }
      </div>
      {!status && apiKeyArr?.map((apiKeyObj, index) =>
        <TeamSection
          key={index}
          apiKeyIndex={index}
          data={apiKeyObj}
        />,
      )}
      <h2 className='text-2xl'>Credentials</h2>
      <div className="flex items-center justify-start gap-3">
        {status ?
          <div className='text-text-gray'>{status}</div> : isAdmin &&
          <BlueButton onClick={onAddTeam}>Add Credential</BlueButton>
        }
      </div>
      {!status && apiKeyArr?.map((apiKeyObj, index) =>
        <CredentialSection
          key={index}
          apiKeyIndex={index}
          data={apiKeyObj}
        />,
      )}
      <h2 className='text-2xl'>Plan</h2>
      <div className="flex items-center justify-start gap-3">
        {status ?
          <div className='text-text-gray'>{status}</div> : isAdmin &&
          <BlueButton onClick={onAddTeam}>Update Plan</BlueButton>
        }
      </div>
      {!status && apiKeyArr?.map((apiKeyObj, index) =>
        <PlanSection
          key={index}
          apiKeyIndex={index}
          data={apiKeyObj}
        />,
      )}
    </div>
  )
}
