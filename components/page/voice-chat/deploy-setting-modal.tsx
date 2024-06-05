'use client'

import {CommonModal} from '@/components/shared/common-modal'
import {useState} from 'react'
import {BlueButton} from '../../shared/button'
import {InputText} from '../../shared/input-text'


interface Props {
  show?: boolean
  onClose?: any
}


export const DeploySettingModal = ({
  show,
  onClose,
}: Props) => {
  const [rateLimitCheckboxState, setRateLimitCheckboxState] = useState(false)
  const [rateLimit, setRateLimit] = useState(200)

  const onToggleRateLimit = async (enabled: boolean) => {
    // TODO
  }

  const onRateLimit = async () => {
    // TODO
  }

  return (
    <CommonModal
      show={show}
      onClose={onClose}
    >
      <div className='flex-grow gap-2 p-4 border rounded-lg bg-bg-dark-blue'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='text-xs text-gray-400'>Message Limit</div>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={rateLimitCheckboxState} onChange={(e) => {
                  setRateLimitCheckboxState(e.target.checked)
                  onToggleRateLimit(e.target.checked)
                }}
                />
                <div className={`block bg-bg-dark-blue w-4 h-4 ml-2 rounded border border-gray-500 ${rateLimitCheckboxState ? '' : 'bg-bg-dark-blue'}`}>
                  <svg className={`text-white w-4 h-4 pointer-events-none ${rateLimitCheckboxState ? '' : 'hidden'}`} viewBox="0 0 20 20" fill="currentColor" style={{position: 'relative', left: '-1px', bottom: '1px'}}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
            </label>
            {rateLimitCheckboxState &&
              <input
                type="text"
                className={`rounded ${rateLimit.toString().length === 1 ? 'w-4' : rateLimit.toString().length === 2 ? 'w-6' : 'w-8'} h-4 bg-bg-dark-blue border-b border-gray-500 text-white text-xs ml-2 pr-1 pl-1`}
                value={rateLimit.toString()}
                maxLength={3}
                placeholder="Lim"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    return event.preventDefault()
                  }
                }}
                onChange={(event) => {
                  setRateLimit(parseInt(event.target.value) || 0)
                }}
              />
            }
          </div>
          <BlueButton onClick={onRateLimit} disabled={!rateLimitCheckboxState}>Save</BlueButton>
        </div>
        <InputText
          classNames={`w-full bg-transparent ${rateLimitCheckboxState ? 'text-white' : 'text-gray-400'} border-0`}
          style={{padding: 0}}
          // value={personaArr[selPersonaIndex]?.rateLimitMessage || ''}
          placeholder='Enter rate limit message here'
          onChange={(e) => {
            if (rateLimitCheckboxState) {
              // setScenarioRateLimit(selPersonaIndex, e.target.value)
            }
          }}
          disabled={!rateLimitCheckboxState}
        />
      </div>
    </CommonModal>
  )
}
