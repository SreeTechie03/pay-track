import React from 'react';
import { DollarSign, Target, CheckCircle2, Calendar, Clock, X } from 'lucide-react';
import { MetricCard } from '../MetricCard';
import { mockData } from '@/app/(root)/dashboard/data/mockData';
import { formatCurrency } from '@/lib/utils';

export const EmployeeDashboard: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <MetricCard
        icon={DollarSign}
        title="My Revenue"
        value={formatCurrency(mockData.myMetrics.revenue)}
        trend={7}
      />
      <MetricCard
        icon={Target}
        title="Target Progress"
        value={`${mockData.myMetrics.progress}%`}
        trend={4}
      />
      <MetricCard
        icon={CheckCircle2}
        title="Tasks Completed"
        value={mockData.myMetrics.tasks.completed.toString()}
        trend={2}
      />
      <MetricCard
        icon={Calendar}
        title="Attendance"
        value={`${mockData.myMetrics.attendance}%`}
        trend={1}
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">My Performance</h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Progress</span>
              <span>{mockData.myMetrics.progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${mockData.myMetrics.progress}%` }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Current</p>
              <p className="font-medium text-gray-900">{formatCurrency(mockData.myMetrics.revenue)}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Target</p>
              <p className="font-medium text-gray-900">{formatCurrency(mockData.myMetrics.target)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Task Overview</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-medium text-green-700">Completed Tasks</span>
            </div>
            <span className="text-lg font-semibold text-green-700">{mockData.myMetrics.tasks.completed}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-yellow-500" />
              <span className="font-medium text-yellow-700">Pending Tasks</span>
            </div>
            <span className="text-lg font-semibold text-yellow-700">{mockData.myMetrics.tasks.pending}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <X className="w-5 h-5 text-red-500" />
              <span className="font-medium text-red-700">Overdue Tasks</span>
            </div>
            <span className="text-lg font-semibold text-red-700">{mockData.myMetrics.tasks.overdue}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Breakdown</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Pre-Payments</p>
          <p className="text-lg font-semibold text-gray-900">{formatCurrency(mockData.myMetrics.prePayments)}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Full Payments</p>
          <p className="text-lg font-semibold text-gray-900">{formatCurrency(mockData.myMetrics.fullPayments)}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Post-Pending</p>
          <p className="text-lg font-semibold text-gray-900">{formatCurrency(mockData.myMetrics.postPendingPayments)}</p>
        </div>
      </div>
    </div>
  </div>
);