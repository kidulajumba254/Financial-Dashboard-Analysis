import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Shield, Users } from "lucide-react"

const roles = [
  {
    id: 1,
    name: "Administrator",
    description: "Full access to all resources",
    members: 3,
    permissions: 42,
    createdAt: "Jan 15, 2025",
  },
  {
    id: 2,
    name: "Manager",
    description: "Can manage most resources and users",
    members: 5,
    permissions: 35,
    createdAt: "Feb 10, 2025",
  },
  {
    id: 3,
    name: "Developer",
    description: "Access to development resources",
    members: 12,
    permissions: 28,
    createdAt: "Mar 5, 2025",
  },
  {
    id: 4,
    name: "Analyst",
    description: "Can view and analyze data",
    members: 8,
    permissions: 20,
    createdAt: "Mar 20, 2025",
  },
  {
    id: 5,
    name: "Support",
    description: "Customer support access",
    members: 6,
    permissions: 15,
    createdAt: "Apr 12, 2025",
  },
]

const permissionCategories = [
  {
    name: "Dashboard",
    permissions: [
      { name: "View Dashboard", admin: true, manager: true, developer: true, analyst: true, support: true },
      { name: "Edit Dashboard", admin: true, manager: true, developer: false, analyst: false, support: false },
    ],
  },
  {
    name: "Projects",
    permissions: [
      { name: "View Projects", admin: true, manager: true, developer: true, analyst: true, support: true },
      { name: "Create Projects", admin: true, manager: true, developer: false, analyst: false, support: false },
      { name: "Edit Projects", admin: true, manager: true, developer: true, analyst: false, support: false },
      { name: "Delete Projects", admin: true, manager: false, developer: false, analyst: false, support: false },
    ],
  },
  {
    name: "Users",
    permissions: [
      { name: "View Users", admin: true, manager: true, developer: true, analyst: true, support: true },
      { name: "Create Users", admin: true, manager: true, developer: false, analyst: false, support: false },
      { name: "Edit Users", admin: true, manager: true, developer: false, analyst: false, support: false },
      { name: "Delete Users", admin: true, manager: false, developer: false, analyst: false, support: false },
    ],
  },
  {
    name: "Finances",
    permissions: [
      { name: "View Finances", admin: true, manager: true, developer: false, analyst: true, support: false },
      { name: "Create Transactions", admin: true, manager: true, developer: false, analyst: false, support: false },
      { name: "Approve Transactions", admin: true, manager: true, developer: false, analyst: false, support: false },
    ],
  },
]

export default function PermissionsPage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Permissions</h1>
          <p className="text-muted-foreground">Manage roles and permissions for your organization.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>

      <Tabs defaultValue="roles" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions Matrix</TabsTrigger>
          <TabsTrigger value="members">Member Assignments</TabsTrigger>
        </TabsList>
        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Roles</CardTitle>
              <CardDescription>Manage the roles in your organization.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{role.members}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span>{role.permissions}</span>
                        </div>
                      </TableCell>
                      <TableCell>{role.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Permissions Matrix</CardTitle>
              <CardDescription>Configure permissions for each role in your organization.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Permission</TableHead>
                    <TableHead>Administrator</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead>Developer</TableHead>
                    <TableHead>Analyst</TableHead>
                    <TableHead>Support</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissionCategories.map((category) => (
                    <>
                      <TableRow key={category.name}>
                        <TableCell colSpan={6} className="bg-muted/50">
                          <div className="font-medium">{category.name}</div>
                        </TableCell>
                      </TableRow>
                      {category.permissions.map((permission, index) => (
                        <TableRow key={`${category.name}-${index}`}>
                          <TableCell className="pl-8">{permission.name}</TableCell>
                          <TableCell>
                            <Checkbox checked={permission.admin} />
                          </TableCell>
                          <TableCell>
                            <Checkbox checked={permission.manager} />
                          </TableCell>
                          <TableCell>
                            <Checkbox checked={permission.developer} />
                          </TableCell>
                          <TableCell>
                            <Checkbox checked={permission.analyst} />
                          </TableCell>
                          <TableCell>
                            <Checkbox checked={permission.support} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Member Role Assignments</CardTitle>
              <CardDescription>Manage role assignments for team members.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Current Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Assigned On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Faith Njeri</div>
                      <div className="text-xs text-muted-foreground">faith.njeri@acmefinancial.co.ke</div>
                    </TableCell>
                    <TableCell>
                      <Badge>Developer</Badge>
                    </TableCell>
                    <TableCell>Technology</TableCell>
                    <TableCell>Apr 15, 2025</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Change Role
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">John Kamau</div>
                      <div className="text-xs text-muted-foreground">john.kamau@acmefinancial.co.ke</div>
                    </TableCell>
                    <TableCell>
                      <Badge>Manager</Badge>
                    </TableCell>
                    <TableCell>Operations</TableCell>
                    <TableCell>Mar 10, 2025</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Change Role
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Lucy Wambui</div>
                      <div className="text-xs text-muted-foreground">lucy.wambui@acmefinancial.co.ke</div>
                    </TableCell>
                    <TableCell>
                      <Badge>Analyst</Badge>
                    </TableCell>
                    <TableCell>Finance</TableCell>
                    <TableCell>Feb 20, 2025</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Change Role
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">James Mwangi</div>
                      <div className="text-xs text-muted-foreground">james.mwangi@acmefinancial.co.ke</div>
                    </TableCell>
                    <TableCell>
                      <Badge>Administrator</Badge>
                    </TableCell>
                    <TableCell>Executive</TableCell>
                    <TableCell>Jan 5, 2025</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Change Role
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
