export type ViewType = 'admin' | 'employee' | 'operations';
export type AdminSubView = 'overview' | 'team' | 'employees' | 'transactions';

export interface Employee {
  name: string;
  revenue: number;
  team: string;
  attendance: number;
  tasks: number;
}

export interface Team {
  name: string;
  revenue: number;
  members: number;
  activeTasks: number;
  completionRate: number;
}

export interface ProcessingTime {
  type: string;
  time: number;
}

export interface PaymentHistory {
  month: string;
  received: number;
  pending: number;
}

export interface DashboardData {
  totalRevenue: number;
  totalPayments: number;
  totalPrePayments: number;
  totalFullPayments: number;
  totalPostPendingPayments: number;
  topTeam: string;
  topEmployees: Employee[];
  myMetrics: {
    revenue: number;
    payments: number;
    prePayments: number;
    fullPayments: number;
    postPendingPayments: number;
    target: number;
    progress: number;
    tasks: {
      completed: number;
      pending: number;
      overdue: number;
    };
    attendance: number;
    meetings: number;
  };
  revenueOverview: {
    labels: string[];
    data: number[];
    previousYearData: number[];
  };
  teams: Team[];
  operations: {
    totalPayment: number;
    receivedPayment: number;
    pendingPayment: number;
    paymentHistory: PaymentHistory[];
    processingTimes: ProcessingTime[];
    efficiency: {
      current: number;
      target: number;
      previous: number;
    };
  };
}