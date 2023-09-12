import { create } from 'zustand'

interface ZustandState {
  personaClient: any
  setPersonaClient: (personaClient: any) => void
  personaArr: Array<any>
  setPersonaArr: (personaArr: Array<any>) => void
  selPersonaIndex: number
  setSelPersonaIndex: (selPersonaIndex: number) => void
  setScenarioInitMsg: (personaIndex: number, text: string) => void
  setScenarioRateLimit: (personaIndex: number, text: string) => void
  setScenarioPrompt: (personaIndex: number, text: string) => void
  setScenarioContext: (personaIndex: number, scenarioIndex: number, text: string) => void
  setScenarioPersonaSay: (personaIndex: number, scenarioIndex: number, personaSayIndex: number, text: string) => void
  setScenarioUserSay: (personaIndex: number, scenarioIndex: number, userSayIndex: number, text: string) => void
  setScenarioResponse: (personaIndex: number, scenarioIndex: number, text: string) => void
  addNewScenario: (personaIndex: number) => void
}

export const useZustand = create<ZustandState>((set, get) => ({
  personaClient: null,
  setPersonaClient: (personaClient) => set((state) => ({ ...state, personaClient })),
  personaArr: [],
  setPersonaArr: (personaArr) => set((state) => ({ ...state, personaArr })),
  selPersonaIndex: 0,
  setSelPersonaIndex: (selPersonaIndex) => set((state) => ({ ...state, selPersonaIndex })),
  setScenarioInitMsg: (personaIndex, text) => set((state) => {
    const personaArr = get().personaArr
    personaArr[personaIndex].initialMessage = text
    return { ...state, personaArr }
  }),
  setScenarioRateLimit: (personaIndex, text) => set((state) => {
    const personaArr = get().personaArr
    personaArr[personaIndex].rateLimitMessage = text
    return { ...state, personaArr }
  }),
  setScenarioPrompt: (personaIndex, text) => set((state) => {
    const personaArr = get().personaArr
    personaArr[personaIndex].currentVoicePrompt = text
    return { ...state, personaArr }
  }),
  setScenarioContext: (personaIndex, scenarioIndex, text) => set((state) => {
    const personaArr = get().personaArr
    personaArr[personaIndex].scenarios[scenarioIndex].context = text
    return { ...state, personaArr }
  }),
  setScenarioPersonaSay: (personaIndex, scenarioIndex, personaSayIndex, text) => set((state) => {
    const personaArr = get().personaArr

    if (!personaArr[personaIndex].scenarios[scenarioIndex].personaSays) {
      personaArr[personaIndex].scenarios[scenarioIndex].personaSays = []
    }

    personaArr[personaIndex].scenarios[scenarioIndex].personaSays[personaSayIndex] = text
    return { ...state, personaArr }
  }),
  setScenarioUserSay: (personaIndex, scenarioIndex, userSayIndex, text) => set((state) => {
    const personaArr = get().personaArr

    if (!personaArr[personaIndex].scenarios[scenarioIndex].userSays) {
      personaArr[personaIndex].scenarios[scenarioIndex].userSays = []
    }

    personaArr[personaIndex].scenarios[scenarioIndex].userSays[userSayIndex] = text
    return { ...state, personaArr }
  }),
  setScenarioResponse: (personaIndex, scenarioIndex, text) => set((state) => {
    const personaArr = get().personaArr
    personaArr[personaIndex].scenarios[scenarioIndex].responseGuidelines = text
    return { ...state, personaArr }
  }),
  addNewScenario: (personaIndex) => set((state) => {
    const personaArr = get().personaArr

    if (!personaArr[personaIndex].scenarios) {
      personaArr[personaIndex].scenarios = []
    }

    personaArr[personaIndex].scenarios.push({})
    return { ...state, personaArr }
  }),
}))
