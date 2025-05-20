"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Calendar, Clock, Building, Phone, ShoppingBag, Trash2, Edit, Plus, AlertCircle } from "lucide-react"

// Sample scheduled payments data
const scheduledPayments = [
  {
    id: "sched-001",
    type: "pay-bill",
    recipient: "Kenya Power",
    phone: "888880",
    accountNumber: "12345678",
    amount: 4500,
    nextDate: "2023-08-05",
    frequency: "monthly",
    status: "active",
  },
  {
    id: "sched-002",
    type: "pay-bill",
    recipient: "Safaricom",
    phone: "888880",
    accountNumber: "0712345678",
    amount: 2000,
    nextDate: "2023-08-15",
    frequency: "monthly",
    status: "active",
  },
  {
    id: "sched-003",
    type: "pay-bill",
    recipient: "DSTV",
    phone: "444555",
    accountNumber: "87654321",
    amount: 6000,
    nextDate: "2023-08-01",
    frequency: "monthly",
    status: "active",
  },
  {
    id: "sched-004",
    type: "send-money",
    recipient: "John Doe",
    phone: "0712 345 678",
    amount: 5000,
    nextDate: "2023-08-01",
    frequency: "weekly",
    status: "paused",
  },
  {
    id: "sched-005",
    type: "buy-goods",
    recipient: "Grocery Store",
    phone: "567890",
    amount: 3000,
    nextDate: "2023-08-10",
    frequency: "biweekly",
    status: "active",
  },
]

const paymentTypeIcons = {
  "send-money": <Phone className="h-4 w-4" />,
  "pay-bill": <Building className="h-4 w-4" />,
  "buy-goods": <ShoppingBag className="h-4 w-4" />,
}

const frequencyLabels = {
  daily: "Daily",
  weekly: "Weekly",
  biweekly: "Every 2 Weeks",
  monthly: "Monthly",
}

const statusColors = {
  active: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300",
  paused: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300",
}

export function ScheduledPayments() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const filteredPayments =
    activeTab === "all" ? scheduledPayments : scheduledPayments.filter((payment) => payment.status === activeTab)

  const handleDelete = () => {
    // In a real app, you would delete the payment here
    setShowDeleteDialog(false)
    setSelectedPayment(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Scheduled Payments</h2>
          <p className="text-sm text-muted-foreground">Manage your recurring payments</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Schedule
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="paused">Paused</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredPayments.length > 0 ? (
          filteredPayments.map((payment) => (
            <Card key={payment.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {paymentTypeIcons[payment.type]}
                    </div>
                    <CardTitle className="text-base">{payment.recipient}</CardTitle>
                  </div>
                  <Badge className={statusColors[payment.status]}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">KSh{payment.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" /> Next Payment
                    </span>
                    <span>{payment.nextDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" /> Frequency
                    </span>
                    <span>{frequencyLabels[payment.frequency]}</span>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => setSelectedPayment(payment)}>
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    onClick={() => {
                      setSelectedPayment(payment)
                      setShowDeleteDialog(true)
                    }}
                  >
                    <Trash2 className="mr-2 h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="md:col-span-2">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No scheduled payments found</p>
              <p className="text-sm text-muted-foreground mb-4">
                You don't have any {activeTab !== "all" ? activeTab : ""} scheduled payments yet.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Schedule
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Scheduled Payment</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete the scheduled payment to {selectedPayment?.recipient}?</p>
          <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
