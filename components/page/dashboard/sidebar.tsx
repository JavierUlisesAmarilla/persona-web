/* eslint-disable jsdoc/require-returns */
"use client";

import React, { useState } from "react";
import Image from "next/image";

/**
 *
 */

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex h-screen -mt-16 w-70 flex-col p-3 dark:bg-gray-900 dark:text-gray-100">
      <div className="space-y-3 flex-grow">
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
                className="h-5 w-5 dark:text-gray-400"
              >
                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="Search"
            placeholder="Search for anything"
            className="w-full rounded-md py-2 pl-10 focus:outline-none text-gray-500 font-500 text-14::placeholder border-1 border-gray-200"
          />
        </div>
        <div className="flex-1">
          <ul className="space-y-1 pb-4 pt-2 text-sm">
            <label className="px-0 text-14 font-600 uppercase text-gray-500 dark:text-gray-400">
              General
            </label>
            <div className="border-t border-gray-300"></div>
            <li className="rounded-sm">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center space-x-3 rounded-md p-2 hover:text-black text-gray-500 text-14 font-500"
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
                className="flex items-center space-x-3 rounded-md p-2 hover:text-black text-gray-500 text-14 font-500"
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
                className="flex items-center space-x-3 rounded-md p-2 hover:text-black text-gray-500 text-14 font-500"
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
                className="flex items-center space-x-3 rounded-md p-2 hover:text-black text-gray-500 text-14 font-500"
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
                className="flex items-center space-x-3 rounded-md p-2 hover:text-black text-gray-500 text-14 font-500"
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
      <div className="mt-auto items-center space-x-4 justify-self-end">
        <ul className="space-y-1 pb-4 pt-2 text-sm">
          <label className="px-0 text-14 font-600 uppercase text-gray-500 dark:text-gray-400">
            Other
          </label>
          <div className="border-t border-gray-300"></div>
          <div className="space-y-3">
            <div className="flex-1">
              <li className="rounded-sm">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center space-x-3 rounded-md p-2 hover:text-black text-gray-500 text-14 font-500"
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
                  className="flex items-center space-x-3 rounded-md p-2 hover:text-black text-gray-500 text-14 font-500"
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
  );
}
