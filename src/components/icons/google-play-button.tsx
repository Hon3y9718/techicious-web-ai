
import { cn } from "@/lib/utils";
import * as React from "react";

export const GooglePlayButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-lg bg-black px-3 text-white",
        className
      )}
      {...props}
    >
      <svg viewBox="0 0 512 512" className="h-6 w-6 shrink-0" aria-hidden="true">
        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" fill="#00d9ff" />
        <path d="M47 0c-4.6 2.4-7 7.4-7 14.4v483.2c0 7 2.4 12 7 14.4l268.5-268.5L47 0z" fill="#00f076" />
        <path d="M414.9 224.7l-49.5-28.5-63.5 63.5 63.5 63.5 49.9-28.5c15-8.7 15-33.6 0-42.4v-27.6z" fill="#ffbc00" />
        <path d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z" fill="#ff3a44" />
      </svg>
      <div className="flex flex-col items-start leading-none">
        <span className="text-[10px] leading-tight">GET IT ON</span>
        <span className="text-lg font-semibold leading-tight">Google Play</span>
      </div>
    </div>
  );
});

GooglePlayButton.displayName = "GooglePlayButton";
