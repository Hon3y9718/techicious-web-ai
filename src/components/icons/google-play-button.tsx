
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
      <rect width="135" height="40" rx="5" fill="black" />
      <path
        d="M27.032 19.34L11.237 3.545a1.25 1.25 0 00-2.028.981v27.948a1.25 1.25 0 002.028.98L27.032 20.66a1.25 1.25 0 000-1.32z"
        fill="#FFD966"
      />
      <path
        d="M9.209 4.526a1.25 1.25 0 00-1.056 1.875l7.96 13.785-7.96 13.785a1.25 1.25 0 001.056 1.875l9.742-5.625H9.21z"
        fill="#2196F3"
      />
       <path
        d="M27.032 19.34l-9.923-5.664-7.872 13.804 7.872 4.456 9.923-5.732a1.25 1.25 0 000-1.32z"
        fill="#4CAF50"
      />
      <path
        d="M18.89 25.17l-9.68-5.626a1.25 1.25 0 00-1.057 1.875l.178.308 3.562 6.17-3.563 6.17-.178.307a1.25 1.25 0 001.057 1.875l9.68-5.625v-11.25z"
        fill="#F44336"
      />
      <text x="45" y="18" fontFamily="Arial, sans-serif" fontSize="8" fill="white">
        GET IT ON
      </text>
      <text
        x="45"
        y="30"
        fontFamily="Arial-BoldMT, Arial, sans-serif"
        fontSize="14"
        fontWeight="bold"
        fill="white"
      >
        Google Play
      </text>
    </svg>
  );
});

GooglePlayButton.displayName = "GooglePlayButton";
