/* eslint-disable jsdoc/require-returns */
/* eslint-disable no-unused-vars */
'use client'

import {BlueButton, GreenButton} from '@/components/shared/button'
import React, {useEffect, useState} from 'react'

import {InputText} from '@/components/shared/input-text'
import {Textarea} from '@/components/shared/textarea'
import {UserSelect} from '@/components/shared/user-select'
import {COMMON_API_KEY} from '@/lib/constants'
import {getPersonaArr} from '@/lib/persona'
import {useZustand} from '@/lib/store/use-zustand'
import axios from 'axios'
import {ChatModal} from './chat-modal'
import {DeployModal} from './deploy-modal'
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

  const [showChatModal, setShowChatModal] = useState(false)
  const [showDeployModal, setShowDeployModal] = useState(false)

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

  const onNewChat = () => {
    setShowChatModal(true)
    // const selPersonaId = personaArr[selPersonaIndex]?._id

    // if (!personaArr.length || !selPersonaId) {
    //   return
    // }

    // const selPersonName = personaArr.find((persona) => persona._id === selPersonaId)?.name

    // if (!personaClient || !selPersonName) {
    //   return
    // }

    // await personaClient.init('admin', selPersonName)
  }

  const onDeploy = () => {
    setShowDeployModal(true)
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
        const newPersonaArr = await getPersonaArr(API_KEY)

        if (Array.isArray(newPersonaArr)) {
          setPersonaArr(newPersonaArr)
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
    <div className='z-10 p-4 text-center text-text-gray'>{status}</div>
  ) : (
    <div className='z-10 w-full px-4'>
      <div className="flex flex-col gap-3 p-6 border rounded-lg bg-bg-light">
        <div className='flex justify-between w-full gap-3 p-6 border rounded-lg bg-bg-gray'>
          <UserSelect onChange={onPersona}>
            {personaArr.map((persona, index) => <option key={index} value={index}>{persona.name}</option>)}
          </UserSelect>
          <div className='w-32'/>
          <div className='flex flex-col gap-3'>
            <GreenButton onClick={onNewChat}>Start Chat</GreenButton>
            <BlueButton onClick={onDeploy}>Deploy</BlueButton>
          </div>
        </div>
        {personaArr[selPersonaIndex] &&
          <>
            <div className='flex gap-3 p-6 border rounded-lg bg-bg-gray'>
              {/* <div className='flex flex-col w-full gap-3'>
                <div className='flex items-center w-full gap-3'>
                  <InputText
                    value={userInput}
                    placeholder='Enter user text here'
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                  <BlueButton onClick={onUser}>Submit</BlueButton>
                  <div className='w-32'/>
                </div>
                <div className='flex items-center w-full gap-3'>
                  <InputText
                    value={assistantInput}
                    placeholder='Enter assistant text here'
                    onChange={(e) => setAssistantInput(e.target.value)}
                  />
                  <BlueButton onClick={onAssistant}>Submit</BlueButton>
                  <div className='w-32'/>
                </div>
              </div> */}
              <div className='flex flex-col w-full gap-3'>
                <div className='flex items-center w-full gap-3'>
                  <InputText
                    value={personaArr[selPersonaIndex]?.initialMessage || ''}
                    placeholder='Enter initial message here'
                    onChange={(e) => setScenarioInitMsg(selPersonaIndex, e.target.value)}
                  />
                  <BlueButton onClick={onInitialization}>Submit</BlueButton>
                  <div className='w-32'>{initialMsgState}</div>
                </div>
                <div className='flex items-center w-full gap-3'>
                  <InputText
                    value={personaArr[selPersonaIndex]?.rateLimitMessage || ''}
                    placeholder='Enter rate limit message here'
                    onChange={(e) => setScenarioRateLimit(selPersonaIndex, e.target.value)}
                  />
                  <BlueButton onClick={onRateLimit}>Submit</BlueButton>
                  <div className='w-32'>{rateLimitMsgState}</div>
                </div>
              </div>
            </div>
            <div className='flex flex-col w-full gap-3 p-6 border rounded-lg bg-bg-gray'>
              <div className='text-sm'>For guidance on prompt engineering techniques for your Persona, see:</div>
              <a
                className='text-sm text-blue-500 hover:text-blue-900 w-fit'
                href="https://www.promptingguide.ai/introduction"
                target="_blank"
                rel="noreferrer"
              >
                Prompt Engineering Guide 1
              </a>
              <a
                className='text-sm text-blue-500 hover:text-blue-900 w-fit'
                href="https://github.com/brexhq/prompt-engineering"
                target="_blank"
                rel="noreferrer"
              >
                Prompt Engineering Guide 2
              </a>
            </div>
            <div className='flex w-full gap-3 p-6 border rounded-lg bg-bg-gray'>
              <div className='flex flex-col w-full gap-3'>
                <div className='text-sm'>Prompt</div>
                <Textarea
                  className='h-[550px]'
                  value={personaArr[selPersonaIndex]?.currentVoicePrompt || ''}
                  placeholder='Enter the prompt here'
                  onChange={(e) => setScenarioPrompt(selPersonaIndex, e.target.value)}
                />
                <div className='flex items-center gap-3'>
                  <BlueButton onClick={onPrompt}>Update prompt</BlueButton>
                  <div>{promptState}</div>
                </div>
              </div>
              <div className='flex flex-col w-full gap-3'>
                <div className='text-sm'>Actions schema</div>
                <Textarea
                  className='h-[550px]'
                  value={schemaText}
                  placeholder='Enter the actions schema here'
                  onChange={(e) => setSchemaText(e.target.value)}
                />
                <div className='flex items-center gap-3'>
                  <BlueButton onClick={onSchema}>Update actions schema</BlueButton>
                  <div>{schemaState}</div>
                </div>
              </div>
            </div>
            {/* <div className='flex flex-col w-full gap-3 p-6 border rounded-lg bg-bg-gray'>
              <div className='text-sm'>Current state</div>
              <Textarea
                value={stateText}
                placeholder=''
                onChange={(e) => setStateText(e.target.value)}
              />
              <div className='flex items-center gap-3'>
                <BlueButton onClick={onState}>Update state</BlueButton>
                <div>{stateState}</div>
              </div>
            </div> */}
            <div className='flex flex-col w-full gap-3'>
              <div className='flex w-full gap-3'>
                <BlueButton onClick={onNewScenario}>Add new scenario</BlueButton>
                <div className='flex items-center gap-3'>
                  <BlueButton onClick={onSaveScenarios}>Save scenarios</BlueButton>
                  <div>{saveScenarioState}</div>
                </div>
              </div>
              <div className='flex flex-col w-full gap-3'>
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
      <ChatModal
        schemaText={schemaText}
        setSchemaText={setSchemaText}
        onSchema={onSchema}
        schemaState={schemaState}
        stateText={stateText}
        setStateText={setStateText}
        onState={onState}
        stateState={stateState}
        show={showChatModal}
        onClose={() => setShowChatModal(false)}
      />
      <DeployModal
        show={showDeployModal}
        onClose={() => setShowDeployModal(false)}
      />
    </div>
  )
}
