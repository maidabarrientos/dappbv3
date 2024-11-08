import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation - DApp Builder",
  description: "Learn how to build decentralized applications without code using our DApp Builder platform.",
};

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          DApp Builder Documentation
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Learn how to create powerful decentralized applications without writing code.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            What is DApp Builder?
          </h2>
          <p className="leading-7 text-muted-foreground">
            DApp Builder is a no-code platform that enables you to create, deploy, and manage
            decentralized applications without writing complex smart contracts. Our platform
            provides intuitive builders for token sales, airdrops, exchanges, and more.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Key Features
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Token Sale Builder - Create and manage token sales with customizable parameters</li>
            <li>Airdrop System - Distribute tokens to multiple addresses efficiently</li>
            <li>Token Exchange - Build your own decentralized exchange</li>
            <li>Web3 Authentication - Implement secure blockchain authentication</li>
            <li>Smart Contract Templates - Pre-audited, secure contract templates</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Getting Started
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">For Beginners</h3>
              <p className="text-sm text-muted-foreground mb-4">
                New to Web3? Start here to learn the basics and create your first DApp.
              </p>
              <Button asChild>
                <Link href="/docs/quickstart">
                  Quick Start Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">For Developers</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Experienced with Web3? Jump straight into our advanced features.
              </p>
              <Button asChild variant="secondary">
                <Link href="/docs/templates/overview">
                  Browse Templates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Support
          </h2>
          <p className="leading-7 text-muted-foreground">
            Need help? Our documentation covers everything you need to know about building
            DApps. If you can&apos;t find what you&apos;re looking for, join our community or
            contact our support team.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/docs/quickstart">View Tutorials</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/support">Get Support</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}