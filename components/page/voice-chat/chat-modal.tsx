'use client'

import {BlueButton, RedButton} from '@/components/shared/button'
import {AnimatePresence, motion} from 'framer-motion'

import {Textarea} from '@/components/shared/textarea'
import React from 'react'


interface Props {
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
    <AnimatePresence>
      {show &&
        <motion.div
          className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen'
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
        >
          <div className='w-[50rem] relative flex flex-col gap-3 p-6 overflow-auto border-2 rounded-lg border-border-gray shadow-2xl bg-bg-light items-end'>
            <RedButton onClick={onClose}>End Chat</RedButton>
            <div className='flex flex-col justify-center w-full gap-3'>
              <div className='flex flex-col w-full gap-3 p-6 border rounded-lg bg-bg-gray border-border-gray'>
                <div className='text-sm'>Actions</div>
                <Textarea
                  value={schemaText}
                  placeholder='Enter the actions schema here'
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
        </motion.div>
      }
    </AnimatePresence>
  )
}
