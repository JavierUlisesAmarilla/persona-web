'use client'

import {useZustand} from '../../../lib/store/use-zustand'
import {ApiKeyAssign} from './api-key-assign'


export const Setting = () => {
  const {canSeeSettings, status} = useZustand()

  return canSeeSettings ? (
    <div className="z-10 flex flex-col w-full h-full">
      <ApiKeyAssign/>
    </div>
  ) : (
    <div className='z-10 text-2xl font-semibold'>{status}</div>
  )
}
