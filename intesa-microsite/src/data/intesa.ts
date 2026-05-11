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
  /** When true the card renders in a smaller, supporting tier rather
   * than as a primary tension anchor. */
  secondary?: boolean;
};

export type LabeledCard = {
  title: string;
  body: string;
  tag?: string;
  /** Optional short supporting bullets rendered under the body. Kept
   * small and understated — operational hints, not feature lists. */
  bullets?: string[];
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
      { panel: 7,  addMin: 1.32, addMax: 3.00, note: "Governed modernization workflow + capacity narrated inline (9')" },
      { panel: 8,  addMin: 0.40, addMax: 0.90, note: "Enterprise trust envelope (3')" },
      { panel: 9,  addMin: 0.67, addMax: 1.50, note: "ROI signal (5')" },
      { panel: 10, addMin: 0.67, addMax: 1.50, note: "Itaú enterprise reference (5')" },
      { panel: 11, addMin: 1.33, addMax: 3.00, note: "Pilot + enterprise safeguards (10')" },
      { panel: 12, addMin: 0.94, addMax: 2.10, note: "Decision point — scale-out criteria (7')" },
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
    headline: "Governed modernization execution\nat enterprise scale.",
    subhead: "",
    // Subtle supporting subline under the hero. Frames the next
    // modernization wave as an execution scalability problem rather
    // than a technology strategy debate — sets up the rest of the
    // microsite without revealing the 36% gap yet.
    opener:
      "Intesa’s next modernization wave is no longer only a technology strategy — it is an execution scalability challenge.",
    legacySubheadDeprecated:
      "Modernization leverage at enterprise scale — without proportional headcount growth.",
    framingLine:
      "Intesa is not facing a technology problem. It is facing an execution scalability problem.",
    // Institutional scale signals — explain why Intesa is the target
    // environment for this engagement. Rendered as premium, minimal,
    // letterhead-style markers (no KPI tile, no card, no halo). The
    // visual treatment lives in Panel1Opening.tsx. Five rows: two
    // investment anchors (annual + 2026–2029 triennium), one people
    // anchor, and the current-vs-target migration pairing (~100%
    // target with 64% migrated today).
    scaleContext: "One of Europe’s largest modernization environments.",
    kpis: [
      {
        value: "€1.2B+",
        label: "Annual technology investment",
      },
      {
        value: "€4.6B",
        label: "Technology & growth investment 2026–2029",
      },
      {
        value: "12,000+",
        label: "Technology professionals",
      },
      {
        value: "~100%",
        label: "Cloud migration target by 2029",
      },
      {
        value: "64%",
        label: "Migrated up to now",
      },
    ] as KpiCard[],
    closingNarrative:
      "Intesa’s next modernization wave is no longer only a technology strategy — it is an execution scalability challenge.",
    // Strategic execution-tension anchor. The phrase reads as
    // '36% to 2029' — gap + preposition rendered as a small
    // uppercase caption, year rendered as the dominant display
    // number. The caption above ('Why now') frames the urgency;
    // the sub line below ('Migration gap to close') clarifies
    // what the percentage represents.
    deadline: {
      gap: "36%",
      preposition: "to",
      year: "2029",
      caption: "Why now",
      sub: "Migration gap to close",
    },
    // Cognition-style tension block — replaces the "Why Intesa matters"
    // anchor strip. Operational pressure first, no scale narrative.
    pressure: {
      title: "Large-scale migration pressure",
      bullets: [
        "Final migration wave concentrated in legacy modernization",
        "Repetitive remediation & testing workload",
        "Current delivery capacity does not scale linearly",
      ],
      bottleneck: "",
    },
    sourcesLine:
      "Sources: ISP Piano di Impresa 2026–2029 · investor materials.",
    ctas: [
      { label: "Open the agenda", target: 2, primary: true },
      { label: "Open 4-week pilot", target: 11, primary: false },
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
        helper: "Executive assumptions",
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
    // Strategic execution-tension hero. Frames the remaining gap
    // as the operational hard part of the migration, not as a
    // descriptive milestone.
    headline: "The remaining 36% is the hard part.",
    // Subtle supporting line under the hero. Links cloud migration
    // to structural efficiency gains so the urgency reads as value
    // capture risk, not as a generic deadline statement.
    support:
      "Cloud migration is directly linked to structural efficiency gains. Delayed execution risks delaying value capture.",
    // Current-state → target-state anchors flanking a tension zone.
    // The component renders 64% on the left and ~100% by 2029 on
    // the right, with the remaining 36% gap visualised between
    // them as the operational tension being closed.
    states: [
      {
        value: "64%",
        label: "Cloud-based applications today",
      },
      {
        value: "~100%",
        label: "Target by 2029",
      },
    ],
    // The tension zone between the two states. Reads as the gap
    // being closed, not as a separate KPI tile.
    gap: {
      value: "36%",
      label: "Remaining migration",
    },
    // Economic consequence marker. Frames the run-rate efficiency
    // gain as value capture tied to Intesa’s own cloud / isytech
    // execution — NOT as a Devin outcome. Understated chip, not
    // a KPI tile.
    economicMarker: {
      caption: "Linked value capture",
      value: "~€380M",
      label: "Run-rate savings by 2030 from isytech / cloud extension",
    },
    closing:
      "The question is not whether modernization continues. The question is whether execution capacity scales fast enough.",
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
    eyebrow: "Discovery Signals",
    // Conversational intro that softens the hero statement so the slide
    // reads as a synthesis of real conversations rather than a polished
    // keynote insight.
    discoveryIntro: "One thing we consistently heard in discovery…",
    headline:
      "Modernization pressure is becoming\nan execution-capacity issue.",
    // High-impact numeric tension signal anchored at the top of the
    // slide. The 36% gap between today's cloud-based estate and the
    // 2029 target frames the urgency before the bullets land.
    tensionSignal: {
      value: "~36%",
      label: "Migration gap remaining before 2029 target",
    },
    subhead: "",
    legacySubheadDeprecated:
      "Patterns commonly seen across large financial institutions — surfaced as observations, hypotheses, and alignment areas. Never assumed.",
    // Numeric discovery-style bullets. Items flagged `assumption` are
    // marked "working assumption to validate" inline; the rest are
    // signals already validated in pre-meeting discovery.
    // Convergence pressure bullets — modernization, scalability, AI
    // governance, and delivery velocity all landing on the same
    // execution capacity.
    // Operationally specific discovery synthesis. Each signal pairs
    // a short conceptual title with a one-line operational reading
    // — frames modernization pressure as a real execution-capacity
    // issue, not as web research. The 4 themes converge on the same
    // operating constraint:  remaining migration is harder, legacy /
    // cloud coexistence is longer, AI-assisted execution needs
    // review throughput to scale with it, and the opportunity is
    // capacity redeployment rather than headcount reduction.
    discoverySignals: [
      {
        value: "Final migration wave",
        label:
          "The remaining 36% is likely more remediation-heavy, test-heavy and governance-heavy.",
        assumption: false,
      },
      {
        value: "Dual-operating pressure",
        label:
          "Longer coexistence between legacy and cloud environments increases operational complexity.",
        assumption: false,
      },
      {
        value: "Review bottlenecks",
        label:
          "AI-assisted execution only creates value if review, governance and approval workflows scale with it.",
        assumption: false,
      },
      {
        value: "Capacity redeployment",
        label:
          "The opportunity is not replacing engineers — it is redeploying scarce capacity toward strategic engineering work.",
        assumption: false,
      },
    ],
    // Subtle, italic, discovery-oriented footer. Anchors the
    // working assumption to be validated by the pilot — governed
    // AI execution can lift modernization throughput without
    // weakening control.
    workingAssumption:
      "Working assumption to validate: governed AI execution can increase modernization throughput without weakening control.",
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
  // PANEL 4 — Future-State Engineering Flow
  //
  // Operating-model transformation visual: left column (Traditional
  // execution, muted/constrained), center bridge (Devin execution
  // layer — soft animated flow, NOT an architecture diagram), and
  // right column (Governed AI execution, brighter, layered cards with
  // subtle glow). The section is meant to be one of the most visually
  // memorable moments in the microsite — premium, cinematic, asymmetric.
  // -------------------------------------------------------------------------
  panel4: {
    eyebrow: "Future-State Engineering Flow",
    headline: "Modernization execution\nbecomes scalable.",
    // Subline under the hero. Frames the future-state as
    // governed scaling of repetitive execution — explicitly
    // not autonomous AI, explicitly not weakened governance.
    subhead:
      "Devin scales repetitive execution while existing governance remains intact.",
    // Embedded operational chips that sit inline between the
    // parallel modernization streams and the 6× acceleration
    // anchor. Reads as the validation checkpoints inside the
    // future-state flow, not as a separate KPI block. The
    // "Human approval" chip is flagged `gate: true` so the
    // component renders it as the controlled approval gate
    // — stronger contrast, orange tint, no afterthought.
    flowMetrics: [
      { label: "PR-ready delivery" },
      { label: "Reviewable diffs" },
      { label: "Tests generated" },
      { label: "CI validation" },
      { label: "Human approval", gate: true },
      { label: "Traceable execution history" },
    ],
    // Small italic footer rendered under the closing line.
    // Anchors the governance message: AI scales execution
    // throughput; decision authority stays with Intesa.
    authorityLine: "AI scales execution — not decision authority.",
    // Left column — current-state pain signals. Short, operational,
    // not abstract. Visually muted/constrained on the page.
    current: {
      label: "Traditional execution",
      caption: "Today",
      items: [
        "Manual remediation",
        "Linear review overhead",
        "Repetitive upgrade activity",
        "Fragmented documentation",
        "Slow modernization throughput",
      ],
    },
    // Center bridge — Devin execution layer. Reads as an execution
    // capability layer, not as a system architecture. Sublabel keeps
    // the framing operational ("orchestrated", not "AI agent").
    bridge: {
      label: "Devin execution layer",
      sublabel: "Governed orchestration",
    },
    // Right column — future-state operating signals. Brighter, more
    // energy, slightly elevated. Same parallel structure as the left
    // column so the BEFORE / AFTER comparison reads instantly.
    future: {
      label: "Governed AI execution",
      caption: "With Devin",
      items: [
        "Parallel modernization workflows",
        "Automated remediation & testing",
        "Governed PR-based execution",
        "Continuously updated documentation",
        "Higher modernization throughput",
      ],
      // Cinematic acceleration anchor that emerges from inside the
      // future-state area. Reads as an operational signal coming out
      // of the new execution model — not as a marketing KPI tile.
      anchor: {
        metric: "6×",
        label: "Modernization acceleration",
        caption: "Reference deployment",
      },
      // Secondary operational validation signals. Small, scannable,
      // sit under the 6× anchor without competing with it.
      signals: [
        { value: "20–30%", label: "Throughput increase" },
        { value: "15%", label: "Lead-time improvement" },
        { value: "70%", label: "Vulnerability remediation automated" },
      ],
    },
    // Closing line — single sentence, executive tone. Anchors the
    // transformation back into the pilot narrative without becoming
    // a roadmap or a vendor claim.
    closing:
      "Execution capacity stops being the constraint — governance and review remain in place.",
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
    eyebrow: "Mainframe Modernization Demo",
    // Strategic anchor — tied directly to the 2029 migration gap and
    // framed as an execution-model question, not a feature walkthrough.
    headline:
      "The remaining 36% requires\na different execution model.",
    // Subtle supporting context line. Sharper, executive, operational
    // — frames the workflow as governed and repeatable at scale rather
    // than describing the technical work itself.
    support:
      "Governed modernization workflow for repeatable execution at scale.",
    // Understated operational proof, NOT a KPI tile. Reads as a
    // credibility chip beneath the narrative.
    referenceDeployment: {
      caption: "Reference deployment",
      metric: "6×",
      label: "modernization acceleration",
    },
    // Right column — vertical execution stream. Six bounded steps,
    // last one ("Human approval") is the governance enforcement point.
    workflow: {
      steps: [
        { label: "Repo scan", tone: "default" as const },
        { label: "Migration plan", tone: "default" as const },
        { label: "Code transformation", tone: "accent" as const },
        { label: "Test generation", tone: "default" as const },
        { label: "Governed PR", tone: "accent" as const },
        { label: "Human approval", tone: "governance" as const },
      ],
    },
    // Single executive closing — preserved from prior revision.
    closingStatement: "Governed execution at enterprise scale.",
    // "What we are validating" — operational lens for the demo.
    // Frames the walkthrough as a measurement exercise (lead time,
    // review effort, regression risk, repeatability) rather than
    // a feature tour. Rendered as a thin chip row under the demo
    // body, not as a KPI tile block.
    validating: {
      label: "What we are validating",
      items: [
        "Time to PR-ready",
        "Review effort",
        "Tests passing",
        "Regression risk",
        "PR acceptance",
        "Repeatability across similar workflows",
      ],
    },
    repoLink: {
      label: "github.com/sartan83/aws-mainframe-modernization-carddemo",
      url: "https://github.com/sartan83/aws-mainframe-modernization-carddemo",
    },
    repoDisclaimer:
      "Representative repo. No Intesa source code used.",
  },

  // -------------------------------------------------------------------------
  // PANEL 6 — Governed Acceleration
  //
  // Reframed from a generic "Built for Enterprise" feature page to a
  // governance-acceleration narrative aligned with the rest of the
  // microsite. The panel communicates that modernization acceleration
  // can operate inside banking governance — not that the product has
  // enterprise features. Three pillars instead of five feature cards,
  // larger typography, more breathing room, no compliance badges.
  // -------------------------------------------------------------------------
  panel6: {
    eyebrow: "Governed acceleration",
    headline: "Scaling modernization\nwithout scaling risk.",
    subhead: "Built for regulated engineering environments.",
    legacySubheadDeprecated:
      "The same controls a regulated bank already enforces — applied to AI-assisted engineering execution from day one.",
    pillars: [
      {
        title: "Human-in-the-loop execution",
        body: "PR-based workflows with human approvals embedded in delivery.",
        bullets: [
          "Review gates",
          "Approval ownership",
          "Existing SDLC preserved",
        ],
      },
      {
        title: "Isolated execution environments",
        body: "Dedicated execution environments separated from production systems.",
        bullets: [
          "VPC-compatible deployment",
          "Repo-scoped execution",
          "Environment isolation",
        ],
      },
      {
        title: "Governed enterprise controls",
        body: "Auditability, access control and traceable execution history.",
        bullets: [
          "Execution traceability",
          "Permission boundaries",
          "Full PR audit history",
        ],
      },
    ] as LabeledCard[],
    // Subtle reference-deployment proof signal. Rendered as a
    // single low-noise line above the closing — confirms that
    // the governance model has already produced measurable
    // operational outcomes in a comparable banking environment.
    // Intentionally understated: NOT a KPI tile, NOT a security
    // checklist.
    proofMetric: {
      value: "70%",
      label: "Vulnerability remediation automated",
      caption: "Reference deployment",
    },
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
    headline: "Modernization acceleration\nconverts into capacity redeployment.",
    // Subline + isytech bridge + governance note.
    //   subhead       short executive line, sits under the hero
    //   bridge        anchors capacity redeployment back to Intesa's
    //                 own structural efficiency programme, so the
    //                 pilot reads as validating the execution layer
    //                 — not as proposing a parallel value stream
    //   redeploymentNote
    //                 explicit governance reassurance — capacity
    //                 redeployment, NOT headcount reduction
    subhead:
      "Even modest throughput improvements become material at Intesa scale.",
    bridge:
      "Cloud / isytech execution is tied to structural efficiency gains; the pilot should validate whether governed AI can accelerate the execution layer.",
    redeploymentNote: "Capacity redeployment, not headcount reduction.",
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
        devEqLarge: "62",
        devEqLargeLabel: "developer-equivalents",
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
        devEqLarge: "198",
        devEqLargeLabel: "developer-equivalents",
        reclaimedEur: "~€18.8M",
        footnote:
          "Uplift kept at the middle of McKinsey 20–45% band. Rollout at Gartner 2028 trajectory, discounted.",
      },
      {
        key: "best",
        title: "Best",
        subtitle: "McKinsey upper-band, scaled adoption",
        applicableWorkPct: 35,
        upliftPct: 40,
        adoptionPct: 90,
        reclaimedDevDays: "~91,500",
        reclaimedDevEquivalents: "≈ 416 developer-equivalents",
        devEqLarge: "416",
        devEqLargeLabel: "developer-equivalents",
        reclaimedEur: "~€39.5M",
        footnote:
          "McKinsey upper-band reference. Illustrative ceiling, not a target.",
      },
    ],
    // Inline contextual hint surfaced next to the "Uplift" label inside
    // each scenario tile. Demystifies what the percentage represents
    // without adding a paragraph of explanatory copy.
    upliftHint:
      "% productivity gain on applicable work — McKinsey 20–45% reference band.",
    headlineRange: {
      eur: "~€6–40M / year",
      devDays: "~14k–92k dev-days / year redeployed",
      devEquivalents: "≈ 62–416 developer-equivalents",
      devEqLarge: "62–416",
      devEqLargeLabel: "developer-equivalents / year",
    },
    eurFraming:
      "Capacity equivalent to ~€6–40M / year redirected toward modernization priorities.",
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
    eyebrow: "Banking proof at scale",
    // Single enterprise banking proof point (Itaú). The section is
    // intentionally focused: Gartner-validated operational outcomes
    // on top, adoption + scale signals below, one small interpretive
    // footer. No vendor wall, no second customer card.
    headline: "This is already producing\nmeasurable banking outcomes.",
    itau: {
      logoSrc: "logos/itau.svg",
      logoAlt: "Itaú",
      // Hero anchor — the single dominant modernization acceleration
      // multiplier. Apple-keynote scale; carries the emotional impact
      // of the slide.
      heroMetric: {
        metric: "6×",
        label: "Faster modernization delivery",
      },
      // Tier 1 — Gartner-validated operational outcomes (primary).
      outcomeMetrics: [
        { metric: "20–30%", label: "Throughput increase" },
        { metric: "15%", label: "Lead-time improvement" },
        { metric: "25%", label: "Fewer testing errors" },
        { metric: "70%", label: "Vulnerability remediation automated" },
      ],
      // Tier 2 — Adoption signal. Reduced to a single anchor
      // (engineering team adoption) so the secondary tier reads
      // as a fifth supporting metric rather than a second KPI
      // sub-block. The "17,000+ technology staff" tile was
      // removed because the canonical metric set anchors the
      // proof on operational outcomes, not on organisational
      // headcount.
      adoptionMetrics: [
        { metric: "75%", label: "Engineering team adoption" },
      ],
      sourceLabel: "Source: Gartner Research · doc 7778353",
      sourceUrl:
        "https://www.gartner.com/document-reader/document/7778353?ref=solrAll&refval=553684491&",
      interpretiveFooter:
        "Governed AI workflows already operating inside large-scale banking engineering environments.",
    },
    disclaimer:
      "Illustrative reference metrics from a separate enterprise banking environment.",
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
  // PANEL 11 — 4-Week Pilot (Scope · Validation · Enterprise safeguards)
  //
  // Cognition reset: 3 blocks. The standalone Enterprise-Ready
  // Execution panel has been merged in here as the third block —
  // the governance/reassurance signals support the pilot directly
  // rather than living on a separate slide. No weekly timeline, no
  // roadmap graphics, no swimlanes. The presenter narrates pacing
  // live.
  // -------------------------------------------------------------------------
  panel11: {
    eyebrow: "4-week pilot",
    headline: "Validate before scaling.",
    // Supporting subline. Frames the pilot as a bounded validation
    // sprint with explicit safety constraints — not a transformation
    // programme, not a sandbox experiment, not a roadmap.
    subhead:
      "A 4-week controlled validation sprint to prove whether governed modernization execution can scale safely.",
    // Measured KPIs row — explicit operational measurement frame
    // that the pilot will baseline in Week 1 and report against in
    // Week 4. Rendered as a thin uppercase chip row at the top of
    // the pilot, so each week below reads against an actual KPI
    // set rather than against generic "success metrics".
    measuredKpis: {
      label: "Measured KPIs",
      items: [
        "Lead time to PR-ready",
        "PR acceptance rate",
        "Review overhead",
        "Tests passing",
        "Vulnerabilities remediated",
        "Migration blockers cleared / week",
        "Engineering hours redeployed",
      ],
    },
    // Week-by-week operational validation plan. Four equally weighted
    // blocks with a clear timeline progression — small, controlled,
    // operational; not a transformation programme. Activities reworked
    // to map directly onto the Measured KPIs row above (baseline →
    // controlled execution → validation → executive decision).
    blocks: [
      {
        week: "Week 1",
        title: "Baseline & workflow selection",
        items: [
          "Select 3–4 bounded modernization workflows",
          "Establish baseline lead time and review effort",
          "Define governance boundaries",
          "Confirm success metrics",
        ],
      },
      {
        week: "Week 2",
        title: "Controlled execution",
        items: [
          "Run Devin on selected modernization workflows",
          "Generate PRs, tests and remediation evidence",
          "Measure time to PR-ready",
          "Track review effort and issues",
        ],
      },
      {
        week: "Week 3",
        title: "Validation & adoption",
        items: [
          "Compare results against baseline",
          "Measure PR acceptance and test quality",
          "Identify review bottlenecks",
          "Validate team confidence and repeatability",
        ],
      },
      {
        week: "Week 4",
        title: "Executive decision",
        items: [
          "Present acceleration signals",
          "Validate governance fit",
          "Quantify capacity redeployment",
          "Align on scale-out criteria and next meeting",
        ],
      },
    ],
    // Decision criteria module — what the executive review at the
    // end of Week 4 will validate before scale-out. Rendered as a
    // small uppercase-titled list below the weekly blocks; reads as
    // the executive gate, not as additional pilot activities.
    decisionCriteria: {
      label: "Decision criteria",
      caption: "Validated at the end of Week 4",
      items: [
        "Throughput improvement",
        "Review overhead acceptable",
        "PR quality accepted by engineering",
        "Governance model validated",
        "Repeatable workflow patterns identified",
      ],
    },
  },

  // -------------------------------------------------------------------------
  // PANEL 12 — Decision Point (final scale-out logic)
  //
  // Replaces the earlier "Proposed Next Step" panel which repeated
  // pilot logistics. The closing slide now defines the scale-out
  // decision logic: what the pilot validates, what scale-out
  // requires, and the strategic objective. No fluff, no
  // repetition, no consulting energy.
  // -------------------------------------------------------------------------
  panel12: {
    eyebrow: "Decision point",
    headline: "The decision is not whether AI\ncan write code.",
    // Subline anchors the actual decision being asked of the room
    // — whether governed AI execution can safely accelerate the
    // remaining modernization wave.
    subhead:
      "The decision is whether governed AI execution can safely accelerate Intesa’s remaining modernization wave.",
    // Two-block commitment ask. Reads as the explicit next step
    // and the follow-up checkpoint — not as additional pilot
    // mechanics. Premium executive minimalism: thin top-rule,
    // small uppercase label, single short sentence per block.
    commitment: [
      {
        label: "Recommended next step",
        value: "Launch a 4-week controlled modernization validation sprint.",
      },
      {
        label: "Follow-up decision meeting",
        value:
          "Review measured outcomes, confirm scale-out criteria, and align on broader deployment path.",
      },
    ],
    // Three final action bullets that crystallise what advancing
    // looks like before leaving the room. Compact, executive,
    // checkbox-style — NOT a project plan.
    actionBullets: {
      label: "To advance",
      items: [
        "Select 3–4 modernization workflows",
        "Confirm engineering and governance owners",
        "Schedule executive review at the end of week 4",
      ],
    },
    strategicObjective: {
      label: "Strategic objective",
      value: "Accelerate the remaining migration wave toward 2029 targets.",
    },
  },
};
