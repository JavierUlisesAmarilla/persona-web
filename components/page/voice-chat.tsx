"use client"
import { useEffect } from 'react';

export default function VoiceChat() {
  useEffect(() => {
    console.log('VoiceChat#useEffect')
  }, [])

  return (
    <div className="z-10">VoiceChat</div>
  );
}
