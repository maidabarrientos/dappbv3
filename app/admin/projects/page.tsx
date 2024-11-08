"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

export default function AdminProjects() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const projects = [
    {
      id: "1",
      name: "Token Sale A",
      type: "token_sale",
      owner: "0x1234...5678",
      status: "active",
      created: "2024-03-20",
      revenue: "2.5 ETH",
    },
    {
      id: "2",
      name: "Airdrop B",
      type: "airdrop",
      owner: "0x8765...4321",
      status: "completed",
      created: "2024-03-19",
      revenue: "1.8 ETH",
    },
    {
      id: "3",
      name: "Exchange C",
      type: "exchange",
      owner: "0x9876...1234",
      status: "active",
      created: "2024-03-18",
      revenue: "3.2 ETH",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground mt-2">
          Manage and monitor all platform projects
        </p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="token_sale">Token Sales</SelectItem>
                <SelectItem value="airdrop">Airdrops</SelectItem>
                <SelectItem value="exchange">Exchanges</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Export Data</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell className="capitalize">{project.type.replace("_", " ")}</TableCell>
                  <TableCell>{project.owner}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      project.status === "active" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {project.status}
                    </span>
                  </TableCell>
                  <TableCell>{project.created}</TableCell>
                  <TableCell>{project.revenue}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}