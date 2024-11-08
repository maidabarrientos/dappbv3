"use client";

import { Card } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer 
} from "recharts";
import { Users, Coins, Timer, ArrowUpRight } from "lucide-react";

const data = [
  { date: "2024-01", amount: 4000 },
  { date: "2024-02", amount: 3000 },
  { date: "2024-03", amount: 2000 },
  { date: "2024-04", amount: 2780 },
  { date: "2024-05", amount: 1890 },
  { date: "2024-06", amount: 2390 },
];

const stats = [
  {
    title: "Total Participants",
    value: "1,234",
    icon: Users,
    change: "+12.3%",
  },
  {
    title: "Tokens Sold",
    value: "789,012",
    icon: Coins,
    change: "+8.2%",
  },
  {
    title: "Time Remaining",
    value: "14 days",
    icon: Timer,
    change: "On Track",
  },
];

const CustomXAxis = ({ tick = true, ...props }) => (
  <XAxis
    tick={tick}
    tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
    axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
    {...props}
  />
);

const CustomYAxis = ({ tick = true, ...props }) => (
  <YAxis
    tick={tick}
    tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
    axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
    {...props}
  />
);

export function Dashboard() {
  return (
    <div className="space-y-6">
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
              {stat.change}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Token Sale Progress</h3>
          <p className="text-sm text-muted-foreground">
            Daily contribution volume
          </p>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <CustomXAxis 
                dataKey="date" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <CustomYAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}