import {DEPLOY_URL} from '../constants'

import axios from 'axios'


export const saveData = async (data: any, email: string) => {
  try {
    if (!data) {
      return
    }

    const res = await axios.post(`${DEPLOY_URL}/api/mongodb?email=${email}`, data)
    return res
  } catch (e) {
    console.log('mongodb#saveData: e: ', e)
  }
}


export const getData = async (email: string) => {
  try {
    if (!email) {
      return
    }

    const res = await axios.get(`${DEPLOY_URL}/api/mongodb?email=${email}`)
    return res?.data
  } catch (e) {
    console.log('mongodb#getData: e: ', e)
  }
}

export const removeData = async (id: string, email: string) => {
  try {
    if (!id) {
      return
    }

    const res = await axios.delete(`${DEPLOY_URL}/api/mongodb?id=${id}&email=${email}`)
    return res
  } catch (e) {
    console.log('mongodb#removeData: e: ', e)
  }
}
