"use client";
import React from "react";

type Props = {
  pageUrl?: string;
};

export default function FacebookLatest({
  pageUrl = "https://www.facebook.com/MongaElectricalsSirsa1/",
}: Props) {
  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    pageUrl
  )}&tabs=timeline&width=340&height=420&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=`;

  return (
    <div className="hidden md:block absolute right-6 top-6 w-80 z-30">
      <div className="bg-white/95 text-black rounded-lg shadow-lg overflow-hidden">
        <div className="px-4 py-2 border-b">
          <div className="font-semibold">Latest from Facebook</div>
          <div className="text-xs text-gray-600">Monga Electricals</div>
        </div>
        <div className="w-full h-[360px]">
          <iframe
            title="Monga Electricals Facebook timeline"
            src={src}
            width="100%"
            height="100%"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            loading="lazy"
            aria-label="Facebook timeline"
          />
        </div>
        <div className="px-3 py-2 border-t text-sm bg-white/90">
          <a
            href={pageUrl}
            target="_blank"
            rel="noreferrer"
            className="text-accent font-medium"
          >
            Visit our Facebook page
          </a>
        </div>
      </div>
    </div>
  );
}
