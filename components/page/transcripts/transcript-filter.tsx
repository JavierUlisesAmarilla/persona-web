'use client'

import React, {useEffect, useState} from 'react'
import {getCustomDateFromDate, getNextCustomDateFromDate, getUniqueArr} from '../../../lib/common'

import {Calendar} from 'primereact/calendar'
import {MultiSelect} from 'primereact/multiselect'
import {Nullable} from 'primereact/ts-helpers'
import {useZustand} from '../../../lib/store/use-zustand'


export const TranscriptFilter = () => {
  const {transcriptArr, setFilteredTranscriptArr} = useZustand()
  const [selectedPersonaNameOptionArr, setSelectedPersonaNameOptionArr] = useState([])
  const [selectedUserIdOptionArr, setSelectedUserIdOptionArr] = useState([])
  const [dateArr, setDateArr] = useState<Nullable<(Date | null)[]>>([])

  const personaNameOptionArr = getUniqueArr(transcriptArr.map(((transcript) => transcript.personaName))).map((personaName) => ({name: personaName}))
  const userIdOptionArr = getUniqueArr(transcriptArr.map(((transcript) => transcript.userId))).map((userId) => ({name: userId}))

  useEffect(() => {
    const selectedPersonaNameArr = selectedPersonaNameOptionArr.map((val: any) => val.name)
    const selectedUserIdArr = selectedUserIdOptionArr.map((val: any) => val.name)
    const newFilteredTranscriptArr = transcriptArr.filter((transcript) => {
      const personaName = !selectedPersonaNameArr.length || selectedPersonaNameArr.indexOf(transcript.personaName) > -1
      const userId = !selectedUserIdArr.length || selectedUserIdArr.indexOf(transcript.userId) > -1
      const date = !dateArr || !Array.isArray(dateArr) || (
        (!dateArr[0] || transcript.createdAt >= getCustomDateFromDate(dateArr[0])) &&
        (!dateArr[1] || transcript.createdAt < getNextCustomDateFromDate(dateArr[1]))
      )

      // if (dateArr && Array.isArray(dateArr)) {
      //   if (dateArr[0]) {
      //     console.log('TranscriptFilter#useEffect: dateArr[0]: ', getCustomDateFromDate(dateArr[0]), ',', transcript.createdAt, getCustomDateFromDate(dateArr[0]) <= transcript.createdAt)
      //   }

      //   if (dateArr[1]) {
      //     console.log('TranscriptFilter#useEffect: dateArr[1]: ', transcript.createdAt, ',', getNextCustomDateFromDate(dateArr[1]), transcript.createdAt < getNextCustomDateFromDate(dateArr[1]))
      //   }
      // }

      return personaName && userId && date
    })
    setFilteredTranscriptArr(newFilteredTranscriptArr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateArr, selectedPersonaNameOptionArr, selectedUserIdOptionArr, transcriptArr])

  return (
    <div className='flex items-center gap-3 p-6 border rounded-lg bg-bg-light'>
      <MultiSelect
        className='text-xs border w-fit border-border-gray h-fit'
        value={selectedPersonaNameOptionArr}
        onChange={(e) => setSelectedPersonaNameOptionArr(e.value)}
        options={personaNameOptionArr}
        optionLabel='name'
        filter
        placeholder='Select Persona Names'
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
