/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsdoc/require-returns */
'use client'

import {ADMIN_EMAIL} from '@/lib/constants'
import {removeData, saveData} from '@/lib/mongodb/mongodb-client'
import {useZustand} from '@/lib/store/use-zustand'
import React, {useState} from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai'


/**
 *
 */
export default function TeamKey({apiKeyIndex, data}: any) {
  const {apiKeyArr, setApiKeyArr, curEmail} = useZustand()
  const [status, setStatus] = useState('')
  const isAdmin = curEmail === ADMIN_EMAIL
  const isManager = isAdmin || curEmail === apiKeyArr.find((apiKeyObj) => apiKeyObj.emailArr.find((emailObj: any) => emailObj.name === curEmail))?.manager

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

  const onManagerChange = (event: any) => {
    const newApiKeyArr = [...apiKeyArr]
    newApiKeyArr[apiKeyIndex].manager = event.target.value
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
    const emailArr = newApiKeyArr[apiKeyIndex].emailArr.filter((emailObj: any, index: number) => index !== emailIndex)
    newApiKeyArr[apiKeyIndex].emailArr = emailArr

    if (newApiKeyArr[apiKeyIndex].manager && !emailArr.find((emailObj: any) => emailObj.name === newApiKeyArr[apiKeyIndex].manager)) {
      newApiKeyArr[apiKeyIndex].manager = ''
    }

    setApiKeyArr(newApiKeyArr)
  }

  return (
    <div className="flex flex-col w-full gap-2 p-2 border border-gray-500">
      {isManager &&
        <div className="flex items-center w-full gap-4">
          <div
            className='px-3 py-1 text-white rounded cursor-pointer bg-bg-btn hover:text-black'
            onClick={onAddEmail}
          >
            Add Email
          </div>
          <div
            className='px-3 py-1 text-white rounded cursor-pointer bg-bg-btn hover:text-black'
            onClick={onSave}
          >
            Save
          </div>
          <div
            className='px-3 py-1 text-white rounded cursor-pointer bg-bg-btn hover:text-black'
            onClick={onRemove}
          >
            Remove
          </div>
          <div className='text-blue-500'>{status}</div>
        </div>
      }
      <div className="flex items-center w-full gap-4">
        <div className='whitespace-nowrap'>Team Name:</div>
        <input
          className="px-3 py-1 rounded"
          type="text"
          value={data?.name}
          placeholder="Team Name"
          onChange={onNameChange}
          disabled={!isAdmin && !isManager}
        />
        <div className='whitespace-nowrap'>API Key:</div>
        <input
          className="px-3 py-1 rounded"
          type="text"
          value={data?.apiKey}
          placeholder="API Key"
          onChange={onApiKeyChange}
          disabled={!isAdmin && !isManager}
        />
        {isAdmin &&
          <>
            <div className='whitespace-nowrap'>Manager:</div>
            <select
              className='w-full px-3 py-1 rounded cursor-pointer'
              value={data?.manager}
              onChange={onManagerChange}
            >
              <option value=''/>
              {Array.isArray(data?.emailArr) && data.emailArr.map((emailObj: any, index: number) =>
                emailObj.name && <option key={index} value={emailObj.name}>{emailObj.name}</option>,
              )}
            </select>
          </>
        }
      </div>
      {!!(Array.isArray(data?.emailArr) && data.emailArr.length) &&
        <div className="flex flex-wrap items-center w-full gap-2">
          {data?.emailArr?.map((emailObj: any, index: number) =>
            <div
              key={index}
              className="flex items-center gap-1 p-1 border border-gray-500 rounded"
            >
              <input
                className="text-xs border-none outline-none rounded px-2 py-0.5"
                type="text"
                value={emailObj.name}
                placeholder="Email"
                onChange={(event) => onEmailChange(index, event.target.value)}
                disabled={!isAdmin && (!isManager || curEmail === emailObj.name)}
              />
              {(isAdmin || (isManager && curEmail !== emailObj.name)) &&
                <AiOutlineCloseCircle
                  className="text-xl text-gray-500 cursor-pointer hover:text-black"
                  onClick={() => onEmailRemove(index)}
                />
              }
            </div>,
          )}
        </div>
      }
    </div>
  )
}
