'use client'

import React from 'react'


export const Transcript = ({data}: {data: any}) => {
  return (
    <div className='w-1/2 p-3 lg:w-1/4'>
      <div className="flex flex-col gap-3 p-6 text-xs border rounded-lg bg-bg-gray">
        <div className='flex items-center gap-3'>
          <div>Persona Name: </div>
          <div className='px-2 py-1 border bg-bg-light border-border-gray'>{data?.personaName}</div>
        </div>
        <div className='flex items-center gap-3'>
          <div>User ID: </div>
          <div className='px-2 py-1 border bg-bg-light border-border-gray'>{data?.userId}</div>
        </div>
        <div className='flex items-center gap-3'>
          <div>Date: </div>
          <div className='px-2 py-1 border bg-bg-light border-border-gray'>{data?.createdAt}</div>
        </div>
        {data?.messages?.length &&
          <div className='flex flex-col gap-3'>
            <div>Messages: </div>
            <div className='flex flex-col p-3 overflow-auto border rounded-lg bg-bg-light border-border-gray h-60'>
              {data.messages.map((message: any, index: number) => message.role === 'assistant' ?
                <div
                  key={index}
                  className='flex flex-col items-start'
                >
                  <div className='px-2 py-1 border rounded bg-bg-gray w-fit border-border-gray'>{message.role}</div>
                  <div className='w-3/4'>{message.content}</div>
                </div> :
                <div
                  key={index}
                  className='flex flex-col items-end'
                >
                  <div className='px-2 py-1 border rounded bg-bg-gray w-fit border-border-gray'>{message.role}</div>
                  <div className='w-3/4'>{message.content}</div>
                </div>,
              )}
            </div>
          </div>
        }
      </div>
    </div>
  )
}
