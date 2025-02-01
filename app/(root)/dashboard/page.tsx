"use client";

import React, { useState } from 'react';
import { ViewType, AdminSubView } from './types/dashboard';
import { Navigation } from '@/components/Navigation';
import { AdminSubNav } from '@/components/AdminSubNav';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';
import { EmployeeDashboard } from '@/components/dashboards/EmployeeDashboard';
import { OperationsDashboard } from '@/components/dashboards/OperationsDashboard';


const App = () => {
  const [currentView, setCurrentView] = useState<ViewType>('admin');
  const [adminSubView, setAdminSubView] = useState<AdminSubView>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardTitle = () => {
    switch (currentView) {
      case 'admin':
        return 'Admin Dashboard';
      case 'employee':
        return 'Employee Dashboard';
      case 'operations':
        return 'Operations Dashboard';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navigation
        currentView={currentView}
        setCurrentView={setCurrentView}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        title={getDashboardTitle()}
      />

      <div className="flex-1 overflow-y-auto">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {currentView === 'admin' && (
            <>
              <AdminSubNav currentView={adminSubView} setView={setAdminSubView} />
              <AdminDashboard subView={adminSubView} />
            </>
          )}
          {currentView === 'employee' && <EmployeeDashboard />}
          {currentView === 'operations' && <OperationsDashboard />}
        </main>
      </div>
    </div>
  );
};

export default App;