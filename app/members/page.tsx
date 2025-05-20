"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Mail,
  MoreHorizontal,
  Filter,
  Download,
  UserPlus,
  Users,
  UserCheck,
  Clock,
  AlertCircle,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import MemberDetails from "@/components/members/member-details"
import InviteMemberForm from "@/components/members/invite-member-form"

const members = [
  {
    id: 1,
    name: "Faith Njeri",
    email: "faith.njeri@acmefinancial.co.ke",
    role: "Lead Developer",
    department: "Technology",
    status: "Active",
    lastActive: "Today at 2:34 PM",
    joinDate: "Jan 15, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+254 712 345 678",
    permissions: ["Admin", "Developer", "Finance"],
  },
  {
    id: 2,
    name: "John Kamau",
    email: "john.kamau@acmefinancial.co.ke",
    role: "Project Manager",
    department: "Operations",
    status: "Active",
    lastActive: "Today at 10:15 AM",
    joinDate: "Mar 3, 2022",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+254 723 456 789",
    permissions: ["Manager", "Finance"],
  },
  {
    id: 3,
    name: "Lucy Wambui",
    email: "lucy.wambui@acmefinancial.co.ke",
    role: "Financial Analyst",
    department: "Finance",
    status: "Active",
    lastActive: "Yesterday at 4:45 PM",
    joinDate: "Jun 12, 2022",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+254 734 567 890",
    permissions: ["Finance", "Reports"],
  },
  {
    id: 4,
    name: "David Omondi",
    email: "david.omondi@acmefinancial.co.ke",
    role: "UX Designer",
    department: "Technology",
    status: "Active",
    lastActive: "Today at 9:30 AM",
    joinDate: "Sep 5, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+254 745 678 901",
    permissions: ["Developer"],
  },
  {
    id: 5,
    name: "Sarah Ochieng",
    email: "sarah.ochieng@acmefinancial.co.ke",
    role: "Customer Support",
    department: "Operations",
    status: "On Leave",
    lastActive: "3 days ago",
    joinDate: "Nov 20, 2022",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+254 756 789 012",
    permissions: ["Support", "Customer"],
  },
  {
    id: 6,
    name: "Peter Kipchoge",
    email: "peter.kipchoge@acmefinancial.co.ke",
    role: "Marketing Specialist",
    department: "Marketing",
    status: "Active",
    lastActive: "Today at 1:20 PM",
    joinDate: "Feb 8, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+254 767 890 123",
    permissions: ["Marketing"],
  },
  {
    id: 7,
    name: "Mary Wanjiku",
    email: "mary.wanjiku@acmefinancial.co.ke",
    role: "HR Manager",
    department: "Human Resources",
    status: "Active",
    lastActive: "Yesterday at 11:05 AM",
    joinDate: "Apr 17, 2022",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+254 778 901 234",
    permissions: ["HR", "Admin"],
  },
  {
    id: 8,
    name: "James Mwangi",
    email: "james.mwangi@acmefinancial.co.ke",
    role: "CEO",
    department: "Executive",
    status: "Active",
    lastActive: "Today at 8:45 AM",
    joinDate: "Jan 1, 2020",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+254 789 012 345",
    permissions: ["Admin", "Executive", "Finance", "HR"],
  },
  {
    id: 9,
    name: "Grace Akinyi",
    email: "grace.akinyi@acmefinancial.co.ke",
    role: "Accountant",
    department: "Finance",
    status: "Inactive",
    lastActive: "2 weeks ago",
    joinDate: "Jul 30, 2022",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+254 790 123 456",
    permissions: ["Finance"],
  },
  {
    id: 10,
    name: "Daniel Mutua",
    email: "daniel.mutua@acmefinancial.co.ke",
    role: "Backend Developer",
    department: "Technology",
    status: "Active",
    lastActive: "Today at 3:10 PM",
    joinDate: "Oct 12, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+254 701 234 567",
    permissions: ["Developer"],
  },
]

const pendingInvites = [
  {
    id: 101,
    name: "Elizabeth Njoroge",
    email: "elizabeth.njoroge@gmail.com",
    role: "Financial Advisor",
    department: "Finance",
    invitedBy: "James Mwangi",
    invitedOn: "May 10, 2024",
    expiresOn: "May 17, 2024",
  },
  {
    id: 102,
    name: "Michael Otieno",
    email: "michael.otieno@outlook.com",
    role: "Security Specialist",
    department: "Technology",
    invitedBy: "Faith Njeri",
    invitedOn: "May 12, 2024",
    expiresOn: "May 19, 2024",
  },
  {
    id: 103,
    name: "Jane Waithera",
    email: "jane.waithera@yahoo.com",
    role: "Marketing Coordinator",
    department: "Marketing",
    invitedBy: "Peter Kipchoge",
    invitedOn: "May 13, 2024",
    expiresOn: "May 20, 2024",
  },
]

export default function MembersPage() {
  const [selectedMember, setSelectedMember] = useState(null)
  const [showMemberDetails, setShowMemberDetails] = useState(false)
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterRole, setFilterRole] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMembers = members.filter((member) => {
    // Filter by department
    if (filterDepartment !== "all" && member.department !== filterDepartment) {
      return false
    }

    // Filter by role
    if (filterRole !== "all" && member.role !== filterRole) {
      return false
    }

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        member.department.toLowerCase().includes(query)
      )
    }

    return true
  })

  const activeMembers = filteredMembers.filter((member) => member.status === "Active")
  const inactiveMembers = filteredMembers.filter((member) => member.status !== "Active")

  const handleMemberClick = (member) => {
    setSelectedMember(member)
    setShowMemberDetails(true)
  }

  const departments = [...new Set(members.map((member) => member.department))]
  const roles = [...new Set(members.map((member) => member.role))]

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
          <p className="text-muted-foreground">Manage your organization's team members and their access.</p>
        </div>
        <Button onClick={() => setShowInviteForm(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Team Overview</CardTitle>
          <CardDescription>View and manage your organization's team members.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground">Total Members</div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2 text-3xl font-bold">28</div>
              <div className="mt-1 text-xs text-muted-foreground">+3 from last month</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground">Active Members</div>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2 text-3xl font-bold">25</div>
              <div className="mt-1 text-xs text-muted-foreground">89% of total members</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground">Departments</div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2 text-3xl font-bold">6</div>
              <div className="mt-1 text-xs text-muted-foreground">Technology, Finance, etc.</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground">Pending Invites</div>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2 text-3xl font-bold">3</div>
              <div className="mt-1 text-xs text-muted-foreground">Expires in 7 days</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="all">
            <Users className="mr-2 h-4 w-4" />
            All Members
          </TabsTrigger>
          <TabsTrigger value="active">
            <UserCheck className="mr-2 h-4 w-4" />
            Active
          </TabsTrigger>
          <TabsTrigger value="inactive">
            <AlertCircle className="mr-2 h-4 w-4" />
            Inactive
          </TabsTrigger>
          <TabsTrigger value="pending">
            <Clock className="mr-2 h-4 w-4" />
            Pending Invites
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>View and manage all team members in your organization.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search members..."
                    className="pl-8 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter Members</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <Label htmlFor="department-filter" className="text-xs">
                        Department
                      </Label>
                      <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                        <SelectTrigger id="department-filter" className="mt-1">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-2">
                      <Label htmlFor="role-filter" className="text-xs">
                        Role
                      </Label>
                      <Select value={filterRole} onValueChange={setFilterRole}>
                        <SelectTrigger id="role-filter" className="mt-1">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id} className="cursor-pointer" onClick={() => handleMemberClick(member)}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            member.status === "Active"
                              ? "default"
                              : member.status === "On Leave"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Email action
                            }}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleMemberClick(member)
                                }}
                              >
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>Edit Member</DropdownMenuItem>
                              <DropdownMenuItem>Change Role</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Deactivate Account</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Members</CardTitle>
                <CardDescription>View and manage active team members in your organization.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search active members..." className="pl-8 w-[250px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeMembers.map((member) => (
                    <TableRow key={member.id} className="cursor-pointer" onClick={() => handleMemberClick(member)}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>{member.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                            <MoreHorizontal className="h-4 w-4" />
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

        <TabsContent value="inactive">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Inactive Members</CardTitle>
                <CardDescription>View and manage inactive or on-leave team members.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search inactive members..." className="pl-8 w-[250px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {inactiveMembers.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inactiveMembers.map((member) => (
                      <TableRow key={member.id} className="cursor-pointer" onClick={() => handleMemberClick(member)}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-xs text-muted-foreground">{member.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell>
                          <Badge variant={member.status === "On Leave" ? "outline" : "secondary"}>
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{member.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <UserCheck className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No Inactive Members</h3>
                  <p className="text-sm text-muted-foreground mt-1">All team members are currently active.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pending Invites</CardTitle>
                <CardDescription>Manage pending team member invitations.</CardDescription>
              </div>
              <Button onClick={() => setShowInviteForm(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                New Invite
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Invited By</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingInvites.map((invite) => (
                    <TableRow key={invite.id}>
                      <TableCell>
                        <div className="font-medium">{invite.name}</div>
                      </TableCell>
                      <TableCell>{invite.email}</TableCell>
                      <TableCell>{invite.role}</TableCell>
                      <TableCell>{invite.department}</TableCell>
                      <TableCell>{invite.invitedBy}</TableCell>
                      <TableCell>{invite.expiresOn}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Resend
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
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
      </Tabs>

      {/* Member Details Dialog */}
      <Dialog open={showMemberDetails} onOpenChange={setShowMemberDetails}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedMember && <MemberDetails member={selectedMember} onClose={() => setShowMemberDetails(false)} />}
        </DialogContent>
      </Dialog>

      {/* Invite Member Dialog */}
      <Dialog open={showInviteForm} onOpenChange={setShowInviteForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>Send an invitation to join your organization.</DialogDescription>
          </DialogHeader>
          <InviteMemberForm departments={departments} roles={roles} onInvite={() => setShowInviteForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
