/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client'

import React, {MouseEventHandler, ReactNode} from 'react'


export const Button = ({
  className,
  onClick,
  children,
}: {
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  children: ReactNode
}) => {
  return (
    <div
      className={`px-3 py-1 text-xs rounded cursor-pointer text-text-light hover:text-text-gray w-fit ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}


export const RedButton = ({
  onClick,
  children,
}: {
  onClick?: MouseEventHandler<HTMLDivElement>
  children: ReactNode
}) => {
  return (
    <Button
      className='bg-bg-btn-red flex justify-center items-center'
      onClick={onClick}
    >
      {children}
    </Button>
  )
}


export const GreenButton = ({
  onClick,
  children,
}: {
  onClick?: MouseEventHandler<HTMLDivElement>
  children: ReactNode
}) => {
  return (
    <Button
      className='bg-bg-btn-green'
      onClick={onClick}
    >
      {children}
    </Button>
  )
}


export const BlueButton = ({
  onClick,
  children,
}: {
  onClick?: MouseEventHandler<HTMLDivElement>
  children: ReactNode
}) => {
  return (
    <Button
      className='bg-bg-btn-blue'
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export const LightBlueButton = ({
  onClick,
  children,
}: {
  onClick?: MouseEventHandler<HTMLDivElement>
  children: ReactNode
}) => {
  return (
    <Button
      className='bg-bg-btn-light-blue'
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export const BorderGreenButton = ({
  onClick,
  children,
}: {
  onClick?: MouseEventHandler<HTMLDivElement>
  children: ReactNode
}) => {
  return (
    <Button
      className='border-2 border-bg-btn-green bg-white text-bg-btn-green'
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
