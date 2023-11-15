import {DEPLOY_URL, USE_SAMPLE_DATA} from '../constants'

import axios from 'axios'
import {SAMPLE_DB_DATA_ARR} from '../sample-data'


export const saveData = async (data: any) => {
  try {
    if (!data) {
      return
    }

    const res = await axios.post(`${DEPLOY_URL}/api/mongodb`, data)
    return res
  } catch (e) {
    console.log('mongodb#saveData: e: ', e)
  }
}


export const getData = async (id: string) => {
  try {
    if (!id) {
      return
    }

    const res = await axios.get(`${DEPLOY_URL}/api/mongodb?id=${id}`)
    return res?.data
  } catch (e) {
    console.log('mongodb#getData: e: ', e)
  }
}


export const getDataByEmail = async (email: string) => {
  try {
    if (!email) {
      return
    }

    const res = await axios.get(`${DEPLOY_URL}/api/mongodb?email=${email}`)
    return res?.data
  } catch (e) {
    console.log('mongodb#getDataByEmail: e: ', e)
  }
}


export const getAllData = async () => {
  try {
    if (USE_SAMPLE_DATA) {
      return SAMPLE_DB_DATA_ARR
    } else {
      const res = await axios.get(`${DEPLOY_URL}/api/mongodb`)
      return res?.data
    }
  } catch (e) {
    console.log('mongodb#getAllData: e: ', e)
  }
}


export const removeData = async (id: string) => {
  try {
    if (!id) {
      return
    }

    const res = await axios.delete(`${DEPLOY_URL}/api/mongodb?id=${id}`)
    return res
  } catch (e) {
    console.log('mongodb#removeData: e: ', e)
  }
}
