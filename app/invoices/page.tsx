"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InvoiceList } from "@/components/invoices/invoice-list"
import { InvoiceDetails } from "@/components/invoices/invoice-details"
import { CreateInvoiceForm } from "@/components/invoices/create-invoice-form"
import { DateRangePicker } from "@/components/date-range-picker"
import { Download, Filter, Plus, Search } from "lucide-react"

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const handleCreateInvoice = () => {
    setShowCreateForm(true)
    setSelectedInvoice(null)
  }

  const handleInvoiceCreated = () => {
    setShowCreateForm(false)
    setActiveTab("all")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <DateRangePicker className="w-full sm:w-auto" />
          <Button onClick={handleCreateInvoice}>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      {showCreateForm ? (
        <CreateInvoiceForm onCancel={() => setShowCreateForm(false)} onCreated={handleInvoiceCreated} />
      ) : (
        <div className="grid gap-4 md:grid-cols-[1fr_350px]">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="highest">Highest Amount</SelectItem>
                  <SelectItem value="lowest">Lowest Amount</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <InvoiceList onSelectInvoice={setSelectedInvoice} searchQuery={searchQuery} sortOrder={sortOrder} />
              </TabsContent>
              <TabsContent value="pending">
                <InvoiceList
                  status="pending"
                  onSelectInvoice={setSelectedInvoice}
                  searchQuery={searchQuery}
                  sortOrder={sortOrder}
                />
              </TabsContent>
              <TabsContent value="paid">
                <InvoiceList
                  status="paid"
                  onSelectInvoice={setSelectedInvoice}
                  searchQuery={searchQuery}
                  sortOrder={sortOrder}
                />
              </TabsContent>
              <TabsContent value="overdue">
                <InvoiceList
                  status="overdue"
                  onSelectInvoice={setSelectedInvoice}
                  searchQuery={searchQuery}
                  sortOrder={sortOrder}
                />
              </TabsContent>
            </Tabs>
          </div>

          <div>
            {selectedInvoice ? (
              <InvoiceDetails invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Select an invoice to view its details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
