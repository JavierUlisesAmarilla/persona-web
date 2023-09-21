/* eslint-disable jsdoc/require-returns */
'use client'
import React, {useEffect} from 'react'
import {Session} from 'next-auth'
import {useZustand} from '@/lib/store/use-zustand'
import Setting from './setting/setting'
import VoiceChat from './voice-chat/voice-chat'


/**
 *
 */
export default function SignHome({session}: { session: Session | null }) {
  const {selMenu, setCurEmail} = useZustand()

  useEffect(() => {
    setCurEmail(session?.user?.email || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.email])

  return (
    <>
      {selMenu === 'setting' && <Setting/>}
      {selMenu === 'voiceChat' && <VoiceChat/>}
    </>
  )
}
