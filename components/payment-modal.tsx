"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { makePayment, connectWallet, isTestNetwork, SUPPORTED_NETWORKS } from "@/lib/web3";
import { supabase } from "@/lib/supabase";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  serviceType: "token_sale" | "airdrop" | "exchange" | "auth";
  serviceId?: string;
  onSuccess: () => void;
}

export function PaymentModal({
  open,
  onClose,
  serviceType,
  serviceId,
  onSuccess,
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const prices = {
    token_sale: 0.02,
    airdrop: 0.02,
    exchange: 0.02,
    auth: 0.02,
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { chainId } = await connectWallet();
      
      // If on testnet, skip payment
      if (isTestNetwork(chainId)) {
        toast({
          title: "Testnet Detected",
          description: "Building on testnet is free! Proceeding with deployment.",
        });
        onSuccess();
        onClose();
        return;
      }

      const amount = prices[serviceType];
      const tx = await makePayment(amount);
      
      const { error } = await supabase.from("payments").insert({
        amount_eth: amount,
        tx_hash: tx.hash,
        status: "pending",
        service_type: serviceType,
        service_id: serviceId,
      });

      if (error) throw error;

      toast({
        title: "Payment successful",
        description: "Your transaction has been processed.",
      });

      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: "Payment failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            Building on testnets is completely free! For mainnet deployments, 
            a one-time fee of {prices[serviceType]} ETH (~$50) is required.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="text-sm">Service: {serviceType.replace("_", " ").toUpperCase()}</div>
            <div className="text-2xl font-bold">{prices[serviceType]} ETH</div>
            <div className="text-sm text-muted-foreground">Free on all testnets</div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p className="font-medium">Supported Testnets:</p>
            <ul className="list-disc list-inside mt-2">
              {Object.values(SUPPORTED_NETWORKS)
                .filter(network => !network.isPaid)
                .map(network => (
                  <li key={network.chainId}>{network.name}</li>
                ))}
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handlePayment} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}