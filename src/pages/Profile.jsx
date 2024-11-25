import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import SideNav from "@/components/SideNav";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Nguyen Van A",
    email: "user@example.com",
    phone: "+1 234 567 890",
    location: "Ho Chi Minh City, Vietnam"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the profile
    console.log("Updating profile:", profile);
    toast.success("Profile updated successfully");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center gap-4 mb-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>NA</AvatarFallback>
                  </Avatar>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;