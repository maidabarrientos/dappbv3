"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart3, Users, Settings, Shield } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const adminRoutes = [
    {
      title: "Overview",
      href: "/admin",
      icon: BarChart3,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Projects",
      href: "/admin/projects",
      icon: Settings,
    },
    {
      title: "Access Control",
      href: "/admin/access",
      icon: Shield,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 border-r bg-muted/10 lg:block">
        <ScrollArea className="h-full py-6">
          <div className="px-4 space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Admin Dashboard</h2>
              <p className="text-sm text-muted-foreground">
                Manage platform and users
              </p>
            </div>
            <nav className="space-y-2">
              {adminRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    pathname === route.href
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
                  )}
                >
                  <route.icon className="h-4 w-4" />
                  <span>{route.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="container py-6 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}