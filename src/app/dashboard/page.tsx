'use client';

import { useState } from 'react';
import { useFinancialCalculations } from '@/hooks/useFinancialCalculations';
import { useScenarios } from '@/hooks/useScenarios';
import { formatCurrency } from '@/utils/calculations';
import { ForecastChart } from '@/components/ForecastChart';
import { ReportModal } from '@/components/ReportModal';
import { AIInsights } from '@/components/AIInsights';
import { DashboardHeader } from '@/components/DashboardHeader';
import { SaveScenarioModal } from '@/components/SaveScenarioModal';
import { AIAssistant } from '@/components/AIAssistant';
import { AIScenarioGenerator } from '@/components/AIScenarioGenerator';
import { FinancialHealthScore } from '@/components/FinancialHealthScore';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { generatePDFReport } from '@/utils/pdfGenerator';
import { ScenarioData } from '@/types';

export default function Dashboard() {
  const {
    baseline,
    scenario,
    forecast,
    scenarioCount,
    updateBaseline,
    updateScenario,
  } = useFinancialCalculations();

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  
  const { saveScenario } = useScenarios();

  const handleDownloadPDF = async () => {
    setGeneratingPDF(true);
    try {
      await generatePDFReport(baseline, scenario, forecast, scenarioCount);
    } catch (err) {
      console.error('Failed to generate PDF: ', err);
    } finally {
      setGeneratingPDF(false);
    }
  };

  const handleSaveScenario = (name: string, description?: string, tags?: string[]) => {
    saveScenario(name, baseline, scenario, forecast, description, tags);
  };

  const handleApplyAIScenario = (aiScenario: ScenarioData) => {
    updateScenario(aiScenario);
  };

  return (
    <ProtectedRoute>
      <div className="bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <DashboardHeader scenarioCount={scenarioCount} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column: Financial Inputs */}
          <div className="xl:col-span-1">
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Financial Parameters</h2>
              </div>
            
              {/* Baseline Financial Data Section */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-emerald-600 rounded-md flex items-center justify-center mr-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-200">Baseline Metrics</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cashBalance" className="block text-sm font-medium text-gray-300 mb-2">
                      Initial Cash Balance
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                      <input
                        type="number"
                        id="cashBalance"
                        value={baseline.cashBalance}
                        onChange={(e) => updateBaseline({ cashBalance: Number(e.target.value) || 0 })}
                        className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="1,000,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-300 mb-2">
                      Monthly Revenue
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                      <input
                        type="number"
                        id="monthlyIncome"
                        value={baseline.monthlyIncome}
                        onChange={(e) => updateBaseline({ monthlyIncome: Number(e.target.value) || 0 })}
                        className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="500,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="monthlyExpenses" className="block text-sm font-medium text-gray-300 mb-2">
                      Monthly Operating Costs
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                      <input
                        type="number"
                        id="monthlyExpenses"
                        value={baseline.monthlyExpenses}
                        onChange={(e) => updateBaseline({ monthlyExpenses: Number(e.target.value) || 0 })}
                        className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="400,000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Scenario Controls Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-purple-600 rounded-md flex items-center justify-center mr-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-200">Scenario Modeling</h3>
                  </div>
                  <AIScenarioGenerator 
                    baseline={baseline} 
                    onApplyScenario={handleApplyAIScenario}
                  />
                </div>
                
                {/* New Hires Section */}
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label htmlFor="newHires" className="text-sm font-medium text-gray-300">
                          Team Expansion
                        </label>
                        <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                          {scenario.newHires} {scenario.newHires === 1 ? 'hire' : 'hires'}
                        </span>
                      </div>
                      <input
                        type="range"
                        id="newHires"
                        min="0"
                        max="10"
                        value={scenario.newHires}
                        onChange={(e) => updateScenario({ newHires: Number(e.target.value) })}
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-blue"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>0</span>
                        <span>10</span>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="costPerHire" className="block text-sm font-medium text-gray-300 mb-2">
                        Cost per Hire (Monthly)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                        <input
                          type="number"
                          id="costPerHire"
                          value={scenario.costPerHire}
                          onChange={(e) => updateScenario({ costPerHire: Number(e.target.value) || 0 })}
                          className="w-full pl-8 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="50,000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extra Spending Section */}
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex justify-between items-center mb-3">
                    <label htmlFor="extraSpending" className="text-sm font-medium text-gray-300">
                      Additional Monthly Spend
                    </label>
                    <span className="px-3 py-1 bg-orange-600 text-white text-sm font-bold rounded-full">
                      {formatCurrency(scenario.extraSpending)}
                    </span>
                  </div>
                  <input
                    type="range"
                    id="extraSpending"
                    min="0"
                    max="100000"
                    step="1000"
                    value={scenario.extraSpending}
                    onChange={(e) => updateScenario({ extraSpending: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-orange"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>₹0</span>
                    <span>₹1L</span>
                  </div>
                </div>

                {/* Revenue Change Section */}
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex justify-between items-center mb-3">
                    <label htmlFor="revenueChange" className="text-sm font-medium text-gray-300">
                      Revenue Impact
                    </label>
                    <span className={`px-3 py-1 text-white text-sm font-bold rounded-full ${
                      scenario.revenueChange >= 0 ? 'bg-emerald-600' : 'bg-red-600'
                    }`}>
                      {scenario.revenueChange > 0 ? '+' : ''}{scenario.revenueChange}%
                    </span>
                  </div>
                  <input
                    type="range"
                    id="revenueChange"
                    min="-50"
                    max="50"
                    value={scenario.revenueChange}
                    onChange={(e) => updateScenario({ revenueChange: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-gradient"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>-50%</span>
                    <span>0%</span>
                    <span>+50%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle & Right Columns: Forecast Dashboard */}
          <div className="xl:col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Dashboard - Left 2 columns */}
            <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Monthly Net</p>
                    <p className={`text-2xl font-bold ${forecast.isProfitable ? 'text-emerald-400' : 'text-red-400'}`}>
                      {formatCurrency(forecast.monthlyNet)}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    forecast.isProfitable ? 'bg-emerald-600' : 'bg-red-600'
                  }`}>
                    {forecast.isProfitable ? (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Cash Runway</p>
                    <p className="text-2xl font-bold text-white">
                      {forecast.runway ? `${forecast.runway}M` : '∞'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Burn Rate</p>
                    <p className="text-2xl font-bold text-white">
                      {forecast.isProfitable ? '₹0' : formatCurrency(Math.abs(forecast.monthlyNet))}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Forecast Chart */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Cash Flow Projection</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <span className="text-sm text-gray-400">36-Month Forecast</span>
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <ForecastChart forecast={forecast} />
              </div>
            </div>

            {/* AI Insights Section */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">AI Financial Insights</h3>
                <div className="ml-auto">
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-full">
                    Powered by Gemini AI
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4">
                <AIInsights 
                  baseline={baseline}
                  scenario={scenario}
                  forecast={forecast}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => setIsSaveModalOpen(true)}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 px-6 rounded-lg font-medium hover:from-emerald-700 hover:to-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save Scenario
                </div>
              </button>

              <button 
                onClick={handleDownloadPDF}
                disabled={generatingPDF}
                className={`py-3 px-6 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all ${
                  generatingPDF
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                }`}
              >
                <div className="flex items-center justify-center">
                  {generatingPDF ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download PDF
                    </>
                  )}
                </div>
              </button>
              
              <button 
                onClick={() => setIsReportModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview Report
                </div>
              </button>
            </div>
            </div>

            {/* Right Sidebar - Financial Health */}
            <div className="lg:col-span-1">
              <FinancialHealthScore 
                baseline={baseline}
                scenario={scenario}
                forecast={forecast}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        baseline={baseline}
        scenario={scenario}
        forecast={forecast}
        scenarioCount={scenarioCount}
      />

      <SaveScenarioModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveScenario}
        baseline={baseline}
        scenario={scenario}
        forecast={forecast}
      />

      {/* AI Assistant */}
      <AIAssistant 
        baseline={baseline}
        scenario={scenario}
        forecast={forecast}
      />
      </div>
    </ProtectedRoute>
  );
}