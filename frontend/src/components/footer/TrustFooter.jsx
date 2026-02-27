import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Shield, Lock, CheckCircle, Award, Users, MapPin } from "lucide-react";

export default function TrustFooter() {
  const trustBadges = [
    {
      icon: Shield,
      title: "Yoco Secure Payments",
      description: "PCI DSS Level 1 Certified",
      link: "https://www.yoco.com/za/security/",
      external: true
    },
    {
      icon: Lock,
      title: "POPIA Compliant",
      description: "Data Protection Act 2013",
      link: "/legal/privacy",
      external: false
    },
    {
      icon: CheckCircle,
      title: "NCA Registered",
      description: "National Credit Act Compliant",
      link: "/legal/terms",
      external: false
    },
    {
      icon: Award,
      title: "Verified Drivers",
      description: "Background checks & ID verification",
      link: createPageUrl('Home'),
      external: false
    }
  ];

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
      { label: "Cookie Policy", url: "/legal/terms#cookie-policy" },
      { label: "POPIA Compliance", url: "/legal/privacy#compliance" }
    ]
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Trust Badges Section */}
      <div className="bg-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-white text-lg font-semibold mb-6">
            Safe, Secure, and Trusted
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <a
                key={index}
                href={badge.link}
                target={badge.external ? "_blank" : "_self"}
                rel={badge.external ? "noopener noreferrer" : ""}
                className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-slate-700 transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors">
                  <badge.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-white font-medium text-sm mb-1">{badge.title}</h4>
                <p className="text-slate-400 text-xs">{badge.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

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

            {/* Company Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
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

            {/* For Drivers */}
            <div>
              <h4 className="text-white font-semibold mb-4">For Drivers</h4>
              <ul className="space-y-2">
                {footerLinks.drivers.map((link, index) => (
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

            {/* For Riders */}
            <div>
              <h4 className="text-white font-semibold mb-4">For Riders</h4>
              <ul className="space-y-2">
                {footerLinks.riders.map((link, index) => (
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

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link, index) => (
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
}