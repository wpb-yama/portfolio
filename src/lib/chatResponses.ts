export interface ResponseEntry {
  keywords: string[];
  reply: string;
}

export const RESPONSES: ResponseEntry[] = [
  {
    keywords: ['who are you', 'about you', 'yourself', 'introduce', 'tell me about'],
    reply: `I'm Will Booth — a Senior Product Manager based in London. I specialise in building AI-powered and free-to-play engagement products in the iGaming space, working at the intersection of user psychology, engagement mechanics, and commercial strategy.`,
  },
  {
    keywords: ['work', 'current job', 'current role', 'occupation', 'what do you do', 'do for work'],
    reply: `I'm a Senior Product Manager at a B2B iGaming company, building free-to-play and engagement products for sportsbook operators across Europe and LATAM. I own the full lifecycle — discovery, strategy, delivery, and measurement.`,
  },
  {
    keywords: ['experience', 'career', 'history', 'previously', 'past', 'background', 'worked'],
    reply: `I started in agency product work across retail, media, and finance — good training for learning to say no and ship under constraints. I eventually got pulled into sports and gaming and haven't looked back. More detail is in the Bio section just to the left!`,
  },
  {
    keywords: ['project', 'portfolio', 'case study', 'built', 'shipped', 'products'],
    reply: `My main projects are Pick'em (a B2B 'More or Less' sports predictor live across 5 continents), Reveals (a Gacha-mechanic daily engagement product with an AI personalisation loop), and Predict 6 (the first white-label equivalent of Sky Super 6). They're all in the Projects section.`,
  },
  {
    keywords: ["pick'em", 'pickem', 'more or less', 'sports predictor', 'pick em'],
    reply: `Pick'em is a B2B 'More or Less' sports prediction product — the first white-label version of the format popularised by Underdog Fantasy and PrizePicks. I built it from scratch as sole PM, and it went live with 5 operators across South America, Australia, Asia, Europe, and North America in 12 months.`,
  },
  {
    keywords: ['reveals', 'gacha', 'pack opening', 'daily engagement'],
    reply: `Reveals is a free-to-play daily engagement product built on Gacha mechanics. Each day users open a pack to reveal a player from an upcoming match — tap, reveal, wait for the result. A Gemini Pro agent dynamically selects which players each user sees, balancing engagement against operator KPIs. First customer going live soon.`,
  },
  {
    keywords: ['predict 6', 'predict6', 'score predictor', 'super 6', 'jackpot'],
    reply: `Predict 6 is the first white-label equivalent of Sky Super 6 and BetVictor's 6 Goals — a free weekly score predictor with a £250k jackpot underwritten by an insurance broker, making it revenue-neutral as an acquisition tool. Built in under 2 months.`,
  },
  {
    keywords: ['cricket', 'ball by ball', 'tensorflow', 'neural network', 'cricket odds'],
    reply: `That's a side project I'm proud of! I built a TensorFlow model trained on 1M+ cricket deliveries to predict ball-by-ball outcomes. It outperformed professional bookmaker odds on 1,126 historical matches. I wrote about it in the Articles section.`,
  },
  {
    keywords: ['skill', 'tools', 'tech', 'stack', 'software', 'use day to day'],
    reply: `For product work: Figma, Linear, Notion, and Miro. I write Python for data projects, and have hands-on experience with the Gemini and Anthropic APIs for AI product development. On the analytics side: SQL, Google Analytics, and Excel for commercial modelling.`,
  },
  {
    keywords: ['article', 'writing', 'blog', 'write', 'post', 'published'],
    reply: `I write about product, iGaming, and technology. Recent pieces: 'The Art of the Kill' on why the best PMs define themselves by what they cut, 'The Gacha Trap' on loot box psychology, and 'Stop Being Helpful and Start Being Valuable' on what separates good PMs from great ones. All in the Articles section.`,
  },
  {
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'llm', 'gpt', 'claude', 'gemini'],
    reply: `Most of my recent work sits at the intersection of AI and engagement design. I've shipped AI personalisation loops with Gemini, studied reward mechanics from mobile gaming, and written about how iGaming is only just starting to apply what consumer tech figured out years ago. Check out my 'Post-Code Era' article for where I think product is heading.`,
  },
  {
    keywords: ['igaming', 'sports betting', 'sportsbook', 'betting', 'gambling', 'operator'],
    reply: `I've been in iGaming for a few years — it has the commercial rigour of fintech with the emotional intensity of consumer gaming. The sector is also about a decade behind on product thinking, which is both a frustration and an enormous opportunity. That tension is basically what drives all my projects.`,
  },
  {
    keywords: ['location', 'based', 'live', 'city', 'where are you', 'where do you'],
    reply: `I'm based in London, UK — though I've worked with operators across Europe, LATAM, Australia, and Asia. The iGaming industry is genuinely global, which keeps things interesting.`,
  },
  {
    keywords: ['hire', 'available', 'freelance', 'opportunity', 'open to', 'work together', 'collaborate', 'looking for'],
    reply: `I'm open to conversations about senior PM roles — particularly in AI product, sports tech, or anything at the intersection of psychology and engagement. Best way to reach me is wpb665@gmail.com.`,
  },
  {
    keywords: ['contact', 'reach', 'email', 'get in touch', 'talk', 'message me', 'connect'],
    reply: `You can reach me at wpb665@gmail.com. I'm also on LinkedIn (linkedin.com/in/wboothuk) and X/Twitter (@wboothuk). Email tends to get the fastest response.`,
  },
  {
    keywords: ['education', 'study', 'degree', 'university', 'college', 'school', 'graduate'],
    reply: `I studied in the UK. Honestly though, most of what I know about product came from building things and reading obsessively — if you're curious, the Articles section is a decent window into how I think.`,
  },
  {
    keywords: ['hobby', 'hobbies', 'free time', 'outside work', 'interests', 'fun', 'outside of work'],
    reply: `Outside work I spend a lot of time reading about product, psychology, and game design — the same stuff I end up writing about. I'm also a cricket obsessive, which eventually led me to build a neural network to predict match outcomes. One thing tends to lead to another.`,
  },
  {
    keywords: ['spotify', 'music', 'listen', 'playlist', 'song'],
    reply: `There's a live Spotify widget on this page showing what I was last listening to — scroll up and you'll see it! My taste is all over the place.`,
  },
  {
    keywords: ['linkedin', 'twitter', 'x ', 'social media', 'follow', '@wboothuk'],
    reply: `You can find me on LinkedIn at linkedin.com/in/wboothuk and on X/Twitter @wboothuk. LinkedIn is where I'm most active professionally.`,
  },
  {
    keywords: ['hello', 'hi ', 'hey', 'howdy', 'sup', 'greetings', 'good morning', 'good afternoon'],
    reply: `Hey! Great to meet you. Feel free to ask me anything — about my projects, experience, or what I'm working on. I'll do my best to answer 👋`,
  },
  {
    keywords: ['thank', 'thanks', 'cheers', 'appreciate', 'helpful'],
    reply: `Happy to help! If there's anything else you want to know, just ask. And if you want to have a proper conversation, you can always reach me at wpb665@gmail.com 😊`,
  },
];

export const FALLBACK =
  `Hmm, not sure I have a great answer for that one! For anything specific, reach out at wpb665@gmail.com — I'd genuinely love to chat.`;
