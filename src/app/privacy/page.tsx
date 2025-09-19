'use client';

import Link from 'next/link';

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Your Privacy Matters</h2>
            <p className="text-gray-300 leading-relaxed">
              At CFO Helper, we are committed to protecting your privacy and ensuring the security of your financial data. 
              This Privacy Policy explains how we collect, use, and safeguard your information.
            </p>
          </div>

          <div className="space-y-8">
            <section className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">Information We Collect</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Account information (name, email, company details)</li>
                <li>• Financial data you input for modeling purposes</li>
                <li>• Usage analytics to improve our service</li>
                <li>• Technical information (IP address, browser type)</li>
              </ul>
            </section>

            <section className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">How We Use Your Information</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Provide and improve our financial modeling services</li>
                <li>• Generate AI-powered insights and recommendations</li>
                <li>• Communicate with you about your account and updates</li>
                <li>• Ensure platform security and prevent fraud</li>
              </ul>
            </section>

            <section className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">Data Security</h3>
              <p className="text-gray-300 mb-3">We implement industry-standard security measures:</p>
              <ul className="text-gray-300 space-y-2">
                <li>• End-to-end encryption for all financial data</li>
                <li>• Secure cloud infrastructure with regular backups</li>
                <li>• Regular security audits and vulnerability assessments</li>
                <li>• Limited access controls and employee training</li>
              </ul>
            </section>

            <section className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">Data Sharing</h3>
              <p className="text-gray-300">
                We do not sell, trade, or share your personal or financial data with third parties, 
                except as required by law or with your explicit consent. AI processing is done 
                securely without storing your data on external servers.
              </p>
            </section>

            <section className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">Your Rights</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Access and download your data at any time</li>
                <li>• Request deletion of your account and data</li>
                <li>• Opt out of non-essential communications</li>
                <li>• Request data portability to other services</li>
              </ul>
            </section>

            <section className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
              <p className="text-gray-300">
                If you have questions about this Privacy Policy or your data, contact us at:
                <br />
                <span className="text-blue-400">privacy@cfohelper.com</span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}