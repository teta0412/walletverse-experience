import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserProfileDialog = ({ open, onOpenChange }) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    onOpenChange(false);
    navigate("/profile");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-semibold">Nguyen Van A</h2>
            <p className="text-sm text-muted-foreground">User</p>
          </div>
        </div>
        <Card>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">user@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">+1 234 567 890</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">Ho Chi Minh City, Vietnam</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button onClick={handleEditProfile} className="w-full">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;