/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsdoc/require-returns */
'use client'

import React, {useState} from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {removeData, saveData} from '@/lib/mongodb/mongodb-client'
import {useZustand} from '@/lib/store/use-zustand'


/**
 *
 */
export default function TeamKey({apiKeyIndex, data}: any) {
  const {apiKeyArr, setApiKeyArr} = useZustand()
  const [status, setStatus] = useState('')

  const onNameChange = (event: any) => {
    const newApiKeyArr = [...apiKeyArr]
    newApiKeyArr[apiKeyIndex].name = event.target.value
    setApiKeyArr(newApiKeyArr)
  }

  const onApiKeyChange = (event: any) => {
    const newApiKeyArr = [...apiKeyArr]
    newApiKeyArr[apiKeyIndex].apiKey = event.target.value
    setApiKeyArr(newApiKeyArr)
  }

  const onAddEmail = () => {
    const newApiKeyArr = [...apiKeyArr]
    newApiKeyArr[apiKeyIndex].emailArr.push({name: ''})
    setApiKeyArr(newApiKeyArr)
  }

  const onSave = async () => {
    setStatus('Saving...')
    const res = await saveData(data)

    if (res?.data?.insertedId) {
      const newApiKeyArr = [...apiKeyArr]
      newApiKeyArr[apiKeyIndex]._id = res.data.insertedId
      setApiKeyArr(newApiKeyArr)
    }

    setStatus('Success')
  }

  const onRemove = async () => {
    if (apiKeyArr[apiKeyIndex]?._id) {
      setStatus('Removing...')
      await removeData(apiKeyArr[apiKeyIndex]._id)
      setStatus('Success')
    }

    setApiKeyArr(apiKeyArr.filter((apiKeyObj, index) => index !== apiKeyIndex))
  }

  const onEmailChange = (emailIndex: number, email: string) => {
    const newApiKeyArr = [...apiKeyArr]
    newApiKeyArr[apiKeyIndex].emailArr[emailIndex].name = email
    setApiKeyArr(newApiKeyArr)
  }

  const onEmailRemove = (emailIndex: number) => {
    const newApiKeyArr = [...apiKeyArr]
    newApiKeyArr[apiKeyIndex].emailArr = newApiKeyArr[apiKeyIndex].emailArr.filter((emailObj: any, index: number) => index !== emailIndex)
    setApiKeyArr(newApiKeyArr)
  }

  return (
    <div className="flex flex-col w-full gap-2 p-2 border border-gray-500">
      <div className="flex items-center w-full gap-4">
        <input
          className="rounded-full"
          type="text"
          value={data?.name}
          placeholder="Team Name"
          onChange={onNameChange}
        />
        <input
          className="rounded-full"
          type="text"
          value={data?.apiKey}
          placeholder="API Key"
          onChange={onApiKeyChange}
        />
        <div
          className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
          onClick={onAddEmail}
        >
          Add Email
        </div>
        <div
          className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
          onClick={onSave}
        >
          Save
        </div>
        <div
          className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
          onClick={onRemove}
        >
          Remove
        </div>
        <div className='text-blue-500'>{status}</div>
      </div>
      {!!data?.emailArr?.length &&
        <div className="flex flex-wrap items-center w-full gap-2">
          {data?.emailArr?.map((emailObj: any, index: number) =>
            <div
              key={index}
              className="flex items-center gap-1 p-1 border border-gray-500 rounded-full"
            >
              <input
                className="text-xs border-none outline-none rounded-2xl"
                type="text"
                value={emailObj.name}
                placeholder="Email"
                onChange={(event) => onEmailChange(index, event.target.value)}
              />
              <AiOutlineCloseCircle
                className="text-xl cursor-pointer hover:text-gray-500"
                onClick={() => onEmailRemove(index)}
              />
            </div>,
          )}
        </div>
      }
    </div>
  )
}
