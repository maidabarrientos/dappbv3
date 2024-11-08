"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TokenFormProps {
  tokenData: {
    name: string;
    symbol: string;
    decimals: string;
    totalSupply: string;
    standard: string;
    features: {
      burnable: boolean;
      mintable: boolean;
      pausable: boolean;
      permit: boolean;
      votes: boolean;
    };
  };
  setTokenData: (data: any) => void;
}

export default function TokenForm({ tokenData, setTokenData }: TokenFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!tokenData.name.trim()) {
      newErrors.name = "Token name is required";
    }

    if (!tokenData.symbol.trim()) {
      newErrors.symbol = "Token symbol is required";
    } else if (tokenData.symbol.length > 11) {
      newErrors.symbol = "Symbol must be 11 characters or less";
    }

    if (!tokenData.totalSupply || Number(tokenData.totalSupply) <= 0) {
      newErrors.totalSupply = "Total supply must be greater than 0";
    }

    if (!tokenData.decimals || Number(tokenData.decimals) < 0 || Number(tokenData.decimals) > 18) {
      newErrors.decimals = "Decimals must be between 0 and 18";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFeatureChange = (feature: string) => {
    // Handle feature dependencies
    let updatedFeatures = {
      ...tokenData.features,
      [feature]: !tokenData.features[feature as keyof typeof tokenData.features],
    };

    // If enabling votes, permit must also be enabled
    if (feature === 'votes' && !tokenData.features.votes) {
      updatedFeatures.permit = true;
    }

    setTokenData({
      ...tokenData,
      features: updatedFeatures,
    });
  };

  const handleSave = () => {
    if (validateForm()) {
      toast({
        title: "Configuration Saved",
        description: "Your token configuration has been saved successfully.",
      });
    } else {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Token Name</Label>
          <Input
            id="name"
            placeholder="My Token"
            value={tokenData.name}
            onChange={(e) =>
              setTokenData({ ...tokenData, name: e.target.value })
            }
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="symbol">Token Symbol</Label>
          <Input
            id="symbol"
            placeholder="MTK"
            value={tokenData.symbol}
            onChange={(e) =>
              setTokenData({ ...tokenData, symbol: e.target.value })
            }
            className={errors.symbol ? "border-red-500" : ""}
          />
          {errors.symbol && (
            <p className="text-sm text-red-500">{errors.symbol}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="decimals">Decimals</Label>
          <Input
            id="decimals"
            type="number"
            value={tokenData.decimals}
            onChange={(e) =>
              setTokenData({ ...tokenData, decimals: e.target.value })
            }
            min="0"
            max="18"
            className={errors.decimals ? "border-red-500" : ""}
          />
          {errors.decimals && (
            <p className="text-sm text-red-500">{errors.decimals}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalSupply">Total Supply</Label>
          <Input
            id="totalSupply"
            type="number"
            value={tokenData.totalSupply}
            onChange={(e) =>
              setTokenData({ ...tokenData, totalSupply: e.target.value })
            }
            min="1"
            className={errors.totalSupply ? "border-red-500" : ""}
          />
          {errors.totalSupply && (
            <p className="text-sm text-red-500">{errors.totalSupply}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="standard">Token Standard</Label>
          <Select
            value={tokenData.standard}
            onValueChange={(value) =>
              setTokenData({ ...tokenData, standard: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select standard" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ERC20">ERC-20</SelectItem>
              <SelectItem value="ERC721">ERC-721 (NFT)</SelectItem>
              <SelectItem value="ERC1155">ERC-1155 (Multi-Token)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Features</Label>
        {tokenData.features.votes && !tokenData.features.permit && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              The votes feature requires permit to be enabled
            </AlertDescription>
          </Alert>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(tokenData.features).map(([feature, enabled]) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={feature}
                checked={enabled}
                onCheckedChange={() => handleFeatureChange(feature)}
                disabled={feature === 'permit' && tokenData.features.votes}
              />
              <Label htmlFor={feature} className="capitalize">
                {feature}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full" onClick={handleSave}>
        Save Configuration
      </Button>
    </div>
  );
}