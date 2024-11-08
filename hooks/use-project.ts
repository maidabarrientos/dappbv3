"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

interface ProjectData {
  name: string;
  type: "token" | "sale" | "airdrop" | "exchange";
  network: string;
  status: "draft" | "active" | "completed" | "failed";
  config?: any;
}

export function useProject() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const saveProject = async (data: ProjectData) => {
    try {
      setIsLoading(true);
      
      const { data: project, error } = await supabase
        .from("projects")
        .insert([data])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Project saved",
        description: "Your project has been saved successfully",
      });

      return project;
    } catch (error: any) {
      console.error("Error saving project:", error);
      toast({
        title: "Error saving project",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserProjects = async () => {
    try {
      setIsLoading(true);
      
      const { data: projects, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return projects;
    } catch (error: any) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Error fetching projects",
        description: error.message,
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    saveProject,
    getUserProjects,
  };
}