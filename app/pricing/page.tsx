import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing - DApp Builder",
  description: "Simple, transparent pricing for all your DApp building needs",
};

const plans = [
  {
    name: "Token Sale Builder",
    price: "0.02 ETH",
    usdPrice: "$50",
    description: "Create and manage token sales with customizable parameters",
    features: [
      "Custom token creation",
      "Multiple sale rounds",
      "Whitelist management",
      "KYC integration",
      "Vesting schedules",
      "Real-time analytics",
    ],
    href: "/dapps/token-sale",
  },
  {
    name: "Airdrop Builder",
    price: "0.02 ETH",
    usdPrice: "$50",
    description: "Distribute tokens to multiple addresses efficiently",
    features: [
      "Bulk distribution",
      "Merkle tree airdrops",
      "CSV/JSON import",
      "Automated verification",
      "Distribution tracking",
      "Gas optimization",
    ],
    href: "/dapps/airdrop",
  },
  {
    name: "Exchange Builder",
    price: "0.02 ETH",
    usdPrice: "$50",
    description: "Build your own decentralized token exchange",
    features: [
      "Liquidity pools",
      "Token swaps",
      "Price feeds",
      "Trading interface",
      "Fee management",
      "Analytics dashboard",
    ],
    href: "/dapps/exchange",
  },
];

export default function PricingPage() {
  return (
    <div className="container py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground mt-4">
          Pay once, build unlimited DApps
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <p className="text-muted-foreground mt-2">{plan.description}</p>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground"> (~{plan.usdPrice}) / project</span>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="mt-auto" asChild>
              <Link href={plan.href}>Get Started</Link>
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Custom Enterprise Solutions</h2>
        <p className="text-muted-foreground mb-6">
          Need a custom solution? Contact us for enterprise pricing and features.
        </p>
        <Button variant="outline" asChild>
          <Link href="/contact">Contact Sales</Link>
        </Button>
      </div>
    </div>
  );
}