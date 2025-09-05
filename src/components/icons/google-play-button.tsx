
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
      <g clipPath="url(#clip0_10_2)">
        <path d="M19.4361 20.0002L9.27344 9.83752V30.1625L19.4361 20.0002Z" fill="#FFD966"/>
        <path d="M22.9365 23.499L20.4852 21.0477L19.4363 20L9.27344 30.1627V9.83738L19.4363 20L20.4852 21.0477L21.534 22.0954C22.2339 21.3956 22.9365 23.499 22.9365 23.499Z" fill="#F44336"/>
        <path d="M22.9364 16.5009C22.9364 16.5009 22.2338 18.6043 21.5339 17.9045L20.4851 18.9522L9.27344 9.8374V9.8374L22.9364 16.5009Z" fill="#4CAF50"/>
        <path d="M9.27344 9.83752V30.1625L19.4361 20.0002L9.27344 9.83752Z" fill="url(#paint0_linear_10_2)"/>
        <path d="M22.9365 16.5012V23.5012L19.4362 20.0012L22.9365 16.5012Z" fill="#2196F3"/>
      </g>
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
      <defs>
        <linearGradient id="paint0_linear_10_2" x1="9.27344" y1="20.0002" x2="19.986" y2="20.0002" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.25"/>
            <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <clipPath id="clip0_10_2">
            <rect x="9.27344" y="9.8374" width="20.3252" height="20.3252" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
});

GooglePlayButton.displayName = "GooglePlayButton";
