import {create} from 'zustand'


interface ZustandState {
  personaClient: any
  setPersonaClient: (personaClient: any) => void

  team: any,
  setTeam: (team: any) => void

  personaAction: any
  setPersonaAction: (personaAction: any) => void

  personaArr: Array<any>
  setPersonaArr: (personaArr: Array<any>) => void

  LLMSArray: Array<string>
  setLLMSArray: (LLMSArray: Array<any>) => void

  transcriptArr: Array<any>
  setTranscriptArr: (transcriptArr: Array<any>) => void

  filteredTranscriptArr: Array<any>
  setFilteredTranscriptArr: (filteredTranscriptArr: Array<any>) => void

  personaLLMSelected: string
  setPersonaLLM: (personaIndex: number, llmSelected: string) => void

  selPersonaIndex: number
  setSelPersonaIndex: (selPersonaIndex: number) => void
  setScenarioInitMsg: (personaIndex: number, phoneNumber: string) => void
  setPersonaPhoneNumber: (personaIndex: number, text: string) => void
  setPersonaTwilioAuthToken: (personaIndex: number, authToken: string) => void
  setPersonaTwilioAccountSid: (personaIndex: number, accountSid: string) => void
  setPersonaVoiceId: (personaIndex: number, voiceId: string) => void
  setScenarioRateLimit: (personaIndex: number, text: string) => void
  setScenarioPrompt: (personaIndex: number, text: string) => void
  setScenarioContext: (personaIndex: number, scenarioIndex: number, text: string) => void
  setScenarioPersonaSay: (personaIndex: number, scenarioIndex: number, personaSayIndex: number, text: string) => void
  setScenarioUserSay: (personaIndex: number, scenarioIndex: number, userSayIndex: number, text: string) => void
  setScenarioResponse: (personaIndex: number, scenarioIndex: number, text: string) => void
  addNewScenario: (personaIndex: number) => void

  curEmail: string
  setCurEmail: (curEmail: string) => void

  selMenu: string
  setSelMenu: (selMenu: string) => void

  apiKeyArr: Array<any>
  setApiKeyArr: (apiKeyArr: Array<any>) => void

  selApiKeyIndex: number
  setSelApiKeyIndex: (selApiKeyIndex: number) => void

  status: string
  setStatus: (status: string) => void

  alertMsg: string
  setAlertMsg: (alertMsg: string) => void

  canSeeSettings: boolean
  setCanSeeSettings: (canSeeSettings: boolean) => void

  canSeePlayground: boolean
  setCanSeePlayground: (canSeePlayground: boolean) => void

  canSeeTranscripts: boolean
  setCanSeeTranscripts: (canSeeTranscripts: boolean) => void
}

export const useZustand = create<ZustandState>((set, get) => ({
  personaClient: null,
  setPersonaClient: (personaClient) => set((state) => ({...state, personaClient})),

  team: null,
  setTeam: (team) => set((state) => ({...state, team})),

  personaAction: {},
  setPersonaAction: (personaAction) => set((state) => ({...state, personaAction})),

  personaArr: [],
  setPersonaArr: (personaArr) => set((state) => ({...state, personaArr})),

  LLMSArray: [],
  setLLMSArray: (LLMSArray) => set((state) => ({...state, LLMSArray})),

  transcriptArr: [],
  setTranscriptArr: (transcriptArr) => set((state) => ({...state, transcriptArr})),

  filteredTranscriptArr: [],
  setFilteredTranscriptArr: (filteredTranscriptArr) => set((state) => ({...state, filteredTranscriptArr})),

  personaLLMSelected: '',
  setPersonaLLM: (personaIndex, llmSelected) => set((state) => {
    const personaArr = get().personaArr
    console.log('setting persona', personaArr[personaIndex], 'to llm', llmSelected)
    personaArr[personaIndex].llm = llmSelected
    return {...state, personaArr}
  }),

  selPersonaIndex: 0,
  setSelPersonaIndex: (selPersonaIndex) => set((state) => ({...state, selPersonaIndex})),
  setScenarioInitMsg: (personaIndex, text) => set((state) => {
    const personaArr = get().personaArr
    personaArr[personaIndex].initialMessage = text
    return {...state, personaArr}
  }),
  setPersonaTwilioAuthToken: (personaIndex, authToken) => set((state) => {
    const personaArr = get().personaArr
    personaArr[personaIndex].twilio = personaArr[personaIndex].twilio || {}
    personaArr[personaIndex].twilio.authToken = authToken
    return {...state, personaArr}
  }),
  setPersonaTwilioAccountSid: (personaIndex, accountSid) => set((state) => {
    const personaArr = get().personaArr
    personaArr[personaIndex].twilio = personaArr[personaIndex].twilio || {}
    personaArr[personaIndex].twilio.authToken = accountSid
    return {...state, personaArr}
  }),
  setPersonaPhoneNumber: (personaIndex, phoneNumber) => set((state) => {
    const personaArr = get().personaArr
    personaArr[personaIndex].phoneNumber = phoneNumber
    return {...state, personaArr}
  }),
  setPersonaVoiceId: (personaIndex, voiceId) => set((state) => {
    const personaArr = get().personaArr
    personaArr[personaIndex].voiceId = voiceId
    return {...state, personaArr}
  }),
  setScenarioRateLimit: (personaIndex, text) => set((state) => {
    const personaArr = get().personaArr
    personaArr[personaIndex].rateLimitMessage = text
    return {...state, personaArr}
  }),
  setScenarioPrompt: (personaIndex, text) => set((state) => {
    const personaArr = get().personaArr
    personaArr[personaIndex].currentVoicePrompt = text
    return {...state, personaArr}
  }),
  setScenarioContext: (personaIndex, scenarioIndex, text) => set((state) => {
    const personaArr = get().personaArr
    personaArr[personaIndex].scenarios[scenarioIndex].context = text
    return {...state, personaArr}
  }),
  setScenarioPersonaSay: (personaIndex, scenarioIndex, personaSayIndex, text) => set((state) => {
    const personaArr = get().personaArr

    if (!personaArr[personaIndex].scenarios[scenarioIndex].personaSays) {
      personaArr[personaIndex].scenarios[scenarioIndex].personaSays = []
    }

    personaArr[personaIndex].scenarios[scenarioIndex].personaSays[personaSayIndex] = text
    return {...state, personaArr}
  }),
  setScenarioUserSay: (personaIndex, scenarioIndex, userSayIndex, text) => set((state) => {
    const personaArr = get().personaArr

    if (!personaArr[personaIndex].scenarios[scenarioIndex].userSays) {
      personaArr[personaIndex].scenarios[scenarioIndex].userSays = []
    }

    personaArr[personaIndex].scenarios[scenarioIndex].userSays[userSayIndex] = text
    return {...state, personaArr}
  }),
  setScenarioResponse: (personaIndex, scenarioIndex, text) => set((state) => {
    const personaArr = get().personaArr
    personaArr[personaIndex].scenarios[scenarioIndex].responseGuidelines = text
    return {...state, personaArr}
  }),
  addNewScenario: (personaIndex) => set((state) => {
    const personaArr = get().personaArr

    if (!personaArr[personaIndex].scenarios) {
      personaArr[personaIndex].scenarios = []
    }

    personaArr[personaIndex].scenarios.push({})
    return {...state, personaArr}
  }),

  curEmail: '',
  setCurEmail: (curEmail) => set((state) => ({...state, curEmail})),

  selMenu: 'playground',
  setSelMenu: (selMenu) => set((state) => ({...state, selMenu, status: ''})),

  apiKeyArr: [],
  setApiKeyArr: (apiKeyArr) => set((state) => ({...state, apiKeyArr})),

  selApiKeyIndex: 0,
  setSelApiKeyIndex: (selApiKeyIndex) => set((state) => ({...state, selApiKeyIndex})),

  status: '',
  setStatus: (status) => set((state) => ({...state, status})),

  alertMsg: '',
  setAlertMsg: (alertMsg) => set((state) => ({...state, alertMsg})),

  canSeeSettings: false,
  setCanSeeSettings: (canSeeSettings) => set((state) => ({...state, canSeeSettings})),

  canSeePlayground: false,
  setCanSeePlayground: (canSeePlayground) => set((state) => ({...state, canSeePlayground})),

  canSeeTranscripts: false,
  setCanSeeTranscripts: (canSeeTranscripts) => set((state) => ({...state, canSeeTranscripts})),
}))
