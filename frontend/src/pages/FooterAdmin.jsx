import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Plus, Settings, TrendingUp, Shield } from "lucide-react";
import { toast } from "sonner";

export default function FooterAdmin() {
  const [activeTab, setActiveTab] = useState("overview");
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const { data: configs, isLoading: loadingConfigs } = useQuery({
    queryKey: ['footerConfigs'],
    queryFn: async () => {
      const data = await base44.entities.FooterConfiguration.list();
      return data;
    },
  });

  const { data: metrics, isLoading: loadingMetrics } = useQuery({
    queryKey: ['footerMetrics'],
    queryFn: async () => {
      const data = await base44.entities.FooterMetric.list();
      return data;
    },
  });

  const { data: badges, isLoading: loadingBadges } = useQuery({
    queryKey: ['trustBadges'],
    queryFn: async () => {
      const data = await base44.entities.TrustBadge.list();
      return data;
    },
  });

  const updateMetricsMutation = useMutation({
    mutationFn: async () => {
      const response = await base44.functions.invoke('updateFooterMetrics');
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['footerMetrics'] });
      toast.success('Metrics updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update metrics: ${error.message}`);
    },
  });

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You need administrator privileges to access the footer management dashboard.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Footer Management</h1>
            <p className="text-slate-600 mt-1">Manage trust badges, metrics, and configurations</p>
          </div>
          <Button onClick={() => updateMetricsMutation.mutate()} disabled={updateMetricsMutation.isPending}>
            <RefreshCw className={`w-4 h-4 mr-2 ${updateMetricsMutation.isPending ? 'animate-spin' : ''}`} />
            Update Metrics
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="configurations">Configurations</TabsTrigger>
            <TabsTrigger value="badges">Trust Badges</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    Configurations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    {configs?.length || 0}
                  </div>
                  <p className="text-sm text-slate-600">
                    {configs?.filter(c => c.status === 'active').length || 0} active
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    Trust Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    {badges?.length || 0}
                  </div>
                  <p className="text-sm text-slate-600">
                    Across all sections
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    Live Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    {metrics?.filter(m => m.is_live).length || 0}
                  </div>
                  <p className="text-sm text-slate-600">
                    Real-time updates
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates to footer configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Activity log coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configurations">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Footer Configurations</CardTitle>
                  <CardDescription>Manage footer layouts and targeting</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Configuration
                </Button>
              </CardHeader>
              <CardContent>
                {loadingConfigs ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse">
                        <div className="h-16 bg-slate-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : configs?.length > 0 ? (
                  <div className="space-y-4">
                    {configs.map((config) => (
                      <div key={config.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{config.version_name}</h4>
                          <p className="text-sm text-slate-600">
                            Target: {config.target_audience}
                          </p>
                        </div>
                        <Badge variant={config.status === 'active' ? 'default' : 'secondary'}>
                          {config.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-slate-600 py-8">No configurations found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Trust Badges</CardTitle>
                  <CardDescription>Manage security and trust indicators</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Badge
                </Button>
              </CardHeader>
              <CardContent>
                {loadingBadges ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse">
                        <div className="h-20 bg-slate-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : badges?.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {badges.map((badge) => (
                      <div key={badge.id} className="border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          {badge.logo_url && (
                            <img src={badge.logo_url} alt={badge.alt_text} className="w-12 h-12 object-contain" />
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium">{badge.title}</h4>
                            <p className="text-sm text-slate-600 mt-1">{badge.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                              <span>{badge.engagement_metrics?.clicks || 0} clicks</span>
                              <span>Order: {badge.display_order}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-slate-600 py-8">No badges found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics">
            <Card>
              <CardHeader>
                <CardTitle>Live Metrics</CardTitle>
                <CardDescription>Real-time platform statistics</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingMetrics ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse">
                        <div className="h-16 bg-slate-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : metrics?.length > 0 ? (
                  <div className="space-y-4">
                    {metrics.map((metric) => (
                      <div key={metric.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium capitalize">{metric.metric_type.replace(/_/g, ' ')}</h4>
                          <p className="text-sm text-slate-600">
                            Last updated: {new Date(metric.last_updated).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{metric.current_value.toLocaleString()}</div>
                          <Badge variant={metric.trend_direction === 'up' ? 'default' : 'secondary'}>
                            {metric.trend_direction} {metric.trend_percentage.toFixed(1)}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-slate-600 py-8">No metrics found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}