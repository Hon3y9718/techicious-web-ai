
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
        src="https://opapi.techicious.store/media/uploads/Google_Play.png"
        alt="Get it on Google Play"
        width={162} 
        height={48} 
        className="h-10 w-auto"
      />
    </div>
  );
});

GooglePlayButton.displayName = "GooglePlayButton";
