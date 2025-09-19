import { useState, useCallback, useMemo } from 'react';
import { BaselineData, ScenarioData, ForecastResults } from '@/types';
import { calculateForecast } from '@/utils/calculations';

const initialBaseline: BaselineData = {
  cashBalance: 1000000,
  monthlyIncome: 500000,
  monthlyExpenses: 400000,
};

const initialScenario: ScenarioData = {
  newHires: 0,
  costPerHire: 50000,
  extraSpending: 0,
  revenueChange: 0,
};

export function useFinancialCalculations() {
  const [baseline, setBaseline] = useState<BaselineData>(initialBaseline);
  const [scenario, setScenario] = useState<ScenarioData>(initialScenario);
  const [scenarioCount, setScenarioCount] = useState(0);

  const forecast = useMemo(() => {
    return calculateForecast(baseline, scenario);
  }, [baseline, scenario]);

  const updateBaseline = useCallback((updates: Partial<BaselineData>) => {
    setBaseline(prev => ({ ...prev, ...updates }));
    setScenarioCount(prev => prev + 1);
  }, []);

  const updateScenario = useCallback((updates: Partial<ScenarioData>) => {
    setScenario(prev => ({ ...prev, ...updates }));
    setScenarioCount(prev => prev + 1);
  }, []);

  return {
    baseline,
    scenario,
    forecast,
    scenarioCount,
    updateBaseline,
    updateScenario,
  };
}