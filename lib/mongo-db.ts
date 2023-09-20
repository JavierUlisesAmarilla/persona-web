import axios from 'axios'
import {MONGODB_API_URL} from './constants'


export const saveData = async (data: any) => {
  try {
    console.log('mongo-db#saveData: data: ', data)

    if (!data) {
      return
    }

    const res = await axios.post(MONGODB_API_URL, data)
    return res
  } catch (e) {
    console.log('mongo-db#saveData: e: ', e)
  }
}


export const getData = async (id: string) => {
  try {
    console.log('mongo-db#getData: id: ', id)

    if (!id) {
      return
    }

    const getUrl = `${MONGODB_API_URL}?id=${id}`
    const res = await axios.get(getUrl)
    return res?.data
  } catch (e) {
    console.log('mongo-db#getData: e: ', e)
  }
}


export const getAllData = async () => {
  try {
    const res = await axios.get(MONGODB_API_URL)
    return res?.data
  } catch (e) {
    console.log('mongo-db#getAllData: e: ', e)
  }
}


export const removeData = async (id: string) => {
  try {
    console.log('mongo-db#removeData: id: ', id)

    if (!id) {
      return
    }

    const removeUrl = `${MONGODB_API_URL}?id=${id}`
    const res = await axios.delete(removeUrl)
    return res
  } catch (e) {
    console.log('mongo-db#removeData: e: ', e)
  }
}
