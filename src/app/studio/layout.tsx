
"use client";

import {
    Sidebar,
    SidebarProvider,
    SidebarTrigger,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    useSidebar,
} from "@/components/ui/sidebar";
import { LogOut, PanelLeft } from "lucide-react";
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

    const SidebarTop = () => {
        const { state } = useSidebar();
        return (
            <div className="flex items-center justify-between p-2">
                {state === "expanded" && (
                     <Link href="/" className="flex items-center gap-2">
                        <span className="font-bold text-lg font-headline">Techicious</span>
                    </Link>
                )}
            </div>
        );
    };

    function StudioSidebarFooter({ logout }: { logout: () => void }) {
        const { state } = useSidebar();

        return (
            <SidebarFooter>
                <Button
                    variant="ghost"
                    onClick={logout}
                    className="w-full justify-start gap-2"
                >
                    <LogOut className="h-4 w-4" />
                    {state !== "collapsed" && <span>Logout</span>}
                </Button>
            </SidebarFooter>
        );
    }
    
    
    function MainHeader() {
        const { toggleSidebar } = useSidebar();
        return (
            <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={toggleSidebar}
                >
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
            </header>
        )
    }


    return (
        <div className="min-h-screen w-full">
            <SidebarProvider>
                <div className="flex h-screen w-full">
                    <Sidebar className="h-full">
                        <SidebarHeader>
                            <SidebarTop />
                        </SidebarHeader>
                        <SidebarContent className="flex-1 overflow-y-auto">
                            <StudioSidebar />
                        </SidebarContent>
                        <StudioSidebarFooter logout={logout} />
                    </Sidebar>
                    <div className="flex-1 overflow-auto bg-background w-full flex flex-col">
                        <MainHeader />
                        <main className="h-full p-4">{children}</main>
                    </div>
                </div>
            </SidebarProvider>
        </div>
    );

}
