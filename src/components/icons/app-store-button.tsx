
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
        src="https://opapi.techicious.store/media/uploads/App_Store.png"
        alt="Download on the App Store"
        width={120}
        height={40}
        className="h-10 w-auto"
      />
    </div>
  );
});

AppStoreButton.displayName = "AppStoreButton";
