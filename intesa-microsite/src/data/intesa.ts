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

/** Status of a current-state observation surfaced to the EB. */
export type ObservationStatus = "validated" | "hypothesis" | "alignment";

export type CurrentStateObservation = {
  title: string;
  body: string;
  status: ObservationStatus;
};

export type DiscoveryGap = {
  question: string;
  /** Why this question matters at the EB level — short subtext. */
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
  // Index 0–11 are the main executive flow. Index 12 is the appendix
  // ("Executive discovery framework") — reachable only via the discrete
  // appendix toggle, hidden from the progress dots.
  nav: [
    { index: 0, label: "1", full: "Opening", appendix: false },
    { index: 1, label: "2", full: "Execution gap", appendix: false },
    { index: 2, label: "3", full: "Current state assessment", appendix: false },
    { index: 3, label: "4", full: "Discovery gaps to validate", appendix: false },
    { index: 4, label: "5", full: "Modernization demo", appendix: false },
    { index: 5, label: "6", full: "Enterprise trust", appendix: false },
    { index: 6, label: "7", full: "From tasks to outcomes", appendix: false },
    { index: 7, label: "8", full: "ROI signal", appendix: false },
    { index: 8, label: "9", full: "Reclaimed capacity", appendix: false },
    { index: 9, label: "10", full: "4-week pilot", appendix: false },
    { index: 10, label: "11", full: "Mutual commitment", appendix: false },
    { index: 11, label: "12", full: "Aligned to move", appendix: false },
    { index: 12, label: "A", full: "Discovery framework (appendix)", appendix: true },
  ] as { index: number; label: string; full: string; appendix: boolean }[],

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
  // PANEL 3 — Current State Assessment
  //
  // Surfaces likely modernization pressure points already discovered with the
  // Champion. Each item is tagged so the EB sees what is already validated,
  // what is still a hypothesis, and what needs executive alignment — never
  // assumed.
  // -------------------------------------------------------------------------
  panel3: {
    eyebrow: "Current state assessment",
    headline:
      "What we believe we are seeing\n— and what we still need you to confirm.",
    subhead:
      "A pre-EB assessment based on Champion conversations and public Intesa Sanpaolo material. Surfaced as observations, hypotheses, and alignment areas — not assumptions.",
    legend: [
      {
        status: "validated" as ObservationStatus,
        label: "Validated observation",
        helper: "Confirmed in Champion-level discovery and triangulated against public material.",
      },
      {
        status: "hypothesis" as ObservationStatus,
        label: "Hypothesis to confirm",
        helper: "Pattern likely present at Intesa scale; the EB conversation is the place to validate.",
      },
      {
        status: "alignment" as ObservationStatus,
        label: "Requires executive alignment",
        helper: "Direction depends on EB priorities; the conversation should pick the angle.",
      },
    ],
    observations: [
      {
        title: "COBOL and Java coexistence",
        body: "Critical core flows still anchored in COBOL while the surface estate runs on Java, JSP, and modern frontends — the modernization effort is about safely bridging the two, not rewriting either.",
        status: "hypothesis" as ObservationStatus,
      },
      {
        title: "High regression risk on critical systems",
        body: "Changes touching customer balances, transactions, or regulatory flows carry asymmetric blast radius. Confidence to modify these systems is structurally lower than the modernization roadmap demands.",
        status: "validated" as ObservationStatus,
      },
      {
        title: "Long testing and validation cycles",
        body: "End-to-end regression and pre-prod validation absorb a disproportionate share of every modernization release window.",
        status: "hypothesis" as ObservationStatus,
      },
      {
        title: "Senior engineers absorbed by maintenance",
        body: "The most experienced capacity is concentrated on maintaining legacy estate, dependency upgrades, and regression triage rather than on differentiating digital programs.",
        status: "validated" as ObservationStatus,
      },
      {
        title: "Tribal knowledge concentration",
        body: "Critical legacy logic lives in the heads of a few senior engineers. Onboarding new contributors onto these systems is slow and risk-laden.",
        status: "hypothesis" as ObservationStatus,
      },
      {
        title: "Release governance bottlenecks",
        body: "Multi-stage approvals, manual evidence assembly, and change-advisory windows extend lead time on even low-risk modernization changes.",
        status: "hypothesis" as ObservationStatus,
      },
      {
        title: "Manual testing and documentation overhead",
        body: "Test authoring, regression evidence, and audit-ready documentation are still substantially manual — eroding capacity that should sit on transformation backlog.",
        status: "validated" as ObservationStatus,
      },
      {
        title: "Modernization safety vs. velocity tension",
        body: "The estate cannot trade safety for velocity, but the current operating model forces an implicit choice every quarter.",
        status: "alignment" as ObservationStatus,
      },
      {
        title: "Where modernization compounds first",
        body: "Which workstreams unlock the most resilience-and-throughput when modernized first is an executive call — engineering can rank the candidates, the EB ranks the business priority.",
        status: "alignment" as ObservationStatus,
      },
    ] as CurrentStateObservation[],
    closing:
      "This is a strategic assessment, not a technical audit. The next 20 minutes are how we test where it bends.",
  },

  // -------------------------------------------------------------------------
  // PANEL 4 — Discovery Gaps to Validate (executive workshop)
  //
  // Lives in the main flow. Single-block, workshop-style: the EB-only
  // questions that the Champion alone cannot answer. Distinguishes what is
  // already known from the Champion vs. what still requires EB validation.
  // The full Champion-level discovery framework (4 blocks × 4 questions) is
  // moved into the appendix — not part of the main roleplay.
  // -------------------------------------------------------------------------
  panel4: {
    eyebrow: "Discovery gaps to validate",
    headline:
      "What the Champion has framed —\nand what only the Executive Buyer can confirm.",
    subhead:
      "This is an executive discovery moment, not a sales pitch. The pilot only earns its place if the answers below come from the Executive Buyer's seat, not the team's.",
    columns: {
      knownLabel: "Already framed by the Champion",
      knownItems: [
        "Modernization scope and the systems most under pressure.",
        "Engineering team shape and the estate where Devin would attach.",
        "Initial security expectations for AI-assisted execution.",
        "Indicative pilot footprint and timeline.",
      ],
      validateLabel: "Only the Executive Buyer can confirm",
      validateItems: [
        "Where modernization risk has the highest board visibility.",
        "Which initiatives are most exposed to regression and resilience risk.",
        "How operational risk gets priced into modernization decisions.",
        "What success would have to look like for broader deployment.",
      ],
    },
    questions: [
      {
        question: "Which modernization initiatives create the highest operational risk today?",
        why: "Reframes the conversation from technical scope to enterprise risk posture.",
      },
      {
        question: "Is the main bottleneck migration speed, or regression confidence?",
        why: "Disambiguates whether the pilot should optimize throughput or safety — the answer is rarely both.",
      },
      {
        question: "How much engineering capacity is spent on maintenance versus innovation today?",
        why: "Anchors the economic case in a number the EB will defend in front of the board.",
      },
      {
        question: "Which systems are currently considered too risky to modernize at the pace the roadmap demands?",
        why: "Identifies where 'controlled modernization' would unlock board-visible programs that are stalled today.",
      },
      {
        question: "How are release risks currently mitigated, and where is that envelope under strain?",
        why: "Surfaces governance and resilience controls — the same envelope Devin must sit inside, not around.",
      },
      {
        question: "What is the business impact of delayed releases on the digital banking roadmap?",
        why: "Connects engineering execution capacity to revenue, customer experience, and regulatory commitment.",
      },
      {
        question: "How is operational resilience measured during software changes, and what would 'safer modernization' mean to you?",
        why: "Lets the EB define the success criteria in their own language, before the pilot KPIs are agreed.",
      },
    ] as DiscoveryGap[],
    transition:
      "The pilot earns its place only if these answers come from the EB's seat — not the team's. The full Champion-level discovery framework lives in the appendix.",
    appendixCallout: "See appendix · Executive discovery framework — 4 blocks × 4 questions",
  },

  // -------------------------------------------------------------------------
  // APPENDIX — Executive discovery framework (formerly Panel 4)
  //
  // The full Champion-level 4-block, 4-question framework. Reachable only via
  // the appendix toggle. Used for Q&A and deep-dive, not for the main flow.
  // -------------------------------------------------------------------------
  appendixDiscoveryFramework: {
    eyebrow: "Appendix · Executive discovery framework",
    headline:
      "To bulletproof the business case,\nthe first EB meeting must validate\nwhat the Champion alone cannot confirm.",
    intro:
      "This is the full discovery framework I would run to prepare an Intesa-grade engagement. It is intentionally outside the main flow — surfaced here only for Q&A or deep-dive moments.",
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
  // PANEL 5 — Devin Modernization Demo
  //
  // Anchored on a concrete reference repository (banking-modernization). Not
  // a feature tour — a walkthrough of how a controlled modernization slice
  // moves through analysis, scoping, regression protection, and validation,
  // inside the bank's existing review envelope.
  // -------------------------------------------------------------------------
  panel5: {
    eyebrow: "Devin modernization demo",
    headline:
      "Controlled modernization,\non a real banking repository.",
    useCase:
      "Reference repository: kushmirc/banking-modernization · representative legacy banking codebase used for the walkthrough.",
    subhead:
      "Not a feature tour. A walkthrough of how Devin acts as a modernization execution layer: analyze the legacy estate, identify a safe slice, add regression protection first, validate inside the bank's existing review envelope.",
    steps: [
      {
        index: 1,
        title: "Analyze the legacy architecture",
        body: "Devin reads the repository end-to-end — language and framework mix, dependency graph, deprecated libraries, test coverage, and high-blast-radius modules — and produces a modernization map of the estate.",
      },
      {
        index: 2,
        title: "Identify a safe modernization slice",
        body: "Devin proposes a scoped slice that maximizes business value while minimizing regression exposure. The Champion and engineering lead approve scope before any code change.",
      },
      {
        index: 3,
        title: "Add regression protection first",
        body: "Before refactoring, Devin strengthens the safety net: characterization tests on legacy behavior, missing unit / integration coverage, and contract tests across the legacy / modern boundary.",
      },
      {
        index: 4,
        title: "Execute the modernization slice",
        body: "Devin refactors code, upgrades dependencies, and bridges legacy ↔ modern flows — every change captured as a reviewable pull request inside the bank's existing review tooling, never as an opaque action.",
      },
      {
        index: 5,
        title: "Validate safely and document for audit",
        body: "Devin runs the strengthened test suite, captures change rationale, evidence, and traceability, and hands a controlled, auditable modernization slice to engineering and governance review.",
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
