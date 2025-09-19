export interface BaselineData {
  cashBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export interface ScenarioData {
  newHires: number;
  costPerHire: number;
  extraSpending: number;
  revenueChange: number;
}

export interface ForecastResults {
  monthlyNet: number;
  runway: number | null;
  projection: number[];
  isProfitable: boolean;
}

export interface ReportData {
  baseline: BaselineData;
  scenario: ScenarioData;
  forecast: ForecastResults;
  timestamp: Date;
  scenarioCount: number;
}

export interface AIInsight {
  recommendation: string;
  reasoning: string;
  riskLevel: 'low' | 'medium' | 'high';
}