import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, MapPin } from "lucide-react"

const branches = [
  {
    id: 1,
    name: "Nairobi Headquarters",
    address: "123 Kimathi Street, Nairobi",
    manager: "John Kamau",
    employees: 45,
    status: "Active",
  },
  {
    id: 2,
    name: "Mombasa Branch",
    address: "456 Moi Avenue, Mombasa",
    manager: "Sarah Ochieng",
    employees: 28,
    status: "Active",
  },
  {
    id: 3,
    name: "Kisumu Branch",
    address: "789 Oginga Odinga Road, Kisumu",
    manager: "David Omondi",
    employees: 17,
    status: "Active",
  },
  {
    id: 4,
    name: "Nakuru Branch",
    address: "321 Kenyatta Avenue, Nakuru",
    manager: "Mary Wanjiku",
    employees: 12,
    status: "Under Renovation",
  },
  {
    id: 5,
    name: "Eldoret Branch",
    address: "654 Uganda Road, Eldoret",
    manager: "Peter Kipchoge",
    employees: 9,
    status: "Active",
  },
]

export function OrganizationBranches() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Branches</CardTitle>
          <CardDescription>Manage your organization's branches across Kenya.</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Branch
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <Input placeholder="Search branches..." className="max-w-sm" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Branch Manager</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {branches.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell className="font-medium">{branch.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    {branch.address}
                  </div>
                </TableCell>
                <TableCell>{branch.manager}</TableCell>
                <TableCell>{branch.employees}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      branch.status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}
                  >
                    {branch.status}
                  </div>
                </TableCell>
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
