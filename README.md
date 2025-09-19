# CFO Helper 📊

A comprehensive financial forecasting and scenario planning SaaS platform built with Next.js, Firebase Authentication, and AI-powered insights.

## 🚀 Features

- **Financial Forecasting**: Interactive financial planning with real-time calculations
- **AI-Powered Insights**: Gemini AI integration for financial analysis and recommendations
- **Scenario Planning**: Create and compare multiple financial scenarios
- **Professional Dashboard**: Clean, dark-themed UI with comprehensive navigation
- **PDF Report Generation**: Export detailed financial reports
- **User Authentication**: Firebase Auth with Google Sign-In and email/password
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: Firebase Auth
- **AI Integration**: Google Gemini API
- **Charts**: Chart.js with React Chart.js 2
- **PDF Generation**: jsPDF with html2canvas
- **Build Tool**: Turbopack

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cfo-helper.git
   cd cfo-helper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure your environment variables in `.env.local`**
   ```env
   # Gemini AI API Key
   GEMINI_API_KEY=your_gemini_api_key_here

   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Firebase Setup

1. **Create a Firebase project** at [Firebase Console](https://console.firebase.google.com)

2. **Enable Authentication**
   - Go to Authentication → Sign-in method
   - Enable Email/Password and Google providers
   - Add your domain to authorized domains

3. **Get your Firebase config**
   - Go to Project Settings → General
   - Add a web app and copy the config values
   - Update your `.env.local` file

## 🤖 AI Features Setup

1. **Get Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create an API key
   - Add it to your `.env.local` file

## 📁 Project Structure

```
cfo-helper/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Dashboard pages
│   │   ├── api/            # API routes
│   │   └── ...
│   ├── components/         # React components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility libraries
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── public/                # Static assets
└── ...
```

## 🎯 Key Components

- **AuthContext**: Firebase authentication management
- **DashboardHeader**: Main navigation and user menu
- **AIAssistant**: AI-powered financial advisor
- **AIScenarioGenerator**: Scenario planning with AI
- **FinancialHealthScore**: Real-time financial scoring
- **ForecastChart**: Interactive financial charts
- **ReportModal**: PDF report generation

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Add environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Google Cloud Platform

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini AI API key | Yes |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase measurement ID | Optional |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Firebase](https://firebase.google.com/)
- AI features by [Google Gemini](https://deepmind.google/technologies/gemini/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you have any questions or need help, please open an issue or contact the development team.

---

**CFO Helper** - Empowering financial decision-making with AI-driven insights 🚀