
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

export const AppStoreButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("inline-block", className)} {...props}>
      <Image
        src="https://cdn.jsdelivr.net/gh/devmastery/badges@main/app-store-badge.svg"
        alt="Download on the App Store"
        width={120} 
        height={40} 
        className="h-10 w-auto"
      />
    </div>
  );
});

AppStoreButton.displayName = "AppStoreButton";
