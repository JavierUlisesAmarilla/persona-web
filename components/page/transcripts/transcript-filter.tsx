'use client'

import {useEffect, useState} from 'react'
import {getCustomDateFromDate, getCustomDateFromStr, getNextCustomDateFromDate} from '../../../lib/common'
import {getTranscriptArr} from '../../../lib/persona'

import {Calendar} from 'primereact/calendar'
import {MultiSelect} from 'primereact/multiselect'
import {Nullable} from 'primereact/ts-helpers'
import {useZustand} from '@/lib/store/use-zustand'
import {useApiKey} from '@/lib/hooks/use-api-key'


export const TranscriptFilter = () => {
  const apiKey = useApiKey()
  const {setFilteredTranscriptArr, transcriptStats, personaArr} = useZustand()
  const [selectedPersonaNameOptionArr, setSelectedPersonaNameOptionArr] = useState([])
  const {users} = transcriptStats
  const userIdOptionArr = users.map((userid: string) => ({name: userid}))

  const [selectedUserIdOptionArr, setSelectedUserIdOptionArr] = useState<string[]>([])
  const [dateArr, setDateArr] = useState<Nullable<(Date | null)[]>>([])

  const personaNameOptionArr = personaArr.map((persona) => ({name: persona.name}))

  useEffect(() => {
    const fetchTranscriptArr = async () => {
      // const personaIds = selectedPersonaNameOptionArr.map((val: any) => val.name).join(',')
      // get the ids of the selected personas given their names
      const personaIds = selectedPersonaNameOptionArr.map((i: any) => {
        const persona = personaArr.find((p: any) => p.name === i.name)
        return persona?._id
      }).join(',')
      const userIds = selectedUserIdOptionArr.map((i: any) => i.name).join(',')
      const start = dateArr && dateArr[0] ? getCustomDateFromDate(dateArr[0]) : ''
      const end = dateArr && dateArr[1] ? getNextCustomDateFromDate(dateArr[1]) : ''
      const {transcripts} = await getTranscriptArr(apiKey, personaIds, userIds, start, end)
      transcripts.forEach((transcript: any) => {
        const persona = personaArr.find((p: any) => p._id === transcript.personaId)
        transcript.personaName = persona?.name
        transcript.personaId = persona?.personaId
        transcript.createdAt = getCustomDateFromStr(transcript.createdAt)
      })
      setFilteredTranscriptArr(transcripts)
    }
    fetchTranscriptArr()
  }, [dateArr, selectedPersonaNameOptionArr, selectedUserIdOptionArr, setFilteredTranscriptArr, apiKey, personaArr])

  return (
    <div className='flex flex-wrap items-center gap-3 p-6 border rounded-lg bg-bg-light'>
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
        className='p-2 text-xs border rounded-lg w-fit min-w-[16rem] border-border-gray h-11'
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
