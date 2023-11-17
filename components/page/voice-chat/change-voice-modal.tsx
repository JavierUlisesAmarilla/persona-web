/* eslint-disable react/no-unescaped-entities */
'use client'
import {BlueButton} from '@/components/shared/button'
import {CommonModal} from '@/components/shared/common-modal'
import {InputText} from '@/components/shared/input-text'
import React from 'react'
import {AiFillCustomerService, AiFillDelete, AiFillSound, AiOutlineEdit, AiOutlineShareAlt} from 'react-icons/ai'
import {useZustand} from '../../../lib/store/use-zustand'
import {UserSelect} from '../../shared/user-select'


interface Props {
  show?: boolean
  onClose?: React.MouseEventHandler<SVGElement>
}


export const ChangeVoiceModal = ({
  show,
  onClose,
}: Props) => {
  const {personaArr, selPersonaIndex} = useZustand()
  const selPersonaName = personaArr[selPersonaIndex]?.name

  return (
    <CommonModal
      show={show}
      onClose={onClose}
    >
      <div className='flex flex-col justify-center gap-3 p-6 text-xs border rounded-lg bg-bg-gray border-border-gray'>
        <div className='text-base text-center text-red-500'>{`Change voice for ${selPersonaName}`}</div>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-1'>
            <div className='text-red-500'>Gender:</div>
            <UserSelect>
              <option value='male'>male</option>
              <option value='female'>female</option>
            </UserSelect>
          </div>
          <div className='flex items-center gap-1'>
            <div className='text-red-500'>Age:</div>
            <UserSelect>
              <option value='0'>{'<20'}</option>
              <option value='1'>{'<30'}</option>
              <option value='2'>{'<40'}</option>
            </UserSelect>
          </div>
          <div className='flex items-center gap-1'>
            <div className='text-red-500'>Accent:</div>
            <UserSelect>
              <option value='0'>{'<20'}</option>
              <option value='1'>{'<30'}</option>
              <option value='2'>{'<40'}</option>
            </UserSelect>
          </div>
        </div>
        <div className='flex flex-col gap-3 p-6 border rounded-lg bg-bg-light border-border-gray'>
          <div className='flex items-center justify-between gap-3'>
            <div className='flex items-center gap-3 cursor-pointer'>
              <div>Male, Middle Age, British</div>
              <AiFillSound className='text-sm'/>
            </div>
            <BlueButton>Use Voice</BlueButton>
          </div>
          <div className='flex items-center justify-between gap-3'>
            <div className='flex items-center gap-3 cursor-pointer'>
              <div>Male, Middle Age, British</div>
              <AiFillSound className='text-sm'/>
            </div>
            <BlueButton>Use Voice</BlueButton>
          </div>
          <div className='flex items-center justify-between gap-3'>
            <div className='flex items-center gap-3 cursor-pointer'>
              <div>Male, Middle Age, British</div>
              <AiFillSound className='text-sm'/>
            </div>
            <BlueButton>Use Voice</BlueButton>
          </div>
        </div>
        <div className='flex flex-col gap-3 p-6 border rounded-lg bg-bg-light border-border-gray'>
          <div className='text-sm text-center text-red-500'>Import from ElevenLabs</div>
          <div className='flex flex-col gap-3'>
            <div>1. In the ElevenLabs, VoiceLab connects (link), press the "Submit" button.</div>
            <div className='flex justify-center'>
              <div className='flex flex-col border rounded w-80 bg-bg-gray border-border-gray'>
                <div className='flex flex-col gap-3 p-6'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='text-sm'>Badly</div>
                      <AiFillCustomerService className='text-sm'/>
                    </div>
                    <AiOutlineShareAlt className='text-base'/>
                  </div>
                  <div className='font-bold'>Can't read</div>
                  <div>Can't read</div>
                </div>
                <div className='flex items-center w-full border-t border-border-gray'>
                  <div className='flex items-center justify-center w-full gap-1 p-3 border-r cursor-pointer border-border-gray'>
                    <AiFillSound/>
                    <div>Volume</div>
                  </div>
                  <div className='flex items-center justify-center w-full gap-1 p-3 border-r cursor-pointer border-border-gray'>
                    <AiOutlineEdit/>
                    <div>Edit</div>
                  </div>
                  <div className='flex items-center justify-center w-full gap-1 p-3 cursor-pointer'>
                    <AiFillDelete/>
                    <div>Remove</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <div>2. Paste the share link here.</div>
            <div className='flex items-center justify-center gap-3'>
              <InputText
                classNames=''
                placeholder="Share Link"
              />
              <BlueButton>Submit</BlueButton>
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  )
}
