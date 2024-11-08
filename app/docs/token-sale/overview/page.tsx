import { Metadata } from "next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Token Sale Overview - DApp Builder",
  description: "Learn about creating and managing token sales using DApp Builder.",
};

export default function TokenSaleOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Token Sale Builder Overview
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Create and manage token sales with customizable parameters and secure smart contracts.
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Before creating a token sale, ensure you have connected your wallet and have
          sufficient funds for deployment.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Features
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Multiple sale types (Public, Private, Whitelist)</li>
            <li>Customizable token metrics (Supply, Price, Vesting)</li>
            <li>Built-in KYC integration</li>
            <li>Automatic token distribution</li>
            <li>Real-time analytics dashboard</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Token Sale Types
          </h2>
          
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Public Sale
          </h3>
          <p className="leading-7 text-muted-foreground">
            Open to all participants. Set parameters like maximum contribution,
            minimum contribution, and sale duration.
          </p>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            Private Sale
          </h3>
          <p className="leading-7 text-muted-foreground">
            Restricted to specific addresses. Ideal for early investors with
            custom vesting schedules.
          </p>

          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
            Whitelist Sale
          </h3>
          <p className="leading-7 text-muted-foreground">
            Participants must be whitelisted before contributing. Includes
            features for managing allowlists and contribution limits.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Smart Contract Security
          </h2>
          <p className="leading-7 text-muted-foreground">
            Our token sale smart contracts are:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Audited by leading security firms</li>
            <li>Based on battle-tested OpenZeppelin contracts</li>
            <li>Equipped with emergency pause functionality</li>
            <li>Protected against common vulnerabilities</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Next Steps
          </h2>
          <p className="leading-7 text-muted-foreground">
            Ready to create your token sale? Follow our step-by-step guide to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Configure your token parameters</li>
            <li>Set up sale rounds</li>
            <li>Manage whitelists</li>
            <li>Deploy your smart contracts</li>
            <li>Monitor your sale progress</li>
          </ul>
        </section>
      </div>
    </div>
  );
}