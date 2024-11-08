"use client";

import * as React from "react";
import { useToast as useToastUI } from "@/components/ui/use-toast";

export function useToast() {
  const { toast, dismiss } = useToastUI();
  return { toast, dismiss };
}