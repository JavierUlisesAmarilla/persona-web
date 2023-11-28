/* eslint-disable require-jsdoc */
/* eslint-disable jsdoc/require-jsdoc */

'use client'

import {getData, saveData} from '@/lib/mongodb/mongodb-client'
import {useEffect, useState} from 'react'
import {addTeam, getLLMSArr, getPersonaArr, getTranscriptArr} from '../../lib/persona'

import {SINDARIN_API_URL} from '@/lib/constants'
import {useApiKey} from '@/lib/hooks/use-api-key'
import {useZustand} from '@/lib/store/use-zustand'
// import {ExtendedRecordMap} from 'notion-types'
import {Alert} from '../shared/alert'
import {ApiDocs} from './api-docs/api-docs'
import {Dashboard} from './dashboard/dashboard'
import Setting from './setting/setting'
import {Transcripts} from './transcripts/transcripts'
import VoiceChat from './voice-chat/voice-chat'


let prevApiKey: string


export default function SignHome({session, recordMap}: {session: any, recordMap: ExtendedRecordMap | undefined}) {
  const {
    selMenu,
    setCurEmail,
    status, setStatus,
    setApiKeyArr,
    setPersonaAction,
    setPersonaClient,
    setPersonaArr,
    setLLMSArray,
    setTranscriptArr,
  } = useZustand()
  const [hasAddedTeam, setHasAddedTeam] = useState(false)
  const apiKey = useApiKey()
  console.log('***SIGN HOME RENDERING***')

  useEffect(() => {
    console.log('USE EFFECT RUNNING WITH EMAIL', session?.user?.email);
    (async () => {
      console.log('USE EFFECT INNER LOOP RUNNING')
      const newCurEmail = session?.user?.email

      if (!newCurEmail || status) {
        return
      }

      setStatus('Loading...')

      // Fetch api key array
      const newApiKeyArr = await getData(newCurEmail)
      console.log('SignHome#useEffect: newApiKeyArr: ', newApiKeyArr)

      if (!newApiKeyArr?.length && !hasAddedTeam) {
        setHasAddedTeam(true)
        const token = await addTeam(newCurEmail)
        if (!token) {
          return
        }

        const newTeam = {
          name: newCurEmail,
          emailArr: [{
            name: newCurEmail,
          }],
          manager: newCurEmail,
          apiKey: token,
        }
        const res = await saveData(newTeam, newCurEmail)

        if (res?.data?.insertedId) {
          newApiKeyArr.push({...newTeam, _id: res.data.insertedId})
        }
      }

      setCurEmail(newCurEmail)
      setApiKeyArr(newApiKeyArr)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.email])

  useEffect(() => {
    (async () => {
      if (prevApiKey === apiKey) {
        setStatus('')
        return
      }

      setStatus('Loading...')
      console.log('SignHome#useEffect: apiKey: ', apiKey)
      prevApiKey = apiKey

      // Set persona client
      const script = document.createElement('script')
      script.src = SINDARIN_API_URL!.includes('localhost') ? `${SINDARIN_API_URL}/PersonaClient?apikey=${apiKey}` : `${SINDARIN_API_URL}/PersonaClientPublic?apikey=${apiKey}`
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
            // const additionalTranscriptArr = await getTranscriptArr(apiKey, personaId)
            // newTranscriptArr.push(...additionalTranscriptArr.map((t: any) => ({...t, personaId, personaName})))
          }
        }

        setTranscriptArr(newTranscriptArr)
        setStatus('')
      } else {
        setStatus('Something went wrong.')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey])

  return status ? (
    <div className='z-10 w-full p-6 text-center text-text-gray'>{status}</div>
  ) : (
    <>
      {selMenu === 'dashboard' && <Dashboard/>}
      {selMenu === 'setting' && <Setting/>}
      {selMenu === 'voiceChat' && <VoiceChat/>}
      {selMenu === 'transcripts' && <Transcripts/>}
      {selMenu === 'docs' && <ApiDocs/>}
      <Alert/>
    </>
  )
}
