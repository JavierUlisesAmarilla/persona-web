'use client'

import React, {ChangeEventHandler, ReactNode} from 'react'


export const UserSelect = ({
  className,
  defaultValue,
  value,
  placeholder,
  onChange,
  disabled,
  children,
}: {
  className?: string
  defaultValue?: string
  value?: string
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
  disabled?: boolean
  children: ReactNode
}) => {
  return (
    <select
      className='px-3 py-1 border-gray-200 rounded cursor-pointer'
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  )
}
