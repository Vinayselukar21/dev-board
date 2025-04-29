import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetMyDetails from "@/hooks/useGetMyDetails";

export default function ProfileSettings() {
    const { myDataLoading, errorLoadingMyData, myData } = useGetMyDetails();
    console.log(myData)
    const myInfo = myData?.user
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Manage your personal information and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="/placeholder.svg?height=96&width=96"
                alt="Profile"
              />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Change Avatar
            </Button>
          </div>
          <div className="grid flex-1 gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" defaultValue={myInfo?.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" defaultValue="Kim" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={myInfo?.email} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input id="job-title" defaultValue="Project Manager" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Contact Information</h3>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue="New York, NY" />
            </div>
          </div>
        </div>

        <Button>Update Profile</Button>
      </CardContent>
    </Card>
  );
}
