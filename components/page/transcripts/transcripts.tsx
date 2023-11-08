'use client'

import React from 'react'
import {useZustand} from '../../../lib/store/use-zustand'
import {Transcript} from './transcript'


export const Transcripts = () => {
  const {transcriptArr} = useZustand()

  return (
    <div className='w-full px-4 Transcripts'>
      <div className="flex flex-wrap w-full p-3 border rounded-lg bg-bg-light">
        {transcriptArr.slice(0, 10).map((transcript, index) =>
          <Transcript
            key={index}
            data={transcript}
          />,
        )}
      </div>
    </div>
  )
}
