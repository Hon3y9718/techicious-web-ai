
import { cn } from "@/lib/utils";
import * as React from "react";

export const AppStoreButton = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(({ className, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      className={cn("h-10 w-auto", className)}
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
        <rect width="120" height="40" rx="5" fill="black"/>
        <path d="M22.583 14.549c.866-1.066 1.34-2.33 1.34-3.693 0-.173-.007-.34-.02-.505H14.16v18.257h9.547c3.483 0 5.88-2.186 5.88-5.328 0-2.45-1.545-4.39-3.82-5.01l3.052-3.72H22.583zm-2.868 6.772v-5.263h2.384c1.65 0 2.68 1.012 2.68 2.632 0 1.62-.98 2.63-2.68 2.63h-2.384zM32.83 23.905c1.472 0 2.548.973 2.548 2.45 0 1.526-1.076 2.498-2.548 2.498-1.473 0-2.549-.972-2.549-2.498 0-1.477 1.076-2.45 2.549-2.45zm0-13.06c1.472 0 2.548.972 2.548 2.45 0 1.525-1.076 2.498-2.548 2.498-1.473 0-2.549-.973-2.549-2.498 0-1.478 1.076-2.45 2.549-2.45z" fill="#fff" />
        <text x="45" y="18" fontFamily="Arial, sans-serif" fontSize="8" fill="white">Download on the</text>
        <text x="45" y="30" fontFamily="Arial-BoldMT, Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">App Store</text>
        <path d="M12.923 11.758c.28-.01.547.169.648.433l.63 1.623c.1.265-.01.565-.252.684l-1.332.657a.38.38 0 01-.482-.16l-1.37-2.31a.379.379 0 01.107-.525l1.838-1.076a.378.378 0 01.212-.026zm-2.126 5.485c.196-.077.42-.01.55.158l1.325 1.705c.13.169.112.41-.044.558l-1.525 1.41a.378.378 0 01-.52.02l-1.63-1.43a.38.38 0 01-.05-.515l1.45-1.78a.38.38 0 01.444-.126zM7.22 13.916a.379.379 0 01.47-.075l1.624.96c.205.12.302.37.222.585l-1.01 2.766a.38.38 0 01-.54.264l-1.48-1.12a.378.378 0 01-.132-.49l1.4-2.82a.38.38 0 01.446-.27z" fill="#fff" />
    </svg>
  );
});

AppStoreButton.displayName = "AppStoreButton";
