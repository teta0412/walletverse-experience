// src/components/report/ReportHeader.jsx
import { Download, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const ReportHeader = ({ data, timeFilter, setTimeFilter, onExport }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
    <div className="flex items-center gap-3">
      <div className="bg-primary/10 p-3 rounded-lg">
        <FileText className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h1 className="text-3xl font-bold">Financial Report</h1>
        <p className="text-muted-foreground">
          {data?.firstName} {data?.lastName}'s wallet overview
        </p>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <Select value={timeFilter} onValueChange={setTimeFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="month">This Month</SelectItem>
          <SelectItem value="year">This Year</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={onExport} className="gap-2">
        <Download className="h-4 w-4" />
        Export Report
      </Button>
    </div>
  </div>
);
