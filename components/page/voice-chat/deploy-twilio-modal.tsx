/* eslint-disable @next/next/no-img-element */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
'use client'

import React, {useRef} from 'react'

import {BlueButton} from '@/components/shared/button'
import {CommonModal} from '@/components/shared/common-modal'
import {InputText} from '@/components/shared/input-text'
import {SINDARIN_API_URL} from '@/lib/constants'
import {useApiKey} from '@/lib/hooks/use-api-key'
import {useZustand} from '@/lib/store/use-zustand'
import {javascript} from '@codemirror/lang-javascript'
import CodeMirror from '@uiw/react-codemirror'
import axios from 'axios'


interface Props {
  show?: boolean
  onClose?: React.MouseEventHandler<SVGElement>
}


export const DeployTwilioModal = ({
  show,
  onClose,
}: Props) => {
  const apiKey = useApiKey()

  const onUpdatePersonaPhoneNumber = async () => {
    try {
      const selPersonaId = personaArr[selPersonaIndex]?._id

      if (!selPersonaId) {
        return
      }

      // setInitialMsgState('Saving...')
      const res = await axios.put(`${SINDARIN_API_URL}/api/personas/${selPersonaId}/twilio?apikey=${apiKey}`, {phoneNumber: personaArr[selPersonaIndex].phoneNumber})
      console.log('res', res)
      // setInitialMsgState(res.status === 200 ? 'Success' : 'Error')
    } catch (error) {
      console.log('VoiceChat#onInitialization: error: ', error)
    }
  }
  const onUpdatePersonaTwilioAuthToken = async () => {
    try {
      const selPersonaId = personaArr[selPersonaIndex]?._id

      if (!selPersonaId) {
        return
      }

      // setInitialMsgState('Saving...')
      const res = await axios.put(`${SINDARIN_API_URL}/api/personas/${selPersonaId}/twilio?apikey=${apiKey}`, {authToken: personaArr[selPersonaIndex].twilio.authToken})
      console.log('res', res)
      // setInitialMsgState(res.status === 200 ? 'Success' : 'Error')
    } catch (error) {
      console.log('VoiceChat#onInitialization: error: ', error)
    }
  }
  const onUpdatePersonaTwilioAccountSid = async () => {
    try {
      const selPersonaId = personaArr[selPersonaIndex]?._id

      if (!selPersonaId) {
        return
      }

      // setInitialMsgState('Saving...')
      const res = await axios.put(`${SINDARIN_API_URL}/api/personas/${selPersonaId}/twilio?apikey=${apiKey}`, {accountSid: personaArr[selPersonaIndex].twilio.accountSid})
      console.log('res', res)
      // setInitialMsgState(res.status === 200 ? 'Success' : 'Error')
    } catch (error) {
      console.log('VoiceChat#onInitialization: error: ', error)
    }
  }

  const {personaArr, selPersonaIndex, setPersonaTwilioAuthToken, setPersonaTwilioAccountSid, setPersonaPhoneNumber} = useZustand()

  const formRef = useRef<HTMLFormElement>(null)
  const phoneNumber = personaArr[selPersonaIndex]?.phoneNumber || ''
  const accountSid = personaArr[selPersonaIndex]?.twilio ? personaArr[selPersonaIndex]?.twilio.accountSid : ''
  const authToken = personaArr[selPersonaIndex]?.twilio ? personaArr[selPersonaIndex]?.twilio.authToken : ''

  return (
    <CommonModal
      show={show}
      onClose={onClose}
    >
      <div className='flex flex-col w-full gap-3 text-xs'>
        <div className='flex flex-col gap-3 p-6 border rounded-lg bg-bg-gray border-border-gray'>
          <div className='text-sm'><strong>INBOUND AND OUTBOUND CALLS:</strong></div>
          <div className='flex flex-col gap-1'>
            <div className='p-2'>
              <strong>1.</strong>&nbsp;
              <a className='text-blue-500' href='https://www.twilio.com/try-twilio' target='_blank' rel="noreferrer">Create a Twilio account</a>
              &nbsp;if you don't have one, and&nbsp;
              <a className='text-blue-500' href='https://www.twilio.com/docs/phone-numbers' target='_blank' rel="noreferrer">buy a voice phone number</a>
              .
            </div>
            <div className='flex flex-col gap-1'>
              <div className='p-2'>
                <strong>2.</strong> Under Phone Numbers &gt; Manage &gt; Active Numbers &gt; [Phone number] &gt; Configure &gt; Voice Configuration, ensure that when "A call comes in" it set to Webhook, the "URL" is set to&nbsp;
                <a className='text-blue-500' href='https://twilio.sindarin.tech/twiml' target='_blank' rel="noreferrer">https://twilio.sindarin.tech/twiml</a>
                &nbsp;and “HTTP” is set to HTTP GET.
              </div>
              <img className='p-2' src='assets/images/twilio-modal/image1.png' alt=''/>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='p-2'><strong>3.</strong> Enter the phone number here (Including the “+” at the beginning):</div>
              <div className='flex gap-3 p-2'>
                <InputText
                  value={phoneNumber}
                  onChange={(e) => setPersonaPhoneNumber(selPersonaIndex, e.target.value)}
                />
                <BlueButton onClick={onUpdatePersonaPhoneNumber}>
                  Submit
                </BlueButton>
              </div>
            </div>
          </div>
          <div className='p-2'>That's it for inbound calls! Feel free to try calling your Persona.</div>
        </div>
        <div className='flex flex-col gap-3 p-6 border rounded-lg bg-bg-gray border-border-gray'>
          <div className='text-sm'><strong>OUTBOUND CALLS (CONT'D):</strong></div>
          <div className='p-2'>To enable your Persona to make outbound calls, we require your Twilio Account SID and Auth Token.</div>
          <div className='flex flex-col gap-1'>
            <div className='flex flex-col'>
              <div className='p-2'><strong>4.</strong> Under Account &gt; API keys & tokens &gt; Auth Tokens, find your Account SID and paste it here:</div>
              <div className='flex gap-3 p-2'>
                <InputText
                  value={accountSid}
                  onChange={(e) => setPersonaTwilioAccountSid(selPersonaIndex, e.target.value)}
                />
                <BlueButton onClick={onUpdatePersonaTwilioAccountSid}>
                  Submit
                </BlueButton>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='p-2'><strong>5.</strong> Below that, find your Auth Token and paste it here:</div>
              <div className='flex gap-3 p-2'>
                <InputText
                  value={authToken}
                  onChange={(e) => setPersonaTwilioAuthToken(selPersonaIndex, e.target.value)}
                />
                <BlueButton onClick={onUpdatePersonaTwilioAuthToken}>
                  Submit
                </BlueButton>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-1 p-2'>
            <div>Congrats! You can now make outbound calls using the API by calling the endpoint: ${SINDARIN_API_URL}/api/personas/:persona-id/makecall?apikey=[api-key] with the JSON request body</div>
            <CodeMirror
              theme='dark'
              editable={false}
              extensions={[javascript({jsx: true})]}
              value={`{
  "phoneNumber": "[number-to-call]",
  "details": {
      "[detail1]": "detail1"
  }
}`}
            />
          </div>
        </div>
      </div>
      <form ref={formRef} method="post" action="" target="TheWindow">
        <input type="hidden" name="phoneNumber" value="" readOnly/>
        <input type="hidden" name="accountSid" value="" readOnly/>
        <input type="hidden" name="authToken" value="" readOnly/>
      </form>
    </CommonModal>
  )
}
