import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import {
  Car,
  Search,
  Plus,
  User,
  Menu,
  X,
  Home,
  MapPin,
  Calendar,
  Bell,
  LogOut,
  Settings,
  Wallet,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import TrustFooter from "@/components/footer/TrustFooter";


export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();


  const handleLogout = async () => {
    await signOut();
    // Clear Chatbase session if possible, or just let it be (it's session based)
    navigate('/login');
  };

  // Identify User to Chatbase
  useEffect(() => {
    const identifyUser = async () => {
      // Chatbase identification temporarily disabled due to missing API method
      // if (user && window.chatbase) { ... }
    };

    identifyUser();
  }, [user]);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Find Rides', href: '/FindRides', icon: Search },
    { name: 'Routes', href: '/Routes', icon: MapPin },
    { name: 'Suggest Route', href: '/SuggestRoute', icon: Plus },
  ];

  // Mock roles for now since Supabase user metadata might be different
  const userRole = user?.user_metadata?.role || 'commuter';

  const userNavLinks = user ? [
    ...(userRole === 'driver' || userRole === 'both' ? [
      { name: 'Post Trip', href: '/PostTrip', icon: Plus, highlight: true },
      { name: 'My Trips', href: '/MyTrips', icon: Calendar },
    ] : []),
    { name: 'My Bookings', href: '/MyBookings', icon: Car },
  ] : [];

  return (
    <div className="min-h-screen bg-slate-50">
      <style>{`
        :root {
          --primary: 220 90% 56%;
          --primary-foreground: 0 0% 100%;
        }
      `}</style>

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo & Main Nav */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69793aa8b086913e8a1ee223/96e6ee55b_ChatGPTImageJan29202602_48_52AM.png"
                  alt="Travel by UrbanSmart-34"
                  className="h-10 w-auto"
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center ml-10 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPageName === link.name
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  {/* Post Trip Button (Driver) */}
                  {(userRole === 'driver' || userRole === 'both') && (
                    <Link to="/PostTrip" className="hidden sm:block">
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2">
                        <Plus className="w-4 h-4" />
                        Post Trip
                      </Button>
                    </Link>
                  )}

                  {/* Notifications */}
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5 text-slate-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Button>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2 px-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.user_metadata?.avatar_url} />
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {user.email?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-3 py-2">
                        <p className="text-sm font-medium">{user.user_metadata?.full_name || 'User'}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {userRole === 'both' ? 'Driver & Commuter' : userRole}
                        </Badge>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/Profile" className="flex items-center gap-2">
                          <User className="w-4 h-4" /> Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/MyBookings" className="flex items-center gap-2">
                          <Car className="w-4 h-4" /> My Bookings
                        </Link>
                      </DropdownMenuItem>
                      {(userRole === 'driver' || userRole === 'both') && (
                        <DropdownMenuItem asChild>
                          <Link to="/MyTrips" className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> My Trips
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem asChild>
                        <Link to="/Wallet" className="flex items-center gap-2">
                          <Wallet className="w-4 h-4" /> Wallet
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/Settings" className="flex items-center gap-2">
                          <Settings className="w-4 h-4" /> Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-600 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" className="text-slate-600">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-3 space-y-1">
              {[...navLinks, ...userNavLinks].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg ${link.highlight
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <TrustFooter />

      {/* Chat Widget */}

    </div>
  );
}