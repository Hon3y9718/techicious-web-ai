
"use client";

import { Sidebar, SidebarProvider, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import StudioSidebar from "@/components/layout/studio-sidebar";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
        <SidebarProvider>
          <Sidebar>
              <SidebarHeader>
                  <div className="flex items-center justify-between">
                      <Link href="/" className="flex items-center group-data-[collapsible=icon]:hidden">
                          <span className="font-bold text-lg font-headline">Techicious</span>
                      </Link>
                  </div>
              </SidebarHeader>
              <SidebarContent>
                  <StudioSidebar />
              </SidebarContent>
              <SidebarFooter>
                  <Button variant="ghost" onClick={logout} className="w-full justify-start">Logout</Button>
              </SidebarFooter>
          </Sidebar>
          <SidebarInset>
              <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <div className="md:hidden">
                    <SidebarTrigger />
                </div>
                <div className="hidden md:block">
                    <SidebarTrigger />
                </div>
                <h1 className="text-xl font-semibold">Studio</h1>
              </header>
              <main>
                {children}
              </main>
          </SidebarInset>
        </SidebarProvider>
    </div>
  );
}
