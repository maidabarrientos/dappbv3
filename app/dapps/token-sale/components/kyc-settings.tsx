"use client";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function KYCSettings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [provider, setProvider] = useState("");
  const [documents, setDocuments] = useState({
    id: false,
    proofAddress: false,
    selfie: false,
  });
  const { toast } = useToast();

  const handleDocumentChange = (key: keyof typeof documents) => {
    setDocuments(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    if (isEnabled && !provider) {
      toast({
        title: "Error",
        description: "Please select a verification provider",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "KYC Settings Saved",
      description: "Your KYC settings have been saved successfully.",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">KYC Configuration</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Require KYC</Label>
            <p className="text-sm text-muted-foreground">
              Participants must complete verification before contributing
            </p>
          </div>
          <Switch 
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
          />
        </div>

        <div className="space-y-2">
          <Label>Verification Provider</Label>
          <Select 
            value={provider} 
            onValueChange={setProvider}
            disabled={!isEnabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="synaps">Synaps</SelectItem>
              <SelectItem value="sumsub">SumSub</SelectItem>
              <SelectItem value="jumio">Jumio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Required Documents</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch 
                id="id"
                checked={documents.id}
                onCheckedChange={() => handleDocumentChange('id')}
                disabled={!isEnabled}
              />
              <Label htmlFor="id">Government ID</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="proof-address"
                checked={documents.proofAddress}
                onCheckedChange={() => handleDocumentChange('proofAddress')}
                disabled={!isEnabled}
              />
              <Label htmlFor="proof-address">Proof of Address</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="selfie"
                checked={documents.selfie}
                onCheckedChange={() => handleDocumentChange('selfie')}
                disabled={!isEnabled}
              />
              <Label htmlFor="selfie">Selfie Verification</Label>
            </div>
          </div>
        </div>

        <Button 
          className="w-full"
          onClick={handleSave}
        >
          Save KYC Settings
        </Button>
      </div>
    </Card>
  );
}