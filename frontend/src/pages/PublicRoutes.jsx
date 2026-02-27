import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, DollarSign, TrendingUp, Search } from "lucide-react";
import MetaTags from "../components/seo/MetaTags";
import StructuredData from "../components/seo/StructuredData";
import Breadcrumbs from "../components/seo/Breadcrumbs";

export default function PublicRoutes() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: routes, isLoading } = useQuery({
    queryKey: ['publicRoutes'],
    queryFn: async () => {
      const routes = await base44.entities.FixedRoute.filter({ is_active: true });
      return routes.sort((a, b) => (b.booking_count || 0) - (a.booking_count || 0));
    }
  });

  const filteredRoutes = routes?.filter(route => {
    const query = searchQuery.toLowerCase();
    return route.route_name?.toLowerCase().includes(query) ||
      route.origin?.toLowerCase().includes(query) ||
      route.destination?.toLowerCase().includes(query);
  }) || [];

  const breadcrumbItems = [
    { label: 'Routes', url: '/routes' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <MetaTags
        title="Popular Routes"
        description="Explore affordable ridesharing routes across South Africa. Find reliable drivers on popular routes between major cities."
        canonical="/travel/routes"
        keywords="ridesharing routes, South Africa transport, affordable travel, intercity rides"
      />

      <StructuredData
        type="Organization"
        data={{}}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Popular Routes
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover the most traveled routes on Travel by UrbanSmart-34
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search routes by city or destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
        </div>

        {/* Routes Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoutes.map((route) => (
              <Link
                key={route.id}
                to={`${createPageUrl('FindRides')}?route=${route.id}`}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                          {route.route_name}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center text-slate-600 text-sm">
                            <MapPin className="w-4 h-4 mr-2 text-green-600" />
                            {route.origin}
                          </div>
                          <div className="flex items-center text-slate-600 text-sm">
                            <MapPin className="w-4 h-4 mr-2 text-red-600" />
                            {route.destination}
                          </div>
                        </div>
                      </div>
                      {(route.booking_count || 0) > 50 && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Popular
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center text-green-600 font-bold text-xl">
                        <DollarSign className="w-5 h-5" />
                        R{route.base_price_rand?.toFixed(2)}
                      </div>
                      <div className="flex items-center text-slate-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        ~{route.estimated_duration_minutes}m
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-slate-500">
                      {route.distance_km?.toFixed(0)}km • {route.municipality_type || 'Cross-City'}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {filteredRoutes.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-slate-600">No routes found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}