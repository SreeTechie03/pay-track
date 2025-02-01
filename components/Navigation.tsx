import React from 'react';
import { Menu, X } from 'lucide-react';
import { ViewType } from '@/app/(root)/dashboard/types/dashboard';

interface NavigationProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  title: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  setCurrentView,
  mobileMenuOpen,
  setMobileMenuOpen,
  title,
}) => (
  <nav className="sticky top-0 z-50 bg-gray-800 text-white shadow-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">{title}</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          {['admin', 'employee', 'operations'].map((view) => (
            <button
              key={view}
              onClick={() => setCurrentView(view as ViewType)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentView === view
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Navigation */}
    {mobileMenuOpen && (
      <div className="md:hidden border-t border-gray-700">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {['admin', 'employee', 'operations'].map((view) => (
            <button
              key={view}
              onClick={() => {
                setCurrentView(view as ViewType);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                currentView === view
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </div>
    )}
  </nav>
);