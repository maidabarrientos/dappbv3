"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink } from "lucide-react";
import TokenForm from "./components/token-form";
import TokenPreview from "./components/token-preview";
import TokenDeploy from "./components/token-deploy";
import { useProject } from "@/hooks/use-project";
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

export default function TokenCreatorPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const { getUserProjects } = useProject();
  const [tokenData, setTokenData] = useState({
    name: "",
    symbol: "",
    decimals: "18",
    totalSupply: "1000000",
    standard: "ERC20",
    features: {
      burnable: false,
      mintable: false,
      pausable: false,
      permit: false,
      votes: false,
    },
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const userProjects = await getUserProjects();
    setProjects(userProjects.filter(p => p.type === 'token'));
  };

  if (!showCreate) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Token Creator</h1>
            <p className="text-muted-foreground mt-2">
              Create and deploy custom tokens
            </p>
          </div>
          <Button onClick={() => setShowCreate(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Token
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
                    View Details
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Create Token</h1>
          <p className="text-muted-foreground mt-2">
            Configure and deploy your custom token
          </p>
        </div>
        <Button variant="outline" onClick={() => setShowCreate(false)}>
          Back to Projects
        </Button>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="create" className="space-y-6">
          <TabsList>
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="deploy">Deploy</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <TokenForm tokenData={tokenData} setTokenData={setTokenData} />
          </TabsContent>

          <TabsContent value="preview">
            <TokenPreview tokenData={tokenData} />
          </TabsContent>

          <TabsContent value="deploy">
            <TokenDeploy 
              tokenData={tokenData} 
              onDeploymentComplete={loadProjects}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}