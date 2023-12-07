'use client'

import {getData, saveData} from '@/lib/mongodb/mongodb-client'
import {useEffect, useState} from 'react'
import {addTeam, getLLMSArr, getPersonaArr, getTeam, getTranscriptArr} from '../../lib/persona'

import {SINDARIN_API_URL} from '@/lib/constants'
import {useApiKey} from '@/lib/hooks/use-api-key'
import {useZustand} from '@/lib/store/use-zustand'
import {MENUS} from '../layout/sidebar'
import {Alert} from '../shared/alert'


let prevApiKey: string


export const Home = ({session}: {session: any}) => {
  const {
    selMenu,
    setCurEmail,
    status, setStatus,
    setApiKeyArr,
    setPersonaClient,
    setPersonaArr,
    setLLMSArray,
    setTranscriptArr,
    setTeam,
    setCanSeeSettings,
    setCanSeePlayground,
    setCanSeeTranscripts,
  } = useZustand()
  const [hasAddedTeam, setHasAddedTeam] = useState(false)
  const apiKey = useApiKey()

  useEffect(() => {
    (async () => {
      const newCurEmail = session?.user?.email

      if (!newCurEmail || status) {
        return
      }

      setStatus('Fetching settings data...')

      // Fetch api key array
      const newApiKeyArr = await getData(newCurEmail)

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
      setCanSeeSettings(true)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.email])

  useEffect(() => {
    (async () => {
      if (prevApiKey === apiKey) {
        return
      }

      prevApiKey = apiKey

      // Set persona client
      const script = document.createElement('script')
      script.src = SINDARIN_API_URL!.includes('localhost') ? `${SINDARIN_API_URL}/PersonaClient?apikey=${apiKey}` : `${SINDARIN_API_URL}/PersonaClientPublic?apikey=${apiKey}`
      document.head.appendChild(script)

      script.addEventListener('load', () => {
        if (window.PersonaClient) {
          const newPersonaClient = new window.PersonaClient(apiKey)

          setPersonaClient(newPersonaClient)
        }
      })

      setStatus('Fetching persona data...')
      const newPersonaArr = await getPersonaArr(apiKey)
      setStatus('Fetching LLMS data...')
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

      setStatus('Fetching team data...')
      await fetchTeam()

      if (Array.isArray(newPersonaArr) && Array.isArray(llmsArr)) {
        setPersonaArr(newPersonaArr)
        setLLMSArray(llmsArr)
        setCanSeePlayground(true)
        const newTranscriptArr: Array<any> = []

        for (let i = 0; i < newPersonaArr.length; i++) {
          const personaId = newPersonaArr[i]._id
          const personaName = newPersonaArr[i].name

          if (personaId && personaName) {
            // getTranscriptArr(apiKey, personaId).then((additionalTranscriptArr) => {
            //   newTranscriptArr.push(...additionalTranscriptArr.map((t: any) => ({...t, personaId, personaName})))
            // })
            setStatus('Fetching transcripts...')
            const additionalTranscriptArr = await getTranscriptArr(apiKey, personaId)
            newTranscriptArr.push(...additionalTranscriptArr.map((t: any) => ({...t, personaId, personaName})))
          }
        }

        setTranscriptArr(newTranscriptArr)
        setStatus('')
        setCanSeeTranscripts(true)
      } else {
        setStatus('Something went wrong.')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey])

  return (
    <div className='flex items-center justify-center w-full h-full overflow-auto bg-bg-gray'>
      {session ? (
        <>
          {MENUS[selMenu]?.menuComp}
          <Alert/>
        </>
      ) : (
        <div>Please log in.</div>
      )}
    </div>
  )
}
