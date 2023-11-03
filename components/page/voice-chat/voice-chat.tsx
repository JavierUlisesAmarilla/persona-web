/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsdoc/require-returns */
/* eslint-disable no-unused-vars */
'use client'

import React, {useEffect, useState} from 'react'
import {COMMON_API_KEY} from '@/lib/constants'
import {useZustand} from '@/lib/store/use-zustand'
import axios from 'axios'
import Scenario from './scenario'


declare global {
  interface Window {
    PersonaClient: any
  }
}


/**
 *
 */
export default function VoiceChat() {
  const {
    personaClient, setPersonaClient,
    personaArr, setPersonaArr,
    selPersonaIndex, setSelPersonaIndex,
    setScenarioInitMsg, setScenarioRateLimit, setScenarioPrompt, addNewScenario,
    apiKeyArr, curEmail,
    status, setStatus,
  } = useZustand()

  const [initialMsgState, setInitialMsgState] = useState('')
  const [rateLimitMsgState, setRateLimitMsgState] = useState('')
  const [promptState, setPromptState] = useState('')
  const [schemaState, setSchemaState] = useState('')
  const [stateState, setStateState] = useState('')
  const [saveScenarioState, setSaveScenarioState] = useState('')

  const [userInput, setUserInput] = useState('')
  const [assistantInput, setAssistantInput] = useState('')
  const [schemaText, setSchemaText] = useState(JSON.stringify(personaArr[selPersonaIndex]?.currentVoiceSchema, null, 2) || '')
  const [stateText, setStateText] = useState('')

  const API_KEY = apiKeyArr.find((apiKeyObj) => apiKeyObj.emailArr.find((emailObj: any) => emailObj.name === curEmail))?.apiKey || COMMON_API_KEY

  const onPersona = (e: any) => {
    const newPersonaIndex = parseInt(e.target.value)
    setSelPersonaIndex(newPersonaIndex)
    setSchemaText(JSON.stringify(personaArr[newPersonaIndex].currentVoiceSchema, null, 2))
  }

  const onUser = () => {
    if (!personaClient || !userInput) {
      return
    }

    personaClient.sendUserText(userInput)
  }

  const onAssistant = () => {
    if (!personaClient || !assistantInput) {
      return
    }

    personaClient.sayText(assistantInput)
  }

  const onInitialization = async () => {
    try {
      const selPersonaId = personaArr[selPersonaIndex]?._id

      if (!selPersonaId) {
        return
      }

      setInitialMsgState('Saving...')
      const res = await axios.put(`https://api.sindarin.tech/api/personas/${selPersonaId}/initialMessage?apikey=${API_KEY}`, {initialMessage: personaArr[selPersonaIndex].initialMessage})
      setInitialMsgState(res.status === 200 ? 'Success' : 'Error')
    } catch (error) {
      console.log('VoiceChat#onInitialization: error: ', error)
    }
  }

  const onRateLimit = async () => {
    try {
      const selPersonaId = personaArr[selPersonaIndex]?._id

      if (!selPersonaId) {
        return
      }

      setRateLimitMsgState('Saving...')
      const res = await axios.put(`https://api.sindarin.tech/api/personas/${selPersonaId}/rateLimitMessage?apikey=${API_KEY}`, {rateLimitMessage: personaArr[selPersonaIndex].rateLimitMessage})
      setRateLimitMsgState(res.status === 200 ? 'Success' : 'Error')
    } catch (error) {
      console.log('VoiceChat#onRateLimit: error: ', error)
    }
  }

  const onPrompt = async () => {
    try {
      const selPersonaId = personaArr[selPersonaIndex]?._id

      if (!selPersonaId) {
        return
      }

      setPromptState('Saving...')
      const res = await axios.put(`https://api.sindarin.tech/api/personas/${selPersonaId}/prompt?apikey=${API_KEY}`, {prompt: personaArr[selPersonaIndex].currentVoicePrompt})
      setPromptState(res.status === 200 ? 'Success' : 'Error')
    } catch (error) {
      console.log('VoiceChat#onPrompt: error: ', error)
    }
  }

  const onNewChat = async () => {
    const selPersonaId = personaArr[selPersonaIndex]?._id

    if (!personaArr.length || !selPersonaId) {
      return
    }

    const selPersonName = personaArr.find((persona) => persona._id === selPersonaId)?.name

    if (!personaClient || !selPersonName) {
      return
    }

    await personaClient.init('admin', selPersonName)
  }

  const onSchema = async () => {
    try {
      const selPersonaId = personaArr[selPersonaIndex]?._id

      if (!selPersonaId || !schemaText) {
        return
      }

      setSchemaState('Loading (this can take a few seconds)...')
      const res = await axios.put(`https://api.sindarin.tech/api/personas/${selPersonaId}/schema?apikey=${API_KEY}`, JSON.parse(schemaText))
      setSchemaState(res.status === 200 ? 'Success' : 'Error')
    } catch (error) {
      console.log('VoiceChat#onSchema: error: ', error)
    }
  }

  const onState = () => {
    if (!personaClient || !stateText) {
      return
    }

    setStateState('Saving...')
    personaClient.updateState(stateText)
    setStateState('Success')
  }

  const onNewScenario = () => {
    addNewScenario(selPersonaIndex)
  }

  const onSaveScenarios = async () => {
    try {
      const selPersonaId = personaArr[selPersonaIndex]?._id

      if (!selPersonaId) {
        return
      }

      setSaveScenarioState('Saving...')
      const res = await axios.put(`https://api.sindarin.tech/api/personas/${selPersonaId}/scenarios?apikey=${API_KEY}`, {scenarios: personaArr[selPersonaIndex].scenarios})
      setSaveScenarioState(res.status === 200 ? 'Success' : 'Error')
    } catch (error) {
      console.log('VoiceChat#onSaveScenarios: error: ', error)
    }
  }

  useEffect(() => {
    try {
      if (status) {
        return
      }

      console.log('VoiceChat#useEffect: API_KEY: ', API_KEY)
      setStatus('Loading...')
      const script = document.createElement('script')
      script.src = `https://api.sindarin.tech/PersonaClientPublic?apikey=${API_KEY}`
      document.head.appendChild(script)

      script.addEventListener('load', () => {
        if (window.PersonaClient) {
          const newPersonaClient = new window.PersonaClient(API_KEY)
          console.log('VoiceChat#useEffect#script#load: newPersonaClient: ', newPersonaClient)
          setPersonaClient(newPersonaClient)
        }
      });

      (async () => {
        const personaArrRes = await axios.get(`https://api.sindarin.tech/api/personas?apikey=${API_KEY}`)
        console.log('VoiceChat#useEffect: personaArrRes: ', personaArrRes)

        if (Array.isArray(personaArrRes.data)) {
          setPersonaArr(personaArrRes.data)
          setStatus('')
        } else {
          setStatus('API key seems to be incorrect.')
        }
      })()
    } catch (e) {
      console.log('VoiceChat#useEffect: e: ', e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return status ? (
    <div className='z-10 w-full p-4 text-xl text-center text-blue-500'>{status}</div>
  ) : (
    <div className="z-10 flex flex-col w-full gap-8 px-8">
      <div className='flex flex-col w-full gap-4'>
        <div className='flex items-center w-full gap-4'>
          <select
            className='w-full rounded-full cursor-pointer'
            onChange={onPersona}
          >
            {personaArr.map((persona, index) => <option key={index} value={index}>{persona.name}</option>)}
          </select>
          <div className='w-32'/>
        </div>
      </div>
      {personaArr[selPersonaIndex] &&
        <>
          <div className='flex flex-col w-full gap-4'>
            <div className='flex items-center w-full gap-4'>
              <input
                className='w-full rounded-full'
                type='text'
                value={userInput}
                placeholder='Enter user text here'
                onChange={(e) => setUserInput(e.target.value)}
              />
              <div
                className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
                onClick={onUser}
              >
                Submit
              </div>
              <div className='w-32'/>
            </div>
            <div className='flex items-center w-full gap-4'>
              <input
                className='w-full rounded-full'
                type='text'
                value={assistantInput}
                placeholder='Enter assistant text here'
                onChange={(e) => setAssistantInput(e.target.value)}
              />
              <div
                className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
                onClick={onAssistant}
              >
                Submit
              </div>
              <div className='w-32'/>
            </div>
            <div className='flex items-center w-full gap-4'>
              <input
                className='w-full rounded-full'
                type='text'
                value={personaArr[selPersonaIndex]?.initialMessage || ''}
                placeholder='Enter initial message here'
                onChange={(e) => setScenarioInitMsg(selPersonaIndex, e.target.value)}
              />
              <div
                className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
                onClick={onInitialization}
              >
                Submit
              </div>
              <div className='w-32'>{initialMsgState}</div>
            </div>
            <div className='flex items-center w-full gap-4'>
              <input
                className='w-full rounded-full'
                type='text'
                value={personaArr[selPersonaIndex]?.rateLimitMessage || ''}
                placeholder='Enter rate limit message here'
                onChange={(e) => setScenarioRateLimit(selPersonaIndex, e.target.value)}
              />
              <div
                className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
                onClick={onRateLimit}
              >
                Submit
              </div>
              <div className='w-32'>{rateLimitMsgState}</div>
            </div>
          </div>
          <div className='flex flex-col w-full gap-2'>
            <div className='text-lg '>For guidance on prompt engineering techniques for your Persona, see:</div>
            <a
              className='text-blue-500 hover:text-blue-900 w-fit'
              href="https://www.promptingguide.ai/introduction"
              target="_blank"
              rel="noreferrer"
            >
              Prompt Engineering Guide 1
            </a>
            <a
              className='text-blue-500 hover:text-blue-900 w-fit'
              href="https://github.com/brexhq/prompt-engineering"
              target="_blank"
              rel="noreferrer"
            >
              Prompt Engineering Guide 2
            </a>
          </div>
          <div className='flex w-full gap-4'>
            <div className='flex flex-col w-full gap-2'>
              <div className='text-lg'>Prompt</div>
              <textarea
                rows={20}
                value={personaArr[selPersonaIndex]?.currentVoicePrompt || ''}
                placeholder='Enter the prompt here'
                onChange={(e) => setScenarioPrompt(selPersonaIndex, e.target.value)}
              />
              <div className='flex flex-col'>
                <div>Possible variables:</div>
                <div>- ***PERSONA_VOICE_SCHEMA***: required to make use of the Actions schema</div>
                <div>- ***CURRENT_DATETIME***: required to enable access to the current date/time</div>
                <div>- ***DETAILS.detail***: where &quot;detail&quot; is a variable passed into the &quot;details&quot; object in an API-driven call e.g. &quot;***DETAILS.firstName***&quot;</div>
              </div>
              <div className='flex items-center gap-4'>
                <div
                  className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black w-fit'
                  onClick={onPrompt}
                >
                  Update prompt
                </div>
                <div>{promptState}</div>
              </div>
              <div
                className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black w-fit'
                onClick={onNewChat}
              >
                New chat (continuous)
              </div>
            </div>
            <div className='flex flex-col w-full gap-2'>
              <div className='text-lg'>Actions schema</div>
              <textarea
                rows={20}
                value={schemaText}
                placeholder='Enter the actions schema here'
                onChange={(e) => setSchemaText(e.target.value)}
              />
              <div className='flex items-center gap-4'>
                <div
                  className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black w-fit whitespace-nowrap'
                  onClick={onSchema}
                >Update actions schema
                </div>
                <div>{schemaState}</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full gap-2'>
            <div className='text-lg'>Current state</div>
            <textarea
              rows={20}
              value={stateText}
              placeholder=''
              onChange={(e) => setStateText(e.target.value)}
            />
            <div className='flex items-center gap-4'>
              <div
                className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black w-fit'
                onClick={onState}
              >
                Update state
              </div>
              <div>{stateState}</div>
            </div>
          </div>
          <div className='flex flex-col w-full gap-2'>
            <div className='flex w-full gap-4'>
              <div
                className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
                onClick={onNewScenario}
              >
                Add new scenario
              </div>
              <div className='flex items-center gap-4'>
                <div
                  className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
                  onClick={onSaveScenarios}
                >
                  Save scenarios
                </div>
                <div>{saveScenarioState}</div>
              </div>
            </div>
            <div className='flex flex-col w-full gap-2'>
              {personaArr[selPersonaIndex]?.scenarios?.map((scenario: any, index: number) =>
                <Scenario
                  key={index}
                  scenarioIndex={index}
                  scenario={scenario}
                />,
              )}
            </div>
          </div>
        </>
      }
    </div >
  )
}
