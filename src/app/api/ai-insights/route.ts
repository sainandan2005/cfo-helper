import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { BaselineData, ScenarioData, ForecastResults } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { baseline, scenario, forecast }: {
      baseline: BaselineData;
      scenario: ScenarioData;
      forecast: ForecastResults;
    } = await request.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
You are a world-class CFO and financial strategist with 20+ years of experience at Fortune 500 companies and high-growth startups. Analyze this financial scenario with the depth and expertise of a seasoned executive.

CURRENT FINANCIAL POSITION:
- Cash Balance: ₹${baseline.cashBalance.toLocaleString()}
- Monthly Revenue: ₹${baseline.monthlyIncome.toLocaleString()}
- Monthly Operating Costs: ₹${baseline.monthlyExpenses.toLocaleString()}
- Current Burn Rate: ₹${Math.abs(baseline.monthlyIncome - baseline.monthlyExpenses).toLocaleString()}/month

SCENARIO BEING MODELED:
- Team Expansion: ${scenario.newHires} new hires at ₹${scenario.costPerHire.toLocaleString()}/month each
- Additional Operational Spending: ₹${scenario.extraSpending.toLocaleString()}/month
- Revenue Impact: ${scenario.revenueChange}% ${scenario.revenueChange >= 0 ? 'growth' : 'decline'}

PROJECTED OUTCOMES:
- New Monthly Net Cash Flow: ₹${forecast.monthlyNet.toLocaleString()}
- Projected Cash Runway: ${forecast.runway ? `${forecast.runway} months` : 'Indefinite (profitable)'}
- Financial Health: ${forecast.isProfitable ? 'Profitable and growing' : 'Cash burn situation'}

MARKET CONTEXT:
- Consider current economic conditions and startup/business environment
- Factor in typical industry benchmarks and best practices
- Account for seasonal variations and market volatility

Provide a comprehensive analysis with:

1. EXECUTIVE SUMMARY (3-4 sentences): Strategic overview of the financial position and scenario impact

2. STRATEGIC INSIGHTS: Deep analysis of what this scenario reveals about the business trajectory, including:
   - Cash efficiency and unit economics implications
   - Growth vs. sustainability trade-offs
   - Competitive positioning impact

3. RISK ASSESSMENT: Detailed risk analysis including:
   - Primary financial risks and their probability
   - Market and operational risks
   - Mitigation strategies for each major risk

4. ACTIONABLE RECOMMENDATIONS: 3-4 specific, implementable actions with:
   - Immediate actions (next 30 days)
   - Medium-term strategies (3-6 months)
   - Long-term positioning (6+ months)

5. KEY PERFORMANCE INDICATORS: Metrics to track success of this scenario

6. RISK LEVEL: Assess overall risk as low/medium/high with detailed reasoning

Format as JSON with fields: summary, insights, risks, recommendations (array of objects with action, timeline, impact), kpis (array), riskLevel, riskReasoning.

Be specific, use actual numbers from the data, and provide insights that only an experienced CFO would know.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse as JSON, fallback to structured text if needed
    let insights;
    try {
      insights = JSON.parse(text);
    } catch {
      // Fallback parsing if AI doesn't return valid JSON
      insights = {
        summary: "Financial analysis completed. Review the detailed metrics for strategic planning.",
        risks: forecast.isProfitable 
          ? "Monitor growth sustainability and market conditions."
          : "Cash runway requires immediate attention. Consider cost optimization or revenue acceleration.",
        recommendations: [
          forecast.isProfitable 
            ? "Maintain current growth trajectory while building cash reserves"
            : "Implement cost reduction measures and accelerate revenue generation",
          "Regular scenario planning to anticipate market changes",
          "Establish key performance indicators for early warning systems"
        ],
        riskLevel: forecast.runway && forecast.runway < 6 ? 'high' : 
                  forecast.runway && forecast.runway < 12 ? 'medium' : 'low'
      };
    }

    return NextResponse.json(insights);
  } catch (error) {
    console.error('AI Insights Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate insights',
        summary: "Unable to generate AI insights at this time.",
        risks: "Please review financial metrics manually.",
        recommendations: ["Monitor cash flow closely", "Consider professional financial consultation"],
        riskLevel: 'medium'
      },
      { status: 500 }
    );
  }
}