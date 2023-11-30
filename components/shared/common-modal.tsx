import {AnimatePresence, motion} from 'framer-motion'
import React, {ReactNode} from 'react'

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
  return (
    <AnimatePresence>
      {show &&
        <motion.div
          className='fixed z-50 flex items-center justify-center w-screen h-screen overflow-hidden -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
          initial={{
            opacity: 1,
            width: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            width: '100%',
            height: '100%',
          }}
          exit={{
            opacity: 0,
            width: 0,
            height: 0,
          }}
        >
          <div className={`relative overflow-auto border-2 rounded-lg shadow border-border-gray bg-bg-gray w-[80rem] max-w-[90%] h-[50rem] max-h-[90%] ${className}`}>
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
        </motion.div>
      }
    </AnimatePresence>
  )
}
