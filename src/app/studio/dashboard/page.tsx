
"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PenSquare, Briefcase, LayoutGrid, Inbox, Package } from "lucide-react";


export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 w-full !max-w-none">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Welcome to your Studio</h2>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Blog Posts
                    </CardTitle>
                    <PenSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground">
                        Manage your articles and resources.
                    </p>
                    <Button asChild size="sm" className="mt-4">
                        <Link href="/studio/posts">Manage Posts</Link>
                    </Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Portfolio Projects
                    </CardTitle>
                    <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground">
                       Showcase your best work.
                    </p>
                     <Button asChild size="sm" className="mt-4">
                        <Link href="/studio/projects">Manage Projects</Link>
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Products
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground">
                       Manage your company's products.
                    </p>
                     <Button asChild size="sm" className="mt-4">
                        <Link href="/studio/products">Manage Products</Link>
                    </Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Job Openings
                    </CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground">
                        Find your next great hire.
                    </p>
                     <Button asChild size="sm" className="mt-4">
                        <Link href="/studio/jobs">Manage Jobs</Link>
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Messages
                    </CardTitle>
                    <Inbox className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground">
                        View messages from your contact form.
                    </p>
                     <Button asChild size="sm" className="mt-4">
                        <Link href="/studio/messages">View Messages</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
  );
}
