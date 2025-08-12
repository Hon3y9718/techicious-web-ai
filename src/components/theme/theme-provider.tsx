"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import { FlyingCreatures } from "./flying-creatures"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeWatcher />
      {children}
    </NextThemesProvider>
  )
}

function ThemeWatcher() {
  const { theme, resolvedTheme } = useTheme()
  const [creatureType, setCreatureType] = React.useState<"bats" | "birds" | null>(null)
  
  React.useEffect(() => {
    const isDark = (theme === "dark") || (theme === "system" && resolvedTheme === "dark")
    const creature = isDark ? "bats" : "birds"

    // Avoid animation on initial load
    if(theme !== undefined) {
      setCreatureType(creature)
      const timer = setTimeout(() => setCreatureType(null), 3000)
      return () => clearTimeout(timer)
    }

  }, [theme, resolvedTheme])

  return <>{creatureType && <FlyingCreatures type={creatureType} />}</>
}
