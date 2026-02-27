import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp,
  CreditCard,
  Percent
} from "lucide-react";

export default function FeeAnalytics() {
  const { data: splits } = useQuery({
    queryKey: ['paymentSplits'],
    queryFn: async () => {
      return await base44.asServiceRole.entities.PaymentSplit.list('-split_date', 100);
    },
    refetchInterval: 60000
  });

  const today = new Date().toISOString().split('T')[0];
  const todaySplits = splits?.filter(s => 
    s.split_date && s.split_date.startsWith(today)
  ) || [];

  const totalYocoFees = todaySplits.reduce((sum, s) => sum + (s.payment_gateway_fee || 0), 0);
  const totalRoadLevy = todaySplits.reduce((sum, s) => sum + (s.road_levy || 0), 0);
  const totalPlatformRevenue = todaySplits.reduce((sum, s) => sum + (s.platform_amount || 0), 0);
  const totalDriverEarnings = todaySplits.reduce((sum, s) => sum + (s.net_driver_amount || 0), 0);
  const avgCommission = todaySplits.length > 0 
    ? todaySplits.reduce((sum, s) => sum + (s.driver_percentage || 0), 0) / todaySplits.length
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Today's Yoco Fees</p>
                <p className="text-2xl font-bold text-red-600">
                  R{totalYocoFees.toFixed(2)}
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Road Levy Collected</p>
                <p className="text-2xl font-bold text-blue-600">
                  R{totalRoadLevy.toFixed(2)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Platform Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  R{totalPlatformRevenue.toFixed(2)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg Commission</p>
                <p className="text-2xl font-bold text-slate-900">
                  {avgCommission.toFixed(1)}%
                </p>
              </div>
              <Percent className="w-8 h-8 text-slate-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commission Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium">Driver Commission</p>
                <p className="text-sm text-slate-600">Standard rate for all drivers</p>
              </div>
              <Badge className="bg-green-600 text-white text-lg">90%</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium">Platform Commission</p>
                <p className="text-sm text-slate-600">Platform service fee</p>
              </div>
              <Badge className="bg-blue-600 text-white text-lg">10%</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium">Road Levy</p>
                <p className="text-sm text-slate-600">Fixed per trip</p>
              </div>
              <Badge className="bg-yellow-600 text-white text-lg">R5.00</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Yoco Fee Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b">
              <span className="text-slate-600">Local Cards (Online)</span>
              <span className="font-medium">2.95%</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-slate-600">Local Cards (In-Person)</span>
              <span className="font-medium">2.70%</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-slate-600">International (Online)</span>
              <span className="font-medium">3.40%</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-slate-600">International (In-Person)</span>
              <span className="font-medium">3.20%</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-slate-600">Amex</span>
              <span className="font-medium">3.40%</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Instant EFT</span>
              <span className="font-medium text-green-600">2.00%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today's Transactions ({todaySplits.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {todaySplits.length === 0 ? (
              <p className="text-center text-slate-500 py-8">No transactions today</p>
            ) : (
              todaySplits.slice(0, 10).map((split) => (
                <div key={split.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">R{split.total_amount?.toFixed(2)}</p>
                    <p className="text-xs text-slate-500">
                      Driver: R{split.net_driver_amount?.toFixed(2)} • 
                      Platform: R{split.platform_amount?.toFixed(2)} • 
                      Fees: R{split.payment_gateway_fee?.toFixed(2)}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {split.driver_percentage}% / {100 - split.driver_percentage}%
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}