'use client'

import {BlueButton, RedButton} from '@/components/shared/button'
import {CommonModal} from '@/components/shared/common-modal'
import {Textarea} from '@/components/shared/textarea'
import React, {useEffect, useRef} from 'react'


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
  messages: any[]
}

export const ChatModal = ({
  personaName = 'Concierge',
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
  messages = [],
}: Props) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Adjust the combinedHeight based on the actual heights and margins/paddings of your "Actions" and "Current State" boxes
  return (
    <CommonModal show={show} onClose={onClose}>
      <div className='flex flex-col w-[60rem] max-w-full'>
        <div className='flex justify-between items-center p-6'>
          <h2 className='text-2xl'>Speak with {personaName}</h2>
          <RedButton onClick={onClose}>End Chat</RedButton>
        </div>
        <div className='flex gap-4 p-6'>
          <div className='flex flex-col w-1/3 gap-4'>
            <div className='flex flex-col w-full gap-4 p-6 border rounded-lg bg-bg-gray border-border-gray'>
              <div className='text-sm'>Actions</div>
              <Textarea
                value={schemaText}
                placeholder='Persona-driven actions will appear here.'
                className='text-gray-500 h-60 resize-none'
                onChange={(e) => setSchemaText(e.target.value)}
              />
            </div>
            <div className='flex flex-col w-full gap-4 p-6 border rounded-lg bg-bg-gray border-border-gray'>
              <div className='text-sm'>Current state</div>
              <Textarea
                className='h-60 resize-none'
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
          <div className='flex flex-col w-2/3 gap-4 p-3 overflow-auto border rounded-lg bg-bg-light border-border-gray h-120 max-h-[44.25rem]' style={{overflowY: 'auto'}}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.persona_message ? 'flex-col items-start' : 'flex-col items-end'}`}
              >
                <div
                  className={`w-auto px-3 py-2 border text-sm ${message.persona_message ? 'rounded-bl-none bg-bg-gray' : 'rounded-br-none bg-bg-blue'} max-w-3/4 border-border-gray rounded-xl`}
                >
                  {message.persona_message || message.user_message}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}/>
          </div>
        </div>
      </div>
    </CommonModal>
  )
}
