"use client";
import { useEffect } from 'react';

export default function GoogleAnalytics() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_GA_ID;
    if (!id) return;

    // inject gtag script
    const s1 = document.createElement('script');
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    s1.async = true;
    document.head.appendChild(s1);

    const s2 = document.createElement('script');
    s2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${id}');`;
    document.head.appendChild(s2);

    return () => {
      try { document.head.removeChild(s1); document.head.removeChild(s2); } catch (e) {}
    };
  }, []);

  return null;
}
