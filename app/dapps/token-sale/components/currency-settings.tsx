"use client";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Currency {
  name: string;
  address: string;
  rate: string;
  enabled: boolean;
}

export function CurrencySettings() {
  const [currencies, setCurrencies] = useState<Currency[]>([
    { name: "ETH", address: "Native", rate: "1800", enabled: true },
    { name: "USDT", address: "", rate: "1", enabled: false },
    { name: "USDC", address: "", rate: "1", enabled: false },
  ]);
  const [useChainlink, setUseChainlink] = useState(false);
  const { toast } = useToast();

  const updateCurrency = (index: number, field: keyof Currency, value: any) => {
    const newCurrencies = [...currencies];
    newCurrencies[index] = {
      ...newCurrencies[index],
      [field]: value,
    };
    setCurrencies(newCurrencies);
  };

  const handleSave = () => {
    // Validate addresses for enabled tokens
    const invalidTokens = currencies.filter(c => 
      c.enabled && 
      c.address === "" && 
      c.name !== "ETH"
    );

    if (invalidTokens.length > 0) {
      toast({
        title: "Error",
        description: "Please provide addresses for all enabled tokens",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Currency Settings Saved",
      description: "Your currency settings have been saved successfully.",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Accepted Currencies</h2>
      
      <div className="space-y-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Currency</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Rate (USD)</TableHead>
                <TableHead>Enable</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currencies.map((currency, index) => (
                <TableRow key={currency.name}>
                  <TableCell>{currency.name}</TableCell>
                  <TableCell>
                    {currency.name === "ETH" ? (
                      "Native"
                    ) : (
                      <Input
                        placeholder="Contract Address"
                        value={currency.address}
                        onChange={(e) => updateCurrency(index, 'address', e.target.value)}
                        disabled={!currency.enabled}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={currency.rate}
                      onChange={(e) => updateCurrency(index, 'rate', e.target.value)}
                      disabled={useChainlink}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={currency.enabled}
                      onCheckedChange={(checked) => updateCurrency(index, 'enabled', checked)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-2">
          <Label>Price Feed</Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="chainlink"
              checked={useChainlink}
              onCheckedChange={setUseChainlink}
            />
            <Label htmlFor="chainlink">Use Chainlink Oracle</Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Automatically update currency rates using Chainlink price feeds
          </p>
        </div>

        <Button className="w-full" onClick={handleSave}>
          Save Currency Settings
        </Button>
      </div>
    </Card>
  );
}