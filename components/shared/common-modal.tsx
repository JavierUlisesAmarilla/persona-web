import React, {ReactNode, useRef} from 'react'

import {useOutsideAlerter} from '@/lib/hooks/use-outside-alerter'
import {AiFillCloseCircle} from 'react-icons/ai'


export const CommonModal = ({
  className,
  show,
  onClose,
  children,
}: {
  className?: string
  show?: boolean
  onClose?: React.MouseEventHandler<SVGElement>
  children?: ReactNode
}) => {
  const divRef = useRef(null)
  useOutsideAlerter(divRef, onClose)

  return (
    <div className={`fixed z-50 flex items-center justify-center w-screen h-screen overflow-hidden -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${!show && 'hidden'}`}>
      <div ref={divRef} className={`relative overflow-auto border-2 rounded-lg shadow border-border-gray bg-bg-gray w-[80rem] max-w-[90%] h-[50rem] max-h-[90%] ${className}`}>
        {/* Close */}
        {onClose &&
          <AiFillCloseCircle
            className='absolute z-10 w-8 h-8 cursor-pointer right-4 top-4 hover:text-text-dark text-text-gray'
            onClick={onClose}
          />
        }
        <div className='relative w-full h-full overflow-auto'>
          {children}
        </div>
      </div>
    </div>
  )
}
