
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
import { LogOut } from "lucide-react";
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
        const { state, toggleSidebar } = useSidebar();
        return (
            <div className="flex items-center justify-between p-2">
                {state === "collapsed" ? (
                    <SidebarTrigger onClick={toggleSidebar} />
                ) : (
                    <>
                        <Link href="/" className="flex items-center gap-2">
                            <span className="font-bold text-lg font-headline">Techicious</span>
                        </Link>
                        <SidebarTrigger onClick={toggleSidebar} />
                    </>
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


    return (
        <div className="min-h-screen w-full">
            <SidebarProvider>
                <div className="flex h-screen w-full"> {/* <-- ensure full height */}
                    <Sidebar className="h-full">    {/* <-- make sidebar fill */}
                        <SidebarHeader>
                            <SidebarTop />
                        </SidebarHeader>
                        <SidebarContent className="flex-1 overflow-y-auto">
                            <StudioSidebar />
                        </SidebarContent>
                        <StudioSidebarFooter logout={logout} />
                    </Sidebar>
                    <div className="flex-1 overflow-auto bg-background w-full">
                        <main className="h-full p-4">{children}</main>
                    </div>
                </div>
            </SidebarProvider>
        </div>
    );

}
