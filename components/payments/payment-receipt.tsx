"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Download, Phone, Building, ShoppingBag } from "lucide-react"

const paymentTypeIcons = {
  "send-money": <Phone className="h-5 w-5" />,
  "pay-bill": <Building className="h-5 w-5" />,
  "buy-goods": <ShoppingBag className="h-5 w-5" />,
}

const paymentTypeLabels = {
  "send-money": "Send Money",
  "pay-bill": "Pay Bill",
  "buy-goods": "Buy Goods",
}

export function PaymentReceipt({ receipt, onClose, onNewPayment }) {
  const formattedDate = new Date(receipt.date).toLocaleString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <CardTitle>Payment Successful</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md bg-muted p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="mr-2 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                {paymentTypeIcons[receipt.type]}
              </div>
              <div>
                <p className="text-sm font-medium">{paymentTypeLabels[receipt.type]}</p>
                <p className="text-xs text-muted-foreground">{formattedDate}</p>
              </div>
            </div>
            <p className="text-lg font-bold">KSh{receipt.amount.toLocaleString()}</p>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Recipient</span>
              <span className="font-medium">{receipt.recipient}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {receipt.type === "send-money"
                  ? "Phone Number"
                  : receipt.type === "pay-bill"
                    ? "Business Number"
                    : "Till Number"}
              </span>
              <span>{receipt.phone}</span>
            </div>
            {receipt.accountNumber && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Account Number</span>
                <span>{receipt.accountNumber}</span>
              </div>
            )}
            {receipt.reference && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Reference</span>
                <span>{receipt.reference}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">M-Pesa Code</span>
              <span className="font-medium">{receipt.mpesaCode}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onNewPayment}>
          New Payment
        </Button>
        <Button variant="secondary" onClick={onClose}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}
