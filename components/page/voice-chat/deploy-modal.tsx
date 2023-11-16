'use client'

import React, {useState} from 'react'

import {BlueButton} from '@/components/shared/button'
import {CommonModal} from '@/components/shared/common-modal'
import {DeployJsModal} from './deploy-js-modal'
import {DeployTwilioModal} from './deploy-twilio-modal'


interface Props {
  show?: boolean
  onClose?: React.MouseEventHandler<SVGElement>
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
        <div className='flex flex-col items-center justify-center gap-3 p-6'>
          <div className='text-sm'>Deploy to:</div>
          <BlueButton style={{width: '120px'}} onClick={() => setShowTwilioModal(true)}>Phone (Twilio)</BlueButton>
          <BlueButton style={{width: '120px'}} onClick={() => setShowJsModal(true)}>Browser (JS)</BlueButton>
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
