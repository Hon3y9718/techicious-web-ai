
"use client";

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { LayoutDashboard, PenSquare, LayoutGrid, Briefcase, Inbox, Package } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { href: "/studio/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/studio/posts", label: "Posts", icon: PenSquare },
  { href: "/studio/projects", label: "Projects", icon: LayoutGrid },
  { href: "/studio/products", label: "Products", icon: Package },
  { href: "/studio/jobs", label: "Jobs", icon: Briefcase },
  { href: "/studio/messages", label: "Messages", icon: Inbox },
];

export default function StudioSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <SidebarMenu>
      {navLinks.map((link) => (
        <SidebarMenuItem key={link.href}>
            <Link href={link.href} className="w-full">
                <SidebarMenuButton isActive={pathname.startsWith(link.href)} tooltip={link.label}>
                    <link.icon className="h-4 w-4" />
                    {state === 'expanded' && <span>{link.label}</span>}
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
