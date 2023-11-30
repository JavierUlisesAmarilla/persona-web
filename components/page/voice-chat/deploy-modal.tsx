'use client'

import {BlueButton} from '@/components/shared/button'
import {CommonModal} from '@/components/shared/common-modal'
import {isFunction} from '@/lib/common'
import {useState} from 'react'
import {DeployJsModal} from './deploy-js-modal'
import {DeployTwilioModal} from './deploy-twilio-modal'


interface Props {
  show?: boolean
  onClose?: any
}


export const DeployModal = ({
  show,
  onClose,
}: Props) => {
  const [showTwilioModal, setShowTwilioModal] = useState(false)
  const [showJsModal, setShowJsModal] = useState(false)

  return (
    <>
      <CommonModal
        show={show}
        onClose={onClose}
      >
        <div className='flex flex-col items-center justify-center w-full h-full gap-3 p-6'>
          <div className='text-sm'>Deploy to:</div>
          <BlueButton
            style={{width: '120px'}}
            onClick={() => {
              setShowTwilioModal(true)

              if (isFunction(onClose)) {
                onClose()
              }
            }}
          >
            Phone (Twilio)
          </BlueButton>
          <BlueButton
            style={{width: '120px'}}
            onClick={() => {
              setShowJsModal(true)

              if (isFunction(onClose)) {
                onClose()
              }
            }}
          >
            Browser (JS)
          </BlueButton>
          <BlueButton style={{width: '120px'}}>Unity</BlueButton>
          <BlueButton style={{width: '120px'}}>Other</BlueButton>
        </div>
      </CommonModal>
      <DeployTwilioModal
        show={showTwilioModal}
        onClose={() => setShowTwilioModal(false)}
      />
      <DeployJsModal
        show={showJsModal}
        onClose={() => setShowJsModal(false)}
      />
    </>
  )
}
