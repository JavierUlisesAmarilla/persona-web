'use client'

import {useZustand} from '../../../lib/store/use-zustand'
import {Transcript} from './transcript'
import {TranscriptFilter} from './transcript-filter'


export const Transcripts = () => {
  const {filteredTranscriptArr, canSeeTranscripts, loadingStatus} = useZustand()

  return canSeeTranscripts ? (
    <div className='flex flex-col w-full h-full gap-3 p-6 Transcripts'>
      <div className='text-2xl font-semibold'>Transcripts</div>
      <TranscriptFilter/>
      <div className="flex flex-row flex-wrap gap-3 ml-auto">
        {filteredTranscriptArr.map((transcript, index) =>
          <Transcript
            key={index}
            data={transcript}
            classNames='min-w-[250px]'
          />,
        )}
      </div>
    </div>
  ) : (
    <div className='z-10 text-2xl font-semibold'>{loadingStatus}</div>
  )
}
