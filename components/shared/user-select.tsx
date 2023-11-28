'use client'

import {ChangeEventHandler, ReactNode} from 'react'


export const UserSelect = ({
  value,
  onChange,
  children,
}: {
  value?: any
  onChange?: ChangeEventHandler<HTMLSelectElement>
  children: ReactNode
}) => {
  return (
    <select
      className='py-1 pl-3 pr-6 text-xs border-gray-200 rounded cursor-pointer h-fit'
      style={{width: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  )
}
