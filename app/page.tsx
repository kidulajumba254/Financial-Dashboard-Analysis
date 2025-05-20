import { AccountsOverview } from "@/components/accounts-overview"
import { RecentTransactions } from "@/components/recent-transactions"
import { QuickBillPay } from "@/components/quick-bill-pay"
import { BusinessMetrics } from "@/components/business-metrics"

export default function Dashboard() {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-kenyan-red to-maasai-red bg-clip-text text-transparent">
          Karibu Dashboard
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Manage your finances with our Kenyan-inspired dashboard
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="kenyan-card transform hover:scale-105 transition-transform duration-200">
          <AccountsOverview />
        </div>
        <div className="savannah-card transform hover:scale-105 transition-transform duration-200">
          <RecentTransactions />
        </div>
        <div className="kenyan-card transform hover:scale-105 transition-transform duration-200 lg:col-span-1 md:col-span-2 sm:col-span-1">
          <QuickBillPay />
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 backdrop-blur-sm bg-white/50">
        <BusinessMetrics />
      </div>
    </div>
  )
}
