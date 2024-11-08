"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TokenPreviewProps {
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
}

export default function TokenPreview({ tokenData }: TokenPreviewProps) {
  const { toast } = useToast();

  const generateContractCode = () => {
    return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/${tokenData.standard}/${tokenData.standard}.sol";
${tokenData.features.burnable ? `import "@openzeppelin/contracts/token/${tokenData.standard}/${tokenData.standard}Burnable.sol";` : ""}
${tokenData.features.pausable ? 'import "@openzeppelin/contracts/security/Pausable.sol";' : ""}
${tokenData.features.permit ? `import "@openzeppelin/contracts/token/${tokenData.standard}/extensions/ERC20Permit.sol";` : ""}
${tokenData.features.votes ? 'import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";' : ""}

contract ${tokenData.name.replace(/\s+/g, "")} is ${tokenData.standard}${
      tokenData.features.burnable ? `, ${tokenData.standard}Burnable` : ""
    }${tokenData.features.pausable ? ", Pausable" : ""}${
      tokenData.features.permit ? ", ERC20Permit" : ""
    }${tokenData.features.votes ? ", ERC20Votes" : ""} {
    constructor() 
        ${tokenData.standard}("${tokenData.name}", "${tokenData.symbol}")
        ${tokenData.features.permit ? `ERC20Permit("${tokenData.name}")` : ""} {
        _mint(msg.sender, ${tokenData.totalSupply} * 10**${tokenData.decimals});
    }

    ${
      tokenData.features.mintable
        ? `
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }`
        : ""
    }

    ${
      tokenData.features.pausable
        ? `
    function pause() public {
        _pause();
    }

    function unpause() public {
        _unpause();
    }`
        : ""
    }
}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateContractCode());
    toast({
      title: "Copied to clipboard",
      description: "Contract code has been copied to your clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Contract Preview</h3>
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Code
          </Button>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code className="text-sm">{generateContractCode()}</code>
        </pre>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Configuration Summary</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{tokenData.name || "Not set"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Symbol</p>
            <p className="font-medium">{tokenData.symbol || "Not set"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Decimals</p>
            <p className="font-medium">{tokenData.decimals}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Supply</p>
            <p className="font-medium">{tokenData.totalSupply}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Standard</p>
            <p className="font-medium">{tokenData.standard}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}