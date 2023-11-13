'use client'

import {BlueButton, RedButton} from '@/components/shared/button'

import {CommonModal} from '@/components/shared/common-modal'
import {Textarea} from '@/components/shared/textarea'
import React from 'react'


interface Props {
  personaName: string
  schemaText: string
  setSchemaText: Function
  onSchema: React.MouseEventHandler<HTMLDivElement>
  schemaState: string
  stateText: string
  setStateText: Function
  onState: React.MouseEventHandler<HTMLDivElement>
  stateState: string
  show: boolean
  onClose: React.MouseEventHandler<HTMLDivElement>
}


export const ChatModal = ({
  personaName = 'Fred',
  schemaText,
  setSchemaText,
  onSchema,
  schemaState,
  stateText,
  setStateText,
  onState,
  stateState,
  show,
  onClose,
}: Props) => {
  return (
    <CommonModal show={show}>
      <div className='w-[50rem] relative flex flex-col gap-3 p-6 overflow-auto border-2 rounded-lg border-border-gray shadow-2xl bg-bg-light items-end'>
        <div className='flex justify-between w-full'>
          <h2 className='text-2xl'>Chat with {personaName}</h2>
          <RedButton onClick={onClose}>End Chat</RedButton>
        </div>
        <div className='flex flex-col justify-center w-full gap-3'>
          <div className='flex flex-col w-full gap-3 p-6 border rounded-lg bg-bg-gray border-border-gray'>
            <div className='text-sm'>Actions</div>
            <Textarea
              value={schemaText}
              placeholder='Persona-driven actions will appear here.'
              className={'text-gray-500 h-60'}
              onChange={(e) => {
                // setSchemaText(e.target.value)
              }}
            />
          </div>
          <div className='flex flex-col w-full gap-3 p-6 border rounded-lg bg-bg-gray border-border-gray'>
            <div className='text-sm'>Current state</div>
            <Textarea
              className='h-60'
              value={stateText}
              placeholder=''
              onChange={(e) => setStateText(e.target.value)}
            />
            <div className='flex items-center gap-3'>
              <BlueButton onClick={onState}>Update state</BlueButton>
              <div>{stateState}</div>
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  )
}
