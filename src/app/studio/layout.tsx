
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
    <div className="pt-16">
        <SidebarProvider className="mt-5">
          <Sidebar>
              <SidebarHeader>
                  <div className="flex items-center justify-between">
                      <Link href="/" className="flex items-center">
                          <span className="font-bold text-lg font-headline">Techicious</span>
                      </Link>
                      <SidebarTrigger />
                  </div>
              </SidebarHeader>
              <SidebarContent>
                  <StudioSidebar />
              </SidebarContent>
              <SidebarFooter>
                  <Button variant="ghost" onClick={logout}>Logout</Button>
              </SidebarFooter>
          </Sidebar>
          <SidebarInset className="overflow-y-auto p-6">
              {children}
          </SidebarInset>
        </SidebarProvider>
    </div>
  );
}
