/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsdoc/require-returns */
import React, {ReactNode} from 'react'
import ReactMarkdown from 'react-markdown'
import Balancer from 'react-wrap-balancer'


/**
 *
 */
export default function Card({
  title,
  description,
  demo,
  large,
}: {
  title: string;
  description: string;
  demo: ReactNode;
  large?: boolean;
}) {
  return (
    <div
      className={`relative col-span-1 h-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md ${
        large ? 'md:col-span-2' : ''
      }`}
    >
      <div className="flex items-center justify-center h-60">{demo}</div>
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-xl font-bold text-transparent bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display md:text-3xl md:font-normal">
          <Balancer>{title}</Balancer>
        </h2>
        <div className="-mt-2 leading-normal prose-sm text-gray-500 md:prose">
          <Balancer>
            <ReactMarkdown
              components={{
                a: ({node, ...props}) => (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                    className="font-medium text-gray-800 underline transition-colors"
                  />
                ),
                code: ({node, ...props}) => (
                  <code
                    {...props}
                    // @ts-ignore (to fix "Received `true` for a non-boolean attribute `inline`." warning)
                    inline="true"
                    className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono font-medium text-gray-800"
                  />
                ),
              }}
            >
              {description}
            </ReactMarkdown>
          </Balancer>
        </div>
      </div>
    </div>
  )
}
