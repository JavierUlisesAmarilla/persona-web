'use client'

import React from 'react'
import {useZustand} from '../../../lib/store/use-zustand'
import {Transcript} from './transcript'
import {TranscriptFilter} from './transcript-filter'


export const Transcripts = () => {
  const {transcriptArr} = useZustand()

  return (
    <div className='flex flex-col w-full gap-3 px-4 Transcripts'>
      <TranscriptFilter/>
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
