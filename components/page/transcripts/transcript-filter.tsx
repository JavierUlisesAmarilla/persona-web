'use client'

import React, {useEffect, useState} from 'react'

import {Calendar} from 'primereact/calendar'
import {MultiSelect} from 'primereact/multiselect'
import {Nullable} from 'primereact/ts-helpers'
import {getUniqueArr} from '../../../lib/common'
import {useZustand} from '../../../lib/store/use-zustand'


export const TranscriptFilter = () => {
  const {transcriptArr} = useZustand()
  const [selectedPersonaIdArr, setSelectedPersonaIdArr] = useState([])
  const [selectedUserIdArr, setSelectedUserIdArr] = useState([])
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null)

  const personaIdOptionArr = getUniqueArr(transcriptArr.map(((transcript) => transcript.personaId))).map((personaId) => ({name: personaId}))
  const userIdOptionArr = getUniqueArr(transcriptArr.map(((transcript) => transcript.userId))).map((userId) => ({name: userId}))

  useEffect(() => {
    console.log('TranscriptFilter#useEffect: ', selectedPersonaIdArr, selectedUserIdArr, dates)
  }, [dates, selectedPersonaIdArr, selectedUserIdArr])

  return (
    <div className='flex items-center gap-3 p-6 border rounded-lg bg-bg-light'>
      <MultiSelect
        className='text-xs border w-fit border-border-gray h-fit'
        value={selectedPersonaIdArr}
        onChange={(e) => setSelectedPersonaIdArr(e.value)}
        options={personaIdOptionArr}
        optionLabel='name'
        filter
        placeholder='Select Persona Ids'
        maxSelectedLabels={1}
      />
      <MultiSelect
        className='text-xs border w-fit border-border-gray h-fit'
        value={selectedUserIdArr}
        onChange={(e) => setSelectedUserIdArr(e.value)}
        options={userIdOptionArr}
        optionLabel='name'
        filter
        placeholder='Select Users'
        maxSelectedLabels={1}
      />
      <Calendar
        className='p-2 text-xs border rounded w-fit border-border-gray h-fit'
        value={dates}
        onChange={(e) => setDates(e.value)}
        selectionMode='range'
        dateFormat='yy.mm.dd'
        readOnlyInput
        showIcon
      />
    </div>
  )
}
