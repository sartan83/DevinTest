# Devin AI Prospect Microsite Generator

An AI-powered web application that generates personalized prospect microsites for Devin AI sales enablement. Enter a company name and website URL, and the agent researches the company, identifies strategic initiatives, maps them to Devin AI value opportunities, and generates a tailored microsite with an editable ROI model.

## How It Works

```
Input → Research Agent → Cognition Proof Point Matching → Value Mapping → ROI Model → Microsite Generation
```

1. **User enters** company name, website URL, and optional fields (industry, country, revenue, employees, known initiatives, target persona)
2. **Research agent** scrapes public company information and searches Cognition/Devin public sources
3. **Value mapping agent** maps company initiatives to Devin AI value areas
4. **ROI engine** builds an editable calculator with conservative assumptions
5. **Microsite UI** renders a 9-section personalized vertical microsite

## Microsite Sections

1. **Hero** — Personalized title and subtitle
2. **Research Findings** — Company overview, strategic initiatives, and digital transformation priorities
3. **Devin Proof Points** — Relevant Cognition/Devin public use cases
4. **Value Opportunities** — Mapped Devin use cases per company initiative
5. **ROI Calculator** — Interactive, editable ROI model with charts
6. **Personalized Use Cases** — 3–5 tailored Devin use cases
7. **Executive Narrative** — CIO/CTO/CDO-ready summary
8. **Discovery Questions** — 8 tailored questions (strategic, technical, ROI)
9. **Sources & Assumptions** — Full transparency on all data

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom shadcn-style components
- **Charts**: Recharts
- **Icons**: Lucide React
- **AI**: Groq (Llama 3.3 70B) — free tier, no credit card needed
- **Multi-provider**: Also supports OpenAI GPT-4o and DeepSeek
- **Research**: Web scraping

## Prerequisites

- Node.js 20+
- npm 10+
- Groq API key (free at https://console.groq.com/keys)

## Getting Started

1. **Clone the repository**

```bash
git clone <repo-url>
cd prospect-microsite-generator
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the project root:

```env
# Default: Groq (free, no credit card needed)
LLM_PROVIDER=groq
GROQ_API_KEY=your-groq-api-key-here

# Alternative: OpenAI
# LLM_PROVIDER=openai
# OPENAI_API_KEY=your-openai-api-key-here

# Alternative: DeepSeek
# LLM_PROVIDER=deepseek
# DEEPSEEK_API_KEY=your-deepseek-api-key-here
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open in browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. Enter a company name (e.g., "Stripe") and website URL (e.g., "https://stripe.com")
2. Optionally fill in industry, country, revenue, employees, known initiatives, and target persona
3. Click "Generate Prospect Microsite"
4. Wait for the research agent to complete (typically 30-60 seconds)
5. Explore the generated microsite with all 9 sections
6. Adjust ROI assumptions using the interactive sliders
7. Export the data as JSON or share/print the microsite

## Architecture

```
src/
├── app/
│   ├── api/generate/route.ts    # SSE endpoint orchestrating the research pipeline
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main page (form + microsite viewer)
│   └── globals.css              # Global styles
├── components/
│   ├── form/
│   │   └── ProspectForm.tsx     # Input form with validation
│   ├── microsite/
│   │   ├── HeroSection.tsx      # Section 1: Hero
│   │   ├── ResearchFindings.tsx  # Section 2: Research findings
│   │   ├── ProofPoints.tsx      # Section 3: Cognition/Devin proof points
│   │   ├── ValueOpportunities.tsx # Section 4: Value opportunities
│   │   ├── ROICalculator.tsx    # Section 5: Interactive ROI calculator
│   │   ├── PersonalizedUseCases.tsx # Section 6: Personalized use cases
│   │   ├── ExecutiveNarrative.tsx # Section 7: Executive narrative
│   │   ├── DiscoveryQuestions.tsx # Section 8: Discovery questions
│   │   ├── SourcesAssumptions.tsx # Section 9: Sources and assumptions
│   │   ├── MicrositeNav.tsx     # Sticky navigation
│   │   └── LoadingState.tsx     # Loading progress UI
│   └── ui/
│       ├── button.tsx           # Button component
│       ├── card.tsx             # Card components
│       ├── input.tsx            # Input component
│       └── badge.tsx            # Badge component
└── lib/
    ├── types.ts                 # TypeScript interfaces
    ├── utils.ts                 # Utility functions
    ├── research-agent.ts        # Research & generation logic
    └── roi-engine.ts            # ROI calculation engine
```

## Key Design Decisions

- **Server-Sent Events (SSE)** for real-time progress updates during generation
- **Conservative ROI defaults** to maintain credibility
- **Source-backed claims** — every insight links back to a source
- **No hallucination policy** — the agent explicitly says when information is unavailable
- **Editable assumptions** — all ROI inputs are adjustable with live recalculation
- **Mobile-first responsive design** — works on smartphone, tablet, and desktop

## License

MIT
