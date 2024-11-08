"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, FileCode2, Gift, Coins, Repeat } from "lucide-react";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const sidebarItems = [
    {
      title: "Getting Started",
      icon: Book,
      items: [
        { href: "/docs", title: "Introduction" },
        { href: "/docs/quickstart", title: "Quick Start Guide" },
        { href: "/docs/wallet-setup", title: "Wallet Setup" },
      ],
    },
    {
      title: "Token Sale Builder",
      icon: Coins,
      items: [
        { href: "/docs/token-sale/overview", title: "Overview" },
        { href: "/docs/token-sale/creation", title: "Creating a Token Sale" },
        { href: "/docs/token-sale/configuration", title: "Configuration Options" },
        { href: "/docs/token-sale/deployment", title: "Deployment" },
      ],
    },
    {
      title: "Airdrop Builder",
      icon: Gift,
      items: [
        { href: "/docs/airdrop/overview", title: "Overview" },
        { href: "/docs/airdrop/creation", title: "Creating an Airdrop" },
        { href: "/docs/airdrop/distribution", title: "Distribution Settings" },
        { href: "/docs/airdrop/execution", title: "Executing Airdrops" },
      ],
    },
    {
      title: "Token Exchange Builder",
      icon: Repeat,
      items: [
        { href: "/docs/exchange/overview", title: "Overview" },
        { href: "/docs/exchange/creation", title: "Creating an Exchange" },
        { href: "/docs/exchange/liquidity", title: "Managing Liquidity" },
        { href: "/docs/exchange/trading", title: "Trading Interface" },
      ],
    },
    {
      title: "Smart Contract Templates",
      icon: FileCode2,
      items: [
        { href: "/docs/templates/overview", title: "Available Templates" },
        { href: "/docs/templates/customization", title: "Customization" },
        { href: "/docs/templates/security", title: "Security Features" },
      ],
    },
  ];

  return (
    <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <ScrollArea className="py-6 pr-6 lg:py-8">
          <div className="flex flex-col space-y-4">
            {sidebarItems.map((section) => (
              <div key={section.title} className="space-y-3">
                <div className="flex items-center gap-2 px-4 text-sm font-semibold">
                  <section.icon className="h-4 w-4" />
                  {section.title}
                </div>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-md px-8 py-2 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_200px]">
        <div className="mx-auto w-full min-w-0">
          <div className="space-y-2">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}