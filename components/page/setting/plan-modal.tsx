/* eslint-disable @next/next/no-img-element */
'use client'

import {MouseEventHandler} from 'react'
import {GreenButton} from '../../shared/button'
import {CommonModal} from '../../shared/common-modal'


interface Props {
  show?: boolean
  onClose?: MouseEventHandler<SVGElement>
}


const planArr = [
  {
    name: 'Persona - Base',
    price: 99,
    descArr: [
      '2000 messages / ~5.5 hours per month of conversation',
      '1 fully-customized Persona',
      'Basic support',
    ],
  },
  {
    name: 'Persona - Base',
    price: 99,
    descArr: [
      '2000 messages / ~5.5 hours per month of conversation',
      '1 fully-customized Persona',
      'Basic support',
    ],
  },
]


export const PlanModal = ({
  show,
  onClose,
}: Props) => {
  return (
    <CommonModal
      show={show}
      onClose={onClose}
    >
      <div className='flex flex-col items-center justify-center gap-3 p-6 border rounded-lg bg-bg-gray border-border-gray'>
        {planArr.map((plan, planIndex) =>
          <div
            key={planIndex}
            className='flex flex-col gap-1 p-6 border rounded-lg bg-bg-light border-border-gray'
          >
            <div className='flex items-center justify-between gap-3'>
              <div className='flex items-center'>
                <img className='w-8' src='persona-logo-rounded.png' alt=''/>
                <div>{plan.name}</div>
              </div>
              <div className='text-sm'>{`${plan.price} / mo`}</div>
            </div>
            {plan.descArr.map((desc, descIndex) =>
              <div
                key={descIndex}
                className='text-xs'
              >
                {`- ${desc}`}
              </div>,
            )}
            <div className='flex justify-end w-full'>
              <GreenButton>Buy</GreenButton>
            </div>
          </div>,
        )}
      </div>
    </CommonModal>
  )
}
