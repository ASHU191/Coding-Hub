"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, Users, Calendar, FileText, Settings, Home, LogOut, Inbox } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const routes = [
    {
      title: "Dashboard",
      icon: BarChart,
      href: "/admin",
      isActive: pathname === "/admin",
    },
    {
      title: "Hackathons",
      icon: Calendar,
      href: "/admin/hackathons",
      isActive: pathname === "/admin/hackathons",
    },
    {
      title: "Submissions",
      icon: Inbox,
      href: "/admin/submissions",
      isActive: pathname === "/admin/submissions",
    },
    {
      title: "Users",
      icon: Users,
      href: "/admin/users",
      isActive: pathname === "/admin/users",
    },
    {
      title: "Resources",
      icon: FileText,
      href: "/admin/resources",
      isActive: pathname === "/admin/resources",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/admin/settings",
      isActive: pathname === "/admin/settings",
    },
  ]

  return (
    <Sidebar className="border-r border-primary/10 bg-card-gradient">
      <SidebarHeader className="flex flex-col items-center justify-center p-4">
        <Link href="/" className="flex items-center space-x-2 mb-6 group">
          <span className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300">
            GeeksCode
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route, index) => (
            <SidebarMenuItem
              key={route.href}
              className="animate-slide-in-right opacity-0"
              style={{ animationDelay: `${0.1 * index}s`, animationFillMode: "forwards" }}
            >
              <SidebarMenuButton
                asChild
                isActive={route.isActive}
                className="transition-all duration-300 hover:bg-primary/10 data-[active=true]:bg-primary/20 data-[active=true]:text-primary"
              >
                <Link href={route.href}>
                  <route.icon className="h-5 w-5" />
                  <span>{route.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem
            className="animate-slide-up opacity-0"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <SidebarMenuButton asChild className="transition-all duration-300 hover:bg-primary/10">
              <Link href="/">
                <Home className="h-5 w-5" />
                <span>Back to Website</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem
            className="animate-slide-up opacity-0"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            <SidebarMenuButton onClick={() => logout()} className="transition-all duration-300 hover:bg-primary/10">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

