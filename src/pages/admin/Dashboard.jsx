import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Settings, ArrowUpRight, ArrowDownRight } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <h2 className="text-2xl font-bold">1,234</h2>
              <p className="text-sm text-green-600 flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 mr-1" /> +12.5%
              </p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
              <h2 className="text-2xl font-bold">$45,678</h2>
              <p className="text-sm text-green-600 flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 mr-1" /> +8.2%
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Users</p>
              <h2 className="text-2xl font-bold">892</h2>
              <p className="text-sm text-red-600 flex items-center mt-2">
                <ArrowDownRight className="h-4 w-4 mr-1" /> -3.1%
              </p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">System Status</p>
              <h2 className="text-2xl font-bold">Healthy</h2>
              <p className="text-sm text-green-600 flex items-center mt-2">
                All systems operational
              </p>
            </div>
            <Settings className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;