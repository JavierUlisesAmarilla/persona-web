'use client'

import {getData, saveData} from '@/lib/mongodb/mongodb-client'
import {useEffect, useState} from 'react'
import {
  addTeam,
  getLLMSArr,
  getPersonaArr,
  getTeam,
  getTranscriptArr,
} from '../../lib/persona'

import {SINDARIN_API_URL} from '@/lib/constants'
import {useApiKey} from '@/lib/hooks/use-api-key'
import {useZustand} from '@/lib/store/use-zustand'
import {getCustomDateFromStr} from '../../lib/common'
import {useWindowSize} from '../../lib/hooks/use-window-size'
import {MENUS} from '../layout/sidebar'
import {Alert} from '../shared/alert'


let prevApiKey: string

export const Home = ({session}: { session: any }) => {
  const {
    selMenu,
    setCurEmail,
    loadingStatus,
    setLoadingStatus,
    setApiKeyArr,
    setPersonaClient,
    setPersonaArr,
    setLLMSArray,
    setTranscriptArr,
    setTeam,
    setCanSeeSettings,
    setCanSeePlayground,
    setCanSeeTranscripts,
    setTranscriptStats,
  } = useZustand()
  const [hasAddedTeam, setHasAddedTeam] = useState(false)
  const apiKey = useApiKey()
  const {isMobile} = useWindowSize()

  useEffect(() => {
    (async () => {
      const newCurEmail = session?.user?.email

      if (!newCurEmail || loadingStatus) {
        return
      }

      setLoadingStatus('Fetching settings data...')

      // Fetch api key array
      const newApiKeyArr = await getData(newCurEmail)
      console.log('Home#useEffect: newApiKeyArr: ', newApiKeyArr)

      if (!newApiKeyArr?.length && !hasAddedTeam) {
        setHasAddedTeam(true)
        const token = await addTeam(newCurEmail)
        console.log('Home#useEffect: token: ', token)

        if (!token) {
          return
        }

        const newTeam = {
          name: newCurEmail,
          emailArr: [
            {
              name: newCurEmail,
            },
          ],
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
      setCanSeeSettings(true)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.email])

  useEffect(() => {
    (async () => {
      if (prevApiKey === apiKey) {
        return
      }

      console.log('Home#useEffect: apiKey: ', apiKey)
      prevApiKey = apiKey

      // Set persona client
      const script = document.createElement('script')
      script.src = SINDARIN_API_URL!.includes('localhost') ?
        `${SINDARIN_API_URL}/PersonaClient?apikey=${apiKey}` :
        `${SINDARIN_API_URL}/PersonaClientPublic?apikey=${apiKey}`
      document.head.appendChild(script)

      script.addEventListener('load', () => {
        if (window.PersonaClient) {
          const newPersonaClient = new window.PersonaClient(apiKey)

          setPersonaClient(newPersonaClient)
        }
      })

      setLoadingStatus('Fetching persona data...')
      const newPersonaArr = await getPersonaArr(apiKey)
      setLoadingStatus('Fetching LLMS data...')
      const llmsArr = await getLLMSArr(apiKey)

      const fetchTeam = async () => {
        try {
          if (apiKey) {
            const team = await getTeam(apiKey)
            setTeam(team)
          }
        } catch (error) {
          console.error('Error fetching team:', error)
        }
      }

      setLoadingStatus('Fetching team data...')
      await fetchTeam()

      if (Array.isArray(newPersonaArr) && Array.isArray(llmsArr)) {
        setPersonaArr(newPersonaArr)
        setLLMSArray(llmsArr)
        setCanSeePlayground(true)
        const personaIds = newPersonaArr
            .filter((p: any) => !!p._id && !!p.name)
            .map((p: any) => p._id)
            .join(',')
        setLoadingStatus('Fetching transcripts...')
        const end = new Date().toISOString()
        const start = new Date(
            new Date().setMonth(new Date().getMonth() - 1),
        ).toISOString()
        const {transcripts: newTranscriptArr, summary} =
          await getTranscriptArr(apiKey, personaIds, '', start, end)
        console.log('summary', summary)
        // Attach persona id and name to each transcript
        newTranscriptArr?.forEach((transcript: any) => {
          const persona = newPersonaArr.find(
              (p: any) => p._id === transcript.personaId,
          )
          transcript.personaName = persona?.name
          transcript.personaId = persona?.personaId
          transcript.createdAt = getCustomDateFromStr(transcript.createdAt)
        })
        setTranscriptStats(summary)
        setTranscriptArr(newTranscriptArr)
        setCanSeeTranscripts(true)
        setLoadingStatus('')
      } else {
        setLoadingStatus('Something went wrong.')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey])

  return !isMobile ? (
    <div className="flex h-full w-full items-center justify-center overflow-auto bg-bg-gray">
      {session ? (
        <>
          {MENUS[selMenu]?.menuComp}
          <Alert/>
        </>
      ) : (
        <div>Please log in.</div>
      )}
    </div>
  ) : (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center break-all bg-bg-black p-6 text-2xl font-semibold text-text-light">
      The Persona Playground is optimized for desktop.
    </div>
  )
}
