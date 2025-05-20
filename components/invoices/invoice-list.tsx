"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle } from "lucide-react"

// Sample invoice data
const allInvoices = [
  {
    id: "INV-001",
    client: {
      name: "Acme Corporation",
      email: "billing@acme.com",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
    },
    amount: 150000,
    date: "2023-07-15",
    dueDate: "2023-08-15",
    status: "pending",
    items: [
      { description: "Website Development", quantity: 1, unitPrice: 100000 },
      { description: "Hosting (Annual)", quantity: 1, unitPrice: 50000 },
    ],
  },
  {
    id: "INV-002",
    client: {
      name: "TechStart Inc.",
      email: "accounts@techstart.co",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
    },
    amount: 75000,
    date: "2023-07-10",
    dueDate: "2023-08-10",
    status: "paid",
    paymentDate: "2023-07-20",
    items: [{ description: "UI/UX Design", quantity: 1, unitPrice: 75000 }],
  },
  {
    id: "INV-003",
    client: {
      name: "Global Solutions Ltd",
      email: "finance@globalsolutions.com",
      image: null,
    },
    amount: 250000,
    date: "2023-06-25",
    dueDate: "2023-07-25",
    status: "overdue",
    items: [
      { description: "Mobile App Development", quantity: 1, unitPrice: 200000 },
      { description: "Quality Assurance", quantity: 1, unitPrice: 50000 },
    ],
  },
  {
    id: "INV-004",
    client: {
      name: "Local Business",
      email: "owner@localbusiness.com",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
    },
    amount: 35000,
    date: "2023-07-05",
    dueDate: "2023-08-05",
    status: "pending",
    items: [
      { description: "Logo Design", quantity: 1, unitPrice: 15000 },
      { description: "Business Cards", quantity: 1, unitPrice: 20000 },
    ],
  },
  {
    id: "INV-005",
    client: {
      name: "Education Center",
      email: "admin@educenter.org",
      image: null,
    },
    amount: 120000,
    date: "2023-06-15",
    dueDate: "2023-07-15",
    status: "paid",
    paymentDate: "2023-07-10",
    items: [
      { description: "E-Learning Platform Setup", quantity: 1, unitPrice: 100000 },
      { description: "Content Migration", quantity: 1, unitPrice: 20000 },
    ],
  },
  {
    id: "INV-006",
    client: {
      name: "Healthcare Provider",
      email: "finance@healthcare.com",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
    },
    amount: 180000,
    date: "2023-06-01",
    dueDate: "2023-07-01",
    status: "overdue",
    items: [
      { description: "Patient Management System", quantity: 1, unitPrice: 150000 },
      { description: "Staff Training", quantity: 1, unitPrice: 30000 },
    ],
  },
  {
    id: "INV-007",
    client: {
      name: "Retail Chain",
      email: "accounts@retailchain.com",
      image: null,
    },
    amount: 95000,
    date: "2023-07-20",
    dueDate: "2023-08-20",
    status: "pending",
    items: [{ description: "Inventory Management System", quantity: 1, unitPrice: 95000 }],
  },
  {
    id: "INV-008",
    client: {
      name: "Marketing Agency",
      email: "billing@marketingagency.com",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334228.jpg-eOsHCkvVrVAwcPHKYSs5sQwVKsqWpC.jpeg",
    },
    amount: 65000,
    date: "2023-06-10",
    dueDate: "2023-07-10",
    status: "paid",
    paymentDate: "2023-07-05",
    items: [
      { description: "Social Media Campaign", quantity: 1, unitPrice: 45000 },
      { description: "Analytics Setup", quantity: 1, unitPrice: 20000 },
    ],
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300",
  paid: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300",
  overdue: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300",
}

export function InvoiceList({ status, onSelectInvoice, searchQuery = "", sortOrder = "newest" }) {
  const [invoices, setInvoices] = useState([])
  const [page, setPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    // Filter invoices based on status and search query
    let filtered = [...allInvoices]

    if (status) {
      filtered = filtered.filter((inv) => inv.status === status)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (inv) =>
          inv.id.toLowerCase().includes(query) ||
          inv.client.name.toLowerCase().includes(query) ||
          inv.client.email.toLowerCase().includes(query),
      )
    }

    // Sort invoices based on sortOrder
    filtered.sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortOrder === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortOrder === "highest") {
        return b.amount - a.amount
      } else if (sortOrder === "lowest") {
        return a.amount - b.amount
      }
      return 0
    })

    setInvoices(filtered)
    setPage(1) // Reset to first page when filters change
  }, [status, searchQuery, sortOrder])

  const paginatedInvoices = invoices.slice(0, page * itemsPerPage)
  const hasMore = paginatedInvoices.length < invoices.length

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-KE", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-4">
      {paginatedInvoices.length > 0 ? (
        <>
          {paginatedInvoices.map((invoice) => (
            <Card
              key={invoice.id}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSelectInvoice(invoice)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={invoice.client.image || "/placeholder.svg"} alt={invoice.client.name} />
                      <AvatarFallback>{getInitials(invoice.client.name)}</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium truncate">{invoice.client.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {invoice.id}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>Issued: {formatDate(invoice.date)}</span>
                      <span>•</span>
                      <span>Due: {formatDate(invoice.dueDate)}</span>
                      {invoice.status === "paid" && invoice.paymentDate && (
                        <>
                          <span>•</span>
                          <span>Paid: {formatDate(invoice.paymentDate)}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="font-medium">KSh{invoice.amount.toLocaleString()}</span>
                    <Badge className={`text-xs ${statusColors[invoice.status]}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {hasMore && (
            <Button variant="outline" className="w-full" onClick={() => setPage(page + 1)}>
              Load More
            </Button>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium">No invoices found</h3>
          <p className="text-sm text-muted-foreground">
            {searchQuery ? "Try adjusting your search query" : "Create your first invoice to get started"}
          </p>
        </div>
      )}
    </div>
  )
}
