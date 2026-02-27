import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  MapPin, 
  Award, 
  Users, 
  TrendingUp,
  Calendar,
  Star
} from "lucide-react";
import MetaTags from "../components/seo/MetaTags";
import StructuredData from "../components/seo/StructuredData";
import Breadcrumbs from "../components/seo/Breadcrumbs";

export default function FounderProfile() {
  const { founderId } = useParams();

  const { data: founder, isLoading } = useQuery({
    queryKey: ['founder', founderId],
    queryFn: async () => {
      const users = await base44.entities.User.filter({ 
        id: founderId,
        is_founder: true 
      });
      return users[0];
    }
  });

  const { data: tier } = useQuery({
    queryKey: ['founderTier', founderId],
    queryFn: async () => {
      if (!founderId) return null;
      const tiers = await base44.entities.UserContributionTier.filter({ 
        user_id: founderId 
      });
      return tiers[0];
    },
    enabled: !!founderId
  });

  const { data: profile } = useQuery({
    queryKey: ['driverProfile', founderId],
    queryFn: async () => {
      if (!founderId) return null;
      const profiles = await base44.entities.DriverProfile.filter({ 
        user_id: founderId 
      });
      return profiles[0];
    },
    enabled: !!founderId
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!founder) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Founder Not Found</h1>
          <p className="text-slate-600 mb-4">This founder profile doesn't exist or has been removed.</p>
          <Link to={createPageUrl('Home')} className="text-blue-600 hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const tierColors = {
    'new': 'bg-slate-100 text-slate-800',
    'trusted': 'bg-blue-100 text-blue-800',
    'expert': 'bg-purple-100 text-purple-800',
    'verified_driver': 'bg-green-100 text-green-800'
  };

  const breadcrumbItems = [
    { label: 'Founders', url: createPageUrl('FounderDirectory') },
    { label: founder.full_name || 'Founder', url: `/founder/${founderId}` }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <MetaTags
        title={`${founder.full_name} - Travel Founder`}
        description={`Meet ${founder.full_name}, a Travel Founder with ${tier?.routes_submitted || 0} route contributions and ${tier?.network_count_valid || 0} validated referrals.`}
        canonical={`/travel/founders/${founderId}`}
        type="profile"
        author={founder.full_name}
      />
      
      <StructuredData
        type="Person"
        data={{
          name: founder.full_name,
          description: `Travel Founder with ${tier?.routes_submitted || 0} contributions`,
          slug: founderId,
          image: profile?.profile_photo_url
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Founder Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile?.profile_photo_url} />
                <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl">
                  {founder.full_name?.charAt(0) || 'F'}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-slate-900">
                    {founder.full_name}
                  </h1>
                  <Badge className="bg-blue-600 text-white">
                    Founder
                  </Badge>
                  {tier && (
                    <Badge className={tierColors[tier.tier] || 'bg-slate-100'}>
                      {tier.tier === 'verified_driver' ? 'Verified Driver' : tier.tier}
                    </Badge>
                  )}
                </div>

                {profile?.driver_bio && (
                  <p className="text-slate-600 mb-4">{profile.driver_bio}</p>
                )}

                <div className="flex flex-wrap gap-4 text-sm">
                  {founder.city && (
                    <div className="flex items-center text-slate-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {founder.city}
                    </div>
                  )}
                  {founder.created_date && (
                    <div className="flex items-center text-slate-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Joined {new Date(founder.created_date).toLocaleDateString()}
                    </div>
                  )}
                  {profile?.rating > 0 && (
                    <div className="flex items-center text-slate-600">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      {profile.rating.toFixed(1)} ({profile.total_reviews} reviews)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Routes Submitted</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {tier?.routes_submitted || 0}
                  </p>
                </div>
                <MapPin className="w-10 h-10 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Routes Approved</p>
                  <p className="text-3xl font-bold text-green-600">
                    {tier?.routes_approved || 0}
                  </p>
                </div>
                <Award className="w-10 h-10 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Accuracy Score</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {((tier?.accuracy_score || 0) * 100).toFixed(0)}%
                  </p>
                </div>
                <TrendingUp className="w-10 h-10 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Driver Information */}
        {profile && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Driver Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Vehicle</p>
                  <p className="font-medium">
                    {profile.vehicle_make} {profile.vehicle_model} ({profile.vehicle_year})
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Capacity</p>
                  <p className="font-medium">{profile.vehicle_capacity} passengers</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Trips</p>
                  <p className="font-medium">{profile.total_trips_completed || 0} trips</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Status</p>
                  <Badge className={
                    profile.verification_status === 'verified' ? 'bg-green-100 text-green-800' :
                    profile.verification_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-slate-100 text-slate-800'
                  }>
                    {profile.verification_status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contribution Stats */}
        {tier && (
          <Card>
            <CardHeader>
              <CardTitle>Contribution History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-slate-600">Submission Rate</span>
                  <span className="font-medium">
                    {tier.routes_submitted > 0 
                      ? ((tier.routes_approved / tier.routes_submitted) * 100).toFixed(0) 
                      : 0}% approval
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-slate-600">Last Submission</span>
                  <span className="font-medium">
                    {tier.last_submission_date 
                      ? new Date(tier.last_submission_date).toLocaleDateString()
                      : 'No submissions yet'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600">Can Review Others</span>
                  <Badge className={tier.can_review_others ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}>
                    {tier.can_review_others ? 'Yes' : 'No'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}