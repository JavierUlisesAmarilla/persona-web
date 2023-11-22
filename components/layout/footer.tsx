/* eslint-disable jsdoc/require-returns */
import React from 'react'


/**
 *
 */
export default function Footer() {
  return (
    <div className="flex justify-between items-center w-full py-5 bg-white border-t border-gray-200">
      <p className="text-gray-500 flex-grow text-center pl-20">
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
      <a
        className="text-gray-500 hover:text-gray-800 transition-colors whitespace-nowrap mr-10"
        href="mailto:support@sindarin.tech"
        target="_blank"
        rel="noopener noreferrer"
      >
        Contact Us
      </a>
    </div>
  )
}
