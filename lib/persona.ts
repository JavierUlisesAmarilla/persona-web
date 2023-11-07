import axios from 'axios'
import {USE_SAMPLE_DATA} from './constants'
import {SAMPLE_PERSONA_ARR} from './sample-data'


export const getPersonaArr = async (apiKey: string) => {
  try {
    const personaArr = USE_SAMPLE_DATA ?
      SAMPLE_PERSONA_ARR :
      (await axios.get(`https://api.sindarin.tech/api/personas?apikey=${apiKey}`))?.data
    console.log('persona#getPersonaArr: personaArr: ', personaArr)
    return personaArr
  } catch (e) {
    console.log('mongodb#saveData: e: ', e)
  }
}

export const getLLMSArr = async (apiKey: string) => {
  try {
    const llmsArr = (await axios.get(`https://api.sindarin.tech/api/llms?apikey=${apiKey}`))?.data
    console.log('persona#getLLMSArr: llmsArr: ', llmsArr)
    return llmsArr
  } catch (e) {
    console.log('mongodb#saveData: e: ', e)
  }
}


  