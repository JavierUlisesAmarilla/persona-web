'use client'

import {ChangeEventHandler} from 'react'


export const InputText = ({
  defaultValue,
  value,
  placeholder,
  onChange,
  disabled,
  classNames = '',
  style = {},
}: {
  defaultValue?: string
  value?: string
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
  classNames?: string
  style?: any
}) => {
  return (
    <input
      className={`px-3 py-1 border-gray-200 rounded ${classNames}`}
      type="text"
      defaultValue={defaultValue}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      style={style}
    />
  )
}
