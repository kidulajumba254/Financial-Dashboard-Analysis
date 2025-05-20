import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OrganizationBranches } from "@/components/organization/organization-branches"
import { OrganizationTeams } from "@/components/organization/organization-teams"
import { OrganizationBilling } from "@/components/organization/organization-billing"

export default function OrganizationPage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Organization</h1>
        <p className="text-muted-foreground">
          Manage your organization settings, branches, teams, and billing information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organization Profile</CardTitle>
          <CardDescription>View and update your organization's profile information.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium">Organization Name</h3>
              <p className="text-sm text-muted-foreground">Acme Financial Services Ltd.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Registration Number</h3>
              <p className="text-sm text-muted-foreground">KE-2023-78945612</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Tax ID</h3>
              <p className="text-sm text-muted-foreground">P051234567X</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Industry</h3>
              <p className="text-sm text-muted-foreground">Financial Services</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Address</h3>
              <p className="text-sm text-muted-foreground">123 Kimathi Street, Nairobi, Kenya</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Contact Email</h3>
              <p className="text-sm text-muted-foreground">info@acmefinancial.co.ke</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="branches" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="branches">
          <OrganizationBranches />
        </TabsContent>
        <TabsContent value="teams">
          <OrganizationTeams />
        </TabsContent>
        <TabsContent value="billing">
          <OrganizationBilling />
        </TabsContent>
      </Tabs>
    </div>
  )
}
