import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DollarSign, 
  Users,
  TrendingUp,
  ArrowUpRight,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function PayoutManagement() {
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [processingBatch, setProcessingBatch] = useState(null);
  const queryClient = useQueryClient();

  const { data: earnings, isLoading: earningsLoading } = useQuery({
    queryKey: ['driverEarnings'],
    queryFn: async () => {
      const earnings = await base44.asServiceRole.entities.DriverEarnings.list('-available_balance', 100);
      return earnings || [];
    },
    refetchInterval: 30000
  });

  const { data: batches } = useQuery({
    queryKey: ['payoutBatches'],
    queryFn: async () => {
      return await base44.asServiceRole.entities.PayoutBatch.list('-created_date', 20);
    }
  });

  const createBatchMutation = useMutation({
    mutationFn: (driverIds) => base44.functions.invoke('createPayoutBatch', { driver_ids: driverIds }),
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success(`Batch created: ${response.data.batch.batch_number}`);
        queryClient.invalidateQueries(['payoutBatches']);
        queryClient.invalidateQueries(['driverEarnings']);
        setSelectedDrivers([]);
      }
    },
    onError: () => {
      toast.error('Failed to create batch');
    }
  });

  const processBatchMutation = useMutation({
    mutationFn: (batchId) => base44.functions.invoke('processPayoutBatch', { 
      batch_id: batchId,
      payment_method: 'manual'
    }),
    onSuccess: (response, batchId) => {
      if (response.data.success) {
        toast.success(`Processed ${response.data.processed} payouts`);
        queryClient.invalidateQueries(['payoutBatches']);
        queryClient.invalidateQueries(['driverEarnings']);
        setProcessingBatch(null);
      }
    },
    onError: () => {
      toast.error('Failed to process batch');
      setProcessingBatch(null);
    }
  });

  const eligibleDrivers = earnings?.filter(e => e.available_balance >= 200) || [];
  const totalPending = eligibleDrivers.reduce((sum, e) => sum + e.available_balance, 0);

  const handleToggleDriver = (driverId) => {
    setSelectedDrivers(prev => 
      prev.includes(driverId) 
        ? prev.filter(id => id !== driverId)
        : [...prev, driverId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDrivers.length === eligibleDrivers.length) {
      setSelectedDrivers([]);
    } else {
      setSelectedDrivers(eligibleDrivers.map(e => e.user_id));
    }
  };

  if (earningsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending Payouts</p>
                <p className="text-2xl font-bold text-green-600">
                  R{totalPending.toFixed(2)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Eligible Drivers</p>
                <p className="text-2xl font-bold text-blue-600">
                  {eligibleDrivers.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Selected</p>
                <p className="text-2xl font-bold text-slate-900">
                  {selectedDrivers.length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-slate-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Driver Queue */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Driver Payout Queue</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                disabled={eligibleDrivers.length === 0}
              >
                {selectedDrivers.length === eligibleDrivers.length ? 'Deselect All' : 'Select All'}
              </Button>
              <Button
                size="sm"
                onClick={() => createBatchMutation.mutate(selectedDrivers)}
                disabled={selectedDrivers.length === 0 || createBatchMutation.isPending}
              >
                {createBatchMutation.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                )}
                Create Batch ({selectedDrivers.length})
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {eligibleDrivers.length === 0 ? (
              <p className="text-center text-slate-500 py-8">No drivers eligible for payout</p>
            ) : (
              eligibleDrivers.map((earning) => (
                <div
                  key={earning.user_id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedDrivers.includes(earning.user_id)}
                      onCheckedChange={() => handleToggleDriver(earning.user_id)}
                    />
                    <div>
                      <p className="font-medium">Driver ID: {earning.user_id.slice(0, 8)}</p>
                      <p className="text-sm text-slate-600">
                        Last payout: {earning.last_payout_date ? format(new Date(earning.last_payout_date), 'MMM d, yyyy') : 'Never'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">R{earning.available_balance.toFixed(2)}</p>
                    {earning.pending_balance > 0 && (
                      <p className="text-xs text-slate-500">
                        R{earning.pending_balance.toFixed(2)} pending
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Batches */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Batches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {batches?.length === 0 ? (
              <p className="text-center text-slate-500 py-8">No batches created yet</p>
            ) : (
              batches?.map((batch) => (
                <div
                  key={batch.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{batch.batch_number}</p>
                    <p className="text-sm text-slate-600">
                      {batch.driver_count} drivers • R{batch.total_amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {batch.processed_at ? format(new Date(batch.processed_at), 'MMM d, yyyy HH:mm') : 'Not processed'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={
                      batch.status === 'completed' ? 'bg-green-100 text-green-800' :
                      batch.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      batch.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }>
                      {batch.status}
                    </Badge>
                    {batch.status === 'draft' && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setProcessingBatch(batch.id);
                          processBatchMutation.mutate(batch.id);
                        }}
                        disabled={processingBatch === batch.id}
                      >
                        {processingBatch === batch.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          'Process'
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}