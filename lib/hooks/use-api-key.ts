import {useZustand} from '../store/use-zustand'


export const useApiKey = () => {
  const {apiKeyArr, selApiKeyIndex} = useZustand()
  console.log('useApiKey: apiKeyArr[selApiKeyIndex]: ', apiKeyArr[selApiKeyIndex], apiKeyArr, selApiKeyIndex)
  const apiKey = apiKeyArr[selApiKeyIndex]?.apiKey
  return apiKey
}
