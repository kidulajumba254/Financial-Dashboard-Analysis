"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Building, ShoppingBag } from "lucide-react"

// Sample payment data
const allPayments = [
  {
    id: "pay-001",
    type: "send-money",
    recipient: "John Doe",
    phone: "0712 345 678",
    amount: 5000,
    date: "2023-07-25T14:30:00Z",
    mpesaCode: "QK7HPLS5VM",
    reference: "Family support",
  },
  {
    id: "pay-002",
    type: "pay-bill",
    recipient: "Kenya Power",
    phone: "888880",
    accountNumber: "12345678",
    amount: 4500,
    date: "2023-07-23T10:15:00Z",
    mpesaCode: "PL8JNRT6BM",
    reference: "July Bill",
  },
  {
    id: "pay-003",
    type: "buy-goods",
    recipient: "Carrefour",
    phone: "567890",
    amount: 8700,
    date: "2023-07-20T16:45:00Z",
    mpesaCode: "MN5KPQR3TS",
    reference: "Groceries",
  },
  {
    id: "pay-004",
    type: "send-money",
    recipient: "Jane Smith",
    phone: "0723 456 789",
    amount: 10000,
    date: "2023-07-18T09:20:00Z",
    mpesaCode: "WX9YZAB2CD",
    reference: "Loan repayment",
  },
  {
    id: "pay-005",
    type: "pay-bill",
    recipient: "Safaricom",
    phone: "888880",
    accountNumber: "0712345678",
    amount: 2000,
    date: "2023-07-15T11:30:00Z",
    mpesaCode: "EF3GHIJ7KL",
    reference: "Airtime",
  },
  {
    id: "pay-006",
    type: "buy-goods",
    recipient: "Shell Station",
    phone: "234567",
    amount: 5000,
    date: "2023-07-12T17:10:00Z",
    mpesaCode: "MN8OPQR1ST",
    reference: "Fuel",
  },
  {
    id: "pay-007",
    type: "send-money",
    recipient: "Alice Johnson",
    phone: "0734 567 890",
    amount: 3000,
    date: "2023-07-10T13:45:00Z",
    mpesaCode: "UV5WXYZ9AB",
    reference: "Lunch",
  },
  {
    id: "pay-008",
    type: "pay-bill",
    recipient: "DSTV",
    phone: "444555",
    accountNumber: "87654321",
    amount: 6000,
    date: "2023-07-05T08:30:00Z",
    mpesaCode: "CD2EFGH6IJ",
    reference: "Subscription",
  },
  {
    id: "pay-009",
    type: "buy-goods",
    recipient: "Java House",
    phone: "345678",
    amount: 1500,
    date: "2023-07-03T15:20:00Z",
    mpesaCode: "KL7MNOP4QR",
    reference: "Coffee",
  },
  {
    id: "pay-010",
    type: "send-money",
    recipient: "Bob Smith",
    phone: "0745 678 901",
    amount: 7500,
    date: "2023-07-01T10:00:00Z",
    mpesaCode: "ST3UVWX8YZ",
    reference: "Project payment",
  },
]

const paymentTypeIcons = {
  "send-money": <Phone className="h-4 w-4" />,
  "pay-bill": <Building className="h-4 w-4" />,
  "buy-goods": <ShoppingBag className="h-4 w-4" />,
}

const paymentTypeLabels = {
  "send-money": "Send Money",
  "pay-bill": "Pay Bill",
  "buy-goods": "Buy Goods",
}

export function RecentPayments({ limit = 5, onSelectReceipt }) {
  const payments = allPayments.slice(0, limit)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-KE", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Payments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center justify-between p-3 rounded-md border hover:bg-accent/50 cursor-pointer transition-colors"
            onClick={() => onSelectReceipt(payment)}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                {paymentTypeIcons[payment.type]}
              </div>
              <div>
                <p className="text-sm font-medium">{payment.recipient}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {paymentTypeLabels[payment.type]}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{formatDate(payment.date)}</span>
                </div>
              </div>
            </div>
            <p className="font-medium">KSh{payment.amount.toLocaleString()}</p>
          </div>
        ))}

        {limit < allPayments.length && (
          <Button variant="outline" className="w-full">
            View All Payments
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
