/* eslint-disable jsdoc/require-returns */
'use client'

import React, {useEffect} from 'react'

import {ADMIN_EMAIL} from '@/lib/constants'
import {getAllData} from '@/lib/mongodb/mongodb-client'
import {useZustand} from '@/lib/store/use-zustand'
import {Dashboard} from './dashboard'
import Setting from './setting/setting'
import Transcripts from './transcripts/transcripts'
import VoiceChat from './voice-chat/voice-chat'

/**
 *
 */
export default function SignHome({session}: {session: any}) {
  const {selMenu, setCurEmail, status, setStatus, setApiKeyArr, isUser, setIsUser, setSelMenu} = useZustand()

  useEffect(() => {
    (async () => {
      const newCurEmail = session?.user?.email

      if (!newCurEmail || status) {
        return
      }

      setStatus('Loading...')
      setCurEmail(newCurEmail)
      const newApiKeyArr = await getAllData()
      setApiKeyArr(newApiKeyArr)
      const isAdmin = newCurEmail === ADMIN_EMAIL
      const isRealUser = !!newApiKeyArr.find((apiKeyObj: any) => apiKeyObj.emailArr.find((emailObj: any) => emailObj.name === newCurEmail))

      if (isAdmin || isRealUser) {
        setIsUser(true)
        setStatus('')
        setSelMenu('voiceChat')
      } else {
        setIsUser(false)
        setStatus('Your email does not exist.')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  return isUser ? (
    <>
      {selMenu === 'setting' && <Setting/>}
      {selMenu === 'voiceChat' && <VoiceChat/>}
      {selMenu === 'transcripts' && <Transcripts/>}
      {selMenu === 'dashboard' && <Dashboard/>}
    </>
  ) : (
    <div className='z-10 w-full p-6 text-center text-text-gray'>{status}</div>
  )
}
