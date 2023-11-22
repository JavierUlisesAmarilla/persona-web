/* eslint-disable @next/next/no-img-element */
'use client'

import React, {MouseEventHandler, useEffect, useState} from 'react'
import {GreenButton} from '../../shared/button'
import {CommonModal} from '../../shared/common-modal'
import _ from 'lodash'
import axios from 'axios'
import {SINDARIN_API_URL, STRIPE_PUBLIC_KEY} from '@/lib/constants'
import {useApiKey} from '@/lib/hooks/use-api-key'
import {loadStripe} from '@stripe/stripe-js'


interface Props {
  show?: boolean
  onClose?: MouseEventHandler<SVGElement>
}

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY!)

export const PlanModal = ({
  show,
  onClose,
}: Props) => {
  const apiKey = useApiKey()
  const [shouldShowCheckout, setShouldShowCheckout] = useState(false)
  const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(null)
  const [checkoutInstance, setCheckoutInstance] = useState<any>(null)

  const handleClose = (event?: React.MouseEvent<SVGElement>) => {
    if (onClose && event) {
      onClose(event)
    }

    if (checkoutInstance) {
      console.log('going to unmount checkout')
      checkoutInstance.unmount()
      checkoutInstance.destroy()
      setCheckoutInstance(null)
    }
    // Reset the state values
    setShouldShowCheckout(false)
    setStripeClientSecret(null)
  }

  const onChoosePlan = async (tier: string) => {
    try {
      // setInitialMsgState('Saving...')
      if (!stripeClientSecret) {
        const response = await axios.post(`${SINDARIN_API_URL}/api/start-plan-update?apikey=${apiKey}`, {tier})
        // @ts-ignore
        const {clientSecret} = response.data
        setStripeClientSecret(clientSecret)
      }
      setShouldShowCheckout(true)
    } catch (error) {
      console.log('VoiceChat#onInitialization: error: ', error)
    }
  }

  const planArr = [
    {
      name: 'Persona - Base',
      price: 99,
      descArr: [
        '2,000 messages / ~5.5 hours per month of conversation.',
        '1 fully-customized Persona.',
        'Basic support (Email only, 1-2 business days).',
      ],
      onCtaClick: () => onChoosePlan('I'),
    },
    {
      name: 'Persona - Tier II',
      price: 239,
      descArr: [
        '5,000 messages / ~14 hours per month of conversation.',
        '3 fully-customizable Personas.',
        'Basic support (Email only, 1-2 business days).',
      ],
      onCtaClick: () => onChoosePlan('II'),
    },
    {
      name: 'Persona - Tier III',
      price: 449,
      descArr: [
        '10,000 messages / ~28 hours per month of conversation.',
        '5 fully-customizable Personas.',
        'Advanced suppprt (Slack Connect / WhatsApp + Email, < 1 business day, priority feature requests).',
      ],
      onCtaClick: () => onChoosePlan('III'),
    },
    {
      name: 'Persona - Custom',
      price: 'Contact Us',
      descArr: [
        'Customized rates for scaled usage.',
        'As many personas as you need.',
        'Advanced suppprt (Slack Connect / WhatsApp + Email, < 1 business day, priority feature requests).',
        'Fully-custom integrations and feature development.',
      ],
      cta: 'Email Us',
      onCtaClick: () => window.open('mailto:sales@sindarinventures.com?subject=Persona Custom Plan'),
    },
  ]

  useEffect(() => {
    const mountStripeCheckout = async () => {
      if (shouldShowCheckout && stripeClientSecret) {
        const stripe = await stripePromise
        if (stripe) {
          if (checkoutInstance) {
            checkoutInstance.unmount()
            checkoutInstance.destroy()
            setCheckoutInstance(null)
          }
          const checkout = await stripe.initEmbeddedCheckout({
            clientSecret: stripeClientSecret,
          })
          setCheckoutInstance(checkout)
          checkout.mount('#checkout')
        }
      }
    }

    mountStripeCheckout()

    return () => {
      if (checkoutInstance) {
        checkoutInstance.unmount()
        checkoutInstance.destroy()
      }
    }
  }, [shouldShowCheckout, stripeClientSecret])

  return (
    <CommonModal
      show={show}
      onClose={handleClose}
    >
      <div className='flex flex-col items-center justify-center gap-3 p-6 border rounded-lg bg-bg-gray border-border-gray'>
        { shouldShowCheckout ? <div id="checkout"/> : planArr.map((plan, planIndex) =>
          <div
            key={planIndex}
            className='flex flex-col gap-1 p-6 border rounded-lg bg-bg-light border-border-gray'
            style={{width: '500px'}}
          >
            <div className='flex items-center justify-between gap-3'>
              <div className='flex items-center'>
                <img className='w-8' src='persona-logo-rounded.png' alt=''/>
                <div>{plan.name}</div>
              </div>
              <div className='text-sm'>{_.isNumber(plan.price) ? `$${plan.price} / mo` : plan.price}</div>
            </div>
            <div className='pl-10'>
              {plan.descArr.map((desc, descIndex) =>
                <div
                  key={descIndex}
                  className='flex items-start text-xs'
                  style={{marginTop: '5px'}}
                >
                  <div className='mr-2'>•</div>
                  <div style={{wordWrap: 'break-word'}}>{desc}</div>
                </div>,
              )}
            </div>
            <div className='flex justify-end w-full pt-2'>
              <GreenButton onClick={plan.onCtaClick}>{plan.cta || 'Buy'}</GreenButton>
            </div>
          </div>,
        )
        }
      </div>
    </CommonModal>
  )
}
