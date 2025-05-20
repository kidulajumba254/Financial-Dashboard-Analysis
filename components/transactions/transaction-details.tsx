"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowDownLeft, ArrowUpRight, Download, Phone, CreditCard, Building, Wallet, X, RefreshCw } from "lucide-react"

const methodIcons = {
  mpesa: <Phone className="h-4 w-4" />,
  card: <CreditCard className="h-4 w-4" />,
  bank: <Building className="h-4 w-4" />,
  wallet: <Wallet className="h-4 w-4" />,
}

const statusColors = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

export function TransactionDetails({ transaction, onClose }) {
  if (!transaction) return null

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="sticky top-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">Transaction Details</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center gap-2 py-2">
          <div
            className={`h-12 w-12 rounded-full ${transaction.type === "income" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"} flex items-center justify-center`}
          >
            {transaction.type === "income" ? (
              <ArrowUpRight className="h-6 w-6 text-green-600 dark:text-green-400" />
            ) : (
              <ArrowDownLeft className="h-6 w-6 text-red-600 dark:text-red-400" />
            )}
          </div>
          <span
            className={`text-xl font-bold ${transaction.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
          >
            {transaction.type === "income" ? "+" : "-"}KSh{Math.abs(transaction.amount).toLocaleString()}
          </span>
          <Badge className={`${statusColors[transaction.status]}`}>
            {transaction.status === "pending" && <RefreshCw className="mr-1 h-3 w-3 animate-spin" />}
            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
          </Badge>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">{transaction.title}</h3>
          <p className="text-xs text-muted-foreground">{transaction.description}</p>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date</span>
            <span>{transaction.date}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Time</span>
            <span>{transaction.time}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Category</span>
            <span>{transaction.category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Payment Method</span>
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
          {transaction.method === "mpesa" && transaction.status === "completed" && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">M-Pesa Receipt</span>
              <span className="font-medium">MP{Math.floor(Math.random() * 1000000000)}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="text-sm font-medium">From</h4>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={transaction.sender.image || "/placeholder.svg"} alt={transaction.sender.name} />
              <AvatarFallback>{getInitials(transaction.sender.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{transaction.sender.name}</p>
              <p className="text-xs text-muted-foreground">{transaction.sender.account}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">To</h4>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={transaction.recipient.image || "/placeholder.svg"} alt={transaction.recipient.name} />
              <AvatarFallback>{getInitials(transaction.recipient.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{transaction.recipient.name}</p>
              <p className="text-xs text-muted-foreground">{transaction.recipient.account}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Receipt
        </Button>
        {transaction.status === "failed" && (
          <Button size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
