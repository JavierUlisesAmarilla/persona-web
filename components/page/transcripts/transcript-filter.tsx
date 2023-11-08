'use client'

import React, {useEffect, useState} from 'react'

import {Calendar} from 'primereact/calendar'
import {MultiSelect} from 'primereact/multiselect'
import {Nullable} from 'primereact/ts-helpers'
import {getUniqueArr} from '../../../lib/common'
import {useZustand} from '../../../lib/store/use-zustand'


export const TranscriptFilter = () => {
  const {transcriptArr, setFilteredTranscriptArr} = useZustand()
  const [selectedPersonaIdOptionArr, setSelectedPersonaIdOptionArr] = useState([])
  const [selectedUserIdOptionArr, setSelectedUserIdOptionArr] = useState([])
  const [dateArr, setDateArr] = useState<Nullable<(Date | null)[]>>([])

  const personaIdOptionArr = getUniqueArr(transcriptArr.map(((transcript) => transcript.personaId))).map((personaId) => ({name: personaId}))
  const userIdOptionArr = getUniqueArr(transcriptArr.map(((transcript) => transcript.userId))).map((userId) => ({name: userId}))

  useEffect(() => {
    const selectedPersonaIdArr = selectedPersonaIdOptionArr.map((val: any) => val.name)
    const selectedUserIdArr = selectedUserIdOptionArr.map((val: any) => val.name)
    console.log('TranscriptFilter#useEffect: ', selectedPersonaIdArr, selectedUserIdArr, dateArr)
    const newFilteredTranscriptArr = transcriptArr.filter((transcript) =>
      (!selectedPersonaIdArr.length || selectedPersonaIdArr.indexOf(transcript.personaId) > -1) &&
      (!selectedUserIdArr.length || selectedUserIdArr.indexOf(transcript.userId) > -1),
    )
    setFilteredTranscriptArr(newFilteredTranscriptArr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateArr, selectedPersonaIdOptionArr, selectedUserIdOptionArr])

  return (
    <div className='flex items-center gap-3 p-6 border rounded-lg bg-bg-light'>
      <MultiSelect
        className='text-xs border w-fit border-border-gray h-fit'
        value={selectedPersonaIdOptionArr}
        onChange={(e) => setSelectedPersonaIdOptionArr(e.value)}
        options={personaIdOptionArr}
        optionLabel='name'
        filter
        placeholder='Select Persona Ids'
        maxSelectedLabels={1}
      />
      <MultiSelect
        className='text-xs border w-fit border-border-gray h-fit'
        value={selectedUserIdOptionArr}
        onChange={(e) => setSelectedUserIdOptionArr(e.value)}
        options={userIdOptionArr}
        optionLabel='name'
        filter
        placeholder='Select Users'
        maxSelectedLabels={1}
      />
      <Calendar
        className='p-2 text-xs border rounded w-fit border-border-gray h-fit'
        value={dateArr}
        onChange={(e) => setDateArr(e.value)}
        selectionMode='range'
        dateFormat='yy.mm.dd'
        readOnlyInput
        showIcon
      />
    </div>
  )
}
