/* eslint-disable jsdoc/require-returns */
'use client'

import {getAllData, saveData} from '@/lib/mongodb/mongodb-client'
import {getLLMSArr, getPersonaArr} from '@/lib/persona'
import React, {useEffect} from 'react'

import {ADMIN_EMAIL} from '@/lib/constants'
import {useApiKey} from '@/lib/hooks/use-api-key'
import {useZustand} from '@/lib/store/use-zustand'
import {getTranscriptArr} from '../../lib/persona'
import {Alert} from '../shared/alert'
import {Dashboard} from './dashboard'
import Setting from './setting/setting'
import {Transcripts} from './transcripts/transcripts'
import VoiceChat from './voice-chat/voice-chat'


let prevApiKey: string


/**
 *
 */
export default function SignHome({session}: {session: any}) {
  const {selMenu, setCurEmail, status, setStatus, setApiKeyArr, isUser, setIsUser, setPersonaAction, setPersonaClient, setPersonaArr, setLLMSArray, setTranscriptArr} = useZustand()
  const apiKey = useApiKey()

  useEffect(() => {
    (async () => {
      const newCurEmail = session?.user?.email

      if (!newCurEmail || status || prevApiKey === apiKey) {
        return
      }

      prevApiKey = apiKey
      setStatus('Loading...')
      const isAdmin = newCurEmail === ADMIN_EMAIL
      console.log('SignHome#useEffect: isAdmin: ', isAdmin)
      setCurEmail(newCurEmail)
      const allApiKeyArr = await getAllData()
      console.log('SignHome#useEffect: allApiKeyArr: ', allApiKeyArr)
      let newApiKeyArr

      if (isAdmin) {
        newApiKeyArr = allApiKeyArr
      } else {
        newApiKeyArr = allApiKeyArr.filter((apiKeyObj: any) => apiKeyObj.emailArr.find((emailObj: any) => emailObj.name === newCurEmail))
      }

      if (!newApiKeyArr?.length) {
        const newTeam = {
          name: newCurEmail,
          emailArr: [{
            name: newCurEmail,
          }],
          manager: newCurEmail,
        }

        const res = await saveData(newTeam)

        if (res?.data?.insertedId) {
          newApiKeyArr.push({...newTeam, _id: res.data.insertedId})
        }
      }

      console.log('SignHome#useEffect: newApiKeyArr: ', newApiKeyArr)
      setApiKeyArr(newApiKeyArr)

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
      console.log('SignHome#useEffect: newPersonaArr: ', newPersonaArr)
      const llmsArr = await getLLMSArr(apiKey)
      console.log('SignHome#useEffect: llmsArr: ', llmsArr)

      if (Array.isArray(newPersonaArr)) {
        setPersonaArr(newPersonaArr)
        const newTranscriptArr: Array<any> = []

        for (let i = 0; i < newPersonaArr.length; i++) {
          const personaId = newPersonaArr[i]._id
          const personaName = newPersonaArr[i].name

          if (personaId && personaName) {
            getTranscriptArr(apiKey, personaId).then((additionalTranscriptArr) => {
              console.log('SignHome#useEffect: additionalTranscriptArr: ', additionalTranscriptArr)
              newTranscriptArr.push(...additionalTranscriptArr.map((t: any) => ({...t, personaId, personaName})))
            })
          }
        }

        setTranscriptArr(newTranscriptArr)
        setStatus('')
      } else {
        setStatus('API key seems to be incorrect.')
      }

      if (Array.isArray(llmsArr)) {
        console.log('GOT LLMS', llmsArr)
        setLLMSArray(llmsArr)
      }

      setIsUser(true)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, session])

  console.log('SignHome: status: ', status)

  return isUser ? (
    <>
      {selMenu === 'setting' && <Setting/>}
      {selMenu === 'voiceChat' && <VoiceChat/>}
      {selMenu === 'transcripts' && <Transcripts/>}
      {selMenu === 'dashboard' && <Dashboard/>}
      <Alert/>
    </>
  ) : (
    <div className='z-10 w-full p-6 text-center text-text-gray'>{status || 'Loading...'}</div>
  )
}
