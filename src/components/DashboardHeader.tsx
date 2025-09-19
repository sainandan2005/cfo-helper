'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface DashboardHeaderProps {
  scenarioCount: number;
}

export function DashboardHeader({ scenarioCount }: DashboardHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logout();
      router.push('/landing');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName = user?.displayName || 'User';
  const email = user?.email || '';
  const company = 'Company';
  const avatar = getInitials(displayName);

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CFO Helper</h1>
                <p className="text-xs text-gray-400">Financial Forecasting</p>
              </div>
            </Link>

            {/* Navigation Menu */}
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link href="/dashboard" className="text-white border-b-2 border-blue-500 px-1 pb-4 text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/dashboard/scenarios" className="text-gray-300 hover:text-white border-b-2 border-transparent hover:border-gray-300 px-1 pb-4 text-sm font-medium transition-colors">
                Scenarios
              </Link>
              <Link href="/dashboard/reports" className="text-gray-300 hover:text-white border-b-2 border-transparent hover:border-gray-300 px-1 pb-4 text-sm font-medium transition-colors">
                Reports
              </Link>
              <Link href="/dashboard/settings" className="text-gray-300 hover:text-white border-b-2 border-transparent hover:border-gray-300 px-1 pb-4 text-sm font-medium transition-colors">
                Settings
              </Link>
            </nav>
          </div>

          {/* Right side - Stats and Profile */}
          <div className="flex items-center space-x-4">
            {/* Scenario Counter */}
            <div className="hidden sm:flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-gray-400">Scenarios: </span>
                <span className="font-bold text-emerald-400">{scenarioCount}</span>
              </div>
              <div className="h-6 w-px bg-gray-600"></div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Live</span>
              </div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-white mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm text-white">Cash runway below 6 months</p>
                          <p className="text-xs text-gray-400">Current scenario shows 4.2 months remaining</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm text-white">New AI insights available</p>
                          <p className="text-xs text-gray-400">Updated recommendations based on latest data</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">{avatar}</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-white">{displayName}</p>
                  <p className="text-xs text-gray-400">{company}</p>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
                  <div className="p-4 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">{displayName}</p>
                    <p className="text-xs text-gray-400">{email}</p>
                  </div>
                  <div className="py-2">
                    <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                      Profile Settings
                    </Link>
                    <Link href="/dashboard/billing" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                      Billing & Plans
                    </Link>
                    <Link href="/dashboard/team" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                      Team Management
                    </Link>
                    <div className="border-t border-gray-700 mt-2 pt-2">
                      <Link href="/help" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                        Help & Support
                      </Link>
                      <button 
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}