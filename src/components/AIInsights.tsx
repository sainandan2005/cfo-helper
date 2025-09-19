'use client';

import { useEffect } from 'react';
import { BaselineData, ScenarioData, ForecastResults } from '@/types';
import { useAIInsights } from '@/hooks/useAIInsights';

interface AIInsightsProps {
  baseline: BaselineData;
  scenario: ScenarioData;
  forecast: ForecastResults;
}

export function AIInsights({ baseline, scenario, forecast }: AIInsightsProps) {
  const { insights, loading, error, generateInsights } = useAIInsights();

  useEffect(() => {
    // Generate insights when data changes, with a small delay to avoid too many API calls
    const timer = setTimeout(() => {
      generateInsights(baseline, scenario, forecast);
    }, 1000);

    return () => clearTimeout(timer);
  }, [baseline, scenario, forecast, generateInsights]);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'text-red-400 bg-red-900/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'low': return 'text-emerald-400 bg-emerald-900/20 border-emerald-500/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'medium':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'low':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <div className="absolute inset-0 rounded-full h-12 w-12 border-t-2 border-pink-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-gray-400 text-sm">AI analyzing your financial scenario...</p>
          <p className="text-gray-500 text-xs mt-1">Powered by Gemini AI</p>
        </div>
      </div>
    );
  }

  if (error && !insights) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-400 text-sm">Unable to generate AI insights</p>
          <p className="text-gray-500 text-xs mt-1">Please check your API configuration</p>
        </div>
      </div>
    );
  }

  if (!insights) return null;

  return (
    <div className="space-y-4">
      {/* Executive Summary */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex items-start">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3 mt-0.5">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white mb-2">Executive Summary</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{insights.summary}</p>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className={`rounded-lg p-4 border ${getRiskColor(insights.riskLevel)}`}>
        <div className="flex items-start">
          <div className="mr-3 mt-0.5">
            {getRiskIcon(insights.riskLevel)}
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h4 className="text-sm font-semibold">Risk Assessment</h4>
              <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-current bg-opacity-20">
                {insights.riskLevel.toUpperCase()}
              </span>
            </div>
            <p className="text-sm leading-relaxed opacity-90">{insights.risks}</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex items-start">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3 mt-0.5">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white mb-3">Strategic Recommendations</h4>
            <div className="space-y-2">
              {insights.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {typeof recommendation === 'string' ? recommendation : recommendation.action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Attribution */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          Insights generated by{' '}
          <span className="text-purple-400 font-medium">Gemini AI</span>
          {' '}• Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}