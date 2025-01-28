'use client';

import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, Menu } from 'lucide-react';

type ViewType = 'admin' | 'employee' | 'operations';

const mockData = {
  totalRevenue: 2543900,
  totalPayments: 1987650,
  totalPrePayments: 456700,
  totalFullPayments: 1298400,
  totalPostPendingPayments: 232550,
  topTeam: 'Alpha Squad',
  topEmployees: [
    { name: 'Ramana – Guntur Karam', revenue: 198450 },
    { name: 'Daya – Temper', revenue: 187600 },
    { name: 'Pushpa Raj – Pushpa', revenue: 176900 },
    { name: 'Abhiram – Nannaku Prematho', revenue: 165300 },
    { name: 'Krishna Murthy Kautilya – Athadu', revenue: 154700 }
  ],
  myMetrics: {
    revenue: 187600,
    payments: 145300,
    prePayments: 34500,
    fullPayments: 98700,
    postPendingPayments: 12100,
    target: 200000
  },
  revenueOverview: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [280000, 320000, 450000, 380000, 520000, 480000, 590000, 620000, 580000, 650000, 680000, 720000],
    previousYearData: [250000, 280000, 350000, 320000, 420000, 390000, 440000, 460000, 450000, 480000, 500000, 520000]
  }
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const MetricCard = ({ icon: Icon, title, value, trend }: { icon: any, title: string, value: string, trend?: number }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-indigo-100 rounded-lg">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      {trend && (
        <div className={`flex items-center ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span className="text-sm font-medium">{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-semibold text-gray-900">{value}</p>
  </div>
);

const DashboardPage = () => {
  const [currentView, setCurrentView] = useState<ViewType>('admin');
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    setSidebarVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div 
          className={`bg-gray-800 text-white w-64 transition-all duration-300 ease-in-out overflow-hidden ${
            sidebarVisible ? 'w-64' : 'w-0'
          }`}
        >
          <div className="p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button 
                onClick={() => setSidebarVisible(false)}
                className="text-white hover:text-gray-300"
              >
                ×
              </button>
            </div>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => handleViewChange('admin')}
                  className={`w-full text-left py-2 px-4 rounded ${currentView === 'admin' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                >
                  Admin
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleViewChange('employee')}
                  className={`w-full text-left py-2 px-4 rounded ${currentView === 'employee' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                >
                  Employee
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleViewChange('operations')}
                  className={`w-full text-left py-2 px-4 rounded ${currentView === 'operations' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                >
                  Operations
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
              <button 
                onClick={() => setSidebarVisible(!sidebarVisible)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {currentView === 'admin' && <AdminDashboard />}
            {currentView === 'employee' && <EmployeeDashboard />}
            {currentView === 'operations' && <div>Operations Dashboard - Under Construction</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => (
  <div className="space-y-6">
    <h3>Admin Dashboard Overview</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <MetricCard icon={DollarSign} title="Total Revenue" value={formatCurrency(mockData.totalRevenue)} trend={12} />
      <MetricCard icon={DollarSign} title="Total Payments" value={formatCurrency(mockData.totalPayments)} trend={-5} />
      <MetricCard icon={DollarSign} title="Total Pre-Payments" value={formatCurrency(mockData.totalPrePayments)} trend={7} />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium text-gray-700">Top Employees</h3>
        <ul className="space-y-4 mt-4">
          {mockData.topEmployees.map((employee, index) => (
            <li key={index} className="flex justify-between">
              <span>{employee.name}</span>
              <span className="font-medium text-gray-700">{formatCurrency(employee.revenue)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const EmployeeDashboard = () => (
  <div className="space-y-6">
    <h3>Employee Dashboard Overview</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <MetricCard icon={DollarSign} title="My Revenue" value={formatCurrency(mockData.myMetrics.revenue)} trend={7} />
      <MetricCard icon={DollarSign} title="My Payments" value={formatCurrency(mockData.myMetrics.payments)} trend={-3} />
      <MetricCard icon={DollarSign} title="My Pre-Payments" value={formatCurrency(mockData.myMetrics.prePayments)} trend={4} />
    </div>
  </div>
);

export default DashboardPage;