'use client';

import Link from 'next/link';

export default function APIPage() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/landing" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-xl font-bold">CFO Helper</span>
            </Link>
            <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">CFO Helper API</h1>
          <p className="text-xl text-gray-300">
            Integrate AI-powered financial forecasting into your applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Enterprise API Access</h2>
            <p className="text-gray-300 mb-6">
              Embed CFO Helper&apos;s powerful financial modeling capabilities directly into your 
              existing applications and workflows.
            </p>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>• RESTful API with comprehensive documentation</li>
              <li>• Real-time financial calculations and projections</li>
              <li>• AI-powered insights and recommendations</li>
              <li>• Scenario generation and comparison</li>
              <li>• Report generation and export capabilities</li>
            </ul>
            <Link href="/contact" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
              Request API Access
            </Link>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Sample API Call</h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`POST /api/v1/forecast
{
  "baseline": {
    "cashBalance": 1000000,
    "monthlyIncome": 500000,
    "monthlyExpenses": 400000
  },
  "scenario": {
    "newHires": 5,
    "costPerHire": 50000,
    "extraSpending": 25000,
    "revenueChange": 15
  }
}`}
              </pre>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-white mb-2">Response</h4>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <pre className="text-sm text-emerald-400 overflow-x-auto">
{`{
  "forecast": {
    "monthlyNet": 325000,
    "runway": null,
    "isProfitable": true
  },
  "insights": {
    "summary": "Strong growth scenario...",
    "riskLevel": "low"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* API Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">High Performance</h3>
            <p className="text-gray-300 text-sm">Sub-second response times for all calculations</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
            <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Enterprise Security</h3>
            <p className="text-gray-300 text-sm">Bank-grade encryption and security standards</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Developer Friendly</h3>
            <p className="text-gray-300 text-sm">Comprehensive docs and SDKs available</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">API Pricing</h2>
          <p className="text-gray-300 mb-6">
            Flexible pricing based on your usage needs. Contact our sales team for custom enterprise pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
              Contact Sales
            </Link>
            <Link href="/auth/signup" className="border border-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-all">
              Try the Platform
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}