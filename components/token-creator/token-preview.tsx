"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

function generateTokenContract(tokenData: any) {
  const standardImports = {
    ERC20: '@openzeppelin/contracts/token/ERC20/ERC20.sol',
    ERC721: '@openzeppelin/contracts/token/ERC721/ERC721.sol',
    ERC1155: '@openzeppelin/contracts/token/ERC1155/ERC1155.sol'
  };

  const features = [];
  const inheritances = [tokenData.standard];
  const constructorParams = [`"${tokenData.name}"`, `"${tokenData.symbol}"`];
  const constructorInheritance = [tokenData.standard];

  if (tokenData.features.burnable) {
    features.push(`import "@openzeppelin/contracts/token/${tokenData.standard}/${tokenData.standard}Burnable.sol";`);
    inheritances.push(`${tokenData.standard}Burnable`);
  }

  if (tokenData.features.pausable) {
    features.push('import "@openzeppelin/contracts/security/Pausable.sol";');
    inheritances.push('Pausable');
  }

  if (tokenData.features.permit && tokenData.standard === 'ERC20') {
    features.push('import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";');
    inheritances.push('ERC20Permit');
    constructorInheritance.push('ERC20Permit');
    constructorParams.push(`"${tokenData.name}"`);
  }

  if (tokenData.features.votes && tokenData.standard === 'ERC20') {
    features.push('import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";');
    inheritances.push('ERC20Votes');
  }

  if (tokenData.features.mintable) {
    features.push('import "@openzeppelin/contracts/access/AccessControl.sol";');
    inheritances.push('AccessControl');
  }

  const contract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "${standardImports[tokenData.standard]}";
${features.join('\n')}

contract ${tokenData.name.replace(/\s+/g, '')} is ${inheritances.join(', ')} {
    ${tokenData.features.mintable ? 'bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");' : ''}

    constructor() 
        ${constructorInheritance.map(i => `${i}(${constructorParams[constructorInheritance.indexOf(i)]})`).join('\n        ')} 
    {
        ${tokenData.standard === 'ERC20' ? `_mint(msg.sender, ${tokenData.totalSupply} * 10 ** decimals());` : ''}
        ${tokenData.features.mintable ? '_grantRole(DEFAULT_ADMIN_ROLE, msg.sender);\n        _grantRole(MINTER_ROLE, msg.sender);' : ''}
    }

    ${tokenData.features.mintable ? `
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }` : ''}

    ${tokenData.features.pausable ? `
    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }` : ''}

    ${tokenData.features.pausable ? `
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override ${tokenData.features.votes ? ', ERC20Votes' : ''} whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }` : ''}

    ${tokenData.features.votes ? `
    // The following functions are overrides required by Solidity.
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal virtual override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal virtual override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }` : ''}
}`;

  return contract;
}

export default function TokenPreview({ tokenData }) {
  const [contractCode, setContractCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const generatedCode = generateTokenContract(tokenData);
    setContractCode(generatedCode);
    setHasChanges(false);
  }, [tokenData]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(contractCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Contract code copied to clipboard",
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setHasChanges(true);
    toast({
      title: "Saved",
      description: "Contract code changes have been saved",
    });
  };

  const handleReset = () => {
    const generatedCode = generateTokenContract(tokenData);
    setContractCode(generatedCode);
    setHasChanges(false);
    setIsEditing(false);
    toast({
      title: "Reset",
      description: "Contract code has been reset to default",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="config">
        <TabsList className="mb-4">
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="contract">Smart Contract</TabsTrigger>
        </TabsList>

        <TabsContent value="config">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Token Configuration</h3>
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

          <Card className="p-6 mt-4">
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(tokenData.features).map(([feature, enabled]) => (
                <div key={feature}>
                  <p className="text-sm text-muted-foreground capitalize">{feature}</p>
                  <p className="font-medium">{enabled ? "Enabled" : "Disabled"}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="contract">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Smart Contract</h3>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  Copy
                </Button>
                {isEditing ? (
                  <>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleSave}
                    >
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleEdit}
                  >
                    Edit Contract
                  </Button>
                )}
              </div>
            </div>

            {hasChanges && (
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You have made manual changes to the contract code. These changes will be preserved during deployment.
                </AlertDescription>
              </Alert>
            )}

            <Textarea
              value={contractCode}
              onChange={(e) => setContractCode(e.target.value)}
              className="font-mono text-sm h-[600px]"
              readOnly={!isEditing}
            />

            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                This contract is based on OpenZeppelin's secure, audited smart contract templates.
                Manual modifications may affect security - ensure proper testing before deployment.
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}