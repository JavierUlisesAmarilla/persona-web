'use client'

import React, {ChangeEventHandler} from 'react'


export const Textarea = ({
  value,
  rows = 5,
  placeholder,
  onChange,
}: {
  value?: string
  rows?: number
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
}) => {
  return (
    <textarea
      className='h-[550px] text-xs border-gray-200 rounded'
      value={value || ''}
      rows={rows}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}
