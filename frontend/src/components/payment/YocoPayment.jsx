import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CreditCard, Wallet } from 'lucide-react';
import { toast } from 'sonner';

const YocoPayment = ({ booking, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [yocoLoaded, setYocoLoaded] = useState(false);

  useEffect(() => {
    if (paymentMethod !== 'card') return;
    
    // Load Yoco SDK
    const script = document.createElement('script');
    script.src = 'https://js.yoco.com/sdk/v1/yoco-sdk-web.js';
    script.async = true;
    script.onload = () => setYocoLoaded(true);
    script.onerror = () => toast.error('Failed to load payment system');
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [paymentMethod]);

  const handleCardPayment = async () => {
    if (!window.YocoSDK) {
      toast.error('Payment system not loaded. Please refresh and try again.');
      return;
    }

    setLoading(true);

    try {
      const yoco = new window.YocoSDK({
        publicKey: 'pk_test_6c3db1b3M4V8OVga7ad4'
      });

      yoco.showPopup({
        amountInCents: Math.round(booking.total_fare * 100),
        currency: 'ZAR',
        name: 'UrbanSmart Ride Booking',
        description: `Booking ${booking.seats_booked} seat(s)`,
        callback: async (result) => {
          if (result.error) {
            setLoading(false);
            toast.error(result.error.message || 'Payment failed');
            if (onError) onError(result.error);
            return;
          }

          try {
            const response = await base44.functions.invoke('processPayment', {
              booking_id: booking.id,
              payment_method: 'card',
              payment_token: result.id
            });

            if (response.data.success) {
              toast.success('Payment secured! Funds will be released to driver after trip.');
              if (onSuccess) onSuccess(response.data);
            } else {
              toast.error(response.data.error || 'Payment failed');
              if (onError) onError(response.data);
            }
          } catch (error) {
            toast.error('Payment processing failed');
            if (onError) onError(error);
          } finally {
            setLoading(false);
          }
        }
      });
    } catch (error) {
      console.error('Yoco initialization error:', error);
      toast.error('Failed to initialize payment system');
      setLoading(false);
      if (onError) onError(error);
    }
  };

  const handleWalletPayment = async () => {
    setLoading(true);
    try {
      const response = await base44.functions.invoke('processPayment', {
        booking_id: booking.id,
        payment_method: 'wallet'
      });

      if (response.data.success) {
        toast.success('Payment successful!');
        if (onSuccess) onSuccess(response.data);
      } else {
        toast.error(response.data.error || 'Payment failed');
        if (onError) onError(response.data);
      }
    } catch (error) {
      toast.error('Payment processing failed');
      if (onError) onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Payment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600">Amount to Pay</p>
          <p className="text-3xl font-bold text-blue-600">R {booking.total_fare?.toFixed(2) || '0.00'}</p>
          <p className="text-xs text-slate-500 mt-2">
            {booking.seats_booked} seat(s) × R{((booking.total_fare || 0) / (booking.seats_booked || 1)).toFixed(2)} each
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={paymentMethod === 'card' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setPaymentMethod('card')}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Card
          </Button>
          <Button
            variant={paymentMethod === 'wallet' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setPaymentMethod('wallet')}
          >
            <Wallet className="w-4 h-4 mr-2" />
            Wallet
          </Button>
        </div>

        {paymentMethod === 'card' ? (
          <Button 
            className="w-full" 
            onClick={handleCardPayment}
            disabled={loading || !yocoLoaded}
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
            ) : (
              <><CreditCard className="w-4 h-4 mr-2" /> Pay with Card</>
            )}
          </Button>
        ) : (
          <Button 
            className="w-full" 
            onClick={handleWalletPayment}
            disabled={loading}
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
            ) : (
              <><Wallet className="w-4 h-4 mr-2" /> Pay from Wallet</>
            )}
          </Button>
        )}

        <p className="text-xs text-center text-slate-500">
          Payment is secured until trip completion. Funds are released to driver only after the trip is done.
        </p>
      </CardContent>
    </Card>
  );
};

export default YocoPayment;