'use client';

import Link from 'next/link';

export default function HelpPage() {
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
            <Link href="/dashboard" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">
            Help & Support
          </h1>
          <p className="text-xl text-gray-300">
            Get the most out of CFO Helper with our comprehensive guides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Getting Started Guide</h3>
            <p className="text-gray-300 mb-4">Learn the basics of financial modeling with CFO Helper</p>
            <Link href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              Read Guide →
            </Link>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Features Guide</h3>
            <p className="text-gray-300 mb-4">Maximize the power of AI-driven insights and recommendations</p>
            <Link href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              Learn More →
            </Link>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Scenario Management</h3>
            <p className="text-gray-300 mb-4">Save, organize, and compare multiple financial scenarios</p>
            <Link href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              View Tutorial →
            </Link>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Report Generation</h3>
            <p className="text-gray-300 mb-4">Create professional reports for stakeholders and investors</p>
            <Link href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              Get Started →
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">How accurate are the AI insights?</h4>
              <p className="text-gray-300">Our AI is powered by Google Gemini and trained on extensive financial data. While insights are highly sophisticated, they should be used as guidance alongside your business judgment.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Can I export my scenarios?</h4>
              <p className="text-gray-300">Yes! You can generate professional PDF reports for any scenario and save scenarios locally for future reference.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Is my financial data secure?</h4>
              <p className="text-gray-300">Absolutely. All data is processed securely and we never store your financial information on our servers.</p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-4">Still need help?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
              Contact Support
            </Link>
            <Link href="/dashboard" className="border border-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all">
              Try the Platform
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}