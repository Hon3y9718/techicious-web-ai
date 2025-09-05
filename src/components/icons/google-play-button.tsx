
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

export const GooglePlayButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("inline-block", className)} {...props}>
      <Image
        src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
        alt="Get it on Google Play"
        width={162} 
        height={48} 
        className="h-10 w-auto"
      />
    </div>
  );
});

GooglePlayButton.displayName = "GooglePlayButton";
