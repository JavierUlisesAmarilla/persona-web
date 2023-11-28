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
  const {apiKeyArr, setApiKeyArr, status, curEmail, setTeam, selApiKeyIndex, setSelApiKeyIndex} = useZustand()
  const isAdmin = curEmail === ADMIN_EMAIL
  const isManager = isAdmin || (apiKeyArr[selApiKeyIndex]?.manager === curEmail)

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
    <div className="flex flex-col items-start w-full gap-3 p-6 bg-bg-gray">
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
      <div className="flex items-center justify-end w-full gap-3">
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
      <div className="flex items-center justify-end w-full gap-3">
        {status ?
          <div className='text-text-gray'>{status}</div> : isManager &&
          <BlueButton onClick={() => setShowPlanModal(true)}>Update Plan</BlueButton>
        }
      </div>
      {!status && apiKeyArr[selApiKeyIndex] &&
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
