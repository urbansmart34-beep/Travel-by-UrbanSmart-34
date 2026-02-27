import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  MapPin, 
  DollarSign, 
  TrendingUp,
  AlertCircle,
  Loader2,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";
import PlaceAutocomplete from "../components/route/PlaceAutocomplete";

export default function SuggestRoute() {
  const [formData, setFormData] = useState({
    origin: null,
    destination: null,
    suggested_price: '',
    confidence_level: 'estimate',
    submission_reason: 'new_route'
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const { data: tier } = useQuery({
    queryKey: ['userTier', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const tiers = await base44.entities.UserContributionTier.filter({ user_id: user.id });
      return tiers[0] || null;
    },
    enabled: !!user
  });

  const submitMutation = useMutation({
    mutationFn: (data) => base44.functions.invoke('submitRouteSuggestion', data),
    onSuccess: (response) => {
      if (response.data.success) {
        setShowSuccessDialog(true);
        setFormData({
          origin: null,
          destination: null,
          suggested_price: '',
          confidence_level: 'estimate',
          submission_reason: 'new_route'
        });
      } else {
        toast.error(response.data.error || 'Failed to submit');
      }
    },
    onError: (error) => {
      toast.error('Failed to submit route suggestion');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form data:', formData);

    if (!formData.origin || !formData.destination) {
      toast.error('Please select both origin and destination');
      return;
    }

    if (!formData.suggested_price || formData.suggested_price < 50) {
      toast.error('Please enter a valid price (minimum R50)');
      return;
    }

    const payload = {
      origin_name: formData.origin.name || formData.origin.address,
      origin_lat: formData.origin.lat,
      origin_lng: formData.origin.lng,
      destination_name: formData.destination.name || formData.destination.address,
      destination_lat: formData.destination.lat,
      destination_lng: formData.destination.lng,
      suggested_price: parseFloat(formData.suggested_price),
      confidence_level: formData.confidence_level,
      submission_reason: formData.submission_reason
    };

    console.log('Submitting payload:', payload);

    submitMutation.mutate(payload);
  };

  const distance = formData.origin && formData.destination
    ? calculateDistance(
        formData.origin.lat,
        formData.origin.lng,
        formData.destination.lat,
        formData.destination.lng
      )
    : 0;

  const pricePerKm = distance && formData.suggested_price
    ? (parseFloat(formData.suggested_price) / distance).toFixed(2)
    : 0;

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertCircle className="w-16 h-16 text-blue-500 mx-auto" />
              <h2 className="text-2xl font-bold">Sign In Required</h2>
              <p className="text-slate-600">
                Please sign in to suggest route prices
              </p>
              <Button onClick={() => base44.auth.redirectToLogin()}>
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Suggest Route Price</h1>
          <p className="text-slate-600 mt-2">Help improve our pricing by sharing your route knowledge</p>
        </div>

        {tier && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Your Contribution Level</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-blue-100 text-blue-800 capitalize">
                      {tier.tier}
                    </Badge>
                    <span className="text-sm text-slate-500">
                      {tier.routes_submitted} submitted • {tier.routes_approved} approved
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">Accuracy</p>
                  <p className="text-2xl font-bold text-green-600">
                    {(tier.accuracy_score * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Route Details</CardTitle>
              <CardDescription>Enter the origin and destination</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Starting Point</Label>
                <PlaceAutocomplete
                  onPlaceSelect={(place) => {
                    console.log('Origin selected:', place);
                    setFormData({ ...formData, origin: place });
                  }}
                  placeholder="Search for origin..."
                />
                {formData.origin && (
                  <p className="text-sm text-slate-600 mt-1">
                    <MapPin className="w-3 h-3 inline mr-1" />
                    {formData.origin.address || formData.origin.name}
                  </p>
                )}
              </div>

              <div>
                <Label>Destination</Label>
                <PlaceAutocomplete
                  onPlaceSelect={(place) => {
                    console.log('Destination selected:', place);
                    setFormData({ ...formData, destination: place });
                  }}
                  placeholder="Search for destination..."
                />
                {formData.destination && (
                  <p className="text-sm text-slate-600 mt-1">
                    <MapPin className="w-3 h-3 inline mr-1" />
                    {formData.destination.address || formData.destination.name}
                  </p>
                )}
              </div>

              {distance > 0 && (
                <Alert>
                  <AlertDescription>
                    <strong>Distance:</strong> {distance.toFixed(2)} km
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Price Suggestion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Price per Seat (R)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="number"
                    min="50"
                    step="10"
                    value={formData.suggested_price}
                    onChange={(e) => setFormData({ ...formData, suggested_price: e.target.value })}
                    placeholder="e.g., 120"
                    className="pl-10"
                  />
                </div>
                {pricePerKm > 0 && (
                  <p className="text-sm text-slate-600 mt-1">
                    R{pricePerKm}/km
                    {(pricePerKm < 2 || pricePerKm > 10) && (
                      <span className="text-red-600 ml-2">
                        (Should be between R2-R10/km)
                      </span>
                    )}
                  </p>
                )}
              </div>

              <div>
                <Label>How confident are you?</Label>
                <select
                  value={formData.confidence_level}
                  onChange={(e) => setFormData({ ...formData, confidence_level: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                >
                  <option value="guess">Guess (general knowledge)</option>
                  <option value="estimate">Estimate (familiar with area)</option>
                  <option value="actual_trip">Actual Trip (traveled recently)</option>
                  <option value="multiple_trips">Multiple Trips (frequent)</option>
                </select>
              </div>

              <div>
                <Label>Reason for Suggestion</Label>
                <select
                  value={formData.submission_reason}
                  onChange={(e) => setFormData({ ...formData, submission_reason: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                >
                  <option value="new_route">New route not in system</option>
                  <option value="price_update">Update existing price</option>
                  <option value="seasonal_change">Seasonal adjustment</option>
                  <option value="error_correction">Correct wrong information</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            disabled={submitMutation.isPending}
            className="w-full"
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit Route Suggestion
              </>
            )}
          </Button>
        </form>

        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <DialogTitle className="text-center text-2xl">Route Submitted Successfully!</DialogTitle>
              <DialogDescription className="text-center pt-2">
                Thank you for contributing to our community! Your route suggestion has been received and is now pending review by our team.
              </DialogDescription>
            </DialogHeader>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-900 text-center">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                You'll be notified once your suggestion is approved and added to the system.
              </p>
            </div>
            <Button 
              onClick={() => setShowSuccessDialog(false)}
              className="w-full mt-4"
            >
              Got it!
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}