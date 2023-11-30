/* eslint-disable max-len */
import {ReactNode, useRef} from 'react'

import {useOutsideAlerter} from '@/lib/hooks/use-outside-alerter'


export const CommonModal = ({
  className,
  show,
  onClose,
  children,
}: {
  className?: string
  show?: boolean
  onClose?: any
  children?: ReactNode
}) => {
  const divRef = useRef(null)
  useOutsideAlerter(divRef, onClose)

  return (
    <div className={`fixed z-50 flex items-center justify-center w-[calc(100vw+3px)] h-[calc(100vh+3px)] overflow-hidden -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-bg-dark bg-opacity-10 backdrop-blur-sm ${!show && 'hidden'}`}>
      <div ref={divRef} className={`relative overflow-auto rounded-lg border-border-gray bg-bg-gray max-w-[90%] max-h-[90%] ${className}`}>
        {/* Close */}
        {/* {onClose &&
          <AiFillCloseCircle
            className='absolute z-10 w-8 h-8 cursor-pointer right-4 top-4 hover:text-text-dark text-text-gray'
            onClick={onClose}
          />
        } */}
        <div className='relative'>
          {children}
        </div>
      </div>
    </div>
  )
}
