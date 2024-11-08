import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Quick Start Guide - DApp Builder",
  description: "Get started with DApp Builder in minutes",
};

export default function QuickStartPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Quick Start Guide
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Start building your first decentralized application in minutes
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Prerequisites
          </h2>
          <div className="space-y-2">
            <p className="leading-7">Before you begin, make sure you have:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>A Web3 wallet (like MetaMask) installed</li>
              <li>Some test ETH on your preferred testnet</li>
              <li>Basic understanding of blockchain concepts</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Step 1: Connect Your Wallet
          </h2>
          <div className="space-y-2">
            <p className="leading-7">
              Click the "Connect Wallet" button in the navigation bar to connect your Web3 wallet.
              Make sure you're on one of our supported networks:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Ethereum Mainnet</li>
              <li>Sepolia Testnet</li>
              <li>Goerli Testnet</li>
              <li>Mumbai Testnet</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Step 2: Choose Your Builder
          </h2>
          <div className="space-y-4">
            <p className="leading-7">
              Select the type of DApp you want to create:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Link href="/dapps/token-creator">
                <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium mb-2">Token Creator</h3>
                  <p className="text-sm text-muted-foreground">
                    Create custom tokens with various features
                  </p>
                </div>
              </Link>
              <Link href="/dapps/token-sale">
                <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium mb-2">Token Sale</h3>
                  <p className="text-sm text-muted-foreground">
                    Launch your token sale with customizable parameters
                  </p>
                </div>
              </Link>
              <Link href="/dapps/airdrop">
                <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium mb-2">Airdrop</h3>
                  <p className="text-sm text-muted-foreground">
                    Distribute tokens to multiple addresses efficiently
                  </p>
                </div>
              </Link>
              <Link href="/dapps/exchange">
                <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium mb-2">Exchange</h3>
                  <p className="text-sm text-muted-foreground">
                    Create your own token exchange
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Step 3: Configure Your DApp
          </h2>
          <p className="leading-7">
            Each builder has its own configuration options. Follow the step-by-step
            guide within each builder to customize your DApp according to your needs.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Step 4: Deploy
          </h2>
          <div className="space-y-2">
            <p className="leading-7">
              Once configured, deploy your DApp to your chosen network:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Testnet deployments are completely free</li>
              <li>Mainnet deployments require a small fee</li>
              <li>Review your smart contract before deployment</li>
              <li>Ensure you have enough gas for deployment</li>
            </ul>
          </div>
        </section>

        <div className="flex gap-4">
          <Button asChild>
            <Link href="/dapps">
              Start Building
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs">View Full Documentation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}