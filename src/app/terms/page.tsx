'use client';

import Link from 'next/link';

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-white mb-6">Terms of Service</h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing and using CFO Helper, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </div>

          <div className="space-y-8">
            <section className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">Service Description</h3>
              <p className="text-gray-300">
                CFO Helper provides AI-powered financial forecasting and scenario modeling tools. 
                Our service includes real-time calculations, AI insights, report generation, 
                and scenario management features.
              </p>
            </section>

            <section className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">User Responsibilities</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Provide accurate and complete information</li>
                <li>• Use the service for lawful business purposes only</li>
                <li>• Maintain the security of your account credentials</li>
                <li>• Comply with all applicable laws and regulations</li>
                <li>• Not attempt to reverse engineer or hack our systems</li>
              </ul>
            </section>

            <section className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">AI and Data Accuracy</h3>
              <p className="text-gray-300">
                While our AI provides sophisticated financial insights, all recommendations 
                should be used as guidance only. Users are responsible for validating all 
                financial decisions and consulting with qualified professionals when needed.
              </p>
            </section>

            <section className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">Subscription and Billing</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Free trial period as advertised on our website</li>
                <li>• Subscription fees are billed monthly or annually</li>
                <li>• You may cancel your subscription at any time</li>
                <li>• Refunds are provided according to our refund policy</li>
              </ul>
            </section>

            <section className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">Intellectual Property</h3>
              <p className="text-gray-300">
                CFO Helper and all related technology, content, and materials are owned by us 
                or our licensors. You retain ownership of your financial data and scenarios 
                created using our platform.
              </p>
            </section>

            <section className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">Limitation of Liability</h3>
              <p className="text-gray-300">
                CFO Helper is provided "as is" without warranties. We are not liable for any 
                business decisions made based on our AI recommendations or for any indirect, 
                incidental, or consequential damages.
              </p>
            </section>

            <section className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">Contact Information</h3>
              <p className="text-gray-300">
                For questions about these Terms of Service, contact us at:
                <br />
                <span className="text-blue-400">legal@cfohelper.com</span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}