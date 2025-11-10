"use client";
import { useEffect } from 'react';

type Props = {
  pageUrl: string;
  width?: number | string;
  height?: number | string;
  tabs?: string; // timeline, events, messages
  hideCover?: boolean;
  showFacepile?: boolean;
};

export default function FacebookPage({
  pageUrl,
  width = "100%",
  height = 600,
  tabs = "timeline",
  hideCover = false,
  showFacepile = true,
}: Props) {
  useEffect(() => {
    // Load Facebook SDK if not loaded
    if (!(window as any).FB) {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v20.0';
      document.body.appendChild(script);
      script.onload = () => {
        (window as any).FB?.XFBML?.parse();
      };
    } else {
      (window as any).FB?.XFBML?.parse();
    }
  }, [pageUrl, tabs, hideCover, showFacepile, width, height]);

  return (
    <div className="w-full overflow-hidden rounded-md border">
      <div
        className="fb-page"
        data-href={pageUrl}
        data-tabs={tabs}
        data-width={typeof width === 'number' ? String(width) : width}
        data-height={typeof height === 'number' ? String(height) : height}
        data-hide-cover={hideCover}
        data-show-facepile={showFacepile}
      >
        <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
          <a href={pageUrl}>Facebook Page</a>
        </blockquote>
      </div>
    </div>
  );
}
