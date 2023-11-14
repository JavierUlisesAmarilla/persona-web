import {COMMON_API_KEY} from '../constants'
import {useZustand} from '../store/use-zustand'


export const useApiKey = () => {
  const {apiKeyArr, selApiKeyIndex} = useZustand()
  const apiKey = apiKeyArr[selApiKeyIndex]?.apiKey || COMMON_API_KEY
  return apiKey
}
