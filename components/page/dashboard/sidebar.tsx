/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
'use client'

import Image from 'next/image'
import React, {useState} from 'react'


export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true)

  // eslint-disable-next-line no-unused-vars
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="flex flex-col h-screen p-3 w-70 dark:bg-gray-900 dark:text-gray-100">
      <div className="flex-grow space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/assets/images/sidebar_logo.svg"
              alt="Sidebar logo"
              width="40"
              height="40"
              className="mr-2 rounded-sm"
            />
            <div>
              <p className="text-lg font-bold">Earthr</p>
              <p className="text-sm text-gray-500">Team Plan</p>
            </div>
          </div>
          <button className="px-0">
            <Image
              src="/assets/images/collapse.svg"
              alt="Sidebar logo"
              width="16"
              height="16"
              className="mr-0 rounded-sm"
            />
          </button>
        </div>
        <div className="relative py-6">
          <span className="absolute inset-y-0 left-0 flex items-center py-4">
            <button type="submit" className="p-2 focus:outline-none focus:ring">
              <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                className="w-5 h-5 dark:text-gray-400"
              >
                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"/>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="Search"
            placeholder="Search for anything"
            className="w-full py-2 pl-10 text-gray-500 border-gray-200 rounded-md focus:outline-none font-500 text-14::placeholder border-1"
          />
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <label className="px-0 text-gray-500 uppercase text-14 font-600 dark:text-gray-400">
              General
            </label>
            <div className="border-t border-gray-300"/>
            <li className="rounded-sm">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center p-2 space-x-3 text-gray-500 rounded-md hover:text-black text-14 font-500"
              >
                <Image
                  src="/assets/images/dashboard.svg"
                  alt="dashboard logo"
                  width="22"
                  height="22"
                  className="mr-2 rounded-sm"
                />
                <span>Dashboard</span>
              </a>
            </li>
            <li className="rounded-sm">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center p-2 space-x-3 text-gray-500 rounded-md hover:text-black text-14 font-500"
              >
                <Image
                  src="/assets/images/persona.svg"
                  alt="Persona logo"
                  width="22"
                  height="22"
                  className="mr-2 rounded-sm"
                />
                <span>Personas</span>
              </a>
            </li>
            <li className="rounded-sm">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center p-2 space-x-3 text-gray-500 rounded-md hover:text-black text-14 font-500"
              >
                <Image
                  src="/assets/images/prevCalls1.svg"
                  alt="Previous Call logo"
                  width="22"
                  height="22"
                  className="mr-2 rounded-sm"
                />
                <span>Previous Calls</span>
              </a>
            </li>
            <li className="rounded-sm">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center p-2 space-x-3 text-gray-500 rounded-md hover:text-black text-14 font-500"
              >
                <Image
                  src="/assets/images/template.svg"
                  alt="Template logo"
                  width="22"
                  height="22"
                  className="mr-2 rounded-sm"
                />
                <span>Templates</span>
              </a>
            </li>
            <li className="rounded-sm">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center p-2 space-x-3 text-gray-500 rounded-md hover:text-black text-14 font-500"
              >
                <Image
                  src="/assets/images/prevCalls2.svg"
                  alt="Previous Call logo"
                  width="22"
                  height="22"
                  className="mr-2 rounded-sm"
                />
                <span>Previous Calls</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="items-center mt-auto space-x-4 justify-self-end">
        <ul className="pt-2 pb-4 space-y-1 text-sm">
          <label className="px-0 text-gray-500 uppercase text-14 font-600 dark:text-gray-400">
            Other
          </label>
          <div className="border-t border-gray-300"/>
          <div className="space-y-3">
            <div className="flex-1">
              <li className="rounded-sm">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center p-2 space-x-3 text-gray-500 rounded-md hover:text-black text-14 font-500"
                >
                  <Image
                    src="/assets/images/setting.svg"
                    alt="Setting logo"
                    width="22"
                    height="22"
                    className="mr-2 rounded-sm"
                  />
                  <span>Settings</span>
                </a>
              </li>
              <li className="rounded-sm">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center p-2 space-x-3 text-gray-500 rounded-md hover:text-black text-14 font-500"
                >
                  <Image
                    src="/assets/images/howToUse.svg"
                    alt="How to use logo"
                    width="22"
                    height="22"
                    className="mr-2 rounded-sm"
                  />
                  <span>How to Use?</span>
                </a>
              </li>
            </div>
          </div>
        </ul>
      </div>
    </div>
  )
}
