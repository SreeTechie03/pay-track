import React,{useState,useEffect} from 'react';
import { DollarSign, Users, Building2, X } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  BarChart,
  Bar
} from 'recharts';
import { MetricCard } from '../MetricCard';
import { AdminSubView } from '@/app/(root)/dashboard/types/dashboard';
import { mockData } from '@/app/(root)/dashboard/data/mockData';
import { formatCurrency } from '@/lib/utils';

interface AdminDashboardProps {
  subView: AdminSubView;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ subView }) => {
  if (subView === 'overview') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <MetricCard
            icon={DollarSign}
            title="Total Revenue"
            value={formatCurrency(mockData.totalRevenue)}
            trend={12}
          />
          <MetricCard
            icon={DollarSign}
            title="Total Payments"
            value={formatCurrency(mockData.totalPayments)}
            trend={-5}
          />
          <MetricCard
            icon={Users}
            title="Active Teams"
            value={mockData.teams.length.toString()}
            trend={0}
          />
          <MetricCard
            icon={Building2}
            title="Top Team"
            value={mockData.topTeam}
            trend={15}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Revenue Overview</h3>
            <div className="h-[300px] sm:h-[400px]">
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
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    interval={'preserveStartEnd'}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `₹${value / 1000}K`}
                  />
                  <Tooltip
                    formatter={(value: any) => formatCurrency(value)}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    name="Current Year"
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="previous"
                    stroke="#94A3B8"
                    strokeWidth={2}
                    name="Previous Year"
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Top Performers</h3>
            <div className="space-y-3">
              {mockData.topEmployees.map((employee, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="mb-2 sm:mb-0">
                    <p className="font-medium text-gray-900">{employee.name}</p>
                    <p className="text-sm text-gray-500">{employee.team}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Revenue</p>
                      <p className="font-medium text-gray-900">{formatCurrency(employee.revenue)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Tasks</p>
                      <p className="font-medium text-gray-900">{employee.tasks}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (subView === 'team') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {mockData.teams.map((team, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">{team.name}</h3>
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Users className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Revenue</span>
                  <span className="font-medium text-gray-900">{formatCurrency(team.revenue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Members</span>
                  <span className="font-medium text-gray-900">{team.members}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Active Tasks</span>
                  <span className="font-medium text-gray-900">{team.activeTasks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Completion Rate</span>
                  <span className="font-medium text-gray-900">{team.completionRate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Team Performance Comparison</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockData.teams}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#4F46E5" />
                <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="revenue" fill="#4F46E5" name="Revenue" />
                <Bar yAxisId="right" dataKey="completionRate" fill="#94A3B8" name="Completion Rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
  const [employees, setEmployees] = useState(mockData.topEmployees);
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ 
    name: '', 
    team: '', 
    revenue: 0,  // Change to number
    tasks: 0,    // Change to number
    attendance: 0 // Change to number
  });
  

  useEffect(() => {
    // Retrieve stored employees or fallback to mockData
    const storedEmployees = JSON.parse(localStorage.getItem('topEmployees') || '[]');
    if (storedEmployees.length > 0) {
      setEmployees(storedEmployees);
    } else {
      setEmployees(mockData.topEmployees); // Use mockData initially
    }
  }, []);
  
  
  // Load data from local storage on component mount
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('topEmployees') || '[]');
    if (storedEmployees.length > 0) {
      setEmployees(storedEmployees);
    } else {
      setEmployees(mockData.topEmployees); // Load from mockData initially
    }
  }, []);
  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.team) {
      const updatedEmployee = {
        ...newEmployee,
        revenue: Number(newEmployee.revenue),
        tasks: Number(newEmployee.tasks),
        attendance: Number(newEmployee.attendance),
      };
  
      // Get the current employees list
      const storedEmployees = JSON.parse(localStorage.getItem('topEmployees') || '[]');
  
      // Add the new employee and update storage
      const updatedEmployees = [updatedEmployee, ...storedEmployees];
      localStorage.setItem('topEmployees', JSON.stringify(updatedEmployees));
  
      // Update the state to reflect the changes
      setEmployees(updatedEmployees);
  
      // Reset the form
      setShowForm(false);
      setNewEmployee({ name: '', team: '', revenue: 0, tasks: 0, attendance: 0 });
    }
  };
  
  const handleDeleteEmployee = (index: number) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
    localStorage.setItem('topEmployees', JSON.stringify(updatedEmployees));
  };
  
  
  if (subView === 'employees') {
    return (
      <div className="space-y-6 relative">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Employee Directory</h3>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => setShowForm(true)}
          >
            Add Employee
          </button>
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowForm(false)}
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-medium text-gray-900 mb-4">New Employee Details</h3>
            <input
              type="text"
              placeholder="Name"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Team"
              value={newEmployee.team}
              onChange={(e) => setNewEmployee({ ...newEmployee, team: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              placeholder="Revenue"
              value={newEmployee.revenue}
              onChange={(e) => setNewEmployee({ ...newEmployee, revenue: Number(e.target.value) })}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              placeholder="Tasks"
              value={newEmployee.tasks}
              onChange={(e) => setNewEmployee({ ...newEmployee, tasks: Number(e.target.value) })}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              placeholder="Attendance (%)"
              value={newEmployee.attendance}
              onChange={(e) => setNewEmployee({ ...newEmployee, attendance: Number(e.target.value) })}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={handleAddEmployee}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Employee
            </button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.team}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">{employee.revenue}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">{employee.tasks}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">{employee.attendance}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
              <button
  onClick={() => handleDeleteEmployee(index)}
  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
>
  Delete
</button>


              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );}

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <MetricCard
          icon={DollarSign}
          title="Total Payments"
          value={formatCurrency(mockData.totalPayments)}
          trend={8}
        />
        <MetricCard
          icon={DollarSign}
          title="Pre-Payments"
          value={formatCurrency(mockData.totalPrePayments)}
          trend={5}
        />
        <MetricCard
          icon={DollarSign}
          title="Pending Payments"
          value={formatCurrency(mockData.totalPostPendingPayments)}
          trend={-3}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Recent Transactions</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="mb-2 sm:mb-0">
                <p className="font-medium text-gray-900">Transaction #{2024001 + index}</p>
                <p className="text-sm text-gray-500">March {index + 1}, 2024</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  index % 3 === 0 ? 'bg-green-100 text-green-800' :
                  index % 3 === 1 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {index % 3 === 0 ? 'Completed' :
                   index % 3 === 1 ? 'Pending' :
                   'Failed'}
                </span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(Math.random() * 100000)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};