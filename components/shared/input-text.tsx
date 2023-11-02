'use client'

import React, {ChangeEventHandler} from 'react'


export const InputText = ({
  className,
  defaultValue,
  value,
  placeholder,
  onChange,
  disabled,
}: {
  className?: string
  defaultValue?: string
  value?: string
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
}) => {
  return (
    <input
      // className={`${className} px-3 py-1 rounded`}
      className='px-3 py-1 border-gray-200 rounded'
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
    />
  )
}
