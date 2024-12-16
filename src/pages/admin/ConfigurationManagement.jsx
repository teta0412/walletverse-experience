import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, Save } from "lucide-react";

const ConfigurationManagement = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">System Configuration</h1>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Site Name</label>
              <Input placeholder="Enter site name" defaultValue="My Application" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Support Email</label>
              <Input placeholder="Enter support email" type="email" defaultValue="support@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Maintenance Mode</label>
              <select className="w-full border rounded-md p-2">
                <option value="off">Off</option>
                <option value="on">On</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Session Timeout (minutes)</label>
              <Input type="number" defaultValue="30" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Maximum Login Attempts</label>
              <Input type="number" defaultValue="5" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">2FA Requirement</label>
              <select className="w-full border rounded-md p-2">
                <option value="optional">Optional</option>
                <option value="required">Required</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfigurationManagement;