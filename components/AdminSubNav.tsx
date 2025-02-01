import { AdminSubView } from '@/app/(root)/dashboard/types/dashboard';
import React from 'react';

interface AdminSubNavProps {
  currentView: AdminSubView;
  setView: (view: AdminSubView) => void;
}

export const AdminSubNav: React.FC<AdminSubNavProps> = ({ currentView, setView }) => (
  <div className="sticky top-26 z-40 mb-6 bg-white p-2 sm:p-4 rounded-lg shadow-sm overflow-x-auto backdrop-blur-sm bg-opacity-90">
    <div className="flex space-x-2 sm:space-x-4">
      {['overview', 'team', 'employees', 'transactions'].map((view) => (
        <button
          key={view}
          onClick={() => setView(view as AdminSubView)}
          className={`
            px-3 py-2 sm:px-4 sm:py-2 rounded-lg whitespace-nowrap
            transition-colors duration-200 text-sm sm:text-base
            ${currentView === view
              ? 'bg-indigo-600 text-white'
              : 'hover:bg-gray-100 text-gray-700'
            }
          `}
        >
          {view.charAt(0).toUpperCase() + view.slice(1)}
        </button>
      ))}
    </div>
  </div>
);