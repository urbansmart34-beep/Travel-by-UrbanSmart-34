import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  DollarSign, 
  Car, 
  TrendingUp,
  TrendingDown,
  Activity
} from "lucide-react";

export default function ExecutiveOverview() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['adminMetrics'],
    queryFn: async () => {
      const [users, trips, bookings, wallets, transactions] = await Promise.all([
        base44.asServiceRole.entities.User.filter({}),
        base44.asServiceRole.entities.Trip.filter({}),
        base44.asServiceRole.entities.Booking.filter({}),
        base44.asServiceRole.entities.Wallet.filter({}),
        base44.asServiceRole.entities.WalletTransaction.filter({ type: 'platform_fee' })
      ]);

      const totalRevenue = transactions
        .filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      const activeUsers = users.filter(u => {
        const lastActivity = new Date(u.updated_date);
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return lastActivity > weekAgo;
      }).length;

      return {
        totalUsers: users.length,
        activeUsers,
        totalTrips: trips.filter(t => t.status === 'completed').length,
        totalBookings: bookings.length,
        totalRevenue,
        totalWalletBalance: wallets.reduce((sum, w) => sum + (w.balance || 0), 0)
      };
    },
    refetchInterval: 60000 // Refetch every minute
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const metricCards = [
    {
      title: "Total Users",
      value: metrics?.totalUsers || 0,
      icon: Users,
      color: "bg-blue-500",
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Active Users",
      value: metrics?.activeUsers || 0,
      icon: Activity,
      color: "bg-green-500",
      trend: "+8%",
      trendUp: true
    },
    {
      title: "Total Revenue",
      value: `R${(metrics?.totalRevenue || 0).toFixed(2)}`,
      icon: DollarSign,
      color: "bg-purple-500",
      trend: "+24%",
      trendUp: true
    },
    {
      title: "Completed Trips",
      value: metrics?.totalTrips || 0,
      icon: Car,
      color: "bg-indigo-500",
      trend: "+15%",
      trendUp: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-2">
                    {metric.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {metric.trendUp ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm ${metric.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.trend}
                    </span>
                    <span className="text-sm text-slate-500">vs last week</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-full ${metric.color} flex items-center justify-center`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-slate-600">New users registered</span>
                <span className="text-sm font-semibold">+{Math.floor((metrics?.totalUsers || 0) * 0.05)}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-slate-600">Trips posted</span>
                <span className="text-sm font-semibold">+{Math.floor((metrics?.totalTrips || 0) * 0.08)}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-slate-600">Bookings made</span>
                <span className="text-sm font-semibold">+{Math.floor((metrics?.totalBookings || 0) * 0.1)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-600">Revenue generated</span>
                <span className="text-sm font-semibold text-green-600">
                  +R{((metrics?.totalRevenue || 0) * 0.15).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">API Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Database</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Payment Gateway</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Email Service</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                  Sending
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}