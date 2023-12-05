'use client'

import {ChangeEventHandler} from 'react'


export const InputText = ({
  defaultValue,
  value,
  placeholder,
  onChange,
  disabled,
  classNames = '',
}: {
  defaultValue?: string
  value?: string
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
  classNames?: string
}) => {
  return (
    <input
      className={`px-3 py-1 text-xs border-gray-200 rounded ${classNames}`}
      type="text"
      defaultValue={defaultValue}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
    />
  )
}
