import { Bell } from "lucide-react";
import SideNav from "@/components/SideNav";

const Notification = () => {
  console.log("Rendering Notification page");
  
  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 min-h-screen bg-muted p-4 lg:p-8 animate-fadeIn">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="h-6 w-6" />
            <h1 className="text-2xl font-semibold">Notifications</h1>
          </div>
          
          <div className="glass-card p-4 rounded-lg">
            <p className="text-muted-foreground">No new notifications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;