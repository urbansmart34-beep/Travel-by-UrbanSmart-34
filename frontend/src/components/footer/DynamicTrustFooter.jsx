import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { createPageUrl } from "@/utils";
import { MapPin, TrendingUp, TrendingDown } from "lucide-react";

export default function DynamicTrustFooter() {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFooterData();
  }, []);

  const loadFooterData = async () => {
    try {
      const response = await base44.functions.invoke('getActiveFooterConfig', {
        audience: 'all_users',
        country: 'ZA'
      });
      
      if (response.data?.success) {
        setFooterData(response.data);
      }
    } catch (error) {
      console.error('Failed to load footer:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackBadgeClick = async (badgeId) => {
    try {
      await base44.functions.invoke('trackBadgeClick', { badgeId });
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

  if (loading) {
    return (
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-800 rounded w-1/4"></div>
            <div className="h-4 bg-slate-800 rounded w-1/2"></div>
          </div>
        </div>
      </footer>
    );
  }

  if (!footerData) {
    return (
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2024 UrbanSmart-34. All rights reserved.</p>
        </div>
      </footer>
    );
  }

  const trustBadgesSection = footerData.sections?.find(s => s.section_type === 'payment_trust');
  const navigationSection = footerData.sections?.find(s => s.section_type === 'navigation');

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Trust Badges Section */}
      {trustBadgesSection && trustBadgesSection.badges?.length > 0 && (
        <div className="bg-slate-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-white text-lg font-semibold mb-6">
              {trustBadgesSection.title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustBadgesSection.badges.map((badge) => (
                <a
                  key={badge.id}
                  href={badge.verification_url || '#'}
                  target={badge.opens_in_new_tab ? "_blank" : "_self"}
                  rel={badge.is_external_link ? "noopener noreferrer" : ""}
                  onClick={() => trackBadgeClick(badge.id)}
                  className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-slate-700 transition-colors group"
                  title={badge.hover_text}
                >
                  {badge.logo_url ? (
                    <img 
                      src={badge.logo_url} 
                      alt={badge.alt_text}
                      className="w-12 h-12 mb-3 object-contain"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors">
                      <div className="w-6 h-6 bg-blue-400 rounded"></div>
                    </div>
                  )}
                  <h4 className="text-white font-medium text-sm mb-1">{badge.title}</h4>
                  {badge.description && (
                    <p className="text-slate-400 text-xs">{badge.description}</p>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Live Metrics Section */}
      {footerData.metrics?.length > 0 && (
        <div className="border-t border-slate-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {footerData.metrics.map((metric, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl font-bold text-white">
                      {formatMetricValue(metric.value, metric.format)}
                    </span>
                    {metric.trend !== 'stable' && (
                      <span className={`text-sm ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 capitalize">
                    {metric.type.replace(/_/g, ' ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Logo Column */}
            <div className="col-span-2 md:col-span-1">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69793aa8b086913e8a1ee223/96e6ee55b_ChatGPTImageJan29202602_48_52AM.png"
                alt="Travel by UrbanSmart-34"
                className="h-10 w-auto mb-4"
              />
              <p className="text-sm text-slate-400 mb-4">
                Community-driven ridesharing across South Africa
              </p>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Cape Town, South Africa</span>
              </div>
            </div>

            {/* Dynamic Navigation Sections */}
            {renderNavigationSections()}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              © 2024 UrbanSmart-34. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="mailto:support@urbansmart34.co.za" className="hover:text-white transition-colors">
                support@urbansmart34.co.za
              </a>
              <a href="tel:+27123456789" className="hover:text-white transition-colors">
                +27 12 345 6789
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  function renderNavigationSections() {
    const footerLinks = {
      company: [
        { label: "About Us", url: "/about" },
        { label: "How It Works", url: "/how-it-works" },
        { label: "Founder Directory", url: createPageUrl('FounderDirectory') },
        { label: "Careers", url: "/careers" }
      ],
      drivers: [
        { label: "Become a Driver", url: createPageUrl('Profile') },
        { label: "Driver Safety", url: "/driver-safety" },
        { label: "Earnings", url: createPageUrl('Wallet') },
        { label: "Driver Support", url: "/support/drivers" }
      ],
      riders: [
        { label: "Find Rides", url: createPageUrl('FindRides') },
        { label: "Popular Routes", url: createPageUrl('Routes') },
        { label: "Safety Guidelines", url: "/safety" },
        { label: "FAQs", url: "/faq" }
      ],
      legal: [
        { label: "Terms of Service", url: "/legal/terms" },
        { label: "Privacy Policy", url: "/legal/privacy" },
        { label: "Cookie Policy", url: "/legal/cookies" },
        { label: "POPIA Compliance", url: "/legal/popia" }
      ]
    };

    return Object.entries(footerLinks).map(([key, links]) => (
      <div key={key}>
        <h4 className="text-white font-semibold mb-4 capitalize">
          {key === 'drivers' ? 'For Drivers' : key === 'riders' ? 'For Riders' : key}
        </h4>
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.url}
                className="text-sm hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ));
  }

  function formatMetricValue(value, format) {
    if (!format) return value.toLocaleString();
    return format.replace('{value}', value.toLocaleString());
  }
}