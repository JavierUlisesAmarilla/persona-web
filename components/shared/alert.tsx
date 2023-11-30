'use client'

import {CommonModal} from '@/components/shared/common-modal'
import {useZustand} from '@/lib/store/use-zustand'
import {BlueButton} from './button'


export const Alert = () => {
  const {alertMsg, setAlertMsg} = useZustand()

  return (
    <CommonModal show={!!alertMsg}>
      <div className='flex flex-col items-center justify-center gap-3 p-6'>
        <div className='text-sm'>{alertMsg}</div>
        <BlueButton onClick={() => setAlertMsg('')}>Ok</BlueButton>
      </div>
    </CommonModal>
  )
}
