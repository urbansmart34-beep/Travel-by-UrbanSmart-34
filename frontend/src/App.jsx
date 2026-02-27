import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { Toaster } from "@/components/ui/toaster";
import { APIProvider } from '@vis.gl/react-google-maps';

// Pages
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import FindRides from '@/pages/FindRides';
import MyBookings from '@/pages/MyBookings';
import MyTrips from '@/pages/MyTrips';
import PostTrip from '@/pages/PostTrip';
import Profile from '@/pages/Profile';
import WalletDashboard from '@/pages/wallet/WalletDashboard';
import TransactionHistory from '@/pages/wallet/TransactionHistory';
import Settings from '@/pages/Settings';
import RoutesPage from '@/pages/Routes';
import RouteDetails from '@/pages/RouteDetails';
import SuggestRoute from '@/pages/SuggestRoute';
import TripDetails from '@/pages/TripDetails';
import FounderDirectory from '@/pages/FounderDirectory';
import DriverDashboard from '@/pages/driver/DriverDashboard';
import ActiveTrip from '@/pages/driver/ActiveTrip';
import DriverRecruitment from '@/pages/driver/DriverRecruitment';
import DriverVerification from '@/pages/driver/DriverVerification';
import DriverTripWizard from '@/pages/driver/DriverTripWizard';
import DriverEarnings from '@/pages/driver/DriverEarnings';
import DriverPerformance from '@/pages/driver/DriverPerformance';
import DriverSafety from '@/pages/driver/DriverSafety';
import AdminCommandCenter from '@/pages/admin/AdminCommandCenter';
import AdminIssueTracking from '@/pages/admin/AdminIssueTracking';
import AdminDisputeDetail from '@/pages/admin/AdminDisputeDetail';
import PaymentRedirect from '@/pages/PaymentRedirect';

// Info & Legal Pages
import AboutUs from '@/pages/info/AboutUs';
import FAQ from '@/pages/info/FAQ';
import HowItWorks from '@/pages/info/HowItWorks';
import RiderSafety from '@/pages/info/RiderSafety';
import PrivacyPolicy from '@/pages/info/PrivacyPolicy';
import TermsOfService from '@/pages/info/TermsOfService';

import Layout from './Layout';
import PageNotFound from './lib/PageNotFound';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Public Routes */}
      <Route path="/" element={
        <Layout currentPageName="Home">
          <Home />
        </Layout>
      } />

      <Route path="/FindRides" element={
        <Layout currentPageName="FindRides">
          <FindRides />
        </Layout>
      } />

      <Route path="/Routes" element={
        <Layout currentPageName="Routes">
          <RoutesPage />
        </Layout>
      } />

      <Route path="/Routes/:id" element={
        <Layout currentPageName="Route Details">
          <RouteDetails />
        </Layout>
      } />

      <Route path="/SuggestRoute" element={
        <Layout currentPageName="SuggestRoute">
          <SuggestRoute />
        </Layout>
      } />

      <Route path="/TripDetails" element={
        <Layout currentPageName="TripDetails">
          <TripDetails />
        </Layout>
      } />

      <Route path="/FounderDirectory" element={
        <Layout currentPageName="FounderDirectory">
          <FounderDirectory />
        </Layout>
      } />

      <Route path="/driver/join" element={
        <Layout currentPageName="Driver Recruitment">
          <DriverRecruitment />
        </Layout>
      } />

      <Route path="/driver/verify" element={
        <Layout currentPageName="Driver Verification">
          <DriverVerification />
        </Layout>
      } />

      {/* Info & Legal Routes */}
      <Route path="/about" element={
        <Layout currentPageName="About Us">
          <AboutUs />
        </Layout>
      } />

      <Route path="/faq" element={
        <Layout currentPageName="FAQ">
          <FAQ />
        </Layout>
      } />

      <Route path="/how-it-works" element={
        <Layout currentPageName="How It Works">
          <HowItWorks />
        </Layout>
      } />

      <Route path="/safety" element={
        <Layout currentPageName="Safety">
          <RiderSafety />
        </Layout>
      } />

      <Route path="/legal/privacy" element={
        <Layout currentPageName="Privacy Policy">
          <PrivacyPolicy />
        </Layout>
      } />

      <Route path="/legal/terms" element={
        <Layout currentPageName="Terms of Service">
          <TermsOfService />
        </Layout>
      } />

      {/* Protected Routes */}
      <Route path="/MyBookings" element={
        <ProtectedRoute>
          <Layout currentPageName="MyBookings">
            <MyBookings />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/MyTrips" element={
        <ProtectedRoute>
          <Layout currentPageName="MyTrips">
            <MyTrips />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/PostTrip" element={
        <ProtectedRoute>
          <Layout currentPageName="PostTrip">
            <PostTrip />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/Profile" element={
        <ProtectedRoute>
          <Layout currentPageName="Profile">
            <Profile />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/wallet" element={
        <ProtectedRoute>
          <Layout currentPageName="Wallet">
            <WalletDashboard />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/wallet/transactions" element={
        <ProtectedRoute>
          <Layout currentPageName="Transactions">
            <TransactionHistory />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/payment/success" element={<PaymentRedirect />} />
      <Route path="/payment" element={<PaymentRedirect />} />

      <Route path="/Settings" element={
        <ProtectedRoute>
          <Layout currentPageName="Settings">
            <Settings />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Driver Routes */}
      <Route path="/driver" element={
        <ProtectedRoute>
          <DriverDashboard />
        </ProtectedRoute>
      } />

      <Route path="/driver/trip/:id" element={
        <ProtectedRoute>
          <ActiveTrip />
        </ProtectedRoute>
      } />

      <Route path="/driver/create-trip" element={
        <Layout currentPageName="Create Trip">
          <DriverTripWizard />
        </Layout>
      } />

      <Route path="/driver/earnings" element={
        <Layout currentPageName="Earnings">
          <DriverEarnings />
        </Layout>
      } />

      <Route path="/driver/performance" element={
        <Layout currentPageName="Performance">
          <DriverPerformance />
        </Layout>
      } />

      <Route path="/driver/safety" element={
        <Layout currentPageName="Safety">
          <DriverSafety />
        </Layout>
      } />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <Layout currentPageName="AdminDashboard">
            <AdminCommandCenter />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/admin/disputes" element={
        <ProtectedRoute>
          <Layout currentPageName="AdminDisputes">
            <AdminIssueTracking />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/admin/disputes/:id" element={
        <ProtectedRoute>
          <Layout currentPageName="AdminDisputeDetail">
            <AdminDisputeDetail />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AppRoutes />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </APIProvider>
    </AuthProvider>
  );
}

export default App;
