"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Upload, Download } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function Whitelist() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [addresses, setAddresses] = useState("");
  const [quickAddAddress, setQuickAddAddress] = useState("");
  const { toast } = useToast();

  const handleQuickAdd = () => {
    if (!quickAddAddress) {
      toast({
        title: "Error",
        description: "Please enter an address",
        variant: "destructive",
      });
      return;
    }

    setAddresses(prev => prev ? `${prev}\n${quickAddAddress}` : quickAddAddress);
    setQuickAddAddress("");
    toast({
      title: "Address Added",
      description: "The address has been added to the whitelist.",
    });
  };

  const handleImportCSV = () => {
    // Implement CSV import logic
    toast({
      title: "Import CSV",
      description: "CSV import functionality will be implemented here.",
    });
  };

  const handleExportList = () => {
    // Implement export logic
    toast({
      title: "Export List",
      description: "Export functionality will be implemented here.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Whitelist Saved",
      description: "Your whitelist has been saved successfully.",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Whitelist Management</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Enable Whitelist</Label>
            <p className="text-sm text-muted-foreground">
              Restrict token sale to whitelisted addresses
            </p>
          </div>
          <Switch 
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
          />
        </div>

        <div className="space-y-2">
          <Label>Add Addresses</Label>
          <Textarea 
            placeholder="Enter addresses (one per line)"
            className="min-h-[200px]"
            value={addresses}
            onChange={(e) => setAddresses(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <Button className="flex-1" onClick={handleImportCSV}>
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleExportList}>
            <Download className="h-4 w-4 mr-2" />
            Export List
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Quick Add</Label>
          <div className="flex gap-2">
            <Input 
              placeholder="Enter address"
              value={quickAddAddress}
              onChange={(e) => setQuickAddAddress(e.target.value)}
            />
            <Button onClick={handleQuickAdd}>Add</Button>
          </div>
        </div>

        <Button 
          className="w-full"
          onClick={handleSave}
          disabled={!isEnabled && !addresses}
        >
          Save Whitelist
        </Button>
      </div>
    </Card>
  );
}