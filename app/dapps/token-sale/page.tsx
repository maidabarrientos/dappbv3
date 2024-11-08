"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentModal } from "@/components/payment-modal";
import { usePayment } from "@/hooks/use-payment";
import { useProject } from "@/hooks/use-project";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink } from "lucide-react";
import { Dashboard } from "./components/dashboard";
import { TokenConfig } from "./components/token-config";
import { Whitelist } from "./components/whitelist";
import { KYCSettings } from "./components/kyc-settings";
import { VestingSchedule } from "./components/vesting-schedule";
import { CurrencySettings } from "./components/currency-settings";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  network: string;
  status: string;
  created_at: string;
  contract_address?: string;
  explorer_links?: {
    contract?: string;
  };
}

export default function TokenSalePage() {
  const [showPayment, setShowPayment] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const { isPaying, setIsPaying } = usePayment();
  const { getUserProjects } = useProject();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const userProjects = await getUserProjects();
    setProjects(userProjects.filter(p => p.type === 'token_sale'));
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setShowCreate(true);
  };

  if (!showCreate) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Token Sales</h1>
            <p className="text-muted-foreground mt-2">
              Create and manage your token sale campaigns
            </p>
          </div>
          <Button onClick={() => setShowPayment(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Token Sale
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Network: {project.network}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    project.status === 'active' ? 'bg-green-100 text-green-800' :
                    project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Created: {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowCreate(true)}
                  >
                    Manage
                  </Button>
                  {project.explorer_links?.contract && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      asChild
                    >
                      <Link 
                        href={project.explorer_links.contract}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Contract
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <PaymentModal
          open={showPayment && !isPaying}
          onClose={() => setShowPayment(false)}
          serviceType="token_sale"
          onSuccess={handlePaymentSuccess}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Token Sale Management</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage your token sale campaign
          </p>
        </div>
        <Button variant="outline" onClick={() => setShowCreate(false)}>
          Back to Projects
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="token">Token</TabsTrigger>
          <TabsTrigger value="whitelist">Whitelist</TabsTrigger>
          <TabsTrigger value="kyc">KYC</TabsTrigger>
          <TabsTrigger value="vesting">Vesting</TabsTrigger>
          <TabsTrigger value="currencies">Currencies</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>

        <TabsContent value="token">
          <TokenConfig />
        </TabsContent>

        <TabsContent value="whitelist">
          <Whitelist />
        </TabsContent>

        <TabsContent value="kyc">
          <KYCSettings />
        </TabsContent>

        <TabsContent value="vesting">
          <VestingSchedule />
        </TabsContent>

        <TabsContent value="currencies">
          <CurrencySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}