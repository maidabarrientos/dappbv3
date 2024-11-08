"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

interface DeploymentStatusProps {
  status: "pending" | "success" | "failed";
  explorerLinks?: {
    contract?: string;
    transaction?: string;
  };
  contractAddress?: string;
}

export function DeploymentStatus({
  status,
  explorerLinks,
  contractAddress,
}: DeploymentStatusProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Deployment Status</h3>
          {status === "pending" && (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          )}
          {status === "success" && (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          )}
          {status === "failed" && (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
        </div>

        {status === "success" && contractAddress && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Contract Address:</p>
            <code className="block bg-muted p-2 rounded text-sm break-all">
              {contractAddress}
            </code>
          </div>
        )}

        {status === "success" && explorerLinks && (
          <div className="flex gap-4">
            {explorerLinks.contract && (
              <Button variant="outline" asChild>
                <Link
                  href={explorerLinks.contract}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Contract
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
            {explorerLinks.transaction && (
              <Button variant="outline" asChild>
                <Link
                  href={explorerLinks.transaction}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Transaction
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        )}

        {status === "failed" && (
          <p className="text-sm text-red-500">
            Deployment failed. Please try again or check your settings.
          </p>
        )}
      </div>
    </Card>
  );
}