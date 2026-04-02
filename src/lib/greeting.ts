const GREETINGS: { range: [number, number]; lines: string[] }[] = [
  { range: [5,  8],  lines: ["Good morning, hope the coffee's strong", "Early start. Respect.", "Rise and grind, or just coffee, that works too"] },
  { range: [8,  12], lines: ["Good morning, hope the day's off to a good start", "Morning, the best ideas happen before lunch", "Good morning, hope the inbox isn't too scary"] },
  { range: [12, 14], lines: ["Good afternoon, hope lunch was worth it", "Afternoon, the post-lunch slump is optional", "Good afternoon, the day is half yours"] },
  { range: [14, 18], lines: ["Good afternoon, nearly there", "Afternoon, four o'clock, the longest hour", "Good afternoon, you're in the home stretch"] },
  { range: [18, 22], lines: ["Good evening, you made it through the day", "Good evening, time to decompress", "Evening, well earned"] },
  { range: [22, 24], lines: ["Still up? Respect.", "Burning the midnight oil, classic", "Late night browsing. I respect the dedication"] },
  { range: [0,  5],  lines: ["Couldn't sleep?", "It's very late. Everything okay?", "The 3am portfolio browse, a bold move"] },
];

function getGreeting(hour: number): string {
  const match = GREETINGS.find(({ range }) => hour >= range[0] && hour < range[1]);
  const lines = match?.lines ?? GREETINGS[0].lines;
  return lines[Math.floor(Math.random() * lines.length)];
}

export function buildLabel(): { text: string; time: string; city: string } {
  const now  = new Date();
  const hour = now.getHours();
  const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).toLowerCase();

  let city = "";
  try {
    const locale     = navigator.language;
    const regionCode = locale.split("-")[1];
    if (regionCode) {
      city = new Intl.DisplayNames([locale], { type: "region" }).of(regionCode) ?? "";
    }
  } catch {}

  return { text: getGreeting(hour), time, city };
}
