import {COMMON_API_KEY} from '../constants'
import {useZustand} from '../store/use-zustand'


export const useApiKey = () => {
  const {apiKeyArr, curEmail} = useZustand()
  const apiKey = apiKeyArr.find((apiKeyObj) => apiKeyObj.emailArr.find((emailObj: any) => emailObj.name === curEmail))?.apiKey || COMMON_API_KEY
  return apiKey
}
