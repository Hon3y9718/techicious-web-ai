
"use client";

import { Sidebar, SidebarProvider, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import StudioSidebar from "@/components/layout/studio-sidebar";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function StudioHeader() {
    const { state } = useSidebar();
    return (
        <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <div className="md:hidden">
                <SidebarTrigger />
            </div>
            <div className="hidden md:block">
                {state === 'collapsed' && <SidebarTrigger />}
            </div>
             <div className="flex items-center gap-2">
                 <Link href="/" className="flex items-center">
                    <span className="font-bold text-lg font-headline">Techicious</span>
                 </Link>
                 <span className="text-muted-foreground">/</span>
                <h1 className="text-xl font-semibold">Studio</h1>
             </div>
        </header>
    );
}

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
                  <div className="flex items-center justify-end">
                      <SidebarTrigger className="group-data-[collapsible=icon]:hidden"/>
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
              <StudioHeader />
              <main>
                {children}
              </main>
          </SidebarInset>
        </SidebarProvider>
    </div>
  );
}
