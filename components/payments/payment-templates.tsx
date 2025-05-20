"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building, Phone, ShoppingBag, Plus, Edit, Trash2, AlertCircle } from "lucide-react"

// Sample payment templates
const paymentTemplatesData = [
  {
    id: "temp-001",
    name: "Electricity Bill",
    type: "pay-bill",
    recipient: "Kenya Power",
    phone: "888880",
    accountNumber: "12345678",
    amount: 4500,
    reference: "Power Bill",
  },
  {
    id: "temp-002",
    name: "Internet Subscription",
    type: "pay-bill",
    recipient: "Safaricom",
    phone: "888880",
    accountNumber: "0712345678",
    amount: 2000,
    reference: "Internet",
  },
  {
    id: "temp-003",
    name: "TV Subscription",
    type: "pay-bill",
    recipient: "DSTV",
    phone: "444555",
    accountNumber: "87654321",
    amount: 6000,
    reference: "DSTV",
  },
  {
    id: "temp-004",
    name: "Mom's Allowance",
    type: "send-money",
    recipient: "Mom",
    phone: "0712 345 678",
    amount: 5000,
    reference: "Monthly Support",
  },
]

const paymentTypeIcons = {
  "send-money": <Phone className="h-4 w-4" />,
  "pay-bill": <Building className="h-4 w-4" />,
  "buy-goods": <ShoppingBag className="h-4 w-4" />,
}

export function PaymentTemplates() {
  const [templates, setTemplates] = useState(paymentTemplatesData)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editedTemplate, setEditedTemplate] = useState(null)

  const handleDelete = () => {
    // In a real app, you would delete the template here
    setTemplates(templates.filter((t) => t.id !== selectedTemplate.id))
    setShowDeleteDialog(false)
    setSelectedTemplate(null)
  }

  const handleEdit = () => {
    // In a real app, you would update the template here
    setTemplates(templates.map((t) => (t.id === editedTemplate.id ? editedTemplate : t)))
    setShowEditDialog(false)
    setEditedTemplate(null)
  }

  const handleUseTemplate = (template) => {
    // In a real app, you would navigate to the payment form with this template
    console.log("Using template:", template)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Payment Templates</h2>
          <p className="text-sm text-muted-foreground">Save and reuse payment details</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </div>

      {templates.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {paymentTypeIcons[template.type]}
                  </div>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                </div>
                <CardDescription>{template.recipient}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">KSh{template.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {template.type === "send-money"
                        ? "Phone Number"
                        : template.type === "pay-bill"
                          ? "Business Number"
                          : "Till Number"}
                    </span>
                    <span>{template.phone}</span>
                  </div>
                  {template.accountNumber && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Account Number</span>
                      <span>{template.accountNumber}</span>
                    </div>
                  )}
                  {template.reference && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Reference</span>
                      <span>{template.reference}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditedTemplate({ ...template })
                      setShowEditDialog(true)
                    }}
                  >
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    onClick={() => {
                      setSelectedTemplate(template)
                      setShowDeleteDialog(true)
                    }}
                  >
                    <Trash2 className="mr-2 h-3 w-3" />
                    Delete
                  </Button>
                </div>
                <Button size="sm" onClick={() => handleUseTemplate(template)}>
                  Use
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No payment templates found</p>
            <p className="text-sm text-muted-foreground mb-4">Create templates to save time on recurring payments.</p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Template
            </Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Payment Template</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete the "{selectedTemplate?.name}" template?</p>
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

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Payment Template</DialogTitle>
          </DialogHeader>
          {editedTemplate && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  value={editedTemplate.name}
                  onChange={(e) => setEditedTemplate({ ...editedTemplate, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-amount">Amount (KSh)</Label>
                <Input
                  id="template-amount"
                  type="number"
                  value={editedTemplate.amount}
                  onChange={(e) => setEditedTemplate({ ...editedTemplate, amount: Number.parseFloat(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-reference">Reference</Label>
                <Input
                  id="template-reference"
                  value={editedTemplate.reference || ""}
                  onChange={(e) => setEditedTemplate({ ...editedTemplate, reference: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
