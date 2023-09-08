"use client"
import { API_KEY } from '@/lib/constants'
import { useZustand } from '@/lib/store/use-zustand';
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

declare global {
  interface Window {
    PersonaClient: any;
  }
}

let isFirstRender = true

export default function VoiceChat() {
  const {
    personaClient, setPersonaClient,
    personaArr, setPersonaArr,
  } = useZustand()
  const [initialMsgState, setInitialMsgState] = useState('')
  const [rateLimitMsgState, setRateLimitMsgState] = useState('')

  const userInputRef = useRef<any>()
  const assistantInputRef = useRef<any>()
  const initialInputRef = useRef<any>()
  const rateLimitInputRef = useRef<any>()
  const personaSelRef = useRef<any>()

  useEffect(() => {
    if (!isFirstRender) {
      return
    }

    isFirstRender = false

    const script = document.createElement("script");
    script.src = `https://app.sindarin.tech/PersonaClient?apikey=${API_KEY}`;
    document.head.appendChild(script);

    script.addEventListener("load", async () => {
      const newPersonaClient = new window.PersonaClient(API_KEY);
      console.log('VoiceChat#useEffect#script#load: newPersonaClient: ', newPersonaClient)
      setPersonaClient(newPersonaClient)
    });

    (async () => {
      const personaArrRes = await axios.get(`https://app.sindarin.tech/api/personas?apikey=${API_KEY}`)
      console.log('VoiceChat#useEffect: personaArrRes: ', personaArrRes)
      setPersonaArr(personaArrRes.data)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="z-10 flex flex-col w-full gap-8 px-8">
      <div className='flex flex-col w-full gap-4'>
        <div className='flex items-center w-full gap-4'>
          <input className='w-full rounded-full' type='text' placeholder='Enter user text here' ref={userInputRef}></input>
          <div
            className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
            onClick={() => {
              if (!personaClient || !userInputRef.current.value) {
                return
              }
              personaClient.sendUserText(userInputRef.current.value)
            }}
          >
            Submit
          </div>
          <div className='w-32'></div>
        </div>
        <div className='flex items-center w-full gap-4'>
          <input className='w-full rounded-full' type='text' placeholder='Enter assistant text here' ref={assistantInputRef}></input>
          <div
            className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
            onClick={() => {
              if (!personaClient || !assistantInputRef.current.value) {
                return
              }

              personaClient.sayText(assistantInputRef.current.value)
            }}
          >
            Submit
          </div>
          <div className='w-32'></div>
        </div>
        <div className='flex items-center w-full gap-4'>
          <input className='w-full rounded-full' type='text' placeholder='Enter initial message here' ref={initialInputRef}></input>
          <div
            className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
            onClick={async () => {
              const initialMsg = initialInputRef.current.value
              const selPersonaId = personaSelRef.current.value

              if (!personaClient || !initialMsg || !selPersonaId) {
                return
              }

              setInitialMsgState('Saving...')
              const res = await axios.put(`https://app.sindarin.tech/api/personas/${selPersonaId}/initialMessage?apikey=${API_KEY}`, { initialMessage: initialMsg });

              if (res.status === 200) {
                setInitialMsgState('Success')
              } else {
                setInitialMsgState('Error')
              }
            }}
          >
            Submit
          </div>
          <div className='w-32'>{initialMsgState}</div>
        </div>
        <div className='flex items-center w-full gap-4'>
          <input className='w-full rounded-full' type='text' placeholder='Enter rate limit message here' ref={rateLimitInputRef}></input>
          <div
            className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
            onClick={() => {
              if (!personaClient || !rateLimitInputRef.current.value) {
                return
              }
            }}
          >
            Submit
          </div>
          <div className='w-32'>{rateLimitMsgState}</div>
        </div>
      </div>
      <div className='flex items-center w-full gap-4'>
        <select className='w-full rounded-full cursor-pointer' ref={personaSelRef}>
          {personaArr.map((persona, index) => <option key={index} value={persona._id}>{persona.name}</option>)}
        </select>
        <div className='w-32'></div>
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div className='text-lg '>For guidance on prompt engineering techniques for your Persona, see:</div>
        <a className='text-blue-500 hover:text-blue-900 w-fit' href="https://www.promptingguide.ai/introduction" target="_blank" rel="noreferrer">Prompt Engineering Guide 1</a>
        <a className='text-blue-500 hover:text-blue-900 w-fit' href="https://github.com/brexhq/prompt-engineering" target="_blank" rel="noreferrer">Prompt Engineering Guide 2</a>
      </div>
      <div className='flex w-full gap-4'>
        <div className='flex flex-col w-full gap-2'>
          <div className='text-lg'>Prompt</div>
          <textarea rows={20} placeholder='Enter the prompt here'></textarea>
          <div className='flex flex-col'>
            <div>Possible variables:</div>
            <div>- ***PERSONA_VOICE_SCHEMA***: required to make use of the Actions schema</div>
            <div>- ***CURRENT_DATETIME***: required to enable access to the current date/time</div>
            <div>- ***DETAILS.detail***: where &quot;detail&quot; is a variable passed into the &quot;details&quot; object in an API-driven call; e.g. &quot;***DETAILS.firstName***&quot;</div>
          </div>
          <div className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black w-fit'>Update prompt</div>
          <div className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black w-fit'>New chat (continuous)</div>
        </div>
        <div className='flex flex-col w-full gap-2'>
          <div className='text-lg'>Actions schema</div>
          <textarea rows={20}></textarea>
          <div className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black w-fit'>Update actions schema</div>
        </div>
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div className='text-lg'>Current State</div>
        <textarea rows={20} placeholder=''></textarea>
        <div className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black w-fit'>Update state</div>
        <div>Error</div>
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div className='flex w-full gap-4'>
          <div className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'>Add new scenario</div>
          <div className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'>Save scenarios</div>
        </div>
        <div>Scenarios</div>
      </div>
    </div>
  )
}
