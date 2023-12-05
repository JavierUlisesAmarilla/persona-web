'use client'

import {removeData, saveData} from '@/lib/mongodb/mongodb-client'

import {BlueButton} from '@/components/shared/button'
import {InputText} from '@/components/shared/input-text'
import {UserSelect} from '@/components/shared/user-select'
import {ADMIN_EMAIL} from '@/lib/constants'
import {useZustand} from '@/lib/store/use-zustand'
import {useState} from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai'


export const TeamSection = ({apiKeyIndex, data}: any) => {
  const {apiKeyArr, setApiKeyArr, curEmail} = useZustand()
  const [localStatus, setLocalStatus] = useState('')
  const isAdmin = curEmail === ADMIN_EMAIL
  const isManager = isAdmin || curEmail === apiKeyArr.find((apiKeyObj) => apiKeyObj.emailArr.find((emailObj: any) => emailObj.name === curEmail))?.manager

  const onNameChange = (event: any) => {
    const newApiKeyArr = [...apiKeyArr]
    newApiKeyArr[apiKeyIndex].name = event.target.value
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
    setLocalStatus('Saving...')
    const res = await saveData(data, curEmail)

    if (res?.data?.insertedId) {
      const newApiKeyArr = [...apiKeyArr]
      newApiKeyArr[apiKeyIndex]._id = res.data.insertedId
      setApiKeyArr(newApiKeyArr)
    }

    setLocalStatus('Success')
  }

  const onRemove = async () => {
    if (apiKeyArr[apiKeyIndex]?._id) {
      setLocalStatus('Removing...')
      await removeData(apiKeyArr[apiKeyIndex]._id, curEmail)
      setLocalStatus('Success')
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
    <div className="flex flex-col w-full gap-3 p-6 border border-gray-200 rounded-lg bg-bg-light">
      {isManager &&
        <div className="flex items-center justify-end w-full gap-4">
          <div className='text-blue-500'>{localStatus}</div>
          <BlueButton onClick={onAddEmail}>Add Email</BlueButton>
          <BlueButton onClick={onSave}>Save</BlueButton>
          <BlueButton onClick={onRemove}>Remove</BlueButton>
        </div>
      }
      <div className="flex items-center justify-between w-full gap-4">
        <div className='font-medium whitespace-nowrap'>Team Name:</div>
        <InputText
          value={data?.name}
          placeholder="Team Name"
          onChange={onNameChange}
          disabled={!isAdmin && !isManager}
        />

        {isAdmin &&
          <>
            <div className='font-medium whitespace-nowrap'>Manager:</div>
            <UserSelect
              value={data?.manager}
              onChange={onManagerChange}
            >
              <option value=''/>
              {Array.isArray(data?.emailArr) && data.emailArr.map((emailObj: any, index: number) =>
                emailObj.name && <option key={index} value={emailObj.name}>{emailObj.name}</option>,
              )}
            </UserSelect>
          </>
        }
      </div>
      <div className="flex items-center justify-between w-full gap-4">
        <div className='font-medium whitespace-nowrap'>Team Members:</div>
        {!!(Array.isArray(data?.emailArr) && data.emailArr.length) &&
          <div className="flex flex-wrap items-center justify-end w-full gap-2">
            {data.emailArr.reverse().map((emailObj: any, index: number) =>
              <div
                key={index}
                className="flex items-center gap-1 p-1 border border-gray-200 rounded-md"
              >
                <InputText
                  value={emailObj.name}
                  placeholder="Email"
                  onChange={(event) => onEmailChange(index, event.target.value)}
                  disabled={!isAdmin && (!isManager || curEmail === emailObj.name)}
                />
                {(isAdmin || (isManager && curEmail !== emailObj.name)) &&
                  <AiOutlineCloseCircle
                    className="text-xl cursor-pointer text-text-gray hover:text-text-dark"
                    onClick={() => onEmailRemove(index)}
                  />
                }
              </div>,
            )}
          </div>
        }
      </div>
    </div>
  )
}
