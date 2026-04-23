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
  /** Short source/year marker (e.g. "ISP Piano 2026–29"). */
  caption?: string;
  /** Marks figures that are estimates rather than officially published. */
  estimated?: boolean;
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

  // Logical index (0..9) → displayed label. 3.5 (Discovery) and 6.5 (ROI signal)
  // are interstitials that reshape the narrative arc without breaking the 1–8 spine.
  nav: [
    { index: 0, label: "1", full: "Opening" },
    { index: 1, label: "2", full: "Context" },
    { index: 2, label: "3", full: "Governance" },
    { index: 3, label: "3.5", full: "Discovery" },
    { index: 4, label: "4", full: "Where Devin fits" },
    { index: 5, label: "5", full: "Use case" },
    { index: 6, label: "6", full: "Executive value" },
    { index: 7, label: "6.5", full: "ROI signal" },
    { index: 8, label: "7", full: "Reclaimed capacity" },
    { index: 9, label: "8", full: "Lighthouse" },
  ],

  counter: {
    label: "Modeled engineering capacity during this session",
    shortLabel: "Capacity this session",
    disclaimer: "Illustrative scenario based on modeled assumptions",
    unit: "developer days",
    finalRange: { min: 8, max: 18 },
    // Steps accumulate per visited panel (1-indexed → maps to render index panel-1).
    // Sum across all steps ≈ 8–18 dev days.
    steps: [
      { panel: 1, addMin: 0.4, addMax: 0.9, note: "Framing engagement" },
      { panel: 2, addMin: 0.8, addMax: 1.6, note: "Context of execution friction" },
      { panel: 3, addMin: 1.1, addMax: 2.2, note: "Governance envelope defined" },
      { panel: 4, addMin: 1.2, addMax: 2.4, note: "Discovery signals" },
      { panel: 5, addMin: 1.4, addMax: 3.0, note: "Execution surface mapped" },
      { panel: 6, addMin: 1.6, addMax: 3.4, note: "Modernization use case" },
      { panel: 7, addMin: 0.7, addMax: 1.5, note: "Value framing" },
      { panel: 8, addMin: 0.5, addMax: 1.5, note: "ROI signal at Intesa scale" },
      { panel: 9, addMin: 0.3, addMax: 1.5, note: "Climax consolidation" },
      { panel: 10, addMin: 0.0, addMax: 0.0, note: "Lighthouse plan" },
    ] as CounterStep[],
  },

  panel1: {
    eyebrow: "Opening",
    headline:
      "Intesa has already chosen the direction.\nThe opportunity now is execution.",
    subhead:
      "The tech transformation is already funded, staffed, and underway. The constraint is how fast engineering can keep moving at this scale — without bending governance.",
    kpis: [
      {
        value: "€5.6B",
        label: "Invested in tech 2022–2025",
        caption: "ISP · Il Sole 24 Ore, Feb 2026",
      },
      {
        value: "2,400+",
        label: "IT specialists hired 2022–2025",
        caption: "ISP · Il Sole 24 Ore, Feb 2026",
      },
      {
        value: "64%",
        label: "Applications cloud-based (end 2025)",
        caption: "From 10% in 2021 · ISP, Feb 2026",
      },
      {
        value: "ISYTECH",
        label: "Proprietary cloud-native core banking",
        caption: "Google · TIM · Thought Machine",
      },
      {
        value: "~3,300",
        label: "Developers & IT engineers",
        caption: "Triangulated: ISP press, Revelio Labs workforce data",
        estimated: true,
      },
      {
        value: "~100%",
        label: "Cloud-native apps target by 2029",
        caption: "Piano di Impresa 2026–2029",
      },
    ] as KpiCard[],
    sourcesLine:
      "Sources: Intesa Sanpaolo investor materials & press (2022–2026) · Proverbio interview, Il Sole 24 Ore, Feb 2026 · Piano di Impresa 2026–2029 · Revelio Labs workforce intelligence (Sep 2025)",
    ctas: [
      // `target` is 1-indexed into the rendered panel array. Panel8Lighthouse
      // sits at render index 9 (10th panel) once Discovery (3.5) and ROI
      // signal (6.5) are inserted.
      { label: "Start the discussion", target: 2, primary: true },
      { label: "Open lighthouse", target: 10, primary: false },
    ],
  },

  panel65: {
    eyebrow: "ROI signal — annualized, at Intesa scale",
    headline: "Even with a safety margin,\nthe math is disruptive.",
    subhead:
      "If ~1 in 3 engineering hours is modernization-shaped, the compounding effect on a ~3,300-developer estate is measured in tens of €M per year — not seats or licenses.",
    formula:
      "Developers × Applicable work share × Productivity uplift × Adoption factor = Reclaimed capacity / year",
    baseline: {
      devs: 3300,
      devsLabel: "~3,300 developers (est.)",
      workingDaysPerYear: 220,
      fullyLoadedCostEur: 95000,
      fullyLoadedCostLabel: "~€95k / developer-year (blended fully-loaded)",
    },
    scenarios: [
      {
        key: "conservative",
        title: "Conservative",
        subtitle: "Year-1 ramp, heavy safety margin",
        applicableWorkPct: 25,
        upliftPct: 15,
        adoptionPct: 50,
        reclaimedDevDays: "~13,600",
        reclaimedEur: "~€5.9M",
        footnote: "Uplift cut from McKinsey 20–45% floor to 15%. Rollout limited to 50%.",
      },
      {
        key: "realistic",
        title: "Realistic",
        subtitle: "Steady-state, mature adoption",
        applicableWorkPct: 30,
        upliftPct: 25,
        adoptionPct: 80,
        reclaimedDevDays: "~43,500",
        reclaimedEur: "~€18.8M",
        footnote: "Uplift kept at the middle of McKinsey 20–45% band. Rollout at Gartner 2028 trajectory, discounted.",
      },
    ],
    headlineRange: {
      eur: "~€6–19M / year",
      devDays: "~14k–44k developer-days / year",
    },
    safetyMarginNote:
      "Safety margin applied: productivity uplift capped below the McKinsey 20–45% band; rollout factor below the Gartner 2028 trajectory; applicable-work share tied to the four surfaces defined on Panel 6.",
    sources: [
      "Gartner, Apr 2024 — 75% of enterprise software engineers will use AI code assistants by 2028, up from <10% in early 2023.",
      "McKinsey, Jun 2023 — The economic potential of generative AI: software engineering task-level productivity gain ≈ 20–45%.",
      "Intesa Sanpaolo press & Il Sole 24 Ore (Feb 2026) — 2,400+ IT hires 2022–25; ISYTECH / Isybank modernization roadmap.",
    ],
    disclaimer:
      "Illustrative model, not a commitment. Figures are scenario-level estimates intended to frame a strategic conversation.",
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
    eyebrow: "Executive discovery · first 20 minutes",
    headline: "Before acceleration, clarity.",
    subhead:
      "Four angles, two questions each. The aim is to pressure-test alignment, not to pitch. Start broad, then zoom into where reality bends.",
    framingNote:
      "How I would open a Tier-1 engagement — stakeholder-by-stakeholder, with questions that force specificity.",
    bottomLine: "Acceleration only matters if aligned to your reality.",
    personas: [
      {
        persona: "CIO",
        headline: "Where announced direction meets actual pace",
        questions: [
          {
            q: "Where is the gap widest between your announced cloud/AI direction and the pace teams can actually execute?",
            followUps: [
              "Is the rate-limiting step hiring, platform readiness, or governance?",
            ],
          },
          {
            q: "Of the engineering capacity you have today, how much compounds vs. keeps the lights on?",
            followUps: [
              "What would move that ratio by 10 points in 90 days?",
            ],
          },
        ],
      },
      {
        persona: "CTO",
        headline: "Where the backlog actually lives",
        questions: [
          {
            q: "If we sampled 100 open engineering tickets across the estate, what share is modernization, upgrades, test debt, docs?",
            followUps: [
              "Which of those categories has the clearest ROI per engineer-hour?",
            ],
          },
          {
            q: "How long is an intent → PR-ready cycle for a typical modernization task today?",
            followUps: [
              "Where in that cycle does time leak — discovery, implementation, or review?",
            ],
          },
        ],
      },
      {
        persona: "COO",
        headline: "Where predictability breaks",
        questions: [
          {
            q: "What share of quarterly engineering commitments lands on the committed date?",
            followUps: [
              "When they slip, is it scope, capacity, or integration risk?",
            ],
          },
          {
            q: "Where do you lack the data to challenge engineering estimates in real time?",
            followUps: [
              "What decision would a live delivery signal unlock?",
            ],
          },
        ],
      },
      {
        persona: "Risk",
        headline: "Where control must not bend",
        questions: [
          {
            q: "Which evidence do auditors ask for most often, and how long does engineering take to produce it?",
            followUps: [
              "If change volume doubled, which of those controls would bend first?",
            ],
          },
          {
            q: "What would need to be true for a 2× increase in change volume to be approved?",
            followUps: [
              "Is the blocker policy, tooling, or evidence?",
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
