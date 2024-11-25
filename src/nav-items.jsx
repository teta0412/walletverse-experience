import { Home, Send, Receipt } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Profile from "./pages/Profile";

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
    title: "Profile",
    to: "/profile",
    page: <Profile />,
    showInNav: false,
  },
];