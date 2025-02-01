import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: React.ComponentType<any>;
  title: string;
  value: string;
  trend?: number;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  icon: Icon, 
  title, 
  value, 
  trend, 
  className = '' 
}) => (
  <div className={`bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-indigo-100 rounded-lg">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
      </div>
      {trend !== undefined && (
        <div className={`flex items-center ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span className="text-sm font-medium">{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-lg sm:text-2xl font-semibold text-gray-900">{value}</p>
  </div>
);