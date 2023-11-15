/* eslint-disable jsdoc/require-returns */
'use client'

import {getAllData, saveData} from '@/lib/mongodb/mongodb-client'
import React, {useEffect} from 'react'
import {addTeam, getLLMSArr, getPersonaArr, getTranscriptArr} from '../../lib/persona'

import {ADMIN_EMAIL} from '@/lib/constants'
import {useApiKey} from '@/lib/hooks/use-api-key'
import {useZustand} from '@/lib/store/use-zustand'
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
  const {selMenu, setCurEmail, status, setStatus, setApiKeyArr, setPersonaAction, setPersonaClient, setPersonaArr, setLLMSArray, setTranscriptArr} = useZustand()
  const apiKey = useApiKey()

  useEffect(() => {
    (async () => {
      const newCurEmail = session?.user?.email

      if (!newCurEmail || status) {
        return
      }

      setStatus('Loading...')

      // Fetch api key array
      const isAdmin = newCurEmail === ADMIN_EMAIL
      const allApiKeyArr = await getAllData()
      let newApiKeyArr

      if (isAdmin) {
        newApiKeyArr = allApiKeyArr
      } else {
        newApiKeyArr = allApiKeyArr.filter((apiKeyObj: any) => apiKeyObj.emailArr.find((emailObj: any) => emailObj.name === newCurEmail))
      }

      if (!newApiKeyArr?.length) {
        const token = await addTeam(newCurEmail)
        const newTeam = {
          name: newCurEmail,
          emailArr: [{
            name: newCurEmail,
          }],
          manager: newCurEmail,
          apiKey: token,
        }
        const res = await saveData(newTeam)

        if (res?.data?.insertedId) {
          newApiKeyArr.push({...newTeam, _id: res.data.insertedId})
        }
      }

      setCurEmail(newCurEmail)
      setApiKeyArr(newApiKeyArr)
      setStatus('')
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.email])

  useEffect(() => {
    (async () => {
      if (prevApiKey === apiKey) {
        return
      }

      setStatus('Loading...')
      console.log('SignHome#useEffect: apiKey: ', apiKey)
      prevApiKey = apiKey

      // Set persona client
      const script = document.createElement('script')
      script.src = `https://api.sindarin.tech/PersonaClientPublic?apikey=${apiKey}`
      document.head.appendChild(script)

      script.addEventListener('load', () => {
        if (window.PersonaClient) {
          const newPersonaClient = new window.PersonaClient(apiKey)

          newPersonaClient.on('json', ({detail}: any) => {
            if (Object.keys(detail).length > 0 && !detail.transcription) {
              setPersonaAction(detail)
            }
          })

          setPersonaClient(newPersonaClient)
        }
      })

      const newPersonaArr = await getPersonaArr(apiKey)
      const llmsArr = await getLLMSArr(apiKey)

      if (Array.isArray(newPersonaArr) && Array.isArray(llmsArr)) {
        setPersonaArr(newPersonaArr)
        setLLMSArray(llmsArr)
        const newTranscriptArr: Array<any> = []

        for (let i = 0; i < newPersonaArr.length; i++) {
          const personaId = newPersonaArr[i]._id
          const personaName = newPersonaArr[i].name

          if (personaId && personaName) {
            getTranscriptArr(apiKey, personaId).then((additionalTranscriptArr) => {
              newTranscriptArr.push(...additionalTranscriptArr.map((t: any) => ({...t, personaId, personaName})))
            })
          }
        }

        setTranscriptArr(newTranscriptArr)
        setStatus('')
      } else {
        setStatus('API key seems to be incorrect.')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey])

  return status ? (
    <div className='z-10 w-full p-6 text-center text-text-gray'>{status}</div>
  ) : (
    <>
      {selMenu === 'setting' && <Setting/>}
      {selMenu === 'voiceChat' && <VoiceChat/>}
      {selMenu === 'transcripts' && <Transcripts/>}
      {selMenu === 'dashboard' && <Dashboard/>}
      <Alert/>
    </>
  )
}
