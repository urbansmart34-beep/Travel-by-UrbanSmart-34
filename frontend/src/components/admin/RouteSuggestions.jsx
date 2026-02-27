import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle, 
  XCircle, 
  Clock,
  MapPin,
  DollarSign
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function RouteSuggestions() {
  const [filterStatus, setFilterStatus] = useState("pending");
  const [reviewingId, setReviewingId] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");

  const queryClient = useQueryClient();

  const { data: suggestions, isLoading, error } = useQuery({
    queryKey: ['adminRouteSuggestions', filterStatus],
    queryFn: async () => {
      const filter = filterStatus === 'all' ? {} : { status: filterStatus };
      return await base44.entities.RouteSuggestion.filter(filter, '-created_date', 50);
    },
    refetchInterval: 30000
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status, notes }) => {
      return await base44.entities.RouteSuggestion.update(id, {
        status,
        admin_notes: notes || null,
        reviewed_at: new Date().toISOString()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['adminRouteSuggestions']);
      setReviewingId(null);
      setAdminNotes("");
      toast.success('Suggestion updated');
    },
    onError: (error) => {
      console.error('Update error:', error);
      toast.error('Failed to update suggestion');
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Route Suggestions</CardTitle>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="all">All</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestions?.length === 0 ? (
              <p className="text-center text-slate-500 py-8">No suggestions found</p>
            ) : (
              suggestions?.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(suggestion.status)}>
                          {suggestion.status}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {suggestion.confidence_level}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="font-medium">{suggestion.origin_name}</span>
                          <span className="text-slate-400">→</span>
                          <span className="font-medium">{suggestion.destination_name}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span>{suggestion.distance_km?.toFixed(2)} km</span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            R{suggestion.suggested_price}
                            {suggestion.distance_km && (
                              <span className="text-slate-400">
                                (R{(suggestion.suggested_price / suggestion.distance_km).toFixed(2)}/km)
                              </span>
                            )}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Submitted {format(new Date(suggestion.created_date), 'MMM d, yyyy HH:mm')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {reviewingId === suggestion.id ? (
                    <div className="space-y-3 pt-3 border-t">
                      <Textarea
                        placeholder="Admin notes (optional)"
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => updateMutation.mutate({
                            id: suggestion.id,
                            status: 'approved',
                            notes: adminNotes
                          })}
                          disabled={updateMutation.isPending}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateMutation.mutate({
                            id: suggestion.id,
                            status: 'rejected',
                            notes: adminNotes
                          })}
                          disabled={updateMutation.isPending}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setReviewingId(null);
                            setAdminNotes("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    suggestion.status === 'pending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setReviewingId(suggestion.id)}
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        Review
                      </Button>
                    )
                  )}

                  {suggestion.admin_notes && (
                    <div className="text-sm text-slate-600 bg-slate-50 p-2 rounded">
                      <strong>Admin notes:</strong> {suggestion.admin_notes}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}