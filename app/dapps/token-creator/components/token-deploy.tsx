"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NetworkSelector } from "@/components/network-selector";
import { useState } from "react";
import { useWallet } from "@/hooks/use-wallet";
import { useProject } from "@/hooks/use-project";
import { useDeployment } from "@/hooks/use-deployment";
import { ethers } from "ethers";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { DeploymentStatus } from "@/components/deployment-status";

interface TokenDeployProps {
  tokenData: any;
  onDeploymentComplete?: () => void;
}

export default function TokenDeploy({ tokenData, onDeploymentComplete }: TokenDeployProps) {
  const [network, setNetwork] = useState("");
  const [deployment, setDeployment] = useState<any>(null);
  const { address, connect } = useWallet();
  const { saveProject } = useProject();
  const { saveDeployment, updateDeploymentStatus, isDeploying } = useDeployment();

  const handleNetworkChange = (chainId: string) => {
    setNetwork(chainId);
  };

  const deployToken = async () => {
    if (!address) {
      await connect();
      return;
    }

    try {
      // First save project
      const projectData = {
        name: tokenData.name,
        type: 'token' as const,
        network,
        status: 'draft' as const,
        config: tokenData,
      };

      const project = await saveProject(projectData);
      if (!project) return;

      // Deploy contract
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Get the contract code from the preview
      const contractCode = document.querySelector('textarea')?.value;
      if (!contractCode) throw new Error("Contract code not found");

      // Deploy using ethers.js
      const factory = new ethers.ContractFactory(
        [], // ABI will be generated from the contract
        contractCode,
        signer
      );

      const contract = await factory.deploy();

      // Save initial deployment status
      const deploymentData = {
        project_id: project.id,
        network,
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

      // Notify parent component
      onDeploymentComplete?.();

    } catch (error: any) {
      console.error('Deployment error:', error);
      if (deployment?.id) {
        await updateDeploymentStatus(deployment.id, 'failed');
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Deploy Settings</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Network</label>
            <NetworkSelector 
              onNetworkChange={handleNetworkChange}
              showTestnetsOnly={true}
            />
          </div>

          {!address && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please connect your wallet to deploy the token contract
              </AlertDescription>
            </Alert>
          )}

          <div className="pt-4">
            <Button 
              className="w-full" 
              disabled={!network || isDeploying}
              onClick={deployToken}
            >
              {isDeploying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {!address ? "Connect Wallet" : isDeploying ? "Deploying..." : "Deploy Token"}
            </Button>
          </div>
        </div>
      </Card>

      {deployment && (
        <DeploymentStatus
          status={deployment.status}
          explorerLinks={deployment.explorer_links}
          contractAddress={deployment.contract_address}
        />
      )}

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Deployment Cost</h3>
        <p className="text-sm text-muted-foreground">
          Estimated gas cost will be calculated based on the selected network and features.
          Deployment on testnets is completely free.
        </p>
      </Card>
    </div>
  );
}