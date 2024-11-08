"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Coins, Gift, Repeat } from "lucide-react";

export default function DashboardPage() {
  const dapps = [
    {
      title: "Token Sale",
      description: "Create and manage token sales with customizable parameters",
      icon: Coins,
      href: "/dapps/token-sale",
    },
    {
      title: "Airdrop",
      description: "Distribute tokens to multiple addresses efficiently",
      icon: Gift,
      href: "/dapps/airdrop",
    },
    {
      title: "Token Exchange",
      description: "Build your own decentralized token exchange",
      icon: Repeat,
      href: "/dapps/exchange",
    },
  ];

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your decentralized applications
          </p>
        </div>
        <Button asChild>
          <Link href="/dapps">
            Create New DApp
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dapps.map((dapp) => (
          <Link key={dapp.href} href={dapp.href}>
            <Card className="p-6 hover:bg-muted/50 transition-colors">
              <dapp.icon className="h-8 w-8 mb-4" />
              <h2 className="font-semibold mb-2">{dapp.title}</h2>
              <p className="text-sm text-muted-foreground">
                {dapp.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}