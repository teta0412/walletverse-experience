import { Bell } from "lucide-react";

const Notification = () => {
  console.log("Rendering Notification page");
  
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="h-6 w-6" />
        <h1 className="text-2xl font-semibold">Notifications</h1>
      </div>
      
      <div className="glass-card p-4 rounded-lg">
        <p className="text-muted-foreground">No new notifications</p>
      </div>
    </div>
  );
};

export default Notification;