'use client'

import React, {ChangeEventHandler, useState} from 'react'


export const Textarea = ({
  className,
  value,
  rows = 5,
  placeholder,
  onChange,
}: {
  className?: string
  value?: string
  rows?: number
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
}) => {
  return (
    <textarea
      className={`text-xs border-gray-200 rounded ${className}`}
      value={value || ''}
      rows={rows}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export const HighlightableTextarea = ({
  className,
  value,
  rows = 5,
  placeholder,
  onChange,
  highlightText,
}: {
  className?: string
  value?: string
  rows?: number
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  highlightText?: string
}) => {
  const [content, setContent] = useState(value || '')

  const handleChange = (e) => {
    setContent(e.target.value)
    if (onChange) {
      onChange(e)
    }
  };

  const highlightedHtml = () => {
    if (!highlightText) {
      return content
    }
    const parts = content.split(new RegExp(`(${highlightText})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === highlightText.toLowerCase() ? (
        <span key={i} className="highlight">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return (
    <div
      className={`whitespace-pre-wrap text-xs border-gray-200 rounded ${className}`}
      style={{minHeight: `${rows * 1.2}em`, overflowWrap: 'break-word', border: '1px solid #e2e8f0', padding: '0.5em', overflowY: 'auto'}}
      contentEditable
      onInput={handleChange}
      data-placeholder={placeholder}
    >
      {highlightedHtml()}
    </div>
  )
}
