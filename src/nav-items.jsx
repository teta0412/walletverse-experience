import { HomeIcon, ArrowLeftRight, LogOut } from "lucide-react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";

export const navItems = [
  {
    title: "Login",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Login />,
  },
  {
    title: "Register",
    to: "/register",
    icon: <ArrowLeftRight className="h-4 w-4" />,
    page: <Register />,
  },
  {
    title: "Forgot Password",
    to: "/forgot-password",
    icon: <LogOut className="h-4 w-4" />,
    page: <ForgotPassword />,
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Dashboard />,
  },
];