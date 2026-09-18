
import { cn } from "@/lib/utils";
import * as React from "react";

export const AppStoreButton = React.forwardRef<
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
      <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 fill-current" aria-hidden="true">
        <path d="M17.05 12.536c-.022-2.24 1.83-3.318 1.913-3.37-1.04-1.522-2.664-1.73-3.24-1.755-1.378-.14-2.69.812-3.39.812-.698 0-1.78-.792-2.93-.77-1.508.022-2.9.877-3.674 2.23-1.567 2.716-.4 6.73 1.126 8.93.746 1.077 1.634 2.287 2.802 2.244 1.124-.045 1.55-.726 2.91-.726 1.36 0 1.744.726 2.933.703 1.213-.023 1.98-1.098 2.72-2.18.858-1.253 1.212-2.47 1.23-2.532-.026-.012-2.358-.906-2.38-3.586zM14.83 5.88c.62-.753 1.038-1.797.923-2.84-.892.036-1.972.594-2.61 1.347-.575.667-1.078 1.735-.943 2.755 1 .078 2.01-.507 2.63-1.262z" />
      </svg>
      <div className="flex flex-col items-start leading-none">
        <span className="text-[10px] leading-tight">Download on the</span>
        <span className="text-lg font-semibold leading-tight">App Store</span>
      </div>
    </div>
  );
});

AppStoreButton.displayName = "AppStoreButton";
