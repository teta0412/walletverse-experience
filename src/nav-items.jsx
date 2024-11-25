import { HomeIcon, ArrowLeftRight, LogOut } from "lucide-react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";

export const navItems = [
  {
    title: "Login",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Login />,
    showInNav: false,
  },
  {
    title: "Register",
    to: "/register",
    icon: <ArrowLeftRight className="h-4 w-4" />,
    page: <Register />,
    showInNav: false,
  },
  {
    title: "Forgot Password",
    to: "/forgot-password",
    icon: <LogOut className="h-4 w-4" />,
    page: <ForgotPassword />,
    showInNav: false,
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Dashboard />,
    showInNav: true,
  },
  {
    title: "Transaction",
    to: "/transaction",
    icon: <ArrowLeftRight className="h-4 w-4" />,
    page: <Transaction />,
    showInNav: true,
  },
];