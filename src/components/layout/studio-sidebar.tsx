
"use client";

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutDashboard, PenSquare, LayoutGrid, Briefcase } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { href: "/studio/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/studio/posts", label: "Posts", icon: PenSquare },
  { href: "/studio/projects", label: "Projects", icon: LayoutGrid },
  { href: "/studio/jobs", label: "Jobs", icon: Briefcase },
];

export default function StudioSidebar() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navLinks.map((link) => (
        <SidebarMenuItem key={link.href}>
            <Link href={link.href} className="w-full">
                <SidebarMenuButton isActive={pathname === link.href}>
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
