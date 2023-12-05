/* eslint-disable no-unused-vars */


'use client'

import {AiFillPlusCircle, AiOutlineDelete, AiOutlinePhone} from 'react-icons/ai'
import {BorderGrayButton, DarkBlueButton} from '../../shared/button'

import {BlueButton} from '@/components/shared/button'
import {Textarea} from '@/components/shared/textarea'
import {UserSelect} from '@/components/shared/user-select'
import {SINDARIN_API_URL} from '@/lib/constants'
import {useApiKey} from '@/lib/hooks/use-api-key'
import {changeLLM} from '@/lib/persona'
import {useZustand} from '@/lib/store/use-zustand'
import {validateActionSchema} from '@/lib/utils'
import axios from 'axios'
import {encode} from 'gpt-tokenizer'
import _ from 'lodash'
import {useState} from 'react'
import {ChangeVoiceModal} from './change-voice-modal'
import {ChatModal} from './chat-modal'
import {DeployModal} from './deploy-modal'
import {Scenario} from './scenario'


declare global {
  interface Window {
    PersonaClient: any
  }
}

let jsonListener: any = null

interface MessageDetail {
  user_message?: string;
  assistant_message?: string;
  system?: string;
  // ... other properties
}


export const VoiceChat = () => {
  const {
    personaClient,
    personaArr,
    selPersonaIndex, setSelPersonaIndex,
    setScenarioInitMsg, setScenarioRateLimit, setScenarioPrompt, addNewScenario,
    LLMSArray,
    setPersonaLLM,
    personaAction,
    setPersonaAction,
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
  const [showChangeVoiceModal, setShowChangeVoiceModal] = useState(false)
  const [isPromptSynced, setIsPromptSynced] = useState(true)
  const [isActionsSchemaSynced, setIsActionsSchemaSynced] = useState(true)

  const [currentConversationMessages, setCurrentConversationMessages] = useState<MessageDetail[]>([])
  const [currentConversationId, setCurrentConversationId] = useState('')

  const apiKey = useApiKey()

  const currentPromptText = personaArr[selPersonaIndex]?.currentVoicePrompt || ''
  const stringifiedActionText = JSON.stringify(schemaText, null, 2) || ''

  const actionsSchemaOccurrences = (currentPromptText.match(/(\*\*\*PERSONA_VOICE_SCHEMA\*\*\*)/g) || []).length
  const isActionsSchemaInPrompt = actionsSchemaOccurrences > 0
  const areScenariosInPrompt = currentPromptText.includes('***SCENARIOS_LIST***')
  const totalPromptTokens = isActionsSchemaInPrompt ? encode(currentPromptText).length + (encode(stringifiedActionText).length * actionsSchemaOccurrences) : encode(currentPromptText).length

  const schemaErrors = validateActionSchema(schemaText)

  const onPersona = (e: any) => {
    const newPersonaIndex = parseInt(e.target.value)
    setSelPersonaIndex(newPersonaIndex)
    setSchemaText(JSON.stringify(personaArr[newPersonaIndex].currentVoiceSchema, null, 2))
  }

  const onLLMChange = async (e: any) => {
    const newLLMSIndex = parseInt(e.target.value)
    const selPersonaId = personaArr[selPersonaIndex]?._id
    // PUT /api/personas/:personaId/llm with body {llm: llm}
    await changeLLM(selPersonaId, apiKey, LLMSArray[newLLMSIndex])
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
      const res = await axios.put(`${SINDARIN_API_URL}/api/personas/${selPersonaId}/initialMessage?apikey=${apiKey}`, {initialMessage: personaArr[selPersonaIndex].initialMessage})
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
      const res = await axios.put(`${SINDARIN_API_URL}/api/personas/${selPersonaId}/rateLimitMessage?apikey=${apiKey}`, {rateLimitMessage: personaArr[selPersonaIndex].rateLimitMessage})
      setRateLimitMsgState(res.status === 200 ? 'Success' : 'Error')
    } catch (error) {
      console.log('VoiceChat#onRateLimit: error: ', error)
    }
  }

  const onPrompt = async () => {
    try {
      setIsPromptSynced(true)
      const selPersonaId = personaArr[selPersonaIndex]?._id

      if (!selPersonaId) {
        return
      }

      setPromptState('Saving...')
      const res = await axios.put(`${SINDARIN_API_URL}/api/personas/${selPersonaId}/prompt?apikey=${apiKey}`, {prompt: personaArr[selPersonaIndex].currentVoicePrompt})
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
    setCurrentConversationId(personaClient.conversationId)

    // Check if jsonListener is already listening to avoid duplicate listeners
    if (!jsonListener) {
      jsonListener = ({detail}: any) => {
        console.log('CURRENT MESSAGES BEFORE PUSH', detail)
        if (detail.user_message || detail.persona_message) {
          setCurrentConversationMessages((prev) => [...prev, detail])
        } else if (Object.keys(detail).length > 0 && !detail.transcription && !detail.persona_message && !detail.user_message) {
          setPersonaAction(detail)
        }
      }
      personaClient.on('json', jsonListener)
    }
    console.log('persona client here', personaClient)
  }

  const onDeploy = () => {
    setShowDeployModal(true)
  }

  const onSchema = async () => {
    try {
      setIsActionsSchemaSynced(true)
      const selPersonaId = personaArr[selPersonaIndex]?._id

      if (!selPersonaId || !schemaText) {
        return
      }

      setSchemaState('Loading (this can take a few seconds)...')
      const res = await axios.put(`${SINDARIN_API_URL}/api/personas/${selPersonaId}/schema?apikey=${apiKey}`, JSON.parse(schemaText))
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
      const res = await axios.put(`${SINDARIN_API_URL}/api/personas/${selPersonaId}/scenarios?apikey=${apiKey}`, {scenarios: personaArr[selPersonaIndex].scenarios})
      setSaveScenarioState(res.status === 200 ? 'Success' : 'Error')
    } catch (error) {
      console.log('VoiceChat#onSaveScenarios: error: ', error)
    }
  }

  return (
    <div className='w-full h-full'>
      <div className="flex flex-col w-full gap-3 p-6 rounded-lg">
        <div className='flex items-end justify-between'>
          <h2 className='text-2xl font-semibold'>Playground</h2>
          <BlueButton className='items-center gap-2'>
            <div className='text-sm'>Create New Persona</div>
            <AiFillPlusCircle className='text-base'/>
          </BlueButton>
        </div>
        <div className='flex flex-col w-full gap-3 p-6 border rounded-lg bg-bg-dark-blue'>
          <div className='flex flex-wrap items-center justify-between w-full'>
            <div className='flex gap-3'>
              <div className='flex flex-col items-start gap-2'>
                <UserSelect
                  className='text-white bg-bg-dark-blue border-border-dark-blue'
                  onChange={onPersona}
                >
                  {personaArr.map((persona, index) => (
                    <option key={index} value={index}>{persona.name}</option>
                  ))}
                </UserSelect>

              </div>
              <UserSelect
                className='text-white bg-bg-dark-blue border-border-dark-blue'
                value={LLMSArray.indexOf(personaArr[selPersonaIndex]?.llm).toString() || '0'}
                onChange={onLLMChange}
              >
                {/* <UserSelect value={personaArr[selPersonaIndex]?.llm} onChange={onLLMChange}> */}
                {LLMSArray.map((llm, index) => (
                  <option key={index} value={index}>{llm}</option>
                ))}
              </UserSelect>
              <DarkBlueButton onClick={() => setShowChangeVoiceModal(true)}>Change Voice</DarkBlueButton>
              {/* <div
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
              <div className={`flex fade-out transition-opacity duration-2000 text-sm text-gray-500 ${copyStatus ? 'opacity-0' : 'opacity-100'}`}>{copyStatus}</div> */}
            </div>
            <div className='flex gap-3'>
              <BlueButton
                className='flex items-center gap-1'
                onClick={onNewChat}
              >
                <AiOutlinePhone className='text-sm text-white'/>
                <div>Start Chat</div>
              </BlueButton>
              <DarkBlueButton onClick={onDeploy}>Deploy</DarkBlueButton>
            </div>
          </div>
          <div className='flex items-center justify-between w-full gap-6'>
            <div className='flex-grow gap-2 p-4 border border-border-dark-blue rounded-xl'>
              <div className='text-xs text-gray-400'>Initial Message</div>
              <div className='text-base text-white'>{personaArr[selPersonaIndex]?.initialMessage || ''}</div>
            </div>
            <div className='flex-grow gap-2 p-4 border border-border-dark-blue rounded-xl'>
              <div className='text-xs text-gray-400'>Rate Limit Message</div>
              <div className='text-base text-white'>{personaArr[selPersonaIndex]?.rateLimitMessage || ''}</div>
            </div>
          </div>
        </div>
        {personaArr[selPersonaIndex] &&
          <>
            <div className='flex w-full gap-3 p-6 border rounded-lg bg-bg-light'>
              <div className='flex flex-col w-full gap-3'>
                <div className='flex items-center justify-between w-full gap-3'>
                  <div className='text-base font-semibold'>Prompt</div>
                  <BorderGrayButton onClick={onPrompt}>Update</BorderGrayButton>
                </div>
                <Textarea
                  className='h-[550px]'
                  value={personaArr[selPersonaIndex]?.currentVoicePrompt || ''}
                  placeholder='Enter the prompt here'
                  onChange={(e) => {
                    setIsPromptSynced(false)
                    setScenarioPrompt(selPersonaIndex, e.target.value)
                  }}
                />
                <div className='flex items-center justify-between w-full gap-3'>
                  <div>
                    <div className='text-sm text-right'>Actions Schema {isActionsSchemaInPrompt ? <span className='text-green-500'>✔</span> : <span className='text-red-500'>✖</span>}</div>
                    <div>{promptState}</div>
                  </div>
                  <div className='text-sm text-right'>
                    Tokens:{' '}
                    <span className={
                      `${totalPromptTokens < 1000 ? 'text-green-500' :
                        totalPromptTokens < 3000 ? 'text-yellow-500' :
                          totalPromptTokens <= 4000 ? 'text-orange-500' :
                            'text-red-500'}`
                    }
                    >
                      {totalPromptTokens}
                    </span>
                  </div>
                </div>
                <div className='text-sm'>Scenarios {areScenariosInPrompt ? <span className='text-green-500'>✔</span> : <span className='text-red-500'>✖</span>}</div>
              </div>
              <div className='flex flex-col w-full gap-3'>
                <div className='flex items-center justify-between w-full gap-3'>
                  <div className='text-base font-semibold'>Actions Schema</div>
                  <BorderGrayButton onClick={onSchema}>Update</BorderGrayButton>
                </div>
                <Textarea
                  className={`h-[550px] ${!isActionsSchemaInPrompt ? 'text-gray-500' : ''}`}
                  value={schemaText}
                  placeholder='Enter the actions schema here'
                  onChange={(e) => {
                    setIsActionsSchemaSynced(false)
                    setSchemaText(e.target.value)
                  }}
                />
                <div className='flex items-center justify-end gap-3'>
                  <div className='w-full text-right'>
                    {schemaErrors!.length > 0 ?
                      schemaErrors!.map((error, index) => (
                        <div key={index} className='text-sm text-red-500'>
                          <div>{(error as any).instancePath || (error as any).dataPath ? `${((error as any).instancePath || (error as any).dataPath).replace('.properties', '')}:` : 'Error:'}</div>
                          <div>{_.capitalize(error.message)}</div>
                        </div>
                      )) :
                      <div className='text-sm'>Valid <span className='text-green-500'>✔</span></div>
                    }
                  </div>
                  <div className='text-right'>{schemaState}</div>
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
              <div className='flex items-end justify-between'>
                <div className='flex items-center gap-3'>
                  <h2 className='text-2xl font-semibold'>All Scenarios</h2>
                  <div className='px-2 border rounded text-text-gray border-border-gray bg-bg-light'>{personaArr[selPersonaIndex]?.scenarios?.length}</div>
                  <AiOutlineDelete className='text-2xl border rounded cursor-pointer text-text-gray border-border-gray bg-bg-light'/>
                </div>
                <div className='flex items-center gap-3'>
                  <div>{saveScenarioState}</div>
                  <BorderGrayButton onClick={onSaveScenarios}>Save</BorderGrayButton>
                  <AiFillPlusCircle
                    className='text-3xl cursor-pointer text-text-blue'
                    onClick={onNewScenario}
                  />
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
        onPause={async () => {
          await personaClient.end()
          // add a system message to the messages array
          setCurrentConversationMessages((prev) => [...prev, {system: 'Paused.'}])
        }}
        onResume={async () => {
          await personaClient.resume(currentConversationId)
          // add a system message to the messages array
          setCurrentConversationMessages((prev) => [...prev, {system: 'Resumed.'}])
        }}
        onClose={async () => {
          await personaClient.end()
          setShowChatModal(false)
          setCurrentConversationId('')
          setCurrentConversationMessages([])
        }}
        messages={currentConversationMessages}
      />
      <DeployModal
        show={showDeployModal}
        onClose={() => setShowDeployModal(false)}
      />
      <ChangeVoiceModal
        show={showChangeVoiceModal}
        onClose={() => setShowChangeVoiceModal(false)}
      />
    </div>
  )
}
