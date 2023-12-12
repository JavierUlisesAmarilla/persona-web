'use client'

import {BlueButton} from '@/components/shared/button'
import {InputText} from '@/components/shared/input-text'
import {useZustand} from '@/lib/store/use-zustand'


interface Props {
  scenarioIndex: number
  scenario: any
}


export const Scenario = ({scenario, scenarioIndex}: Props) => {
  const {selPersonaIndex, setScenarioPersonaSay, setScenarioUserSay, setScenarioContext, setScenarioResponse} = useZustand()

  return (
    <div className='flex flex-col w-full gap-3 p-6 text-sm border rounded-lg border-border-gray bg-bg-light'>
      <div className='flex flex-col w-full gap-3'>
        <div>Context</div>
        <InputText
          classNames='text-xs'
          defaultValue={scenario?.context}
          onChange={(e) => setScenarioContext(selPersonaIndex, scenarioIndex, e.target.value)}
        />
      </div>
      <div className='flex flex-col w-full gap-3'>
        <div className='flex items-center gap-3'>
          <div>When the persona says something like</div>
          <BlueButton
            onClick={() => {
              const newPersonaSayIndex = scenario?.personaSays?.length || 0
              setScenarioPersonaSay(selPersonaIndex, scenarioIndex, newPersonaSayIndex, '')
            }}
          >
            Add new example
          </BlueButton>
        </div>
        {scenario?.personaSays?.map((personaSay: any, personaSayIndex: number) =>
          <InputText
            classNames='text-xs'
            key={personaSayIndex}
            defaultValue={personaSay}
            onChange={(e) => setScenarioPersonaSay(selPersonaIndex, scenarioIndex, personaSayIndex, e.target.value)}
          />,
        )}
      </div>
      <div className='flex flex-col w-full gap-3'>
        <div className='flex items-center gap-3'>
          <div>And the user responds with something like</div>
          <BlueButton
            onClick={() => {
              const newUserSayIndex = scenario?.userSays?.length || 0
              setScenarioUserSay(selPersonaIndex, scenarioIndex, newUserSayIndex, '')
            }}
          >
            Add new example
          </BlueButton>
        </div>
        {scenario?.userSays?.map((userSay: any, userSayIndex: number) =>
          <InputText
            classNames='text-xs'
            key={userSayIndex}
            defaultValue={userSay}
            onChange={(e) => setScenarioUserSay(selPersonaIndex, scenarioIndex, userSayIndex, e.target.value)}
          />,
        )}
      </div>
      <div className='flex flex-col w-full gap-3'>
        <div>The persona should respond by</div>
        <InputText
          classNames='text-xs'
          defaultValue={scenario?.responseGuidelines}
          onChange={(e) => setScenarioResponse(selPersonaIndex, scenarioIndex, e.target.value)}
        />
      </div>
    </div>
  )
}
