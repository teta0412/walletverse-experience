import React from "react";
import { Home, Send, Bell, FileText } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Profile from "./pages/Profile";

// Lazy load the components to avoid circular dependencies
const Notification = React.lazy(() => import("./pages/Notification"));
const Report = React.lazy(() => import("./pages/Report"));

export const navItems = [
  {
    title: "Dashboard",
    icon: <Home className="h-4 w-4 mr-2" />,
    to: "/",
    page: <Dashboard />,
    showInNav: true,
  },
  {
    title: "Transaction",
    icon: <Send className="h-4 w-4 mr-2" />,
    to: "/transaction",
    page: <Transaction />,
    showInNav: true,
  },
  {
    title: "Notifications",
    icon: <Bell className="h-4 w-4 mr-2" />,
    to: "/notifications",
    page: <React.Suspense fallback={<div>Loading...</div>}><Notification /></React.Suspense>,
    showInNav: true,
  },
  {
    title: "Reports",
    icon: <FileText className="h-4 w-4 mr-2" />,
    to: "/reports",
    page: <React.Suspense fallback={<div>Loading...</div>}><Report /></React.Suspense>,
    showInNav: true,
  },
  {
    title: "Profile",
    to: "/profile",
    page: <Profile />,
    showInNav: false,
  },
];