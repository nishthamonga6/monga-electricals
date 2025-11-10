"use client";
import React, { useState, useEffect } from 'react';
import AssistantModal from './AssistantModal';

export default function AssistantButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        aria-label="Open assistant"
        title="Ask (AI) assistant"
        onClick={() => setOpen(true)}
        className="sr-only"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </button>
      <AssistantModal isOpen={open} onClose={() => setOpen(false)} />
      
      {/**
       * Listen for the custom 'open-assistant' event dispatched by FloatingActions
       */}
      <EventListenerHook onOpen={() => setOpen(true)} />
    </>
  );
}

function EventListenerHook({ onOpen }: { onOpen: () => void }) {
  useEffect(() => {
    const handler = () => onOpen();
    window.addEventListener('open-assistant', handler as EventListener);
    return () => window.removeEventListener('open-assistant', handler as EventListener);
  }, [onOpen]);
  return null;
}
