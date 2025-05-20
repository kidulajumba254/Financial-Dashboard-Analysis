"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, RefreshCw } from "lucide-react"

const paymentTypes = [
  { id: "send-money", label: "Send Money", description: "Send money to another M-Pesa user" },
  { id: "pay-bill", label: "Pay Bill", description: "Pay bills using business number" },
  { id: "buy-goods", label: "Buy Goods", description: "Pay for goods and services using till number" },
]

const frequentContacts = [
  { id: "1", name: "John Doe", phone: "0712 345 678" },
  { id: "2", name: "Jane Smith", phone: "0723 456 789" },
  { id: "3", name: "Alice Johnson", phone: "0734 567 890" },
]

const savedBills = [
  { id: "1", name: "Kenya Power", number: "888880", accountNumber: "12345678" },
  { id: "2", name: "Safaricom", number: "888880", accountNumber: "0712345678" },
  { id: "3", name: "DSTV", number: "444555", accountNumber: "12345678" },
]

export function MpesaPaymentForm({ onSuccess, onCancel }) {
  const [paymentType, setPaymentType] = useState("send-money")
  const [recipient, setRecipient] = useState("")
  const [customRecipient, setCustomRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [reference, setReference] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [mpesaCode, setMpesaCode] = useState("")

  const handleContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(2)
    } else if (currentStep === 2) {
      setIsProcessing(true)
      // Simulate M-Pesa processing
      setTimeout(() => {
        setIsProcessing(false)
        setCurrentStep(3)
      }, 2000)
    } else if (currentStep === 3) {
      const finalRecipient = recipient
        ? paymentType === "send-money"
          ? frequentContacts.find((c) => c.id === recipient)?.name
          : savedBills.find((b) => b.id === recipient)?.name
        : customRecipient

      const finalPhone = recipient
        ? paymentType === "send-money"
          ? frequentContacts.find((c) => c.id === recipient)?.phone
          : savedBills.find((b) => b.id === recipient)?.number
        : customRecipient

      const paymentDetails = {
        type: paymentType,
        recipient: finalRecipient,
        phone: finalPhone,
        amount: Number.parseFloat(amount),
        accountNumber: accountNumber,
        reference: reference,
        date: new Date().toISOString(),
        mpesaCode: mpesaCode || `MP${Math.floor(Math.random() * 1000000000)}`,
      }

      onSuccess(paymentDetails)
    }
  }

  const renderStepOne = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Payment Type</Label>
        <RadioGroup value={paymentType} onValueChange={setPaymentType}>
          {paymentTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroupItem value={type.id} id={type.id} />
              <Label htmlFor={type.id} className="flex-1">
                <div className="font-medium">{type.label}</div>
                <div className="text-xs text-muted-foreground">{type.description}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {paymentType === "send-money" && (
        <div className="space-y-2">
          <Label>Recipient</Label>
          <Select value={recipient} onValueChange={setRecipient}>
            <SelectTrigger>
              <SelectValue placeholder="Select a contact or enter new" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">Enter new contact</SelectItem>
              {frequentContacts.map((contact) => (
                <SelectItem key={contact.id} value={contact.id}>
                  {contact.name} ({contact.phone})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!recipient && (
            <Input
              placeholder="Enter phone number (07XX XXX XXX)"
              value={customRecipient}
              onChange={(e) => setCustomRecipient(e.target.value)}
            />
          )}
        </div>
      )}

      {(paymentType === "pay-bill" || paymentType === "buy-goods") && (
        <div className="space-y-2">
          <Label>{paymentType === "pay-bill" ? "Business" : "Merchant"}</Label>
          <Select value={recipient} onValueChange={setRecipient}>
            <SelectTrigger>
              <SelectValue
                placeholder={`Select a ${paymentType === "pay-bill" ? "business" : "merchant"} or enter new`}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">Enter new {paymentType === "pay-bill" ? "business" : "till"} number</SelectItem>
              {savedBills.map((bill) => (
                <SelectItem key={bill.id} value={bill.id}>
                  {bill.name} ({bill.number})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!recipient && (
            <Input
              placeholder={`Enter ${paymentType === "pay-bill" ? "business" : "till"} number`}
              value={customRecipient}
              onChange={(e) => setCustomRecipient(e.target.value)}
            />
          )}
        </div>
      )}

      {paymentType === "pay-bill" && (
        <div className="space-y-2">
          <Label>Account Number</Label>
          <Input
            placeholder="Enter account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Amount (KSh)</Label>
        <Input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Reference (Optional)</Label>
        <Input placeholder="Enter reference" value={reference} onChange={(e) => setReference(e.target.value)} />
      </div>
    </div>
  )

  const renderStepTwo = () => (
    <div className="space-y-4">
      <div className="rounded-md bg-muted p-4">
        <h4 className="text-sm font-medium mb-2">Payment Summary</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Type:</span>
            <span>{paymentTypes.find((t) => t.id === paymentType)?.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Recipient:</span>
            <span>
              {recipient
                ? paymentType === "send-money"
                  ? frequentContacts.find((c) => c.id === recipient)?.name
                  : savedBills.find((b) => b.id === recipient)?.name
                : customRecipient}
            </span>
          </div>
          {paymentType === "pay-bill" && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account Number:</span>
              <span>{accountNumber}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount:</span>
            <span className="font-medium">KSh{Number.parseFloat(amount).toLocaleString()}</span>
          </div>
          {reference && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reference:</span>
              <span>{reference}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Click continue to initiate the M-Pesa payment. You will receive a prompt on your phone to complete the
          transaction.
        </p>
      </div>

      {isProcessing && (
        <div className="flex items-center justify-center p-4">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Processing payment...</span>
        </div>
      )}
    </div>
  )

  const renderStepThree = () => (
    <div className="space-y-4">
      <div className="text-center py-4">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
        <h3 className="mt-2 text-lg font-medium">Payment Initiated</h3>
        <p className="text-sm text-muted-foreground">
          An M-Pesa prompt has been sent to your phone. Please enter your PIN to complete the transaction.
        </p>
      </div>

      <div className="space-y-2">
        <Label>M-Pesa Confirmation Code (Optional)</Label>
        <Input
          placeholder="Enter M-Pesa confirmation code"
          value={mpesaCode}
          onChange={(e) => setMpesaCode(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          If you've already completed the payment, enter the M-Pesa confirmation code for your records.
        </p>
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {currentStep === 1 ? "New M-Pesa Payment" : currentStep === 2 ? "Confirm Payment" : "Payment Status"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {currentStep === 1 && renderStepOne()}
        {currentStep === 2 && renderStepTwo()}
        {currentStep === 3 && renderStepThree()}
      </CardContent>
      <CardFooter className="flex justify-between">
        {currentStep > 1 ? (
          <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} disabled={isProcessing}>
            Back
          </Button>
        ) : (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          onClick={handleContinue}
          disabled={
            isProcessing ||
            (currentStep === 1 &&
              (!amount || (!recipient && !customRecipient) || (paymentType === "pay-bill" && !accountNumber)))
          }
        >
          {currentStep === 3 ? "Complete" : "Continue"}
        </Button>
      </CardFooter>
    </Card>
  )
}
