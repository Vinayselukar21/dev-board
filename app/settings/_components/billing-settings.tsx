import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

export default function BillingSettings() {
return (  <Card>
    <CardHeader>
      <CardTitle>Billing Settings</CardTitle>
      <CardDescription>Manage your subscription and payment information.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Current Plan</h3>
        <div className="rounded-lg border p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">Business Plan</h4>
                <Badge>Current</Badge>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                $49.99/month · Renews on May 15, 2023
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline">Change Plan</Button>
              <Button variant="outline" className="text-red-500 hover:text-red-500">
                Cancel Subscription
              </Button>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm">Unlimited projects</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm">Up to 20 team members</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm">Advanced analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm">Priority support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Payment Method</h3>
        <div className="rounded-lg border p-4">
          <RadioGroup defaultValue="card-1">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card-1" id="card-1" />
                <Label htmlFor="card-1" className="flex items-center gap-2">
                  <div className="h-8 w-12 rounded border bg-muted" />
                  <span>•••• •••• •••• 4242</span>
                </Label>
              </div>
              <div className="text-sm text-muted-foreground">Expires 04/2024</div>
            </div>
          </RadioGroup>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm">
              Edit
            </Button>
            <Button variant="outline" size="sm">
              Remove
            </Button>
          </div>
        </div>
        <Button variant="outline" className="w-fit">
          <Plus className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Billing History</h3>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-3 text-sm">Apr 15, 2023</td>
                <td className="px-4 py-3 text-sm">Business Plan - Monthly</td>
                <td className="px-4 py-3 text-sm">$49.99</td>
                <td className="px-4 py-3 text-sm">
                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                    Paid
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Mar 15, 2023</td>
                <td className="px-4 py-3 text-sm">Business Plan - Monthly</td>
                <td className="px-4 py-3 text-sm">$49.99</td>
                <td className="px-4 py-3 text-sm">
                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                    Paid
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Feb 15, 2023</td>
                <td className="px-4 py-3 text-sm">Business Plan - Monthly</td>
                <td className="px-4 py-3 text-sm">$49.99</td>
                <td className="px-4 py-3 text-sm">
                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                    Paid
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm">
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CardContent>
  </Card>)
}