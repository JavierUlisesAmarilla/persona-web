'use client'

import {ChangeEventHandler, ReactNode} from 'react'


export const UserSelect = ({
  className,
  value,
  onChange,
  children,
}: {
  className?: string
  value?: any
  onChange?: ChangeEventHandler<HTMLSelectElement>
  children: ReactNode
}) => {
  return (
    <select
      className={`py-1 pl-3 pr-6 rounded cursor-pointer h-fit ${className}`}
      style={{width: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  )
}
