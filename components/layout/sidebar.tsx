'use client'

import {AiOutlineHome, AiOutlineSetting} from 'react-icons/ai'

import {NOTION_ROOT_PAGE} from '@/lib/constants'
import {useZustand} from '@/lib/store/use-zustand'
import Image from 'next/image'
import {Setting} from '../page/setting/setting'
import {Transcripts} from '../page/transcripts/transcripts'
import {VoiceChat} from '../page/voice-chat/voice-chat'
import Document from '../shared/icons/document'
import SpeechBubble from '../shared/icons/speech-bubble'


export const MENUS: any = {
  playground: {
    include: 'general',
    menuIcon: (<AiOutlineHome className='text-2xl'/>),
    menuSelIcon: (<AiOutlineHome className='text-2xl'/>),
    menuName: 'Playground',
    menuComp: (<VoiceChat/>),
  },
  transcripts: {
    include: 'general',
    menuIcon: (<SpeechBubble fill='rgb(152 162 179)'/>),
    menuSelIcon: (<SpeechBubble fill='rgb(0 0 0)'/>),
    menuName: 'Transcripts',
    menuComp: (<Transcripts/>),
  },
  apiDocs: {
    include: 'general',
    menuIcon: (<Document fill='rgb(152 162 179)'/>),
    menuSelIcon: (<Document fill='rgb(0 0 0)'/>),
    menuName: 'API Docs',
    menuComp: NOTION_ROOT_PAGE,
    useBlankLink: true,
  },
  settings: {
    include: 'other',
    menuIcon: (<AiOutlineSetting className='text-2xl'/>),
    menuSelIcon: (<AiOutlineSetting className='text-2xl'/>),
    menuName: 'Settings',
    menuComp: (<Setting/>),
  },
}


export const Sidebar = () => {
  const {selMenu, setSelMenu, team, apiKeyArr, selApiKeyIndex} = useZustand()
  console.log('team', team)
  const teamString = team && (team.tier === 'free' ? 'Free Tier' :
    team.tier === 'I' ? 'Tier I' :
      team.tier === 'II' ? 'Tier II' :
        team.tier === 'III' ? 'Tier III' :
          'Customer Plan')


  // const teamNameString = (team && team.teamId) || ''
  const teamNameString = apiKeyArr[selApiKeyIndex]?.name || ''

  return (
    <div className="flex flex-col justify-between h-full gap-6 p-6 border-r border-border-gray">
      <div className='flex flex-col gap-6'>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image className='rounded' src='assets/images/sidebar_logo.svg' width={40} height={40} alt='Sindarin'/>
            <div className='flex flex-col text-sm font-medium'>
              <div className='text-text-dark'>{teamNameString}</div>
              <div className='text-text-gray'>{teamString}</div>
            </div>
          </div>
        </div>
        {/* <div className='flex items-center w-full gap-1 p-2 text-sm border rounded border-border-gray'>
          <AiOutlineSearch className='text-2xl cursor-pointer text-text-gray'/>
          <input className='p-0 border-0 w-fit text-text-dark' type='text' placeholder='Search for anything'/>
        </div> */}
        <div className='flex flex-col'>
          <div className='font-semibold border-b text-text-gray border-b-border-gray'>GENERAL</div>
          <div className='flex flex-col gap-1'>
            {Object.keys(MENUS).map((menuKey: string, index: number) => MENUS[menuKey].include === 'general' &&
              <a
                key={index}
                className={`flex items-center gap-3 p-1 text-sm cursor-pointer
                  ${selMenu === menuKey ? 'text-text-dark' : 'text-text-gray'}`}
                href={MENUS[menuKey].useBlankLink ? MENUS[menuKey].menuComp : '#'}
                target={MENUS[menuKey].useBlankLink ? '_blank' : '_self'}
                rel="noreferrer"
                onClick={() => {
                  if (MENUS[menuKey].useBlankLink) {
                    return
                  }

                  setSelMenu(menuKey)
                }}
              >
                {selMenu === menuKey ? MENUS[menuKey].menuSelIcon : MENUS[menuKey].menuIcon}
                <div>{MENUS[menuKey].menuName}</div>
              </a>,
            )}
          </div>
        </div>
      </div>
      <div>
        <div className='flex flex-col'>
          <div className='font-semibold border-b text-text-gray border-b-border-gray'>OTHER</div>
          <div className='flex flex-col gap-1'>
            {Object.keys(MENUS).map((menuKey: string, index: number) => MENUS[menuKey].include === 'other' &&
              <a
                key={index}
                className={`flex items-center gap-3 p-1 text-sm cursor-pointer
                  ${selMenu === menuKey ? 'text-text-dark' : 'text-text-gray'}`}
                href={MENUS[menuKey].useBlankLink ? MENUS[menuKey].menuComp : '#'}
                target={MENUS[menuKey].useBlankLink ? '_blank' : '_self'}
                rel="noreferrer"
                onClick={() => {
                  if (MENUS[menuKey].useBlankLink) {
                    return
                  }

                  setSelMenu(menuKey)
                }}
              >
                {selMenu === menuKey ? MENUS[menuKey].menuSelIcon : MENUS[menuKey].menuIcon}
                <div>{MENUS[menuKey].menuName}</div>
              </a>,
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
