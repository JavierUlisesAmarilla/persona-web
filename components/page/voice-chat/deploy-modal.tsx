'use client'

import {BlueButton} from '@/components/shared/button'
import {CommonModal} from '@/components/shared/common-modal'
import React from 'react'


interface Props {
  show: boolean
  onClose: React.MouseEventHandler<SVGElement>
}


export const DeployModal = ({
  show,
  onClose,
}: Props) => {
  return (
    <CommonModal
      show={show}
      onClose={onClose}
    >
      <div className='flex flex-col items-center justify-center gap-3 p-6'>
        <div className='text-sm'>Deploy to:</div>
        <BlueButton>Phone (Twilio)</BlueButton>
        <BlueButton>Browser (JS)</BlueButton>
        <BlueButton>Unity</BlueButton>
        <BlueButton>Other</BlueButton>
      </div>
    </CommonModal>
  )
}
