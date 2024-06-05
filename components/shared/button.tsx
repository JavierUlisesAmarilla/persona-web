/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client'

import React, {MouseEventHandler, ReactNode, useEffect, useState} from 'react'
import {AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineLoading} from 'react-icons/ai'


export const Button = ({
  className,
  onClick,
  children,
  style,
  disabled,
}: {
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  children?: ReactNode
  style?: React.CSSProperties
  disabled?: boolean
}) => {
  const [isSaving, setIsSaving] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isFailed, setIsFailed] = useState(false)

  const handleClick: MouseEventHandler<HTMLDivElement> = async (event) => {
    try {
      if (!disabled && onClick && !isSaving) {
        setIsSaving(true)
        await onClick(event)
        setIsSaving(false)
        setIsCompleted(true)
      }
    } catch (e) {
      setIsFailed(true)
      console.log('Button#handleClick: e: ', e)
    }
  }

  const onReset = () => {
    setIsSaving(false)
    setIsCompleted(false)
    setIsFailed(false)
  }

  useEffect(() => {
    if ((isCompleted || isFailed) && !isSaving) {
      setTimeout(onReset, 3000)
    }
  }, [isCompleted, isFailed, isSaving])

  return (
    <div
      className={`px-3 py-1 text-xs rounded cursor-pointer hover:text-text-gray w-fit h-fit whitespace-nowrap flex items-center gap-1 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={handleClick}
      style={{display: 'flex', justifyContent: 'center', ...style}}
    >
      {isSaving && <AiOutlineLoading className='animate-spin'/>}
      {isCompleted && <AiOutlineCheckCircle className='text-sm'/>}
      {isFailed && <AiOutlineCloseCircle className='text-sm'/>}
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
  disabled,
}: {
  onClick?: MouseEventHandler<HTMLDivElement>
  children?: ReactNode
  disabled?: boolean
}) => {
  return (
    <Button
      className='bg-bg-btn-green text-text-light'
      onClick={onClick}
      disabled={disabled}
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
  disabled,
}: {
  onClick?: MouseEventHandler<HTMLDivElement>
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
}) => {
  return (
    <Button
      className={`bg-bg-btn-blue text-text-light ${className}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
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


export const BorderGrayButton = ({
  onClick,
  children,
}: {
  onClick?: MouseEventHandler<HTMLDivElement>
  children?: ReactNode
}) => {
  return (
    <Button
      className='bg-white border-2 border-bg-btn-gray text-bg-btn-gray'
      onClick={onClick}
    >
      {children}
    </Button>
  )
}


export const BorderLightGrayButton = ({
  onClick,
  children,
  className,
}: {
  onClick?: MouseEventHandler<HTMLDivElement>
  children?: ReactNode
  className?: string
}) => {
  return (
    <Button
      className={`bg-white border-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}


export const BackgroundLightGrayButton = ({
  onClick,
  children,
}: {
  onClick?: MouseEventHandler<HTMLDivElement>
  children?: ReactNode
}) => {
  return (
    <Button
      className='border-none bg-bg-light-gray'
      onClick={onClick}
    >
      {children}
    </Button>
  )
}


export const BorderBlackButton = ({
  onClick,
  children,
}: {
  onClick?: MouseEventHandler<HTMLDivElement>
  children?: ReactNode
}) => {
  return (
    <Button
      className='bg-white border-2 border-bg-btn-black text-bg-btn-black'
      onClick={onClick}
    >
      {children}
    </Button>
  )
}


export const BorderOrangeButton = ({
  onClick,
  children,
}: {
  onClick?: MouseEventHandler<HTMLDivElement>
  children?: ReactNode
}) => {
  return (
    <Button
      className='bg-white border-2 border-bg-btn-orange text-bg-btn-orange'
      onClick={onClick}
    >
      {children}
    </Button>
  )
}


export const DarkBlueButton = ({
  onClick,
  children,
}: {
  onClick?: MouseEventHandler<HTMLDivElement>
  children?: ReactNode
}) => {
  return (
    <Button
      className='text-white border bg-bg-dark-blue border-border-dark-blue'
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
