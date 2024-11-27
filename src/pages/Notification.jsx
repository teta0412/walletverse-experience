import { Bell, Clock } from "lucide-react";
import SideNav from "@/components/SideNav";

const Notification = () => {
  console.log("Rendering Notification page");
  
  const notifications = [
    {
      id: 1,
      title: "New Transaction",
      message: "You received $500 from John Doe",
      time: "2 minutes ago",
      isRead: false,
    },
    {
      id: 2,
      title: "System Update",
      message: "The system will undergo maintenance in 2 hours",
      time: "1 hour ago",
      isRead: true,
    },
    {
      id: 3,
      title: "Security Alert",
      message: "New login detected from Chrome browser",
      time: "3 hours ago",
      isRead: true,
    }
  ];
  
  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 min-h-screen bg-muted p-4 lg:p-8 animate-fadeIn">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Bell className="h-6 w-6" />
              <h1 className="text-2xl font-semibold">Notifications</h1>
            </div>
            <span className="text-sm text-muted-foreground">
              {notifications.filter(n => !n.isRead).length} unread
            </span>
          </div>
          
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`glass-card p-4 rounded-lg ${!notification.isRead ? 'border-l-4 border-primary' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-muted-foreground mt-1">{notification.message}</p>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {notification.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;