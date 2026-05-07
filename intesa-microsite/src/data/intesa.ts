/**
 * Intesa Sanpaolo × Devin executive briefing data.
 *
 * All figures are public-reference or illustrative modeling assumptions
 * intended to frame a strategic conversation. Nothing here should be read
 * as a commitment, benchmark, or guarantee of outcome.
 *
 * Audience: Intesa Sanpaolo Executive Buyer (EB) — not a developer-tool demo.
 * Narrative: "Intesa is not facing a technology problem. It is facing an
 * execution scalability problem."
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

export type ExecutionGapRow = {
  ambition: string;
  reality: string;
};

export type DiscoveryBlockKey =
  | "engineering-economics"
  | "governance-security"
  | "strategic-priorities"
  | "success-criteria";

export type DiscoveryBlock = {
  key: DiscoveryBlockKey;
  label: string;
  headline: string;
  listening: string;
  questions: string[];
};

export type WalkthroughStep = {
  index: number;
  title: string;
  body: string;
};

export type BusinessOutcomeRow = {
  technical: string;
  outcome: string;
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
      "Intesa is not facing a technology problem. It is facing an execution scalability problem.",
  },

  // 12 sequential panels. The narrative arc is: position the problem, validate
  // discovery, show the work, frame trust, bridge to value, quantify, climax,
  // commit to a 4-week pilot, and close on an executive ask.
  nav: [
    { index: 0, label: "1", full: "Opening" },
    { index: 1, label: "2", full: "Execution gap" },
    { index: 2, label: "3", full: "Current state" },
    { index: 3, label: "4", full: "Executive discovery" },
    { index: 4, label: "5", full: "Business impact" },
    { index: 5, label: "6", full: "Enterprise trust" },
    { index: 6, label: "7", full: "From tasks to outcomes" },
    { index: 7, label: "8", full: "ROI signal" },
    { index: 8, label: "9", full: "Reclaimed capacity" },
    { index: 9, label: "10", full: "4-week pilot" },
    { index: 10, label: "11", full: "Mutual commitment" },
    { index: 11, label: "12", full: "Aligned to move" },
  ],

  counter: {
    label: "Modeled execution capacity reclaimed during this session",
    shortLabel: "Capacity reclaimed",
    disclaimer: "Illustrative scenario based on modeled assumptions",
    unit: "developer days",
    finalRange: { min: 8, max: 18 },
    // Steps accumulate per visited panel (1-indexed → maps to render index panel-1).
    // Sum across all 12 panels ≈ 8–18 dev days.
    steps: [
      { panel: 1, addMin: 0.4, addMax: 0.8, note: "Framing engagement" },
      { panel: 2, addMin: 0.7, addMax: 1.4, note: "Naming the execution gap" },
      { panel: 3, addMin: 0.8, addMax: 1.6, note: "Current state pressure mapped" },
      { panel: 4, addMin: 1.1, addMax: 2.2, note: "Executive discovery validated" },
      { panel: 5, addMin: 1.0, addMax: 2.0, note: "Business impact walkthrough" },
      { panel: 6, addMin: 0.6, addMax: 1.4, note: "Enterprise trust envelope" },
      { panel: 7, addMin: 0.8, addMax: 1.8, note: "Tech → business outcomes bridged" },
      { panel: 8, addMin: 1.0, addMax: 2.4, note: "ROI signal at Intesa scale" },
      { panel: 9, addMin: 0.6, addMax: 1.4, note: "Climax consolidation" },
      { panel: 10, addMin: 0.5, addMax: 1.5, note: "Pilot structure agreed" },
      { panel: 11, addMin: 0.3, addMax: 0.8, note: "Mutual commitment captured" },
      { panel: 12, addMin: 0.2, addMax: 0.7, note: "Closing alignment" },
    ] as CounterStep[],
  },

  // -------------------------------------------------------------------------
  // PANEL 1 — Opening / Hero
  // -------------------------------------------------------------------------
  panel1: {
    eyebrow: "Opening",
    headline: "Scaling Engineering Execution\nfor Intesa Sanpaolo.",
    subhead:
      "Devin helps software-intensive financial institutions accelerate modernization, reduce repetitive engineering effort, and increase delivery capacity — without linearly increasing headcount.",
    framingLine:
      "Intesa is not facing a technology problem. It is facing an execution scalability problem.",
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
      { label: "Start the discussion", target: 2, primary: true },
      { label: "Open 4-week pilot", target: 10, primary: false },
    ],
  },

  // -------------------------------------------------------------------------
  // PANEL 2 — The Execution Gap
  // -------------------------------------------------------------------------
  panel2: {
    eyebrow: "The execution gap",
    headline:
      "Strategic ambition is clear.\nThe constraint is scalable engineering execution.",
    subhead:
      "Where the published direction meets the day-to-day reality of running thousands of services, hundreds of squads, and a regulated change envelope.",
    rows: [
      {
        ambition: "Cloud and core modernization",
        reality: "Limited senior engineering bandwidth",
      },
      {
        ambition: "Faster digital delivery",
        reality: "Governance and release bottlenecks",
      },
      {
        ambition: "AI-enabled transformation",
        reality: "Fragmented engineering workflows",
      },
      {
        ambition: "Resilient banking platforms",
        reality: "Legacy dependency burden",
      },
      {
        ambition: "Regulatory readiness",
        reality: "Manual validation and documentation effort",
      },
    ] as ExecutionGapRow[],
    closing:
      "The business risk is not only slower technology delivery. It is delayed execution of board-visible transformation priorities.",
  },

  // -------------------------------------------------------------------------
  // PANEL 3 — Current State / Problem statement
  // -------------------------------------------------------------------------
  panel3: {
    eyebrow: "Current state",
    headline:
      "The cost of every quarter\nis paid in scarce senior capacity.",
    subhead:
      "The work is not invisible. It is structurally trapped — necessary, regulated, and routinely deprioritized in favor of board-visible programs.",
    cards: [
      {
        title: "Modernization backlog compounding",
        body: "Each quarter adds modernization tickets faster than the estate retires them. The compounding effect quietly extends every transformation timeline.",
        tag: "Backlog",
      },
      {
        title: "Senior engineers trapped in repetitive work",
        body: "Migration, refactoring, test remediation and dependency upgrades absorb the most experienced capacity — exactly the capacity needed for differentiation.",
        tag: "Capacity",
      },
      {
        title: "Critical initiatives compete with operational backlog",
        body: "Board-visible programs share the same teams as operational maintenance. Prioritization meetings replace delivery hours.",
        tag: "Prioritization",
      },
      {
        title: "Legacy dependency risk",
        body: "EOL frameworks, deprecated libraries, and outdated runtimes accumulate as security and resilience exposures across the estate.",
        tag: "Risk",
      },
      {
        title: "Delivery delays on digital banking priorities",
        body: "Engineering capacity constraints translate directly into slipped commitments on customer-facing digital programs.",
        tag: "Delivery",
      },
      {
        title: "Higher cost of change",
        body: "Manual validation, manual documentation, manual evidence for governance — every change costs more engineering hours than the change itself.",
        tag: "Cost",
      },
    ] as LabeledCard[],
    closing: "Execution friction is structural — and it is paid in senior capacity.",
  },

  // -------------------------------------------------------------------------
  // PANEL 4 — Executive Discovery Required
  // -------------------------------------------------------------------------
  panel4: {
    eyebrow: "Executive discovery required",
    headline:
      "To bulletproof the business case,\nthe first EB meeting must validate\nwhat the Champion alone cannot confirm.",
    transition:
      "The pilot should not be positioned as a sandbox experiment. It should be structured as a controlled entry point to broader engineering transformation.",
    blocks: [
      {
        key: "engineering-economics",
        label: "Engineering economics",
        headline: "Where engineering hours actually go.",
        listening:
          "What I'm listening for: a credible split of maintenance vs. innovation capacity, and where the estate is paying scarce senior time for repetitive execution.",
        questions: [
          "What is the current cost and effort of modernization streams?",
          "What percentage of engineering capacity is spent on maintenance vs. innovation?",
          "Where are senior engineers spending time on repetitive work?",
          "What is the internal vs. external engineering mix?",
        ],
      },
      {
        key: "governance-security",
        label: "Governance & security",
        headline: "What the control envelope must look like.",
        listening:
          "What I'm listening for: which controls are non-negotiable, which approval flows must wrap any AI-assisted execution, and what deployment topology unlocks security review.",
        questions: [
          "What are the AI policy requirements for software delivery?",
          "Is VPC, private deployment, or on-prem validation required?",
          "What level of auditability and traceability is expected?",
          "Who must approve autonomous AI workflows?",
        ],
      },
      {
        key: "strategic-priorities",
        label: "Strategic priorities",
        headline: "Where faster execution would compound.",
        listening:
          "What I'm listening for: which programs are board-visible, which are constrained by engineering capacity, and where unlocking throughput would change a quarter, not a sprint.",
        questions: [
          "Which modernization programs are most board-visible?",
          "Which initiatives are delayed due to engineering capacity constraints?",
          "Where would faster execution create the highest business impact?",
          "Which business units would benefit first?",
        ],
      },
      {
        key: "success-criteria",
        label: "Success criteria & commitment",
        headline: "What a green pilot must look like to scale.",
        listening:
          "What I'm listening for: KPIs that the EB would defend in front of the board, and the procurement / governance steps that would have to start moving before week 4.",
        questions: [
          "What KPIs would justify broader deployment?",
          "Who needs to be involved in the pilot steering committee?",
          "If value is proven, what procurement or governance steps are required?",
          "What timeline would Intesa commit to after a successful pilot?",
        ],
      },
    ] as DiscoveryBlock[],
  },

  // -------------------------------------------------------------------------
  // PANEL 5 — Devin Preview: Business Impact Walkthrough
  // -------------------------------------------------------------------------
  panel5: {
    eyebrow: "Devin preview",
    headline: "Business impact walkthrough.",
    useCase:
      "Legacy modernization and test acceleration for a strategic banking application.",
    subhead:
      "Not a feature tour. A walkthrough of how scoped engineering work moves from intent to a reviewable, auditable outcome — inside an enterprise control envelope.",
    steps: [
      {
        index: 1,
        title: "Understand the modernization scope",
        body: "Devin analyzes the repository, dependencies, deprecated libraries, test coverage, and migration risks.",
      },
      {
        index: 2,
        title: "Plan the work autonomously",
        body: "Devin creates an execution plan, identifies impacted files, and proposes a safe modernization path.",
      },
      {
        index: 3,
        title: "Execute with governance",
        body: "Devin refactors code, upgrades dependencies, adds or improves tests, and prepares a reviewable pull request.",
      },
      {
        index: 4,
        title: "Document for auditability",
        body: "Devin produces clear change rationale, testing evidence, PR documentation, and traceability for engineering and governance stakeholders.",
      },
    ] as WalkthroughStep[],
    valueStatements: [
      "This is not about replacing engineers. It is about increasing execution capacity without linearly increasing headcount.",
      "For Intesa, the value is not only faster code delivery. It is safer, more auditable modernization at enterprise scale.",
    ],
  },

  // -------------------------------------------------------------------------
  // PANEL 6 — Built for Enterprise Trust
  // -------------------------------------------------------------------------
  panel6: {
    eyebrow: "Built for enterprise trust",
    headline:
      "Acceleration that survives\nbanking governance and security review.",
    subhead:
      "The same controls a regulated bank already enforces — applied to AI-assisted engineering execution from day one.",
    pillars: [
      {
        title: "Isolated VM per Devin session",
        body: "Each session runs in a customer-dedicated, single-tenant environment. No cross-tenant data exposure.",
        tag: "Isolation",
      },
      {
        title: "Reproducible execution environment",
        body: "Pinned dependencies and versioned environments. Re-runs produce comparable, reviewable outputs.",
        tag: "Reproducibility",
      },
      {
        title: "Human approval workflow",
        body: "No production change without your gates. AI proposes; engineering and governance approve.",
        tag: "Human-in-the-loop",
      },
      {
        title: "Clear PR review process",
        body: "Every output is a reviewable pull request inside your existing review tooling — not a black-box action.",
        tag: "Reviewable",
      },
      {
        title: "Audit-friendly documentation",
        body: "Change rationale, test evidence, and decision trail captured per task, ready for audit and DORA-aligned ICT processes.",
        tag: "Auditability",
      },
      {
        title: "Enterprise security review compatibility",
        body: "Designed to be evaluated through standard third-party risk and security review processes.",
        tag: "Compatibility",
      },
      {
        title: "VPC / private deployment posture",
        body: "Supports private connectivity (PrivateLink / IPSec) and VPC-style deployment review for regulated environments.",
        tag: "Deployment",
      },
    ] as LabeledCard[],
    closing: "Trust is not added at the end. It is the operating envelope.",
  },

  // -------------------------------------------------------------------------
  // PANEL 7 — From Engineering Tasks to Business Outcomes
  // -------------------------------------------------------------------------
  panel7: {
    eyebrow: "Value bridge",
    headline:
      "From engineering tasks\nto business outcomes.",
    subhead:
      "The economic case is not built on lines of code or seats. It is built on what scarce senior capacity stops doing — and what it starts doing instead.",
    rows: [
      {
        technical: "Automated dependency analysis",
        outcome: "Faster modernization assessment",
      },
      {
        technical: "Test generation and improvement",
        outcome: "Lower delivery risk",
      },
      {
        technical: "Refactoring support",
        outcome: "Reduced manual engineering effort",
      },
      {
        technical: "PR documentation",
        outcome: "Stronger governance and auditability",
      },
      {
        technical: "Autonomous task execution",
        outcome: "More delivery capacity without proportional headcount growth",
      },
    ] as BusinessOutcomeRow[],
    closing:
      "The economic case is built on redeploying scarce senior engineering capacity from repetitive execution work to strategic transformation.",
  },

  // -------------------------------------------------------------------------
  // PANEL 8 — ROI Signal (€€€ math, separated from value bridge)
  // -------------------------------------------------------------------------
  panel8: {
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
        footnote:
          "Uplift cut from McKinsey 20–45% floor to 15%. Rollout limited to 50%.",
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
        footnote:
          "Uplift kept at the middle of McKinsey 20–45% band. Rollout at Gartner 2028 trajectory, discounted.",
      },
    ],
    headlineRange: {
      eur: "~€6–19M / year",
      devDays: "~14k–44k developer-days / year",
    },
    safetyMarginNote:
      "Safety margin applied: productivity uplift capped below the McKinsey 20–45% band; rollout factor below the Gartner 2028 trajectory; applicable-work share tied to the four surfaces defined on Panel 5.",
    sources: [
      "Gartner, Apr 2024 — 75% of enterprise software engineers will use AI code assistants by 2028, up from <10% in early 2023.",
      "McKinsey, Jun 2023 — The economic potential of generative AI: software engineering task-level productivity gain ≈ 20–45%.",
      "Intesa Sanpaolo press & Il Sole 24 Ore (Feb 2026) — 2,400+ IT hires 2022–25; ISYTECH / Isybank modernization roadmap.",
    ],
    disclaimer:
      "Illustrative model, not a commitment. Figures are scenario-level estimates intended to frame a strategic conversation.",
  },

  // -------------------------------------------------------------------------
  // PANEL 9 — Counter Climax (reveal of the session counter)
  // -------------------------------------------------------------------------
  panel9: {
    eyebrow: "Reclaimed capacity",
    headlinePrefix: "During this discussion,",
    headlineSuffix: "could already be reclaimed.",
    sub: "Illustrative scenario based on modeled assumptions.",
    closing: "The constraint is not strategy.\nIt is execution capacity.",
  },

  // -------------------------------------------------------------------------
  // PANEL 10 — 4-Week Pilot + Success Metrics
  // -------------------------------------------------------------------------
  panel10: {
    eyebrow: "4-week pilot",
    headline:
      "From controlled validation\nto a go-live decision.",
    subhead:
      "Outcomes, not slides. A bounded, governance-friendly entry point engineered to end with a decision — not another evaluation cycle.",
    weeks: [
      {
        week: 1,
        title: "Alignment & setup",
        items: [
          "Select one scoped modernization use case",
          "Confirm repository access and security requirements",
          "Define baseline metrics",
          "Align executive sponsor, engineering lead, security, and procurement stakeholders",
        ],
      },
      {
        week: 2,
        title: "First execution sprint",
        items: [
          "Devin performs repository analysis",
          "Devin executes first scoped modernization / refactoring / testing tasks",
          "Track effort, quality, and review cycle metrics",
        ],
      },
      {
        week: 3,
        title: "Expanded validation",
        items: [
          "Increase task complexity",
          "Validate repeatability across similar workstreams",
          "Review governance, auditability, and developer acceptance",
        ],
      },
      {
        week: 4,
        title: "Executive value review",
        items: [
          "Compare pilot KPIs against baseline",
          "Quantify engineering capacity unlocked",
          "Validate scale-out use cases",
          "Agree go-live roadmap and commercial next steps",
        ],
      },
    ],
    kpisTitle: "Pilot success metrics",
    kpis: [
      "Reduction in modernization cycle time",
      "Engineering hours saved or redeployed",
      "Number of reviewable PRs completed",
      "Test coverage improvement",
      "Reduction in manual QA or documentation effort",
      "Developer acceptance rate",
      "Governance and security validation completed",
      "Executive decision on scale-out timeline",
    ],
    kpiNote:
      "Vanity metrics like raw lines of code are intentionally excluded — what counts is reclaimed senior capacity and a decision-grade evidence base.",
  },

  // -------------------------------------------------------------------------
  // PANEL 11 — Mutual Commitment
  // -------------------------------------------------------------------------
  panel11: {
    eyebrow: "Mutual commitment",
    headline:
      "A successful pilot should not end\nwith another evaluation.\nIt should end with a go-live decision.",
    intesa: {
      title: "Intesa Sanpaolo commitment",
      items: [
        "Provide scoped repository access",
        "Nominate executive sponsor",
        "Assign engineering lead and security contact",
        "Confirm success metrics before pilot start",
        "Join weekly value reviews",
        "Define go-live decision process before pilot begins",
      ],
    },
    cognition: {
      title: "Cognition commitment",
      items: [
        "Support secure pilot setup",
        "Provide onboarding and best practices",
        "Track agreed KPIs",
        "Support weekly value reviews",
        "Deliver executive pilot readout",
        "Recommend scale-out roadmap after validation",
      ],
    },
  },

  // -------------------------------------------------------------------------
  // PANEL 12 — Final Executive Ask
  // -------------------------------------------------------------------------
  panel12: {
    eyebrow: "Final executive ask",
    headline: "If value is proven,\nare we aligned to move?",
    body: "If Devin validates measurable impact during the 4-week pilot, the next step should be a defined scale-out roadmap across priority modernization and engineering execution workstreams.",
    question:
      "Assuming we jointly validate measurable impact during the pilot, what would need to happen internally at Intesa Sanpaolo to support broader deployment?",
    nextSteps: [
      "Confirm executive sponsor",
      "Agree pilot success metrics",
      "Define post-pilot go-live timeline",
    ],
  },
};

export type IntesaData = typeof intesa;
