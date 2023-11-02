/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client'

import React, {MouseEventHandler, ReactNode} from 'react'


export const Button = ({
  onClick,
  children,
}: {
  onClick?: MouseEventHandler<HTMLDivElement>
  children: ReactNode
}) => {
  return (
    <div
      className='px-3 py-1 text-xs rounded cursor-pointer text-text-btn bg-bg-btn hover:text-black w-fit'
      onClick={onClick}
    >
      {children}
    </div>
  )
}
