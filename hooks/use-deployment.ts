"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

interface DeploymentData {
  project_id: string;
  network: string;
  tx_hash: string;
}

export function useDeployment() {
  const [isDeploying, setIsDeploying] = useState(false);
  const { toast } = useToast();

  const saveDeployment = async (data: DeploymentData) => {
    try {
      setIsDeploying(true);
      
      const { data: deployment, error } = await supabase
        .from("deployments")
        .insert([{
          ...data,
          status: "pending",
        }])
        .select()
        .single();

      if (error) throw error;

      return deployment;
    } catch (error: any) {
      console.error("Error saving deployment:", error);
      toast({
        title: "Error saving deployment",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  const updateDeploymentStatus = async (
    deploymentId: string,
    status: "success" | "failed",
    contractAddress?: string
  ) => {
    try {
      const { error } = await supabase
        .from("deployments")
        .update({
          status,
          contract_address: contractAddress,
          updated_at: new Date().toISOString(),
        })
        .eq("id", deploymentId);

      if (error) throw error;

      if (status === "success") {
        toast({
          title: "Deployment successful",
          description: "Your contract has been deployed successfully",
        });
      }
    } catch (error: any) {
      console.error("Error updating deployment:", error);
      toast({
        title: "Error updating deployment",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return {
    isDeploying,
    saveDeployment,
    updateDeploymentStatus,
  };
}