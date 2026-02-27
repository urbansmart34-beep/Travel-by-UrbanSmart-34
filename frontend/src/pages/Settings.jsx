import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  User, 
  Bell, 
  Lock, 
  CreditCard,
  AlertTriangle,
  ChevronRight
} from "lucide-react";

export default function Settings() {
  const settingsSections = [
    {
      title: "Profile Settings",
      description: "Manage your personal information and preferences",
      icon: User,
      link: createPageUrl('Profile'),
      color: "text-blue-600"
    },
    {
      title: "Notifications",
      description: "Configure your notification preferences",
      icon: Bell,
      link: "#",
      color: "text-green-600"
    },
    {
      title: "Privacy & Security",
      description: "Manage your privacy settings and security options",
      icon: Lock,
      link: "#",
      color: "text-purple-600"
    },
    {
      title: "Payment Methods",
      description: "Manage your wallet and payment options",
      icon: CreditCard,
      link: createPageUrl('Wallet'),
      color: "text-yellow-600"
    },
    {
      title: "Delete Account",
      description: "Permanently delete your account and data",
      icon: AlertTriangle,
      link: createPageUrl('AccountDeletion'),
      color: "text-red-600",
      danger: true
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-4">
          {settingsSections.map((section) => (
            <Link key={section.title} to={section.link}>
              <Card className={`hover:shadow-md transition-shadow ${section.danger ? 'border-red-200' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full ${section.danger ? 'bg-red-50' : 'bg-slate-100'} flex items-center justify-center`}>
                        <section.icon className={`w-6 h-6 ${section.color}`} />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${section.danger ? 'text-red-600' : 'text-slate-900'}`}>
                          {section.title}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}