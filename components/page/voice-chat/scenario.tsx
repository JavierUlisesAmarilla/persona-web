/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsdoc/require-returns */
'use client'

import {useZustand} from '@/lib/store/use-zustand'
import React from 'react'


interface Props {
  scenarioIndex: number
  scenario: any
}

/**
 *
 */
export default function Scenario({scenario, scenarioIndex}: Props) {
  const {selPersonaIndex, setScenarioPersonaSay, setScenarioUserSay, setScenarioContext, setScenarioResponse} = useZustand()

  return (
    <div className='flex flex-col w-full gap-4 p-4 border border-black'>
      <div className='flex flex-col w-full gap-2'>
        <div>Context</div>
        <input
          className='w-full px-3 py-1 rounded'
          type='text'
          defaultValue={scenario?.context}
          onChange={(e) => setScenarioContext(selPersonaIndex, scenarioIndex, e.target.value)}
        />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div className='flex items-center gap-4'>
          <div>When the persona says something like</div>
          <div
            className='px-3 py-1 rounded cursor-pointer text-text-btn bg-bg-btn hover:text-black w-fit'
            onClick={() => {
              const newPersonaSayIndex = scenario?.personaSays?.length || 0
              setScenarioPersonaSay(selPersonaIndex, scenarioIndex, newPersonaSayIndex, '')
            }}
          >
            Add new example
          </div>
        </div>
        {scenario?.personaSays?.map((personaSay: any, personaSayIndex: number) =>
          <input
            className='w-full px-3 py-1 rounded'
            key={personaSayIndex}
            type='text'
            defaultValue={personaSay}
            onChange={(e) => setScenarioPersonaSay(selPersonaIndex, scenarioIndex, personaSayIndex, e.target.value)}
          />,
        )}
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div className='flex items-center gap-4'>
          <div>And the user responds with something like</div>
          <div
            className='px-3 py-1 rounded cursor-pointer text-text-btn bg-bg-btn hover:text-black w-fit'
            onClick={() => {
              const newUserSayIndex = scenario?.userSays?.length || 0
              setScenarioUserSay(selPersonaIndex, scenarioIndex, newUserSayIndex, '')
            }}
          >
            Add new example
          </div>
        </div>
        {scenario?.userSays?.map((userSay: any, userSayIndex: number) =>
          <input
            className='w-full px-3 py-1 rounded'
            key={userSayIndex}
            type='text'
            defaultValue={userSay}
            onChange={(e) => setScenarioUserSay(selPersonaIndex, scenarioIndex, userSayIndex, e.target.value)}
          />,
        )}
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div>The persona should respond by</div>
        <input
          className='w-full px-3 py-1 rounded'
          type='text'
          defaultValue={scenario?.responseGuidelines}
          onChange={(e) => setScenarioResponse(selPersonaIndex, scenarioIndex, e.target.value)}
        />
      </div>
    </div>
  )
}
