"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function TokenForm({ tokenData, setTokenData }) {
  const handleFeatureChange = (feature) => {
    // Handle feature dependencies
    let updatedFeatures = {
      ...tokenData.features,
      [feature]: !tokenData.features[feature],
    };

    // If enabling votes, permit must also be enabled
    if (feature === 'votes' && !tokenData.features[feature]) {
      updatedFeatures.permit = true;
    }

    setTokenData({
      ...tokenData,
      features: updatedFeatures,
    });
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
          />
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
          />
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
          />
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
          />
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
          <Alert variant="warning">
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
    </div>
  );
}