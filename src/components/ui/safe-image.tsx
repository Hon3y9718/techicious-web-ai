"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallback?: string | null;
}

export function SafeImage({ src, fallback = "/images/fallback/blog-hero.svg", ...props }: SafeImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    if (!fallback) return null;
    return <Image {...props} src={fallback} />;
  }

  return <Image {...props} src={src} onError={() => setErrored(true)} />;
}
