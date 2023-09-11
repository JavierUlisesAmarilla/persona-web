"use client"

import { useZustand } from "@/lib/store/use-zustand";
import { Key } from "react";

interface Props {
  scenario: any;
  index: number;
}

export default function Scenario({ scenario, index }: Props) {
  const { selPersonaIndex, saveScenarioPersonaSay, saveScenarioUserSay } = useZustand()

  return (
    <div className='flex flex-col w-full gap-4 p-4 border border-black'>
      <div className='flex flex-col w-full gap-2'>
        <div>Context</div>
        <input
          className='w-full rounded-full'
          type='text'
          defaultValue={scenario?.context}
        ></input>
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div className='flex items-center gap-4'>
          <div>When the persona says something like</div>
          <div
            className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black w-fit'
            onClick={() => {
              const newPersonaSayIndex = scenario?.personaSays?.length || 0
              saveScenarioPersonaSay(selPersonaIndex, index, newPersonaSayIndex, '')
            }}
          >
            Add new example
          </div>
        </div>
        {scenario?.personaSays?.map((personaSay: any, index: Key | null | undefined) =>
          <input
            className='w-full rounded-full'
            key={index}
            type='text'
            defaultValue={personaSay}
          ></input>
        )}
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div className='flex items-center gap-4'>
          <div>And the user responds with something like</div>
          <div
            className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black w-fit'
            onClick={() => {
              const newUserSayIndex = scenario?.userSays?.length || 0
              saveScenarioUserSay(selPersonaIndex, index, newUserSayIndex, '')
            }}
          >
            Add new example
          </div>
        </div>
        {scenario?.userSays?.map((userSay: any, index: Key | null | undefined) =>
          <input
            className='w-full rounded-full'
            key={index}
            type='text'
            defaultValue={userSay}
          ></input>
        )}
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div>The persona should respond by</div>
        <input
          className='w-full rounded-full'
          type='text'
          defaultValue={scenario?.responseGuidelines}
        ></input>
      </div>
    </div>
  )
}
