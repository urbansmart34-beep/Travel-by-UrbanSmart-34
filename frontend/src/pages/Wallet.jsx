import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Building2
} from "lucide-react";
import { format } from "date-fns";
import AddBankAccountDialog from "../components/wallet/AddBankAccountDialog";
import WithdrawFundsDialog from "../components/wallet/WithdrawFundsDialog";

export default function WalletPage() {
  const queryClient = useQueryClient();
  const [showAddBank, setShowAddBank] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const { data: wallet, isLoading: loadingWallet } = useQuery({
    queryKey: ['wallet', user?.id],
    queryFn: async () => {
      const wallets = await base44.entities.Wallet.filter({ user_id: user.id });
      return wallets[0] || null;
    },
    enabled: !!user?.id
  });

  const { data: transactions = [], isLoading: loadingTransactions } = useQuery({
    queryKey: ['transactions', wallet?.id],
    queryFn: () => base44.entities.WalletTransaction.filter(
      { wallet_id: wallet.id },
      '-created_date',
      50
    ),
    enabled: !!wallet?.id
  });

  const { data: withdrawals = [] } = useQuery({
    queryKey: ['withdrawals', wallet?.id],
    queryFn: () => base44.entities.WithdrawalRequest.filter(
      { wallet_id: wallet.id },
      '-created_date',
      20
    ),
    enabled: !!wallet?.id
  });

  const { data: bankAccounts = [] } = useQuery({
    queryKey: ['bankAccounts', user?.id],
    queryFn: () => base44.entities.UserBankDetail.filter({ user_id: user.id }),
    enabled: !!user?.id
  });

  const availableBalance = wallet ? (wallet.balance || 0) - (wallet.pending_withdrawals || 0) : 0;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'failed': 
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending': 
      case 'processing': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': 
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': 
      case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loadingWallet) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading your wallet...</p>
        </div>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Wallet Not Found</CardTitle>
            <CardDescription>
              Your wallet hasn't been created yet. Please contact support.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Wallet</h1>
          <p className="text-slate-600 mt-2">Manage your balance, transactions, and withdrawals</p>
        </div>

        {/* Balance Card */}
        <Card className="mb-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <WalletIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Total Balance</p>
                  <p className="text-4xl font-bold">R {(wallet.balance || 0).toFixed(2)}</p>
                </div>
              </div>
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                {wallet.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm opacity-90">Available Balance</p>
                <p className="text-2xl font-semibold">R {availableBalance.toFixed(2)}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm opacity-90">Pending Withdrawals</p>
                <p className="text-2xl font-semibold">R {(wallet.pending_withdrawals || 0).toFixed(2)}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-white text-blue-600 hover:bg-slate-50"
                disabled
              >
                <Plus className="w-4 h-4 mr-2" />
                Top Up
              </Button>
              <Button 
                className="flex-1 bg-white/20 hover:bg-white/30 text-white"
                onClick={() => setShowWithdraw(true)}
                disabled={availableBalance < 100 || bankAccounts.length === 0}
              >
                <ArrowDownLeft className="w-4 h-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bank Accounts */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Bank Accounts</CardTitle>
                <CardDescription>Manage your withdrawal bank accounts</CardDescription>
              </div>
              <Button onClick={() => setShowAddBank(true)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Bank Account
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {bankAccounts.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Building2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No bank accounts added yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bankAccounts.map((account) => (
                  <div 
                    key={account.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="font-medium">{account.bank_name}</p>
                        <p className="text-sm text-slate-600">
                          {account.account_type} • **** {account.account_number?.slice(-4)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {account.is_default && (
                        <Badge variant="secondary">Default</Badge>
                      )}
                      {account.verified ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline">Unverified</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>View all your wallet transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingTransactions ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  </div>
                ) : transactions.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No transactions yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.map((txn) => (
                      <div 
                        key={txn.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            txn.amount >= 0 ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {txn.amount >= 0 ? (
                              <ArrowDownLeft className="w-5 h-5 text-green-600" />
                            ) : (
                              <ArrowUpRight className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {txn.description || txn.type?.replace(/_/g, ' ')}
                            </p>
                            <p className="text-sm text-slate-600">
                              {format(new Date(txn.created_date), 'MMM d, yyyy HH:mm')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-semibold ${
                            txn.amount >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {txn.amount >= 0 ? '+' : ''}R {Math.abs(txn.amount).toFixed(2)}
                          </p>
                          <div className="flex items-center gap-1 justify-end">
                            {getStatusIcon(txn.status)}
                            <Badge variant="outline" className={getStatusColor(txn.status)}>
                              {txn.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals">
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Requests</CardTitle>
                <CardDescription>Track your withdrawal requests</CardDescription>
              </CardHeader>
              <CardContent>
                {withdrawals.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <ArrowDownLeft className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No withdrawal requests yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {withdrawals.map((withdrawal) => (
                      <div 
                        key={withdrawal.id}
                        className="p-4 border rounded-lg hover:bg-slate-50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">{withdrawal.reference}</p>
                          <Badge variant="outline" className={getStatusColor(withdrawal.status)}>
                            {withdrawal.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-slate-600">Requested Amount</p>
                            <p className="font-semibold">R {withdrawal.requested_amount?.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Net Amount</p>
                            <p className="font-semibold">R {withdrawal.net_amount?.toFixed(2)}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-slate-600">Requested</p>
                            <p>{format(new Date(withdrawal.created_date), 'MMM d, yyyy HH:mm')}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AddBankAccountDialog 
        open={showAddBank} 
        onClose={() => setShowAddBank(false)}
        userId={user?.id}
      />

      <WithdrawFundsDialog
        open={showWithdraw}
        onClose={() => setShowWithdraw(false)}
        wallet={wallet}
        bankAccounts={bankAccounts}
        availableBalance={availableBalance}
      />
    </div>
  );
}