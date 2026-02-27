import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  DollarSign, 
  Car, 
  TrendingUp,
  AlertCircle,
  Activity,
  Wallet,
  MapPin
} from "lucide-react";
import ExecutiveOverview from "../components/admin/ExecutiveOverview";
import UserManagement from "../components/admin/UserManagement";
import FinancialOperations from "../components/admin/FinancialOperations";
import TripManagement from "../components/admin/TripManagement";
import RouteSuggestions from "../components/admin/RouteSuggestions";
import PayoutManagement from "../components/admin/PayoutManagement";
import FeeAnalytics from "../components/admin/FeeAnalytics";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  // Check if user has admin access
  const isAdmin = user?.role === 'admin' || user?.admin_role !== 'none';

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <AlertCircle className="w-16 h-16 text-red-500" />
              <h2 className="text-2xl font-bold text-slate-900">Access Denied</h2>
              <p className="text-slate-600">
                You don't have permission to access the admin dashboard.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-slate-600 mt-1">
                Welcome back, {user.full_name} ({user.admin_role || user.role})
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <Activity className="w-4 h-4 inline mr-1" />
                System Healthy
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200">
            <TabsTrigger value="overview" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="financial" className="gap-2">
              <DollarSign className="w-4 h-4" />
              Financial
            </TabsTrigger>
            <TabsTrigger value="trips" className="gap-2">
              <Car className="w-4 h-4" />
              Trips
            </TabsTrigger>
            <TabsTrigger value="routes" className="gap-2">
              <MapPin className="w-4 h-4" />
              Routes
            </TabsTrigger>
            <TabsTrigger value="payouts" className="gap-2">
              <DollarSign className="w-4 h-4" />
              Payouts
            </TabsTrigger>
            <TabsTrigger value="fees" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Fees
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ExecutiveOverview />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="financial">
            <FinancialOperations />
          </TabsContent>

          <TabsContent value="trips">
            <TripManagement />
          </TabsContent>

          <TabsContent value="routes">
            <RouteSuggestions />
          </TabsContent>

          <TabsContent value="payouts">
            <PayoutManagement />
          </TabsContent>

          <TabsContent value="fees">
            <FeeAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}