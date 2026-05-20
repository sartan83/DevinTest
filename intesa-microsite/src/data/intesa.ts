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
  // Nav order matches MicrositeShell render order. Trust & Control
  // sits in the appendix range so the main flow runs:
  // Opening → Why Now → SDLC Map → Validation → Future-State →
  // Demo → Banking Proof → ROI → Pilot → Decision Point.
  // Tightened 10-panel main flow (excluding the pre-session welcome at
  // idx 0). Agenda has been removed as a dedicated page; the final ask
  // collapses into Pilot + Decision. Appendix range carries Trust &
  // Control and the Discovery framework for Q&A only.
  nav: [
    { index: 0,  label: "·",  full: "Executive working session", appendix: false },
    { index: 1,  label: "1",  full: "Opening / why Intesa", appendix: false },
    { index: 2,  label: "2",  full: "Agenda", appendix: false },
    { index: 3,  label: "3",  full: "Current state", appendix: false },
    { index: 4,  label: "4",  full: "SDLC execution map", appendix: false },
    { index: 5,  label: "5",  full: "Validation checkpoint", appendix: false },
    { index: 6,  label: "6",  full: "Future-state + demo setup", appendix: false },
    { index: 7,  label: "7",  full: "Demo", appendix: false },
    { index: 8,  label: "8",  full: "Banking proof / use case", appendix: false },
    { index: 9,  label: "9",  full: "ROI / upside potential", appendix: false },
    { index: 10, label: "10", full: "Pilot + decision", appendix: false },
    { index: 11, label: "A1", full: "Trust & Control (appendix)", appendix: true },
    { index: 12, label: "A2", full: "Discovery framework (appendix)", appendix: true },
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
    // Updated step ladder matches the tightened 10-panel main flow:
    //   P1 Welcome (pre)        P2 Opening 3'      P3 Why Now 4'
    //   P4 SDLC Map 4'          P5 Validation 6'   P6 Future-State 3'
    //   P7 Demo 15'             P8 Banking Proof 3.5'
    //   P9 ROI 3.5'             P10 Pilot + Decision 5'
    steps: [
      { panel: 1,  addMin: 0.00, addMax: 0.00, note: "Executive opening screen (0' — pre-session)" },
      { panel: 2,  addMin: 0.40, addMax: 0.90, note: "Opening / why Intesa (3')" },
      { panel: 3,  addMin: 0.27, addMax: 0.60, note: "Agenda (2')" },
      { panel: 4,  addMin: 0.53, addMax: 1.20, note: "Why now · 2029 (4')" },
      { panel: 5,  addMin: 0.53, addMax: 1.20, note: "SDLC execution map (4')" },
      { panel: 6,  addMin: 0.80, addMax: 1.80, note: "Validation checkpoint (6')" },
      { panel: 7,  addMin: 0.40, addMax: 0.90, note: "Future-state + demo setup (3')" },
      { panel: 8,  addMin: 2.00, addMax: 4.50, note: "Demo (15')" },
      { panel: 9,  addMin: 0.47, addMax: 1.05, note: "Banking proof / use case (3.5')" },
      { panel: 10, addMin: 0.47, addMax: 1.05, note: "ROI / upside potential (3.5')" },
      { panel: 11, addMin: 0.67, addMax: 1.50, note: "Pilot + decision (5')" },
    ] as CounterStep[],
  },

  // -------------------------------------------------------------------------
  // PANEL 0 — Executive Opening Screen (pre-session stage presence)
  // -------------------------------------------------------------------------
  panel0: {
    leftWordmark: "Intesa Sanpaolo",
    rightWordmark: "Cognition",
    // Devin-native command-style hook. Replaces the prior corporate
    // line ("Governed Modernization Execution at Enterprise Scale")
    // with a chat-input style prompt rendered inside a subtle
    // command bar — the @Devin token reads as a mention, the rest
    // animates in like typed input followed by a blinking cursor.
    command: {
      mention: "@Devin",
      body: " analyze the legacy workflow, generate the migration plan, create tests, and prepare a reviewable PR.",
      placeholderHint: "Devin · message to assign engineering work",
    },
    // Strapline retired per user direction. The opening now
    // closes with a quiet presenter signature instead of a
    // positioning line — see `presenter` below.
    supportingLine: "",
    // Presenter signature rendered under the command bar in
    // place of the previous positioning line. Subtle and
    // executive — reads as a signature, not a headline.
    presenter: {
      name: "Simone Agazzi",
      title: "Majors Account Director, Europe",
    },
    // Business framing kept directly under the command so the
    // Devin-native moment lands inside the Intesa context, not as
    // a generic product demo.
    intesaHero:
      "Intesa is not evaluating AI productivity — it is racing two quantified execution clocks.",
    // Title / subtitle retained as data for back-compat (other
    // surfaces or print exports may still reference them), but the
    // Panel 0 render no longer surfaces them as the main headline.
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
      "Cloud migration, isytech extension and legacy platform simplification are tied to ~€350M savings by 2029.",
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
        value: "~€350M",
        label: "Infra legacy reduction",
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
        title: "Why Devin Now",
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
        title: "4-week pilot",
        helper: "Pilot decision",
      },
    ],
    // Today's Goal — compact executive frame added per user
    // direction. Sits above the Opening Question and below the
    // 5-block agenda timeline. Reads as a single sentence commit
    // for what the meeting must produce by the end. Visually
    // similar pattern to the Opening Question but uses a calmer
    // ivory-tinted treatment (not orange) so the two blocks read
    // as a pair without competing chromatically.
    todayGoal: {
      label: "Today's Goal",
      text:
        "Agree on a 4-week pilot to validate measurable impact in a secure, scoped environment.",
    },
    // Single executive discovery question rendered under the
    // agenda timeline. Anchors the agenda as a conversation
    // opener and invites the buyer to define what matters most
    // before the narrative starts. Visually distinct from the
    // agenda blocks (eyebrow chip + display question + soft
    // orange-tinted frame) — not a slide title, not a bullet,
    // not a long explanatory paragraph.
    discoveryQuestion:
      "Before we go deeper, what would make this conversation most valuable for you today to give us the greenlight?",
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
    eyebrow: "Current state",
    // Business-level corporate objective added near the top of
    // the section per user direction. Sits above the existing
    // strategic priorities (three value clocks) and frames them
    // as execution-level expressions of a single corporate
    // ambition. Compact and executive — no long paragraphs.
    corporateObjective: {
      label: "Corporate objective",
      text: "20% Return On Equity by scaling digital banking",
    },
    // Strategic execution-tension hero. Frames the remaining gap
    // as the operational hard part of the migration, not as a
    // descriptive milestone.
    headline:
      "The remaining 36% is where\nexecution risk concentrates.",
    // Supporting line removed per user direction — headline now
    // stands alone and the three value clocks below provide the
    // operational context without an extra subline.
    support: "",
    // Current-state → target-state anchors flanking a tension zone.
    // The component renders 64% on the left, 36% as the gap in the
    // middle, and 2029 on the right as the deadline. ~100% is NOT
    // shown as a large number — if 64% is today and 36% remains,
    // ~100% is implied. The third number communicates the real
    // tension: the deadline.
    states: [
      {
        value: "64%",
        label: "Cloud-based applications today",
      },
      {
        value: "2029",
        label: "Cloud deadline",
      },
    ],
    // The tension zone between the two states. Reads as the gap
    // being closed, not as a separate KPI tile.
    gap: {
      value: "36%",
      label: "Remaining migration",
    },
    // Three value-clock cards below the main visual. Replace the
    // prior top-right SDLC metric + single business-pressure card
    // with one clean three-card row. Each card carries: title +
    // hero value + label + small supporting note. Together they
    // surface the three clocks: cloud deadline, SDLC efficiency
    // ambition, isytech / cloud value capture.
    //
    // Order per user direction: SDLC efficiency ambition (€70M)
    // leads, then Cloud migration deadline (64% / 36% / 2029),
    // then Infra legacy reduction (€350M). Surfaces the SDLC
    // value clock first because that is the lever Devin acts on.
    clocks: [
      {
        title: "SDLC efficiency ambition",
        value: "~€70M",
        label: "Target by 2028",
        note: "15% SDLC efficiency ambition.",
        tone: "efficiency" as const,
      },
      {
        title: "Cloud migration deadline",
        value: "64% → 36% → 2029",
        label: "64% cloud-based today · 36% remaining · 2029 deadline",
        note: "",
        tone: "deadline" as const,
      },
      {
        title: "Infra legacy reduction",
        value: "~€350M",
        label: "Savings by 2029",
        note: "Driven by cloud migration, isytech extension and legacy platform simplification.",
        tone: "value" as const,
      },
    ],
    // Closing reframed as an executive question per user direction.
    // The slide must not assume Intesa will successfully complete
    // the remaining 36% migration; the question puts the SDLC
    // execution model itself on the table.
    closing:
      "What if the hardest 36% cannot move fast enough with today’s SDLC execution model?",
    // Secondary line renders smaller and more subtle directly
    // under the question. Anchors the value-capture risk frame
    // without restating the question.
    // Closing secondary line retired per user direction.
    closingSecondary: "",
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
    eyebrow: "Where the remaining 36% gets hard.",
    // Shifted from an open validation checkpoint to a concrete
    // initiative map of the remaining 36% modernization estate.
    // Reads as an executive hypothesis (account-specific), not a
    // discovery questionnaire. The five cards name the actual
    // initiatives Devin would land into; the question block keeps
    // the live discovery moment with one focused question + chips.
    discoveryIntro:
      "This is where cloud migration turns into core modernization, legacy simplification, testing intensity and execution bottlenecks.",
    headline:
      "The remaining 36% is the\nhard modernization estate.",
    // Five-card initiative map of the remaining 36%. Each card
    // names a concrete modernization estate Devin would land into.
    estateCards: [
      {
        key: "core",
        title: "Core banking / isytech extension",
        note: "Main bank, core services and broader isytech rollout.",
      },
      {
        key: "wealth",
        title: "Private Banking & Wealth platforms",
        note: "Advisory, investment, portfolio and operating platforms.",
      },
      {
        key: "international",
        title: "International Banks rollout",
        note: "Digital and advisory capabilities replicated across markets.",
      },
      {
        key: "legacy",
        title: "Legacy & integration layer",
        note: "Batch flows, old infrastructure, integrations and documentation gaps.",
      },
      {
        key: "testing",
        title: "Testing, remediation & release-readiness",
        note: "Regression testing, vulnerability remediation, code transformation and PR-ready delivery.",
      },
    ],
    // One focused executive question with chip-style options —
    // keeps the live discovery moment without turning the page
    // into a questionnaire.
    estateQuestion: "Where does the remaining 36% hurt most today? And why?",
    estateChips: [
      "Core modernization",
      "Testing",
      "Remediation",
      "Release-readiness",
      "Review capacity",
    ],
    validationFooter: "",
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
    // Reframed per VP feedback as an SDLC operating-model map.
    // The slide must show (a) where SDLC effort sits across the
    // end-to-end flow, (b) which parts Devin materially
    // addresses, and (c) the four Devin workstreams that
    // concentrate on the highest-impact stages — not a generic
    // before/after comparison.
    eyebrow: "SDLC with Devin",
    headline:
      "The €70M target depends on how the\n83% Devin-addressable flow moves.",
    subhead:
      "The first visible shift happens in the 70% execution core: coding and testing/release move from linear execution to parallel, PR-ready workstreams.",
    // One emphasized sentence under the chain that anchors the
    // operating-model read — prevents the slide from being read
    // as 'Devin replaces the SDLC'.
    keyMessage: "",
    // End-to-end SDLC process bar. Five stages split into two
    // groups (definition / execution). Each stage carries its
    // % of SDLC effort and two flags:
    //   - addressable : surfaced by one or more Devin workstreams
    //   - core        : sits inside the 70% execution core
    // (the first pilot validation zone).
    flow: {
      groups: [
        { key: "definition", label: "Definition stages" },
        { key: "execution", label: "Execution stages" },
      ],
      stages: [
        {
          key: "requirements",
          group: "definition" as const,
          label: "Requirements",
          value: 17,
          // Requirements sits outside the 83% addressable flow per
          // user clarification (83 = 8+5+43+27). The Requirement-to-
          // Task Workstream still consumes Requirements as input but
          // the stage itself is not counted in the addressable %.
          addressable: false,
          core: false,
        },
        {
          key: "functional",
          group: "definition" as const,
          label: "Functional analysis",
          value: 8,
          addressable: true,
          core: false,
        },
        {
          key: "technical",
          group: "definition" as const,
          label: "Technical analysis",
          value: 5,
          addressable: true,
          core: false,
        },
        {
          key: "coding",
          group: "execution" as const,
          label: "Coding",
          value: 43,
          addressable: true,
          core: true,
        },
        {
          key: "testing",
          group: "execution" as const,
          label: "Testing / Release",
          value: 27,
          addressable: true,
          core: true,
        },
      ],
      // Two layered highlights rendered as badges above and below
      // the process bar. The 83% addressable flow stays a
      // narrative anchor consistent with the ROI page; the 70%
      // execution core is the first pilot validation zone.
      addressable: {
        value: "83%",
        label: "Devin-addressable flow",
        note: "Functional + Technical + Coding + Testing / Release",
      },
      // Bracket label rendered under the SDLC bar. Per user
      // direction this now spans Functional + Technical + Coding
      // + Testing/Release (=83%), excluding Requirements. The
      // semantic 'core' flag on individual stages still marks the
      // 70% execution core (coding + testing/release) and drives
      // the bar coloring — only the bracket label changed.
      core: {
        value: "83%",
        label: "Devin near-term ROI zone",
        note: "Functional + Technical + Coding + Testing / Release",
      },
    },
    // With-Devin flow — horizontal end-to-end execution chain.
    // Visualizes the shift in how the 70% execution core moves:
    // requirements feed the Devin execution layer, which fans out
    // into parallel coding AND testing/release workstreams,
    // converging into PR-ready output reviewed by humans. The
    // current-flow box was retired per user direction — the
    // horizontal layout keeps the slide compact while still
    // showing both lanes run in parallel.
    withDevinFlow: {
      label: "With Devin",
      caption: "Parallel AI-augmented execution",
      input: "Requirements",
      layer: "Devin execution layer",
      // Two parallel lane groups under the execution layer. Both
      // coding and testing/release are visibly parallel — the
      // slide must not imply Devin parallelizes coding only.
      lanes: [
        {
          key: "coding",
          title: "Parallel coding workstreams",
          items: ["Code transformation", "Refactoring", "Remediation"],
        },
        {
          key: "testing",
          title: "Parallel testing / release workstreams",
          items: [
            "Test generation",
            "Test execution / validation",
            "Release preparation",
          ],
        },
      ],
      output: "PR-ready, test-backed output",
      review: "Human review",
      bullets: [
        "Requirements become executable tasks",
        "Coding runs in parallel",
        "Testing / release runs in parallel",
      ],
    },
    // Three outcome tags at the bottom of the slide.
    // Scalability and Speed render slightly stronger than
    // Control per user direction — Control is present but
    // secondary so the slide stays an operating-model map, not
    // a governance page.
    outcomes: [
      {
        word: "Scalability",
        label: "parallel workstreams",
        emphasis: "primary" as const,
      },
      {
        word: "Speed",
        label: "faster path to PR-ready",
        emphasis: "primary" as const,
      },
      {
        word: "Control",
        label: "human approval remains",
        emphasis: "secondary" as const,
      },
    ],
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
    // Focus area chip retired per user direction.
    sdlcFocus: "",
    // Executive talk-track support line retired per user
    // direction — the workflow steps + 'What this demo
    // validates' chips already frame the read.
    talkTrack: "",
    // Understated operational proof, NOT a KPI tile. Reads as a
    // credibility chip beneath the narrative.
    referenceDeployment: {
      caption: "Reference deployment",
      metric: "20–30%",
      label: "Net Efficiency",
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
      // Tightened to four operational lenses per user direction.
      items: [
        "Onboarding",
        "Time to PR Ready",
        "Coding",
        "Test Generation",
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
  // Now lives in the appendix range, accessible via the Appendix
  // toggle. Same three-pillar trust content (review package, control
  // model, enterprise envelope) — only the eyebrow/headline shift to
  // signal that this is reference material, not a main-flow slide.
  panel6: {
    eyebrow: "Appendix · Trust & Control",
    headline:
      "Acceleration only matters if control survives it.",
    subhead:
      "Final approval remains human, while Devin makes execution more structured, traceable and measurable.",
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
    // Cognition-style minimal hero. Reads in 5 seconds:
    // hero statement → 4-step value arc (€70M / €82M / €97M / €116M)
    // → compact ROI logic bar (€467M baseline → ×83% → 18–30% range)
    // → scenario line → one caveat + one pilot-link footer note.
    headline:
      "€70M is the target.\nThe 83% delivery zone makes the threshold more reachable.",
    subhead:
      "Functional analysis, technical analysis, coding, testing and release represent the Devin-relevant delivery zone.",
    // Four large economic outcomes across the 83% Devin-relevant
    // delivery zone. Reads as a premium value arc.
    valueArc: {
      caption:
        "Based on 18% / 20% / 25% / 30% net efficiency across the 83% delivery zone.",
      // Each point renders a big value + a small "/ year" suffix
      // (kept separate so the display-size number stays clean and
      // doesn't overflow on narrow columns).
      // Capacity translation (dev-equivalents) retired per user
      // direction. Mixing two derivation threads (€€€ from €70M /
      // 15% × 83% × net-eff and dev-eq from 400 engineers × 83% ×
      // net-eff) produced an implicit ~€1.17M/engineer/year
      // fully-loaded cost that doesn't match the banking-sector
      // benchmark (~€200-350K). To avoid the EB-challenge moment
      // the value arc now reads as pure €€€.
      points: [
        {
          value: "€70M",
          unit: "/ year",
          label: "target",
          tone: "target" as const,
        },
        {
          value: "€78M",
          unit: "/ year",
          label: "upside",
          tone: "upside" as const,
        },
        {
          value: "€97M",
          unit: "/ year",
          label: "strong upside",
          tone: "strongUpside" as const,
        },
        {
          value: "€116M",
          unit: "/ year",
          label: "high upside",
          tone: "highUpside" as const,
        },
      ],
    },
    // Compact ROI logic bar — three readable steps that derive the
    // value arc from Intesa's own SDLC ambition. Sits directly under
    // the value arc; visible and legible but not a financial model.
    logicBar: [
      { op: "€70M / 15%", result: "~€467M SDLC baseline" },
      { op: "× 83%", result: "~€388M Devin-relevant delivery zone" },
      { op: "18–30%", result: "net efficiency range" },
    ] as { op: string; result: string }[],
    // Thin scenario line under the logic bar — maps each net-efficiency
    // scenario back to the value arc. Four equal-weight rows.
    scenarioLine: [
      { eff: "18%", value: "~€70M / year", label: "target" },
      { eff: "20%", value: "~€78M / year", label: "upside" },
      { eff: "25%", value: "~€97M / year", label: "strong upside" },
      { eff: "30%", value: "~€116M / year", label: "high upside" },
    ] as { eff: string; value: string; label: string }[],
    // NOTE: scenarioLine values keep the "/ year" inline because the
    // thin row uses a 13–14px font where the suffix fits naturally
    // without overflow. Only the large value-arc tiles split value
    // and unit.
    // One short caveat — sits below the value arc.
    caveat: "Scenarios to validate.",
    // Pilot-link footer note removed per user direction — the
    // value-arc + logic-bar already carry the model framing.
    pilotFooter: "",
    // Hero — four executive numbers. The fourth (~20%) makes the
    // ROI math visible: to reach €70M-class outcomes on the
    // €388M Devin-relevant delivery zone, the pilot must
    // demonstrate ~20% net efficiency after review and rework.
    // Reads in <10 seconds.
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
          value: "~20%",
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
          efficiency: "~20%",
          value: "~€78M",
          tone: "target" as const,
        },
        {
          key: "upside",
          title: "Upside",
          efficiency: "25%",
          value: "~€97M",
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
      "Derivation: €70M / 15% ≈ €467M implied SDLC baseline · ≈€467M × 83% ≈ €388M implied Devin-relevant delivery zone · €70M / €388M ≈ 18% net efficiency to hit the official target · €78M / €388M ≈ 20% net efficiency for the upside tier. Implied-model figures, not standalone official numbers.",
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
    eyebrow: "Banking Proof / Use Case",
    // Single enterprise banking proof point (Itaú). Case-study
    // layout: left = Itaú wordmark + reference caption; right =
    // 5-tile metric grid with the official Itaú proof points
    // (modernization acceleration, cost, codebase documentation,
    // adoption). The Itaú anchor is the credibility frame — the
    // five metrics are the must-have evidence row.
    headline:
      "Itaú shows Devin can scale modernization,\nnot just accelerate coding.",
    // Subline anchoring the proof points: faster migrations, lower
    // cost, large-scale documentation, broad adoption.
    sdlcInterpretation:
      "In a large financial-services engineering environment, Devin delivered faster migrations, lower execution cost, massive codebase documentation and broad team adoption.",
    itau: {
      logoSrc: "logos/itau.svg",
      logoAlt: "Itaú",
      // Wordmark caption rendered next to (or under) the logo.
      // Two-line letterhead-style anchor: reference label + small
      // context line. NOT a logo wall — single proof anchor.
      anchorCaption: "Reference banking deployment",
      anchorContext: "Large-scale banking engineering environment",
      // Five official Itaú proof points. Each tile renders a big
      // value + a short suffix (faster / lower cost / repos /
      // adoption), an under-label naming the workflow, and an
      // optional scale note (number of services / database objects).
      // Replaces the previous Gartner-throughput cluster so the
      // section anchors on modernization execution at scale rather
      // than generic productivity numbers.
      proofMetrics: [
        {
          value: "6×",
          suffix: "faster",
          label: ".NET → Java migration",
          note: "59 services",
        },
        {
          value: "5×",
          suffix: "faster",
          label: "SQL Server migration",
          note: "800 database objects",
        },
        {
          value: "5×",
          suffix: "lower cost",
          label: ".NET → Java migration",
        },
        {
          value: "300,000+",
          suffix: "repos",
          label: "Documented and continuously updated",
        },
        {
          value: "75%",
          suffix: "adoption",
          label: "Teams using Devin",
        },
      ],
      // Headline signal tile — separated from the five Itaú proof
      // points so it reads as the dominant business takeaway of the
      // page and the direct bridge to the Intesa ROI scenario. The
      // five Itaú metrics above explain why this 20–30% range is
      // credible; this tile is the number the executive remembers.
      signalTile: {
        eyebrow: "The signal to validate at Intesa",
        value: "20–30%",
        suffix: "net efficiency / throughput",
        label: "Reference banking environment",
        note: "Range used to sanity-check the Intesa ROI scenario — not a guaranteed Intesa saving.",
      },
      // Compact secondary line under the proof grid.
      patternLine:
        "The pattern: faster modernization, lower execution cost, broader adoption, and a 20–30% efficiency signal to validate.",
      // Bridge line connecting the Itaú proof points to the ROI page
      // — frames the 21–30% net efficiency scenarios as a direct
      // extension of the Itaú 20–30% signal applied to Intesa's 70%
      // execution zone.
      roiBridge:
        "This is why the ROI page tests a 21–30% net efficiency range across Intesa’s 70% execution zone.",
      // Footer capacity-shift line. Visually secondary — anchors
      // what shifts on the engineering side as routine execution
      // moves to AI.
      capacityShift:
        "Routine execution moves to AI; engineers spend more time on architecture, problem framing and business context.",
      sourceLabel: "Source: Devin customer story · Itaú",
      sourceUrl: "https://devin.ai/customer-stories/itau",
      // Kept as the left-column tagline under the wordmark so the
      // reference reads as a single proof anchor rather than a
      // logo wall.
      interpretiveFooter:
        "Proof point: governed AI workflows already operating inside banking-scale engineering environments.",
    },
    disclaimer:
      "Reference metrics from the Devin × Itaú customer story.",
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
    // Anchor line retired per user direction — the subhead +
    // success-criteria cluster already carry the read.
    netEfficiencyLine: "",
    // Single consolidated success criteria block — grouped into
    // three themes (Execution · Trust · Scale) to communicate that
    // the pilot validates more than coding speed: it tests review
    // trust and scale-out potential across teams. "Vulnerabilities
    // remediated" was removed from the main pilot KPI cluster (it
    // remains a valid Itaú proof point but is workflow-specific);
    // "Time to ramp on unfamiliar repos" replaces it to surface
    // adoption / cross-team scalability.
    successCriteria: {
      label: "Success criteria",
      caption: "Baselined in Week 1, validated at the end of Week 4",
      // Three-theme grouping. Each group renders as a column with a
      // small uppercase theme label and two criteria chips below.
      groups: [
        {
          key: "execution",
          theme: "Execution",
          items: [
            { title: "Time to PR-ready", tag: "execution acceleration" },
            { title: "Test pass rate / rework", tag: "quality signal" },
          ],
        },
        {
          key: "trust",
          theme: "Trust",
          items: [
            { title: "Review effort per PR", tag: "review scalability" },
            { title: "PR acceptance rate", tag: "engineering trust" },
          ],
        },
        {
          key: "scale",
          theme: "Scale",
          items: [
            { title: "Engineering hours redeployed", tag: "business impact" },
            { title: "Time to ramp on unfamiliar repos", tag: "cross-team scalability" },
          ],
        },
      ],
      // Flat list kept for back-compat with any consumer that still
      // reads `items` directly. Mirrors the grouped order.
      items: [
        { title: "Time to PR-ready", tag: "execution acceleration" },
        { title: "Test pass rate / rework", tag: "quality signal" },
        { title: "Review effort per PR", tag: "review scalability" },
        { title: "PR acceptance rate", tag: "engineering trust" },
        { title: "Engineering hours redeployed", tag: "business impact" },
        { title: "Time to ramp on unfamiliar repos", tag: "cross-team scalability" },
      ],
      // Short interpretation line — anchored under the cluster.
      // Interpretation line retired per user direction — the
      // four success-criteria cards above already carry the read.
      interpretation: "",
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
    // Compact mutual-commitment line that anchors the pilot to a
    // real post-pilot path. Renders directly under the 4-week grid
    // (before the success criteria block) so it reads as a quiet
    // bridge between the pilot and what comes next — not a new
    // bullet, not a long timeline.
    mutualCommitment:
      "Mutual commitment: if Week 4 success criteria are met, align on a 30–60 day controlled go-live path.",
    // Commitment ask — absorbs the former Decision Point slide so the
    // pilot section now closes the room on its own. Four short bullets:
    // workflow scope, owners, success metrics, executive review.
    commitment: {
      label: "Commitment ask",
      caption: "What advancing looks like before leaving the room",
      items: [
        "Select 3–4 workflows",
        "Confirm engineering + governance owners",
        "Agree success metrics",
        "Schedule executive review at end of week 4",
      ],
    },
    // Closing strapline removed per user direction — the
    // commitment-ask chips already close the room.
    closing: "",
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
    // Reframed per VP feedback as Intesa's current-state SDLC
    // diagnosis — the section is a photograph of the pain, not a
    // generic delivery-zone chart.
    eyebrow: "Current State",
    // Hero now anchors the slide on the €70M SDLC efficiency
    // target. The target is the business stake; the 70%
    // execution zone below is the operating-model reason it
    // depends on capacity, not strategy.
    headline:
      "The €70M SDLC efficiency target\ndepends on execution capacity.",
    subhead: "",
    // Hero metric retired per user direction — the 70% anchor
    // is now carried by the bracket label above the SDLC bar
    // alone, so the slide leads with the €70M target headline
    // and a cleaner whitespace block above the distribution.
    // Empty strings keep the data shape stable; the component
    // guards on `heroMetric.value` so the block does not render.
    heroMetric: {
      value: "",
      label: "",
    },
    // SDLC effort distribution — five phases. `zone` distinguishes:
    //   - "core"     : 43% coding + 27% testing/release (saturated orange)
    //   - "assisted" : 8% functional + 5% technical analysis (soft orange)
    //   - "outside"  : 17% requirements (muted ivory)
    // `prominent` is preserved for back-compat with the bracket
    // anchor over the 70% zone.
    distribution: [
      {
        key: "requirements",
        value: 17,
        label: "Requirements writing",
        subLabel: "",
        zone: "outside" as const,
        prominent: false,
      },
      {
        key: "functional",
        value: 8,
        label: "Functional analysis",
        subLabel: "",
        zone: "assisted" as const,
        prominent: false,
      },
      {
        key: "technical",
        value: 5,
        label: "Technical analysis",
        subLabel: "",
        zone: "assisted" as const,
        prominent: false,
      },
      {
        key: "coding",
        value: 43,
        label: "Coding",
        subLabel: "",
        zone: "core" as const,
        prominent: true,
      },
      {
        key: "testing",
        value: 27,
        label: "Testing & release",
        subLabel: "",
        zone: "core" as const,
        prominent: true,
      },
    ],
    // Aggregate label for the 83% near-term ROI zone
    // (Functional + Technical + Coding + Testing / Release).
    // Per user direction the bracket now spans the four orange
    // segments and the breakdown sublabel is dropped (the math
    // is intuitive from the bar itself).
    zoneLabel: "83% Execution Bottleneck",
    zoneSubLabel: "",
    // Legacy two-callout block retired — the current-state pain
    // block + Devin bridge below carry the read now.
    callouts: [],
    // Math anchor retired on this slide. The €467M baseline and
    // 83% delivery zone live on the ROI page.
    deliveryMathNote: "",
    // Current-pain block. Diagnoses the operating-model pain that
    // makes the 70% zone the friction zone. Rendered as a compact
    // panel under the SDLC bar.
    currentPain: {
      title: "Current pain",
      // Per user direction the punchline is dropped and a fourth
      // friction line is added — "Onboarding on legacy
      // application" reads as the same kind of operating-model
      // pain as the three preceding bullets, not a separate
      // tile.
      items: [
        "Remediation and testing move sequentially",
        "Review starts late",
        "Capacity limits modernization speed",
        "Onboarding on legacy application",
      ],
      label: "",
    },
    // Small Devin bridge — single question + one-line answer +
    // three secondary outcome tags. Deliberately compact so the
    // slide stays a current-state diagnosis, not a solution page.
    devinBridge: {
      // Eyebrow title + supporting tags retired per user
      // direction. The block now reads as a single compact
      // executive tension question.
      question: "",
      text:
        "Where is the €70M target expected to come from — and how?",
      tags: [],
    },
    // Closing interpretation line stays empty — the pain block
    // + Devin bridge already close the read.
    devinRelevance: "",
    source:
      "Source: Intesa Sanpaolo — SDLC effort distribution across requirements, analysis, coding, and testing/release.",
  },
};
