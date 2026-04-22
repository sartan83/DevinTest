/**
 * Intesa Sanpaolo × Devin executive briefing data.
 *
 * All figures are public-reference or illustrative modeling assumptions
 * intended to frame a strategic conversation. Nothing here should be read
 * as a commitment, benchmark, or guarantee of outcome.
 */

export type KpiCard = {
  value: string;
  label: string;
  caption?: string;
};

export type LabeledCard = {
  title: string;
  body: string;
  tag?: string;
};

export type DiscoveryPersona = "CIO" | "CTO" | "COO" | "Risk";

export type DiscoveryQuestion = {
  q: string;
  followUps: string[];
};

export type DiscoveryBlock = {
  persona: DiscoveryPersona;
  headline: string;
  questions: DiscoveryQuestion[];
};

export type CounterStep = {
  panel: number;
  addMin: number;
  addMax: number;
  note: string;
};

export const intesa = {
  brand: {
    client: "Intesa Sanpaolo",
    partner: "Devin / Cognition",
    sessionLabel: "Executive briefing — 60 minutes",
    thesis:
      "Intesa has already chosen the direction. The opportunity now is controlled execution at scale.",
  },

  // Logical index (0..8) → displayed label. 3.5 is an interstitial between 3 and 4.
  nav: [
    { index: 0, label: "1", full: "Opening" },
    { index: 1, label: "2", full: "Context" },
    { index: 2, label: "3", full: "Governance" },
    { index: 3, label: "3.5", full: "Discovery" },
    { index: 4, label: "4", full: "Where Devin fits" },
    { index: 5, label: "5", full: "Use case" },
    { index: 6, label: "6", full: "Executive value" },
    { index: 7, label: "7", full: "Reclaimed capacity" },
    { index: 8, label: "8", full: "Lighthouse" },
  ],

  counter: {
    label: "Modeled engineering capacity during this session",
    shortLabel: "Capacity this session",
    disclaimer: "Illustrative scenario based on modeled assumptions",
    unit: "developer days",
    finalRange: { min: 8, max: 18 },
    // Steps accumulate per visited panel. Sum across all steps ≈ 8–18 dev days.
    steps: [
      { panel: 1, addMin: 0.4, addMax: 0.9, note: "Framing engagement" },
      { panel: 2, addMin: 0.8, addMax: 1.6, note: "Context of execution friction" },
      { panel: 3, addMin: 1.1, addMax: 2.2, note: "Governance envelope defined" },
      { panel: 4, addMin: 1.2, addMax: 2.4, note: "Discovery signals" },
      { panel: 5, addMin: 1.4, addMax: 3.0, note: "Execution surface mapped" },
      { panel: 6, addMin: 1.6, addMax: 3.4, note: "Modernization use case" },
      { panel: 7, addMin: 0.9, addMax: 2.0, note: "Value framing" },
      { panel: 8, addMin: 0.6, addMax: 2.5, note: "Climax consolidation" },
      { panel: 9, addMin: 0.0, addMax: 0.0, note: "Lighthouse plan" },
    ] as CounterStep[],
  },

  panel1: {
    eyebrow: "Opening",
    headline:
      "Intesa has already chosen the direction.\nThe opportunity now is execution.",
    subhead:
      "Cloud, AI, and efficiency are already strategic priorities. The constraint is how fast complex engineering work can move without increasing risk.",
    kpis: [
      { value: "€9.3B", label: "Net income", caption: "FY reference" },
      { value: "64%", label: "Cloud-based applications" },
      { value: "€5.1B", label: "Investment plan" },
      { value: "€4.6B", label: "In technology & growth" },
      { value: "153", label: "AI applications in production" },
      { value: "90k+", label: "Employees" },
    ] as KpiCard[],
    ctas: [
      { label: "Start the discussion", target: 2, primary: true },
      { label: "Open lighthouse", target: 9, primary: false },
    ],
  },

  panel2: {
    eyebrow: "Transformation context",
    headline: "The strategy exists.\nExecution is the constraint.",
    body:
      "At Intesa's scale, transformation is not about direction. It is about managing execution across thousands of services, dependencies, and engineering tasks.",
    cards: [
      {
        title: "Cloud expansion",
        body: "Application estate continues to migrate. Each wave carries coupling and integration work.",
      },
      {
        title: "Digital banking scale",
        body: "Millions of daily interactions, with zero tolerance for regressions.",
      },
      {
        title: "AI adoption",
        body: "Dozens of use cases already in production — each requires maintained, well-tested code.",
      },
      {
        title: "Efficiency pressure",
        body: "Cost-to-income targets require engineering output to rise without headcount expansion.",
      },
      {
        title: "Engineering complexity",
        body: "Java / .NET / mainframe coexist with modern stacks. Dependencies compound.",
      },
    ] as LabeledCard[],
    closing: "Execution friction becomes structural.",
  },

  panel3: {
    eyebrow: "DORA-aware operating model",
    headline: "Speed must increase.\nControl cannot decrease.",
    body:
      "In a regulated environment, acceleration must operate inside governance. Devin is designed to support a DORA-aligned operating model — not to sit outside it.",
    cards: [
      {
        title: "Controlled change",
        body: "Reviewable outputs aligned to approval flows. Nothing reaches production without your gates.",
        tag: "Human-in-the-loop",
      },
      {
        title: "Traceability",
        body: "Versioned, auditable work. Every action, every diff, every decision is logged.",
        tag: "Auditability",
      },
      {
        title: "Isolated deployment",
        body: "Customer-dedicated isolated environment, single-tenant, with private connectivity (PrivateLink / IPSec).",
        tag: "Single-tenant",
      },
      {
        title: "Risk governance",
        body: "Structured third-party integration. Supports a DORA-aligned operating model across ICT risk processes.",
        tag: "Review gates",
      },
    ] as LabeledCard[],
    closing: "Devin operates within control frameworks, not outside them.",
  },

  panel35: {
    eyebrow: "Executive discovery",
    headline: "Before acceleration, clarity.",
    subhead:
      "To understand where execution is constrained, we align on a few key areas — first on your priorities, then on how Devin integrates.",
    bottomLine: "Acceleration only matters if aligned to your reality.",
    personas: [
      {
        persona: "CIO",
        headline: "Where modernization meets commitment",
        questions: [
          {
            q: "Where is your modernization effort slowing down the most?",
            followUps: [
              "Is it capacity, process, or risk?",
              "How large is the backlog today?",
              "What gets delayed first when pressure hits?",
            ],
          },
          {
            q: "How do you measure engineering output against business expectations?",
            followUps: [
              "Where do they diverge most visibly?",
              "Is the gap widening quarter over quarter?",
            ],
          },
          {
            q: "If you unlocked 30% more engineering capacity, where would it go?",
            followUps: [
              "Transformation, or clearing the backlog?",
              "What improves in the next 90 days?",
            ],
          },
        ],
      },
      {
        persona: "CTO",
        headline: "Where the backlog actually lives",
        questions: [
          {
            q: "What is the composition of your current engineering backlog?",
            followUps: [
              "Refactors, upgrades, test debt, or net-new features?",
              "Which share of it is considered unavoidable maintenance?",
            ],
          },
          {
            q: "What is your modernization cycle time today?",
            followUps: [
              "From intent to PR-ready, how long?",
              "Where does time get lost — discovery, implementation, or validation?",
            ],
          },
          {
            q: "How consistent is engineering quality across squads?",
            followUps: [
              "Which teams set the bar? Which teams would benefit most from standardization?",
            ],
          },
        ],
      },
      {
        persona: "COO",
        headline: "Where predictability breaks",
        questions: [
          {
            q: "How much visibility do you have into engineering delivery?",
            followUps: [
              "Is it real-time, weekly, quarterly?",
              "What decisions require data you do not have today?",
            ],
          },
          {
            q: "How predictable is delivery against committed dates?",
            followUps: [
              "What drives variance the most?",
              "What would a 20% predictability gain mean for the business?",
            ],
          },
          {
            q: "Where are the most visible inefficiencies in execution?",
            followUps: [
              "Rework, handoffs, environment friction?",
              "What recurs across programs?",
            ],
          },
        ],
      },
      {
        persona: "Risk",
        headline: "Where control must not bend",
        questions: [
          {
            q: "How is traceability enforced on engineering changes today?",
            followUps: [
              "From intent to deploy, where are the weakest links?",
              "Which evidence do auditors ask for most frequently?",
            ],
          },
          {
            q: "Where do audit gaps appear when velocity increases?",
            followUps: [
              "Documentation, test evidence, dependency tracking?",
              "How do they get remediated today?",
            ],
          },
          {
            q: "What concerns you most about accelerating engineering?",
            followUps: [
              "Change volume, third-party risk, or evidence volume?",
              "What would need to be true for acceleration to be approved?",
            ],
          },
        ],
      },
    ] as DiscoveryBlock[],
  },

  panel4: {
    eyebrow: "Where Devin fits",
    headline: "Where execution slows today",
    subhead:
      "Four surfaces where engineering intent is clear, but throughput is structurally constrained.",
    modules: [
      {
        title: "Modernization",
        body: "Legacy Java and .NET estates carrying the weight of digital channels. Refactors planned, rarely finished.",
        tag: "Structural",
      },
      {
        title: "Test remediation",
        body: "Coverage drifts as services evolve. Flaky suites quietly become release risks.",
        tag: "Quality",
      },
      {
        title: "Dependency upgrades",
        body: "Security patches, framework bumps, EOL migrations. High volume, low glamour, always pending.",
        tag: "Resilience",
      },
      {
        title: "Documentation",
        body: "System knowledge trapped in individuals. Auditable documentation is a constant catch-up exercise.",
        tag: "Auditability",
      },
    ] as LabeledCard[],
    closing: "Necessary work that moves too slowly.",
  },

  panel5: {
    eyebrow: "Use case",
    headline: "Controlled modernization at scale",
    scenarioTitle: "Java / .NET services powering digital channels",
    scenarioBody:
      "A representative scenario: a portfolio of customer-facing services with overlapping modernization debt, aging test suites, and overdue dependency upgrades.",
    before: {
      title: "Before",
      points: [
        "Fragmented work across squads",
        "Slow modernization cycles",
        "Outdated and flaky test suites",
        "Release windows repeatedly delayed",
      ],
    },
    after: {
      title: "With Devin",
      points: [
        "Parallel execution across services",
        "Structured, reviewable outputs",
        "Refreshed and consistent tests",
        "Release readiness reached sooner",
      ],
    },
    workflow: [
      "Task intake",
      "Breakdown",
      "Parallel work",
      "Validation",
      "Human review",
      "PR",
    ],
    closing: "Acceleration inside controlled flows.",
  },

  panel6: {
    eyebrow: "Executive value",
    headline: "Unlocking trapped capacity",
    subhead:
      "The same engineering intent, delivered with more throughput and the same — or stronger — control posture.",
    cards: [
      {
        role: "CIO",
        metric: "Throughput",
        body: "More work delivered across the same portfolio, without expanding headcount.",
      },
      {
        role: "CTO",
        metric: "Velocity",
        body: "Shorter cycles from intent to PR. Backlog composition shifts from maintenance to differentiation.",
      },
      {
        role: "COO",
        metric: "Efficiency",
        body: "Predictable delivery, lower rework, measurable reduction in structural inefficiencies.",
      },
      {
        role: "Risk",
        metric: "Control",
        body: "Auditable trail, human-in-the-loop review gates, isolated deployment footprint.",
      },
    ],
  },

  panel7: {
    eyebrow: "Reclaimed capacity",
    headlinePrefix: "During this discussion,",
    headlineSuffix: "could already be reclaimed.",
    sub: "Illustrative scenario based on modeled assumptions.",
    closing:
      "The constraint is not strategy.\nIt is execution capacity.",
  },

  panel8: {
    eyebrow: "Lighthouse",
    headline: "Start with a 30-day lighthouse",
    subhead:
      "A focused, low-risk engagement inside your governance envelope. Outcomes, not slides.",
    weeks: [
      {
        week: 1,
        title: "Scope",
        body: "Select a bounded workstream — a small portfolio of services or a modernization theme — with clear acceptance criteria.",
      },
      {
        week: 2,
        title: "First tasks",
        body: "Devin executes the first structured tasks inside the customer-dedicated environment. Every output reviewed.",
      },
      {
        week: 3,
        title: "Scale",
        body: "Parallelization across additional tasks. Throughput measured against baseline.",
      },
      {
        week: 4,
        title: "Readout",
        body: "Executive readout with KPIs, evidence, and a decision-grade recommendation on scale-up.",
      },
    ],
    kpis: [
      { value: "Cycle time", label: "Intent → PR" },
      { value: "Throughput", label: "Tasks completed / week" },
      { value: "Test coverage", label: "Delta vs. baseline" },
      { value: "Documentation", label: "Coverage vs. inventory" },
      { value: "Hours saved", label: "Illustrative, modeled" },
    ],
    ctas: [
      { label: "Simulate lighthouse", kind: "primary" as const },
      { label: "Download summary", kind: "secondary" as const },
    ],
  },
};

export type IntesaData = typeof intesa;
