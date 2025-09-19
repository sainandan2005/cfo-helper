'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function FirebaseTest() {
  const [authStatus, setAuthStatus] = useState('Testing Firebase Auth...');
  const [firestoreStatus, setFirestoreStatus] = useState('Testing Firestore...');

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
    } catch (error) {
      setAuthStatus(`❌ Firebase Auth Error: ${error}`);
      console.error('Firebase Auth error:', error);
    }

    // Test Firestore
    const testFirestore = async () => {
      try {
        if (db) {
          // Try to read a test document
          const testDoc = doc(db, 'test', 'connection');
          await getDoc(testDoc);
          setFirestoreStatus('✅ Firestore connected successfully');
        } else {
          setFirestoreStatus('❌ Firestore not initialized');
        }
      } catch (error: any) {
        if (error.code === 'unavailable') {
          setFirestoreStatus('❌ Firestore: Database not created or offline');
        } else if (error.code === 'permission-denied') {
          setFirestoreStatus('⚠️ Firestore: Connected but permission denied (normal for test doc)');
        } else {
          setFirestoreStatus(`❌ Firestore Error: ${error.message}`);
        }
        console.error('Firestore error:', error);
      }
    };

    testFirestore();
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white rounded mb-4">
      <h3 className="font-bold mb-2">Firebase Connection Test</h3>
      <div className="space-y-1 text-sm">
        <p>{authStatus}</p>
        <p>{firestoreStatus}</p>
      </div>
    </div>
  );
}