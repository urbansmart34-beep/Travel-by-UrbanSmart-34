import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { format } from "date-fns";

export default function FinancialOperations() {
  const { data: financialData, isLoading } = useQuery({
    queryKey: ['adminFinancials'],
    queryFn: async () => {
      const [transactions, withdrawals, wallets] = await Promise.all([
        base44.asServiceRole.entities.WalletTransaction.list('-created_date', 50),
        base44.asServiceRole.entities.WithdrawalRequest.filter({ status: 'pending' }),
        base44.asServiceRole.entities.Wallet.filter({})
      ]);

      const totalBalance = wallets.reduce((sum, w) => sum + (w.balance || 0), 0);
      const pendingWithdrawals = withdrawals.reduce((sum, w) => sum + (w.requested_amount || 0), 0);

      return {
        recentTransactions: transactions,
        pendingWithdrawals: withdrawals,
        totalBalance,
        pendingWithdrawalsAmount: pendingWithdrawals
      };
    },
    refetchInterval: 30000
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getTypeLabel = (type) => {
    return type?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Wallet Balance</p>
                <p className="text-2xl font-bold text-slate-900 mt-2">
                  R{(financialData?.totalBalance || 0).toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Withdrawals</p>
                <p className="text-2xl font-bold text-slate-900 mt-2">
                  R{(financialData?.pendingWithdrawalsAmount || 0).toFixed(2)}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {financialData?.pendingWithdrawals?.length || 0} requests
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Recent Transactions</p>
                <p className="text-2xl font-bold text-slate-900 mt-2">
                  {financialData?.recentTransactions?.length || 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Withdrawals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {financialData?.pendingWithdrawals?.length > 0 ? (
                financialData.pendingWithdrawals.slice(0, 5).map((withdrawal) => (
                  <div
                    key={withdrawal.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        R{withdrawal.requested_amount?.toFixed(2)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {format(new Date(withdrawal.created_date), 'MMM d, yyyy HH:mm')}
                      </p>
                    </div>
                    <Button size="sm">Process</Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">
                  No pending withdrawals
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {financialData?.recentTransactions?.slice(0, 10).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-2 border-b"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{getTypeLabel(transaction.type)}</p>
                    <p className="text-xs text-slate-500">
                      {format(new Date(transaction.created_date), 'MMM d, HH:mm')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-semibold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount >= 0 ? '+' : ''}R{Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}