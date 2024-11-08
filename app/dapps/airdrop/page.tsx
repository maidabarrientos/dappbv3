"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NetworkSelector } from "@/components/network-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AirdropPage() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipients, setRecipients] = useState("");
  const [airdropType, setAirdropType] = useState("standard");
  const [network, setNetwork] = useState("");

  const handleNetworkChange = (chainId: string) => {
    setNetwork(chainId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Airdrop Builder</h1>
        <p className="text-muted-foreground mt-2">
          Distribute tokens to multiple addresses efficiently
        </p>
      </div>

      <Card className="p-6">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label>Network</Label>
            <NetworkSelector onNetworkChange={handleNetworkChange} />
          </div>

          <div className="space-y-2">
            <Label>Airdrop Type</Label>
            <Select value={airdropType} onValueChange={setAirdropType}>
              <SelectTrigger>
                <SelectValue placeholder="Select airdrop type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Airdrop</SelectItem>
                <SelectItem value="merkle">Merkle Airdrop</SelectItem>
                <SelectItem value="scheduled">Scheduled Airdrop</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Token Address</Label>
            <Input
              placeholder="Enter token contract address"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Recipients</Label>
            <Textarea
              placeholder="Enter addresses and amounts (one per line)&#10;Format: address,amount&#10;Example:&#10;0x123...,100&#10;0x456...,200"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              rows={6}
            />
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              Import CSV
            </Button>
            <Button variant="outline" className="flex-1">
              Import JSON
            </Button>
          </div>

          <Button className="w-full" disabled={!network}>
            Connect Wallet to Create Airdrop
          </Button>
        </form>
      </Card>
    </div>
  );
}