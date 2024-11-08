"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NetworkSelector } from "@/components/network-selector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftRight, Plus } from "lucide-react";

export default function ExchangePage() {
  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("");

  const handleNetworkChange = (chainId: string) => {
    setNetwork(chainId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Exchange Builder</h1>
        <p className="text-muted-foreground mt-2">
          Create your own decentralized token exchange
        </p>
      </div>

      <div className="space-y-4">
        <Card className="p-6">
          <div className="space-y-4">
            <Label>Network</Label>
            <NetworkSelector onNetworkChange={handleNetworkChange} />
          </div>
        </Card>

        <Tabs defaultValue="swap" className="space-y-4">
          <TabsList>
            <TabsTrigger value="swap">Swap</TabsTrigger>
            <TabsTrigger value="pool">Liquidity Pool</TabsTrigger>
          </TabsList>

          <TabsContent value="swap" className="space-y-4">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>From</Label>
                  <Input
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <Input
                    placeholder="Token Address"
                    value={tokenA}
                    onChange={(e) => setTokenA(e.target.value)}
                  />
                </div>

                <div className="flex justify-center">
                  <Button variant="ghost" size="icon">
                    <ArrowLeftRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>To (Estimated)</Label>
                  <Input placeholder="0.0" disabled />
                  <Input
                    placeholder="Token Address"
                    value={tokenB}
                    onChange={(e) => setTokenB(e.target.value)}
                  />
                </div>

                <Button className="w-full" disabled={!network}>
                  Connect Wallet to Swap
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="pool" className="space-y-4">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Token A</Label>
                  <Input
                    placeholder="Token Address"
                    value={tokenA}
                    onChange={(e) => setTokenA(e.target.value)}
                  />
                  <Input placeholder="Amount" />
                </div>

                <div className="flex justify-center">
                  <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Token B</Label>
                  <Input
                    placeholder="Token Address"
                    value={tokenB}
                    onChange={(e) => setTokenB(e.target.value)}
                  />
                  <Input placeholder="Amount" />
                </div>

                <Button className="w-full" disabled={!network}>
                  Connect Wallet to Add Liquidity
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}