"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Phone } from "lucide-react"

const steps = ["Payment Option", "Payment Details", "Confirmation", "Success"]

export function PaymentModal({ bill, isOpen, onClose, onPaymentSuccess }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [paymentOption, setPaymentOption] = useState("mpesa")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [mpesaCode, setMpesaCode] = useState("")
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" })

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onPaymentSuccess()
      onClose()
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <RadioGroup value={paymentOption} onValueChange={setPaymentOption}>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="mpesa" id="mpesa-payment" />
                <Label htmlFor="mpesa-payment" className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  M-Pesa
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="card" id="card-payment" />
                <Label htmlFor="card-payment">Card Payment</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="bank" id="bank-payment" />
                <Label htmlFor="bank-payment">Bank Transfer</Label>
              </div>
            </RadioGroup>
          </div>
        )
      case 1:
        return paymentOption === "mpesa" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone-number">M-Pesa Phone Number</Label>
              <Input
                id="phone-number"
                placeholder="e.g. 07XX XXX XXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="rounded-md bg-muted p-4">
              <p className="text-sm">
                You will receive an M-Pesa prompt on your phone to pay KSh{bill.amount} to {bill.name}.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                />
              </div>
            </div>
          </div>
        )
      case 2:
        return paymentOption === "mpesa" ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please enter the M-Pesa confirmation code received on your phone.
            </p>
            <div className="space-y-2">
              <Label htmlFor="mpesa-code">M-Pesa Confirmation Code</Label>
              <Input
                id="mpesa-code"
                placeholder="e.g. QK7HPLS5VM"
                value={mpesaCode}
                onChange={(e) => setMpesaCode(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <h4 className="text-sm font-medium mb-2">Payment Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bill:</span>
                  <span>{bill.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span>KSh{bill.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span>{paymentOption === "card" ? "Card Payment" : "Bank Transfer"}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Please confirm the payment details above.</p>
          </div>
        )
      case 3:
        return (
          <div className="text-center space-y-4">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
            <p className="text-lg font-medium">Payment Successful</p>
            <p className="text-sm text-muted-foreground">
              Your payment of KSh{bill.amount} for {bill.name} has been processed successfully.
            </p>
            {paymentOption === "mpesa" && (
              <div className="bg-muted p-3 rounded-md text-left">
                <p className="text-xs font-medium">M-Pesa Confirmation</p>
                <p className="text-xs">
                  KSh{bill.amount} paid to {bill.name} on {new Date().toLocaleString()}
                </p>
                <p className="text-xs">Transaction ID: MP{Math.floor(Math.random() * 1000000000)}</p>
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{steps[currentStep]}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {renderStepContent()}
          <div className="flex justify-between">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                Back
              </Button>
            )}
            <Button onClick={handleContinue} className="ml-auto">
              {currentStep === steps.length - 1 ? "Close" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
