import {SAMPLE_LLMS_ARR, SAMPLE_PERSONA_ARR, SAMPLE_TRANSCRIPT_ARR} from './sample-data'

import axios from 'axios'
import {USE_SAMPLE_DATA} from './constants'


export const getPersonaArr = async (apiKey: string) => {
  try {
    const personaArr = USE_SAMPLE_DATA ?
      SAMPLE_PERSONA_ARR :
      (await axios.get(`https://api.sindarin.tech/api/personas?apikey=${apiKey}`))?.data
    console.log('persona#getPersonaArr: personaArr: ', personaArr)
    return personaArr
  } catch (e) {
    console.log('persona#getPersonaArr: e: ', e)
  }
}


export const getLLMSArr = async (apiKey: string) => {
  try {
    const llmsArr = USE_SAMPLE_DATA ? SAMPLE_LLMS_ARR : (await axios.get(`https://api.sindarin.tech/api/llms?apikey=${apiKey}`))?.data
    console.log('persona#getLLMSArr: llmsArr: ', llmsArr)
    return llmsArr
  } catch (e) {
    console.log('persona#getLLMSArr: e: ', e)
  }
}


export const getTranscriptArr = async (apiKey: string, personaId: string) => {
  try {
    const transcriptArr = USE_SAMPLE_DATA ? SAMPLE_TRANSCRIPT_ARR : (await axios.get(`https://api.sindarin.tech/api/personas/${personaId}/transcripts?apikey=${apiKey}`))?.data
    console.log('persona#getTranscriptArr: transcriptArr: ', transcriptArr)
    return transcriptArr
  } catch (e) {
    console.log('persona#getTranscriptArr: e: ', e)
  }
}
