"use client";
import React from 'react';

export default function FloatingActions() {
  const phone = '919802200043';
  const message = encodeURIComponent('Hello Monga Electricals, I need assistance');
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col-reverse sm:flex-col gap-3">
      {/* WhatsApp */}
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
        <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-150">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.5 3.5L3.5 20.5V24L7.5 20H8C11 20 14.5 18 16.5 16" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.5 12C17.5 15.5899 14.0899 18.5 10.5 18.5C7.31066 18.5 4.71928 16.3815 4.13293 13.3851C4.02195 12.7258 4.41298 12.0985 5.07404 11.9183L7.25 11.2529C7.47255 11.1958 7.71046 11.23 7.90687 11.3435C9.13786 12.0266 10.9641 12.6476 12.5 12.5C13.9397 12.3589 15.3918 11.7 16.5 10.5C16.6356 10.3605 16.7952 10.2421 16.97 10.1496C17.5116 9.77692 17.5 10.5 17.5 12Z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </a>

      {/* Assistant */}
      <button aria-label="Open assistant" title="Ask assistant" onClick={() => window.dispatchEvent(new CustomEvent('open-assistant'))} className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </button>
    </div>
  );
}
