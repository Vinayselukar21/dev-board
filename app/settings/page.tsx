'use client'
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import BillingSettings from "./_components/billing-settings";
import GeneralSettings from "./_components/general-settings";
import NotificationSettings from "./_components/notification-settings";
import ProfileSettings from "./_components/profile-settings";
import SecuritySettings from "./_components/security-settings";

export default function SettingsPage() {

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Main Content */}
      <main className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <h1 className="text-lg font-semibold">Settings</h1>
          <div className="ml-auto flex items-center gap-2">
            <form className="hidden sm:flex">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search settings..."
                  className="w-60 rounded-lg bg-background pl-8"
                />
              </div>
            </form>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="flex flex-col gap-6">
            {/* Settings Info */}
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Workspace Settings</h2>
              <p className="text-muted-foreground">
                Manage your workspace preferences and account settings.
              </p>
            </div>

            {/* Settings Tabs */}
            <Tabs defaultValue="general">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general" className="pt-4">
                <GeneralSettings />
              </TabsContent>

              {/* Profile Settings */}
              <TabsContent value="profile" className="pt-4">
                <ProfileSettings />
              </TabsContent>

              {/* Notifications Settings */}
              <TabsContent value="notifications" className="pt-4">
                <NotificationSettings />
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security" className="pt-4">
                <SecuritySettings />
              </TabsContent>

              {/* Billing Settings */}
              <TabsContent value="billing" className="pt-4">
                <BillingSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
