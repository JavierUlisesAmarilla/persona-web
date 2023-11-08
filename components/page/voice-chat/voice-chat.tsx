/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsdoc/require-returns */
/* eslint-disable no-unused-vars */
'use client'

import {BlueButton, GreenButton, LightBlueButton} from '@/components/shared/button'
import React, {useState} from 'react'

import {InputText} from '@/components/shared/input-text'
import {Textarea} from '@/components/shared/textarea'
import {UserSelect} from '@/components/shared/user-select'
import {useApiKey} from '@/lib/hooks/use-api-key'
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
    LLMSArray, setLLMSArray,
    setPersonaLLM,
    personaAction, setPersonaAction,
  } = useZustand()

  const [initialMsgState, setInitialMsgState] = useState('')
  const [rateLimitMsgState, setRateLimitMsgState] = useState('')
  const [promptState, setPromptState] = useState('')
  const [schemaState, setSchemaState] = useState('')
  const [stateState, setStateState] = useState('')
  const [saveScenarioState, setSaveScenarioState] = useState('')
  const [copyStatus, setCopyStatus] = useState('')

  const [userInput, setUserInput] = useState('')
  const [assistantInput, setAssistantInput] = useState('')
  const [schemaText, setSchemaText] = useState(JSON.stringify(personaArr[selPersonaIndex]?.currentVoiceSchema, null, 2) || '')
  const [stateText, setStateText] = useState('')

  const [showChatModal, setShowChatModal] = useState(false)
  const [showDeployModal, setShowDeployModal] = useState(false)

  const apiKey = useApiKey()

  const onPersona = (e: any) => {
    const newPersonaIndex = parseInt(e.target.value)
    setSelPersonaIndex(newPersonaIndex)
    setSchemaText(JSON.stringify(personaArr[newPersonaIndex].currentVoiceSchema, null, 2))
  }

  const onLLMChange = async (e: any) => {
    const newLLMSIndex = parseInt(e.target.value)
    const selPersonaId = personaArr[selPersonaIndex]?._id
    // PUT /api/personas/:personaId/llm with body {llm: llm}
    const res = await axios.put(`https://api.sindarin.tech/api/personas/${selPersonaId}/llm?apikey=${apiKey}`, {llm: LLMSArray[newLLMSIndex]})
    console.log('LLM change res', res)
    console.log('LLM now selected:', LLMSArray[newLLMSIndex])
    setPersonaLLM(selPersonaIndex, LLMSArray[newLLMSIndex])
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
      const res = await axios.put(`https://api.sindarin.tech/api/personas/${selPersonaId}/initialMessage?apikey=${apiKey}`, {initialMessage: personaArr[selPersonaIndex].initialMessage})
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
      const res = await axios.put(`https://api.sindarin.tech/api/personas/${selPersonaId}/rateLimitMessage?apikey=${apiKey}`, {rateLimitMessage: personaArr[selPersonaIndex].rateLimitMessage})
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
      const res = await axios.put(`https://api.sindarin.tech/api/personas/${selPersonaId}/prompt?apikey=${apiKey}`, {prompt: personaArr[selPersonaIndex].currentVoicePrompt})
      setPromptState(res.status === 200 ? 'Success' : 'Error')
    } catch (error) {
      console.log('VoiceChat#onPrompt: error: ', error)
    }
  }

  const onNewChat = async () => {
    setShowChatModal(true)
    const selPersonaId = personaArr[selPersonaIndex]?._id

    if (!personaArr.length || !selPersonaId) {
      return
    }

    const selPersonName = personaArr.find((persona) => persona._id === selPersonaId)?.name

    if (!personaClient || !selPersonName) {
      return
    }

    await personaClient.init('admin', selPersonName)
    console.log('persona client here', personaClient)
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
      const res = await axios.put(`https://api.sindarin.tech/api/personas/${selPersonaId}/schema?apikey=${apiKey}`, JSON.parse(schemaText))
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
      const res = await axios.put(`https://api.sindarin.tech/api/personas/${selPersonaId}/scenarios?apikey=${apiKey}`, {scenarios: personaArr[selPersonaIndex].scenarios})
      setSaveScenarioState(res.status === 200 ? 'Success' : 'Error')
    } catch (error) {
      console.log('VoiceChat#onSaveScenarios: error: ', error)
    }
  }

  return status ? (
    <div className='z-10 p-4 text-center text-text-gray'>{status}</div>
  ) : (
    <div className='z-10 w-full px-4'>
      <div className="flex flex-col gap-3 p-6 border rounded-lg bg-bg-light">
        <h2 className='text-2xl'>Configuration</h2>
        <div className='flex items-center justify-between w-full gap-3 p-6 border rounded-lg bg-bg-gray'>
          <div className='flex items-center gap-2'>
            <UserSelect onChange={onPersona}>
              {personaArr.map((persona, index) => (
                <option key={index} value={index}>{persona.name}</option>
              ))}
            </UserSelect>
            <UserSelect value={LLMSArray.indexOf(personaArr[selPersonaIndex]?.llm).toString() || '0'} onChange={onLLMChange}>
              {/* <UserSelect value={personaArr[selPersonaIndex]?.llm} onChange={onLLMChange}> */}
              {LLMSArray.map((llm, index) => (
                <option key={index} value={index}>{llm}</option>
              ))}
            </UserSelect>
            <div
              className='flex items-center justify-between h-6 px-3 py-2 text-sm text-gray-500 bg-white rounded cursor-pointer'
              onClick={async () => {
                await navigator.clipboard.writeText(personaArr[selPersonaIndex]?._id)
                setCopyStatus('Copied.')
                setTimeout(() => setCopyStatus(''), 2000)
              }}
            >
              <span className='mr-2'>{personaArr[selPersonaIndex]?._id}</span>
              <img
                className="w-4 h-4"
                src="/copy-to-clipboard.svg"
                alt="Copy to clipboard"
              />
            </div>
            <div className={`flex items-center fade-out transition-opacity duration-2000 text-sm text-gray-500 ${copyStatus ? 'opacity-0' : 'opacity-100'}`}>{copyStatus}</div>
          </div>
          <div className='flex flex-col justify-between gap-3'>
            <GreenButton onClick={onNewChat}>Start Chat</GreenButton>
            <div className='ml-auto'>
              <LightBlueButton onClick={onDeploy}>Deploy</LightBlueButton>
            </div>
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
                  {/* <div className='w-32'>{initialMsgState}</div> */}
                </div>
                <div className='flex items-center w-full gap-3'>
                  <InputText
                    value={personaArr[selPersonaIndex]?.rateLimitMessage || ''}
                    placeholder='Enter rate limit message here'
                    onChange={(e) => setScenarioRateLimit(selPersonaIndex, e.target.value)}
                  />
                  <BlueButton onClick={onRateLimit}>Submit</BlueButton>
                  {/* <div className='w-32'>{rateLimitMsgState}</div> */}
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
              <h2 className='text-2xl'>Scenarios</h2>
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
        personaName={personaArr[selPersonaIndex]?.name}
        schemaText={JSON.stringify(personaAction, null, 2)}
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
