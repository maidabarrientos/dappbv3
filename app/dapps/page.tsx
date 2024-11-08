import { Card } from "@/components/ui/card";
import { Coins, Gift, Repeat, FileCode2 } from "lucide-react";
import Link from "next/link";

export default function DappsPage() {
  const builders = [
    {
      title: "Token Creator",
      description: "Create custom tokens with various features",
      icon: FileCode2,
      href: "/dapps/token-creator",
    },
    {
      title: "Token Sale Builder",
      description: "Create and manage token sales with customizable parameters",
      icon: Coins,
      href: "/dapps/token-sale",
    },
    {
      title: "Airdrop Builder",
      description: "Distribute tokens to multiple addresses efficiently",
      icon: Gift,
      href: "/dapps/airdrop",
    },
    {
      title: "Exchange Builder",
      description: "Build your own decentralized token exchange",
      icon: Repeat,
      href: "/dapps/exchange",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">DApp Builders</h1>
        <p className="text-muted-foreground mt-2">
          Create blockchain applications without code using our builders
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {builders.map((builder) => (
          <Link key={builder.href} href={builder.href}>
            <Card className="p-6 hover:bg-muted/50 transition-colors">
              <builder.icon className="h-8 w-8 mb-4" />
              <h2 className="font-semibold mb-2">{builder.title}</h2>
              <p className="text-sm text-muted-foreground">
                {builder.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}