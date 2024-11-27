import { FileText, Download, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SideNav from "@/components/SideNav";

const Report = () => {
  console.log("Rendering Report page");

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up"
    },
    {
      title: "Active Users",
      value: "2,345",
      change: "+15.3%",
      trend: "up"
    },
    {
      title: "Pending Reports",
      value: "12",
      change: "-2.3%",
      trend: "down"
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: "Q4 Financial Summary",
      date: "March 15, 2024",
      status: "Completed"
    },
    {
      id: 2,
      name: "User Activity Analysis",
      date: "March 14, 2024",
      status: "In Progress"
    },
    {
      id: 3,
      name: "Monthly Revenue Report",
      date: "March 10, 2024",
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
            <Button onClick={handleExport} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
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
          
          <div className="glass-card p-4 rounded-lg">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;