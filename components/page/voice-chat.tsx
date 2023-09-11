"use client"
import { API_KEY } from '@/lib/constants'
import { useZustand } from '@/lib/store/use-zustand';
import { Key, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Scenario from './scenario';

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
    selPersonaIndex, setSelPersonaIndex,
    addNewScenario,
  } = useZustand()
  const [initialMsgState, setInitialMsgState] = useState('')
  const [rateLimitMsgState, setRateLimitMsgState] = useState('')
  const [promptState, setPromptState] = useState('')
  const [schemaState, setSchemaState] = useState('')
  const [stateState, setStateState] = useState('')
  const [saveScenarioState, setSaveScenarioState] = useState('')

  const userInputRef = useRef<any>()
  const assistantInputRef = useRef<any>()
  const initialInputRef = useRef<any>()
  const rateLimitInputRef = useRef<any>()
  const promptTextRef = useRef<any>()
  const actionsSchemaTextRef = useRef<any>()
  const currentStateTextRef = useRef<any>()

  const onUser = () => {
    if (!personaClient || !userInputRef.current.value) {
      return
    }

    personaClient.sendUserText(userInputRef.current.value)
  }

  const onAssistant = () => {
    if (!personaClient || !assistantInputRef.current.value) {
      return
    }

    personaClient.sayText(assistantInputRef.current.value)
  }

  const onInitialization = async () => {
    const initialMsg = initialInputRef.current.value
    const selPersonaId = personaArr[selPersonaIndex]._id

    if (!personaClient || !initialMsg || !selPersonaId) {
      return
    }

    setInitialMsgState('Saving...')
    const res = await axios.put(`https://app.sindarin.tech/api/personas/${selPersonaId}/initialMessage?apikey=${API_KEY}`, { initialMessage: initialMsg });
    setInitialMsgState(res.status === 200 ? 'Success' : 'Error')
  }

  const onRateLimit = async () => {
    const rateLimitMsg = rateLimitInputRef.current.value
    const selPersonaId = personaArr[selPersonaIndex]._id

    if (!personaClient || !rateLimitMsg || !selPersonaId) {
      return
    }

    setRateLimitMsgState('Saving...')
    const res = await axios.put(`https://app.sindarin.tech/api/personas/${selPersonaId}/rateLimitMessage?apikey=${API_KEY}`, { rateLimitMessage: rateLimitMsg });
    setRateLimitMsgState(res.status === 200 ? 'Success' : 'Error')
  }

  const onPrompt = async () => {
    const promptText = promptTextRef.current.value
    const selPersonaId = personaArr[selPersonaIndex]._id

    if (!personaClient || !promptText || !selPersonaId) {
      return
    }

    setPromptState('Saving...')
    const res = await axios.put(`https://app.sindarin.tech/api/personas/${selPersonaId}/prompt?apikey=${API_KEY}`, { prompt: promptText });
    setPromptState(res.status === 200 ? 'Success' : 'Error')
  }

  const onNewChat = async () => {
    const selPersonaId = personaArr[selPersonaIndex]._id

    if (!personaArr.length || !selPersonaId) {
      return
    }

    const selPersonName = personaArr.find((persona) => persona._id === selPersonaId)?.name

    if (!personaClient || !selPersonName) {
      return
    }

    await personaClient.init('admin', selPersonName)
  }

  const onActionsSchema = async () => {
    const selPersonaId = personaArr[selPersonaIndex]._id
    const actionsSchemaText = actionsSchemaTextRef.current.value

    if (!selPersonaId || !actionsSchemaText) {
      return
    }

    setSchemaState('Loading (this can take a few seconds)...')
    const res = await axios.put(`https://app.sindarin.tech/api/personas/${selPersonaId}/schema?apikey=${API_KEY}`, JSON.parse(actionsSchemaText));
    setSchemaState(res.status === 200 ? 'Success' : 'Error')
  }

  const onState = () => {
    const currentStateText = currentStateTextRef.current.value

    if (!personaClient || !currentStateText) {
      return
    }

    setStateState('Saving...')
    personaClient.updateState(JSON.parse(currentStateText));
    setStateState('Success')
  }

  const onNewScenario = () => {
    addNewScenario(selPersonaIndex)
  }

  const onSaveScenarios = async () => {
    const selPersonaId = personaArr[selPersonaIndex]._id

    if (!selPersonaId) {
      return
    }

    setSaveScenarioState('Saving...')
    const res = await axios.put(`https://app.sindarin.tech/api/personas/${selPersonaId}/scenarios?apikey=${API_KEY}`, { scenarios: personaArr[selPersonaIndex].scenarios });
    setSaveScenarioState(res.status === 200 ? 'Success' : 'Error')
  }

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

  return personaArr.length ? (
    <div className="z-10 flex flex-col w-full gap-8 px-8">
      <div className='flex flex-col w-full gap-4'>
        <div className='flex items-center w-full gap-4'>
          <input
            className='w-full rounded-full'
            ref={userInputRef}
            type='text'
            defaultValue='User'
            placeholder='Enter user text here'
          ></input>
          <div
            className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
            onClick={onUser}
          >
            Submit
          </div>
          <div className='w-32'></div>
        </div>
        <div className='flex items-center w-full gap-4'>
          <input
            className='w-full rounded-full'
            ref={assistantInputRef}
            type='text'
            defaultValue='Assistant'
            placeholder='Enter assistant text here'
          ></input>
          <div
            className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
            onClick={onAssistant}
          >
            Submit
          </div>
          <div className='w-32'></div>
        </div>
        <div className='flex items-center w-full gap-4'>
          <input
            className='w-full rounded-full'
            ref={initialInputRef}
            type='text'
            defaultValue='Initialization'
            placeholder='Enter initial message here'
          ></input>
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
            ref={rateLimitInputRef}
            type='text'
            defaultValue='Rate limit'
            placeholder='Enter rate limit message here'
          ></input>
          <div
            className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
            onClick={onRateLimit}
          >
            Submit
          </div>
          <div className='w-32'>{rateLimitMsgState}</div>
        </div>
      </div>
      <div className='flex items-center w-full gap-4'>
        <select
          className='w-full rounded-full cursor-pointer'
          onChange={(e) => setSelPersonaIndex(parseInt(e.target.value))}
        >
          {personaArr.map((persona, index) => <option key={index} value={index}>{persona.name}</option>)}
        </select>
        <div className='w-32'></div>
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
            ref={promptTextRef}
            rows={20}
            defaultValue='Prompt'
            placeholder='Enter the prompt here'
          ></textarea>
          <div className='flex flex-col'>
            <div>Possible variables:</div>
            <div>- ***PERSONA_VOICE_SCHEMA***: required to make use of the Actions schema</div>
            <div>- ***CURRENT_DATETIME***: required to enable access to the current date/time</div>
            <div>- ***DETAILS.detail***: where &quot;detail&quot; is a variable passed into the &quot;details&quot; object in an API-driven call; e.g. &quot;***DETAILS.firstName***&quot;</div>
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
            ref={actionsSchemaTextRef}
            rows={20}
            defaultValue='{}'
            placeholder='Enter the actions schema here'
          ></textarea>
          <div className='flex items-center gap-4'>
            <div
              className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black w-fit whitespace-nowrap'
              onClick={onActionsSchema}
            >Update actions schema</div>
            <div>{schemaState}</div>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div className='text-lg'>Current state</div>
        <textarea
          ref={currentStateTextRef}
          rows={20}
          defaultValue='{}'
          placeholder=''
        ></textarea>
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
          {personaArr[selPersonaIndex].scenarios?.map((scenario: any, index: number) =>
            <Scenario
              key={index}
              scenarioIndex={index}
              scenario={scenario}
            ></Scenario>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className='z-10 w-full p-4 text-center'>Loading...</div>
  )
}
