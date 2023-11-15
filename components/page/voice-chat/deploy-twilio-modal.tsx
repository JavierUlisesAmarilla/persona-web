/* eslint-disable @next/next/no-img-element */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
'use client'

import React, {useRef, useState} from 'react'

import {BlueButton} from '@/components/shared/button'
import {CommonModal} from '@/components/shared/common-modal'
import {InputText} from '@/components/shared/input-text'
import {useZustand} from '@/lib/store/use-zustand'
import {javascript} from '@codemirror/lang-javascript'
import CodeMirror from '@uiw/react-codemirror'


interface Props {
  show?: boolean
  onClose?: React.MouseEventHandler<SVGElement>
}


export const DeployTwilioModal = ({
  show,
  onClose,
}: Props) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [accountSid, setAccountSid] = useState('')
  const [authToken, setAuthToken] = useState('')
  const {setAlertMsg, personaArr, selPersonaIndex} = useZustand()
  const selPersonaId = personaArr[selPersonaIndex]?._id

  const clearFormRef = () => {
    if (!formRef?.current) {
      return
    }

    formRef.current.action = `https://api.sindarin.tech/api/personas/${selPersonaId}/twilio`
    formRef.current.phoneNumber.value = ''
    formRef.current.accountSid.value = ''
    formRef.current.authToken.value = ''
  }

  return (
    <CommonModal
      show={show}
      onClose={onClose}
    >
      <div className='flex flex-col gap-3 w-[50rem] max-h-[34rem] text-xs'>
        <div className='flex flex-col gap-3 p-6 border rounded-lg bg-bg-gray border-border-gray'>
          <div className='text-sm'>INBOUND ONLY:</div>
          <div className='flex flex-col gap-1'>
            <div>
              1.&nbsp;
              <a className='text-blue-500' href='https://www.twilio.com/try-twilio' target='_blank' rel="noreferrer">Create a Twilio account</a>
              &nbsp;if you don't have one, and&nbsp;
              <a className='text-blue-500' href='https://www.twilio.com/docs/phone-numbers' target='_blank' rel="noreferrer">buy a voice phone number</a>
              .
            </div>
            <div className='flex flex-col gap-1'>
              <div>
                2. Under Phone Numbers &gt; Manage &gt; Active Numbers &gt; [Phone number] &gt; Configure &gt; Voice Configuration, ensure that when "A call comes in" it set to Webhook, the "URL" is set to&nbsp;
                <a className='text-blue-500' href='https://twilio.sindarin.tech/twiml' target='_blank' rel="noreferrer">https://twilio.sindarin.tech/twiml</a>
                &nbsp;and “HTTP” is set to HTTP GET.
              </div>
              <img src='assets/images/twilio-modal/image1.png' alt=''/>
            </div>
            <div className='flex flex-col gap-1'>
              <div>3. Enter the phone number here (Including the “+” at the beginning):</div>
              <div className='flex gap-3'>
                <InputText
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <BlueButton onClick={() => {
                  if (!formRef?.current || !phoneNumber) {
                    setAlertMsg('Input phone number.')
                    return
                  }

                  window.open('', 'TheWindow')
                  clearFormRef()
                  formRef.current.phoneNumber.value = phoneNumber
                  formRef.current.submit()
                }}
                >
                  Submit
                </BlueButton>
              </div>
            </div>
          </div>
          <div>That's it for inbound calls! Feel free to try calling your Persona.</div>
        </div>
        <div className='flex flex-col gap-3 p-6 border rounded-lg bg-bg-gray border-border-gray'>
          <div className='text-sm'>OUTBOUND:</div>
          <div>To enable your Persona to make outbound calls, we require your Twilio Account SID and Auth Token.</div>
          <div className='flex flex-col gap-1'>
            <div className='flex flex-col'>
              <div>4. Under Account &gt; API keys & tokens &gt; Auth Tokens, find your Account SID and paste it here:</div>
              <div className='flex gap-3'>
                <InputText
                  value={accountSid}
                  onChange={(e) => setAccountSid(e.target.value)}
                />
                <BlueButton onClick={() => {
                  if (!formRef?.current || !accountSid) {
                    setAlertMsg('Input account sid.')
                    return
                  }

                  window.open('', 'TheWindow')
                  clearFormRef()
                  formRef.current.accountSid.value = accountSid
                  formRef.current.submit()
                }}
                >
                  Submit
                </BlueButton>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <div>5. Below that, find your Auth token and paste it here:</div>
              <div className='flex gap-3'>
                <InputText
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                />
                <BlueButton onClick={() => {
                  if (!formRef?.current || !authToken) {
                    setAlertMsg('Input auth token.')
                    return
                  }

                  window.open('', 'TheWindow')
                  clearFormRef()
                  formRef.current.authToken.value = authToken
                  formRef.current.submit()
                }}
                >
                  Submit
                </BlueButton>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <div>Congrats! You can now make outbound calls using the API by calling the endpoint: https://api.sindarin.tech/api/personas/:persona-id/makecall?apikey=[api-key] with the JSON request body</div>
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
