'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';

export default function FirebaseTest() {
  const [authStatus, setAuthStatus] = useState('Testing Firebase Auth...');

  useEffect(() => {
    // Test Firebase Auth
    try {
      if (auth) {
        setAuthStatus('✅ Firebase Auth initialized successfully');
        console.log('Firebase Auth Domain:', auth.config.authDomain);
        console.log('Firebase API Key:', auth.config.apiKey?.substring(0, 10) + '...');
      } else {
        setAuthStatus('❌ Firebase Auth not initialized');
      }
    } catch (error: any) {
      setAuthStatus(`❌ Firebase Auth Error: ${error}`);
      console.error('Firebase Auth error:', error);
    }
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white rounded mb-4">
      <h3 className="font-bold mb-2">Firebase Connection Test</h3>
      <div className="space-y-1 text-sm">
        <p>{authStatus}</p>
      </div>
    </div>
  );
}