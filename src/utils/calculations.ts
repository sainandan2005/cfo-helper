import { BaselineData, ScenarioData, ForecastResults } from '@/types';

export function calculateMonthlyNet(baseline: BaselineData, scenario: ScenarioData): number {
  const newMonthlyExpenses = baseline.monthlyExpenses + 
    (scenario.newHires * scenario.costPerHire) + 
    scenario.extraSpending;
  
  const newMonthlyIncome = baseline.monthlyIncome * (1 + scenario.revenueChange / 100);
  
  return newMonthlyIncome - newMonthlyExpenses;
}

export function calculateRunway(cashBalance: number, monthlyBurn: number): number | null {
  if (monthlyBurn >= 0) return null; // Company is profitable
  return Math.floor(cashBalance / Math.abs(monthlyBurn));
}

export function generateProjection(
  baseline: BaselineData, 
  scenario: ScenarioData, 
  months: number = 36
): number[] {
  const monthlyNet = calculateMonthlyNet(baseline, scenario);
  const projection: number[] = [];
  
  let currentBalance = baseline.cashBalance;
  
  for (let i = 0; i <= months; i++) {
    projection.push(currentBalance);
    currentBalance += monthlyNet;
  }
  
  return projection;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateForecast(
  baseline: BaselineData, 
  scenario: ScenarioData
): ForecastResults {
  const monthlyNet = calculateMonthlyNet(baseline, scenario);
  const runway = calculateRunway(baseline.cashBalance, monthlyNet);
  const projection = generateProjection(baseline, scenario);
  const isProfitable = monthlyNet > 0;
  
  return {
    monthlyNet,
    runway,
    projection,
    isProfitable,
  };
}