import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  User,
  Mail,
  Phone,
  Star,
  Car,
  Upload,
  Save,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

import { useAuth } from "@/lib/AuthContext";

export default function Profile() {
  const queryClient = useQueryClient();
  const { user, loading: isLoading } = useAuth();

  const [userData, setUserData] = useState({
    full_name: '',
    phone: '',
    bio: '',
    user_role: 'commuter'
  });

  const [driverData, setDriverData] = useState({
    vehicle_type: '',
    vehicle_make: '',
    vehicle_model: '',
    vehicle_year: new Date().getFullYear(),
    vehicle_color: '',
    vehicle_capacity: 4,
    license_plate: '',
    driver_bio: ''
  });

  useEffect(() => {
    if (user) {
      setUserData({
        full_name: user.full_name || '',
        phone: user.phone || '',
        bio: user.bio || '',
        user_role: user.user_role || 'commuter'
      });
    }
  }, [user]);

  const { data: driverProfile } = useQuery({
    queryKey: ['driverProfile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const profiles = await base44.entities.DriverProfile.filter({ user_id: user.id });
      return profiles[0];
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (driverProfile) {
      setDriverData({
        vehicle_type: driverProfile.vehicle_type || '',
        vehicle_make: driverProfile.vehicle_make || '',
        vehicle_model: driverProfile.vehicle_model || '',
        vehicle_year: driverProfile.vehicle_year || new Date().getFullYear(),
        vehicle_color: driverProfile.vehicle_color || '',
        vehicle_capacity: driverProfile.vehicle_capacity || 4,
        license_plate: driverProfile.license_plate || '',
        driver_bio: driverProfile.driver_bio || ''
      });
    }
  }, [driverProfile]);

  const updateUserMutation = useMutation({
    mutationFn: (data) => base44.auth.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['currentUser']);
      toast.success('Profile updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update profile');
    }
  });

  const saveDriverProfileMutation = useMutation({
    mutationFn: async (data) => {
      if (driverProfile) {
        return await base44.entities.DriverProfile.update(driverProfile.id, data);
      } else {
        return await base44.entities.DriverProfile.create({
          ...data,
          user_id: user.id,
          verification_status: 'pending'
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['driverProfile']);
      toast.success('Driver profile saved successfully!');
    },
    onError: () => {
      toast.error('Failed to save driver profile');
    }
  });

  const handleSaveProfile = () => {
    updateUserMutation.mutate(userData);
  };

  const handleSaveDriverProfile = () => {
    saveDriverProfileMutation.mutate(driverData);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      await updateUserMutation.mutateAsync({ profile_photo_url: file_url });
      toast.success('Photo uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload photo');
    }
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500">Loading profile...</div>;
  if (!user) return <div className="p-8 text-center text-slate-500">Please log in to view your profile.</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        {/* Header */}
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Profile Settings</h1>
            <p className="text-slate-600">Manage your account and preferences</p>
          </div>
          <Button asChild className="bg-slate-900 text-white hover:bg-slate-800">
            <Link to="/driver">Switch to Driver Dashboard</Link>
          </Button>
        </div>

        {/* Profile Photo Section */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.profile_photo_url} />
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl">
                    {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="photo-upload"
                  className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                >
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </label>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900">{user.full_name || 'User'}</h2>
                <p className="text-slate-600">{user.email}</p>
                {user.rating > 0 && (
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-slate-700">{user.rating.toFixed(1)}</span>
                    <span className="text-sm text-slate-500">({user.total_reviews || 0} reviews)</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="driver">Driver Profile</TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userData.full_name}
                    onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    disabled
                    className="mt-2 bg-slate-50"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    placeholder="+27 XX XXX XXXX"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="role">Account Type</Label>
                  <Select value={userData.user_role} onValueChange={(value) => setUserData({ ...userData, user_role: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commuter">Commuter Only</SelectItem>
                      <SelectItem value="driver">Driver Only</SelectItem>
                      <SelectItem value="both">Both Driver & Commuter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={userData.bio}
                    onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                    placeholder="Tell us a bit about yourself..."
                    rows={3}
                    className="mt-2"
                  />
                </div>

                <Button
                  onClick={handleSaveProfile}
                  disabled={updateUserMutation.isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {updateUserMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Driver Profile Tab */}
          <TabsContent value="driver">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Driver & Vehicle Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {(user.user_role === 'commuter') && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                    <p className="font-medium mb-1">Want to become a driver?</p>
                    <p>Change your account type to "Driver" in the Personal Info tab first.</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vehicle_type">Vehicle Type</Label>
                    <Select value={driverData.vehicle_type} onValueChange={(value) => setDriverData({ ...driverData, vehicle_type: value })}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hatchback">Hatchback</SelectItem>
                        <SelectItem value="Sedan">Sedan</SelectItem>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="Luxury">Luxury</SelectItem>
                        <SelectItem value="Minibus">Minibus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="capacity">Seat Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      min="1"
                      max="15"
                      value={driverData.vehicle_capacity}
                      onChange={(e) => setDriverData({ ...driverData, vehicle_capacity: parseInt(e.target.value) })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="make">Vehicle Make</Label>
                    <Input
                      id="make"
                      value={driverData.vehicle_make}
                      onChange={(e) => setDriverData({ ...driverData, vehicle_make: e.target.value })}
                      placeholder="e.g., Toyota"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Vehicle Model</Label>
                    <Input
                      id="model"
                      value={driverData.vehicle_model}
                      onChange={(e) => setDriverData({ ...driverData, vehicle_model: e.target.value })}
                      placeholder="e.g., Corolla"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      min="1990"
                      max={new Date().getFullYear() + 1}
                      value={driverData.vehicle_year}
                      onChange={(e) => setDriverData({ ...driverData, vehicle_year: parseInt(e.target.value) })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      value={driverData.vehicle_color}
                      onChange={(e) => setDriverData({ ...driverData, vehicle_color: e.target.value })}
                      placeholder="e.g., White"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="license">License Plate</Label>
                  <Input
                    id="license"
                    value={driverData.license_plate}
                    onChange={(e) => setDriverData({ ...driverData, license_plate: e.target.value })}
                    placeholder="e.g., CA 123-456"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="driver_bio">Driver Bio</Label>
                  <Textarea
                    id="driver_bio"
                    value={driverData.driver_bio}
                    onChange={(e) => setDriverData({ ...driverData, driver_bio: e.target.value })}
                    placeholder="Tell passengers about your driving experience..."
                    rows={4}
                    className="mt-2"
                  />
                </div>

                {driverProfile && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-sm font-medium text-slate-700 mb-2">Verification Status</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${driverProfile.verification_status === 'verified'
                        ? 'bg-green-100 text-green-800'
                        : driverProfile.verification_status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                        }`}>
                        {driverProfile.verification_status}
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleSaveDriverProfile}
                  disabled={saveDriverProfileMutation.isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saveDriverProfileMutation.isPending ? 'Saving...' : 'Save Driver Profile'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}