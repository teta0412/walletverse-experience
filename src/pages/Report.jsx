import { useState, useEffect } from "react";
import { FileText, Download, TrendingUp, Users, DollarSign, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import SideNav from "@/components/SideNav";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';

const Report = () => {
  const [timeFilter, setTimeFilter] = useState("year");
  const [filteredData, setFilteredData] = useState([]);
  
  console.log("Rendering Report page with filter:", timeFilter);

  // Hardcoded data for a specific user (ID: 12345)
  const userData = {
    userId: "12345",
    name: "John Smith",
    email: "john.smith@example.com"
  };

  // Hardcoded monthly data sets
  const yearData = [
    { month: "Jan", revenue: 45231, users: 2345 },
    { month: "Feb", revenue: 48000, users: 2400 },
    { month: "Mar", revenue: 52000, users: 2600 },
    { month: "Apr", revenue: 49000, users: 2500 },
    { month: "May", revenue: 55000, users: 2800 },
    { month: "Jun", revenue: 58000, users: 3000 },
  ];

  const monthData = [
    { day: "1", revenue: 1500, users: 75 },
    { day: "7", revenue: 1800, users: 82 },
    { day: "14", revenue: 1650, users: 78 },
    { day: "21", revenue: 1900, users: 85 },
    { day: "28", revenue: 1750, users: 80 },
  ];

  useEffect(() => {
    // Filter data based on selected time period
    if (timeFilter === "month") {
      setFilteredData(monthData);
      toast.success("Showing monthly data");
    } else {
      setFilteredData(yearData);
      toast.success("Showing yearly data");
    }
  }, [timeFilter]);

  const stats = [
    {
      title: `${userData.name}'s Total Revenue`,
      value: "$345,231.89",
      change: "+20.1%",
      trend: "up"
    },
    {
      title: "Active Sessions",
      value: "234",
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
      name: `${userData.name}'s Q2 2024 Summary`,
      date: "June 30, 2024",
      status: "Pending"
    },
    {
      id: 2,
      name: "Activity Analysis",
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
    console.log("Exporting report for user:", userData.userId);
    toast.success("Report exported successfully!");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <SideNav />
      <div className="flex-1 p-4 lg:p-8 bg-muted animate-fadeIn">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              <h1 className="text-2xl font-semibold">Reports for {userData.name}</h1>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-white border-2 border-gray-200">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExport} className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                  <ArrowUpRight className="h-4 w-4 text-success" />
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="ml-2 text-sm text-success">
                    {stat.change}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={timeFilter === "month" ? "day" : "month"} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#9b87f5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-4">User Activity</h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={timeFilter === "month" ? "day" : "month"} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#34D399" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Reports</h2>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 hover:bg-muted/50 rounded-md transition-colors">
                  <div>
                    <h3 className="font-medium">{report.name}</h3>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                  <span className={`mt-2 sm:mt-0 px-2 py-1 rounded-full text-xs ${
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