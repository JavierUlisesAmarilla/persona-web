import create from 'zustand';

interface ZustandState {
  personaClient: any;
  setPersonaClient: (personaClient: any) => void;
}

export const useZustand = create<ZustandState>((set) => ({
  personaClient: null,
  setPersonaClient: (personaClient) => set((state) => ({ ...state, personaClient })),
}));
