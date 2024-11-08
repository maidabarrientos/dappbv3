"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

export function usePayment() {
  const [isPaying, setIsPaying] = useState(false);
  const { toast } = useToast();

  const checkPaymentStatus = async (serviceType: string, userId: string) => {
    const { data, error } = await supabase
      .from("payments")
      .select("status")
      .eq("user_id", userId)
      .eq("service_type", serviceType)
      .eq("status", "completed")
      .limit(1);

    if (error) {
      console.error("Error checking payment status:", error);
      return false;
    }

    return data && data.length > 0;
  };

  const verifyPayment = async (txHash: string) => {
    try {
      const { error } = await supabase
        .from("payments")
        .update({ status: "completed" })
        .eq("tx_hash", txHash);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error("Error verifying payment:", error);
      return false;
    }
  };

  return {
    isPaying,
    setIsPaying,
    checkPaymentStatus,
    verifyPayment,
  };
}