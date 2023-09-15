"use client"
import { useZustand } from '@/lib/store/use-zustand'
import Setting from './setting'
import VoiceChat from './voice-chat'

export default function SignHome() {
  const { selMenu } = useZustand()

  return (
    <>
      {selMenu === 'setting' && <Setting></Setting>}
      {selMenu === 'voiceChat' && <VoiceChat></VoiceChat>}
    </>
  )
}
