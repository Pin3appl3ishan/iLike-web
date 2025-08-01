import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import {
  Users,
  Heart,
  MessageCircle,
  TrendingUp,
  Shield,
  AlertTriangle,
  Eye,
  UserCheck,
  UserX,
  Activity,
  MapPin,
  BarChart3,
  Settings,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-toastify";

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "suspended" | "pending";
  joinDate: string;
  lastActive: string;
  location: string;
  profileComplete: boolean;
  reports: number;
}

interface Stats {
  totalUsers: number;
  activeUsers: number;
  totalMatches: number;
  totalMessages: number;
  newUsersToday: number;
  reportsToday: number;
  avgAge: number;
  topLocation: string;
}

const AdminDashboard = () => {
  const [stats] = useState<Stats>({
    totalUsers: 17,
    activeUsers: 3,
    totalMatches: 14,
    totalMessages: 25,
    newUsersToday: 2,
    reportsToday: 3,
    avgAge: 24.5,
    topLocation: "Kathmandu",
  });

  const [recentUsers] = useState<User[]>([
    {
      id: "1",
      name: "Rajesh Hamal",
      email: "rajesh.hamal@gmail.com",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      location: "Kathmandu",
      profileComplete: true,
      reports: 0,
    },
    {
      id: "2",
      name: "Samikshya Basnet",
      email: "samikshya.basnet@gmail.com",
      status: "active",
      joinDate: "2024-01-14",
      lastActive: "1 day ago",
      location: "Lalitpur",
      profileComplete: true,
      reports: 0,
    },
    {
      id: "3",
      name: "Binod Chaudhary",
      email: "binod.chaudhary@gmail.com",
      status: "suspended",
      joinDate: "2024-01-10",
      lastActive: "3 days ago",
      location: "Bhaktapur",
      profileComplete: false,
      reports: 2,
    },
    {
      id: "4",
      name: "Manisha Koirala",
      email: "manisha.koirala@outlook.com",
      status: "pending",
      joinDate: "2024-01-16",
      lastActive: "Never",
      location: "Pokhara",
      profileComplete: false,
      reports: 0,
    },
    {
      id: "5",
      name: "Nirmal Purja",
      email: "nimsdai@gmail.com",
      status: "active",
      joinDate: "2024-01-13",
      lastActive: "5 hours ago",
      location: "Dharan",
      profileComplete: true,
      reports: 1,
    },
  ]);

  const handleUserAction = (userId: string, action: string) => {
    toast.success(`${action} action performed on user ${userId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color = "pink",
    change = null,
  }: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    color?: string;
    change?: string | null;
  }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Monitor and manage your dating platform
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => toast.info("Refreshing data...")}
                className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={() => toast.info("Settings coming soon!")}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            icon={Users}
            color="blue"
            change="+12% this week"
          />
          <StatCard
            title="Active Users"
            value={stats.activeUsers.toLocaleString()}
            icon={Activity}
            color="green"
            change="+8% this week"
          />
          <StatCard
            title="Total Matches"
            value={stats.totalMatches.toLocaleString()}
            icon={Heart}
            color="pink"
            change="+15% this week"
          />
          <StatCard
            title="Messages Sent"
            value={stats.totalMessages.toLocaleString()}
            icon={MessageCircle}
            color="purple"
            change="+22% this week"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Recent Users
                </h2>
                <button
                  onClick={() => toast.info("View all users page coming soon!")}
                  className="text-pink-500 hover:text-pink-600 font-medium"
                >
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        User
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Location
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Reports
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-800">
                              {user.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              user.status
                            )}`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-3 h-3" />
                            {user.location}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.reports > 0
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.reports}{" "}
                            {user.reports === 1 ? "report" : "reports"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUserAction(user.id, "View")}
                              className="p-1 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                              title="View Profile"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleUserAction(user.id, "Approve")
                              }
                              className="p-1 text-green-500 hover:text-green-600 hover:bg-green-50 rounded"
                              title="Approve User"
                            >
                              <UserCheck className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleUserAction(user.id, "Suspend")
                              }
                              className="p-1 text-red-500 hover:text-red-600 hover:bg-red-50 rounded"
                              title="Suspend User"
                            >
                              <UserX className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Stats & Actions */}
          <div className="space-y-6">
            {/* Platform Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Platform Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">New Users Today</span>
                  <span className="font-semibold text-green-600">
                    +{stats.newUsersToday}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Reports Today</span>
                  <span className="font-semibold text-red-600">
                    {stats.reportsToday}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Average Age</span>
                  <span className="font-semibold">{stats.avgAge} years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Top Location</span>
                  <span className="font-semibold">{stats.topLocation}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() =>
                    toast.info("User management page coming soon!")
                  }
                  className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Users className="w-5 h-5 text-blue-500" />
                  <span>Manage Users</span>
                </button>
                <button
                  onClick={() => toast.info("Reports page coming soon!")}
                  className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span>View Reports</span>
                </button>
                <button
                  onClick={() => toast.info("Analytics page coming soon!")}
                  className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                  <span>Analytics</span>
                </button>
                <button
                  onClick={() => toast.info("Security settings coming soon!")}
                  className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>Security</span>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                System Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">API Status</span>
                  <span className="flex items-center gap-1 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Database</span>
                  <span className="flex items-center gap-1 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Healthy
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Notifications</span>
                  <span className="flex items-center gap-1 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Backup</span>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
