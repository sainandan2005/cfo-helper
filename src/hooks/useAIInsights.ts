import { useState, useCallback } from 'react';
import { BaselineData, ScenarioData, ForecastResults, AIInsight } from '@/types';

interface AIInsightsResponse {
  summary: string;
  insights?: string;
  risks: string;
  recommendations: Array<{
    action: string;
    timeline: string;
    impact: string;
  }> | string[];
  kpis?: string[];
  riskLevel: 'low' | 'medium' | 'high';
  riskReasoning?: string;
}

export function useAIInsights() {
  const [insights, setInsights] = useState<AIInsightsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInsights = useCallback(async (
    baseline: BaselineData,
    scenario: ScenarioData,
    forecast: ForecastResults
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ baseline, scenario, forecast }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate insights');
      }

      const data = await response.json();
      setInsights(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Fallback insights
      setInsights({
        summary: "AI insights temporarily unavailable. Please review the financial metrics manually.",
        risks: forecast.isProfitable 
          ? "Monitor market conditions and maintain growth sustainability."
          : "Cash runway requires attention. Consider cost optimization strategies.",
        recommendations: [
          "Review monthly burn rate and identify optimization opportunities",
          "Establish contingency plans for various market scenarios",
          "Monitor key financial metrics weekly"
        ],
        riskLevel: forecast.runway && forecast.runway < 6 ? 'high' : 
                  forecast.runway && forecast.runway < 12 ? 'medium' : 'low'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    insights,
    loading,
    error,
    generateInsights,
  };
}