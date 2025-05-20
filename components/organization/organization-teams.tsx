import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Edit, Trash2, Users } from "lucide-react"

const teams = [
  {
    id: 1,
    name: "Executive Team",
    lead: {
      name: "James Mwangi",
      email: "james.mwangi@acmefinancial.co.ke",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    members: 5,
    department: "Management",
  },
  {
    id: 2,
    name: "Finance Team",
    lead: {
      name: "Lucy Wambui",
      email: "lucy.wambui@acmefinancial.co.ke",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    members: 12,
    department: "Finance",
  },
  {
    id: 3,
    name: "Customer Service",
    lead: {
      name: "Daniel Omondi",
      email: "daniel.omondi@acmefinancial.co.ke",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    members: 18,
    department: "Operations",
  },
  {
    id: 4,
    name: "M-Pesa Integration",
    lead: {
      name: "Faith Njeri",
      email: "faith.njeri@acmefinancial.co.ke",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    members: 7,
    department: "Technology",
  },
  {
    id: 5,
    name: "Marketing",
    lead: {
      name: "Brian Kipkorir",
      email: "brian.kipkorir@acmefinancial.co.ke",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    members: 9,
    department: "Marketing",
  },
]

export function OrganizationTeams() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Teams</CardTitle>
          <CardDescription>Manage your organization's teams and departments.</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Team
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <Input placeholder="Search teams..." className="max-w-sm" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team Name</TableHead>
              <TableHead>Team Lead</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={team.lead.avatar || "/placeholder.svg"} alt={team.lead.name} />
                      <AvatarFallback>{team.lead.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{team.lead.name}</div>
                      <div className="text-xs text-muted-foreground">{team.lead.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{team.members}</span>
                  </div>
                </TableCell>
                <TableCell>{team.department}</TableCell>
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
  )
}
