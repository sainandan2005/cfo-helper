'use client';

import { useState } from 'react';
import { BaselineData, ScenarioData, ForecastResults } from '@/types';

interface SaveScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description?: string, tags?: string[]) => void;
  baseline: BaselineData;
  scenario: ScenarioData;
  forecast: ForecastResults;
}

export function SaveScenarioModal({ 
  isOpen, 
  onClose, 
  onSave, 
  baseline, 
  scenario, 
  forecast 
}: SaveScenarioModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    try {
      await onSave(name.trim(), description.trim() || undefined, tags);
      // Reset form
      setName('');
      setDescription('');
      setTags([]);
      setTagInput('');
      onClose();
    } catch (error) {
      console.error('Failed to save scenario:', error);
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-lg w-full border border-gray-700">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Save Scenario</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Scenario Name */}
            <div>
              <label htmlFor="scenarioName" className="block text-sm font-medium text-gray-300 mb-2">
                Scenario Name *
              </label>
              <input
                type="text"
                id="scenarioName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Q2 Expansion Plan"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Optional description of this scenario..."
              />
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-200 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add tags (e.g., expansion, conservative)"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Scenario Summary */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Scenario Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-gray-400">Cash Balance</p>
                  <p className="text-white font-medium">₹{baseline.cashBalance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Monthly Net</p>
                  <p className={`font-medium ${forecast.isProfitable ? 'text-emerald-400' : 'text-red-400'}`}>
                    ₹{forecast.monthlyNet.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">New Hires</p>
                  <p className="text-white font-medium">{scenario.newHires}</p>
                </div>
                <div>
                  <p className="text-gray-400">Revenue Change</p>
                  <p className="text-white font-medium">{scenario.revenueChange > 0 ? '+' : ''}{scenario.revenueChange}%</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!name.trim() || saving}
                className={`flex-1 px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  !name.trim() || saving
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {saving ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  'Save Scenario'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}