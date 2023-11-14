/* eslint-disable @next/next/no-img-element */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
'use client'

import {CommonModal} from '@/components/shared/common-modal'
import {InputText} from '@/components/shared/input-text'
import {javascript} from '@codemirror/lang-javascript'
import CodeMirror from '@uiw/react-codemirror'
import React from 'react'


interface Props {
  show?: boolean
  onClose?: React.MouseEventHandler<SVGElement>
}


export const DeployTwilioModal = ({
  show,
  onClose,
}: Props) => {
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
              <InputText/>
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
              <InputText/>
            </div>
            <div className='flex flex-col gap-1'>
              <div>5. Below that, find your Auth token and paste it here:</div>
              <InputText/>
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
    </CommonModal>
  )
}
