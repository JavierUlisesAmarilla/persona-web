import {DEPLOY_URL, USE_SAMPLE_DATA} from './constants'
import {SAMPLE_LLMS_ARR, SAMPLE_PERSONA_ARR, SAMPLE_TRANSCRIPT_ARR} from './sample-data'

import axios from 'axios'
import {getCustomDateFromStr} from './common'


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
    transcriptArr.forEach((val: any) => {
      val.createdAt = getCustomDateFromStr(val.createdAt)
      return val
    })
    console.log('persona#getTranscriptArr: transcriptArr: ', transcriptArr)
    return transcriptArr
  } catch (e) {
    console.log('persona#getTranscriptArr: e: ', e)
  }
}


export const getTeam = async (apiKey: string) => {
  try {
    const team = (await axios.get(`https://api.sindarin.tech/api/team?apikey=${apiKey}`))?.data
    console.log('persona#getTeam: team: ', team)
    return team
  } catch (e) {
    console.log('persona#getTeam: e: ', e)
  }
}


export const changeLLM = async (personaId: string, apiKey: string, llm: any) => {
  try {
    const res = await axios.put(`https://api.sindarin.tech/api/personas/${personaId}/llm?apikey=${apiKey}`, {llm})
    console.log('persona#changeLLM: res: ', res)
    return res
  } catch (e) {
    console.log('persona#changeLLM: e: ', e)
  }
}


export const addTeam = async (name: string) => {
  try {
    const res = await axios.post(`${DEPLOY_URL}/api/persona/teams/new`, {name})

    if (res?.data?.success) {
      return res.data.token
    }
  } catch (e) {
    console.log('persona#addTeam: e: ', e)
  }
}
