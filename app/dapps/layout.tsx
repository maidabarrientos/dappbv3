"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Coins, Gift, Repeat, FileCode2 } from "lucide-react";

export default function DappsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const builders = [
    {
      title: "Token Creator",
      href: "/dapps/token-creator",
      icon: FileCode2,
      description: "Create custom tokens",
    },
    {
      title: "Token Sale",
      href: "/dapps/token-sale",
      icon: Coins,
      description: "Create and manage token sales",
    },
    {
      title: "Airdrop",
      href: "/dapps/airdrop",
      icon: Gift,
      description: "Distribute tokens to multiple addresses",
    },
    {
      title: "Exchange",
      href: "/dapps/exchange",
      icon: Repeat,
      description: "Build your own token exchange",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 border-r bg-muted/10 lg:block">
        <ScrollArea className="h-full py-6">
          <div className="px-4 space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">DApp Builders</h2>
              <p className="text-sm text-muted-foreground">
                Create your blockchain applications
              </p>
            </div>
            <nav className="space-y-2">
              {builders.map((builder) => (
                <Link
                  key={builder.href}
                  href={builder.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    pathname === builder.href
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
                  )}
                >
                  <builder.icon className="h-4 w-4" />
                  <div>
                    <div className="font-medium">{builder.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {builder.description}
                    </div>
                  </div>
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