import { useState, useCallback, useEffect } from 'react';
import { BaselineData, ScenarioData, ForecastResults } from '@/types';

export interface SavedScenario {
  id: string;
  name: string;
  description?: string;
  baseline: BaselineData;
  scenario: ScenarioData;
  forecast: ForecastResults;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export function useScenarios() {
  const [scenarios, setScenarios] = useState<SavedScenario[]>([]);
  const [loading, setLoading] = useState(false);

  // Load scenarios from localStorage on mount
  useEffect(() => {
    const savedScenarios = localStorage.getItem('cfo-helper-scenarios');
    if (savedScenarios) {
      try {
        const parsed = JSON.parse(savedScenarios);
        setScenarios(parsed.map((s: any) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt)
        })));
      } catch (error) {
        console.error('Failed to load scenarios:', error);
      }
    }
  }, []);

  // Save scenarios to localStorage whenever scenarios change
  useEffect(() => {
    if (scenarios.length > 0) {
      localStorage.setItem('cfo-helper-scenarios', JSON.stringify(scenarios));
    }
  }, [scenarios]);

  const saveScenario = useCallback((
    name: string,
    baseline: BaselineData,
    scenario: ScenarioData,
    forecast: ForecastResults,
    description?: string,
    tags?: string[]
  ) => {
    const newScenario: SavedScenario = {
      id: `scenario-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description,
      baseline: { ...baseline },
      scenario: { ...scenario },
      forecast: { ...forecast },
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: tags || []
    };

    setScenarios(prev => [newScenario, ...prev]);
    return newScenario.id;
  }, []);

  const updateScenario = useCallback((
    id: string,
    updates: Partial<Omit<SavedScenario, 'id' | 'createdAt'>>
  ) => {
    setScenarios(prev => prev.map(s => 
      s.id === id 
        ? { ...s, ...updates, updatedAt: new Date() }
        : s
    ));
  }, []);

  const deleteScenario = useCallback((id: string) => {
    setScenarios(prev => prev.filter(s => s.id !== id));
  }, []);

  const duplicateScenario = useCallback((id: string) => {
    const scenario = scenarios.find(s => s.id === id);
    if (scenario) {
      const newScenario: SavedScenario = {
        ...scenario,
        id: `scenario-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: `${scenario.name} (Copy)`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setScenarios(prev => [newScenario, ...prev]);
      return newScenario.id;
    }
  }, [scenarios]);

  const getScenario = useCallback((id: string) => {
    return scenarios.find(s => s.id === id);
  }, [scenarios]);

  const searchScenarios = useCallback((query: string) => {
    if (!query.trim()) return scenarios;
    
    const lowercaseQuery = query.toLowerCase();
    return scenarios.filter(s => 
      s.name.toLowerCase().includes(lowercaseQuery) ||
      s.description?.toLowerCase().includes(lowercaseQuery) ||
      s.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }, [scenarios]);

  const getScenariosByTag = useCallback((tag: string) => {
    return scenarios.filter(s => s.tags?.includes(tag));
  }, [scenarios]);

  const getAllTags = useCallback(() => {
    const allTags = scenarios.flatMap(s => s.tags || []);
    return Array.from(new Set(allTags));
  }, [scenarios]);

  return {
    scenarios,
    loading,
    saveScenario,
    updateScenario,
    deleteScenario,
    duplicateScenario,
    getScenario,
    searchScenarios,
    getScenariosByTag,
    getAllTags
  };
}