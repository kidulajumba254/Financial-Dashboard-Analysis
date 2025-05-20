"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/date-range-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransactionList } from "@/components/transactions/transaction-list"
import { TransactionDetails } from "@/components/transactions/transaction-details"
import { Download, Filter, Search } from "lucide-react"

export default function TransactionsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <DateRangePicker className="w-full sm:w-auto" />
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_250px]">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expenses</SelectItem>
                <SelectItem value="mpesa">M-Pesa Only</SelectItem>
                <SelectItem value="bank">Bank Transfers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <TransactionList
                onSelectTransaction={setSelectedTransaction}
                searchQuery={searchQuery}
                filterType={filterType}
              />
            </TabsContent>
            <TabsContent value="pending">
              <TransactionList
                status="pending"
                onSelectTransaction={setSelectedTransaction}
                searchQuery={searchQuery}
                filterType={filterType}
              />
            </TabsContent>
            <TabsContent value="completed">
              <TransactionList
                status="completed"
                onSelectTransaction={setSelectedTransaction}
                searchQuery={searchQuery}
                filterType={filterType}
              />
            </TabsContent>
            <TabsContent value="failed">
              <TransactionList
                status="failed"
                onSelectTransaction={setSelectedTransaction}
                searchQuery={searchQuery}
                filterType={filterType}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          {selectedTransaction ? (
            <TransactionDetails transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Transaction Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Select a transaction to view its details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
