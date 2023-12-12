'use client'

import {useEffect, useState} from 'react'

import {BlueButton} from '@/components/shared/button'
import {UserSelect} from '@/components/shared/user-select'
import {ADMIN_EMAIL} from '@/lib/constants'
import {getTeam} from '@/lib/persona'
import {useZustand} from '@/lib/store/use-zustand'
import CredentialSection from './credential-section'
import {PlanModal} from './plan-modal'
import PlanSection from './plan-section'
import {TeamSection} from './team-section'


export const ApiKeyAssign = () => {
  const [showPlanModal, setShowPlanModal] = useState(false)
  const {apiKeyArr, setApiKeyArr, curEmail, setTeam, selApiKeyIndex, setSelApiKeyIndex} = useZustand()
  const isAdmin = curEmail === ADMIN_EMAIL
  const isManager = isAdmin || (apiKeyArr[selApiKeyIndex]?.manager === curEmail)
  console.log('apiKeyArr: ', apiKeyArr)

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
          const team = await getTeam(apiKey)
          setTeam(team)
        }
      } catch (error) {
        console.error('Error fetching team:', error)
      }
    }

    fetchTeam()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selApiKeyIndex])

  return (
    <div className="flex flex-col items-start w-full gap-3 p-6">
      <div className="flex items-center justify-start gap-3">
        <div className='text-2xl font-semibold'>Team</div>
        {apiKeyArr.length > 1 &&
          <UserSelect
            className='text-xs border-gray-200'
            value={selApiKeyIndex}
            onChange={onTeamChange}
          >
            {apiKeyArr.map((apiKey, index) => (
              <option key={index} value={index}>{apiKey.name}</option>
            ))}
          </UserSelect>
        }
        {apiKeyArr.length > 1 && <BlueButton onClick={onAddTeam}>Add Team</BlueButton>}
      </div>
      {apiKeyArr[selApiKeyIndex] &&
        <TeamSection
          apiKeyIndex={selApiKeyIndex}
          data={apiKeyArr[selApiKeyIndex]}
        />
      }
      <div className='flex items-center gap-3'>
        <div className='text-2xl font-semibold'>Credentials</div>
        <div className="flex items-center justify-end w-full gap-3">
          <BlueButton onClick={onAddTeam}>Add Credential</BlueButton>
        </div>
      </div>
      {apiKeyArr[selApiKeyIndex] &&
        <CredentialSection
          apiKeyIndex={selApiKeyIndex}
          data={apiKeyArr[selApiKeyIndex]}
        />
      }

      <div className="flex items-center justify-between w-full gap-3">
        <div className='text-2xl font-semibold'>Plan</div>
        {isManager &&
          <BlueButton onClick={() => setShowPlanModal(true)}>Update Plan</BlueButton>
        }
      </div>
      {apiKeyArr[selApiKeyIndex] &&
        <PlanSection
          apiKeyIndex={selApiKeyIndex}
          data={apiKeyArr[selApiKeyIndex]}
        />
      }
      <PlanModal
        show={showPlanModal}
        onClose={() => setShowPlanModal(false)}
      />
    </div>
  )
}
