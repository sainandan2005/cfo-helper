import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { BaselineData, ScenarioData, ForecastResults } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { baseline, scenario, forecast, question }: {
      baseline: BaselineData;
      scenario: ScenarioData;
      forecast: ForecastResults;
      question: string;
    } = await request.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
You are a world-class CFO and financial advisor with 20+ years of experience helping companies optimize their financial performance. You have deep expertise in:
- Cash flow management and runway optimization
- Fundraising strategies and investor relations  
- Financial modeling and scenario planning
- Risk assessment and mitigation
- Strategic financial decision making
- Market analysis and competitive positioning

CURRENT FINANCIAL SITUATION:
- Cash Balance: ₹${baseline.cashBalance.toLocaleString()}
- Monthly Revenue: ₹${baseline.monthlyIncome.toLocaleString()}
- Monthly Operating Costs: ₹${baseline.monthlyExpenses.toLocaleString()}

SCENARIO BEING ANALYZED:
- Team Expansion: ${scenario.newHires} new hires at ₹${scenario.costPerHire.toLocaleString()}/month each
- Additional Monthly Spending: ₹${scenario.extraSpending.toLocaleString()}
- Revenue Impact: ${scenario.revenueChange}% change

CURRENT FORECAST:
- Monthly Net Cash Flow: ₹${forecast.monthlyNet.toLocaleString()}
- Cash Runway: ${forecast.runway ? `${forecast.runway} months` : 'Indefinite (profitable)'}
- Financial Status: ${forecast.isProfitable ? 'Profitable' : 'Burning cash'}

USER QUESTION: "${question}"

Please provide a comprehensive, actionable response that:
1. Directly answers their specific question
2. Provides strategic context and implications
3. Offers 2-3 specific, actionable recommendations
4. Identifies potential risks and opportunities
5. Suggests next steps or follow-up actions

Be conversational but professional. Use specific numbers from their data. Think like a trusted advisor who deeply understands their business.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const advice = response.text();

    return NextResponse.json({ advice });
  } catch (error) {
    console.error('AI Advisor Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get AI advice',
        advice: "I'm having trouble analyzing your situation right now. Please try again in a moment, or feel free to ask a more specific question about your financial scenario."
      },
      { status: 500 }
    );
  }
}