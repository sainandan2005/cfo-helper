import jsPDF from 'jspdf';
import { BaselineData, ScenarioData, ForecastResults } from '@/types';
import { formatCurrency } from './calculations';

export async function generatePDFReport(
  baseline: BaselineData,
  scenario: ScenarioData,
  forecast: ForecastResults,
  scenarioCount: number,
  aiInsights?: {
    summary: string;
    risks: string;
    recommendations: string[];
    riskLevel: 'low' | 'medium' | 'high';
  }
) {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Helper function to add text with word wrapping
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 12) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * fontSize * 0.4);
  };

  // Header
  pdf.setFillColor(31, 41, 55); // bg-gray-800
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('CFO Helper - Executive Financial Report', 20, 25);
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 35);

  yPosition = 60;

  // Report Summary Box
  pdf.setFillColor(59, 130, 246); // bg-blue-600
  pdf.rect(20, yPosition - 5, pageWidth - 40, 25, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Executive Summary', 25, yPosition + 5);
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Scenarios Analyzed: ${scenarioCount}`, 25, yPosition + 15);

  yPosition += 40;

  // Reset text color for content
  pdf.setTextColor(0, 0, 0);

  // Baseline Financial Data
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Baseline Financial Data', 20, yPosition);
  yPosition += 15;

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Initial Cash Balance: ${formatCurrency(baseline.cashBalance)}`, 25, yPosition);
  yPosition += 8;
  pdf.text(`Monthly Revenue: ${formatCurrency(baseline.monthlyIncome)}`, 25, yPosition);
  yPosition += 8;
  pdf.text(`Monthly Operating Costs: ${formatCurrency(baseline.monthlyExpenses)}`, 25, yPosition);
  yPosition += 20;

  // Scenario Adjustments
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Scenario Adjustments', 20, yPosition);
  yPosition += 15;

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Team Expansion: ${scenario.newHires} new hires`, 25, yPosition);
  yPosition += 8;
  pdf.text(`Cost per Hire: ${formatCurrency(scenario.costPerHire)} per month`, 25, yPosition);
  yPosition += 8;
  pdf.text(`Additional Monthly Spending: ${formatCurrency(scenario.extraSpending)}`, 25, yPosition);
  yPosition += 8;
  pdf.text(`Revenue Change: ${scenario.revenueChange > 0 ? '+' : ''}${scenario.revenueChange}%`, 25, yPosition);
  yPosition += 20;

  // Financial Forecast
  pdf.setFillColor(forecast.isProfitable ? 34 : 239, forecast.isProfitable ? 197 : 68, forecast.isProfitable ? 94 : 68);
  pdf.rect(20, yPosition - 5, pageWidth - 40, 30, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Financial Forecast Results', 25, yPosition + 8);
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  if (forecast.isProfitable) {
    pdf.text(`✓ PROFITABLE: Monthly net profit of ${formatCurrency(forecast.monthlyNet)}`, 25, yPosition + 20);
  } else {
    pdf.text(`⚠ CASH BURN: ${forecast.runway} months runway, burning ${formatCurrency(Math.abs(forecast.monthlyNet))} per month`, 25, yPosition + 20);
  }

  yPosition += 50;

  // Key Metrics Table
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Key Financial Metrics', 20, yPosition);
  yPosition += 15;

  // Table headers
  pdf.setFillColor(243, 244, 246); // bg-gray-100
  pdf.rect(20, yPosition - 5, pageWidth - 40, 12, 'F');
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Metric', 25, yPosition + 3);
  pdf.text('Value', 120, yPosition + 3);
  yPosition += 15;

  // Table rows
  pdf.setFont('helvetica', 'normal');
  const metrics = [
    ['Monthly Net Cash Flow', formatCurrency(forecast.monthlyNet)],
    ['Cash Runway', forecast.runway ? `${forecast.runway} months` : 'Indefinite (Profitable)'],
    ['Monthly Burn Rate', forecast.isProfitable ? '₹0' : formatCurrency(Math.abs(forecast.monthlyNet))],
    ['Financial Status', forecast.isProfitable ? 'Profitable' : 'Burning Cash']
  ];

  metrics.forEach((metric, index) => {
    if (index % 2 === 0) {
      pdf.setFillColor(249, 250, 251); // bg-gray-50
      pdf.rect(20, yPosition - 3, pageWidth - 40, 10, 'F');
    }
    pdf.text(metric[0], 25, yPosition + 3);
    pdf.text(metric[1], 120, yPosition + 3);
    yPosition += 12;
  });

  yPosition += 10;

  // AI Insights (if available)
  if (aiInsights) {
    // Check if we need a new page
    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('AI Financial Insights', 20, yPosition);
    yPosition += 15;

    // Risk Level Badge
    const riskColors = {
      low: [34, 197, 94],
      medium: [251, 191, 36],
      high: [239, 68, 68]
    };
    const [r, g, b] = riskColors[aiInsights.riskLevel];
    pdf.setFillColor(r, g, b);
    pdf.rect(20, yPosition - 5, 60, 12, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`RISK: ${aiInsights.riskLevel.toUpperCase()}`, 25, yPosition + 2);
    
    yPosition += 20;
    pdf.setTextColor(0, 0, 0);

    // Executive Summary
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Executive Summary:', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(aiInsights.summary, 20, yPosition, pageWidth - 40, 11);
    yPosition += 10;

    // Risk Assessment
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Risk Assessment:', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(aiInsights.risks, 20, yPosition, pageWidth - 40, 11);
    yPosition += 10;

    // Recommendations
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Strategic Recommendations:', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    aiInsights.recommendations.forEach((rec, index) => {
      yPosition = addText(`${index + 1}. ${rec}`, 25, yPosition, pageWidth - 50, 11);
      yPosition += 5;
    });
  }

  // Footer
  const footerY = pageHeight - 20;
  pdf.setFillColor(31, 41, 55);
  pdf.rect(0, footerY - 10, pageWidth, 30, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Generated by CFO Helper - AI-Powered Financial Forecasting Platform', 20, footerY);
  pdf.text(`Report ID: CFO-${Date.now()}`, 20, footerY + 8);

  // Save the PDF
  const fileName = `CFO-Helper-Report-${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
}