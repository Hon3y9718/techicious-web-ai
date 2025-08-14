
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Pencil, LogOut, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme/theme-toggle";
import { useAuth } from "@/context/auth-context";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center">
            <span className="font-bold text-2xl font-headline">Techicious</span>
          </Link>
        </div>

        <div className="flex w-full items-center justify-between md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="px-2 py-6">
                  <Link href="/" className="flex items-center space-x-2 mb-8">
                     <span className="font-bold text-2xl font-headline">Techicious</span>
                  </Link>
                  <div className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                            "text-lg font-medium transition-colors hover:text-primary",
                             pathname === link.href ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                     {user && (
                      <Button variant="ghost" onClick={() => { logout(); setIsMenuOpen(false);}} className="justify-start text-lg font-medium text-muted-foreground">
                        <LogOut className="mr-2 h-5 w-5" />
                        Logout
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          
            <Link href="/" className="flex items-center">
              <span className="font-bold text-2xl font-headline">Techicious</span>
            </Link>

            <ThemeToggle />
        </div>

        <nav className="hidden md:flex flex-1 justify-end items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/studio/write">
                <Button variant="outline" size="sm">
                    <Pencil className="mr-2 h-4 w-4" />
                    Write
                </Button>
              </Link>
               <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
             <Link href="/login">
                <Button variant="outline" size="sm">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                </Button>
              </Link>
          )}

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
