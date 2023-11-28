'use client'

import {useZustand} from '../../../lib/store/use-zustand'
import {Transcript} from './transcript'
import {TranscriptFilter} from './transcript-filter'


export const Transcripts = () => {
  const {filteredTranscriptArr} = useZustand()

  return (
    <div className='flex flex-col w-full h-full gap-3 p-4 Transcripts bg-bg-gray'>
      <div className='text-2xl font-semibold'>Transcripts</div>
      <TranscriptFilter/>
      <div className="flex flex-wrap p-3 border rounded-lg bg-bg-light w-fit">
        {filteredTranscriptArr.map((transcript, index) =>
          <Transcript
            key={index}
            data={transcript}
          />,
        )}
      </div>
    </div>
  )
}
