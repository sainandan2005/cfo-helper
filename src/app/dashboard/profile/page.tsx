'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function ProfilePage() {
  const { userProfile, updateUserProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userProfile?.firstName || '',
    lastName: userProfile?.lastName || '',
    company: userProfile?.company || '',
    displayName: userProfile?.displayName || ''
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        displayName: `${formData.firstName} ${formData.lastName}`
      });
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="bg-gray-900 min-h-screen text-white">
        <DashboardHeader scenarioCount={0} />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  First Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white bg-gray-700 px-3 py-2 rounded-lg">{userProfile?.firstName || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white bg-gray-700 px-3 py-2 rounded-lg">{userProfile?.lastName || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <p className="text-gray-400 bg-gray-700 px-3 py-2 rounded-lg">{userProfile?.email}</p>
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white bg-gray-700 px-3 py-2 rounded-lg">{userProfile?.company || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Plan
                </label>
                <p className="text-white bg-gray-700 px-3 py-2 rounded-lg capitalize">{userProfile?.plan || 'starter'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Member Since
                </label>
                <p className="text-white bg-gray-700 px-3 py-2 rounded-lg">
                  {userProfile?.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <Link 
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}