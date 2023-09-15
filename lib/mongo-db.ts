import axios from 'axios'
import { BACKEND_URL } from './constants'


export const saveData = async (data: any) => {
  try {
    if (!data) {
      return
    }

    const saveUrl = data._id ? `${BACKEND_URL}/update/${data._id}` : `${BACKEND_URL}/add`
    delete data._id
    const res = await axios.post(saveUrl, data)
    return res
  } catch (e) {
    console.log('mongo-db#saveData: e: ', e)
  }
}


export const getData = async (id: string) => {
  try {
    if (!id) {
      return
    }

    const getUrl = `${BACKEND_URL}/${id}`
    const res = await axios.get(getUrl)
    return res?.data
  } catch (e) {
    console.log('mongo-db#getData: e: ', e)
  }
}


export const getAllData = async () => {
  try {
    const getAllUrl = `${BACKEND_URL}/`
    const res = await axios.get(getAllUrl)
    return res?.data
  } catch (e) {
    console.log('mongo-db#getAllData: e: ', e)
  }
}


export const removeData = async (id: string) => {
  try {
    if (!id) {
      return
    }

    const removeUrl = `${BACKEND_URL}/remove/${id}`
    const res = await axios.post(removeUrl)
    return res
  } catch (e) {
    console.log('mongo-db#removeData: e: ', e)
  }
}
