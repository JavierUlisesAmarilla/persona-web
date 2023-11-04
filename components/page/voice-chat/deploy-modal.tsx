'use client'

import {AnimatePresence, motion} from 'framer-motion'

import {Button} from '@/components/shared/button'
import React from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'


interface Props {
  show: boolean
  onClose: React.MouseEventHandler<SVGElement>
}


export const DeployModal = ({
  show,
  onClose,
}: Props) => {
  return (
    <AnimatePresence>
      {show &&
        <motion.div
          className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen'
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
        >
          <div className='relative flex items-center justify-end gap-3 p-6 overflow-auto border-2 rounded-lg border-border-green bg-bg-light'>
            {/* Close */}
            <AiFillCloseCircle
              className='absolute w-8 h-8 cursor-pointer right-4 top-4 hover:text-text-dark text-text-gray'
              onClick={onClose}
            />
            <div className='flex flex-col items-center justify-center w-full gap-3 p-6'>
              <div className='text-sm'>Deploy to:</div>
              <Button>Phone (Twilio)</Button>
              <Button>Browser (JS)</Button>
              <Button>Unity</Button>
              <Button>Other</Button>
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>
  )
}
