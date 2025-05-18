"use client";
import { useAuth } from "@/app/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { loading, signUpWithCredentials } = useAuth();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const contactNo = formData.get("contactNo") as string;
    const location = formData.get("location") as string;
    const organizationName = formData.get("organizationName") as string;
    const organizationType = formData.get("organizationType") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const designation = formData.get("designation") as string;

    signUpWithCredentials({ name, email, password, contactNo, location, organizationName, organizationType, jobTitle, designation });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>Enter your details below to signup.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="organizationName">Organization Name</Label>
                <Input
                  id="organizationName"
                  type="text"
                  name="organizationName"
                  placeholder="Enter your organization name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="organizationType">Organization Type</Label>
                <Select
                  name="organizationType"
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" name="password" required placeholder="Enter your password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactNo">Contact No</Label>
                <Input id="contactNo" type="text" name="contactNo" required pattern="[0-9]{10}" placeholder="Enter your contact number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" type="text" name="jobTitle" required placeholder="Enter your job title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="designation">Designation</Label>
                <Input id="designation" type="text" name="designation" required placeholder="Enter your designation" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" type="text" name="location" required placeholder="Enter your location" />
              </div>
              <Button type="submit" className="w-full">
                {loading ? "Signing up..." : "Signup"}
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}