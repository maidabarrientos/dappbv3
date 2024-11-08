"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Schedule {
  cliff: string;
  duration: string;
  percentage: string;
}

export function VestingSchedule() {
  const [schedules, setSchedules] = useState<Schedule[]>([
    { cliff: "90", duration: "360", percentage: "40" },
    { cliff: "180", duration: "720", percentage: "60" },
  ]);
  const { toast } = useToast();

  const addSchedule = () => {
    setSchedules([...schedules, { cliff: "", duration: "", percentage: "" }]);
  };

  const removeSchedule = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  const updateSchedule = (index: number, field: keyof Schedule, value: string) => {
    const newSchedules = [...schedules];
    newSchedules[index] = {
      ...newSchedules[index],
      [field]: value,
    };
    setSchedules(newSchedules);
  };

  const handleSave = () => {
    // Validate total percentage equals 100
    const total = schedules.reduce((sum, schedule) => sum + Number(schedule.percentage), 0);
    if (total !== 100) {
      toast({
        title: "Error",
        description: "Total percentage must equal 100%",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Vesting Schedule Saved",
      description: "Your vesting schedule has been saved successfully.",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Vesting Schedule</h2>
      
      <div className="space-y-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliff (days)</TableHead>
                <TableHead>Duration (days)</TableHead>
                <TableHead>Percentage (%)</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      type="number"
                      value={schedule.cliff}
                      onChange={(e) => updateSchedule(index, 'cliff', e.target.value)}
                      min="0"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={schedule.duration}
                      onChange={(e) => updateSchedule(index, 'duration', e.target.value)}
                      min="0"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={schedule.percentage}
                      onChange={(e) => updateSchedule(index, 'percentage', e.target.value)}
                      min="0"
                      max="100"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSchedule(index)}
                      disabled={schedules.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Button onClick={addSchedule} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Vesting Schedule
        </Button>

        <Button onClick={handleSave} className="w-full">
          Save Vesting Schedule
        </Button>
      </div>
    </Card>
  );
}