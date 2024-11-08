import { Metadata } from "next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Airdrop Overview - DApp Builder",
  description: "Learn about creating and managing token airdrops using DApp Builder.",
};

export default function AirdropOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Airdrop Builder Overview
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Distribute tokens to multiple addresses efficiently with our airdrop system.
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Ensure you have sufficient tokens and gas fees before initiating an airdrop.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Features
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Bulk token distribution</li>
            <li>CSV/JSON import support</li>
            <li>Gas-optimized smart contracts</li>
            <li>Distribution tracking</li>
            <li>Automated verification</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Airdrop Types
          </h2>
          
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Standard Airdrop
          </h3>
          <p className="leading-7 text-muted-foreground">
            Direct token distribution to multiple addresses in a single transaction.
          </p>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            Merkle Airdrop
          </h3>
          <p className="leading-7 text-muted-foreground">
            Gas-efficient distribution using Merkle proofs. Recipients claim their tokens.
          </p>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            Scheduled Airdrop
          </h3>
          <p className="leading-7 text-muted-foreground">
            Set up automated distributions at specific dates or block numbers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Verify recipient addresses before distribution</li>
            <li>Test with small amounts first</li>
            <li>Consider gas costs for large distributions</li>
            <li>Keep records of all distributions</li>
            <li>Monitor transaction status</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Getting Started
          </h2>
          <p className="leading-7 text-muted-foreground">
            To create your first airdrop:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Prepare your recipient list</li>
            <li>Choose an airdrop type</li>
            <li>Configure distribution parameters</li>
            <li>Review and confirm</li>
            <li>Monitor progress</li>
          </ul>
        </section>
      </div>
    </div>
  );
}