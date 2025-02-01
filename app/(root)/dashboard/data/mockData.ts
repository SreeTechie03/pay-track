import { DashboardData } from '../types/dashboard';

export const mockData: DashboardData = {
  totalRevenue: 2543900,
  totalPayments: 1987650,
  totalPrePayments: 456700,
  totalFullPayments: 1298400,
  totalPostPendingPayments: 232550,
  topTeam: 'Alpha Squad',
  topEmployees: [
    { name: 'Ramana – Guntur Karam', revenue: 198450, team: 'Alpha Squad', attendance: 98, tasks: 45 },
    { name: 'Daya – Temper', revenue: 187600, team: 'Beta Squad', attendance: 95, tasks: 42 },
    { name: 'Mulleti Pushpa Raj – Pushpa', revenue: 176900, team: 'Gamma Squad', attendance: 97, tasks: 38 },
    { name: 'Abhiram – Nannaku Prematho', revenue: 165300, team: 'Alpha Squad', attendance: 94, tasks: 40 },
    { name: 'Krishna Murthy Kautilya – Nannaku Prematho', revenue: 154700, team: 'Beta Squad', attendance: 96, tasks: 37 },
  ],
  myMetrics: {
    revenue: 187600,
    payments: 145300,
    prePayments: 34500,
    fullPayments: 98700,
    postPendingPayments: 12100,
    target: 200000,
    progress: 75,
    tasks: {
      completed: 42,
      pending: 8,
      overdue: 2
    },
    attendance: 95,
    meetings: 12
  },
  revenueOverview: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [280000, 320000, 450000, 380000, 520000, 480000, 590000, 620000, 580000, 650000, 680000, 720000],
    previousYearData: [250000, 280000, 350000, 320000, 420000, 390000, 440000, 460000, 450000, 480000, 500000, 520000],
  },
  teams: [
    { 
      name: 'Alpha Squad', 
      revenue: 1200000,
      members: 12,
      activeTasks: 45,
      completionRate: 92
    },
    { 
      name: 'Beta Squad', 
      revenue: 900000,
      members: 10,
      activeTasks: 38,
      completionRate: 88
    },
    { 
      name: 'Gamma Squad', 
      revenue: 750000,
      members: 8,
      activeTasks: 32,
      completionRate: 90
    },
  ],
  operations: {
    totalPayment: 1500000,
    receivedPayment: 1200000,
    pendingPayment: 300000,
    paymentHistory: [
      { month: 'Jan', received: 100000, pending: 50000 },
      { month: 'Feb', received: 120000, pending: 40000 },
      { month: 'Mar', received: 150000, pending: 30000 },
      { month: 'Apr', received: 130000, pending: 20000 },
      { month: 'May', received: 140000, pending: 10000 },
      { month: 'Jun', received: 160000, pending: 5000 },
      { month: 'Jul', received: 180000, pending: 10000 },
      { month: 'Aug', received: 170000, pending: 20000 },
      { month: 'Sep', received: 190000, pending: 30000 },
      { month: 'Oct', received: 200000, pending: 40000 },
      { month: 'Nov', received: 210000, pending: 50000 },
      { month: 'Dec', received: 220000, pending: 60000 },

],
    processingTimes: [
      { type: 'Pre-Payment', time: 2 },
      { type: 'Full Payment', time: 1 },
      { type: 'Post-Payment', time: 3 },
    ],
    efficiency: {
      current: 92,
      target: 95,
      previous: 85
    }
  },
};