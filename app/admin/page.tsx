"use client";

import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer 
} from "recharts";
import { Users, Coins, ArrowUpRight } from "lucide-react";

const data = [
  { month: "Jan", sales: 4000, projects: 24 },
  { month: "Feb", sales: 3000, projects: 13 },
  { month: "Mar", sales: 2000, projects: 18 },
  { month: "Apr", sales: 2780, projects: 29 },
  { month: "May", sales: 1890, projects: 15 },
  { month: "Jun", sales: 2390, projects: 21 },
];

const stats = [
  {
    title: "Total Users",
    value: "1,234",
    icon: Users,
    change: "+12.3%",
  },
  {
    title: "Total Revenue",
    value: "45.6 ETH",
    icon: Coins,
    change: "+8.2%",
  },
  {
    title: "Active Projects",
    value: "789",
    icon: ArrowUpRight,
    change: "+15.3%",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Platform overview and analytics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              {stat.change} from last month
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Platform Activity</h3>
          <p className="text-sm text-muted-foreground">
            Monthly sales and new projects
          </p>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                }}
              />
              <Bar dataKey="sales" fill="hsl(var(--primary))" />
              <Bar dataKey="projects" fill="hsl(var(--secondary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}