'use client';

import { BaselineData, ScenarioData, ForecastResults } from '@/types';
import { formatCurrency } from '@/utils/calculations';

interface FinancialHealthScoreProps {
  baseline: BaselineData;
  scenario: ScenarioData;
  forecast: ForecastResults;
}

export function FinancialHealthScore({ baseline, scenario, forecast }: FinancialHealthScoreProps) {
  // Calculate various financial health metrics
  const calculateHealthScore = () => {
    let score = 0;
    const metrics = [];

    // 1. Profitability Score (0-25 points)
    const profitabilityScore = forecast.isProfitable ? 25 : Math.max(0, 25 + (forecast.monthlyNet / 100000) * 5);
    score += profitabilityScore;
    metrics.push({
      name: 'Profitability',
      score: profitabilityScore,
      maxScore: 25,
      status: forecast.isProfitable ? 'excellent' : forecast.monthlyNet > -200000 ? 'good' : 'poor'
    });

    // 2. Cash Runway Score (0-25 points)
    let runwayScore = 0;
    if (!forecast.runway) {
      runwayScore = 25; // Infinite runway
    } else if (forecast.runway >= 18) {
      runwayScore = 25;
    } else if (forecast.runway >= 12) {
      runwayScore = 20;
    } else if (forecast.runway >= 6) {
      runwayScore = 15;
    } else if (forecast.runway >= 3) {
      runwayScore = 10;
    } else {
      runwayScore = 5;
    }
    score += runwayScore;
    metrics.push({
      name: 'Cash Runway',
      score: runwayScore,
      maxScore: 25,
      status: runwayScore >= 20 ? 'excellent' : runwayScore >= 15 ? 'good' : 'poor'
    });

    // 3. Growth Efficiency Score (0-25 points)
    const revenueGrowth = scenario.revenueChange;
    const costIncrease = ((scenario.newHires * scenario.costPerHire + scenario.extraSpending) / baseline.monthlyExpenses) * 100;
    const efficiency = revenueGrowth - costIncrease;
    const efficiencyScore = Math.max(0, Math.min(25, 12.5 + efficiency * 0.5));
    score += efficiencyScore;
    metrics.push({
      name: 'Growth Efficiency',
      score: efficiencyScore,
      maxScore: 25,
      status: efficiency > 10 ? 'excellent' : efficiency > 0 ? 'good' : 'poor'
    });

    // 4. Financial Stability Score (0-25 points)
    const cashToMonthlyExpenses = baseline.cashBalance / (baseline.monthlyExpenses + scenario.newHires * scenario.costPerHire + scenario.extraSpending);
    let stabilityScore = 0;
    if (cashToMonthlyExpenses >= 12) {
      stabilityScore = 25;
    } else if (cashToMonthlyExpenses >= 6) {
      stabilityScore = 20;
    } else if (cashToMonthlyExpenses >= 3) {
      stabilityScore = 15;
    } else {
      stabilityScore = 10;
    }
    score += stabilityScore;
    metrics.push({
      name: 'Financial Stability',
      score: stabilityScore,
      maxScore: 25,
      status: stabilityScore >= 20 ? 'excellent' : stabilityScore >= 15 ? 'good' : 'poor'
    });

    return { totalScore: Math.round(score), metrics };
  };

  const { totalScore, metrics } = calculateHealthScore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Financial Health Score</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">AI Analysis</span>
        </div>
      </div>

      {/* Overall Score */}
      <div className="text-center mb-8">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-700"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(totalScore / 100) * 314} 314`}
              className={getScoreColor(totalScore)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(totalScore)}`}>
                {totalScore}
              </div>
              <div className="text-xs text-gray-400">/ 100</div>
            </div>
          </div>
        </div>
        <h4 className={`text-xl font-bold ${getScoreColor(totalScore)} mb-2`}>
          {getScoreLabel(totalScore)}
        </h4>
        <p className="text-gray-400 text-sm">
          {totalScore >= 80 && "Your financial position is strong with excellent growth prospects."}
          {totalScore >= 60 && totalScore < 80 && "Good financial health with room for optimization."}
          {totalScore >= 40 && totalScore < 60 && "Moderate financial health requiring attention."}
          {totalScore < 40 && "Financial position needs immediate strategic intervention."}
        </p>
      </div>

      {/* Detailed Metrics */}
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-900 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-300">{metric.name}</span>
              <span className="text-sm text-gray-400">
                {Math.round(metric.score)}/{metric.maxScore}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full bg-gradient-to-r ${
                  metric.status === 'excellent' ? 'from-emerald-500 to-emerald-600' :
                  metric.status === 'good' ? 'from-yellow-500 to-yellow-600' :
                  'from-red-500 to-red-600'
                }`}
                style={{ width: `${(metric.score / metric.maxScore) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Insights */}
      <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
        <h5 className="text-sm font-medium text-white mb-2">Key Insights</h5>
        <ul className="text-xs text-gray-300 space-y-1">
          {forecast.isProfitable ? (
            <li>• Strong profitability indicates sustainable business model</li>
          ) : (
            <li>• Focus on achieving profitability to improve overall health</li>
          )}
          {forecast.runway && forecast.runway < 6 ? (
            <li>• Critical: Cash runway below 6 months requires immediate action</li>
          ) : (
            <li>• Adequate cash runway provides strategic flexibility</li>
          )}
          {scenario.revenueChange > 0 ? (
            <li>• Revenue growth scenario supports positive trajectory</li>
          ) : (
            <li>• Consider strategies to accelerate revenue growth</li>
          )}
        </ul>
      </div>
    </div>
  );
}