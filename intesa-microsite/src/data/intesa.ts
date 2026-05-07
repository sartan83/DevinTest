/**
 * Intesa Sanpaolo × Devin executive briefing data.
 *
 * All figures are public-reference or illustrative modeling assumptions
 * intended to frame a strategic conversation. Nothing here should be read
 * as a commitment, benchmark, or guarantee of outcome.
 *
 * Audience: Intesa Sanpaolo executive leadership — not a developer-tool demo.
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

/** Status of a current-state observation. */
export type ObservationStatus = "validated" | "hypothesis" | "alignment";

export type CurrentStateObservation = {
  title: string;
  body: string;
  status: ObservationStatus;
};

export type DiscoveryGap = {
  question: string;
  /** Why this question matters at executive level — short subtext. */
  why: string;
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

export type ItauKpi = {
  title: string;
  metric: string;
  description: string;
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

  // 13 sequential main panels. The narrative arc is: position the problem,
  // validate discovery, show the work, frame trust, bridge to value, quantify,
  // anchor on a credible enterprise reference, climax, commit to a 4-week
  // pilot, and close on an executive ask.
  // Index 0–12 are the main executive flow. Index 13 is the appendix
  // ("Discovery framework") — reachable only via the discrete appendix
  // toggle, hidden from the progress dots.
  nav: [
    { index: 0, label: "1", full: "Opening", appendix: false },
    { index: 1, label: "2", full: "Execution gap", appendix: false },
    { index: 2, label: "3", full: "Current state assessment", appendix: false },
    { index: 3, label: "4", full: "Discovery alignment", appendix: false },
    { index: 4, label: "5", full: "Modernization demo", appendix: false },
    { index: 5, label: "6", full: "Live workflow preview", appendix: false },
    { index: 6, label: "7", full: "Enterprise trust", appendix: false },
    { index: 7, label: "8", full: "Capacity redeployment", appendix: false },
    { index: 8, label: "9", full: "ROI signal", appendix: false },
    { index: 9, label: "10", full: "Enterprise reference", appendix: false },
    { index: 10, label: "11", full: "Reclaimed capacity", appendix: false },
    { index: 11, label: "12", full: "4-week pilot", appendix: false },
    { index: 12, label: "13", full: "Mutual commitment", appendix: false },
    { index: 13, label: "14", full: "Aligned to move", appendix: false },
    { index: 14, label: "A", full: "Discovery framework (appendix)", appendix: true },
  ] as { index: number; label: string; full: string; appendix: boolean }[],

  counter: {
    label: "Modeled execution capacity reclaimed during this session",
    shortLabel: "Capacity reclaimed",
    disclaimer: "Illustrative scenario based on modeled assumptions",
    unit: "developer days",
    finalRange: { min: 8, max: 18 },
    // Hours-per-developer-day used to translate the dev-day counter into
    // "engineering hours" for the executive-translation layer on the
    // climax panel. 8h/day is the standard banking baseline used by P8 too.
    hoursPerDay: 8,
    // Used to translate "reclaimed engineering hours" into a developer-FTE
    // equivalent across an annualized window for executive readability.
    // 220 working days/year * 8h/day = 1,760 hours/FTE-year (matches P8 baseline).
    hoursPerFteYear: 1760,
    // Annual scale-out factor: "during this session" capacity, projected to
    // a steady-state annualized program. Used only as the executive
    // translation context ("this session captured X dev days; scaled across a
    // modernization program, that maps to ~Y FTE-equivalents per year").
    annualizedFteProjectionFactor: 220, // dev-days/year per FTE
    framing:
      "Large-scale modernization programs often consume thousands of hours of repetitive engineering execution.",
    interpretation:
      "The strategic value is not reducing engineering teams. It is increasing transformation throughput without proportionally increasing delivery capacity.",
    devEquivalentFootnote:
      "Developer-equivalent figures are illustrative operational capacity models based on representative engineering allocation assumptions — not headcount targets.",
    // Steps accumulate per visited panel (1-indexed → maps to render index panel-1).
    // Sum across all 14 panels ≈ 8–18 dev days. Panel 6 is the new
    // "Live workflow preview" inserted between the demo and trust panels.
    steps: [
      { panel: 1, addMin: 0.4, addMax: 0.8, note: "Framing engagement" },
      { panel: 2, addMin: 0.5, addMax: 1.1, note: "Naming the execution gap" },
      { panel: 3, addMin: 0.6, addMax: 1.3, note: "Current state pressure mapped" },
      { panel: 4, addMin: 0.9, addMax: 1.7, note: "Discovery alignment validated" },
      { panel: 5, addMin: 0.7, addMax: 1.5, note: "Modernization walkthrough" },
      { panel: 6, addMin: 0.6, addMax: 1.3, note: "Live workflow preview" },
      { panel: 7, addMin: 0.5, addMax: 1.1, note: "Enterprise trust envelope" },
      { panel: 8, addMin: 0.7, addMax: 1.5, note: "Capacity redeployment framed" },
      { panel: 9, addMin: 0.8, addMax: 1.8, note: "ROI signal at Intesa scale" },
      { panel: 10, addMin: 0.6, addMax: 1.3, note: "Enterprise reference anchored" },
      { panel: 11, addMin: 0.5, addMax: 1.2, note: "Climax consolidation" },
      { panel: 12, addMin: 0.4, addMax: 0.9, note: "Pilot structure agreed" },
      { panel: 13, addMin: 0.3, addMax: 0.6, note: "Mutual commitment captured" },
      { panel: 14, addMin: 0.2, addMax: 0.5, note: "Closing alignment" },
    ] as CounterStep[],
  },

  // -------------------------------------------------------------------------
  // PANEL 1 — Opening / Hero
  // -------------------------------------------------------------------------
  panel1: {
    eyebrow: "Opening",
    headline: "Scaling Engineering Execution\nfor Intesa Sanpaolo.",
    subhead:
      "Modernization leverage at enterprise scale — without proportional headcount growth.",
    framingLine:
      "Intesa is not facing a technology problem. It is facing an execution scalability problem.",
    kpis: [
      {
        value: "€5.6B",
        label: "Invested in tech 2022–2025",
      },
      {
        value: "2,400+",
        label: "IT specialists hired 2022–2025",
      },
      {
        value: "64%",
        label: "Applications cloud-based (end 2025)",
      },
      {
        value: "~3,300",
        label: "Developers & IT engineers",
        estimated: true,
      },
    ] as KpiCard[],
    sourcesLine:
      "Sources: ISP investor materials & press (2022–2026) · Piano di Impresa 2026–2029 · Revelio Labs workforce data",
    ctas: [
      { label: "Start the discussion", target: 2, primary: true },
      { label: "Open 4-week pilot", target: 11, primary: false },
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
      "Where published direction meets day-to-day delivery inside a regulated change envelope.",
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
        ambition: "AI-assisted execution",
        reality: "Fragmented engineering workflows",
      },
      {
        ambition: "Resilient banking platforms",
        reality: "Legacy dependency burden",
      },
    ] as ExecutionGapRow[],
    closing:
      "Delayed execution of board-visible transformation priorities.",
  },

  // -------------------------------------------------------------------------
  // PANEL 3 — Current State Assessment
  //
  // Surfaces likely modernization pressure points using patterns commonly
  // observed across large financial institutions. Each item is tagged so
  // executives see what is already validated, what is still a hypothesis,
  // and what needs alignment — never assumed.
  // -------------------------------------------------------------------------
  panel3: {
    eyebrow: "Current state assessment",
    headline:
      "What has been observed so far\n— and what still requires executive alignment.",
    subhead:
      "Patterns commonly seen across large financial institutions — surfaced as observations, hypotheses, and alignment areas. Never assumed.",
    legend: [
      {
        status: "validated" as ObservationStatus,
        label: "Validated observation",
        helper: "Confirmed in pre-meeting discovery and triangulated against public material.",
      },
      {
        status: "hypothesis" as ObservationStatus,
        label: "Hypothesis to confirm",
        helper: "Pattern likely present at Intesa scale; this conversation is the place to validate.",
      },
      {
        status: "alignment" as ObservationStatus,
        label: "Requires executive alignment",
        helper: "Direction depends on executive priorities; the conversation should pick the angle.",
      },
    ],
    observations: [
      {
        title: "Legacy core ↔ modern surface coexistence",
        body: "Core flows on legacy stacks; modern channels evolve in parallel.",
        status: "hypothesis" as ObservationStatus,
      },
      {
        title: "High regression risk on critical systems",
        body: "Balances, transactions, regulatory flows carry asymmetric blast radius.",
        status: "validated" as ObservationStatus,
      },
      {
        title: "Senior engineers absorbed by maintenance",
        body: "Top capacity concentrated on legacy upkeep, not differentiating programs.",
        status: "validated" as ObservationStatus,
      },
      {
        title: "Tribal knowledge concentration",
        body: "Legacy logic lives with few engineers; onboarding is slow and risk-laden.",
        status: "hypothesis" as ObservationStatus,
      },
      {
        title: "Where modernization compounds first",
        body: "An executive call — engineering ranks the candidates, leadership ranks the priority.",
        status: "alignment" as ObservationStatus,
      },
    ] as CurrentStateObservation[],
    closing:
      "Strategic assessment — not a technical audit.",
  },

  // -------------------------------------------------------------------------
  // PANEL 4 — Discovery Alignment (executive-level)
  //
  // Lives in the main flow. Single block, executive-level: the 3 primary
  // strategic questions only. Two secondary questions are kept visible but
  // de-emphasized so they don't crowd the live conversation. The full
  // pre-meeting discovery framework is moved into the appendix.
  // -------------------------------------------------------------------------
  panel4: {
    eyebrow: "Executive alignment areas",
    headline:
      "What has been identified so far —\nand what still requires executive alignment.",
    subhead:
      "Three prompts for the executive seat.",
    questions: [
      {
        category: "Capacity Constraints",
        question: "Where is engineering capacity currently constrained by repetitive modernization or maintenance work?",
        why: "Anchors the conversation in where scarce senior capacity is being spent today.",
      },
      {
        category: "Governance Requirements",
        question: "Which transformation initiatives are most impacted by delivery bottlenecks today, and what controls would frame autonomous workflows?",
        why: "Connects board-visible programs to the operating envelope any pilot must respect.",
      },
      {
        category: "Success Criteria",
        question: "How does Intesa currently balance migration speed with governance — and what outcomes would justify broader deployment?",
        why: "Frames the path from pilot evidence to scale-out commitment.",
      },
    ] as (DiscoveryGap & { category: string })[],
    secondaryQuestions: [
      {
        question: "Which systems are currently considered too risky to modernize at the pace the roadmap demands?",
        why: "Identifies where a controlled approach unlocks programs that are stalled today.",
      },
      {
        question: "What would the business impact of delayed releases look like across the digital banking roadmap?",
        why: "Connects execution capacity to revenue, customer experience, and regulatory commitment.",
      },
    ] as DiscoveryGap[],
    secondaryToggleLabel: "More executive prompts",
    appendixCallout: "Full discovery framework · Appendix",
  },

  // -------------------------------------------------------------------------
  // APPENDIX — Discovery framework (formerly main Panel 4)
  //
  // The full 4-block, 4-question pre-meeting discovery framework. Reachable
  // only via the appendix toggle. Used for Q&A and deep-dive, not for the
  // main flow.
  // -------------------------------------------------------------------------
  appendixDiscoveryFramework: {
    eyebrow: "Appendix · Discovery framework",
    headline:
      "To bulletproof the business case,\nthis conversation has to validate\nwhat pre-meeting discovery alone cannot confirm.",
    intro:
      "This is the full discovery framework underlying an Intesa-grade engagement. It is intentionally outside the main flow — surfaced here only for Q&A or deep-dive moments.",
    transition:
      "The pilot is not a sandbox experiment. It is a controlled entry point to broader engineering transformation.",
    blocks: [
      {
        key: "engineering-economics",
        label: "Engineering economics",
        headline: "Where engineering hours actually go.",
        listening:
          "What we want to validate: a credible split of maintenance vs. innovation capacity, and where the estate is paying scarce senior time for repetitive execution.",
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
          "What we want to validate: which controls are non-negotiable, which approval flows must wrap any AI-assisted execution, and what deployment topology unlocks security review.",
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
          "What we want to validate: which programs are board-visible, which are constrained by engineering capacity, and where unlocking throughput would change a quarter, not a sprint.",
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
          "What we want to validate: KPIs that leadership would defend in front of the board, and the procurement / governance steps that would have to start moving before week 4.",
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
  // PANEL 5 — Devin Modernization Demo
  //
  // Anchored on a representative reference repository. Not a feature tour —
  // a walkthrough of how a controlled modernization slice moves through
  // analysis, scoping, regression protection, and validation, inside the
  // bank's existing review envelope.
  // -------------------------------------------------------------------------
  panel5: {
    eyebrow: "Devin modernization demo",
    headline:
      "Controlled modernization,\non a representative banking repository.",
    useCase:
      "Reference repository: kushmirc/banking-modernization",
    subhead:
      "A modernization slice moving safely through analysis, planning, execution, and audit — inside the bank's existing review envelope.",
    repoDisclaimer:
      "Representative demonstration repository created to simulate a large-scale banking modernization workflow. No Intesa Sanpaolo source code or internal systems are used.",
    steps: [
      {
        index: 1,
        title: "Analyze modernization scope",
        body: "Reads the repository end-to-end and produces a modernization map.",
      },
      {
        index: 2,
        title: "Plan a safe slice",
        body: "Scope the highest-value slice with minimum regression exposure; add coverage first.",
      },
      {
        index: 3,
        title: "Execute with governance",
        body: "Refactor and upgrade as reviewable PRs inside the bank's existing tooling.",
      },
      {
        index: 4,
        title: "Produce reviewable outcomes",
        body: "Strengthened tests, captured rationale, audit-ready evidence — handed to governance review.",
      },
    ] as WalkthroughStep[],
    valueStatements: [
      "Safer modernization, lower regression risk, faster release confidence — at enterprise scale.",
    ],
    repoLink: {
      label: "github.com/kushmirc/banking-modernization",
      url: "https://github.com/kushmirc/banking-modernization",
    },
  },

  // -------------------------------------------------------------------------
  // PANEL 5b — Live Workflow Preview
  //
  // A concrete, governance-aware modernization workflow rendered as a
  // 4-step pipeline. Complements P5 (conceptual demo) with an
  // enterprise-grade visual showing what Devin actually does inside the
  // engineering workflow — without terminal/IDE aesthetics.
  // -------------------------------------------------------------------------
  panel5b: {
    eyebrow: "Live workflow preview",
    headline:
      "A governance-aware modernization workflow,\nexecuted by Devin.",
    subhead:
      "Example of a modernization workflow Devin executes inside enterprise engineering controls — analysis through governed PR review.",
    steps: [
      {
        index: 1,
        title: "Repository analysis",
        items: [
          "Dependency mapping",
          "Migration scope detection",
          "Risk identification",
        ],
      },
      {
        index: 2,
        title: "Modernization planning",
        items: [
          "Upgrade path proposal",
          "Impact analysis",
          "Task decomposition",
        ],
      },
      {
        index: 3,
        title: "Controlled execution",
        items: [
          "Refactoring",
          "Test generation",
          "Reviewable PR creation",
        ],
      },
      {
        index: 4,
        title: "Governance & review",
        items: [
          "Human approval workflow",
          "Auditability + documentation",
          "CI/CD validation",
        ],
      },
    ],
    review: {
      label: "Mock review evidence",
      title: "PR · Modernize legacy reconciliation flow",
      meta: "+2,134 / −1,807 across 18 files · 24 tests passing",
      ticks: [
        "Tests passing",
        "Audit trail captured",
        "Human approval required",
        "DORA-aligned change log",
      ],
    },
    insight:
      "Modernization workflow operating inside enterprise engineering controls — not bypassing them.",
    disclaimer:
      "Illustrative workflow visualization. Actual execution adapts to client repositories, security envelope, and governance configuration.",
  },

  // -------------------------------------------------------------------------
  // PANEL 6 — Built for Enterprise Trust
  // -------------------------------------------------------------------------
  panel6: {
    eyebrow: "Built for enterprise trust",
    headline:
      "Execution scalability that survives\nbanking governance and security review.",
    subhead:
      "The same controls a regulated bank already enforces — applied to AI-assisted engineering execution from day one.",
    pillars: [
      {
        title: "Isolated VM per session",
        body: "Single-tenant environment per session. No cross-tenant exposure.",
        tag: "Isolation",
      },
      {
        title: "Human approval workflow",
        body: "AI proposes; engineering and governance approve.",
        tag: "Human-in-the-loop",
      },
      {
        title: "Reviewable pull requests",
        body: "Every output a PR inside your existing review tooling.",
        tag: "Reviewable",
      },
      {
        title: "Audit-friendly evidence",
        body: "Rationale, tests, decision trail captured per task — DORA-aligned.",
        tag: "Auditability",
      },
      {
        title: "VPC / private deployment",
        body: "PrivateLink / IPSec connectivity; VPC-style deployment review.",
        tag: "Deployment",
      },
    ] as LabeledCard[],
    closing: "Trust is not added at the end. It is the operating envelope.",
  },

  // -------------------------------------------------------------------------
  // PANEL 7 — Engineering Capacity Redeployment Model
  //
  // Reframed from a generic tasks→outcomes table to an engineering-leverage
  // narrative: where senior capacity is consumed today, and what an
  // illustrative redeployment model unlocks. Includes the explicit
  // "leverage, not replacement" statement.
  // -------------------------------------------------------------------------
  panel7: {
    eyebrow: "Engineering capacity redeployment model",
    headline:
      "From repetitive execution\nto strategic transformation.",
    subhead:
      "A significant share of senior engineering capacity is consumed by repetitive modernization work. Partial leverage shifts the throughput curve.",
    modelHypothesis: {
      label: "Illustrative hypothesis",
      formulaLines: [
        "400 engineers",
        "× 30% repetitive modernization effort",
        "≈ 120 engineering-equivalent capacity",
      ],
      explanation:
        "approximately 120 engineering-equivalents tied to repetitive execution work — a redeployment surface, not a replacement target.",
    },
    rows: [
      {
        technical: "Dependency analysis",
        outcome: "Faster modernization assessment",
      },
      {
        technical: "Test generation",
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
    ] as BusinessOutcomeRow[],
    leverageStatement:
      "Not replacing engineers — scaling modernization without proportionally scaling engineering capacity.",
  },

  // -------------------------------------------------------------------------
  // PANEL 8 — ROI Signal (€€€ math, separated from the leverage panel)
  // -------------------------------------------------------------------------
  panel8: {
    eyebrow: "ROI signal — directional, at Intesa scale",
    headline: "Even with a safety margin,\nthe math is disruptive.",
    subhead:
      "~1 in 3 engineering hours is modernization-shaped — compounded across a ~3,300-developer estate.",
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
      "Safety margin applied across uplift, rollout, and applicable-work share.",
    sources: [
      "Gartner, Apr 2024 — 75% of enterprise software engineers will use AI code assistants by 2028, up from <10% in early 2023.",
      "McKinsey, Jun 2023 — The economic potential of generative AI: software engineering task-level productivity gain ≈ 20–45%.",
      "Intesa Sanpaolo press & Il Sole 24 Ore (Feb 2026) — 2,400+ IT hires 2022–25; ISYTECH / Isybank modernization roadmap.",
    ],
    disclaimer:
      "Illustrative value model based on representative enterprise modernization assumptions. Actual impact depends on workflow scope, governance requirements, engineering maturity, and deployment scale. Not a commitment.",
  },

  // -------------------------------------------------------------------------
  // PANEL 9 — Illustrative Enterprise Reference Pattern (Itaú)
  //
  // Anchors the value narrative on a credible enterprise reference. Not a
  // promise of equivalent outcomes for Intesa — a credibility frame that
  // demonstrates measurable gains under governance-aware factory workflows.
  // -------------------------------------------------------------------------
  panel9: {
    eyebrow: "Illustrative enterprise reference pattern",
    headline:
      "Measurable enterprise outcomes\nunder governance-aware execution.",
    subtitle:
      "Itaú Bank — measurable gains under governance-aware factory workflows.",
    intro:
      "Autonomous engineering agents integrated into bounded, governance-controlled delivery workflows.",
    kpis: [
      {
        title: "Delivery throughput",
        metric: "20–30% increase",
        description:
          "Measured improvement in delivery throughput across bounded engineering workflows.",
      },
      {
        title: "Lead time",
        metric: "15% improvement",
        description:
          "Reduction in software delivery lead time through autonomous execution support.",
      },
      {
        title: "Testing quality",
        metric: "25% reduction",
        description:
          "Reduction in testing errors while maintaining governance and review controls.",
      },
      {
        title: "Modernization acceleration",
        metric: "5–6× faster",
        description:
          "Observed acceleration in selected migration and modernization workflows under controlled factory conditions.",
      },
    ] as ItauKpi[],
    governanceSignal: {
      title: "The signal is governance-aware execution",
      bullets: [
        "Governance-constrained workflows",
        "Human oversight maintained",
        "Repeatable execution standards",
        "Auditability preserved",
      ],
    },
    factoryWorkflow: {
      title: "Factory workflow model",
      body: "Bounded, repetitive engineering tasks under standardized governance — not open-ended autonomous development.",
      examples: [
        "Dependency upgrades",
        "Migration preparation",
        "Test generation",
        "Remediation",
        "Documentation",
      ],
    },
    governanceConstraint:
      "Gains achieved by applying the same review, quality, and security controls used for human-authored delivery.",
    sourceLabel: "Reference: Gartner Research · document 7778353",
    sourceUrl:
      "https://www.gartner.com/document-reader/document/7778353?ref=solrAll&refval=553684491&",
    disclaimer:
      "Illustrative reference metrics from a separate enterprise banking environment. Actual outcomes depend on selected use cases, governance controls, and deployment conditions.",
  },

  // -------------------------------------------------------------------------
  // PANEL 10 — Counter Climax (reveal of the session counter)
  // -------------------------------------------------------------------------
  panel10: {
    eyebrow: "Reclaimed capacity",
    headlinePrefix: "During this discussion,",
    headlineSuffix: "could already be reclaimed.",
    sub: "Illustrative scenario based on modeled assumptions.",
    closing: "The constraint is not strategy.\nIt is execution capacity.",
  },

  // -------------------------------------------------------------------------
  // PANEL 11 — 4-Week Pilot + Success Metrics
  // -------------------------------------------------------------------------
  panel11: {
    eyebrow: "4-week pilot",
    headline:
      "From controlled validation\nto a go-live decision.",
    subhead:
      "A bounded entry point engineered to end with a decision — not another evaluation cycle.",
    weeks: [
      {
        week: 1,
        title: "Alignment & setup",
        items: [
          "Scope one modernization use case",
          "Confirm access and security envelope",
          "Align executive sponsor and engineering lead",
        ],
      },
      {
        week: 2,
        title: "Controlled execution",
        items: [
          "Repository analysis and scoped execution",
          "Track effort, quality, and review cycle metrics",
        ],
      },
      {
        week: 3,
        title: "Validation & governance review",
        items: [
          "Increase task complexity and validate repeatability",
          "Review governance, auditability, developer acceptance",
        ],
      },
      {
        week: 4,
        title: "Executive go-live decision",
        items: [
          "Compare pilot KPIs against baseline",
          "Agree go-live roadmap and commercial next steps",
        ],
      },
    ],
    kpisTitle: "Pilot success metrics",
    kpis: [
      "Modernization cycle time",
      "Engineering hours redeployed",
      "Executive decision on scale-out",
    ],
    kpisDetailToggleLabel: "Additional pilot KPIs",
    kpisDetail: [
      "Reviewable PRs completed",
      "Test coverage improvement",
      "Developer acceptance rate",
    ],
    kpiNote: "Decision-grade evidence — not vanity metrics.",
  },

  // -------------------------------------------------------------------------
  // PANEL 12 — Mutual Commitment
  // -------------------------------------------------------------------------
  panel12: {
    eyebrow: "Mutual commitment",
    headline:
      "A successful pilot should not end\nwith another evaluation.\nIt should end with a go-live decision.",
    partnership:
      "This pilot is designed as a jointly governed validation initiative between Intesa Sanpaolo and Cognition.",
    intesa: {
      title: "Intesa Sanpaolo commitment",
      items: [
        "Scoped repository access",
        "Executive sponsor and engineering lead",
        "Confirmed success metrics",
        "Defined go-live decision process",
      ],
    },
    cognition: {
      title: "Cognition commitment",
      items: [
        "Secure pilot setup and onboarding",
        "Tracked KPIs and weekly reviews",
        "Executive pilot readout",
        "Scale-out roadmap recommendation",
      ],
    },
    successDependsOn:
      "Success depends not only on technical execution, but also on executive alignment, governance participation, and measurable operational outcomes.",
  },

  // -------------------------------------------------------------------------
  // PANEL 13 — Final Executive Ask
  // -------------------------------------------------------------------------
  panel13: {
    eyebrow: "Final executive ask",
    headline: "If value is proven,\nare we aligned to move?",
    body: "After a successful pilot: a defined scale-out roadmap across priority modernization workstreams.",
    commercialAlignment:
      "Before launching the pilot, alignment should exist on what a successful outcome would operationally trigger: expanded deployment scope, stakeholder approval path, governance validation, and commercial go-live readiness.",
    question:
      "Assuming we jointly validate measurable impact during the pilot, what would need to happen internally at Intesa Sanpaolo to support broader deployment?",
    nextSteps: [
      "Confirm executive sponsor",
      "Agree pilot success metrics",
      "Define post-pilot go-live timeline",
    ],
  },
};
