"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NetworkSelector } from "@/components/network-selector";
import { DeploymentStatus } from "@/components/deployment-status";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useWallet } from "@/hooks/use-wallet";
import { useProject } from "@/hooks/use-project";
import { useDeployment } from "@/hooks/use-deployment";
import { ethers } from "ethers";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

export function TokenConfig() {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    supply: "",
    decimals: "18",
    network: "",
  });
  const [deployment, setDeployment] = useState<any>(null);
  const { toast } = useToast();
  const { address, connect } = useWallet();
  const { saveProject, updateProject } = useProject();
  const { saveDeployment, updateDeploymentStatus, isDeploying } = useDeployment();

  const handleNetworkChange = (chainId: string) => {
    setFormData(prev => ({ ...prev, network: chainId }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const deployContract = async () => {
    if (!address) {
      await connect();
      return;
    }

    try {
      // First save/update project
      const projectData = {
        name: formData.name,
        type: 'token_sale' as const,
        network: formData.network,
        status: 'draft' as const,
        config: formData,
      };

      const project = await saveProject(projectData);
      if (!project) return;

      // Deploy contract
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // This is a simplified token sale contract - you should use your actual contract
      const contractFactory = new ethers.ContractFactory(
        [
          "constructor(string memory name, string memory symbol, uint256 totalSupply)",
          "function transfer(address to, uint256 amount) public returns (bool)",
          "function balanceOf(address account) public view returns (uint256)",
        ],
        `0x60806040523480156200001157600080fd5b506040516200153938038062001539833981016040819052620000349162000108565b8251839083906200004d90600390602085019062000069565b5080516200006390600490602084019062000069565b5050505062000198565b828054620000779062000145565b90600052602060002090601f0160209004810192826200009b5760008555620000e6565b82601f10620000b657805160ff1916838001178555620000e6565b82800160010185558215620000e6579182015b82811115620000e6578251825591602001919060010190620000c9565b50620000f4929150620000f8565b5090565b5b80821115620000f45760008155600101620000f9565b6000806000606084860312156200011e57600080fd5b83516200012b81620001a1565b60208501519093506200013e81620001a1565b80925050604084015190509250925092565b600181811c908216806200015a57607f821691505b602082108114156200017c57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b61139180620001a86000396000f3fe`,
        signer
      );

      const contract = await contractFactory.deploy(
        formData.name,
        formData.symbol,
        ethers.parseUnits(formData.supply, formData.decimals)
      );

      // Save initial deployment status
      const deploymentData = {
        project_id: project.id,
        network: formData.network,
        tx_hash: contract.deploymentTransaction()?.hash || "",
      };

      const deploymentRecord = await saveDeployment(deploymentData);
      setDeployment(deploymentRecord);

      // Wait for deployment to complete
      const deployedContract = await contract.waitForDeployment();
      const contractAddress = await deployedContract.getAddress();

      // Update deployment status
      await updateDeploymentStatus(
        deploymentRecord.id,
        'success',
        contractAddress
      );

      // Update deployment state
      setDeployment(prev => ({
        ...prev,
        status: 'success',
        contract_address: contractAddress,
      }));

    } catch (error: any) {
      console.error('Deployment error:', error);
      if (deployment?.id) {
        await updateDeploymentStatus(deployment.id, 'failed');
      }
      toast({
        title: "Deployment Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Token Configuration</h2>
        
        <form className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Token Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="My Token"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="symbol">Token Symbol</Label>
              <Input
                id="symbol"
                name="symbol"
                placeholder="MTK"
                value={formData.symbol}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supply">Total Supply</Label>
            <Input
              id="supply"
              name="supply"
              type="number"
              placeholder="1000000"
              value={formData.supply}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="decimals">Decimals</Label>
            <Input
              id="decimals"
              name="decimals"
              type="number"
              value={formData.decimals}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Network</Label>
            <NetworkSelector onNetworkChange={handleNetworkChange} />
          </div>

          {!address && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please connect your wallet to deploy the token sale contract
              </AlertDescription>
            </Alert>
          )}

          <Button 
            type="button"
            className="w-full"
            disabled={!formData.network || isDeploying}
            onClick={deployContract}
          >
            {isDeploying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!address ? "Connect Wallet" : isDeploying ? "Deploying..." : "Deploy Token Sale"}
          </Button>
        </form>
      </Card>

      {deployment && (
        <DeploymentStatus
          status={deployment.status}
          explorerLinks={deployment.explorer_links}
          contractAddress={deployment.contract_address}
        />
      )}
    </div>
  );
}