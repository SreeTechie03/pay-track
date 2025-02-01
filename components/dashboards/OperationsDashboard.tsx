import React from 'react';
import { DollarSign, BarChart3 } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area
} from 'recharts';
import { MetricCard } from '../MetricCard';
import { formatCurrency } from '@/lib/utils';
import { mockData } from '@/app/(root)/dashboard/data/mockData';

export const OperationsDashboard: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <MetricCard
        icon={DollarSign}
        title="Total Payment"
        value={formatCurrency(mockData.operations.totalPayment)}
      />
      <MetricCard
        icon={DollarSign}
        title="Received Payment"
        value={formatCurrency(mockData.operations.receivedPayment)}
        trend={8}
      />
      <MetricCard
        icon={DollarSign}
        title="Pending Payment"
        value={formatCurrency(mockData.operations.pendingPayment)}
        trend={-3}
      />
      <MetricCard
        icon={BarChart3}
        title="Processing Efficiency"
        value={`${mockData.operations.efficiency.current}%`}
        trend={mockData.operations.efficiency.current - mockData.operations.efficiency.previous}
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment History</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={mockData.operations.paymentHistory}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₹${value / 1000}K`} />
              <Tooltip formatter={(value: any) => formatCurrency(value)} />
              <Area
                type="monotone"
                dataKey="received"
                stackId="1"
                stroke="#4F46E5"
                fill="#4F46E5"
                fillOpacity={0.6}
                name="Received"
              />
              <Area
                type="monotone"
                dataKey="pending"
                stackId="1"
                stroke="#94A3B8"
                fill="#94A3B8"
                fillOpacity={0.6}
                name="Pending"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Processing Times</h3>
        <div className="space-y-4">
          {mockData.operations.processingTimes.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500">{item.type}</span>
                <span className="text-sm text-gray-500">{item.time} days average</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${
                    item.time <= 1 ? 'bg-green-500' :
                    item.time <= 2 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${(item.time / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Efficiency Metrics</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Target:</span>
          <span className="font-medium text-gray-900">{mockData.operations.efficiency.target}%</span>
        </div>
      </div>
      <div className="h-4 bg-gray-200 rounded-full mb-4">
        <div
          className="h-4 bg-indigo-600 rounded-full transition-all duration-500"
          style={{ width: `${mockData.operations.efficiency.current}%` }}
        ></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Current Efficiency</p>
          <p className="text-xl font-semibold text-gray-900">{mockData.operations.efficiency.current}%</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Previous Period</p>
          <p className="text-xl font-semibold text-gray-900">{mockData.operations.efficiency.previous}%</p>
        </div>
      </div>
    </div>
  </div>
);