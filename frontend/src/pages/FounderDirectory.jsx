import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Award, TrendingUp } from "lucide-react";
import MetaTags from "../components/seo/MetaTags";
import StructuredData from "../components/seo/StructuredData";
import Breadcrumbs from "../components/seo/Breadcrumbs";

export default function FounderDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("all");

  const { data: founders, isLoading } = useQuery({
    queryKey: ['founders'],
    queryFn: async () => {
      const users = await base44.entities.User.filter({ is_founder: true });
      return users.sort((a, b) => 
        new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
      );
    }
  });

  const { data: tiers } = useQuery({
    queryKey: ['allTiers'],
    queryFn: async () => {
      return await base44.entities.UserContributionTier.list();
    }
  });

  const { data: profiles } = useQuery({
    queryKey: ['allProfiles'],
    queryFn: async () => {
      return await base44.entities.DriverProfile.list();
    }
  });

  const getTierForFounder = (founderId) => {
    return tiers?.find(t => t.user_id === founderId);
  };

  const getProfileForFounder = (founderId) => {
    return profiles?.find(p => p.user_id === founderId);
  };

  const filteredFounders = founders?.filter(founder => {
    const query = searchQuery.toLowerCase();
    const tier = getTierForFounder(founder.id);
    
    const matchesSearch = founder.full_name?.toLowerCase().includes(query) ||
                         founder.email?.toLowerCase().includes(query) ||
                         founder.city?.toLowerCase().includes(query);
    
    const matchesTier = tierFilter === "all" || tier?.tier === tierFilter;
    
    return matchesSearch && matchesTier;
  }) || [];

  const tierColors = {
    'new': 'bg-slate-100 text-slate-800',
    'trusted': 'bg-blue-100 text-blue-800',
    'expert': 'bg-purple-100 text-purple-800',
    'verified_driver': 'bg-green-100 text-green-800'
  };

  const breadcrumbItems = [
    { label: 'Founders', url: '/founders' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <MetaTags
        title="Founder Directory"
        description="Meet the founders of Travel by UrbanSmart-34. Verified drivers and community leaders contributing to affordable ridesharing."
        canonical="/travel/founders"
        keywords="founders, verified drivers, community leaders, ridesharing network"
      />
      
      <StructuredData
        type="Organization"
        data={{ founders: founders?.map(f => f.full_name) || [] }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Founder Directory
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Meet the community leaders driving Travel by UrbanSmart-34
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-12 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search founders by name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6"
            />
          </div>
          
          <Select value={tierFilter} onValueChange={setTierFilter}>
            <SelectTrigger className="w-full sm:w-48 py-6">
              <SelectValue placeholder="All Tiers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="trusted">Trusted</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
              <SelectItem value="verified_driver">Verified Driver</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Founders Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFounders.map((founder) => {
                const tier = getTierForFounder(founder.id);
                const profile = getProfileForFounder(founder.id);

                return (
                  <Link key={founder.id} to={`/founder/${founder.id}`}>
                    <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={profile?.profile_photo_url} />
                            <AvatarFallback className="bg-blue-100 text-blue-700">
                              {founder.full_name?.charAt(0) || 'F'}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-900 mb-1 truncate">
                              {founder.full_name || 'Anonymous Founder'}
                            </h3>
                            {tier && (
                              <Badge className={tierColors[tier.tier]}>
                                {tier.tier === 'verified_driver' ? 'Verified Driver' : tier.tier}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {founder.city && (
                          <div className="flex items-center text-slate-600 text-sm mb-4">
                            <MapPin className="w-4 h-4 mr-2" />
                            {founder.city}
                          </div>
                        )}

                        <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">
                              {tier?.routes_submitted || 0}
                            </p>
                            <p className="text-xs text-slate-600">Routes</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">
                              {tier?.routes_approved || 0}
                            </p>
                            <p className="text-xs text-slate-600">Approved</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">
                              {((tier?.accuracy_score || 0) * 100).toFixed(0)}%
                            </p>
                            <p className="text-xs text-slate-600">Accuracy</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {filteredFounders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-600">No founders found matching your search.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}