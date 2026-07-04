import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const DEAD_HOSTS = ['opapi.techicious.store'];

export function sanitizeImageUrl(url: string | null | undefined, fallback: string): string {
  if (!url) return fallback;
  try {
    const { hostname } = new URL(url);
    if (DEAD_HOSTS.includes(hostname)) return fallback;
  } catch {
    return fallback;
  }
  return url;
}
