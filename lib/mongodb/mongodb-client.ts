import axios from 'axios'
import {DEPLOY_URL} from '../constants'


export const saveData = async (data: any) => {
  try {
    console.log('mongodb#saveData: data: ', data)

    if (!data) {
      return
    }

    // const res = await axios.post(`${DEPLOY_URL}/api/mongodb/save`, data)
    const res = await axios.post(`${DEPLOY_URL}/api/mongodb`, data)
    console.log('mongodb#saveData: res: ', res)
    return res
  } catch (e) {
    console.log('mongodb#saveData: e: ', e)
  }
}


export const getData = async (id: string) => {
  try {
    console.log('mongodb#getData: id: ', id)

    if (!id) {
      return
    }

    // const res = await axios.get(`${DEPLOY_URL}/api/mongodb/get?id=${id}`)
    const res = await axios.get(`${DEPLOY_URL}/api/mongodb?id=${id}`)
    console.log('mongodb#getData: res: ', res)
    return res?.data
  } catch (e) {
    console.log('mongodb#getData: e: ', e)
  }
}


export const getAllData = async () => {
  try {
    // const res = await axios.get(`${DEPLOY_URL}/api/mongodb/get`)
    const res = await axios.get(`${DEPLOY_URL}/api/mongodb`)
    console.log('mongodb#getAllData: res: ', res)
    return res?.data
  } catch (e) {
    console.log('mongodb#getAllData: e: ', e)
  }
}


export const removeData = async (id: string) => {
  try {
    console.log('mongodb#removeData: id: ', id)

    if (!id) {
      return
    }

    // const res = await axios.delete(`${DEPLOY_URL}/api/mongodb/remove?id=${id}`)
    const res = await axios.delete(`${DEPLOY_URL}/api/mongodb?id=${id}`)
    console.log('mongodb#removeData: res: ', res)
    return res
  } catch (e) {
    console.log('mongodb#removeData: e: ', e)
  }
}
