import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  Download, 
  CheckCircle, 
  XCircle,
  Clock,
  Shield
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function AccountDeletion() {
  const queryClient = useQueryClient();
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [confirmChecked, setConfirmChecked] = useState(false);

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const requestDeletion = useMutation({
    mutationFn: (data) => base44.functions.invoke('requestAccountDeletion', data),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries(['currentUser']);
        toast.success('Account deletion requested successfully');
      } else {
        toast.error(response.data.error || 'Failed to request deletion');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to request deletion');
    }
  });

  const cancelDeletion = useMutation({
    mutationFn: () => base44.functions.invoke('cancelAccountDeletion', {}),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries(['currentUser']);
        toast.success('Account deletion cancelled');
      } else {
        toast.error(response.data.error || 'Failed to cancel deletion');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to cancel deletion');
    }
  });

  const exportData = useMutation({
    mutationFn: () => base44.functions.invoke('exportUserData', {}),
    onSuccess: (response) => {
      if (response.data.success) {
        const blob = new Blob([JSON.stringify(response.data.data, null, 2)], { 
          type: 'application/json' 
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `urbansmart34-data-${new Date().toISOString()}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        toast.success('Data exported successfully');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to export data');
    }
  });

  const handleRequestDeletion = () => {
    if (!confirmChecked) {
      toast.error('Please confirm that you understand this action');
      return;
    }

    if (!reason) {
      toast.error('Please select a reason for deletion');
      return;
    }

    requestDeletion.mutate({
      reason,
      feedback,
      confirmation: true
    });
  };

  const deletionStatus = user?.deletion_status || 'active';
  const scheduledDate = user?.deletion_scheduled_for ? new Date(user.deletion_scheduled_for) : null;
  const daysRemaining = scheduledDate ? Math.ceil((scheduledDate - new Date()) / (1000 * 60 * 60 * 24)) : null;

  if (!user) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Account Deletion</h1>
          <p className="text-slate-600 mt-2">Manage your account deletion request</p>
        </div>

        {/* Status Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Account Status</CardTitle>
              <Badge 
                className={
                  deletionStatus === 'active' ? 'bg-green-100 text-green-800' :
                  deletionStatus === 'deletion_requested' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }
              >
                {deletionStatus === 'active' ? (
                  <><CheckCircle className="w-3 h-3 mr-1" /> Active</>
                ) : deletionStatus === 'deletion_requested' ? (
                  <><Clock className="w-3 h-3 mr-1" /> Deletion Pending</>
                ) : (
                  <><XCircle className="w-3 h-3 mr-1" /> {deletionStatus}</>
                )}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {deletionStatus === 'active' ? (
              <p className="text-slate-600">Your account is active. You can request deletion below.</p>
            ) : deletionStatus === 'deletion_requested' ? (
              <div className="space-y-3">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Your account is scheduled for deletion on {scheduledDate && format(scheduledDate, 'PPP')}
                    {daysRemaining !== null && ` (${daysRemaining} days remaining)`}
                  </AlertDescription>
                </Alert>
                <p className="text-sm text-slate-600">
                  You can cancel this request until 24 hours before the scheduled deletion date.
                </p>
              </div>
            ) : (
              <p className="text-slate-600">Your account is being processed for deletion.</p>
            )}
          </CardContent>
        </Card>

        {/* Actions based on status */}
        {deletionStatus === 'active' && (
          <Card>
            <CardHeader>
              <CardTitle>Request Account Deletion</CardTitle>
              <CardDescription>
                This action will permanently delete your account and personal data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Before requesting deletion:
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Your wallet balance must be zero</li>
                    <li>No pending withdrawals</li>
                    <li>No active bookings</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div>
                <Label>Reason for Deletion</Label>
                <select
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="">Select a reason</option>
                  <option value="privacy_concerns">Privacy Concerns</option>
                  <option value="too_many_emails">Too Many Emails</option>
                  <option value="found_alternative">Found Alternative</option>
                  <option value="not_useful">Not Useful</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <Label>Feedback (Optional)</Label>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us why you're leaving..."
                  rows={3}
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="confirm"
                  checked={confirmChecked}
                  onChange={(e) => setConfirmChecked(e.target.checked)}
                  className="mt-1"
                />
                <Label htmlFor="confirm" className="text-sm">
                  I understand that this action will delete my account in 14 days and cannot be undone after processing
                </Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleRequestDeletion}
                  disabled={requestDeletion.isPending}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {requestDeletion.isPending ? 'Processing...' : 'Request Deletion'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => exportData.mutate()}
                  disabled={exportData.isPending}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {exportData.isPending ? 'Exporting...' : 'Export My Data'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {deletionStatus === 'deletion_requested' && (
          <Card>
            <CardHeader>
              <CardTitle>Pending Deletion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Button
                  onClick={() => cancelDeletion.mutate()}
                  disabled={cancelDeletion.isPending}
                  variant="outline"
                >
                  {cancelDeletion.isPending ? 'Processing...' : 'Cancel Deletion Request'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => exportData.mutate()}
                  disabled={exportData.isPending}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {exportData.isPending ? 'Exporting...' : 'Export My Data'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}