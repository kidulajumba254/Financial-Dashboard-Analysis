"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDownLeft, ArrowUpRight, CreditCard, Phone, Wallet, Building, RefreshCw } from "lucide-react"

// Sample transaction data
const allTransactions = [
  {
    id: "tx-001",
    title: "Salary Deposit",
    amount: 120000,
    date: "2023-07-01",
    time: "09:30 AM",
    type: "income",
    status: "completed",
    method: "bank",
    category: "Income",
    description: "Monthly salary payment",
    recipient: {
      name: "Your Account",
      account: "****4567",
      image: null,
    },
    sender: {
      name: "Acme Corporation",
      account: "Business Account",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
    },
  },
  {
    id: "tx-002",
    title: "Supermarket",
    amount: -8500,
    date: "2023-07-03",
    time: "02:15 PM",
    type: "expense",
    status: "completed",
    method: "mpesa",
    category: "Groceries",
    description: "Weekly grocery shopping",
    recipient: {
      name: "Carrefour",
      account: "Till Number: 123456",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
    },
    sender: {
      name: "Your M-Pesa",
      account: "0712 345 678",
      image: null,
    },
  },
  {
    id: "tx-003",
    title: "Electricity Bill",
    amount: -4500,
    date: "2023-07-05",
    time: "10:00 AM",
    type: "expense",
    status: "completed",
    method: "mpesa",
    category: "Utilities",
    description: "Monthly electricity bill payment",
    recipient: {
      name: "Kenya Power",
      account: "Paybill: 888880",
      image: null,
    },
    sender: {
      name: "Your M-Pesa",
      account: "0712 345 678",
      image: null,
    },
  },
  {
    id: "tx-004",
    title: "Freelance Payment",
    amount: 45000,
    date: "2023-07-10",
    time: "03:45 PM",
    type: "income",
    status: "completed",
    method: "mpesa",
    category: "Income",
    description: "Website design project payment",
    recipient: {
      name: "Your M-Pesa",
      account: "0712 345 678",
      image: null,
    },
    sender: {
      name: "John Smith",
      account: "0723 456 789",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
    },
  },
  {
    id: "tx-005",
    title: "Restaurant Dinner",
    amount: -3200,
    date: "2023-07-12",
    time: "08:30 PM",
    type: "expense",
    status: "completed",
    method: "card",
    category: "Dining",
    description: "Dinner with friends",
    recipient: {
      name: "Java House",
      account: "Card Payment",
      image: null,
    },
    sender: {
      name: "Your Card",
      account: "****8901",
      image: null,
    },
  },
  {
    id: "tx-006",
    title: "Internet Subscription",
    amount: -6000,
    date: "2023-07-15",
    time: "11:20 AM",
    type: "expense",
    status: "pending",
    method: "mpesa",
    category: "Utilities",
    description: "Monthly internet subscription",
    recipient: {
      name: "Safaricom",
      account: "Paybill: 888880",
      image: null,
    },
    sender: {
      name: "Your M-Pesa",
      account: "0712 345 678",
      image: null,
    },
  },
  {
    id: "tx-007",
    title: "Rent Payment",
    amount: -35000,
    date: "2023-07-01",
    time: "09:00 AM",
    type: "expense",
    status: "completed",
    method: "bank",
    category: "Housing",
    description: "Monthly rent payment",
    recipient: {
      name: "Landlord",
      account: "Bank Transfer",
      image: null,
    },
    sender: {
      name: "Your Account",
      account: "****4567",
      image: null,
    },
  },
  {
    id: "tx-008",
    title: "Refund",
    amount: 1500,
    date: "2023-07-18",
    time: "02:30 PM",
    type: "income",
    status: "completed",
    method: "mpesa",
    category: "Refund",
    description: "Refund for returned item",
    recipient: {
      name: "Your M-Pesa",
      account: "0712 345 678",
      image: null,
    },
    sender: {
      name: "Jumia Kenya",
      account: "Business Account",
      image: null,
    },
  },
  {
    id: "tx-009",
    title: "Fuel",
    amount: -4000,
    date: "2023-07-20",
    time: "05:45 PM",
    type: "expense",
    status: "completed",
    method: "card",
    category: "Transportation",
    description: "Fuel for the week",
    recipient: {
      name: "Shell Station",
      account: "Card Payment",
      image: null,
    },
    sender: {
      name: "Your Card",
      account: "****8901",
      image: null,
    },
  },
  {
    id: "tx-010",
    title: "Money Transfer",
    amount: -10000,
    date: "2023-07-22",
    time: "10:15 AM",
    type: "expense",
    status: "failed",
    method: "mpesa",
    category: "Transfer",
    description: "Money transfer to family",
    recipient: {
      name: "Jane Doe",
      account: "0734 567 890",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
    },
    sender: {
      name: "Your M-Pesa",
      account: "0712 345 678",
      image: null,
    },
  },
]

const methodIcons = {
  mpesa: <Phone className="h-4 w-4" />,
  card: <CreditCard className="h-4 w-4" />,
  bank: <Building className="h-4 w-4" />,
  wallet: <Wallet className="h-4 w-4" />,
}

const statusColors = {
  completed: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300",
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300",
  failed: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300",
}

export function TransactionList({ status, onSelectTransaction, searchQuery = "", filterType = "all" }) {
  const [transactions, setTransactions] = useState([])
  const [page, setPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    // Filter transactions based on status, search query, and filter type
    let filtered = [...allTransactions]

    if (status) {
      filtered = filtered.filter((tx) => tx.status === status)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (tx) =>
          tx.title.toLowerCase().includes(query) ||
          tx.description.toLowerCase().includes(query) ||
          tx.category.toLowerCase().includes(query) ||
          tx.recipient.name.toLowerCase().includes(query) ||
          tx.sender.name.toLowerCase().includes(query),
      )
    }

    if (filterType !== "all") {
      if (filterType === "income" || filterType === "expense") {
        filtered = filtered.filter((tx) => tx.type === filterType)
      } else if (filterType === "mpesa" || filterType === "bank") {
        filtered = filtered.filter((tx) => tx.method === filterType)
      }
    }

    setTransactions(filtered)
    setPage(1) // Reset to first page when filters change
  }, [status, searchQuery, filterType])

  const paginatedTransactions = transactions.slice(0, page * itemsPerPage)
  const hasMore = paginatedTransactions.length < transactions.length

  return (
    <div className="space-y-4">
      {paginatedTransactions.length > 0 ? (
        <>
          {paginatedTransactions.map((transaction) => (
            <Card
              key={transaction.id}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => onSelectTransaction(transaction)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {transaction.type === "income" ? (
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <ArrowUpRight className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                        <ArrowDownLeft className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium truncate">{transaction.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {transaction.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>{transaction.date}</span>
                      <span>•</span>
                      <span>{transaction.time}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {methodIcons[transaction.method]}
                        {transaction.method === "mpesa"
                          ? "M-Pesa"
                          : transaction.method === "card"
                            ? "Card"
                            : transaction.method === "bank"
                              ? "Bank"
                              : "Wallet"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`font-medium ${transaction.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {transaction.type === "income" ? "+" : "-"}KSh{Math.abs(transaction.amount).toLocaleString()}
                    </span>
                    <Badge variant="secondary" className={`text-xs ${statusColors[transaction.status]}`}>
                      {transaction.status === "pending" && <RefreshCw className="mr-1 h-3 w-3 animate-spin" />}
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
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
          <p className="text-muted-foreground">No transactions found</p>
        </div>
      )}
    </div>
  )
}
