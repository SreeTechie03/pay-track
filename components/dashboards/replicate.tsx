import React, { useState } from 'react';
import { DollarSign, Users, Building2, TrendingUp, Target, Calendar, Star, Award, TrendingDown, ArrowUpRight, Briefcase, Clock, ChevronRight, AlertTriangle, CheckCircle2, Activity, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { AdminSubView } from '@/app/(root)/dashboard/types/dashboard';
import { MetricCard } from '../MetricCard';
import { formatCurrency } from '@/lib/utils';
import { mockData } from '@/app/(root)/dashboard/data/mockData';
// import { AddEmployeeDialog } from './AddEmployeeDailog';

interface AdminDashboardProps {
  subView: AdminSubView;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ subView }) => {
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);

  const handleAddEmployee = (data: {
    name: string;
    team: string;
    email: string;
    mobile: string;
    monthlyTarget: number;
  }) => {
    const employee = {
      name: data.name,
      team: data.team,
      email: data.email,
      role: "Employee",
    };
    console.log("Adding employee:", employee);
  };

  if (subView === 'overview') {
    return (
      <div className="space-y-6">
        {/* Quick Stats Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
              <p className="text-indigo-100">Your dashboard is showing strong performance today</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/10 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-indigo-100">Daily Growth</p>
                <p className="text-xl font-bold">+12.5%</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/10 rounded-lg">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-indigo-100">System Health</p>
                <p className="text-xl font-bold">98.2%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <MetricCard
            icon={DollarSign}
            title="Total Revenue"
            value={formatCurrency(mockData.totalRevenue)}
            trend={12}
          />
          <MetricCard
            icon={Target}
            title="Monthly Target"
            value={formatCurrency(mockData.totalRevenue * 1.2)}
            trend={8}
          />
          <MetricCard
            icon={Users}
            title="Active Teams"
            value={mockData.teams.length.toString()}
            trend={0}
          />
          <MetricCard
            icon={Calendar}
            title="Projects Due"
            value="12"
            trend={-2}
          />
        </div>

        {/* Revenue Section - Full Width */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Revenue Overview</h3>
              <p className="text-sm text-gray-500">Year-over-year comparison</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Current Year</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Previous Year</span>
              </div>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockData.revenueOverview.labels.map((month, index) => ({
                  name: month,
                  current: mockData.revenueOverview.data[index],
                  previous: mockData.revenueOverview.previousYearData[index],
                }))}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={'preserveStartEnd'} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `₹${value / 1000}K`} />
                <Tooltip formatter={(value: any) => formatCurrency(value)} labelStyle={{ fontWeight: 'bold' }} />
                <Line type="monotone" dataKey="current" stroke="#4F46E5" strokeWidth={2} name="Current Year" dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="previous" stroke="#94A3B8" strokeWidth={2} name="Previous Year" dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="font-medium text-gray-700">Schedule Team Meeting</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-700">Generate Reports</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <PieChartIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="font-medium text-gray-700">Review Analytics</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-4">System Alerts</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">Server Load High</p>
                  <p className="text-sm text-yellow-600">Database optimization recommended</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">Backup Completed</p>
                  <p className="text-sm text-green-600">Last backup: 2 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: "New team member added", time: "2 hours ago", icon: Users },
                { action: "Project milestone completed", time: "4 hours ago", icon: CheckCircle2 },
                { action: "Revenue target achieved", time: "6 hours ago", icon: Target }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <activity.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Section - Revenue Distribution and Team Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Revenue Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.teams}
                    dataKey="revenue"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {mockData.teams.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Team Performance</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.teams}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip />
                  <Bar dataKey="completionRate" fill="#4F46E5" name="Completion Rate" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Performers Section */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Top Performers</h3>
              <p className="text-sm text-gray-500">Based on revenue generation and task completion</p>
            </div>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {mockData.topEmployees.map((employee, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-white">{employee.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">{employee.name}</h4>
                        {index < 3 && (
                          <Award className={`w-4 h-4 ${
                            index === 0 ? 'text-yellow-400' :
                            index === 1 ? 'text-gray-400' :
                            'text-orange-400'
                          }`} />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{employee.team}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(employee.revenue)}</p>
                    <p className="text-sm text-gray-500">Revenue Generated</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{employee.tasks}</p>
                      <p className="text-xs text-gray-500">Tasks</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{employee.attendance}%</p>
                      <p className="text-xs text-gray-500">Attendance</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{(4 + Math.random()).toFixed(1)}</p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-gray-500">Currently Active</span>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center space-x-1">
                    <span>View Profile</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AdminDashboard;