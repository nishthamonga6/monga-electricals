"use client";
import React from 'react';

export default function ChatTrigger({ className }: { className?: string }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent('open-assistant'))}
      className={className ?? 'text-sm px-3 py-1 rounded border border-gray-200 hover:bg-gray-50'}
      aria-label="Open chat"
      title="Chat with us"
    >
      Chat
    </button>
  );
}
