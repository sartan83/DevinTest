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
    { index: 5, label: "6", full: "Enterprise trust", appendix: false },
    { index: 6, label: "7", full: "Capacity redeployment", appendix: false },
    { index: 7, label: "8", full: "ROI signal", appendix: false },
    { index: 8, label: "9", full: "Enterprise reference", appendix: false },
    { index: 9, label: "10", full: "Reclaimed capacity", appendix: false },
    { index: 10, label: "11", full: "4-week pilot", appendix: false },
    { index: 11, label: "12", full: "Mutual commitment", appendix: false },
    { index: 12, label: "13", full: "Aligned to move", appendix: false },
    { index: 13, label: "A", full: "Discovery framework (appendix)", appendix: true },
  ] as { index: number; label: string; full: string; appendix: boolean }[],

  counter: {
    label: "Modeled execution capacity reclaimed during this session",
    shortLabel: "Capacity reclaimed",
    disclaimer: "Illustrative scenario based on modeled assumptions",
    unit: "developer days",
    finalRange: { min: 8, max: 18 },
    // Steps accumulate per visited panel (1-indexed → maps to render index panel-1).
    // Sum across all 13 panels ≈ 8–18 dev days.
    steps: [
      { panel: 1, addMin: 0.4, addMax: 0.8, note: "Framing engagement" },
      { panel: 2, addMin: 0.6, addMax: 1.3, note: "Naming the execution gap" },
      { panel: 3, addMin: 0.7, addMax: 1.5, note: "Current state pressure mapped" },
      { panel: 4, addMin: 1.0, addMax: 2.0, note: "Discovery alignment validated" },
      { panel: 5, addMin: 0.9, addMax: 1.8, note: "Modernization walkthrough" },
      { panel: 6, addMin: 0.5, addMax: 1.2, note: "Enterprise trust envelope" },
      { panel: 7, addMin: 0.7, addMax: 1.6, note: "Capacity redeployment framed" },
      { panel: 8, addMin: 0.8, addMax: 2.0, note: "ROI signal at Intesa scale" },
      { panel: 9, addMin: 0.6, addMax: 1.4, note: "Enterprise reference anchored" },
      { panel: 10, addMin: 0.5, addMax: 1.2, note: "Climax consolidation" },
      { panel: 11, addMin: 0.5, addMax: 1.2, note: "Pilot structure agreed" },
      { panel: 12, addMin: 0.3, addMax: 0.7, note: "Mutual commitment captured" },
      { panel: 13, addMin: 0.2, addMax: 0.6, note: "Closing alignment" },
    ] as CounterStep[],
  },

  // -------------------------------------------------------------------------
  // PANEL 1 — Opening / Hero
  // -------------------------------------------------------------------------
  panel1: {
    eyebrow: "Opening",
    headline: "Scaling Engineering Execution\nfor Intesa Sanpaolo.",
    subhead:
      "Devin helps software-intensive financial institutions accelerate modernization, redeploy scarce engineering capacity, and increase delivery throughput — without proportional headcount growth.",
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
        ambition: "Governance-aware AI adoption",
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
      "Based on patterns commonly seen across large financial institutions and public Intesa Sanpaolo material. Surfaced as observations, hypotheses, and alignment areas — not assumptions.",
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
        body: "Based on patterns commonly seen across large financial institutions, critical core flows often remain on legacy stacks while modern channels evolve in parallel. Modernization safely bridges the two — not rewriting either.",
        status: "hypothesis" as ObservationStatus,
      },
      {
        title: "High regression risk on critical systems",
        body: "Changes touching balances, transactions, or regulatory flows carry asymmetric blast radius. Confidence to modify is structurally lower than the roadmap demands.",
        status: "validated" as ObservationStatus,
      },
      {
        title: "Senior engineers absorbed by maintenance",
        body: "In large banking environments, the most experienced engineering capacity is often concentrated on maintaining the legacy estate and regression triage — not on differentiating digital programs.",
        status: "validated" as ObservationStatus,
      },
      {
        title: "Tribal knowledge concentration",
        body: "Critical legacy logic tends to live with a few senior engineers. Onboarding new contributors onto these systems is slow and risk-laden — a hypothesis to validate.",
        status: "hypothesis" as ObservationStatus,
      },
      {
        title: "Manual testing and documentation overhead",
        body: "Test authoring, regression evidence, and audit-ready documentation are still substantially manual in most large-bank environments — eroding capacity that should sit on the transformation backlog.",
        status: "validated" as ObservationStatus,
      },
      {
        title: "Where modernization compounds first",
        body: "Which workstreams unlock the most resilience-and-throughput when modernized first is an executive call. Engineering ranks the candidates; leadership ranks the business priority.",
        status: "alignment" as ObservationStatus,
      },
    ] as CurrentStateObservation[],
    closing:
      "This is a strategic assessment, not a technical audit. The next 20 minutes are how we test where it bends.",
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
    eyebrow: "Discovery alignment",
    headline:
      "What has been identified so far —\nand what still requires executive alignment.",
    subhead:
      "An executive discovery moment, not a sales pitch. The pilot only earns its place if the answers below come from the executive seat — where transformation priorities are set.",
    columns: {
      knownLabel: "Identified so far",
      knownItems: [
        "Modernization scope and the systems most under pressure.",
        "Engineering team shape and where Devin would attach.",
        "Indicative pilot footprint and timeline.",
      ],
      validateLabel: "Requires executive alignment",
      validateItems: [
        "Where modernization risk has the highest board visibility.",
        "How operational risk gets priced into modernization decisions.",
        "What success would have to look like to scale beyond the pilot.",
      ],
    },
    questions: [
      {
        question: "Where is engineering capacity currently constrained by repetitive modernization or maintenance work?",
        why: "Anchors the conversation in where scarce senior capacity is actually being spent today.",
      },
      {
        question: "Which transformation initiatives are most impacted by delivery bottlenecks today?",
        why: "Connects engineering execution capacity to board-visible programs already on the roadmap.",
      },
      {
        question: "How does Intesa currently balance migration speed with governance and regression risk?",
        why: "Surfaces the operational envelope inside which any pilot must safely operate.",
      },
    ] as DiscoveryGap[],
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
    appendixCallout: "Appendix · Full discovery framework — 4 × 4 question matrix",
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
      "Reference repository: kushmirc/banking-modernization · representative legacy banking codebase used for the walkthrough.",
    subhead:
      "Not a feature tour. A walkthrough of how Devin acts as a modernization execution layer: analyze the legacy estate, scope a safe slice, add regression protection first, validate inside the bank's existing review envelope.",
    repoDisclaimer:
      "Representative demonstration repository created to simulate a large-scale banking modernization workflow. No Intesa Sanpaolo source code or internal systems are used.",
    steps: [
      {
        index: 1,
        title: "Analyze the legacy architecture",
        body: "Devin reads the repository end-to-end — language mix, dependencies, deprecated libraries, coverage, blast-radius — and produces a modernization map.",
      },
      {
        index: 2,
        title: "Scope a safe slice — protect it first",
        body: "Propose a scoped modernization slice with maximum business value and minimum regression exposure, then add the safety net before any change: characterization, coverage, contract tests.",
      },
      {
        index: 3,
        title: "Execute the modernization slice",
        body: "Refactor code, upgrade dependencies, bridge legacy ↔ modern flows — every change a reviewable PR inside the bank's existing review tooling.",
      },
      {
        index: 4,
        title: "Validate safely and document for audit",
        body: "Run the strengthened test suite, capture rationale, evidence, and traceability, and hand a controlled, auditable slice to engineering and governance review.",
      },
    ] as WalkthroughStep[],
    valueStatements: [
      "Devin is not a code-generation toy. It is the execution layer that lets controlled modernization scale without overloading scarce senior engineers.",
      "For Intesa, the value is operational resilience: safer modernization, lower regression risk, faster release confidence — at enterprise scale.",
    ],
    repoLink: {
      label: "github.com/kushmirc/banking-modernization",
      url: "https://github.com/kushmirc/banking-modernization",
    },
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
      "In large financial institutions, a significant share of senior engineering effort is often consumed by repetitive modernization, remediation, testing, and maintenance work. Even partial leverage across bounded workflows can materially shift the modernization throughput curve.",
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
        outcome: "More delivery throughput without proportional headcount growth",
      },
    ] as BusinessOutcomeRow[],
    leverageStatement:
      "The strategic value is not replacing engineers. It is enabling large banking organizations to scale modernization and delivery execution without proportionally scaling engineering capacity.",
    closing:
      "Even partial automation leverage across bounded workflows could materially increase modernization throughput without proportional headcount growth.",
  },

  // -------------------------------------------------------------------------
  // PANEL 8 — ROI Signal (€€€ math, separated from the leverage panel)
  // -------------------------------------------------------------------------
  panel8: {
    eyebrow: "ROI signal — directional, at Intesa scale",
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
      "Examples from regulated banking environments show that autonomous engineering agents can deliver measurable gains when deployed within governance-aware factory workflows.",
    intro:
      "One example comes from Itaú Bank, where autonomous engineering agents were integrated into bounded, governance-controlled software delivery workflows. The measurable improvements observed were driven not by unrestricted automation, but by disciplined operational structure, human oversight, and enterprise governance.",
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
      title: "The key signal is governance-aware execution",
      body: "The most significant outcome from enterprise AI engineering adoption is not raw speed alone. It is the ability to achieve measurable operational gains inside governance-constrained workflows with human oversight, auditability, and repeatable execution standards.",
    },
    factoryWorkflow: {
      title: "Factory workflow model",
      body: "In this model, autonomous engineering agents are assigned to high-volume, repetitive, and well-bounded engineering tasks under standardized governance workflows — rather than open-ended autonomous software development.",
      examples: [
        "Dependency upgrades",
        "Migration preparation",
        "Test generation",
        "Remediation",
        "Documentation",
        "Repetitive modernization work",
      ],
    },
    governanceConstraint:
      "The observed gains were achieved by constraining autonomous agents within governance-aware workflows, applying the same review, quality, and security controls used for human-authored software delivery.",
    sourceLabel: "Reference: Gartner Research · document 7778353",
    sourceUrl:
      "https://www.gartner.com/document-reader/document/7778353?ref=solrAll&refval=553684491&",
    disclaimer:
      "Reference metrics shown are illustrative examples from a separate enterprise banking environment and are provided solely to frame potential operational impact categories. Actual outcomes depend on selected use cases, governance controls, engineering workflows, and deployment conditions.",
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
    successDependsOn:
      "Success depends not only on technical execution, but also on executive alignment, governance participation, and measurable operational outcomes.",
  },

  // -------------------------------------------------------------------------
  // PANEL 13 — Final Executive Ask
  // -------------------------------------------------------------------------
  panel13: {
    eyebrow: "Final executive ask",
    headline: "If value is proven,\nare we aligned to move?",
    body: "If Devin validates measurable impact during the 4-week pilot, the next step should be a defined scale-out roadmap across priority modernization and engineering execution workstreams.",
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
