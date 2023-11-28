/* eslint-disable react/no-unescaped-entities */
'use client'

import React, {useEffect, useState} from 'react'
import {AiFillCustomerService, AiFillDelete, AiFillSound, AiOutlineEdit, AiOutlineShareAlt} from 'react-icons/ai'

import {BlueButton} from '@/components/shared/button'
import {CommonModal} from '@/components/shared/common-modal'
import {InputText} from '@/components/shared/input-text'
import {SINDARIN_API_URL} from '@/lib/constants'
import {useApiKey} from '@/lib/hooks/use-api-key'
import {updatePersonaVoice} from '../../../lib/persona'
import {useZustand} from '../../../lib/store/use-zustand'
import {UserSelect} from '../../shared/user-select'


interface VoiceOption {
  gender: string
  age: string
  accent: string
  id: string
  index?: number
}

interface Props {
  show?: boolean
  onClose?: React.MouseEventHandler<SVGElement>
}

export const ChangeVoiceModal: React.FC<Props> = ({
  show,
  onClose,
}) => {
  const {personaArr, selPersonaIndex, setPersonaVoiceId} = useZustand()
  const selPersonaName = personaArr[selPersonaIndex]?.name
  const [voices, setVoices] = useState<VoiceOption[]>([])
  const [selectedGender, setSelectedGender] = useState<string>('')
  const [selectedAge, setSelectedAge] = useState<string>('')
  const [selectedAccent, setSelectedAccent] = useState<string>('')
  const currentPersonaSelectedVoiceId = personaArr[selPersonaIndex]?.voiceId

  const apiKey = useApiKey()

  const playVoiceSample = async (voiceId: string) => {
    const response = await fetch(`${SINDARIN_API_URL}/api/voices/${voiceId}/sample?apikey=${apiKey}`)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const audio = new Audio(url)
    audio.play()
  }

  // const onPrompt = async () => {
  //   try {
  //     const selPersonaId = personaArr[selPersonaIndex]?._id

  //     if (!selPersonaId) {
  //       return
  //     }

  //     setPromptState('Saving...')
  //     const res = await axios.put(`${SINDARIN_API_URL}/api/personas/${selPersonaId}/prompt?apikey=${apiKey}`, {prompt: personaArr[selPersonaIndex].currentVoicePrompt})
  //     setPromptState(res.status === 200 ? 'Success' : 'Error')
  //   } catch (error) {
  //     console.log('VoiceChat#onPrompt: error: ', error)
  //   }
  // }

  const onChangePersonaVoice = async (voiceId: string) => {
    const personaId = personaArr[selPersonaIndex]?._id
    await updatePersonaVoice(personaId, apiKey, voiceId)
    setPersonaVoiceId(selPersonaIndex, voiceId)
  }

  useEffect(() => {
    fetch(`${SINDARIN_API_URL}/api/voices?apikey=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          setVoices(data)
        })
        .catch((error) => console.error('Error fetching voice options:', error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getFilteredVoices = (gender?: string, age?: string, accent?: string) => {
    return voices.filter((voice) =>
      (!gender || gender === '-' ? true : voice.gender === gender) &&
      (!age || age === '-' ? true : voice.age === age) &&
      (!accent || accent === '-' ? true : voice.accent === accent),
    )
  }

  const groupVoices = (voicesToGroup: VoiceOption[]) => {
    const grouped = voicesToGroup.reduce((acc, voice) => {
      const {gender, age, accent} = voice
      const key = `${gender}-${age}-${accent}`
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(voice)
      return acc
    }, {} as Record<string, VoiceOption[]>)

    // Add an index to each voice within its group
    Object.values(grouped).forEach((group) => {
      group.forEach((voice, index) => {
        voice.index = index + 1 // Start index at 1 for display
      })
    })

    return Object.values(grouped).flat()
  }

  const uniqueGenders = Array.from(new Set(voices.map((voice) => voice.gender)))
      .map((gender) => ({
        gender,
        count: getFilteredVoices(gender, selectedAge, selectedAccent).length,
      }))
      .filter((gender) => gender.count > 0)

  const uniqueAges = Array.from(new Set(voices.map((voice) => voice.age)))
      .map((age) => ({
        age,
        count: getFilteredVoices(selectedGender, age, selectedAccent).length,
      }))
      .filter((age) => age.count > 0)

  const uniqueAccents = Array.from(new Set(voices.map((voice) => voice.accent)))
      .map((accent) => ({
        accent,
        count: getFilteredVoices(selectedGender, selectedAge, accent).length,
      }))
      .filter((accent) => accent.count > 0)

  const filteredVoices = groupVoices(getFilteredVoices(selectedGender, selectedAge, selectedAccent))

  return (
    <CommonModal
      show={show}
      onClose={onClose}
    >
      <div className='flex flex-col justify-center gap-3 p-6 text-xs border rounded-lg bg-bg-gray border-border-gray'>
        <div className='text-base text-center text-red-500'>{`Change voice for ${selPersonaName}`}</div>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-1'>
            <div className='text-red-500'>Gender:</div>
            <UserSelect value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
              <option value="-">-</option>
              {uniqueGenders.map(({gender, count}) => (
                gender !== null ? <option key={gender} value={gender}>{`${gender} (${count})`}</option> : null
              ))}
            </UserSelect>
          </div>
          <div className='flex items-center gap-1'>
            <div className='text-red-500'>Age:</div>
            <UserSelect value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)}>
              <option value="-">-</option>
              {uniqueAges.map(({age, count}) => (
                age !== null ? <option key={age} value={age}>{`${age} (${count})`}</option> : null
              ))}
            </UserSelect>
          </div>
          <div className='flex items-center gap-1'>
            <div className='text-red-500'>Accent:</div>
            <UserSelect value={selectedAccent} onChange={(e) => setSelectedAccent(e.target.value)}>
              <option value="-">-</option>
              {uniqueAccents.map(({accent, count}) => (
                accent !== null ? <option key={accent} value={accent}>{`${accent} (${count})`}</option> : null
              ))}
            </UserSelect>
          </div>
        </div>
        <div className='flex flex-col gap-3 p-6 border rounded-lg bg-bg-light border-border-gray' style={{maxHeight: '300px', overflowY: 'auto'}}>
          {filteredVoices.map((voice) => (
            <div key={`${voice.gender}-${voice.age}-${voice.accent}-${voice.index}`} className='flex items-center justify-between gap-3'>
              <div className='flex items-center gap-3 cursor-pointer'>
                <div>{`${voice.gender}, ${voice.age}, ${voice.accent} (${voice.index})`}</div>
                <AiFillSound className='text-sm' onClick={() => {
                  playVoiceSample(voice.id)
                }}
                />
              </div>
              {currentPersonaSelectedVoiceId === voice.id ? (
                <BlueButton disabled>Current Voice</BlueButton>
              ) : (
                <BlueButton onClick={() => {
                  onChangePersonaVoice(voice.id)
                }}
                >Use Voice
                </BlueButton>
              )}
            </div>
          ))}
        </div>
        <div className='flex flex-col gap-3 p-6 border rounded-lg bg-bg-light border-border-gray'>
          <div className='text-sm text-center text-red-500'>Import from ElevenLabs</div>
          <div className='flex flex-col gap-3'>
            <div>1. In the ElevenLabs, VoiceLab connects (link), press the "Submit" button.</div>
            <div className='flex justify-center'>
              <div className='flex flex-col border rounded w-80 bg-bg-gray border-border-gray'>
                <div className='flex flex-col gap-3 p-6'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='text-sm'>Badly</div>
                      <AiFillCustomerService className='text-sm'/>
                    </div>
                    <AiOutlineShareAlt className='text-base'/>
                  </div>
                  <div className='font-bold'>Can't read</div>
                  <div>Can't read</div>
                </div>
                <div className='flex items-center w-full border-t border-border-gray'>
                  <div className='flex items-center justify-center w-full gap-1 p-3 border-r cursor-pointer border-border-gray'>
                    <AiFillSound/>
                    <div>Volume</div>
                  </div>
                  <div className='flex items-center justify-center w-full gap-1 p-3 border-r cursor-pointer border-border-gray'>
                    <AiOutlineEdit/>
                    <div>Edit</div>
                  </div>
                  <div className='flex items-center justify-center w-full gap-1 p-3 cursor-pointer'>
                    <AiFillDelete/>
                    <div>Remove</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <div>2. Paste the share link here.</div>
            <div className='flex items-center justify-center gap-3'>
              <InputText
                classNames=''
                placeholder="Share Link"
              />
              <BlueButton>Submit</BlueButton>
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  )
}
