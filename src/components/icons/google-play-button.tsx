
import { cn } from "@/lib/utils";
import * as React from "react";

export const GooglePlayButton = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(({ className, ...props }, ref) => {
  return (
    <svg 
        ref={ref}
        className={cn("h-10 w-auto", className)}
        viewBox="0 0 135 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect width="135" height="40" rx="5" fill="black"/>
        <path d="M18.33 6.91l-7.24 7.24v11.69l7.24 7.24 16.5-11.08-9.26-7.85z" fill="#00A04D"/>
        <path d="M11.09 14.15l7.24-7.24 9.26 7.85-7.2 7.15z" fill="#00D263"/>
        <path d="M34.83 20l-16.5 11.08 7.2-7.15 2.06-2.07z" fill="#007E3A"/>
        <path d="M11.09 25.85l7.24 7.24 9.26-7.85-7.2-7.15z" fill="#00C058"/>
        <text x="45" y="18" fontFamily="Arial, sans-serif" fontSize="8" fill="white">GET IT ON</text>
        <text x="45" y="30" fontFamily="Arial-BoldMT, Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">Google Play</text>
    </svg>
  );
});

GooglePlayButton.displayName = "GooglePlayButton";
