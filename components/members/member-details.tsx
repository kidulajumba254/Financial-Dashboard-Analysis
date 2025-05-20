"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, Calendar, Clock, Building, Shield, Edit, Key, Activity, FileText, Lock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Sample activity data
const memberActivity = [
  { id: 1, action: "Logged in", timestamp: "Today at 8:45 AM", details: "From Nairobi, Kenya" },
  { id: 2, action: "Updated profile", timestamp: "Yesterday at 2:30 PM", details: "Changed phone number" },
  { id: 3, action: "Processed payment", timestamp: "May 12, 2024 at 11:20 AM", details: "KES 25,000 to Safaricom" },
  { id: 4, action: "Created invoice", timestamp: "May 10, 2024 at 9:15 AM", details: "Invoice #INV-2024-0123" },
  { id: 5, action: "Added new client", timestamp: "May 8, 2024 at 3:45 PM", details: "Acme Corporation" },
]

// Sample permissions data
const permissionGroups = [
  {
    name: "Dashboard",
    permissions: [
      { name: "View Dashboard", granted: true },
      { name: "Edit Dashboard", granted: true },
      { name: "Create Widgets", granted: true },
    ],
  },
  {
    name: "Transactions",
    permissions: [
      { name: "View Transactions", granted: true },
      { name: "Create Transactions", granted: true },
      { name: "Approve Transactions", granted: false },
      { name: "Delete Transactions", granted: false },
    ],
  },
  {
    name: "Payments",
    permissions: [
      { name: "View Payments", granted: true },
      { name: "Create Payments", granted: true },
      { name: "Approve Payments", granted: false },
    ],
  },
  {
    name: "Invoices",
    permissions: [
      { name: "View Invoices", granted: true },
      { name: "Create Invoices", granted: true },
      { name: "Send Invoices", granted: true },
      { name: "Delete Invoices", granted: false },
    ],
  },
  {
    name: "Team",
    permissions: [
      { name: "View Team", granted: true },
      { name: "Invite Members", granted: false },
      { name: "Manage Roles", granted: false },
    ],
  },
]

export default function MemberDetails({ member, onClose }) {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
            <AvatarFallback className="text-lg">{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{member.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={member.status === "Active" ? "default" : "secondary"}>{member.status}</Badge>
              <span className="text-sm text-muted-foreground">{member.role}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="default" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Message
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="permissions">
            <Shield className="mr-2 h-4 w-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Activity className="mr-2 h-4 w-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Member details and contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </div>
                  <div>{member.email}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    Phone
                  </div>
                  <div>{member.phone}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <Building className="mr-2 h-4 w-4" />
                    Department
                  </div>
                  <div>{member.department}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Join Date
                  </div>
                  <div>{member.joinDate}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Last Active
                  </div>
                  <div>{member.lastActive}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <Key className="mr-2 h-4 w-4" />
                    Access Level
                  </div>
                  <div className="flex gap-1">
                    {member.permissions.map((perm, index) => (
                      <Badge key={index} variant="outline">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
              <CardDescription>Member activity and usage statistics.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">System Usage</div>
                    <div className="text-sm text-muted-foreground">78%</div>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Transactions Processed</div>
                    <div className="text-sm text-muted-foreground">45 this month</div>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Invoices Created</div>
                    <div className="text-sm text-muted-foreground">12 this month</div>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Role & Permissions</CardTitle>
              <CardDescription>Manage what this member can access and modify.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Current Role</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">{member.role}</Badge>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-3 w-3" />
                      Change Role
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-medium">Permissions</div>

                  {permissionGroups.map((group, index) => (
                    <div key={index} className="border rounded-md">
                      <div className="bg-muted px-4 py-2 font-medium text-sm">{group.name}</div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {group.permissions.map((permission, permIndex) => (
                            <div key={permIndex} className="flex items-center gap-2">
                              <Badge
                                variant={permission.granted ? "default" : "outline"}
                                className="w-2 h-2 p-0 rounded-full"
                              />
                              <span className="text-sm">{permission.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Lock className="mr-2 h-4 w-4" />
                Manage Permissions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Track member's recent actions and system activity.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {memberActivity.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">{activity.action}</TableCell>
                      <TableCell>{activity.timestamp}</TableCell>
                      <TableCell>{activity.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents & Files</CardTitle>
              <CardDescription>View and manage member's documents and files.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Documents Available</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  This member doesn't have any documents uploaded yet. You can upload documents like contracts,
                  agreements, or other important files.
                </p>
                <Button className="mt-4">Upload Document</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
