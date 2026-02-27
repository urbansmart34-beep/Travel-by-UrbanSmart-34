import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Mail, Ban, CheckCircle } from "lucide-react";
import { format } from "date-fns";

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const { data: users, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: () => base44.asServiceRole.entities.User.list('-created_date', 100),
    refetchInterval: 30000
  });

  const filteredUsers = users?.filter(user => {
    const matchesSearch = 
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id?.includes(searchQuery);

    const matchesStatus = 
      filterStatus === "all" ||
      (filterStatus === "active" && user.deletion_status === "active") ||
      (filterStatus === "deletion_requested" && user.deletion_status === "deletion_requested");

    return matchesSearch && matchesStatus;
  }) || [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search by email, name, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="all">All Users</option>
                <option value="active">Active</option>
                <option value="deletion_requested">Deletion Requested</option>
              </select>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                        {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-slate-900">
                            {user.full_name || 'No Name'}
                          </h4>
                          {user.role === 'admin' && (
                            <Badge className="bg-purple-100 text-purple-800">Admin</Badge>
                          )}
                          {user.user_role === 'driver' && (
                            <Badge className="bg-blue-100 text-blue-800">Driver</Badge>
                          )}
                          {user.deletion_status === 'deletion_requested' && (
                            <Badge className="bg-red-100 text-red-800">Deletion Pending</Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600">{user.email}</p>
                        <p className="text-xs text-slate-400">
                          Joined {format(new Date(user.created_date), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}