import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

export default function WithdrawFundsDialog({ open, onClose, wallet, bankAccounts, availableBalance }) {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");
  const [selectedBankId, setSelectedBankId] = useState("");
  const [reason, setReason] = useState("earnings");

  const processingFee = amount ? Math.max(5, parseFloat(amount) * 0.01) : 0;
  const netAmount = amount ? parseFloat(amount) - processingFee : 0;

  const createWithdrawal = useMutation({
    mutationFn: async (data) => {
      // Create withdrawal request
      const withdrawal = await base44.entities.WithdrawalRequest.create(data);
      
      // Create corresponding wallet transaction
      await base44.entities.WalletTransaction.create({
        wallet_id: wallet.id,
        user_id: wallet.user_id,
        reference: withdrawal.reference,
        type: "withdrawal",
        amount: -parseFloat(amount),
        status: "pending",
        description: `Withdrawal request: ${withdrawal.reference}`,
        payment_method: "bank_transfer",
        previous_balance: wallet.balance,
        new_balance: wallet.balance
      });

      // Update wallet pending withdrawals
      await base44.entities.Wallet.update(wallet.id, {
        pending_withdrawals: (wallet.pending_withdrawals || 0) + parseFloat(amount)
      });

      return withdrawal;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['wallet']);
      queryClient.invalidateQueries(['withdrawals']);
      queryClient.invalidateQueries(['transactions']);
      toast.success("Withdrawal request submitted successfully");
      onClose();
      setAmount("");
      setSelectedBankId("");
      setReason("earnings");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create withdrawal request");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const withdrawAmount = parseFloat(amount);

    if (!withdrawAmount || withdrawAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (withdrawAmount < 100) {
      toast.error("Minimum withdrawal amount is R100");
      return;
    }

    if (withdrawAmount > availableBalance) {
      toast.error("Insufficient balance");
      return;
    }

    if (!selectedBankId) {
      toast.error("Please select a bank account");
      return;
    }

    const reference = `WDR-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    createWithdrawal.mutate({
      wallet_id: wallet.id,
      user_id: wallet.user_id,
      requested_amount: withdrawAmount,
      processing_fee: processingFee,
      net_amount: netAmount,
      bank_detail_id: selectedBankId,
      status: "pending",
      reference: reference,
      withdrawal_reason: reason
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            Request a withdrawal to your bank account
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-medium">Available Balance: R {availableBalance.toFixed(2)}</p>
              <p className="text-blue-700 mt-1">Minimum withdrawal: R100</p>
            </div>
          </div>

          <div>
            <Label htmlFor="amount">Withdrawal Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="100"
              max={availableBalance}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div>
            <Label htmlFor="bank_account">Bank Account</Label>
            <Select value={selectedBankId} onValueChange={setSelectedBankId}>
              <SelectTrigger>
                <SelectValue placeholder="Select bank account" />
              </SelectTrigger>
              <SelectContent>
                {bankAccounts.filter(acc => acc.verified).map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.bank_name} - {account.account_type} (**** {account.account_number?.slice(-4)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {bankAccounts.filter(acc => acc.verified).length === 0 && (
              <p className="text-sm text-red-600 mt-1">
                No verified bank accounts. Please add and verify a bank account first.
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="reason">Withdrawal Reason</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="earnings">Earnings</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {amount && parseFloat(amount) >= 100 && (
            <div className="bg-slate-50 rounded-lg p-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Withdrawal Amount:</span>
                <span className="font-medium">R {parseFloat(amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Processing Fee:</span>
                <span className="font-medium">R {processingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-semibold">You'll Receive:</span>
                <span className="font-semibold text-green-600">R {netAmount.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={createWithdrawal.isPending || !selectedBankId || parseFloat(amount) < 100}
            >
              {createWithdrawal.isPending ? "Processing..." : "Request Withdrawal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}