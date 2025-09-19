'use client';

import { useState } from 'react';
import { useScenarios, SavedScenario } from '@/hooks/useScenarios';
import { DashboardHeader } from '@/components/DashboardHeader';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { formatCurrency } from '@/utils/calculations';
import Link from 'next/link';

export default function ScenariosPage() {
  const { scenarios, deleteScenario, duplicateScenario, searchScenarios, getAllTags } = useScenarios();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'profitability'>('date');

  const filteredScenarios = searchScenarios(searchQuery).filter(scenario => 
    !selectedTag || scenario.tags?.includes(selectedTag)
  );

  const sortedScenarios = [...filteredScenarios].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      case 'profitability':
        return b.forecast.monthlyNet - a.forecast.monthlyNet;
      default:
        return 0;
    }
  });

  const allTags = getAllTags();

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this scenario?')) {
      deleteScenario(id);
    }
  };

  const handleDuplicate = (id: string) => {
    duplicateScenario(id);
  };

  return (
    <ProtectedRoute>
      <div className="bg-gray-900 min-h-screen text-white">
        <DashboardHeader scenarioCount={scenarios.length} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Saved Scenarios</h1>
            <p className="text-gray-400 mt-1">Manage and compare your financial scenarios</p>
          </div>
          <Link 
            href="/dashboard"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Create New Scenario
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
                Search Scenarios
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search by name or description..."
              />
            </div>

            {/* Tag Filter */}
            <div>
              <label htmlFor="tagFilter" className="block text-sm font-medium text-gray-300 mb-2">
                Filter by Tag
              </label>
              <select
                id="tagFilter"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-300 mb-2">
                Sort By
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'date' | 'profitability')}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Last Updated</option>
                <option value="name">Name</option>
                <option value="profitability">Profitability</option>
              </select>
            </div>
          </div>
        </div>

        {/* Scenarios Grid */}
        {sortedScenarios.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No scenarios found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery || selectedTag ? 'Try adjusting your filters' : 'Create your first scenario to get started'}
            </p>
            <Link 
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Scenario
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedScenarios.map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                onDelete={() => handleDelete(scenario.id)}
                onDuplicate={() => handleDuplicate(scenario.id)}
              />
            ))}
          </div>
        )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

interface ScenarioCardProps {
  scenario: SavedScenario;
  onDelete: () => void;
  onDuplicate: () => void;
}

function ScenarioCard({ scenario, onDelete, onDuplicate }: ScenarioCardProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div 
      className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Actions Menu */}
      {showActions && (
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={onDuplicate}
            className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-colors"
            title="Duplicate scenario"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            title="Delete scenario"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}

      {/* Scenario Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-1">{scenario.name}</h3>
        {scenario.description && (
          <p className="text-sm text-gray-400 mb-2">{scenario.description}</p>
        )}
        <p className="text-xs text-gray-500">
          Updated {scenario.updatedAt.toLocaleDateString()}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-400">Monthly Net</p>
          <p className={`text-sm font-medium ${scenario.forecast.isProfitable ? 'text-emerald-400' : 'text-red-400'}`}>
            {formatCurrency(scenario.forecast.monthlyNet)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Cash Runway</p>
          <p className="text-sm font-medium text-white">
            {scenario.forecast.runway ? `${scenario.forecast.runway}M` : '∞'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">New Hires</p>
          <p className="text-sm font-medium text-white">{scenario.scenario.newHires}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Revenue Change</p>
          <p className="text-sm font-medium text-white">
            {scenario.scenario.revenueChange > 0 ? '+' : ''}{scenario.scenario.revenueChange}%
          </p>
        </div>
      </div>

      {/* Tags */}
      {scenario.tags && scenario.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {scenario.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Status Indicator */}
      <div className={`flex items-center text-xs ${scenario.forecast.isProfitable ? 'text-emerald-400' : 'text-red-400'}`}>
        <div className={`w-2 h-2 rounded-full mr-2 ${scenario.forecast.isProfitable ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
        {scenario.forecast.isProfitable ? 'Profitable' : 'Burning Cash'}
      </div>
    </div>
  );
}