'use client'

import React, {useEffect, useState} from 'react'

import {MultiSelect} from 'primereact/multiselect'
import {getUniqueArr} from '../../../lib/common'
import {useZustand} from '../../../lib/store/use-zustand'


export const TranscriptFilter = () => {
  const {transcriptArr} = useZustand()
  const [selectedPersonaIdArr, setSelectedPersonaIdArr] = useState([])
  const [selectedUserIdArr, setSelectedUserIdArr] = useState([])

  const personaIdOptionArr = getUniqueArr(transcriptArr.map(((transcript) => transcript.personaId))).map((personaId) => ({name: personaId}))
  const userIdOptionArr = getUniqueArr(transcriptArr.map(((transcript) => transcript.userId))).map((userId) => ({name: userId}))

  useEffect(() => {
    console.log('TranscriptFilter#useEffect: transcriptArr: ', transcriptArr)
  }, [transcriptArr])

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
      <MultiSelect
        className="text-xs border w-fit border-border-gray"
        value={selectedUserIdArr}
        onChange={(e) => setSelectedUserIdArr(e.value)}
        options={userIdOptionArr}
        optionLabel="name"
        filter
        placeholder="Select Users"
        maxSelectedLabels={1}
      />
    </div>
  )
}
