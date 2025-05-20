"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PaymentModal } from "./payment-modal"

const initialBills = [
  { id: 1, name: "Electricity Bill", amount: 8500, dueDate: "2023-07-15" },
  { id: 2, name: "Internet Service", amount: 6000, dueDate: "2023-07-18" },
  { id: 3, name: "Water Bill", amount: 4500, dueDate: "2023-07-30" },
  { id: 4, name: "KPLC Token", amount: 2000, dueDate: "2023-07-25" },
]

export function QuickBillPay() {
  const [bills, setBills] = useState(initialBills)
  const [selectedBill, setSelectedBill] = useState(null)

  const handlePaymentSuccess = (paidBillId) => {
    setBills(bills.filter((bill) => bill.id !== paidBillId))
    setSelectedBill(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Bill Pay</CardTitle>
      </CardHeader>
      <CardContent>
        {bills.length > 0 ? (
          <div className="space-y-4">
            {bills.map((bill) => (
              <div key={bill.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{bill.name}</p>
                  <p className="text-sm text-muted-foreground">Due: {bill.dueDate}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">KSh{bill.amount}</span>
                  <Button variant="outline" size="sm" onClick={() => setSelectedBill(bill)}>
                    Pay
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No pending bills</p>
        )}
      </CardContent>
      {selectedBill && (
        <PaymentModal
          bill={selectedBill}
          isOpen={!!selectedBill}
          onClose={() => setSelectedBill(null)}
          onPaymentSuccess={() => handlePaymentSuccess(selectedBill.id)}
        />
      )}
    </Card>
  )
}
