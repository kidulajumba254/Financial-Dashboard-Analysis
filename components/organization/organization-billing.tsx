import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, CreditCard, FileText } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const invoices = [
  {
    id: "INV-001",
    date: "May 1, 2025",
    amount: "KSh 24,500",
    status: "Paid",
  },
  {
    id: "INV-002",
    date: "Apr 1, 2025",
    amount: "KSh 24,500",
    status: "Paid",
  },
  {
    id: "INV-003",
    date: "Mar 1, 2025",
    amount: "KSh 24,500",
    status: "Paid",
  },
  {
    id: "INV-004",
    date: "Feb 1, 2025",
    amount: "KSh 24,500",
    status: "Paid",
  },
  {
    id: "INV-005",
    date: "Jan 1, 2025",
    amount: "KSh 24,500",
    status: "Paid",
  },
]

export function OrganizationBilling() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>Your current plan and usage information.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Current Plan</h3>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">Business Pro</div>
                  <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    Active
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">KSh 24,500 per month, billed monthly</p>
              </div>
              <div className="flex gap-2">
                <Button>Upgrade Plan</Button>
                <Button variant="outline">View Plans</Button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">API Transactions</h3>
                  <span className="text-sm text-muted-foreground">75% used</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-sm text-muted-foreground">7,500 / 10,000 transactions this month</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">M-Pesa Transactions</h3>
                  <span className="text-sm text-muted-foreground">42% used</span>
                </div>
                <Progress value={42} className="h-2" />
                <p className="text-sm text-muted-foreground">840 / 2,000 transactions this month</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment methods and billing information.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-6 w-6" />
                  <div>
                    <div className="font-medium">Visa ending in 4242</div>
                    <div className="text-sm text-muted-foreground">Expires 12/2026</div>
                  </div>
                  <div className="ml-auto rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    Default
                  </div>
                </div>
              </div>
              <Button variant="outline">Add Payment Method</Button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Billing Information</h3>
                <div className="text-sm">
                  <p>Acme Financial Services Ltd.</p>
                  <p>123 Kimathi Street</p>
                  <p>Nairobi, Kenya</p>
                  <p>P051234567X (Tax ID)</p>
                </div>
              </div>
              <Button variant="outline">Update Billing Info</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>View and download your past invoices.</CardDescription>
          </div>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                      {invoice.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
