import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { BaselineData } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { baseline, scenarioType }: {
      baseline: BaselineData;
      scenarioType: 'conservative' | 'aggressive' | 'crisis' | 'growth' | 'fundraising';
    } = await request.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const scenarioPrompts = {
      conservative: "Create a conservative financial scenario focused on preserving cash and minimizing risk. Assume slower growth, careful spending, and defensive strategies.",
      aggressive: "Create an aggressive growth scenario with bold expansion plans, increased hiring, and higher spending to capture market opportunities quickly.",
      crisis: "Create a crisis management scenario assuming a 30-40% revenue drop. Focus on cost cutting, runway extension, and survival strategies.",
      growth: "Create a balanced growth scenario with sustainable expansion, moderate hiring, and strategic investments for long-term success.",
      fundraising: "Create a fundraising scenario showing how the company would use new capital efficiently and achieve key milestones to justify the investment."
    };

    const prompt = `
You are a financial strategist creating scenario recommendations for a company with these baseline metrics:

CURRENT FINANCIAL POSITION:
- Cash Balance: ₹${baseline.cashBalance.toLocaleString()}
- Monthly Revenue: ₹${baseline.monthlyIncome.toLocaleString()}
- Monthly Operating Costs: ₹${baseline.monthlyExpenses.toLocaleString()}
- Current Monthly Net: ₹${(baseline.monthlyIncome - baseline.monthlyExpenses).toLocaleString()}

SCENARIO TYPE: ${scenarioType.toUpperCase()}
${scenarioPrompts[scenarioType]}

Please generate 3 different scenario variations for this strategy, each with:
1. A descriptive name and brief rationale
2. Recommended adjustments:
   - New hires (0-10)
   - Cost per hire (₹30,000 - ₹80,000)
   - Extra monthly spending (₹0 - ₹100,000)
   - Revenue change percentage (-50% to +50%)
3. Expected outcomes and timeline
4. Key risks and mitigation strategies
5. Success metrics to track

Format as JSON with this structure:
{
  "scenarios": [
    {
      "name": "Scenario Name",
      "description": "Brief description and rationale",
      "parameters": {
        "newHires": 2,
        "costPerHire": 50000,
        "extraSpending": 25000,
        "revenueChange": 10
      },
      "timeline": "3-6 months",
      "expectedOutcome": "What this achieves",
      "risks": ["Risk 1", "Risk 2"],
      "successMetrics": ["Metric 1", "Metric 2"]
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up the response to extract JSON
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    try {
      const scenarios = JSON.parse(text);
      return NextResponse.json(scenarios);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return NextResponse.json({
        scenarios: [
          {
            name: `${scenarioType.charAt(0).toUpperCase() + scenarioType.slice(1)} Strategy`,
            description: "AI-generated scenario based on your current financial position",
            parameters: {
              newHires: scenarioType === 'crisis' ? 0 : scenarioType === 'aggressive' ? 5 : 2,
              costPerHire: 50000,
              extraSpending: scenarioType === 'crisis' ? 0 : scenarioType === 'aggressive' ? 50000 : 20000,
              revenueChange: scenarioType === 'crisis' ? -20 : scenarioType === 'aggressive' ? 25 : 10
            },
            timeline: "3-6 months",
            expectedOutcome: `Optimized ${scenarioType} approach for your business`,
            risks: ["Market volatility", "Execution challenges"],
            successMetrics: ["Revenue growth", "Cash runway"]
          }
        ]
      });
    }
  } catch (error) {
    console.error('AI Scenarios Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate scenarios',
        scenarios: []
      },
      { status: 500 }
    );
  }
}