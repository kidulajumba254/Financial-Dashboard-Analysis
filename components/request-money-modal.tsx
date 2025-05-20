"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2 } from "lucide-react"

const steps = ["Select Contact", "Enter Amount", "Confirmation", "Success"]

const contacts = [
  { id: "1", name: "John Doe", phoneNumber: "+254 712 345 678" },
  { id: "2", name: "Jane Smith", phoneNumber: "+254 723 456 789" },
  { id: "3", name: "Alice Johnson", phoneNumber: "+254 734 567 890" },
]

export function RequestMoneyModal({ isOpen, onClose, onRequestMoney }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedContact, setSelectedContact] = useState(null)
  const [amount, setAmount] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [useNewContact, setUseNewContact] = useState(false)

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onRequestMoney(Number.parseFloat(amount), useNewContact ? { name: "New Contact", phoneNumber } : selectedContact)
      onClose()
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="new-contact"
                checked={useNewContact}
                onChange={(e) => setUseNewContact(e.target.checked)}
              />
              <Label htmlFor="new-contact">Request from a new contact</Label>
            </div>

            {useNewContact ? (
              <div className="space-y-2">
                <Label htmlFor="phone-number">M-Pesa Phone Number</Label>
                <Input
                  id="phone-number"
                  placeholder="e.g. 07XX XXX XXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            ) : (
              <>
                <Label htmlFor="contact">Select Contact</Label>
                <Select onValueChange={(value) => setSelectedContact(contacts.find((c) => c.id === value))}>
                  <SelectTrigger id="contact">
                    <SelectValue placeholder="Select a contact" />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts.map((contact) => (
                      <SelectItem key={contact.id} value={contact.id}>
                        {contact.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedContact && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Contact Details:</p>
                    <p className="text-sm">Name: {selectedContact.name}</p>
                    <p className="text-sm">Phone: {selectedContact.phoneNumber}</p>
                  </div>
                )}
              </>
            )}
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="amount">Amount to Request</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              An M-Pesa request will be sent to {useNewContact ? phoneNumber : selectedContact?.phoneNumber}
            </p>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <h4 className="text-sm font-medium mb-2">Request Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span>KSh{amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">From:</span>
                  <span>{useNewContact ? phoneNumber : selectedContact?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{useNewContact ? phoneNumber : selectedContact?.phoneNumber}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Please confirm the request details above.</p>
          </div>
        )
      case 3:
        return (
          <div className="text-center space-y-4">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
            <p className="text-lg font-medium">Money Request Sent</p>
            <p className="text-sm text-muted-foreground">
              KSh{amount} has been requested from {useNewContact ? phoneNumber : selectedContact?.name}.
            </p>
            <div className="bg-muted p-3 rounded-md text-left">
              <p className="text-xs">
                An M-Pesa request has been sent to {useNewContact ? phoneNumber : selectedContact?.phoneNumber}
              </p>
              <p className="text-xs">Request ID: REQ{Math.floor(Math.random() * 1000000000)}</p>
            </div>
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
