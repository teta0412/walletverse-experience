import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { navItems } from "@/nav-items";
import { toast } from "sonner";
import { useState } from "react";
import UserProfileDialog from "./UserProfileDialog";
import { authenticationService } from "@/services/authenticationService";

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  
  const handleLogout = () => {
    authenticationService.logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navLinks = navItems.filter(item => item.showInNav);
  return (
    <div className="fixed h-screen w-64 bg-card border-r flex flex-col">
      <div className="p-4 border-b">
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setShowProfile(true)}
        >
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">Nguyen Van A</h3>
            <p className="text-sm text-muted-foreground">User</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navLinks.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`nav-link ${
                  location.pathname === item.to ? "bg-primary/10" : ""
                }`}
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
      <UserProfileDialog 
        open={showProfile} 
        onOpenChange={setShowProfile}
      />
    </div>
  );
};

export default SideNav;