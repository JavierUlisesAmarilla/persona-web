/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client'

import React, {MouseEventHandler, ReactNode} from 'react'


export const Button = ({
  className,
  onClick,
  children,
  style,
}: {
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  children?: ReactNode
  style?: React.CSSProperties
}) => {
  return (
    <div
      className={`px-3 py-1 text-xs rounded cursor-pointer hover:text-text-gray w-fit whitespace-nowrap ${className}`}
      onClick={onClick}
      style={{display: 'flex', justifyContent: 'center', ...style}}
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
      className='flex items-center justify-center bg-bg-btn-red text-text-light'
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
  children?: ReactNode
}) => {
  return (
    <Button
      className='bg-bg-btn-green text-text-light'
      onClick={onClick}
    >
      {children}
    </Button>
  )
}


export const BlueButton = ({
  onClick,
  children,
  className,
  style,
}: {
  onClick?: MouseEventHandler<HTMLDivElement>
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}) => {
  console.log('the classname is', className)
  return (
    <Button
      className={`bg-bg-btn-blue text-text-light ${className}`}
      onClick={onClick}
      style={style}
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
  children?: ReactNode
}) => {
  return (
    <Button
      className='bg-bg-btn-light-blue text-text-light'
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
  children?: ReactNode
}) => {
  return (
    <Button
      className='bg-white border-2 border-bg-btn-green text-bg-btn-green'
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
