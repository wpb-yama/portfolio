const projects = [
  {
    // ── Bento grid fields ────────────────────────────────────────────────────
    slug: 'pickem',
    title: "Pick'em",
    description: "A B2B 'More or Less' sports prediction product built from scratch and shipped via casino aggregator — live across 5 continents in 12 months.",
    category: ['B2B', 'Zero-to-One'],
    season: '2025',
    duration: '12 Months',
    featured: true,
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)',
    cardImage: '/images/pickem/pickem.png',

    // ── Slug page fields ─────────────────────────────────────────────────────
    tags: ['B2B', 'Zero-to-One', '2025'],
    heroImage: null,
    heroImages: [
      '/images/pickem/main1.png',
      '/images/pickem/pickem.png',
      '/images/pickem/main3.png',
    ],
    polaroidImages: [],
    images: [],
    beforeAfterImages: [],

    tldrBullets: [
      "Led the creation and delivery of Pick'em — a B2B 'More or Less' sports prediction product built from scratch and live with operators in 12 months.",
      'Owned the product vision, stakeholder relationships, commercial research, and personally modelled the multiplier calculation logic underpinning the entire payout system.',
      'Navigated a 3-layer integration architecture spanning our product, the aggregator, and operator platforms — each with different technical standards.',
      'Now active with 5 operators across South America, Australia, Asia, Europe, and North America.',
    ],

    opportunityImages: [
      '/images/pickem/underdog.png',
      '/images/pickem/pick6.png',
      '/images/pickem/prizepicks.png',
    ],
    opportunityImageHeight: 100,
    opportunityImageWidth: 100,

    context: "Most sportsbooks were built for a different era. They were designed for desktop, for experienced bettors, and for markets measured in decimal odds. The modern fan, one who follows LeBron or Messi rather than a team, was largely ignored.",
    contextHighlights: ["the modern fan", "was largely ignored"],
    opportunity: "B2C disruptors like Underdog Fantasy and PrizePicks had proven that simplifying betting into a binary \"More or Less\" choice could unlock an entirely new audience. No B2B equivalent existed. The opportunity was to build the first white-label Pick'em engine that any operator could plug in and own.",

    sections: [
      {
        title: 'Initial Problem',
        body: "The high level problem the team initially focused on was: how do you make a complex, margin-sensitive betting product feel effortless to the end user? To tackle this, I started by stripping the experience down to its simplest possible form: a multiplier, not odds, and a question of more or less.",
        video: '/videos/cut_footballselect.mp4',
      },
      {
        title: 'Crafting the Experience Through Product Decisions',
        body: "Pick'em is a second, simpler layer on top of traditional sports betting. Rather than confronting users with decimal odds and obscure markets, it surfaces one clear question: more or less? It provides unique value by meeting fans where they already are, following players, not point spreads.\n\nTo support this, I personally modelled the multiplier calculation logic from scratch, reverse-engineering competitor models to establish a baseline before rebuilding the formula to protect margins and maintain player trust.",
        videos: ['/videos/cut_basketballselect.mp4', '/videos/cut_betoption.mp4'],
        annotations: [
          { type: 'circle',  paragraphIdx: 0, phrase: 'more or less?' },
          { type: 'bracket', paragraphIdx: 1, label: 'important to manage risk' },
        ],
      },
      {
        title: 'Directing the Design',
        annotations: [
          { type: 'highlight', paragraphIdx: 0, phrase: "Pick'em needed to feel like a game" },
        ],
        body: "Pick'em needed to feel like a game, not a spreadsheet. I personally directed and approved every design decision: from the card-based player selection interface to the visual language used to communicate multipliers and outcomes. The goal was to create something that felt native to how modern fans consume sport: fast, visual, and player-first.\n\nEvery detail was considered. The way a pick snaps into a slip. The moment of feedback when a leg is won or lost.",
        mediaRow: {
          video: '/videos/cut_bet_placed.mp4',
          carousel: [
            '/images/pickem/palmer.png',
            '/images/pickem/never.png',
            '/images/pickem/mitoma.png',
            '/images/pickem/estevao.png',
            '/images/pickem/haal.png',
            '/images/pickem/bruno.png',
            '/images/pickem/hulk.png',
            '/images/pickem/saka.png',
          ],
        },
      },
      {
        title: 'Early Integration Complexity',
        annotations: [
          { type: 'underline', paragraphIdx: 0, phrase: "our product, the aggregator, and each operator's platform" },
        ],
        body: "What began as a relatively straightforward build evolved into a three-layer technical dependency — our product, the aggregator, and each operator's platform. Shared wallet infrastructure, inconsistent operator standards, and slow feedback loops created cascading complexity that required a flexible microservices architecture and constant stakeholder alignment to navigate.",
      },
      {
        title: 'Iterating Based on Operator Feedback',
        body: "The product changed significantly after the first operators went live. The most consistent request was for broader sport and market coverage. What launched with a core set of markets expanded meaningfully as we onboarded operators across different regions, each with different fan bases and sporting preferences. This iterative cycle, ship, integrate, listen, expand, became the core rhythm of the product.",
      },
      {
        title: 'Additional Details',
        body: "I acted as sole PM across the full product lifecycle — defining the roadmap, bridging commercial and engineering teams, negotiating the data feed provider contract, and taking on the role of a directly responsible individual to ensure both the settlement engine and every design detail were executed with a high level of craftsmanship.\n\nPick'em is a product of the hard work and collaboration of many talented teammates, and I'm proud to have been part of the team that brought it to life across five operators and four continents.",
      },
    ],

    role: 'Product Manager',
    roleDescription: 'Vision, roadmap, stakeholder relationships, operator integrations, commercial research, and multiplier calculation modelling.',

    durationMonths: 12,
    durationDescription: 'Concept to first live operator in 12 months, with ongoing expansion across new regions.',
    dateRange: '2025',

    timeline: [
      { phase: 'Research & Concept', date: 'Q1 2024', description: 'Competitive analysis, data feed evaluation, multiplier logic modelling, and product vision defined.', isLive: false },
      { phase: 'Build', date: 'Q2–Q3 2024', description: 'Core product built across microservices architecture. Aggregator integration and settlement engine delivered.', isLive: false },
      { phase: 'First Operator', date: 'Q4 2024', description: 'First operator live. 3-tier commercial model finalised. Integration complexity absorbed.', isLive: false },
      { phase: 'Global Expansion', date: '2025', description: '5 operators live across 5 continents. Market coverage expanded based on operator feedback.', isLive: true },
    ],

    tools: ['Figma', 'Linear', 'Notion', 'Excel', 'OpticOdds', 'Miro', 'Confluence'],

    prevProject: null,
    nextProject: { slug: 'reveals', title: 'Reveals' },
  },

  {
    // ── Bento grid fields ────────────────────────────────────────────────────
    slug: 'reveals',
    title: 'Reveals',
    description: "A free-to-play daily engagement product for sportsbooks, built around Gacha mechanics and an AI-powered personalisation loop.",
    category: ['B2B', 'AI'],
    season: 'Q1 2026',
    duration: '3 Months',
    featured: false,
    gradient: 'linear-gradient(135deg, #f7971e 0%, #e040fb 100%)',
    cardImage: '/images/reveals/reveals-thumb2.png',

    // ── Slug page fields ─────────────────────────────────────────────────────
    tags: ['B2B', 'AI', 'Engagement', '2024'],
    heroImage: null,
    heroVideo: '/videos/reveals.webm',
    heroImages: [null, '/images/reveals/reveals-thumb2.png', '/images/reveals/reveals_3.png'],
    heroImagesBg: [null, null, '#000000'],
    polaroidImages: [],
    images: [],
    beforeAfterImages: [],

    tldrBullets: [
      "Conceived and led end-to-end delivery of Reveals: a free-to-play daily engagement product for sportsbooks built on Gacha mechanics and an AI personalisation loop.",
      "The idea came entirely from outside iGaming, drawing on research into mobile gaming, collectible card games, and Nir Eyal's Hooked.",
      "Designed the full game mechanic, tiered reward structure, AI feedback loop architecture, and three-tier commercial model.",
      "Went from idea to delivered product in under six months. First customer is about to go live.",
    ],

    context: "In iGaming, acquisition is expensive and loyalty is fragile. Most operators rely on financial incentives (free bets, free spins) to retain users. This attracts bonus hunters rather than genuine fans, inflating Customer Acquisition Costs while doing nothing for long-term Lifetime Value. Up to 40% of users disappear after their first session, long before any real value is captured.",
    contextHighlights: ["acquisition is expensive and loyalty is fragile", "inflating Customer Acquisition Costs"],
    opportunity: "Mobile gaming had spent years perfecting daily engagement mechanics. Clash of Clans, TCG Pocket, FIFA Ultimate Team; these products had cracked habit formation through variable rewards, scarcity, and personalisation. Almost none of this thinking had crossed over into sports betting. The opportunity was to build a product that applied these mechanics to iGaming, using the natural probability structure of the Goalscorer market as its foundation.",
    opportunityHighlights: ["habit formation through variable rewards, scarcity, and personalisation"],
    opportunityImages: ['/images/reveals/lootbox.jpg'],

    sections: [
      {
        title: 'Initial Problem',
        body: "The high level problem the team initially focused on was: how do you change why users come back? Not with a better financial incentive, but with a mechanic compelling enough to build a daily habit around. To tackle this, I drew on cross-industry research and identified the gap independently, before conceiving the product from the ground up.",
      },
      {
        title: 'Crafting the Experience Through Game Design',
        annotations: [
          { type: 'highlight', paragraphIdx: 1, phrase: 'turning the sportsbook into a destination rather than a utility' },
        ],
        body: "Reveals is a daily pack-opening mechanic built around live sports. Each weekday, users tap to reveal a player from an upcoming fixture. If that player hits their target over the weekend, they win. Five days, five players, five chances.\n\nThe reward structure is deliberately tiered (a Haaland reveal is rare and valuable, a Tarkowski reveal is common) mirroring the emotional variance of opening a pack in FIFA Ultimate Team. The 24-hour availability window creates the scarcity that drives habitual check-ins. The Monday-to-Friday cadence builds anticipation, turning the sportsbook into a destination rather than a utility.",
        image: '/images/reveals/reveals_3.png',
        imageWidth: '56%',
      },
      {
        title: 'Directing the Design',
        annotations: [
          { type: 'highlight', paragraphIdx: 0, phrase: 'familiar to anyone who had ever opened a pack in a mobile game' },
        ],
        body: "Reveals needed to feel like a game, not a betting product. I personally directed and approved every design decision: from the reveal animation and card visual language to the reward feedback moments that follow a weekend result. The goal was to make something that felt immediately familiar to anyone who had ever opened a pack in a mobile game, while remaining native to a sports betting context.\n\nEvery detail was considered. The tension of the tap-to-reveal moment. The visual hierarchy that communicates a player's rarity at a glance.",
        images: ['/images/reveals/cole.png', '/images/reveals/salah.png', '/images/reveals/haaland.png'],
      },
      {
        title: 'The AI Feedback Loop',
        annotations: [
          { type: 'bracket', paragraphIdx: 0, label: 'The smart part' },
        ],
        body: "The frontend experience is the hook. Beneath it, an AI layer makes the product commercially intelligent. A predictive model profiles users early in their lifecycle, identifying signals of high-value or bonus-abusive behaviour. An AI agent using Gemini Pro then dynamically selects which players each user sees; balancing individual engagement likelihood against operator-defined KPI targets and financial caps. The system iterates week-on-week, continuously closing the gap between actual and target outcomes.\n\nDesigning a personalisation engine that was both effective at scale and fully auditable by operators was the hardest technical part of the project, and the part that required the most internal advocacy.",
        video: '/videos/reveals.webm',
        videoWidth: 550,
      },
      {
        title: 'Securing Internal Buy-In',
        annotations: [
          { type: 'underline', paragraphIdx: 0, phrase: 'I would have moved earlier to build a lightweight prototype' },
        ],
        body: "One of the hardest parts of the project wasn't the product itself: it was getting the concept across. Describing pack-opening mechanics for football predictions in a meeting room is a harder sell than showing it. In hindsight, I would have moved earlier to build a lightweight prototype to make the mechanics tangible. A faster path to something visual would have compressed the approval timeline significantly.",
      },
      {
        title: 'Additional Details',
        body: "I drove every aspect of this product from the ground up: conceiving the mechanic, designing the reward structure, architecting the AI feedback loop, building the commercial model, and taking on the role of being solely responsible to ensure every layer of the product was executed with a high level of craftsmanship.\n\nReveals is about to go live with its first operator, and I'm proud to have built something genuinely novel in a space that had gone largely untouched.",
      },
    ],

    role: 'Product Manager',
    roleDescription: 'Conceived the product, designed the game mechanics, architected the AI feedback loop, built the commercial model, and led operator conversations.',

    durationMonths: 3,
    durationDescription: 'Idea to delivered product in under six months. First operator going live.',
    dateRange: 'Q1 2026',

    timeline: [
      { phase: 'Research & Concept', date: 'Q4 2025', description: 'Cross-industry research into mobile gaming mechanics. Gap in iGaming identified. Internal concept signed off.', isLive: false },
      { phase: 'Mechanics & Design', date: 'Q4 2025', description: 'Game mechanic, tiered reward structure, daily cadence, and sport-agnostic engine designed.', isLive: false },
      { phase: 'AI Layer & Build', date: 'Q4 2025–Q1 2026', description: 'Gemini Pro personalisation loop built. User profiling, operator guardrails, and dynamic player selection delivered.', isLive: false },
      { phase: 'First Operator', date: 'Q1 2026', description: 'Commercial model finalised. First operator integration underway. Live shortly.', isLive: true },
    ],

    tools: ['Gemini', 'Figma', 'Linear', 'Notion', 'Miro', 'Python'],

    prevProject: { slug: 'pickem', title: "Pick'em" },
    nextProject: { slug: 'predict-6', title: 'Predict 6' },
  },

  {
    // ── Bento grid fields ────────────────────────────────────────────────────
    slug: 'predict-6',
    title: 'Predict 6',
    description: "Driving mass-market acquisition through the 'Dream Outcome' and zero-friction weekly score prediction.",
    category: ['B2B', 'Zero-to-One'],
    season: 'Q1 2026',
    duration: '2 Months',
    featured: false,
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    cardImage: '/images/predict6/predict6-thumb3.png',

    // ── Slug page fields ─────────────────────────────────────────────────────
    tags: ['B2B', 'Acquisition', '2025'],
    heroImage: null,
    heroImages: [
      '/images/predict6/predict6-thumb3.png',
      '/images/predict6/predict6-thumb2.png',
      '/images/predict6/p6_2.png',
    ],
    heroImagesFit: ['cover', 'cover', 'cover'],
    polaroidImages: [],
    images: [],
    beforeAfterImages: [],

    tldrBullets: [
      "Led the design and delivery of Predict 6 — a free-to-play weekly score predictor built to acquire users who aren't yet ready to deposit real money.",
      "The game mirrors Sky Super 6 and BetVictor's 6 Goals, but delivers them as a white-label B2B product — giving any operator access to a mechanic previously exclusive to the largest B2C brands.",
      "Designed the game mechanics, upsell funnel, jackpot underwriting model, and data monetisation strategy.",
      "Built and delivered in under two months. Currently being pitched to operators.",
    ],

    context: "Sportsbooks lose potential users at the registration stage. Deposit bonuses only work on users already willing to put money in — the hesitant majority never make it past the deposit screen. Operators spend heavily to acquire curious users, then lose them before capturing any value.",
    opportunity: "Sky Super 6 and BetVictor's 6 Goals had already proven the model: a free-to-play jackpot product builds large, loyal weekly audiences. External white-label solutions exist, but come with cost and integration overhead. Predict 6 was built to give our existing operators the same proven format natively — without the dependency on a third party.",
    opportunityImages: [
      '/images/predict6/sky6.jpg',
      '/images/predict6/livescore6.png',
    ],
    opportunityImageHeight: 120,

    sections: [
      {
        title: 'Initial Problem',
        body: "The core question was: how do you remove every possible reason not to play? No odds, no deposit, no expertise required. Just one familiar instinct: what do you think the score will be?",
      },
      {
        title: 'Crafting the Experience Through Game Design',
        body: "Predict 6 runs on a fixed weekly cycle aligned to Premier League fixtures. Users select exact scores for six matches, submit before kick-off, and win if their predictions are correct — with a £250,000 jackpot designed to be newsworthy and shareable. The simplicity is the product.",
        image: '/images/predict6/skysuper6.jpg',
        imageWidth: '65%',
      },
      {
        title: 'Directing the Design',
        body: "I personally directed and approved every design decision — from the six-match card layout to the lockdown countdown and post-submission screen. The goal was a product any casual fan could open, understand, and complete in under a minute.\n\nThe sequencing of the upsell prompt was the most considered design decision. It appears after submission — once the user has already experienced the product — offering to convert their six predictions into a real-money accumulator with a single tap. An enhancement, not a gate.",
        images: ['/images/predict6/p6_1.png', '/images/predict6/p6_2.png'],
      },
      {
        title: 'Additional Details',
        body: "I owned the execution end to end — researching the competitive landscape, designing the game mechanics, developing the commercial model including jackpot underwriting, and taking on the role of responsible individual to ensure the product was built with a high level of craftsmanship.\n\nPredict 6 gives our operator partners a proven acquisition mechanic they can own; and I'm proud to have been the one to build it.",
      },
    ],

    role: 'Product Manager',
    roleDescription: 'Researched the competitive landscape, designed the game mechanics and upsell funnel, built the commercial model, and led operator positioning.',

    durationMonths: 2,
    durationDescription: 'Concept to delivered product in under two months. Operator pitches underway.',
    dateRange: 'Q1 2026',

    timeline: [
      { phase: 'Research', date: 'Jan 2025', description: "Competitive analysis of Sky Super 6 and BetVictor's 6 Goals. White-label gap confirmed.", isLive: false },
      { phase: 'Design', date: 'Feb 2025', description: 'Game mechanic, weekly cycle, tiered reward structure, and upsell funnel designed.', isLive: false },
      { phase: 'Build', date: 'Feb – Mar 2025', description: 'Product built and delivered. Jackpot underwriting model and commercial tiers finalised.', isLive: false },
      { phase: 'Pitching', date: 'Q2 2025', description: 'Operator conversations underway. First integration pending.', isLive: true },
    ],

    tools: ['Figma', 'Linear', 'Notion', 'Miro'],

    prevProject: { slug: 'reveals', title: 'Reveals' },
    nextProject: { slug: 'sigap-reporting', title: 'SIGAP Reporting' },
  },

  {
    // ── Bento grid fields ────────────────────────────────────────────────────
    slug: 'sigap-reporting',
    title: 'SIGAP Reporting',
    description: 'Automated regulatory reporting bridge for Brazil\'s 2025 betting compliance deadline — achieving 100% daily submission acceptance.',
    category: ['B2B', 'Compliance'],
    season: 'Q4 2024',
    duration: '4 Months',
    featured: false,
    gradient: 'linear-gradient(135deg, #009c3b 0%, #002776 100%)',
    cardImage: '/images/sigap/sigap-reporting-card.jpeg',

    // ── Slug page fields ─────────────────────────────────────────────────────
    tags: ['Compliance', 'B2B', '2024'],
    heroImage: null,
    heroImages: [],
    hideHeroGrid: true,
    polaroidImages: [],
    images: [],
    beforeAfterImages: [],

    tldrBullets: [
      "Built an automated reporting bridge between the operator's platform and Brazil's SPA (Secretariat of Prizes and Bets) ahead of the non-negotiable 2025 regulatory deadline.",
      'Implemented a 24/7 reporting cycle with a pre-submission reconciliation layer auditing every BRL wagered before daily file transmission.',
      "Achieved 100% acceptance rates for daily SIGAP submissions, maintaining the operator's .bet.br licensed status.",
      "Contributed to Brazil's R$9 billion tax revenue pool while ensuring the full PIX financial audit trail required by regulators.",
    ],

    context: "Before 2025, Brazil's betting market operated in a legal grey area. Without centralised oversight, billions in tax revenue were lost to offshore operators, problem gamblers could move freely between platforms, and the industry had no standardised framework for detecting financial crime. The government had no real-time visibility into betting volumes, payouts, or player demographics.",
    opportunity: "Brazil's 2025 regulatory deadline created a forcing function. Operators who could not demonstrate full compliance with the SPA (Brazil's Secretariat of Prizes and Bets) risked losing their licence entirely. The opportunity was to build a robust, automated reporting pipeline that would make compliance seamless rather than a recurring operational burden.",

    sections: [
      {
        title: 'Initial Problem',
        body: "The core question was: how do you build a system that guarantees first-attempt acceptance by the SIGAP validator, at scale, every single day without manual intervention?",
      },
      {
        title: 'Building the Reporting Pipeline',
        body: "The solution was a fully automated 24/7 reporting cycle that compiles, reconciles, and transmits daily data files to the SPA within its required windows. A pre-submission reconciliation layer audits player balances, bets, and payouts before any file leaves the operator's server. Secure JSON/XML transmission feeds directly into SIGAP's Data Transmission Engine, with a real-time feedback loop that monitors acceptance status and triggers instant alerts on any rejection.\n\nThe non-negotiable government deadline made this a sprint. Stress testing under simulated daily record volumes ensured the transmission engine could handle the scale of the Brazilian market without throttling.",
      },
      {
        title: 'Additional Details',
        body: "I acted as both Product Manager — working across data engineers and compliance specialists to own the delivery end to end, and taking on the role of directly responsible individual to ensure the pipeline was built to a standard that would hold up under regulatory scrutiny.\n\nThe result was 100% daily file acceptance, full PIX audit coverage, and a contribution to Brazil's R$9 billion tax revenue pool, replacing grey area reporting with a fully automated, reconciled compliance service that ensures long-term business continuity in the market.",
      },
    ],

    role: 'Product Manager',
    roleDescription: 'Led product and technical delivery of the SIGAP compliance integration.',

    durationMonths: 4,
    durationDescription: 'Sprint-to-compliance delivery against a non-negotiable government deadline.',
    dateRange: 'Q3 2024 → Q4 2024',

    timeline: [
      { phase: 'Scoping', date: 'Jul – Aug 2024', description: 'SPA schema analysis, compliance mapping, and reconciliation logic design with compliance specialists.', isLive: false },
      { phase: 'Build', date: 'Sep 2024', description: 'Scheduling engine, reconciliation layer, API integration, and validation feedback loop built in parallel.', isLive: false },
      { phase: 'Stress Testing', date: 'Oct 2024', description: 'Full-volume simulation of daily records. Schema variants validated against SIGAP in staging.', isLive: false },
      { phase: 'Live', date: 'Nov 2024', description: '100% daily acceptance rate. Operator .bet.br status confirmed. Zero compliance incidents.', isLive: true },
    ],

    tools: ['Python', 'Linear', 'Notion', 'Confluence', 'JSON/XML', 'SIGAP API'],

    prevProject: { slug: 'predict-6', title: 'Predict 6' },
    nextProject: null,
  },
];

export default projects;
