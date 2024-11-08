"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface NetworkSelectorProps {
  onNetworkChange?: (chainId: string) => void;
  showTestnetsOnly?: boolean;
}

export function NetworkSelector({ onNetworkChange, showTestnetsOnly = false }: NetworkSelectorProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<string>();
  const { toast } = useToast();

  const networks = showTestnetsOnly ? {
    sepolia: {
      name: "Sepolia Testnet",
      chainId: "11155111",
    },
    goerli: {
      name: "Goerli Testnet",
      chainId: "5",
    },
    mumbai: {
      name: "Mumbai Testnet",
      chainId: "80001",
    }
  } : {
    ethereum: {
      name: "Ethereum Mainnet",
      chainId: "1",
    },
    sepolia: {
      name: "Sepolia Testnet",
      chainId: "11155111",
    },
    goerli: {
      name: "Goerli Testnet",
      chainId: "5",
    },
    polygon: {
      name: "Polygon",
      chainId: "137",
    },
    mumbai: {
      name: "Mumbai Testnet",
      chainId: "80001",
    }
  };

  const handleNetworkChange = async (networkId: string) => {
    try {
      setSelectedNetwork(networkId);
      onNetworkChange?.(networkId);
      
      const network = Object.values(networks).find(n => n.chainId === networkId);
      toast({
        title: "Network Selected",
        description: `Selected network: ${network?.name}`,
      });
    } catch (error: any) {
      toast({
        title: "Network Selection Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Select value={selectedNetwork} onValueChange={handleNetworkChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select Network" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(networks).map(([key, network]) => (
          <SelectItem key={key} value={network.chainId}>
            {network.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}