'use client';

import { useState } from 'react';
import { BaselineData, ScenarioData } from '@/types';

interface GeneratedScenario {
  name: string;
  description: string;
  parameters: {
    newHires: number;
    costPerHire: number;
    extraSpending: number;
    revenueChange: number;
  };
  timeline: string;
  expectedOutcome: string;
  risks: string[];
  successMetrics: string[];
}

interface AIScenarioGeneratorProps {
  baseline: BaselineData;
  onApplyScenario: (scenario: ScenarioData) => void;
}

export function AIScenarioGenerator({ baseline, onApplyScenario }: AIScenarioGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scenarios, setScenarios] = useState<GeneratedScenario[]>([]);
  const [selectedType, setSelectedType] = useState<'conservative' | 'aggressive' | 'crisis' | 'growth' | 'fundraising'>('growth');

  const scenarioTypes = {
    conservative: {
      name: 'Conservative Strategy',
      description: 'Focus on preserving cash and minimizing risk',
      icon: '🛡️'
    },
    aggressive: {
      name: 'Aggressive Growth',
      description: 'Bold expansion with higher risk/reward',
      icon: '🚀'
    },
    crisis: {
      name: 'Crisis Management',
      description: 'Survival mode with cost cutting',
      icon: '⚠️'
    },
    growth: {
      name: 'Balanced Growth',
      description: 'Sustainable expansion strategy',
      icon: '📈'
    },
    fundraising: {
      name: 'Fundraising Ready',
      description: 'Optimize for investor appeal',
      icon: '💰'
    }
  };

  const generateScenarios = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai-scenarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          baseline,
          scenarioType: selectedType
        }),
      });

      const data = await response.json();
      setScenarios(data.scenarios || []);
    } catch (error) {
      console.error('Failed to generate scenarios:', error);
      setScenarios([]);
    } finally {
      setLoading(false);
    }
  };

  const applyScenario = (scenario: GeneratedScenario) => {
    onApplyScenario({
      newHires: scenario.parameters.newHires,
      costPerHire: scenario.parameters.costPerHire,
      extraSpending: scenario.parameters.extraSpending,
      revenueChange: scenario.parameters.revenueChange
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
      >
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          AI Scenarios
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">AI Scenario Generator</h2>
                  <p className="text-gray-400 mt-1">Let AI create optimized financial scenarios for your business</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Scenario Type Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Choose Strategy Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {Object.entries(scenarioTypes).map(([key, type]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedType(key as any)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedType === key
                          ? 'border-purple-500 bg-purple-600/20'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <h4 className="text-sm font-medium text-white">{type.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <div className="mb-6">
                <button
                  onClick={generateScenarios}
                  disabled={loading}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                    loading
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      AI is generating scenarios...
                    </div>
                  ) : (
                    `Generate ${scenarioTypes[selectedType].name} Scenarios`
                  )}
                </button>
              </div>

              {/* Generated Scenarios */}
              {scenarios.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Generated Scenarios</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {scenarios.map((scenario, index) => (
                      <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                        <h4 className="text-white font-semibold mb-2">{scenario.name}</h4>
                        <p className="text-gray-300 text-sm mb-4">{scenario.description}</p>
                        
                        {/* Parameters */}
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">New Hires:</span>
                            <span className="text-white">{scenario.parameters.newHires}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Cost/Hire:</span>
                            <span className="text-white">₹{scenario.parameters.costPerHire.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Extra Spend:</span>
                            <span className="text-white">₹{scenario.parameters.extraSpending.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Revenue Change:</span>
                            <span className="text-white">{scenario.parameters.revenueChange > 0 ? '+' : ''}{scenario.parameters.revenueChange}%</span>
                          </div>
                        </div>

                        {/* Timeline & Outcome */}
                        <div className="mb-4">
                          <p className="text-xs text-gray-400 mb-1">Timeline: {scenario.timeline}</p>
                          <p className="text-xs text-gray-300">{scenario.expectedOutcome}</p>
                        </div>

                        {/* Risks */}
                        {scenario.risks && scenario.risks.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs text-gray-400 mb-1">Key Risks:</p>
                            <ul className="text-xs text-gray-300 space-y-1">
                              {scenario.risks.slice(0, 2).map((risk, i) => (
                                <li key={i}>• {risk}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Apply Button */}
                        <button
                          onClick={() => applyScenario(scenario)}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Apply This Scenario
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!loading && scenarios.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <p className="text-gray-400">Select a strategy type and click generate to see AI-powered scenarios</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}