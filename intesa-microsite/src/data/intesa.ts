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

  // 14 sequential main panels (after the minimalism pass removed the
  // standalone counter-climax page; the counter widget now carries the
  // "?" popover that previously lived as a full panel). Stage-presence
  // opener, position the problem (Why Now / 2029), validate, show the
  // governed workflow, frame trust, quantify, anchor on a credible
  // enterprise reference, commit to a 4-week pilot, and close on an
  // executive ask. Index 0–13 are the main executive flow. Index 14 is
  // the appendix ("Discovery framework") — reachable only via the
  // discrete appendix toggle, hidden from the progress dots.
  nav: [
    { index: 0, label: "·", full: "Executive working session", appendix: false },
    { index: 1, label: "1", full: "Opening", appendix: false },
    { index: 2, label: "2", full: "Agenda", appendix: false },
    { index: 3, label: "3", full: "Why now · 2029", appendix: false },
    { index: 4, label: "4", full: "Current state", appendix: false },
    { index: 5, label: "5", full: "Executive validation", appendix: false },
    { index: 6, label: "6", full: "Governed modernization workflow", appendix: false },
    { index: 7, label: "7", full: "Enterprise trust", appendix: false },
    { index: 8, label: "8", full: "Capacity redeployment", appendix: false },
    { index: 9, label: "9", full: "ROI signal", appendix: false },
    { index: 10, label: "10", full: "Enterprise reference", appendix: false },
    { index: 11, label: "11", full: "4-week pilot", appendix: false },
    { index: 12, label: "12", full: "Operational readiness", appendix: false },
    { index: 13, label: "13", full: "Next-step alignment", appendix: false },
    { index: 14, label: "A", full: "Discovery framework (appendix)", appendix: true },
  ] as { index: number; label: string; full: string; appendix: boolean }[],

  counter: {
    label: "Capacity redeployed",
    shortLabel: "Capacity redeployed",
    disclaimer: "Illustrative scenario based on modeled assumptions",
    unit: "dev-days",
    devEquivalentUnit: "dev-equivalents",
    // 1 developer-equivalent = 220 working dev-days / year. Used to
    // translate the live counter into a CIO-readable second metric.
    devDaysPerEquivalent: 220,
    finalRange: { min: 8, max: 18 },
    // Expanded-state explanation bullets revealed on click. The default
    // collapsed state shows numbers only; the presenter narrates the rest.
    expandedBullets: [
      "Illustrative modernization model",
      "1 developer-equivalent = 220 days / year",
      "Capacity redeployment, not headcount reduction",
    ],
    // Tooltip content for the contextual "?" popover on the counter
    // widget. Replaces the deleted standalone climax panel.
    popover: {
      title: "Illustrative modernization signal",
      bullets: [
        "Migration pressure",
        "Execution complexity",
        "Governance constraints",
      ],
    },
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
      "The strategic value is reinvesting engineering bandwidth into modernization throughput — not reducing teams.",
    devEquivalentFootnote:
      "Developer-equivalent figures are illustrative operational capacity models based on representative engineering allocation assumptions — not headcount targets.",
    // Steps accumulate per visited panel (1-indexed → maps to render index panel-1).
    // Calibrated to a 60-minute interactive role-play cadence: per-panel
    // additions are time-weighted such that cumulative across all 14 main
    // panels reaches exactly the headline 8–18 dev-days envelope at idx 13
    // (Next-step alignment). The standalone counter-climax page is removed
    // (its narrative now lives in the counter widget popover); the 4'
    // budget redistributes into op-readiness as the natural anchor.
    //
    // Idx 0 is the executive opening screen — pre-session stage presence.
    // It contributes 0 to the counter so the working envelope still maps
    // exactly to the 60-minute presentation budget across panels 1–13.
    //
    // Time budget per panel (sums to 60 min):
    //   P0 Welcome 0'   P1 Hero 3'   P2 Agenda 2'   P3 Why-now 4'   P4 Current 5'
    //   P5 Validation 6'   P6 Workflow MERGED 7'   P7 Trust 3'
    //   P8 Capacity 4'   P9 ROI 4'   P10 Itaú 5'
    //   P11 Pilot 5'   P12 Op readiness 9' (5' + redistributed climax 4')
    //   P13 Next-step 3'
    //
    // Per-minute increment: 8/60 ≈ 0.133 (min) and 18/60 = 0.3 (max).
    steps: [
      { panel: 1,  addMin: 0.00, addMax: 0.00, note: "Executive opening screen (0' — pre-session)" },
      { panel: 2,  addMin: 0.40, addMax: 0.90, note: "Hero framing (3')" },
      { panel: 3,  addMin: 0.27, addMax: 0.60, note: "Agenda (2')" },
      { panel: 4,  addMin: 0.53, addMax: 1.20, note: "Why now · 2029 (4')" },
      { panel: 5,  addMin: 0.67, addMax: 1.50, note: "Current state pressure mapped (5')" },
      { panel: 6,  addMin: 0.80, addMax: 1.80, note: "Executive validation areas (6')" },
      { panel: 7,  addMin: 0.93, addMax: 2.10, note: "Governed modernization workflow + impact (7')" },
      { panel: 8,  addMin: 0.40, addMax: 0.90, note: "Enterprise trust envelope (3')" },
      { panel: 9,  addMin: 0.53, addMax: 1.20, note: "Capacity redeployment framed (4')" },
      { panel: 10, addMin: 0.53, addMax: 1.20, note: "ROI signal (4')" },
      { panel: 11, addMin: 0.67, addMax: 1.50, note: "Itaú enterprise reference (5')" },
      { panel: 12, addMin: 0.67, addMax: 1.50, note: "Pilot structure walked (5')" },
      { panel: 13, addMin: 1.20, addMax: 2.70, note: "Operational readiness + reclaimed-capacity anchor (9')" },
      { panel: 14, addMin: 0.40, addMax: 0.90, note: "Next-step alignment closing (3')" },
    ] as CounterStep[],
  },

  // -------------------------------------------------------------------------
  // PANEL 0 — Executive Opening Screen (pre-session stage presence)
  // -------------------------------------------------------------------------
  panel0: {
    leftWordmark: "Intesa Sanpaolo",
    rightWordmark: "Cognition",
    title: "Governed Modernization Execution at Enterprise Scale",
    subtitle: "Governance-Aware Modernization Discussion",
    footer: "Intesa Sanpaolo × Cognition",
    cta: "Begin session",
  },

  // -------------------------------------------------------------------------
  // PANEL 1 — Opening / Hero
  // -------------------------------------------------------------------------
  panel1: {
    eyebrow: "Opening",
    headline: "Scaling Engineering Execution\nfor Intesa Sanpaolo.",
    subhead: "",
    legacySubheadDeprecated:
      "Modernization leverage at enterprise scale — without proportional headcount growth.",
    framingLine:
      "Intesa is not facing a technology problem. It is facing an execution scalability problem.",
    // Current-state → target-state framing. Historical €5.6B 2022–25 +
    // 2,400+ IT specialists are no longer primary anchors — the EB pivot
    // re-emphasizes the 2026–29 closure window.
    kpis: [
      {
        value: "64%",
        label: "Cloud-based applications in 2026",
      },
      {
        value: "~100%",
        label: "Target cloud-based applications by 2029",
      },
      {
        value: "€4.6B",
        label: "Technology & growth investment 2026–2029",
      },
      {
        value: "~3,300",
        label: "Developers & IT engineers (est.)",
        estimated: true,
      },
    ] as KpiCard[],
    closingNarrative:
      "Intesa has already transformed significantly. The challenge now is closing the final migration gap by 2029.",
    // Cognition-style tension block — replaces the "Why Intesa matters"
    // anchor strip. Operational pressure first, no scale narrative.
    pressure: {
      title: "Large-scale migration pressure",
      bullets: [
        "Legacy dependencies",
        "Remediation",
        "Testing",
        "Repetitive migration work",
      ],
      bottleneck:
        "Execution bottleneck — current delivery capacity does not scale linearly.",
    },
    sourcesLine:
      "Sources: ISP Piano di Impresa 2026–2029 · investor materials.",
    ctas: [
      { label: "Open the agenda", target: 2, primary: true },
      { label: "Open 4-week pilot", target: 13, primary: false },
    ],
  },

  // -------------------------------------------------------------------------
  // PANEL 1b — Executive Working Session (Agenda)
  //
  // Sits immediately after the hero. Establishes meeting structure and
  // executive control before the narrative starts. Designed to be readable
  // in under 10 seconds.
  // -------------------------------------------------------------------------
  panel1b: {
    eyebrow: "Agenda",
    headline: "Five focus areas.",
    subhead: "",
    blocks: [
      {
        index: 1,
        title: "Context",
        helper: "2029 modernization pressure",
      },
      {
        index: 2,
        title: "Validation",
        helper: "EB assumptions",
      },
      {
        index: 3,
        title: "Demo",
        helper: "Governed execution",
      },
      {
        index: 4,
        title: "Impact",
        helper: "Capacity redeployment",
      },
      {
        index: 5,
        title: "Rollout",
        helper: "Pilot decision",
      },
    ],
    closing: "",
  },

  // -------------------------------------------------------------------------
  // PANEL 2 — Why Now · 2029
  //
  // Replaces the former "Strategic Ambition / Execution Gap" with an
  // operational-urgency frame. Brutal executive minimalism: oversized
  // typography, three statements, no explanatory paragraphs. The
  // presenter narrates the urgency live.
  // -------------------------------------------------------------------------
  panel2: {
    eyebrow: "Why now",
    bigYear: "2029",
    yearCaption: "Modernization deadline.",
    // Current-state vs target-state anchors. No historical timeline.
    states: [
      {
        value: "64%",
        label: "Cloud-based applications today",
      },
      {
        value: "100%",
        label: "Target by 2029",
      },
    ],
    closing: "Final migration wave requires scalable execution capacity.",
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
    eyebrow: "Current state — discovery signals",
    headline:
      "What we learned in discovery.",
    subhead: "",
    legacySubheadDeprecated:
      "Patterns commonly seen across large financial institutions — surfaced as observations, hypotheses, and alignment areas. Never assumed.",
    // Numeric discovery-style bullets. Items flagged `assumption` are
    // marked "working assumption to validate" inline; the rest are
    // signals already validated in pre-meeting discovery.
    discoverySignals: [
      { value: "64%", label: "Cloud-based applications in 2026", assumption: false },
      { value: "~36%", label: "Migration gap to close by 2029", assumption: false },
      { value: "~3,300", label: "Developers / IT engineers estimated", assumption: true },
      { value: "25–30%", label: "Engineering effort assumed in modernization, maintenance, remediation, testing", assumption: true },
      { value: "High-risk", label: "Regression-sensitive systems require governed execution", assumption: false },
      { value: "Constrained", label: "Senior engineering capacity absorbed by repetitive execution work", assumption: false },
    ],
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
        status: "validated" as ObservationStatus,
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
      "In large banking environments, transformation constraints are often operational before they are technological.",
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
    eyebrow: "EB Validation Needed",
    headline:
      "Pilot approval depends on validating\nthese assumptions.",
    subhead: "",
    questions: [
      {
        category: "Migration priority",
        question: "Which application families move first to protect the 2029 roadmap?",
        why: "",
      },
      {
        category: "Capacity baseline",
        question: "How much engineering time is absorbed by repetitive modernization work today?",
        why: "",
      },
      {
        category: "Pilot success criteria",
        question: "What evidence after 4 weeks justifies scale-out?",
        why: "",
      },
    ] as (DiscoveryGap & { category: string })[],
    executiveConfirmationLine:
      "Requires executive confirmation.",
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
  // PANEL 5 — Governance-Aware Modernization Workflow (MERGED)
  //
  // Consolidated section combining the conceptual demo (former P5) and the
  // live workflow preview (former P5b). Left side: bounded operational
  // workflow (5 nodes). Right side: business interpretation with scale
  // anchors and developer-equivalent translation. Audience moves from
  // "what Devin does" to "why it matters operationally" inside one panel.
  //
  // Opens with a cinematic executive transition statement that frames the
  // shift from "can AI generate code" to "can it operate inside enterprise
  // governance constraints".
  // -------------------------------------------------------------------------
  panel5: {
    eyebrow: "Demo: Governed Modernization Workflow",
    useCase: "Legacy modernization + test acceleration",
    headline:
      "How bounded autonomous execution\ntranslates into operational leverage.",
    subhead: "",
    legacySubheadDeprecated:
      "What Devin actually does inside enterprise engineering controls — and what that unlocks operationally.",
    transitionStatement:
      "The challenge is no longer whether AI can generate code. The challenge is whether it can operate reliably inside enterprise governance constraints.",
    // Left side: bounded operational flow — 6-node demo flow.
    workflow: {
      title: "Bounded operational workflow",
      nodes: [
        { label: "Repo scan", tone: "muted" as const },
        { label: "Migration plan", tone: "default" as const },
        { label: "Code changes", tone: "accent" as const },
        { label: "Test generation", tone: "default" as const },
        { label: "PR + evidence", tone: "accent" as const },
        { label: "Human approval", tone: "accent" as const },
      ],
      insight:
        "Bounded execution inside the bank's existing review envelope — not open-ended autonomous engineering.",
      // 3 demo bullets only — presenter narrates the rest live.
      demoBullets: [
        "Bounded task, not open-ended coding",
        "Existing engineering review preserved",
        "Evidence generated for audit and governance",
      ],
    },
    // Right side: business interpretation — why it matters operationally.
    businessImpact: {
      title: "Operational leverage",
      metrics: [
        {
          value: "20–30%",
          label: "Throughput increase (illustrative reference)",
        },
        {
          value: "12,000 engineering hours",
          label: "≈ 7 developer-equivalents redeployed toward strategic initiatives (illustrative)",
        },
        {
          value: "59 → 9",
          label: "Service consolidation (illustrative)",
        },
      ],
      statements: [
        "Governance-aware modernization execution.",
        "Reinvest engineering bandwidth into modernization throughput.",
      ],
      devEquivalentFootnote:
        "Developer-equivalent figures are illustrative operational capacity models based on representative engineering allocation assumptions — not headcount targets.",
    },
    // Oversized closing statement — visual breathing moment to anchor the
    // workflow section and create a memorable cinematic peak.
    closingStatement: "Governed execution at enterprise scale.",
    repoLink: {
      label: "github.com/kushmirc/banking-modernization",
      url: "https://github.com/kushmirc/banking-modernization",
    },
    repoDisclaimer:
      "Representative repo. No Intesa source code used.",
    disclaimer:
      "Illustrative enterprise reference points. Actual execution adapts to client repositories, security envelope, and governance configuration. Not guaranteed outcomes.",
  },

  // -------------------------------------------------------------------------
  // PANEL 6 — Built for Enterprise Trust
  // -------------------------------------------------------------------------
  panel6: {
    eyebrow: "Built for enterprise trust",
    headline:
      "Execution scalability that survives\nbanking governance and security review.",
    subhead: "",
    legacySubheadDeprecated:
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
    eyebrow: "Capacity redeployment",
    headline:
      "From repetitive execution\nto strategic transformation.",
    subhead: "",
    legacySubheadDeprecated:
      "A significant share of senior engineering capacity is consumed by repetitive modernization work. Partial leverage shifts the throughput curve.",
    modelHypothesis: {
      label: "Illustrative hypothesis",
      formulaLines: [
        "400 engineers",
        "× 30% repetitive modernization effort",
        "≈ 120 engineering-equivalent capacity",
      ],
      explanation:
        "≈ 120 engineering-equivalents redeployed toward strategic initiatives — a reinvestment surface, not a replacement target.",
    },
    // Big-number CIO slide. Two scenarios mapping dev-days/year to
    // developer-equivalents (1 dev-eq = 220 working days/year). Anchors
    // the EB conversation on capacity redeployment, not cost reduction.
    capacityScenarios: [
      {
        key: "conservative",
        title: "Conservative scenario",
        devDays: "~13,600 dev-days / year",
        devEquivalents: "≈ 62 developer-equivalents",
      },
      {
        key: "realistic",
        title: "Realistic scenario",
        devDays: "~43,500 dev-days / year",
        devEquivalents: "≈ 198 developer-equivalents",
      },
    ],
    capacityCalcNote: "1 developer-equivalent = 220 working days / year.",
    capacityRedeploymentLine:
      "Capacity redeployed toward strategic modernization initiatives.",
    capacityFootnote:
      "Illustrative model based on discovery assumptions; not a headcount target.",
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
        outcome: "Strategic bandwidth reinvested",
      },
      {
        technical: "PR documentation",
        outcome: "Stronger governance and auditability",
      },
    ] as BusinessOutcomeRow[],
    leverageStatement:
      "Not replacing engineers — scaling modernization throughput without proportionally scaling delivery capacity.",
    // Developer-equivalent translation layer — converts the redeployment
    // hypothesis into engineering-hours / FTE-year for executive readability.
    // Illustrative operational capacity model, not headcount targets.
    devEquivalent: {
      hours: "~210,000 engineering hours",
      fte: "~120 developer-equivalent capacity / year",
      footnote:
        "Developer-equivalent figures are illustrative operational capacity models based on representative engineering allocation assumptions — not headcount targets.",
    },
  },

  // -------------------------------------------------------------------------
  // PANEL 8 — ROI Signal (€€€ math, separated from the leverage panel)
  // -------------------------------------------------------------------------
  panel8: {
    eyebrow: "ROI signal",
    headline: "Even with a safety margin,\nthe math is disruptive.",
    subhead: "",
    legacySubheadDeprecated:
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
        reclaimedDevEquivalents: "≈ 62 developer-equivalents",
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
        reclaimedDevEquivalents: "≈ 198 developer-equivalents",
        reclaimedEur: "~€18.8M",
        footnote:
          "Uplift kept at the middle of McKinsey 20–45% band. Rollout at Gartner 2028 trajectory, discounted.",
      },
    ],
    headlineRange: {
      eur: "~€6–19M / year",
      devDays: "~14k–44k dev-days / year redeployed",
      devEquivalents: "≈ 62–198 developer-equivalents",
    },
    eurFraming:
      "Capacity equivalent to ~€6–19M / year redirected toward modernization priorities.",
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
    eyebrow: "Enterprise reference",
    headline:
      "Measurable enterprise outcomes\nunder governance-aware execution.",
    subtitle: "Itaú Bank.",
    intro: "",
    legacyIntroDeprecated:
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
        title: "Testing errors",
        metric: "25% fewer",
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
    // Operational scale anchors — illustrative reference points from
    // governance-aware enterprise modernization workflows. Not guaranteed
    // outcomes. Each anchor maps to a real bounded workflow pattern.
    operationalScaleAnchors: {
      title: "Operational scale signals",
      anchors: [
        { value: "800", label: "Database objects migrated" },
        { value: "59 → 9", label: "Service consolidation" },
        { value: "70%", label: "Autonomous vulnerability remediation" },
        { value: "50% → 90%", label: "Test coverage progression" },
      ],
      disclaimer:
        "Illustrative enterprise reference points from bounded modernization workflows. Outcomes depend on scope, governance constraints, and deployment conditions.",
    },
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
    subhead: "",
    legacySubheadDeprecated:
      "A bounded entry point engineered to end with a decision — not another evaluation cycle.",
    executiveFraming:
      "Before the pilot begins, success should be aligned around measurable operational outcomes jointly agreed by engineering, governance, and executive stakeholders.",
    validationMaturity:
      "A successful pilot should validate not only technical capability, but also operational fit, governance readiness, and scalability across enterprise delivery workflows.",
    weeks: [
      {
        week: 1,
        title: "Alignment & setup",
        items: [
          "Scope one modernization use case",
          "Confirm access and security envelope",
          "Align executive ownership and engineering lead",
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
          "Agree go-live roadmap and enterprise scaling path",
        ],
      },
    ],
    kpisTitle: "Pilot success metrics",
    kpis: [
      "Modernization cycle time",
      "Engineering bandwidth reinvested",
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
    eyebrow: "Operational readiness",
    headline:
      "A successful pilot should not end\nwith another evaluation.\nIt should end with a go-live decision.",
    partnership:
      "This pilot is designed as a jointly governed validation initiative between Intesa Sanpaolo and Cognition.",
    intesa: {
      title: "Intesa Sanpaolo commitment",
      items: [
        "Scoped repository access",
        "Executive ownership and engineering lead",
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
    goLiveTransition:
      "The objective of the pilot is not isolated experimentation, but a structured validation path toward broader enterprise deployment.",
  },

  // -------------------------------------------------------------------------
  // PANEL 13 — Final Executive Ask
  // -------------------------------------------------------------------------
  panel13: {
    eyebrow: "Next-step alignment",
    headline: "If value is proven,\nare we aligned to move?",
    body: "After a successful pilot: a defined scale-out roadmap across priority modernization workstreams.",
    commercialAlignment:
      "Before launching the pilot, alignment should exist on what a successful outcome would operationally trigger: expanded deployment scope, stakeholder approval path, governance validation, and commercial go-live readiness.",
    question:
      "Assuming we jointly validate measurable impact during the pilot, what would need to happen internally at Intesa Sanpaolo to support broader deployment?",
    nextSteps: [
      "Confirm executive ownership",
      "Agree pilot success metrics",
      "Define post-pilot go-live timeline",
    ],
  },
};
