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
    headline:
      "Intesa is not evaluating AI productivity —\nit is racing two quantified execution clocks.",
    subhead: "",
    // Subtle supporting subline under the hero. Frames the two
    // simultaneous economic pressures both depend on whether SDLC
    // execution capacity scales.
    opener:
      "Cloud / isytech value capture and a 15% SDLC efficiency ambition both depend on whether execution capacity scales.",
    legacySubheadDeprecated:
      "Modernization leverage at enterprise scale — without proportional headcount growth.",
    framingLine:
      "Intesa is not facing a technology problem. It is facing an SDLC execution scalability problem.",
    // Institutional scale signals — explain why Intesa is the target
    // environment for this engagement. Rendered as premium, minimal,
    // letterhead-style markers (no KPI tile, no card, no halo). The
    // visual treatment lives in Panel1Opening.tsx. SDLC north star
    // markers lead (15% / ~€70M / ~6,900 dev capacity), followed by
    // the migration anchor and the structural investment anchor.
    scaleContext:
      "Mainframe-to-cloud modernization and isytech extension are tied to structural efficiency gains.",
    kpis: [
      {
        value: "15%",
        label: "SDLC efficiency ambition",
      },
      {
        value: "~€70M",
        label: "Target by 2028",
      },
      {
        value: "~6,900",
        label: "Development capacity",
      },
      {
        value: "~100%",
        label: "Cloud-based applications by 2029",
      },
      {
        value: "Cloud / isytech",
        label: "Efficiency unlock",
      },
      {
        value: "€1.2B+",
        label: "Annual technology investment",
      },
    ] as KpiCard[],
    closingNarrative:
      "Intesa’s next modernization wave is not only a cloud migration challenge — it is an SDLC execution scalability challenge.",
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
    headline:
      "The remaining 36% is where\nexecution risk concentrates.",
    // Supporting line — anchors the dual-track pressure: cloud
    // migration is one vector, SDLC efficiency is the other. The
    // 15% / ~€70M is Intesa's own quantified ambition, not a
    // Devin claim.
    support:
      "The question is no longer whether Intesa has a modernization strategy. It is whether SDLC execution capacity scales fast enough to capture value on time.",
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
    // SDLC efficiency ambition marker — Intesa's own quantified
    // efficiency target. Replaces the prior €380M run-rate marker
    // because the 15% / ~€70M data is more directly relevant to
    // governed SDLC execution. Understated chip, not a KPI tile.
    economicMarker: {
      caption: "SDLC efficiency ambition",
      value: "15% / ~€70M",
      label: "Target by 2028 — Intesa’s own quantified ambition",
    },
    // Dual-track pressure visual data — cloud migration on track 1,
    // SDLC efficiency on track 2. Reads as two simultaneous value
    // capture vectors converging on the same execution capacity.
    dualTrack: {
      label: "Two simultaneous pressures on the same execution capacity",
      tracks: [
        {
          key: "cloud",
          title: "Cloud migration value capture",
          target: "~100% cloud-based by 2029",
          gap: "Mainframe / isytech / cloud extension linked to structural efficiency gains",
        },
        {
          key: "sdlc",
          title: "15% SDLC efficiency ambition",
          target: "~€70M target by 2028",
          gap: "Largest effort zone: coding + testing/release",
        },
      ],
      callout: "Execution delay risks delaying value capture.",
    },
    closing:
      "The question is not whether modernization continues. The question is whether SDLC execution capacity scales fast enough.",
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
    eyebrow: "Validation before pilot scope",
    // Repositioned to sit immediately AFTER the SDLC Execution Map.
    // The map shows quantitatively that 70% of SDLC effort sits in
    // coding + testing/release. This section then pauses and asks
    // whether that execution zone is the right starting point for
    // the pilot — and what would need to be true around it
    // (workflow selection · review scalability · decision
    // ownership). It is an executive alignment checkpoint, not a
    // discovery slide.
    discoveryIntro:
      "Based on the SDLC data, the hypothesis is to start where effort concentrates most: coding, testing and release.",
    headline:
      "Before proposing a pilot,\nvalidate the starting point.",
    // Four open executive validation questions. Each card has a
    // short title, the question itself, and a quiet supporting
    // note describing what the answer would unlock. Cards are
    // intentionally minimal — they should feel like a live
    // discovery checkpoint, not a research slide. The 15% / €70M
    // question is intentionally removed — the SDLC Execution Map
    // already grounds the conversation in that ambition.
    validationCards: [
      {
        key: "starting",
        title: "Starting point",
        question:
          "Does coding + testing/release feel like the right first execution zone to validate?",
        note:
          "Confirms whether the 70% SDLC concentration is the right pilot focus.",
      },
      {
        key: "workflow",
        title: "Workflow selection",
        question:
          "Which workflows inside that zone are repetitive enough to measure safely?",
        note:
          "Focuses the pilot on bounded modernization, remediation, testing, release-readiness or PR-ready delivery workflows.",
      },
      {
        key: "review",
        title: "Review scalability",
        question:
          "If Devin increases PR-ready output, where would review effort become constrained?",
        note:
          "Ensures the pilot measures review effort, PR acceptance and rework — not just execution speed.",
      },
      {
        key: "ownership",
        title: "Decision ownership",
        question:
          "Who needs to be involved to turn pilot evidence into a scale-out decision?",
        note:
          "Connects technical validation to executive commitment and follow-up.",
      },
    ],
    validationFooter:
      "Goal: align on the right starting point before defining pilot scope.",
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
        value: "15% efficiency ambition",
        label:
          "Intesa is targeting ~€70M of SDLC efficiency by 2028.",
        assumption: false,
      },
      {
        value: "70% execution zone",
        label:
          "Coding and testing/release represent the largest concentration of SDLC effort (43% + 27%).",
        assumption: false,
      },
      {
        value: "Modernization pressure",
        label:
          "The remaining migration wave increases remediation, test, and release complexity.",
        assumption: false,
      },
      {
        value: "Review bottlenecks",
        label:
          "If AI accelerates execution, review and approval throughput must scale with it.",
        assumption: false,
      },
      {
        value: "Capacity redeployment",
        label:
          "The opportunity is not replacing engineers — it is redeploying scarce engineering capacity away from repetitive execution work.",
        assumption: false,
      },
    ],
    // Subtle, italic, discovery-oriented footer. Anchors the
    // working assumption to be validated by the pilot — governed
    // AI execution can create measurable contribution toward the
    // 15% SDLC efficiency ambition without weakening control.
    workingAssumption:
      "Working assumption to validate: governed AI execution can create measurable contribution toward the 15% SDLC efficiency ambition without weakening control.",
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
    headline:
      "Execution becomes parallel\nbefore governance becomes the bottleneck.",
    // Subline under the hero. Anchors the section on the
    // OPERATING-MODEL shift (linear → parallel workstream),
    // not on governance or review controls — those live in
    // Panel 6 (Governed Acceleration).
    subhead:
      "Devin turns repetitive SDLC work into parallel, reviewable work units across coding, testing and release.",
    // SDLC phase anchors rendered as subtle labels under the
    // future-state flow. Maps Devin's execution layer onto
    // Intesa's own SDLC effort distribution (43% coding +
    // 27% testing/release = 70% execution zone).
    sdlcAnchors: [
      { value: "43%", label: "Coding" },
      { value: "27%", label: "Testing & release" },
      { value: "70%", label: "Execution zone" },
    ],
    // Embedded operational chips that sit inline between the
    // parallel SDLC streams and the 6× acceleration anchor.
    // Reads as the review-package elements Devin prepares —
    // diff, summary, tests, CI evidence, execution trace,
    // documentation context — so review starts from a better
    // package, not from a blocker. The "Human approval" chip
    // is flagged `gate: true` so the component renders it as
    // the controlled approval gate — stronger contrast,
    // orange tint, no afterthought.
    flowMetrics: [
      { label: "Structured diffs" },
      { label: "PR summary" },
      { label: "Test evidence" },
      { label: "CI status" },
      { label: "Execution trace" },
      { label: "Human approval", gate: true },
    ],
    // Small italic footer rendered under the closing line.
    // Anchors the governance message: Devin scales execution
    // and reviewability; decision authority stays with Intesa.
    authorityLine: "Devin scales execution and reviewability — not decision authority.",
    // Left column — current-state pain signals. Short, operational,
    // not abstract. Visually muted/constrained on the page.
    current: {
      label: "Today — linear execution",
      caption: "Today",
      items: [
        "Sequential remediation",
        "Manual test creation",
        "Documentation reconstruction",
        "Slow PR readiness",
      ],
    },
    // Center bridge — Devin execution layer. Reads as an execution
    // capability layer, not as a system architecture. Sublabel keeps
    // the framing operational ("orchestrated", not "AI agent").
    bridge: {
      label: "Devin execution layer",
      sublabel: "Governed SDLC orchestration",
    },
    // Right column — future-state operating signals. Brighter, more
    // energy, slightly elevated. Same parallel structure as the left
    // column so the BEFORE / AFTER comparison reads instantly. Items
    // map directly onto the SDLC phases Devin executes inside the
    // 70% execution zone: coding, testing, and PR-ready delivery.
    future: {
      label: "Devin execution layer",
      caption: "Devin",
      items: [
        "Parallel sessions",
        "Repo understanding",
        "Code transformation",
        "Test generation",
        "Remediation",
        "PR preparation",
      ],
      // Cinematic acceleration anchor — premium scale signal,
      // sits at the bottom of the right column. Reduced from a
      // full anchor block to a single inline metric.
      anchor: {
        metric: "6×",
        label: "Modernization acceleration",
        caption: "Reference deployment",
      },
      // Reduced to a single secondary signal per the compaction
      // pass — only 6× and 20–30% are visible on this slide.
      signals: [
        { value: "20–30%", label: "Throughput increase" },
      ],
    },
    // Future-state PR-ready workstream — third column. Reads as
    // the operating-model destination: multiple parallel reviewable
    // PRs flowing into the existing SDLC, not a governance overlay.
    reviewable: {
      label: "Future state — PR-ready workstream",
      caption: "Future state",
      items: [
        "Multiple reviewable PRs",
        "Test-backed output",
        "Faster throughput",
        "Measurable review effort",
      ],
    },
    // Closing line — single sentence, executive tone. Anchors the
    // transformation back into the pilot narrative without becoming
    // a roadmap or a vendor claim. Frames review as accelerated by
    // a better starting package, not removed.
    closing:
      "Devin scales repetitive execution into PR-ready workstreams — not just individual coding tasks.",
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
    eyebrow: "SDLC Execution Demo",
    // Strategic anchor — tied directly to the 70% SDLC execution
    // zone, framed as a controlled coding/testing example, not a
    // generic product walkthrough.
    headline:
      "From coding effort to\nreviewable, test-backed PR.",
    // Subtle supporting context line. Anchors the demo on Intesa's
    // own largest SDLC execution zones: 43% coding + 27% testing/release.
    support:
      "A bounded modernization workflow mapped to Intesa’s largest SDLC execution zones: coding and testing/release.",
    // SDLC anchor chip — subtle reference to the effort zone the
    // demo focuses on. Rendered as a small caption alongside the
    // reference deployment metric, not as a competing KPI.
    sdlcFocus: "Focus area: 43% coding + 27% testing/release",
    // Executive talk-track support line — frames the demo as a
    // controlled SDLC compression example, not a feature tour.
    talkTrack:
      "This is not a generic product tour. It is a controlled example of how repetitive SDLC execution can be compressed into reviewable, test-backed work.",
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
    closingStatement: "Governed SDLC execution at enterprise scale.",
    // "What this demo validates" — operational lens mapped onto
    // the SDLC execution zones. Frames the walkthrough as a
    // measurement exercise (time to PR-ready, code transformation,
    // test generation, review package quality, rework, repeatability)
    // rather than a feature tour. Rendered as a thin chip row under
    // the demo body, not as a KPI tile block.
    validating: {
      label: "What this demo validates",
      items: [
        "Time to PR-ready",
        "Code transformation",
        "Test generation",
        "Review package quality",
        "Rework required",
        "Repeatability",
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
    headline:
      "Control is not added after acceleration —\nit is built into the execution envelope.",
    subhead:
      "Final approval remains human, while Devin makes the review package more structured, traceable and measurable.",
    legacySubheadDeprecated:
      "The same controls a regulated bank already enforces — applied to AI-assisted engineering execution from day one.",
    pillars: [
      {
        title: "Review package",
        body: "",
        bullets: [
          "Structured diffs",
          "PR summary",
          "Test evidence",
          "Execution trace",
        ],
      },
      {
        title: "Control model",
        body: "",
        bullets: [
          "Human approval gates",
          "Existing SDLC preserved",
          "Engineering accountability remains",
        ],
      },
      {
        title: "Enterprise envelope",
        body: "",
        bullets: [
          "Dedicated VM per session",
          "Repo-scoped execution",
          "VPC-compatible",
          "Auditability",
        ],
      },
    ] as LabeledCard[],
    // Key phrase rendered above the closing as a thin italic
    // reframe line — review is not removed, it is made faster
    // and more measurable.
    reviewReframe:
      "Devin does not remove review. It makes review faster to perform, easier to evidence and safer to govern.",
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
    eyebrow: "ROI / Upside Potential",
    headline:
      "The €70M target is the ambition —\nnot the ceiling.",
    // Subline — frames the ROI question as net efficiency across
    // the full execution path (coding, testing, release, PR-ready
    // packaging, review). NOT a coding-speed-only story.
    subhead:
      "If governed AI improves net efficiency across the 70% execution zone, the path to target becomes measurable and upside becomes visible.",
    // Hero — four executive numbers. The fourth (~21%) makes the
    // ROI math visible: to reach €70M on a €327M execution-effort
    // zone, the pilot must demonstrate ~21% net efficiency after
    // review and rework. Reads in <10 seconds.
    hero: {
      numbers: [
        {
          key: "ambition",
          value: "15%",
          label: "Official SDLC efficiency ambition",
        },
        {
          key: "target",
          value: "~€70M",
          label: "Target by 2028",
        },
        {
          key: "zone",
          value: "70%",
          label: "SDLC effort in coding + testing/release",
        },
        {
          key: "netEfficiency",
          value: "~21%",
          label: "Net efficiency required on execution zone to reach target",
        },
      ],
      // 43% + 27% = 70% execution zone — segmented bar attached
      // to the 70% number.
      executionZone: {
        parts: [
          { value: "43%", label: "Coding" },
          { value: "27%", label: "Testing & release" },
        ],
        total: "70% execution zone",
      },
    },
    // Implied-model blocks — €467M baseline and €327M execution
    // zone, both explicitly labelled as derived figures.
    valueStrip: {
      label: "Implied model derived from 15% / €70M ambition",
      blocks: [
        {
          key: "baseline",
          value: "~€467M",
          label: "Implied SDLC baseline",
          note: "€70M / 15%",
        },
        {
          key: "executionZone",
          value: "~€327M",
          label: "Execution-effort zone",
          note: "70% of implied SDLC baseline",
        },
      ],
    },
    // Formula — explicit, visible. The "after review and rework"
    // clause is the key correction: ROI is NOT coding speed only.
    formula: {
      label: "ROI contribution formula",
      value:
        "ROI contribution = addressable SDLC execution effort × workflow applicability × adoption × net efficiency after review and rework",
    },
    // Where Devin creates SDLC leverage — five compact stages
    // showing that ROI accrues across the full execution path,
    // not only at the coding step.
    leverageStages: {
      label: "Where Devin creates SDLC leverage",
      items: [
        {
          key: "transformation",
          title: "Code transformation",
          note: "reduces repetitive implementation effort",
        },
        {
          key: "testing",
          title: "Test generation",
          note: "improves validation speed and test coverage",
        },
        {
          key: "remediation",
          title: "Remediation",
          note: "accelerates bug and vulnerability fixes",
        },
        {
          key: "packaging",
          title: "PR-ready packaging",
          note:
            "creates structured diffs, summaries, test evidence and execution trace",
        },
        {
          key: "review",
          title: "Review acceleration",
          note:
            "human approval remains, but review starts from a better package",
        },
      ],
    },
    // External benchmark support — compact row, two cards.
    // Anchors the scenario ladder on external research without
    // overclaiming. Gartner card frames why the value story has
    // to extend beyond coding speed; McKinsey card supports the
    // 16–30% productivity and 31–45% quality range that makes
    // the upside trajectory directionally credible. No invented
    // percentages, no "Gartner says 25–30%".
    benchmarks: {
      label: "External benchmark support",
      cards: [
        {
          key: "gartner",
          source: "Gartner",
          body:
            "Code-generation time savings are only the starting point; the full value story must connect AI coding assistants to broader engineering and organizational outcomes.",
        },
        {
          key: "mckinsey",
          source: "McKinsey",
          body:
            "Leading AI-driven software organizations report 16–30% improvements in productivity / time-to-market and 31–45% improvement in software quality.",
        },
      ],
      note:
        "External benchmarks support the trajectory logic; the pilot validates Intesa-specific contribution.",
    },
    // Scenario ladder — four points across the €327M execution
    // zone. The €70M target is the official ambition, not the
    // ceiling. Reads as trajectory-to-validate, not as guaranteed
    // savings.
    scenarioLadder: {
      label: "Efficiency scenarios across coding, testing/release and PR-ready delivery",
      caption: "Net efficiency on the ~€327M execution zone",
      anchor: "Target line: ~€70M (official ambition, not ceiling)",
      scenarios: [
        {
          key: "conservative",
          title: "Conservative",
          efficiency: "10%",
          value: "~€33M",
          tone: "conservative" as const,
        },
        {
          key: "target",
          title: "Target-aligned",
          efficiency: "~21%",
          value: "~€70M",
          tone: "target" as const,
        },
        {
          key: "upside",
          title: "Upside",
          efficiency: "25%",
          value: "~€82M",
          tone: "upside" as const,
        },
        {
          key: "highUpside",
          title: "High-upside",
          efficiency: "30%",
          value: "~€98M",
          tone: "highUpside" as const,
        },
      ],
      credibilityLine:
        "McKinsey top-performer benchmarks make the 25–30% upside trajectory credible, but Intesa-specific validation must come from the pilot.",
      disclaimers: [
        "These are trajectory scenarios to validate — not guaranteed savings.",
        "The €70M target is the official ambition, not the ceiling.",
        "The pilot does not need to prove the full upside immediately. It needs to validate whether workflow-level improvements make the target trajectory credible.",
      ],
    },
    // Pilot evidence row — operational metrics that prove whether
    // the curve is realistic. Replaces the prior single pilotProof
    // row with a more comprehensive list covering testing and
    // remediation, not only PR mechanics.
    pilotProof: {
      label: "Pilot evidence — what the curve depends on",
      items: [
        "Time to PR-ready",
        "Review effort per PR",
        "PR acceptance rate",
        "Test pass rate",
        "Rework required",
        "Release-readiness evidence",
        "Vulnerabilities remediated",
        "Engineering hours redeployed",
      ],
    },
    // Final ROI message — the single executive line that anchors
    // the entire section.
    closing:
      "Intesa has a €70M official SDLC efficiency ambition. Because 70% of SDLC effort sits in coding, testing and release, governed AI execution could create a credible path to the target — and upside beyond it — if the pilot proves net efficiency after review and rework.",
    redeploymentNote: "Capacity redeployment, not headcount reduction.",
    // Methodology — collapsible drawer, secondary.
    derivationNote:
      "Derivation: €70M / 15% ≈ €467M implied SDLC baseline · ≈€467M × 70% ≈ €327M implied coding + testing/release effort zone · €70M / €327M ≈ 21% net efficiency required on the execution zone to reach the official target. Implied-model figures, not standalone official numbers.",
    sources: [
      "Intesa Sanpaolo — 15% SDLC efficiency ambition · ~€70M target by 2028.",
      "Intesa Sanpaolo — SDLC effort distribution: 17% requirements writing · 8% functional analysis · 5% technical analysis · 43% coding · 27% testing & release.",
    ],
    disclaimer:
      "Implied model derived from Intesa’s own 15% / €70M SDLC efficiency ambition. Scenarios are trajectories to validate during the pilot — not committed savings, not a Devin guarantee of the €70M target or of the upside above it.",
  },

  // -------------------------------------------------------------------------
  // PANEL 9 — Illustrative Enterprise Reference Pattern (Itaú)
  //
  // Anchors the value narrative on a credible enterprise reference. Not a
  // promise of equivalent outcomes for Intesa — a credibility frame that
  // demonstrates measurable gains under governance-aware factory workflows.
  // -------------------------------------------------------------------------
  panel9: {
    eyebrow: "Banking Proof at Scale",
    // Single enterprise banking proof point (Itaú). Case-study
    // layout: left = Itaú wordmark + reference caption; right =
    // 6× hero metric + secondary chip cluster + qualitative PR
    // line. The Itaú anchor restores the section's credibility —
    // without it, the page reads as a generic metrics list.
    headline:
      "Banking-scale outcomes\nalready show the curve can move.",
    // SDLC interpretation line — anchors why these metrics matter
    // specifically for Intesa: they sit on top of Intesa's own
    // largest SDLC effort concentration (coding + testing/release).
    sdlcInterpretation:
      "These metrics matter because Intesa’s highest-effort SDLC zones are coding, testing and release.",
    itau: {
      logoSrc: "logos/itau.svg",
      logoAlt: "Itaú",
      // Wordmark caption rendered next to (or under) the logo.
      // Two-line letterhead-style anchor: reference label + small
      // context line. NOT a logo wall — single proof anchor.
      anchorCaption: "Reference banking deployment",
      anchorContext: "Large-scale banking engineering environment",
      // Hero anchor — the single dominant modernization acceleration
      // multiplier. Apple-keynote scale; carries the emotional impact
      // of the slide.
      heroMetric: {
        metric: "6×",
        label: "Faster modernization delivery",
      },
      // Qualitative PR-review proof line. Rendered alongside the
      // chip row as a non-numeric proof point. Source material does
      // not give an exact PR-acceptance metric, so this stays
      // qualitative — no invented number.
      qualitativePr: "Faster path to reviewable PRs",
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
        "Proof point: governed AI workflows already operating inside banking-scale engineering environments.",
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
    headline:
      "Prove the curve\nbefore scaling the rollout.",
    // Supporting subline. Frames the pilot as a bounded validation
    // sprint focused on whether Devin creates measurable net
    // efficiency after review and rework.
    subhead:
      "A 4-week validation sprint to test whether Devin creates measurable net efficiency after review and rework.",
    // Anchor line beneath the subhead — anchors the pilot on net
    // efficiency, not on raw code generation speed. Mirrors the
    // ROI formula.
    netEfficiencyLine:
      "The pilot validates net efficiency after review and rework — not just code generation speed.",
    // Single consolidated success criteria block — replaces the
    // previous "Measured KPIs" rail and "Decision criteria" module
    // (which overlapped and made the page verbose). Six chip items,
    // each with a short title + label tier. Reads as one measurement
    // frame, not two competing KPI lists.
    successCriteria: {
      label: "Success criteria",
      caption: "Baselined in Week 1, validated at the end of Week 4",
      items: [
        { title: "Time to PR-ready", tag: "execution acceleration" },
        { title: "Review effort per PR", tag: "review scalability" },
        { title: "PR acceptance rate", tag: "engineering trust" },
        { title: "Test pass rate / rework", tag: "quality" },
        { title: "Vulnerabilities remediated", tag: "security value" },
        { title: "Engineering hours redeployed", tag: "ROI contribution" },
      ],
    },
    // Week-by-week operational validation plan. Four equally weighted
    // blocks with a clear timeline progression — small, controlled,
    // operational; not a transformation programme. Activities reworked
    // to map directly onto the Measured KPIs row above (baseline →
    // controlled execution → validation → executive decision).
    // Weekly execution blocks — each compacted to a single Output
    // line. The weeks read as a tight 4-step progression, not as
    // four mini-roadmaps with their own activities.
    blocks: [
      {
        week: "Week 1",
        title: "Baseline",
        output:
          "3–4 workflows selected, current task-to-PR and review baseline",
      },
      {
        week: "Week 2",
        title: "Execution",
        output:
          "Devin-generated PR-ready outputs, tests and evidence",
      },
      {
        week: "Week 3",
        title: "Review validation",
        output:
          "PR acceptance, review effort, rework and test quality",
      },
      {
        week: "Week 4",
        title: "Executive decision",
        output:
          "Net efficiency signal, scale-out recommendation, follow-up meeting",
      },
    ],
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
    headline: "Commit to a controlled\nSDLC ROI validation sprint.",
    // Subline — frames the ask as a bounded 4-week validation, not
    // a rollout, not a transformation programme.
    subhead:
      "The next step is not a full rollout. It is a 4-week validation of measurable contribution against Intesa’s 15% / €70M SDLC ambition.",
    // Two-block commitment ask — explicit next step + follow-up
    // checkpoint.
    commitment: [
      {
        label: "Recommended next step",
        value: "Launch a 4-week controlled SDLC ROI validation sprint.",
      },
      {
        label: "Follow-up decision meeting",
        value:
          "Review measured outcomes, confirm scale-out criteria, and align on broader deployment path.",
      },
    ],
    // Four final action bullets — what advancing looks like before
    // leaving the room.
    actionBullets: {
      label: "To advance",
      items: [
        "Select 3–4 workflows",
        "Confirm engineering and governance owners",
        "Agree success metrics",
        "Schedule executive review at the end of week 4",
      ],
    },
    strategicObjective: {
      label: "Strategic objective",
      value:
        "From task definition to reviewable, test-backed PRs — measured against Intesa’s own SDLC efficiency ambition.",
    },
  },

  // -------------------------------------------------------------------------
  // SDLC EXECUTION MAP — Where the SDLC effort concentrates
  //
  // New section anchoring the entire business case on Intesa's own
  // SDLC effort distribution. The 70% execution zone (43% coding +
  // 27% testing/release) is the visual hero. Rendered as a premium,
  // cinematic horizontal stacked bar with the three smaller phases
  // (17% / 8% / 5%) visually quieter so the 70% execution zone
  // dominates without becoming a chart dump.
  // -------------------------------------------------------------------------
  panelSdlcMap: {
    eyebrow: "SDLC execution map",
    headline:
      "The biggest lever is not abstract productivity —\nit is the 70% execution zone.",
    subhead:
      "43% coding + 27% testing/release represents the largest concentration of SDLC effort. This is the zone where Devin should be validated first: code transformation, testing, remediation and PR-ready delivery.",
    // Hero metric — the 70% execution zone. Sits as the dominant
    // anchor above the stacked-bar visual.
    heroMetric: {
      value: "70%",
      label: "of SDLC effort sits in coding, testing, and release",
    },
    // SDLC effort distribution — five phases, with coding and
    // testing/release flagged `prominent: true` so the component
    // can highlight them as the execution zone. Ordered to read
    // left-to-right as the SDLC progresses.
    distribution: [
      {
        key: "requirements",
        value: 17,
        label: "Requirements writing",
        prominent: false,
      },
      {
        key: "functional",
        value: 8,
        label: "Functional analysis",
        prominent: false,
      },
      {
        key: "technical",
        value: 5,
        label: "Technical analysis",
        prominent: false,
      },
      {
        key: "coding",
        value: 43,
        label: "Coding",
        prominent: true,
      },
      {
        key: "testing",
        value: 27,
        label: "Testing & release",
        prominent: true,
      },
    ],
    // Aggregate label for the highlighted segments.
    zoneLabel: "70% execution zone",
    zoneSubLabel: "43% coding + 27% testing/release",
    // Devin relevance line — rendered as a subtle italic anchor
    // beneath the distribution visual.
    devinRelevance:
      "Devin should be validated first where execution effort is highest: remediation, code transformation, test generation, debugging, documentation, and PR-ready delivery.",
    source:
      "Source: Intesa Sanpaolo — SDLC effort distribution across requirements, analysis, coding, and testing/release.",
  },
};
