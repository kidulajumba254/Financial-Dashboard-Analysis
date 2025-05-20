"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Phone } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const steps = ["Amount and Account", "Recipient Details", "Confirmation", "Success"]

export function SendMoneyModal({ isOpen, onClose, onSendMoney, accounts }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [amount, setAmount] = useState("")
  const [selectedAccount, setSelectedAccount] = useState("")
  const [transferMethod, setTransferMethod] = useState("mpesa")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [mpesaCode, setMpesaCode] = useState("")

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onSendMoney(Number.parseFloat(amount), selectedAccount)
      onClose()
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount to Send</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account">From Account</Label>
              <Select onValueChange={setSelectedAccount} value={selectedAccount}>
                <SelectTrigger id="account">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.name} value={account.name}>
                      {account.name} (KSh{account.balance.toLocaleString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <Label>Transfer Method</Label>
            <RadioGroup value={transferMethod} onValueChange={setTransferMethod}>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="mpesa" id="mpesa-transfer" />
                <Label htmlFor="mpesa-transfer" className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  M-Pesa
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="bank" id="bank-transfer" />
                <Label htmlFor="bank-transfer">Bank Transfer</Label>
              </div>
            </RadioGroup>

            {transferMethod === "mpesa" && (
              <div className="space-y-2 mt-4">
                <Label htmlFor="recipient-phone">Recipient's M-Pesa Phone Number</Label>
                <Input
                  id="recipient-phone"
                  placeholder="e.g. 07XX XXX XXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            )}
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <h4 className="text-sm font-medium mb-2">Transfer Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span>KSh{amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">From:</span>
                  <span>{selectedAccount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">To:</span>
                  <span>{transferMethod === "mpesa" ? phoneNumber : "Bank Account"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Method:</span>
                  <span>{transferMethod === "mpesa" ? "M-Pesa" : "Bank Transfer"}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Please confirm the transfer details above.</p>
          </div>
        )
      case 3:
        return (
          <div className="text-center space-y-4">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
            <p className="text-lg font-medium">Money Sent Successfully</p>
            <p className="text-sm text-muted-foreground">
              KSh{amount} has been sent from your {selectedAccount} account.
            </p>
            {transferMethod === "mpesa" && (
              <div className="bg-muted p-3 rounded-md text-left">
                <p className="text-xs font-medium">M-Pesa Confirmation</p>
                <p className="text-xs">
                  KSh{amount} sent to {phoneNumber} on {new Date().toLocaleString()}
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
