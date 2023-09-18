/* eslint-disable jsdoc/require-returns */
'use client'
import React from 'react'
import {useZustand} from '@/lib/store/use-zustand'
import Setting from './setting/setting'
import VoiceChat from './voice-chat/voice-chat'


/**
 *
 */
export default function SignHome() {
  const {selMenu} = useZustand()

  return (
    <>
      {selMenu === 'setting' && <Setting/>}
      {selMenu === 'voiceChat' && <VoiceChat/>}
    </>
  )
}
