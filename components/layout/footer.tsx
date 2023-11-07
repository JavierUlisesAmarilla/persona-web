/* eslint-disable jsdoc/require-returns */
import React from 'react'


/**
 *
 */
export default function Footer() {
  return (
    <div className="absolute w-full py-5 text-center bg-white border-t border-gray-200">
      <p className="text-gray-500">
        By using Persona you agree to our{' '}
        <a
          className="font-medium text-gray-800 underline transition-colors"
          href="https://api.sindarin.tech/tos"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
      </p>
    </div>
  )
}
