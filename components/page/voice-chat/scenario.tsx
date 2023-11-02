

/* eslint-disable jsdoc/require-returns */
'use client'

import {Button} from '@/components/shared/button'
import {InputText} from '@/components/shared/input-text'
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
    <div className='flex flex-col w-full gap-4 p-4 text-sm border border-gray-200'>
      <div className='flex flex-col w-full gap-2'>
        <div>Context</div>
        <InputText
          defaultValue={scenario?.context}
          onChange={(e) => setScenarioContext(selPersonaIndex, scenarioIndex, e.target.value)}
        />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div className='flex items-center gap-4'>
          <div>When the persona says something like</div>
          <Button
            onClick={() => {
              const newPersonaSayIndex = scenario?.personaSays?.length || 0
              setScenarioPersonaSay(selPersonaIndex, scenarioIndex, newPersonaSayIndex, '')
            }}
          >
            Add new example
          </Button>
        </div>
        {scenario?.personaSays?.map((personaSay: any, personaSayIndex: number) =>
          <InputText
            key={personaSayIndex}
            defaultValue={personaSay}
            onChange={(e) => setScenarioPersonaSay(selPersonaIndex, scenarioIndex, personaSayIndex, e.target.value)}
          />,
        )}
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div className='flex items-center gap-4'>
          <div>And the user responds with something like</div>
          <Button
            onClick={() => {
              const newUserSayIndex = scenario?.userSays?.length || 0
              setScenarioUserSay(selPersonaIndex, scenarioIndex, newUserSayIndex, '')
            }}
          >
            Add new example
          </Button>
        </div>
        {scenario?.userSays?.map((userSay: any, userSayIndex: number) =>
          <InputText
            key={userSayIndex}
            defaultValue={userSay}
            onChange={(e) => setScenarioUserSay(selPersonaIndex, scenarioIndex, userSayIndex, e.target.value)}
          />,
        )}
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div>The persona should respond by</div>
        <InputText
          defaultValue={scenario?.responseGuidelines}
          onChange={(e) => setScenarioResponse(selPersonaIndex, scenarioIndex, e.target.value)}
        />
      </div>
    </div>
  )
}
