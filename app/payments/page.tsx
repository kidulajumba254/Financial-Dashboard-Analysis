"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MpesaPaymentForm } from "@/components/payments/mpesa-payment-form"
import { ScheduledPayments } from "@/components/payments/scheduled-payments"
import { PaymentTemplates } from "@/components/payments/payment-templates"
import { RecentPayments } from "@/components/payments/recent-payments"
import { PaymentReceipt } from "@/components/payments/payment-receipt"
import { Plus } from "lucide-react"

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("make-payment")
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [selectedReceipt, setSelectedReceipt] = useState(null)

  const handlePaymentSuccess = (paymentDetails) => {
    setShowPaymentForm(false)
    setSelectedReceipt(paymentDetails)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        {activeTab !== "make-payment" && (
          <Button
            onClick={() => {
              setActiveTab("make-payment")
              setShowPaymentForm(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Payment
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="make-payment">Make Payment</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="make-payment">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-1">
              {showPaymentForm ? (
                <MpesaPaymentForm onSuccess={handlePaymentSuccess} onCancel={() => setShowPaymentForm(false)} />
              ) : selectedReceipt ? (
                <PaymentReceipt
                  receipt={selectedReceipt}
                  onClose={() => setSelectedReceipt(null)}
                  onNewPayment={() => {
                    setSelectedReceipt(null)
                    setShowPaymentForm(true)
                  }}
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>M-Pesa Payment</CardTitle>
                    <CardDescription>Make payments directly using M-Pesa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        You can make payments to businesses, pay bills, or send money to friends and family using
                        M-Pesa.
                      </p>
                      <Button onClick={() => setShowPaymentForm(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New M-Pesa Payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            <div className="md:col-span-1">
              <RecentPayments limit={5} onSelectReceipt={setSelectedReceipt} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <ScheduledPayments />
        </TabsContent>

        <TabsContent value="templates">
          <PaymentTemplates />
        </TabsContent>

        <TabsContent value="history">
          <RecentPayments limit={10} onSelectReceipt={setSelectedReceipt} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
