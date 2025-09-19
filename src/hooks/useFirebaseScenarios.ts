import { useState, useCallback, useEffect } from 'react';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { BaselineData, ScenarioData, ForecastResults } from '@/types';

export interface FirebaseScenario {
  id: string;
  name: string;
  description?: string;
  baseline: BaselineData;
  scenario: ScenarioData;
  forecast: ForecastResults;
  createdAt: any;
  updatedAt: any;
  tags?: string[];
  userId: string;
}

export function useFirebaseScenarios() {
  const [scenarios, setScenarios] = useState<FirebaseScenario[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Real-time listener for user's scenarios
  useEffect(() => {
    if (!user) {
      setScenarios([]);
      return;
    }

    const scenariosRef = collection(db, 'scenarios');
    const q = query(
      scenariosRef,
      where('userId', '==', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const scenarioData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirebaseScenario[];
      
      setScenarios(scenarioData);
    });

    return unsubscribe;
  }, [user]);

  const saveScenario = useCallback(async (
    name: string,
    baseline: BaselineData,
    scenario: ScenarioData,
    forecast: ForecastResults,
    description?: string,
    tags?: string[]
  ) => {
    if (!user) throw new Error('User must be authenticated');

    setLoading(true);
    try {
      const scenarioData = {
        name,
        description,
        baseline,
        scenario,
        forecast,
        tags: tags || [],
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'scenarios'), scenarioData);
      return docRef.id;
    } catch (error) {
      console.error('Error saving scenario:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateScenario = useCallback(async (
    id: string,
    updates: Partial<Omit<FirebaseScenario, 'id' | 'userId' | 'createdAt'>>
  ) => {
    if (!user) throw new Error('User must be authenticated');

    setLoading(true);
    try {
      const scenarioRef = doc(db, 'scenarios', id);
      await updateDoc(scenarioRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating scenario:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const deleteScenario = useCallback(async (id: string) => {
    if (!user) throw new Error('User must be authenticated');

    setLoading(true);
    try {
      await deleteDoc(doc(db, 'scenarios', id));
    } catch (error) {
      console.error('Error deleting scenario:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const duplicateScenario = useCallback(async (id: string) => {
    const scenario = scenarios.find(s => s.id === id);
    if (scenario && user) {
      return await saveScenario(
        `${scenario.name} (Copy)`,
        scenario.baseline,
        scenario.scenario,
        scenario.forecast,
        scenario.description,
        scenario.tags
      );
    }
  }, [scenarios, user, saveScenario]);

  return {
    scenarios,
    loading,
    saveScenario,
    updateScenario,
    deleteScenario,
    duplicateScenario
  };
}