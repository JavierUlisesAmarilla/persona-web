'use client'

import React, {ChangeEventHandler} from 'react'


export const Textarea = ({
  className,
  value,
  rows = 5,
  placeholder,
  onChange,
}: {
  className?: string
  value?: string
  rows?: number
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
}) => {
  return (
    <textarea
      className={`text-xs border-gray-200 rounded ${className}`}
      value={value || ''}
      rows={rows}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}
