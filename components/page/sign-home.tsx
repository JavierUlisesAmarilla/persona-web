/* eslint-disable jsdoc/require-returns */
'use client'

import {getLLMSArr, getPersonaArr} from '@/lib/persona'
import React, {useEffect} from 'react'

import {ADMIN_EMAIL} from '@/lib/constants'
import {useApiKey} from '@/lib/hooks/use-api-key'
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
  const {selMenu, setCurEmail, status, setStatus, setApiKeyArr, isUser, setIsUser, setSelMenu, setPersonaAction, setPersonaClient, setPersonaArr, setLLMSArray} = useZustand()
  const apiKey = useApiKey()

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
        setSelMenu('voiceChat')

        console.log('SignHome#useEffect: apiKey: ', apiKey)
        const script = document.createElement('script')
        script.src = `https://api.sindarin.tech/PersonaClientPublic?apikey=${apiKey}`
        document.head.appendChild(script)

        script.addEventListener('load', () => {
          if (window.PersonaClient) {
            const newPersonaClient = new window.PersonaClient(apiKey)
            newPersonaClient.on('json', ({detail}: any) => {
              console.log('persona action is ', detail)

              if (Object.keys(detail).length > 0 && !detail.transcription) {
                setPersonaAction(detail)
              }
            })

            console.log('SignHome#useEffect#script#load: newPersonaClient: ', newPersonaClient)
            setPersonaClient(newPersonaClient)
          }
        })

        const newPersonaArr = await getPersonaArr(apiKey)
        const llmsArr = await getLLMSArr(apiKey)

        if (Array.isArray(newPersonaArr)) {
          setPersonaArr(newPersonaArr)
          setStatus('')
        } else {
          setStatus('API key seems to be incorrect.')
        }

        if (Array.isArray(llmsArr)) {
          console.log('GOT LLMS', llmsArr)
          setLLMSArray(llmsArr)
        }
      } else {
        setIsUser(false)
        setStatus('Your email does not exist.')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  return isUser && !status ? (
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
