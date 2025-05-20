"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, FileText, Send, X, Printer } from "lucide-react"

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  overdue: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

export function InvoiceDetails({ invoice, onClose }) {
  if (!invoice) return null

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-KE", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  const calculateSubtotal = () => {
    return invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  }

  const calculateVAT = () => {
    return calculateSubtotal() * 0.16 // 16% VAT
  }

  return (
    <Card className="sticky top-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">Invoice Details</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{invoice.id}</span>
          </div>
          <Badge className={statusColors[invoice.status]}>
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </Badge>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Client</h3>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={invoice.client.image || "/placeholder.svg"} alt={invoice.client.name} />
              <AvatarFallback>{getInitials(invoice.client.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{invoice.client.name}</p>
              <p className="text-xs text-muted-foreground">{invoice.client.email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Dates</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Issue Date</p>
              <p className="text-sm">{formatDate(invoice.date)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Due Date</p>
              <p className="text-sm">{formatDate(invoice.dueDate)}</p>
            </div>
            {invoice.status === "paid" && invoice.paymentDate && (
              <div>
                <p className="text-xs text-muted-foreground">Payment Date</p>
                <p className="text-sm">{formatDate(invoice.paymentDate)}</p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Items</h3>
          <div className="space-y-3">
            {invoice.items.map((item, index) => (
              <div key={index} className="grid grid-cols-[1fr_auto_auto] gap-2 text-sm">
                <div>
                  <p className="font-medium">{item.description}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p>KSh{item.unitPrice.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">KSh{(item.quantity * item.unitPrice).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>KSh{calculateSubtotal().toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">VAT (16%)</span>
            <span>KSh{calculateVAT().toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>KSh{invoice.amount.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        {invoice.status === "pending" && (
          <Button size="sm" className="flex-1">
            <Send className="mr-2 h-4 w-4" />
            Send Reminder
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
