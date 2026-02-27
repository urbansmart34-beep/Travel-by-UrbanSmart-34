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

const BANKS = [
  "ABSA",
  "Capitec",
  "FNB",
  "Nedbank",
  "Standard Bank",
  "Investec",
  "African Bank",
  "Other"
];

const ACCOUNT_TYPES = [
  { value: "cheque", label: "Cheque Account" },
  { value: "savings", label: "Savings Account" },
  { value: "transmission", label: "Transmission Account" }
];

export default function AddBankAccountDialog({ open, onClose, userId }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    bank_name: "",
    account_type: "",
    account_holder: "",
    account_number: "",
    branch_code: ""
  });

  const createBankAccount = useMutation({
    mutationFn: (data) => base44.entities.UserBankDetail.create({
      ...data,
      user_id: userId,
      is_default: false,
      verified: false
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['bankAccounts']);
      toast.success("Bank account added successfully");
      onClose();
      setFormData({
        bank_name: "",
        account_type: "",
        account_holder: "",
        account_number: "",
        branch_code: ""
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add bank account");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.bank_name || !formData.account_type || !formData.account_holder || 
        !formData.account_number || !formData.branch_code) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.branch_code.length !== 6) {
      toast.error("Branch code must be 6 digits");
      return;
    }

    createBankAccount.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Bank Account</DialogTitle>
          <DialogDescription>
            Add a bank account for withdrawals
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="bank_name">Bank Name</Label>
            <Select
              value={formData.bank_name}
              onValueChange={(value) => setFormData({ ...formData, bank_name: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select bank" />
              </SelectTrigger>
              <SelectContent>
                {BANKS.map((bank) => (
                  <SelectItem key={bank} value={bank}>
                    {bank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="account_type">Account Type</Label>
            <Select
              value={formData.account_type}
              onValueChange={(value) => setFormData({ ...formData, account_type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                {ACCOUNT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="account_holder">Account Holder Name</Label>
            <Input
              id="account_holder"
              value={formData.account_holder}
              onChange={(e) => setFormData({ ...formData, account_holder: e.target.value })}
              placeholder="Full name as per bank account"
            />
          </div>

          <div>
            <Label htmlFor="account_number">Account Number</Label>
            <Input
              id="account_number"
              value={formData.account_number}
              onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
              placeholder="Account number"
            />
          </div>

          <div>
            <Label htmlFor="branch_code">Branch Code</Label>
            <Input
              id="branch_code"
              value={formData.branch_code}
              onChange={(e) => setFormData({ ...formData, branch_code: e.target.value })}
              placeholder="6-digit branch code"
              maxLength={6}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={createBankAccount.isPending}
            >
              {createBankAccount.isPending ? "Adding..." : "Add Account"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}