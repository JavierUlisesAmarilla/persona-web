import { create } from 'zustand';

interface ZustandState {
  personaClient: any;
  setPersonaClient: (personaClient: any) => void;
  personaArr: Array<any>;
  setPersonaArr: (personaArr: Array<any>) => void;
  selPersonaIndex: number;
  setSelPersonaIndex: (selPersonaIndex: number) => void;
  saveScenarioPersonaSay: (personaIndex: number, scenarioIndex: number, personaSayIndex: number, text: string) => void;
  saveScenarioUserSay: (personaIndex: number, scenarioIndex: number, userSayIndex: number, text: string) => void;
}

export const useZustand = create<ZustandState>((set, get) => ({
  personaClient: null,
  setPersonaClient: (personaClient) => set((state) => ({ ...state, personaClient })),
  personaArr: [],
  setPersonaArr: (personaArr) => set((state) => ({ ...state, personaArr })),
  selPersonaIndex: 0,
  setSelPersonaIndex: (selPersonaIndex) => set((state) => ({ ...state, selPersonaIndex })),
  saveScenarioPersonaSay: (personaIndex, scenarioIndex, personaSayIndex, text) => set((state) => {
    const personaArr = get().personaArr
    personaArr[personaIndex].scenarios[scenarioIndex].personaSays[personaSayIndex] = text
    return { ...state, personaArr }
  }),
  saveScenarioUserSay: (personaIndex, scenarioIndex, userSayIndex, text) => set((state) => {
    const personaArr = get().personaArr
    personaArr[personaIndex].scenarios[scenarioIndex].userSays[userSayIndex] = text
    return { ...state, personaArr }
  }),
}));
