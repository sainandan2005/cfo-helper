'use client';

import Link from 'next/link';

export default function AboutPage() {
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
            <Link href="/auth/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">
            About CFO Helper
          </h1>
          <p className="text-xl text-gray-300">
            Empowering finance leaders with AI-driven insights and strategic forecasting
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              CFO Helper was built to democratize sophisticated financial modeling and strategic planning. 
              We believe every business leader should have access to CFO-level financial insights, 
              powered by cutting-edge AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">🎯 Our Vision</h3>
              <p className="text-gray-300">
                To become the go-to platform for financial forecasting and strategic planning, 
                making complex financial analysis accessible to businesses of all sizes.
              </p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">⚡ Our Technology</h3>
              <p className="text-gray-300">
                Built with Next.js, TypeScript, and powered by Google Gemini AI, 
                delivering enterprise-grade performance with consumer-friendly simplicity.
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Why CFO Helper?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">🤖 AI-Powered</h4>
                <p className="text-gray-300 text-sm">
                  Advanced AI provides expert-level financial insights and recommendations
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">⚡ Real-Time</h4>
                <p className="text-gray-300 text-sm">
                  Instant scenario modeling with live updates and interactive controls
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">📊 Professional</h4>
                <p className="text-gray-300 text-sm">
                  Executive-ready reports and presentations for stakeholders
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/auth/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
            Start Your Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}