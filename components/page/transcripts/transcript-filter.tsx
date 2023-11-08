'use client'

import React, {useState} from 'react'

import {MultiSelect} from 'primereact/multiselect'
import {getUniqueArr} from '../../../lib/common'
import {useZustand} from '../../../lib/store/use-zustand'


export const TranscriptFilter = () => {
  const {transcriptArr} = useZustand()
  const [selectedPersonaIdArr, setSelectedPersonaIdArr] = useState([])

  const personaIdOptionArr = getUniqueArr(transcriptArr.map(((transcript) => transcript.personaId))).map((personaId) => ({name: personaId, code: personaId}))

  return (
    <div className="flex gap-3 p-6 border rounded-lg bg-bg-light">
      <MultiSelect
        className="text-xs border w-fit border-border-gray"
        value={selectedPersonaIdArr}
        onChange={(e) => setSelectedPersonaIdArr(e.value)}
        options={personaIdOptionArr}
        optionLabel="name"
        filter
        placeholder="Select Persona Ids"
        maxSelectedLabels={1}
      />
    </div>
  )
}
