import { useState, useEffect } from "react";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import SideNav from "@/components/SideNav";
import RevenueChart from "@/components/reports/RevenueChart";
import UserActivityChart from "@/components/reports/UserActivityChart";
import StatsCards from "@/components/reports/StatsCards";
import RecentReportsList from "@/components/reports/RecentReportsList";

const Report = () => {
  const [timeFilter, setTimeFilter] = useState("year");
  const [filteredData, setFilteredData] = useState([]);
  
  console.log("Rendering Report page with filter:", timeFilter);

  const userData = {
    userId: "12345",
    name: "John Smith",
    email: "john.smith@example.com"
  };

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
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1 ml-64 p-4 lg:p-8 bg-muted animate-fadeIn overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              <h1 className="text-2xl font-semibold">Reports for {userData.name}</h1>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-white">
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
          
          <StatsCards stats={stats} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-[250px]">
              <RevenueChart data={filteredData} timeFilter={timeFilter} />
            </div>
            <div className="h-[250px]">
              <UserActivityChart data={filteredData} timeFilter={timeFilter} />
            </div>
          </div>
          
          <RecentReportsList reports={recentReports} />
        </div>
      </div>
    </div>
  );
};

export default Report;