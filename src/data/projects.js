const projects = [
  {
    // ── Bento grid fields ────────────────────────────────────────────────────
    slug: 'pickem',
    title: "Pick'em",
    description: "A B2B 'More or Less' player props sportsbook built from scratch, shipped via casino aggregator and live under 12 months.",
    heroTitle: "Pick'em: a sportsbook for a different generation",
    type: 'Sportsbook Innovation (Supplier)',
    category: ['B2B', 'Zero-to-One'],
    season: '2025',
    duration: '10 Months',
    featured: true,
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)',
    cardImage: '/images/pickem/pickem.png',
    heroBadges: [],
    heroAward: { year: '2025', title: 'Winner', category: 'Sportsbook Innovation (Supplier)' },
    overviewStatement: "Pick'em is the first white-label 'More or Less' player props prediction built for B2B iGaming. A product category that didn't exist, built from scratch and live in under a year.",
    impactStats: [
      { value: '10 Months', label: 'Concept to first live operator', delta: 'Shipped inside a 12-month window' },
      { value: '5', label: 'Continents', delta: 'South America, Asia, Europe, Australia, North America' },
      { value: '3', label: 'New aggregator deals', delta: 'Increasing ability to upsell casino content' },
    ],

    // ── Slug page fields ─────────────────────────────────────────────────────
    tags: ['B2B', 'Zero-to-One', '2025'],
    heroImage: null,
    heroImages: [
      '/images/pickem/main1_new.png',
      '/images/pickem/betplaced2.png',
    ],
    heroImagesFit: ['contain', 'contain'],
    polaroidImages: [],
    images: [],
    beforeAfterImages: [],

    context: "Most sportsbooks were built for a different era; designed for desktop, for experienced bettors, and for markets measured in fractional odds. The younger and modern fan that follows individual players (LeBron or Messi) rather than a team, was largely ignored.\n\nB2C disruptors like Underdog Fantasy and PrizePicks had proven that simplifying betting into a binary \"More or Less\" choice could unlock an entirely new audience. No B2B equivalent existed. The opportunity was to build the first white-label Pick'em engine that any operator could plug in and own.",
    contextHighlights: ["sportsbooks were built for a different era", "younger and modern fan", "was largely ignored"],
    opportunitySection: {
      label: 'Opportunity',
      heading: "The B2B iGaming market had no answer for the modern fan",
      paragraphs: [
        "Most sportsbooks were built for a different era — designed for desktop, for experienced bettors, and for markets measured in fractional odds.",
        "The younger and modern fan that follows LeBron or Messi rather than a team scoreline was largely ignored. They wanted to bet on players, not markets.",
        "B2C disruptors like Underdog Fantasy and PrizePicks had already proven the model: reduce the decision to a single binary — more or less — and unlock a new audience.",
        "No B2B equivalent existed. The opportunity was to build the first white-label Pick'em engine that any operator could plug in and own.",
      ],
      highlights: [
        'sportsbooks were built for a different era',
        'younger and modern fan',
        'unlock a new audience',
      ],
      images: [
        '/images/pickem/underdog.png',
        '/images/pickem/prizepicks.png',
        '/images/pickem/pick6.png',
        '/images/pickem/dabble.jpg',
      ],
    },

    sections: [],
    hideRoleWidget: true,
    hideFloatingTOC: true,
    sectionGap: 100,

    services: [
      'Vision',
      'Roadmap',
      'Commercial Strategy',
      'Multiplier Modelling',
      'Integrations',
      'Design Direction',
    ],

    role: 'Product Manager',
    dateRange: '2025',

    timeline: [
      { phase: 'Research & Concept', date: 'Q1 2024', description: 'Competitive analysis, data feed evaluation, multiplier logic modelling, and product vision defined.', isLive: false },
      { phase: 'Build', date: 'Q2–Q3 2024', description: 'Core product built across microservices architecture. Aggregator integration and settlement engine delivered.', isLive: false },
      { phase: 'First Operator', date: 'Q4 2024', description: 'First operator live. 3-tier commercial model finalised. Integration complexity absorbed.', isLive: false },
      { phase: 'Global Expansion', date: '2025', description: '5 operators live across 5 continents. Market coverage expanded based on operator feedback.', isLive: true },
    ],

    tools: ['Figma', 'Linear', 'Notion', 'Excel', 'OpticOdds', 'Miro', 'Confluence'],

    integrationProcess: {
      label: 'Integration process',
      heading: "Three layers of dependency, one product to deliver",
      columns: [
        "Every operator integration ran through a 3-layer stack: Pick'em, a casino aggregator, and the operator's own platform. Each layer moved at a different speed, held different technical standards, and had different stakeholders. Misalignment at any layer created cascading delays.",
        "Navigating this required a flexible microservice architecture that could absorb inconsistency across operator environments, and constant stakeholder alignment to keep all three parties moving in the same direction. The complexity was known — and managed as a deliberate product constraint rather than a failure of planning.",
      ],
      columnHighlights: ['flexible microservice architecture'],
    },

    productDecisions: {
      items: [
        {
          title: 'Binary mechanic over flexibility',
          body: "Removing odds, markets, and bet types wasn't simplification for its own sake. It was a deliberate decision about who we were building for and what friction was worth keeping.",
        },
        {
          title: '3-layer integration as a feature',
          body: "Routing through the aggregator added complexity but gave operators a faster path to go-live. The integration overhead was a known trade-off made consciously to accelerate commercial reach.",
          highlights: ['accelerate commercial reach.'],
        },
        {
          title: 'Player-first data model',
          body: "Structuring predictions around individual player stats rather than match outcomes was a product decision, not a design one. It determined the data feeds we needed and the markets we could support.",
          highlights: ['data feeds', 'markets we could support'],
        },
        {
          title: 'Own the multiplier model',
          body: "The payout formula was built from scratch rather than lifted from a competitor. Reverse-engineering existing models gave a baseline, then rebuilt to protect operator margins while keeping rewards fair and transparent.",
          highlights: ['payout formula was built from scratch'],
        },
      ],
      videos: ['/videos/cut_basketballselect.mp4', '/videos/cut_betoption.mp4'],
    },

    userExperience: {
      label: 'User experience',
      heading: "Designed to feel like a game, not a bet",
      intro: "Every design decision was made to reduce friction and increase investment. The goal was a product that felt immediately intuitive to someone who had never placed a sports bet in their life.",
      introHighlights: ['immediately intuitive'],
      ideas: [
        {
          title: 'Card-based player selection',
          body: "Players are surfaced as cards rather than rows in a table. Each card leads with the athlete's image and stat line, making the choice feel personal and visual rather than analytical.",
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
        {
          title: 'A slip built for every type of player',
          body: "The betslip offers two modes: Flex Play for risk-averse players who want a safety net on their picks, and Power Play for those chasing bigger returns. Rather than a one-size-fits-all slip, the format adapts to how bold the player wants to be, making Pick'em accessible to a much wider audience.",
          highlights: ['Flex Play for risk-averse', 'Power Play for those chasing bigger returns'],
          video: '/videos/cut_bet_placed.mp4',
        },
        {
          title: 'Outcome moments',
          body: "When a leg settles, the feedback is deliberate. A won leg feels different to a lost one. These micro-moments were considered individually because they are what players remember and come back for.",
        },
      ],
    },

    bonus: {
      label: 'Bonus',
      heading: 'A free-to-play acquisition layer',
      body: "Pick'em doubled as an acquisition tool for operators. Deployed in free-to-play mode, it gave operators a zero-friction way to onboard users who weren't ready to deposit, using the prediction mechanic to build familiarity and habit before converting them into real-money players.",
      images: ['/images/pickem/main1.png', '/images/pickem/main3.png'],
    },

    coreIdeas: {
      label: 'Core ideas',
      heading: 'Simplify the bet, amplify the player',
      intro: "The entire product rests on removing complexity without removing engagement. Every core decision traced back to one question: does this make it easier to care about the outcome?",
      ideas: [
        {
          title: 'One question, not a market',
          body: "Traditional sportsbooks ask users to navigate hundreds of markets, odds formats, and bet types. Pick'em reduces the entire decision to a single binary: more or less? Removing that cognitive load was what unlocked a new audience.",
          highlights: ["Pick'em reduces the entire decision to a single binary: more or less?"],
          video: '/videos/cut_footballselect.mp4',
        },
        {
          title: 'Follow the player, not the scoreline',
          body: "Modern sports fans identify with individual athletes far more than with teams or match outcomes. Structuring predictions around player performance stats rather than match results made the product feel native to how that audience already consumes sport.",
          highlights: ['individual athletes far more than with teams or match outcomes'],
          igCards: [
            { handle: 'vinijr',          name: 'Vinicius Jr.',       followers: '60M',  image: '/images/pickem/vini_ig.png' },
            { handle: 'judebellingham',   name: 'Jude Bellingham',    followers: '41.3M', image: '/images/pickem/bellingham_ig.png' },
            { handle: 'bukayosaka87',     name: 'Bukayo Saka',        followers: '7.7M',  image: '/images/pickem/saka_ig.png' },
            { handle: 'leomessi',         name: 'Leo Messi',          followers: '512M',  image: '/images/pickem/messi_ig.png' },
            { handle: 'cristiano',        name: 'Cristiano Ronaldo',  followers: '673M',  image: '/images/pickem/ronaldo_ig.png' },
          ],
        },
        {
          title: 'The multiplier is the mechanic',
          body: "The payout multiplier is what makes a pick feel meaningful. I modelled the formula from scratch, reverse-engineering competitor logic before rebuilding it to protect operator margins while keeping the reward feel fair and transparent to the player.",
          bracketTitle: true,
          bracketNote: 'important for risk management',
        },
      ],
    },

    launch: {
      label: 'The launch',
      heading: "From zero to five continents in under a year",
      columns: [
        "Pick'em went live with its first operator in Q4 2025, less than 12 months after the initial concept. The first integration absorbed the full complexity of the 3-layer architecture and proved the model worked end-to-end.",
        "By Q1 2026, five operators are scheduled to be live across South America, Asia, Europe, and North America.",
      ],
      image: '/images/pickem/pickem-ice.png',
      imageLabel: 'ICE Conference',
    },

    learnings: [
      {
        title: 'Integration complexity compounds',
        body: "A 3-layer dependency (our product, the aggregator, the operator) sounds manageable until each layer moves at a different speed. Every misalignment multiplied. Building in reconciliation checkpoints earlier would have saved weeks.",
      },
      {
        title: 'Multiplier logic is a product decision',
        body: "Getting the maths wrong isn't just a technical failure. It erodes player trust and squeezes operator margins. Owning the model end-to-end, not delegating it, was the right call.",
      },
      {
        title: 'Operators are not interchangeable',
        body: "Each operator brought different fan bases, sport preferences, and technical standards. Assuming one integration pattern would scale across all of them cost us time on every new launch.",
      },
      {
        title: 'Speed to first live beats speed to perfect',
        body: "The first operator taught us more than six months of internal testing ever could. Getting something live and learning from real usage was always the faster path.",
      },
    ],

    prevProject: null,
    nextProject: { slug: 'reveals', title: 'Reveals' },
  },

  {
    // ── Bento grid fields ────────────────────────────────────────────────────
    slug: 'reveals',
    hideFloatingTOC: true,
    hideHeroGrid: true,
    sectionGap: 100,
    belowHeroImages: ['/images/reveals/reveal_1.png', '/images/reveals/reveal_2.png'],
    title: 'Reveals',
    description: "Using Gacha mechanics and an AI-powered personalisation loop to build user loyalty and increase daily logins.",
    heroTitle: "Reveals: a daily free-to-play sports game and AI reward engine",
    category: ['B2B', 'AI'],
    season: 'Q1 2026',
    duration: '3 Months',
    featured: false,
    gradient: 'linear-gradient(135deg, #f7971e 0%, #e040fb 100%)',
    cardImage: '/images/reveals/reveals-thumb2.png',

    // ── Slug page fields ─────────────────────────────────────────────────────
    tags: ['B2B', 'AI', 'Engagement', '2024'],
    heroImage: null,
    heroImages: [],
    heroImagesFit: [],
    polaroidImages: [],
    images: [],
    beforeAfterImages: [],

    overviewStatement: "Reveals is a daily free-to-play pack-opening game built to increase login frequency. It borrows habit-forming mechanics from mobile gaming and uses AI to identify and reward users at the moment they are most likely to churn.",
    impactStats: [
      { value: '30%+', label: 'Daily logins', delta: 'Increase in daily login rate' },
      { value: 'AI-Powered', label: 'Personalisation layer', delta: 'AI layer recalculates and adapts week-on-week' },
      { value: '3 Months', label: 'Idea to delivered product', delta: 'Conceived, designed, and shipped end-to-end' },
    ],

    sections: [],
    hideRoleWidget: true,

    services: [
      'Vision',
      'Game Design',
      'AI Architecture',
      'Commercial Model',
    ],

    role: 'Product Manager',
    dateRange: 'Q1 2026',

    opportunitySection: {
      label: 'Opportunity',
      heading: "iGaming had acquisition but not retention",
      paragraphs: [
        "In iGaming, acquisition is expensive and loyalty is fragile. Most operators rely on financial incentives — free bets, free spins — to retain users. This attracts bonus hunters rather than genuine fans, inflating Customer Acquisition Costs while doing nothing for long-term Lifetime Value.",
      ],
      wideParagraph: "Mobile gaming had spent years perfecting daily engagement mechanics. Clash of Clans, TCG Pocket, FIFA Ultimate Team — these products had cracked habit formation through variable rewards, scarcity, and personalisation. Almost none of this thinking had crossed over into sports betting.",
      pullQuote: {
        text: "Up to 40% of users disappear after their first session, long before any real value is captured.",
        source: "InData Labs, Sports Betting Churn Study",
      },
      highlights: ['variable rewards, scarcity, and personalisation', 'acquisition is expensive and loyalty is fragile'],
      images: ['/images/reveals/lootbox.jpg'],
      imageBelow: true,
      imageLabel: 'Lootboxes: a core mechanic behind free-to-play games',
      bonusWidgets: [
        { brand: 'BETFRED', brandStyle: { background: '#E30613', color: '#fff', fontWeight: 800, fontSize: 11, padding: '2px 7px', borderRadius: 3, letterSpacing: '0.04em' }, bg: 'linear-gradient(135deg, #003087 0%, #001a4d 100%)', offer: '£50 in Free Bets', sub: 'when you bet £10' },
        { brand: 'sky bet', brandStyle: { background: '#0070CC', color: '#fff', fontWeight: 700, fontSize: 11, padding: '2px 8px', borderRadius: 4 }, bg: 'linear-gradient(135deg, #0052CC 0%, #00338a 100%)', offer: 'Get £50 in Free Bets', sub: 'New Customer Offers' },
        { brand: 'bet365', brandStyle: { background: '#027B5B', color: '#FFD700', fontWeight: 800, fontSize: 11, padding: '2px 7px', borderRadius: 3, letterSpacing: '0.02em' }, bg: 'linear-gradient(135deg, #1a3d2b 0%, #0a1f16 100%)', offer: 'Bet £10 Get £50', sub: 'in Bonus Bets' },
        { brand: 'Livescore', brandStyle: { background: 'transparent', color: '#FF6900', fontWeight: 800, fontSize: 12, padding: '0', borderRadius: 0, letterSpacing: '0.02em' }, bg: 'linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%)', offer: 'Bet £10 Get £30', sub: 'Free Bet for New Customers' },
      ],
    },

    gameSection: {
      label: 'The product',
      heading: 'A pack-opening mechanic built around live sport',
      intro: '',
      video: '/videos/reveals.webm',
      steps: [
        { label: 'Monday to Friday', title: 'A new Reveal every day', body: "Each weekday a fresh player card becomes available to open. The 24-hour window is deliberate — miss a day and it's gone." },
        { label: 'Open the Reveal', title: "You don't know who you're getting", body: "Players are hidden until the moment of reveal. A Haaland is rare. A Tarkowski is common. The mystery is the mechanic." },
        { label: 'The weekend', title: 'Your player plays', body: "If your revealed player hits their target stat — goals, assists, points — over the weekend, you win a reward." },
        { label: 'Monday', title: 'Collect and repeat', body: "Rewards land at the start of the week. A new set of Reveals opens. The cycle starts again." },
      ],
      aiNote: {
        heading: 'The AI feedback loop',
        intro: 'The Reveal experience is the hook. Beneath it, an AI layer makes the product commercially intelligent.',
        steps: [
          { title: 'User profiling', body: 'A predictive model profiles users early in their lifecycle, identifying signals of high-value or bonus-abusive behaviour.' },
          { title: 'Dynamic player selection', body: 'An AI agent adjusts the potential players a user can return -- balancing individual engagement likelihood against operator-defined KPI targets and financial caps.' },
          { title: 'Continuous optimisation', body: 'The system adjusts week-on-week, continuously closing the gap between actual and target outcomes.' },
        ],
      },
    },

    whyItWorks: {
      label: 'Why it works',
      heading: 'Built around how habits actually form',
      preQuote: "Reveals works because it is built on psychological triggers that are deeply embedded in how people form habits. These are the mechanisms behind every habit-forming product that has ever achieved genuine daily engagement. Nir Eyal documents exactly this in Hooked, and his framework serves as evidence for why these triggers work, not the source of them.",
    preQuoteLinks: [{ text: 'Hooked', url: 'https://www.amazon.co.uk/Hooked-How-Build-Habit-Forming-Products/dp/1591847788' }],
    preQuoteHighlights: ['psychological triggers'],
    quote: "A habit is when not doing an action causes a bit of pain.",
      quoteAttribution: "Nir Eyal, Hooked",
    quoteAttributionUrl: "https://www.amazon.co.uk/Hooked-How-Build-Habit-Forming-Products/dp/1591847788",
    quoteAttributionLinkText: "Hooked",
      intro: "",
      principles: [
        { stage: 'Trigger', title: 'External becomes internal', body: "A new pick drops at the same time every weekday. A push notification is the initial pull. Over time the internal trigger takes over. The habit becomes checking Reveals at 17:00, not responding to a reminder.", highlights: ['internal trigger takes over'] },
        { stage: 'Action', title: 'Zero barrier to entry', body: "Free to play. No deposit. No odds to understand. The action is as frictionless as possible: a single tap to reveal. Exactly as Hooked prescribes.", highlights: ['a single tap to reveal'] },
        { stage: 'Variable reward', title: "You don't know who you're getting", body: "The player reveal is inherently unpredictable. A rare player feels like winning the lottery. This variability is the core driver of compulsive re-engagement across every habit-forming product.", highlights: ['unpredictable'] },
        { stage: 'Scarcity', title: 'Miss it and it is gone', body: "Each Reveal is only available for 24 hours. The window is deliberate. It creates urgency that passive products simply cannot manufacture. Users return not out of habit alone but because not returning has a cost.", highlights: ['available for 24 hours'] },
        { stage: 'Investment', title: 'Anticipation compounds across the week', body: "Users build a squad of revealed players over five days. The more picks they have, the more they care about the weekend, and the more certain they are to return on Monday." },
      ],
    },

    userExperience: {
      label: 'User experience',
      heading: "Designed to feel like a game, not a betting product",
      intro: "From the reveal animation and card visual language to the reward feedback moments that follow a weekend result the goal was to make something immediately familiar to anyone who had ever opened a pack in a mobile game, while remaining native to a sports betting context.",
      introHighlights: ['immediately familiar to anyone who had ever opened a pack in a mobile game'],
      introSub: "The reveal animation is designed to feel like unpacking a collectible. For anyone who grew up opening FIFA Ultimate Team packs, the mental model is instant — that same mix of anticipation and not knowing what you are about to get.",
      introImages: ['/images/reveals/reveals_3.png'],
    introImageCards: [],
      ideas: [],
    },

    launch: {
      label: 'The launch',
      heading: 'Early signals and a World Cup window.',
      columns: [
        { text: "With the first operator now live, early results are promising. The clearest signal is user activity spiking in the window just before a new Reveal drops each weekday — exactly the anticipation behaviour the habit loop was designed to produce. Daily login rate is trending upward, and the pattern is consistent enough to suggest the mechanic is forming the routine we intended.", highlights: ['user activity spiking', 'just before a new Reveal drops'] },
        { text: "Two further operators go live in time for the FIFA World Cup — the highest-traffic window in the sports calendar. By continuously monitoring user activity and game interaction, we will keep optimising the habit loop and tuning the AI model to stay aligned with each operator's KPI targets as volume scales." },
      ],
    },

    learnings: [
      {
        title: 'Prototype earlier',
        body: "Securing internal buy-in was harder than building the product. Describing pack-opening mechanics for football predictions in a meeting room is harder than showing it. A faster path to something visual would have compressed the approval timeline significantly.",
      },
      {
        title: 'Cross-industry research compounds',
        body: "The idea came entirely from outside iGaming — from mobile gaming, TCG mechanics, and Nir Eyal's Hooked. The biggest product insights here were borrowed, not invented. Looking outside the category first is almost always worth it.",
      },
      {
        title: 'Commercial intelligence from day one',
        body: "Building the AI feedback loop as a core layer — not a bolt-on — meant the commercial model was part of the design from the start. Operator KPI guardrails built in early cost far less than retrofitting them later.",
      },
      {
        title: 'Speed to something real',
        body: "Went from idea to delivered product in under three months. The first operator integration taught more than months of internal review ever would. Getting something live and learning from real usage is always the faster path.",
      },
    ],

    durationMonths: 3,
    durationDescription: 'Idea to delivered product in under three months. First operator going live.',
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
    hideFloatingTOC: true,
    sectionGap: 100,
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
      '/images/predict6/p6_1.png',
      '/images/predict6/p6_2.png',
    ],
    heroImagesFit: ['contain', 'contain'],
    polaroidImages: [],
    images: [],
    beforeAfterImages: [],

    tldrBullets: [],

    overviewStatement: "A free-to-play weekly score predictor built to acquire users by offering a £250,000+ jackpot.",

    impactStats: [
      { value: '?', label: 'Weekly Active User increase', delta: 'WAU impact will be measured upon release' },
      { value: '2 Months', label: 'Concept to delivered', delta: 'Conceived, designed, and shipped end-to-end' },
    ],

    opportunitySection: {
      label: 'Opportunity',
      heading: "The biggest sportsbooks had free-to-play. Everyone else didn't.",
      paragraphs: [
        "Sportsbooks lose potential users at the registration stage. Deposit bonuses only work on users already willing to put money in — the hesitant majority never make it past the deposit screen. Operators spend heavily to acquire curious users, then lose them before capturing any value.",
        "There were many operators who had already proven the model: a free-to-play jackpot product builds large, loyal weekly audiences. Predict 6 was built to give our existing operators the same proven format natively — without the dependency on a third party.",
      ],
      highlights: ['spend heavily to acquire curious users, then lose them before capturing any value.'],
      images: ['/images/predict6/sky6.jpg', '/images/predict6/livescore6.png', '/images/predict6/uel_6.jpg', '/images/predict6/goal_6.jpg'],
    },

    coreIdeas: {
      label: 'The product',
      heading: 'Simple enough to complete in under a minute',
      intro: "Remove every possible reason not to play. No odds. No deposit. No expertise required. Just one question: what do you think the score will be?",
      ideas: [
        {
          title: 'A fixed weekly cycle',
          body: "Predict 6 runs on a fixed weekly cycle aligned to Premier League fixtures. Users select exact scores for six matches, submit before kick-off, and win if their predictions are correct — with a £250,000 jackpot designed to be newsworthy and shareable. The simplicity is the product.",
          highlights: ['simplicity is the product'],
        },
        {
          title: 'The upsell: an enhancement, not a gate',
          body: "The upsell prompt appears after submission, surfacing recommended casino games and offers based on the user's profile. The sequencing is deliberate: earn trust first, convert second.",
          highlights: ['recommended casino games and offers'],
        },
        {
          title: 'Built to be owned',
          body: "Predict 6 is a white-label B2B product. Operator partners get a proven acquisition mechanic they can brand, configure, and launch without building from scratch or depending on a third-party platform.",
          highlights: ['white-label B2B product'],
        },
      ],
    },

    launch: {
      label: 'The launch',
      heading: 'Three operators lined up for the new season.',
      columns: [
        { text: "Predict 6 goes live with three operator partners at the start of the Premier League season — the natural moment to launch a product built around weekly fixtures. The season gives us a sustained window of real-world engagement to see how the mechanic performs with live audiences." },
        { text: "The tracking infrastructure is in place from day one. Weekly Active Users, submission rates, upsell conversion, and retention across the season are all instrumented and ready to measure. The data will tell us what works and where to take the product next.", underlines: ['Weekly Active Users', 'submission rates', 'upsell conversion', 'retention'] },
      ],
    },

    sections: [],

    learnings: [
      {
        title: 'Simplicity is the hardest design problem',
        body: "Every unnecessary step is a reason not to play. Getting Predict 6 to a product any casual fan could complete in under a minute required removing things that felt useful but added friction. Less was always more.",
      },
      {
        title: 'Sequence the upsell correctly',
        body: "Showing the deposit prompt before the user had experienced the product would have killed conversion. Putting it after submission — once they already had skin in the game — made it feel natural. The order matters as much as the offer.",
      },
      {
        title: 'Cross-industry research pays off',
        body: "The product was informed entirely by what Sky and BetVictor had already proven worked. Looking at what large B2C operators do well and packaging it for the B2B market is a repeatable product strategy.",
      },
    ],

    hideRoleWidget: true,
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
    hideFloatingTOC: true,
    title: 'SIGAP Reporting',
    description: 'Automated regulatory reporting bridge for Brazil\'s 2025 betting compliance deadline.',
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

    tldrBullets: [],

    overviewStatement: "An automated 24/7 regulatory reporting bridge built to achieve 100% daily submission acceptance for Brazil's 2025 betting compliance deadline.",

    impactStats: [
      { value: '0', label: 'Compliance failures', delta: 'Since go-live in December 2024' },
      { value: '4 Months', label: 'Concept to live', delta: 'Against a non-negotiable government deadline' },
    ],

    opportunitySection: {
      label: 'Scope',
      heading: "Brazil's market had scale but no compliance infrastructure",
      paragraphs: [
        "Before 2025, Brazil's betting market operated in a legal grey area. Without centralised oversight, billions in tax revenue were lost to offshore operators, problem gamblers could move freely between platforms, and the industry had no standardised framework for detecting financial crime.",
        "Brazil's 2025 regulatory deadline created a forcing function. Operators who could not demonstrate full compliance with the SPA risked losing their licence entirely. The opportunity was to build a robust, automated reporting pipeline that made compliance seamless rather than a recurring operational burden.",
      ],
      highlights: ['non-negotiable government deadline', 'compliance seamless'],
    },

    coreIdeas: {
      label: 'The solution',
      heading: 'A fully automated compliance pipeline',
      intro: "The core question: how do you guarantee first-attempt acceptance by the SIGAP validator, at scale, every single day, without manual intervention?",
      ideas: [
        {
          title: 'Pre-submission reconciliation',
          body: "A reconciliation layer audits every player balance, bet, and payout before any file leaves the operator's server. Nothing transmits until the data is clean.",
          highlights: ['audits every player balance, bet, and payout'],
        },
        {
          title: '24/7 reporting cycle',
          body: "Secure JSON/XML transmission feeds directly into SIGAP's Data Transmission Engine, with a real-time feedback loop that monitors acceptance status and triggers instant alerts on any rejection.",
          highlights: ['real-time feedback loop'],
        },
        {
          title: 'Built for Brazilian market scale',
          body: "Stress tested under simulated daily record volumes to ensure the transmission engine could handle the full scale of the market without throttling ahead of the live deadline.",
        },
        {
          title: 'Full PIX audit trail',
          body: "Every transaction is tracked against the PIX financial audit trail required by regulators, ensuring complete traceability from wager to payout across all operator accounts.",
          highlights: ['PIX financial audit trail'],
        },
      ],
    },

    launch: {
      label: 'The outcome',
      heading: 'Zero compliance incidents.',
      columns: [
        { text: "The pipeline went live in December 2024 ahead of the regulatory deadline. Daily SIGAP submissions have been consistently accepted, maintaining the operator's .bet.br licensed status in Brazil's newly regulated market." },
        { text: "Full PIX audit coverage was achieved across all transactions, contributing to Brazil's R$9 billion tax revenue pool and replacing grey area reporting with a fully automated, reconciled compliance service that ensures long-term business continuity in the market." },
      ],
    },

    sections: [],

    learnings: [
      {
        title: 'Compliance as product',
        body: "Treating the regulatory deadline as a product launch — with a spec, a build, and a go-live — was the right mental model. Compliance work fails when it is treated as an afterthought.",
      },
      {
        title: 'Reconciliation before transmission',
        body: "The pre-submission audit layer was the most important architectural decision. First-attempt acceptance depends entirely on the quality of data going in, not on error recovery after the fact.",
      },
      {
        title: 'Cross-discipline ownership',
        body: "Owning delivery across data engineers and compliance specialists required being fluent in both domains. A PM who can read a schema and understand a legal obligation closes the gap faster than one who cannot.",
      },
    ],

    hideRoleWidget: true,
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
