export type BodyBlock =
  | { type: "h2";        text: string; id: string }
  | { type: "h3";        text: string; id: string }
  | { type: "p";         text: string }
  | { type: "blockquote";text: string }
  | { type: "ul";        items: string[] }
  | { type: "callout";   icon: string; text: string }
  | { type: "image";     src: string; alt: string; caption?: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
  featuredImage?: string;
  body: BodyBlock[];
  relatedSlugs: string[];
};

const articles: Article[] = [
  {
    slug: "acquire-churn-repeat",
    title: "Acquire. Churn. Repeat. The cycle that breaks businesses.",
    featuredImage: "/images/articles/acquire-churn-repeat.png",
    excerpt:
      "The obsession with new customers is a structural flaw. When your strategy ends at the 'Buy Now' button, you aren't building a business — you're running a treadmill.",
    category: "Product Strategy",
    date: "February 2026",
    readTime: "5 min",
    featured: false,
    relatedSlugs: ["outcome-led-roadmaps", "art-of-the-kill"],
    body: [
      { type: "h2", id: "cult-of-the-new", text: "The Cult of the New" },
      { type: "p", text: "In today's boardroom, \"growth\" has become synonymous with \"new.\" We celebrate fresh logos and top-of-funnel metrics while the back door stands wide open. This obsession with the chase isn't just a preference; it's a structural flaw. Whether you're a lean startup or a legacy giant, treating customer acquisition as your only lever for growth is a high-speed path to financial burnout." },
      { type: "p", text: "The hard truth? A customer's first transaction is an introduction, not a payday. If your strategy ends at the \"Buy Now\" button, you aren't building a business; you're running a treadmill." },

      { type: "h2", id: "cac-death-spiral", text: "Phase 1: The CAC Death Spiral" },
      { type: "p", text: "The cost of acquiring a customer (CAC) continues to grow. Between platform saturation, expensive methods of acquisition and relentless bidding wars on Google and Meta, the \"digital tax\" is rising." },
      { type: "ul", items: [
        "Upside-Down Economics: Many brands now pay more to acquire a lead than that lead spends on their first transaction. Without a secondary sale, you are literally losing money on every \"win.\"",
        "The Volume Trap: Marketing teams are often incentivised by raw numbers rather than quality. This often leads to sloppy, expensive spending just to hit quarterly targets.",
        "Market Fragility: When your growth depends entirely on paid clicks, your business is a hostage to the next algorithm update or ad-rate hike.",
      ]},

      { type: "h2", id: "vanity-metric-delusion", text: "Phase 2: The Vanity Metric Delusion" },
      { type: "p", text: "The \"Acquisition Trap\" is fed by data that looks good in a slide deck but rots on a balance sheet. Companies obsess over Total New Customer Count, Aggregate Ad Reach, and Initial Conversion Rates." },
      { type: "p", text: "Meanwhile, the metrics that actually signal a healthy business — LTV (Lifetime Value), Repeat Purchase Rate, and the LTV:CAC Ratio — are treated as afterthoughts. If you aren't profitable until the third or fourth purchase, but your strategy only focuses on the first, you are investing in a deficit." },

      { type: "h2", id: "hidden-tax-of-churn", text: "Phase 3: The Hidden Tax of Churn" },
      { type: "p", text: "Ignoring your current customers isn't just a missed opportunity; it's an active drain on your capital." },
      { type: "ul", items: [
        "The Profit Gap: Existing customers are pre-sold. They trust you. They are more likely to upsell, cross-sell, and spend more. Ignoring them is leaving high-margin revenue on the table.",
        "Silencing Your Best Marketers: A happy customer provides the only \"free\" marketing left: organic advocacy. When you neglect the post-purchase experience, you kill your referral engine and force yourself back into the expensive ad market.",
        "Sunk Onboarding Costs: Every new customer requires setup, education, and hand-holding. If they churn after one month, you've absorbed 100% of the overhead for 0% of the long-term reward.",
      ]},

      { type: "h2", id: "scale-vs-survival", text: "The Verdict: Scale vs. Survival" },
      { type: "p", text: "A business model built solely on acquisition is a house of cards. When growth plateaus, you can't just \"buy\" your way out of a retention problem. If the ad spend stops and your revenue disappears, you don't have a brand — but a media dependency." },
      { type: "p", text: "True scale comes from compounding inertia, not constant exertion. By sacrificing long-term equity for short-term spikes, you're filling a bucket that's mostly holes." },
      { type: "blockquote", text: "Is your organisation's biggest threat the rising cost of the \"chase,\" or the silent, expensive neglect of the customers you've already won?" },
    ],
  },

  {
    slug: "post-code-era",
    title: "The Post-Code Era: How AI is Dismantling the Traditional Software Team",
    excerpt:
      "When the mechanical act of writing code is no longer the bottleneck, the decades-old ratios that defined software development stop making sense. We are moving from a world of code scarcity to one of architectural abundance.",
    category: "AI & Tech",
    date: "March 2026",
    readTime: "6 min",
    featured: true,
    featuredImage: "/images/articles/software-team.png",
    relatedSlugs: ["cricket-odds-ai", "art-of-the-kill"],
    body: [
      { type: "h2", id: "seismic-shift", text: "A Seismic Shift in Software Development" },
      { type: "p", text: "For decades, the shape of a software team was a given. You needed engineers — lots of them — because writing code was hard, slow, and expensive. PMs existed to manage the queue. Designers existed to stop engineers from making things ugly. The ratio was baked into every org chart, every hiring plan, every Series A pitch deck." },
      { type: "p", text: "That world is ending. Not gradually — the way people predict paradigm shifts at conferences — but right now, in real teams, in real companies. AI coding tools have crossed a threshold where a single technically-literate person can do what once required a team of five. The implications for how we structure product organisations are not minor. They are total." },

      { type: "h2", id: "collapse-of-ratio", text: "The Collapse of the Old Ratio" },
      { type: "p", text: "The traditional squad model — one PM, one designer, five to eight engineers — was never a principled decision. It was a response to scarcity. Code was the bottleneck, so you hired heavily toward it. The ratio made sense when the constraint was engineering capacity." },
      { type: "callout", icon: "⚡", text: "The Old Way: a cross-platform app takes a full team months of sprints. The New Way: a solo builder ships a production-ready MVP in three weeks for $350." },
      { type: "p", text: "Remove that constraint and the entire justification for the ratio collapses. Teams that built around the assumption of engineering scarcity are now overloaded with capacity and underloaded with direction. The bottleneck has moved, but the org chart hasn't caught up." },
      { type: "p", text: "The uncomfortable truth is that many engineering roles as currently defined are not long for this world — not because engineers are becoming less valuable, but because the definition of what an engineer does is changing faster than most organisations can respond to." },

      { type: "h2", id: "everyone-is-a-builder", text: "Everyone is a Builder Now" },
      { type: "p", text: "The most significant consequence of AI coding tools isn't that engineers become more productive. It's that the threshold for who counts as a builder has dropped dramatically. A PM who can articulate a problem clearly and iterate on a prompt is now able to ship working software. A designer with a grasp of component libraries can write production-ready UI. A data analyst can build their own tooling without filing a ticket." },
      { type: "p", text: "This isn't theoretical. The 'vibe coding' movement — building software through natural language prompts, often without writing a single line manually — has produced working applications with real users. Cursor, Claude, and GitHub Copilot have fundamentally decoupled 'having an idea' from 'being able to build it'." },
      { type: "p", text: "The consequence is not that professional software engineers disappear. The consequence is that the gap between having a product idea and shipping a version of it has collapsed from months to days. Every function in a company now has the potential to become a builder function." },

      { type: "h2", id: "elevates-vs-compresses", text: "What Elevates vs. What Compresses" },
      { type: "p", text: "Not everything in the software team is equally affected. Some roles are elevated by this shift. Others are compressed." },
      { type: "p", text: "What gets elevated: architectural judgment, systems thinking, product taste, strategic clarity, and the ability to say no. These are the things AI cannot do. Deciding which problem is worth solving, which tradeoff to accept, which customer segment to disappoint in service of focus — these require human judgment grounded in context that exists nowhere in the model's training data." },
      { type: "p", text: "What gets compressed: boilerplate code, CRUD operations, basic API integrations, documentation, unit tests, and any implementation task that can be described precisely in natural language. These aren't all the things engineers do — but they're a significant portion of what junior and mid-level engineers spend their time on." },
      { type: "ul", items: [
        "Elevated: system architecture, technical judgment, product strategy, design taste",
        "Elevated: stakeholder reasoning, ethical judgment, novel problem framing",
        "Compressed: routine implementation, boilerplate, documentation, basic testing",
        "Compressed: large coordination layers built to manage code scarcity",
      ]},

      { type: "h2", id: "three-person-team", text: "The New Gold Standard: The Three-Person Team" },
      { type: "p", text: "If the old gold standard was the two-pizza team, the new one is smaller and more deliberate. The optimal AI-era product team is three people: a Visionary PM, a High-Taste Designer, and a Technical Architect." },
      { type: "p", text: "The Visionary PM owns the problem space. They know the user, the market, and the metrics. They're ruthless about what not to build, and they can articulate the strategy clearly enough that AI tools can execute against it. The High-Taste Designer holds the bar for the experience. In a world where UI can be generated in minutes, taste is the differentiator — someone who can tell the difference between something that works and something that's right. The Technical Architect understands the system deeply enough to make durable decisions about how the AI-generated code is structured, scaled, and maintained." },
      { type: "blockquote", text: "This trio can out-ship a traditional team of ten because they have zero coordination tax and total trust." },
      { type: "p", text: "This isn't a team that works without AI tools. It's a team that's designed around them. The AI is the fourth member — always available, endlessly productive, and completely without judgment. The three humans provide everything the AI cannot." },

      { type: "h2", id: "maintenance", text: "Maintenance: The Hidden Challenge" },
      { type: "p", text: "There is a trap in the post-code era that optimistic accounts of AI development tend to skip over: what happens six months after you ship? AI-generated code can be difficult to reason about, inconsistent in its patterns, and hard to hand off. If the person who prompted it into existence moves on, what remains can be a working system that nobody fully understands." },
      { type: "p", text: "This is not a reason to avoid AI tools. It's a reason to be more deliberate about the Technical Architect role. Someone needs to own the long-term coherence of the codebase — setting conventions, reviewing AI output critically, and ensuring that velocity today doesn't create a maintenance crisis tomorrow." },
      { type: "p", text: "The organisations that win in this era won't be the ones who move fastest. They'll be the ones who move fast without accumulating technical debt that eventually makes moving fast impossible." },

      { type: "h2", id: "strategy-bottleneck", text: "Strategy is the New Bottleneck" },
      { type: "p", text: "When code was the bottleneck, strategy felt like a luxury. You could get away with vague direction because there was always a sprint backlog to hide behind. In a world where implementation is cheap and fast, vague strategy is immediately and visibly costly. The gap between a clear strategic direction and a fuzzy one shows up in days, not quarters." },
      { type: "p", text: "This is the deepest shift the post-code era brings. The ability to say 'no' with conviction, to hold a line under stakeholder pressure, to make a clear bet and not flinch — this was always what separated good PMs from great ones. Now it's what separates teams that ship meaningful things from teams that ship a lot of things that don't matter." },
      { type: "p", text: "The scarcest resource in software is no longer the engineer who can write the code. It's the person who can decide what code is worth writing — and who has the clarity and the standing to make that call stick." },
    ],
  },

  {
    slug: "outcome-led-roadmaps",
    title: "Why Outcome-Led Roadmaps Beat Feature Lists Every Time",
    featuredImage: "/images/articles/product-roadmap.png",
    excerpt:
      "Most roadmaps are just a backlog in disguise. Here's how shifting to outcomes changed how my team builds, prioritises, and ships.",
    category: "Product Strategy",
    date: "12 May 2025",
    readTime: "5 min read",
    featured: true,
    relatedSlugs: ["art-of-the-kill", "acquire-churn-repeat"],
    body: [
      { type: "h2", id: "the-problem", text: "The Problem With Feature Roadmaps" },
      { type: "p", text: "Most product teams build roadmaps that read like a shopping list. Feature A in Q1. Feature B in Q2. A big redesign sometime in Q3 if everything goes to plan — which it never does. These roadmaps feel productive. They generate alignment. They give stakeholders something to point at. But they answer the wrong question." },
      { type: "p", text: "A feature list tells you what you're building. It says nothing about why, and even less about whether building it will actually move the business forward. When things slip — and they always slip — there's no principled way to reprioritise because the roadmap was never grounded in what you were trying to achieve in the first place." },
      { type: "blockquote", text: "A roadmap should answer \"what outcomes are we chasing?\" not \"what are we building next?\"" },
      { type: "h2", id: "what-outcome-led-looks-like", text: "What Outcome-Led Actually Looks Like" },
      { type: "p", text: "An outcome-led roadmap starts with the metrics you're trying to move, not the features you're planning to build. Each item on the roadmap is a bet: if we do this work, we believe it will produce this change in user behaviour, which will improve this metric." },
      { type: "p", text: "The practical difference is striking. Instead of 'Build a new onboarding flow', you write 'Reduce drop-off in the first session from 62% to below 40%'. The how is left open until discovery tells you what's actually causing the problem." },
      { type: "callout", icon: "💡", text: "The shift from features to outcomes isn't just a framing exercise. It fundamentally changes who is involved in roadmap decisions and when engineering is brought in." },
      { type: "h2", id: "making-the-switch", text: "Making the Switch" },
      { type: "p", text: "The hardest part of moving to outcome-led roadmaps isn't the format. It's the cultural shift required to hold the line when stakeholders want specifics. 'What are you actually going to build?' is a completely natural question, and 'we don't know yet, we're still in discovery' is an answer that requires trust to land well." },
      { type: "h3", id: "start-with-one-team", text: "Start With One Team" },
      { type: "p", text: "Don't try to flip the entire organisation at once. Pick one team, one quarter, and one metric. Document the process. Show the before and after. Let the results make the argument for you." },
      { type: "h3", id: "get-leadership-aligned", text: "Get Leadership Aligned on the Bet" },
      { type: "p", text: "Outcome-led roadmaps only work if leadership is reviewing outcomes, not feature lists. That means changing what gets presented in QBRs, what goes into board decks, and what PMs are held accountable for. This is hard. Do it anyway." },
      { type: "ul", items: [
        "Define the metric you're moving before any solution work begins",
        "Write the outcome hypothesis in plain language your CEO can challenge",
        "Review progress against outcomes, not feature completion, in sprint reviews",
        "Be explicit when you're pivoting the approach — not the outcome",
      ]},
      { type: "h2", id: "the-results", text: "The Results" },
      { type: "p", text: "In the teams I've worked with who made this transition, two things consistently happened. First, engineering felt more involved earlier — because the problem was open, not the solution. Second, stakeholder conversations got more interesting. Instead of debating whether to include a feature, we were debating what success actually looked like. That's a much more productive argument to have." },
    ],
  },

  {
    slug: "cricket-odds-ai",
    title: "Predicting Ball-by-Ball Cricket Odds with AI",
    featuredImage: "/images/articles/cricket-odds-ai.png",
    excerpt:
      "Instead of predicting who wins a match, I trained a TensorFlow neural network to predict what happens on every single delivery — then ran the game thousands of times.",
    category: "AI & Tech",
    date: "January 2023",
    readTime: "6 min",
    featured: false,
    relatedSlugs: ["post-code-era", "gacha-trap"],
    body: [
      { type: "p", text: "Most sports models try to predict the winner of a game by looking at the \"top-down\" view — e.g., historical wins, home-field advantage, and overall team strength. But cricket is a game of very small margins. A ball moving three centimetres to the left is the difference between a wicket and a six." },
      { type: "p", text: "To capture that volatility, I built a bottom-up simulation model powered by a TensorFlow neural network. Instead of predicting who wins, I trained the AI to predict what happens on every single delivery." },

      { type: "h2", id: "data", text: "1,000,000+ Data Points" },
      { type: "p", text: "The foundation of this project is a database spanning 17 years (2003–2021) of T20 cricket history with approximately 1,000,000 individual balls from 5,000+ matches involving 3,000+ players. The data includes leagues from the IPL, BBL, CPL, T20 Blast, Mzansi Super League, PSL, and BPL, sourced from publicly available domains such as ESPNCricinfo." },

      { type: "h2", id: "why-simulate-ball", text: "Why Simulate the Ball, Not the Match?" },
      { type: "p", text: "Choosing a \"bottom-up\" approach over a traditional \"top-down\" model was a strategic decision based on the inherent nature of the sport:" },
      { type: "ul", items: [
        "Individual Battles: Cricket is defined by matchups. This methodology captures how a specific bowler's historical distribution clashes with a specific batter's tendencies.",
        "Probabilistic Pivots: Matches turn on single moments. By simulating a game thousands of times, we can see how often those \"centimetre-wide\" margins flip the result.",
        "Complex Querying: We can ask more than \"Who wins?\" We can ask \"Who is likely to take the most wickets?\" or \"What is the probability of the Heat winning if Chris Lynn scores under 20?\"",
        "Granular Logic: It allows for conditional probabilities, such as a team's win percentage given they scored exactly 167 runs batting first.",
      ]},

      { type: "h2", id: "ball-prediction-model", text: "The Brain: The Ball Prediction Model" },
      { type: "p", text: "At the heart of this project is a multi-class classification problem. I trained a feed-forward neural network using TensorFlow to output the probability of 9 specific outcomes for any given ball: 0, 1, 2, 3, 4, 5, 6, Wide, or Wicket." },
      { type: "p", text: "The model doesn't just look at the players; it looks at the Match State. It takes inputs of innings, over number, current runs/wickets, and the historical performance distributions of both the batter and bowler. The architecture uses two dense layers (50 nodes each) with ReLU activation, Batch Normalisation, and Dropout to ensure the model generalises well to new data. The output is a Softmax layer that ensures the combined probability of all 9 outcomes equals exactly 100%." },

      { type: "h2", id: "monte-carlo", text: "The Engine: Running the Monte Carlo Simulation" },
      { type: "p", text: "Once the model can predict a single ball, we need an engine to \"play\" the game. Using Python, I built a MatchSimulator that follows these steps:" },
      { type: "ul", items: [
        "The Setup: Instantiate two teams and their historical stats.",
        "The Toss: A simulated coin flip determines who bats first.",
        "The Simulation Loop: The engine runs the Ball Prediction model and takes a random sample from the predicted probability distribution. If there is a 4% chance of a wicket and the random roll hits that 4%, the batter is out.",
        "The Update: The engine updates the Match State (rotating strike, incrementing the over) and feeds it back into the model for the next delivery.",
      ]},
      { type: "p", text: "By running this thousands of times, we move from a single \"random\" game to a statistical distribution of likely outcomes." },

      { type: "h2", id: "realism-vs-prediction", text: "Realism vs. Prediction" },
      { type: "p", text: "When I simulated 1,126 historical matches 500 times each, the results passed the \"eye test.\" The distributions of total scores and wickets in the simulations closely mirrored real-world T20 data. The goal wasn't world-class prediction accuracy — T20 is arguably too volatile for that — but rather to see if we could model the granularity of the game." },
      { type: "p", text: "The model excels at generating realistic simulations, even if the \"winner\" remains a coin flip. In fact, my analysis found that this model often outperformed professional bookmaker odds, which proved to be even less predictive than a model with no information at all." },
      { type: "blockquote", text: "The power of this AI approach isn't in telling you who will win, but in showing you all the different ways a match could unfold, one ball at a time." },
    ],
  },

  {
    slug: "art-of-the-kill",
    title: "The Art of the Kill: Why Great PMs Are Defined by What They Don't Ship",
    featuredImage: "/images/articles/art-of-the-kill.png",
    excerpt:
      "Shipping features is easy. Killing them takes courage. If your primary metric is volume of features delivered, you aren't managing a product — you're managing a factory.",
    category: "Product Strategy",
    date: "November 2025",
    readTime: "4 min",
    featured: false,
    relatedSlugs: ["stop-being-helpful", "outcome-led-roadmaps"],
    body: [
      { type: "p", text: "In the world of product management, there is a dangerous seductive pull toward the \"New.\" Released features and shipped code are praised, whilst roadmaps are treated like sacred texts. But if your primary metric for success is the volume of features delivered, you aren't managing a product; you're managing a factory." },
      { type: "blockquote", text: "Standout PMs don't just ship features. They kill them." },

      { type: "h2", id: "shipping-isnt-the-job", text: "Shipping isn't the job. Shipping the right product is." },
      { type: "p", text: "A great PM doesn't fall in love with the roadmap; they fall in love with the problem. They have the guts to look at a request or a polished prototype and say: This isn't solving it. This adds complexity. This doesn't matter." },

      { type: "h2", id: "fight-for-existence", text: "The Fight for Existence" },
      { type: "p", text: "Every feature, every setting, and every UI element should have to fight to exist. In a world of infinite ideas and finite user attention, complexity is the silent killer of great UX. When we add without subtracting, we dilute the value of our core offering." },
      { type: "p", text: "To maintain a high-performance product culture, I operate by one rule:" },
      { type: "callout", icon: "🚫", text: "If you can't explain why it matters, we do not build it or release it." },

      { type: "h2", id: "whats-the-point", text: "The \"What's the Point?\" Test" },
      { type: "p", text: "I regularly ask stakeholders — whether they are from Engineering, Design, Leadership, or the client side — a simple question: \"What is the point of this?\" and \"What are you trying to achieve?\"" },
      { type: "p", text: "If the answer is \"It's on the roadmap\" or \"Leadership asked for it,\" the conversation stops there. Those aren't reasons; those are echoes. A roadmap is a hypothesis, not a mandate. If we can't justify a feature's existence based on the value it provides to the person on the other side of the screen, it is waste." },

      { type: "h2", id: "human-reason", text: "Seeking the Human Reason" },
      { type: "p", text: "When I ask for the \"why,\" I'm looking for the reason a real person would care. If you can't describe the moment of relief, joy, or efficiency a human being feels when using this feature, then the feature doesn't have a soul." },

      { type: "h2", id: "the-result", text: "The Result" },
      { type: "p", text: "This one rule has prevented dozens of features that would have been built, but never were. It has caused friction and uncomfortable silences in Slack channels. But it is also the reason my products remain lean, intuitive, and effective." },
      { type: "p", text: "By killing the mediocre, you create the oxygen necessary for the exceptional to breathe. Stop being a feature diplomat and start being a product gatekeeper. Your users will thank you for the things you didn't make them learn." },
    ],
  },

  {
    slug: "gacha-trap",
    title: "The Gacha Trap: Why We Spend Thousands on Free Games",
    featuredImage: "/images/articles/gacha-trap.png",
    excerpt:
      "A tiny fraction of players — called Whales — generate the majority of revenue in free-to-play games. Understanding the psychology behind Gacha mechanics reveals a system engineered for addiction.",
    category: "AI & Tech",
    date: "December 2025",
    readTime: "6 min",
    featured: false,
    relatedSlugs: ["stop-being-helpful", "cricket-odds-ai"],
    body: [
      { type: "h2", id: "whales", text: "Whales (and we don't mean fish)" },
      { type: "p", text: "In the gaming world, there is a term for the elite spenders who keep the industry afloat: Whales." },
      { type: "p", text: "While they represent a mere 1–2% of a game's player base, these individuals often generate 50–70% of the total revenue. This staggering statistic raises a pressing question: What is it about \"Gacha\" games that convinces players to pour their life savings into digital characters?" },

      { type: "h2", id: "what-is-gacha", text: "What Exactly is a Gacha Game?" },
      { type: "p", text: "The term \"Gacha\" comes from Gachapons; the Japanese capsule machines that dispense a random toy for a few coins." },
      { type: "p", text: "In the digital world, Gacha mechanics have taken over the mobile industry. The core hook is simple: you can never directly buy what you want. Instead, you spend currency to \"roll\" or \"pull\" from a randomised pool. While you'll always receive something, the high-tier, game-changing items usually have abysmally low drop rates." },

      { type: "h2", id: "is-it-gambling", text: "The Burning Question: Is It Gambling?" },
      { type: "p", text: "The resemblance between Gacha and traditional gambling is so strong that countries like Belgium and the Netherlands have banned the mechanic entirely. Even Japan has outlawed \"Kompu Gacha\" (Complete Gacha) due to its predatory nature." },
      { type: "p", text: "The similarities:" },
      { type: "ul", items: [
        "Risk vs. Reward: Gambling is defined as risking something of value for a chance at a prize determined by luck. Whether you're betting chips or \"Primogems,\" the thrill of the risk remains the same.",
        "Dopamine Loops: Both systems are engineered to be addictive. Winning triggers a rush of dopamine, creating a psychological \"high\" that keeps players coming back for more.",
        "The \"Illusion of Value\": Gacha games often hide behind an innocent facade. Because they are easily accessible and free-to-download, they lack the strict age regulations and social stigma associated with casinos.",
      ]},
      { type: "p", text: "The primary legal defence for Gacha is that you never truly \"lose.\" In a casino, a losing bet leaves you with nothing. In a Gacha game, a \"bad\" pull still grants you a low-level item. Proponents argue this makes it a purchase rather than a bet — even if the item received is functionally worthless to the player." },

      { type: "h2", id: "psychology", text: "The Psychology of the \"Hook\"" },
      { type: "p", text: "Why do rational people spend thousands on pixels? Developers use sophisticated psychological triggers to encourage spending:" },
      { type: "ul", items: [
        "Sunk Cost Fallacy: Once a player has spent money, they feel they can't quit, or that money was \"wasted.\" They continue spending to justify their previous investment.",
        "The \"Pay-to-Progress\" Wall: If a game is too skill-based, people won't pay. Developers often intentionally design \"difficulty spikes\" that are nearly impossible to clear without high-tier Gacha items.",
        "Social Proof & FOMO: Seeing streamers spend £1,000 or watching friends receive rare characters creates a Fear Of Missing Out. It normalises extreme spending and makes the \"whale\" lifestyle seem like the standard.",
      ]},

      { type: "h2", id: "genshin", text: "Case Study: The Genshin Impact Phenomenon" },
      { type: "p", text: "HoYoverse's Genshin Impact is perhaps the most successful Gacha game in history, being the fastest mobile title to reach $5 billion in consumer spending. Its success is built on masterfully executed tactics:" },
      { type: "ul", items: [
        "Currency Obfuscation: By forcing players to convert real money into Genesis Crystals, then into Primogems, then into Fates, the game makes it difficult to track exactly how much \"real\" money is being spent.",
        "Limited-Time Urgency: \"Banners\" featuring rare characters often only last 21 days. If you don't get the character now, you might have to wait a year for a rerun — creating a desperate \"now or never\" mentality.",
        "Routine Integration: Daily commissions turn the game into a habit. By rewarding players for logging in every single day, the game stays at the forefront of their minds (and wallets).",
      ]},

      { type: "h2", id: "pity-system", text: "Is There Any Protection?" },
      { type: "p", text: "To avoid total bans, most modern Gacha games implement a \"Pity System.\"" },
      { type: "ul", items: [
        "Hard Pity: A guarantee that you will receive a top-tier item after a set number of transactions (e.g., 90 pulls in Genshin Impact).",
        "Soft Pity: An unstated but statistically observable increase in drop rates as you approach the Hard Pity limit.",
      ]},
      { type: "p", text: "While these systems provide a \"safety net,\" they also encourage players to keep spending just a little more because they are \"close to a guaranteed win.\"" },

      { type: "h2", id: "final-thoughts", text: "Final Thoughts" },
      { type: "p", text: "Gacha mechanics aren't inherently \"evil,\" but they are a business model designed to maximise profit. When a high-quality game is \"free,\" the cost is usually shifted onto your psychological impulse control." },
    ],
  },

  {
    slug: "stop-being-helpful",
    title: "Stop Being Helpful and Start Being Valuable",
    featuredImage: "/images/articles/being-valuable.png",
    excerpt:
      "Why 'Yes-Boss' is a career dead end. The most valuable employees aren't the ones who execute their manager's vision perfectly — they're the ones who convince their managers to do things differently.",
    category: "Leadership",
    date: "January 2026",
    readTime: "5 min",
    featured: false,
    relatedSlugs: ["art-of-the-kill", "outcome-led-roadmaps"],
    body: [
      { type: "p", text: "There is a fundamental disconnect between what employees think makes them valuable and what great managers actually need." },
      { type: "p", text: "Most people believe that being a \"star\" means executing their manager's vision perfectly. But in hundreds of promotion discussions, the truth is consistently the opposite:" },
      { type: "blockquote", text: "The most valuable employees are the ones who convince their managers to do things differently." },

      { type: "h2", id: "three-tiers", text: "The Three Tiers of Value" },

      { type: "h3", id: "low-tier", text: "1. The \"Low\" Tier: Self-Optimizers" },
      { type: "p", text: "These reports do what they want, but at the expense of the team." },
      { type: "ul", items: [
        "They miss deadlines for personal hobbies.",
        "They ship buggy code and immediately go \"off the grid.\"",
        "They decline critical meetings because they feel \"fried.\"",
      ]},
      { type: "callout", icon: "⚠️", text: "Manager's Verdict: A liability. They are optimised for themselves, not the mission." },

      { type: "h3", id: "middle-tier", text: "2. The \"Middle\" Tier: The Reliable \"Yes-Boss\"" },
      { type: "p", text: "The average report does exactly what their manager says. If a manager suggests a \"loony\" project, they ask \"How fast?\" instead of \"Why?\"" },
      { type: "p", text: "Why they do it: They think obedience is the fastest path to promotion, or they assume the manager always knows best." },
      { type: "p", text: "The result: They are reliable and drama-free, which is useful. However, the team's success becomes fragile because it relies entirely on the manager never making a mistake." },

      { type: "h3", id: "high-tier", text: "3. The \"High\" Tier: The Jedi" },
      { type: "p", text: "The best reports do what they want, but in a way that furthers the team's interests. If a manager proposes a plan, the Jedi asks, \"Is this smart or loony?\" If it's loony, they propose a smarter alternative. They don't just follow orders; they peer critically at plans to find and fix holes." },
      { type: "callout", icon: "✦", text: "Manager's Verdict: These people are worth more than a truckload of rubies." },

      { type: "h2", id: "hierarchy", text: "The Good, the Bad, and the Ugly of Hierarchy" },
      { type: "p", text: "We often define hierarchy as the power to decide. This is supposed to make companies efficient. In a \"perfect\" hierarchy, the CEO would always make better decisions than the VP, who would always make better decisions than the Director, all the way down to the intern." },
      { type: "p", text: "Hierarchy is recursively flawed. While a CEO is better at deciding whether to hire a CFO, a Junior Engineer is likely much better at deciding how to fix a specific bug in a codebase they know intimately." },
      { type: "blockquote", text: "Whatever system of titles a company uses, it cannot encapsulate the nuances of domain knowledge." },
      { type: "p", text: "When hierarchy fails:" },
      { type: "ul", items: [
        "The Mindset: If you believe a higher \"level\" automatically equals better judgment, you will be wrong often.",
        "The Ego: If high-level managers aren't humble enough to defer to someone with more specific knowledge, they make poor calls, and the company pays the price.",
      ]},

      { type: "h2", id: "how-to-become-jedi", text: "How to Become a \"Jedi\" Employee" },
      { type: "p", text: "If you want to be a top performer, you won't get there by \"yes-bossing.\" You need to bridge the gap between your role and the team's ultimate success." },
      { type: "ul", items: [
        "Care Obsessively: Your pushback must come from a place of wanting the team to win, not from personal ego.",
        "Develop Judgment: Learn the business so your \"better way\" is actually better.",
        "Take Initiative: Do things your manager isn't directing you to do because you see a gap that needs filling.",
      ]},
      { type: "p", text: "The point of hierarchy is to enable faster, better decisions. The moment it stops doing that, it becomes a cage rather than a tool." },
    ],
  },

  {
    slug: "claude-job-finder",
    title: "Using Claude to help my friend find a job",
    featuredImage: "/images/articles/job-hireagent.png",
    excerpt:
      "Job hunting is exhausting. Checking the same boards every day, filtering through irrelevant roles, losing track of what you've already seen. I built a tool with Claude that automated the whole thing. It worked.",
    category: "AI & Tech",
    date: "24 March 2026",
    readTime: "5 min",
    featured: false,
    relatedSlugs: ["post-code-era", "cricket-odds-ai"],
    body: [
      { type: "p", text: "A friend of mine was job hunting. She was doing what everyone does: opening the same five websites every morning, scrolling through the same listings, trying to remember which ones she'd already seen. It was tedious, repetitive work. Exactly the kind of thing that should be automated." },
      { type: "p", text: "So instead of sending her a list of tips, I built something." },

      { type: "h2", id: "the-problem", text: "The Problem With Manual Job Hunting" },
      { type: "p", text: "Job boards are not designed with the applicant's time in mind. They're designed to maximise time-on-site. That means duplicate listings, roles that don't match your criteria sitting alongside the ones that do, and no memory of what you've already reviewed. Every morning starts from zero." },
      { type: "p", text: "For my friend, who was targeting Account Manager and Senior Account Manager roles in iGaming, the relevant boards were niche. A handful of specialist recruiters: Pentasia, BettingJobs, TalentBet, iGaming Recruitment, plus a few general iGaming industry sites. Not hundreds of sources, but enough that checking them all daily was a genuine drain." },
      { type: "callout", icon: "💡", text: "The insight: the actual work of applying for jobs takes judgment. The work of finding them each morning is just a task, and tasks are automatable." },

      { type: "h2", id: "what-we-built", text: "What We Built" },
      { type: "p", text: "The tool is a Python script, built with Claude over a couple of sessions. It uses Playwright to run a headless browser, visits each of the configured job boards in turn, and scrapes the current listings. Each source gets its own scraper. Some sites are straightforward; others required more work to handle dynamic rendering." },
      { type: "image", src: "/images/articles/claude-job-finder-flow.svg", alt: "Job finder automation flow: job boards to daily PDF report", caption: "The full pipeline: from seven job boards to a daily PDF report." },
      { type: "p", text: "Once the jobs are collected, the script filters them by keyword. For my friend: 'account manager', 'senior account manager', and a few variations. Anything that doesn't match gets dropped. Anything seen on a previous day gets dropped too. The tool keeps a record of what it has already surfaced, so the daily output is genuinely new." },
      { type: "p", text: "The final step is the output. Not a text file, not a spreadsheet. A properly formatted PDF. Clean layout, source headings, job title, company, location, salary where listed, and a clickable URL for each role. Something she could open on her phone on the way to a coffee and have everything ready to act on." },
      { type: "ul", items: [
        "7 iGaming job boards scraped daily: Pentasia, BettingJobs, TalentBet, iGaming Recruitment, Van Kaizen, iGamingCareer, iGaming Business",
        "Keyword filtering tuned to her exact role targets",
        "Deduplication: only roles that weren't in yesterday's report appear today",
        "A PDF report generated automatically, dated and ready to open",
      ]},

      { type: "h2", id: "the-feedback-loop", text: "The Feedback Loop" },
      { type: "p", text: "The first version just delivered jobs. It worked, but it wasn't smart about it. Some companies kept appearing that she'd already ruled out. Some role types were showing up that technically matched the keywords but weren't relevant to what she was actually looking for." },
      { type: "p", text: "So we added a preference layer. As she reviewed each day's output, she'd mark roles as relevant or not, with a simple note in a markdown file the script reads before generating the PDF. Over time, this built up a picture of what she actually wanted. Employers she'd already applied to or ruled out were suppressed. Role types that matched the keyword but not the intent got filtered. The daily report got sharper." },
      { type: "blockquote", text: "By week two, the noise was almost gone. Every role in the morning PDF was something she genuinely wanted to consider." },

      { type: "h2", id: "the-result", text: "The Result" },
      { type: "p", text: "The script runs automatically every morning. She wakes up to a PDF in her folder with that day's relevant, de-duplicated, pre-filtered roles, each with a direct link to apply. No login required. No scrolling. No remembering what she already saw." },
      { type: "p", text: "She landed a role. Whether the tool was the reason or just made the process less miserable is hard to say. But it changed the texture of the search. Instead of a daily grind of opening tabs and trying to remember where she was up to, it became a simple ritual: open the PDF, pick the roles worth pursuing, apply." },

      { type: "h2", id: "what-this-actually-means", text: "What This Actually Means" },
      { type: "p", text: "This wasn't a complex project. The whole thing took a few hours across two sessions with Claude. I described the problem, Claude wrote the scaffolding, I adjusted the details, we iterated on the edge cases. By the time we were done, it was a tool that genuinely saved her time every single day." },
      { type: "p", text: "That's the thing that still surprises me about working with Claude on projects like this. The barrier to automating something tedious is now almost nothing. If you can describe the problem clearly, you can usually have a working solution in an afternoon. The question is just whether you stop to ask: does this need to be manual?" },
      { type: "callout", icon: "✦", text: "Most tedious recurring tasks can be automated. Most people never try because it seems like it requires a developer. It doesn't — not anymore." },
      { type: "p", text: "Job hunting is a high-stakes, emotionally draining process. Anything that removes friction from it is worth building. And if the cost of building it is an afternoon and some prompts, there's very little reason not to." },
    ],
  },

];

export default articles;
