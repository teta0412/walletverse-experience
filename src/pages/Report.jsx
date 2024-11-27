import { useState } from "react";
import { FileText, Download, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import SideNav from "@/components/SideNav";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const Report = () => {
  const [timeFilter, setTimeFilter] = useState("year");
  console.log("Rendering Report page with filter:", timeFilter);

  // Mock monthly data for the current year
  const monthlyData = [
    { month: "Jan", revenue: 45231, users: 2345 },
    { month: "Feb", revenue: 48000, users: 2400 },
    { month: "Mar", revenue: 52000, users: 2600 },
    { month: "Apr", revenue: 49000, users: 2500 },
    { month: "May", revenue: 55000, users: 2800 },
    { month: "Jun", revenue: 58000, users: 3000 },
  ];

  const stats = [
    {
      title: "Total Revenue",
      value: "$345,231.89",
      change: "+20.1%",
      trend: "up"
    },
    {
      title: "Active Users",
      value: "12,345",
      change: "+15.3%",
      trend: "up"
    },
    {
      title: "Average Transaction",
      value: "$234.56",
      change: "+5.3%",
      trend: "up"
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: "Q2 2024 Financial Summary",
      date: "June 30, 2024",
      status: "Pending"
    },
    {
      id: 2,
      name: "User Activity Analysis",
      date: "June 25, 2024",
      status: "Completed"
    },
    {
      id: 3,
      name: "Monthly Revenue Report",
      date: "June 1, 2024",
      status: "Completed"
    }
  ];

  const handleExport = () => {
    console.log("Exporting report");
    toast.success("Report exported successfully!");
  };

  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 min-h-screen bg-muted p-4 lg:p-8 animate-fadeIn">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              <h1 className="text-2xl font-semibold">Reports</h1>
            </div>
            <div className="flex items-center gap-4">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExport} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-success" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-error" />
                  )}
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className={`ml-2 text-sm ${stat.trend === "up" ? "text-success" : "text-error"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
              <LineChart width={500} height={300} data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#9b87f5" />
              </LineChart>
            </Card>

            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">User Growth</h2>
              <BarChart width={500} height={300} data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#34D399" />
              </BarChart>
            </Card>
          </div>
          
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Reports</h2>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md transition-colors">
                  <div>
                    <h3 className="font-medium">{report.name}</h3>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    report.status === "Completed" ? "bg-success/20 text-success" : "bg-primary/20 text-primary"
                  }`}>
                    {report.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Report;