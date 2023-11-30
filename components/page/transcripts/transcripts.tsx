'use client'

import { useZustand } from '../../../lib/store/use-zustand'
import { Transcript } from './transcript'
import { TranscriptFilter } from './transcript-filter'


export const Transcripts = () => {
  const {filteredTranscriptArr} = useZustand()

  return (
    <div className='flex flex-col w-full gap-3 p-6 Transcripts bg-bg-gray'>
      <div className='text-2xl font-semibold'>Transcripts</div>
      <TranscriptFilter/>
      <div className="flex flex-wrap gap-3">
        {filteredTranscriptArr.map((transcript, index) =>
          <Transcript
            key={index}
            data={transcript}
            classNames='min-w-[250px]'
          />,
        )}
      </div>
    </div>
  )
}
