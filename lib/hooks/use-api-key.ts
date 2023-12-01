import {useZustand} from '../store/use-zustand'


export const useApiKey = () => {
  const {apiKeyArr, selApiKeyIndex} = useZustand()
  const apiKey = apiKeyArr[selApiKeyIndex]?.apiKey
  return apiKey
}
