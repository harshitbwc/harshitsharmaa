// `type: "anchor"` scrolls to a section on the home page (Lenis-smoothed,
// only works as a same-page jump while already on "/"); `type: "route"`
// is a real page navigated via react-router. Navbar renders each kind
// differently, and falls back to a home-then-scroll navigation for
// anchors when it's not already on "/".
export const navLinks = [
  { id: "bio", title: "Bio", type: "anchor" },
  { id: "work", title: "Work", type: "anchor" },
  { id: "products", title: "Products", type: "route", path: "/products" },
  { id: "contact", title: "Contact", type: "anchor" },
];

// A written log, not a résumé table — real roles, told straight.
export const workLog = [
  {
    role: "Founder",
    org: "Blockchain World Co",
    date: "Present",
    text: "What I run now. Public blockchain products, client work, and a growing community of people who actually want to understand this stuff instead of just aping into it.",
    tags: ["Products", "Client work", "Community"],
  },
  {
    role: "Lead Blockchain Engineer",
    org: "Meroku / Bitpack",
    date: "2023–2024",
    text: "Led the blockchain side of the Bitpack ecosystem: architecture, smart contract development and auditing, the unglamorous work of keeping things secure while a team ships fast around you.",
    tags: ["Architecture", "Contracts", "Audits"],
  },
  {
    role: "Full-stack Blockchain Developer",
    org: "Swifty Global",
    date: "2021–2023",
    text: "Built the backend for a multi-chain wallet from serverless architecture up: a DEX aggregator, an EVM bridge, an NFT marketplace, sub-wallet dApps. If it touched money moving across chains, I probably shipped or audited it.",
    tags: ["DEX aggregator", "EVM bridge", "NFT marketplace"],
  },
  {
    role: "Blockchain Developer",
    org: "RevInfotech",
    date: "2021",
    text: "DeFi, properly: DEXs, staking and compounding protocols, arbitrage systems, plus core work on the consensus and network layers most people never think about.",
    tags: ["DEXs", "Staking", "Consensus"],
  },
  {
    role: "Smart Contract Engineer",
    org: "Shiba Inu",
    date: "2021",
    text: "Built ShibaSwap end to end — wrote its smart contracts and audited the DEX and yield farming platform myself. Shipped DeFi primitives like vote-escrowed staking and multi-chain farming, plus the cross-chain messaging behind Shibarium and shib-identity. Also built the internal automation that cut contract deployment, auditing, and testing time in half, and led cross-functional teams through new product launches.",
    tags: ["ShibaSwap", "Staking", "Shibarium"],
  },
  {
    role: "Blockchain Developer",
    org: "Quillhash",
    date: "2020",
    text: "Where I actually started. Token standards, ICOs, contract audits, five different blockchains before I'd fully figured out what I was doing. Best way to learn.",
    tags: ["Token standards", "ICOs", "Audits"],
  },
];

// The Hero dial's nine objects, in wheel order — headline AND paragraph
// swap to match whichever one is in focus. Arced professional-to-personal
// across two chapters: Work (Glasses through Mic, what this site is
// actually a portfolio for) and Life (Dumbbell onward, the rest of it,
// closing on Diary: the one thing that deliberately doesn't explain
// itself). `label` is the short word shown under the focused icon and in
// the chapter progress rail.
export const dialItems = [
  {
    icon: "glasses",
    chapter: "Work",
    label: "All of it",
    line: "I get sh*t done.",
    body: "AI-enabled engineer, growth marketer, and creator. Occasional speaker. $1B+ secured on-chain.",
    // A second, visually distinct line below `body` — accent-colored, its
    // own paragraph. Only Glasses has one right now; Hero.jsx renders it
    // only when present, so every other item is unaffected.
    highlight: "I don't do lanes.",
  },
  {
    icon: "laptop",
    chapter: "Work",
    label: "Engineer",
    line: "I build things that can't break.",
    body: "Six years building the parts of web3 that can't afford to break: contracts, DeFi, ZK. Now doing the same for AI. If it can't afford to fail, I've probably touched it.",
  },
  {
    icon: "camera",
    chapter: "Work",
    label: "Marketer",
    line: "I build the reach too.",
    body: "Strategy, campaigns, and ads for web3 and AI products, always through a director's lens. Plus my own infotainment feed on Instagram and X, because a whitepaper never went viral.",
  },
  {
    icon: "notebook",
    chapter: "Work",
    label: "Writer",
    line: "I write what's real, not trending.",
    body: "Substack and LinkedIn, whenever I actually have something worth saying. Less content calendar, more public journal: opinions I'm willing to defend.",
  },
  {
    icon: "mic",
    chapter: "Work",
    label: "Speaker",
    line: "I say it out loud too.",
    body: "Talks and panels on web3, AI, cybersecurity, wherever someone hands me a mic and an audience that might push back.",
  },
  {
    icon: "dumbbell",
    chapter: "Life",
    label: "Lifter",
    line: "I lift. Longevity, not vanity.",
    body: "Biohacking, body mechanics, whatever a smart ring can tell me before I feel it myself. I experiment with my own body more than I probably should. Got a fitness startup idea? Let's talk.",
  },
  {
    icon: "clapperboard",
    chapter: "Life",
    label: "Film",
    line: "I'm the hero. You're side characters.",
    body: "I watch a lot, make a little. In my head this is one long film and I cast myself as the lead. You're all doing excellent supporting work.",
  },
  {
    icon: "books",
    chapter: "Life",
    label: "Thinker",
    line: "I think in centuries.",
    body: "Culture, philosophy, psychology, mostly to understand why people, myself included, do what they do.",
  },
  {
    icon: "diary",
    chapter: "Life",
    label: "Private",
    line: "Some things stay off the record.",
    body: "Not everything needs a caption. Some of this stays between me and whoever's actually in the room.",
  },
];

// Each product gets its own page at /products/:slug (see
// ProductDetail.jsx). `tagline` is the one-liner (card grid + page header),
// `logo` is an optional small square mark — a badge on the card thumbnail
// and shown beside the name on the detail page, separate from `image`
// which is the wide cover/screenshot, not an icon. `image` is the card's
// cover photo (ProductCard renders a clearly-labeled placeholder when
// empty, never a fake screenshot) and doubles as the detail page's hero
// banner. `gif` is an optional looping preview and
// `video` an optional demo clip — on the detail page they share one hero
// slot, richest wins (video over gif over image), so the page shows one
// preview, not three stacked copies of the same pitch. `video` can be a
// YouTube/Vimeo URL (embedded) or a direct file URL (played natively).
// `description` is the full writeup (can hold multiple paragraphs separated
// by a blank line),
// `features` is a flat list of short bullet strings (what it actually
// does), `techStack` is a flat list of strings, `installCommand` is an
// optional one-line shell command (e.g. an npm/pip install) rendered as a
// copyable code snippet instead of a download button — for things that are
// installed, not downloaded. `links.download` is the opposite case: an
// actual file to download (an installer, a .dmg), rendered as its own
// prominent button instead of a plain link pill; `downloadLabel` is its
// button text (e.g. "Download for macOS", falls back to "Download") and
// `downloadNote` is the small-print under it (version, size, OS warnings).
// `disclaimer` is an optional, even-smaller line under that — for things
// like "not affiliated with X" on a product that uses someone else's name.
// `links` otherwise holds whichever of these actually apply — ProductDetail
// only renders the ones with a value. Fields left empty are simply skipped
// by the UI, never rendered as blank.
export const products = [
  {
    slug: "hardhat-airsign",
    name: "hardhat-airsign",
    tagline: "Deploy smart contracts without ever putting a private key in .env.",
    logo: "",
    image: "",
    gif: "",
    video: "https://youtu.be/TDZrIHv3bRU",
    description:
      "Every Hardhat developer has pasted a private key into .env and hoped it never got committed. hardhat-airsign removes that step. One command starts a local signing server with a React UI, and the plugin adds a RemoteSigner (a custom ethers v6 signer) to your scripts. Deploy scripts send unsigned transactions to the server, the browser shows them, and your wallet signs and sends them.\n\nBeyond signing, the UI works as a small dev console: a runner for tasks and scripts, a panel for reading and writing deployed contracts, and wallet-proxied RPC, so no Alchemy or Infura key is needed.\n\nPublished on npm as an ESM-only package, with the built signing UI bundled inside it. MIT licensed, currently at v3.0.0 — v2.x stays available for projects still on Hardhat 2.",
    features: [
      "No private keys on the dev machine — it only ever sees unsigned transactions and tx hashes. Signing happens in the wallet.",
      "Existing scripts work unchanged. Turn on remoteSigner: true for a network in the config; switching back to private keys is a config change too.",
      "Remote signing — the signer can be on a different machine, like a teammate or a hardware-wallet user, connected through an ngrok link.",
      "15+ wallets: MetaMask, Coinbase, Ledger, Trust, Rabby, Safe, Rainbow, Phantom and more, through RainbowKit and WalletConnect.",
      "Runner tab — run Hardhat tasks and scripts from the browser, with live console output.",
      "Contracts tab — read and write deployed contracts, deploy new instances with constructor arguments and payable values, view decoded event logs.",
      "Wallet-proxied RPC — no Alchemy or Infura key needed; JSON-RPC calls go through the connected wallet.",
      "Signing modal — approval requests appear over whichever tab you're on.",
      "Transaction history and activity log — tracks signed and rejected transactions, contract reads, writes and deploys.",
      "Multi-chain with explorer links — Ethereum, Sepolia, Polygon, Arbitrum, Optimism, Base, BSC, Avalanche and more; each signed transaction links to its block explorer.",
      "One-command setup — airsign-start, airsign-status and airsign-stop manage a background server.",
      "Built for Hardhat 3 — the new plugin and hook system, ethers v6, ESM. 25-test suite, CI on Node 18, 20 and 22.",
    ],
    techStack: [
      "TypeScript",
      "Node.js",
      "Hardhat 3",
      "ethers v6",
      "Express",
      "Socket.io",
      "React 18",
      "Vite",
      "Tailwind CSS",
      "RainbowKit",
      "wagmi",
      "viem",
      "TanStack Query",
      "Turborepo",
      "Vitest",
      "GitHub Actions",
    ],
    year: "",
    status: "Live",
    installCommand: "npm install hardhat-airsign",
    downloadLabel: "",
    downloadNote: "",
    disclaimer: "",
    links: {
      website: "",
      github: "https://github.com/harshitbwc/hardhat-airsign",
      demo: "",
      appStore: "",
      playStore: "",
      npm: "https://www.npmjs.com/package/hardhat-airsign",
      download: "",
    },
  },
  {
    slug: "exdisplay",
    name: "ExDisplay",
    tagline: "Turn the tablet in your drawer into a second screen for your Mac.",
    logo: "https://raw.githubusercontent.com/harshitbwc/ExDisplay/main/docs/assets/logo-512.png",
    image: "https://raw.githubusercontent.com/harshitbwc/ExDisplay/main/docs/assets/banner.png",
    gif: "",
    video: "https://raw.githubusercontent.com/harshitbwc/ExDisplay/main/docs/assets/launch.mp4",
    description:
      "ExDisplay turns an Android tablet into a touch-enabled second display for your Mac over a simple USB cable. Free, open source, and no extra hardware.\n\nMost Macs can only drive one external monitor, and tablets can't act as monitors on their own. ExDisplay fixes both.\n\nPlug in an Android tablet and your Mac sees a brand-new screen. Drag windows onto it, keep a chat or a music player in view, or park your reference docs beside your work. It's a true extra display, not a mirror, and it works alongside the monitor you already have.\n\nTouch works the way you'd expect from a trackpad: tap to click, drag to move things, two fingers to scroll, three fingers to flip between desktops. Everything travels over the cable, so there's no Wi-Fi setup, no account, and nothing leaves your computer.",
    features: [
      "A real extended display, not a mirror",
      "Works alongside your existing monitors",
      "Touch control with familiar trackpad gestures",
      "Wired for a stable, private connection with no Wi-Fi needed",
      "Free and open source, with no accounts or tracking",
    ],
    techStack: [
      "Swift",
      "Objective-C",
      "Kotlin",
      "ScreenCaptureKit",
      "VideoToolbox (H.264)",
      "Android MediaCodec",
      "Swift Package Manager",
      "Gradle",
      "GitHub Actions",
      "GitHub Pages",
    ],
    year: "",
    status: "Live, v1.2.0",
    installCommand: "",
    downloadLabel: "",
    downloadNote:
      "Needs a Mac with Apple Silicon and an Android tablet. See the website for the setup guide.",
    disclaimer: "",
    downloads: [
      {
        label: "Download for Mac (Apple Silicon, macOS 14+)",
        url: "https://github.com/harshitbwc/ExDisplay/releases/latest/download/ExDisplay-mac-arm64.zip",
      },
      {
        label: "Download for Android (8.0+)",
        url: "https://github.com/harshitbwc/ExDisplay/releases/latest/download/ExDisplay-android.apk",
      },
    ],
    links: {
      website: "https://harshitbwc.github.io/ExDisplay/",
      github: "https://github.com/harshitbwc/ExDisplay",
      demo: "",
      appStore: "",
      playStore: "",
      npm: "",
      download: "",
      changelog: "https://github.com/harshitbwc/ExDisplay/blob/main/CHANGELOG.md",
    },
  },
  {
    slug: "claude-usage-bar",
    name: "Claude Usage Bar",
    tagline: "Know your Claude limit before it knows you.",
    logo: "https://raw.githubusercontent.com/harshitbwc/claude-usage-bar/main/docs/assets/logo.svg",
    image: "https://raw.githubusercontent.com/harshitbwc/claude-usage-bar/main/docs/assets/hero.png",
    gif: "https://raw.githubusercontent.com/harshitbwc/claude-usage-bar/main/docs/assets/promo.gif",
    video: "https://raw.githubusercontent.com/harshitbwc/claude-usage-bar/main/docs/assets/promo.mp4",
    description:
      "A tiny Mac menu-bar widget that shows how much Claude you've used, so you stop getting cut off mid-thought. A little coral bar sits in your menu bar and fills up as you use Claude, and turns red when you're close to the edge.\n\nClick it to see your 5-hour and weekly limits and when each one resets. The numbers match Claude's own usage page exactly, with no guesswork. It's tiny, quiet and free, and it can start at login so it's always there.\n\nFree and open source under MIT, currently at v1.0.",
    features: [
      "A live usage bar, right in your menu bar",
      "5-hour and weekly limits, with reset countdowns",
      "Turns red when you're about to hit the wall",
      "Starts at login, so you never have to remember it",
      "Featherlight — no Dock icon, no clutter",
    ],
    techStack: ["Swift", "SwiftUI", "AppKit", "macOS Keychain"],
    year: "",
    status: "Live",
    installCommand: "",
    downloadLabel: "Download for Mac",
    downloadNote:
      "Free · macOS 13+ (Apple Silicon & Intel) · Needs Claude Code · First launch: right-click the app and choose Open.",
    disclaimer: "Independent project — not affiliated with Anthropic.",
    links: {
      website: "https://harshitbwc.github.io/claude-usage-bar/",
      github: "https://github.com/harshitbwc/claude-usage-bar",
      demo: "",
      appStore: "",
      playStore: "",
      npm: "",
      download:
        "https://github.com/harshitbwc/claude-usage-bar/releases/latest/download/ClaudeUsageBar.dmg",
    },
  },
  {
    slug: "yoinkr",
    name: "Yoinkr",
    tagline: "Yoink any YouTube video or audio — in seconds, for free.",
    logo: "https://raw.githubusercontent.com/harshitbwc/yoinkr/main/app/apple-icon.png",
    image: "https://raw.githubusercontent.com/harshitbwc/yoinkr/main/public/banner.png",
    gif: "",
    video: "",
    description:
      "Yoinkr is a free tool for downloading YouTube videos and audio — paste a link, pick a quality, and it's yours. No sign-up, no account, no clutter, and none of the sketchy ad walls that most downloader sites bury the button behind.\n\nIt's available as a web app you can use instantly in the browser, and as a native desktop app for faster, unlimited downloads that don't depend on a shared server.",
    features: [
      "Paste any YouTube link and get the video in seconds — no sign-up, no account",
      "Choose your exact quality, up to 4K, or grab just the audio as an MP3",
      "Live download progress, with the option to cancel anytime",
      "Completely free, with no ad walls blocking the download",
      "Available as a web app and as a native desktop app",
      "Desktop downloads run on your own machine — no shared server, no waiting",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Electron", "Docker"],
    year: "",
    status: "Live",
    installCommand: "",
    downloadLabel: "Download for macOS",
    downloadNote:
      "v0.1.0, ~300MB. Early build: macOS may show an \"unidentified developer\" warning the first time you open it — right-click the app and choose Open to continue.",
    disclaimer: "",
    links: {
      website: "https://yoinkr.online",
      github: "",
      demo: "",
      appStore: "",
      playStore: "",
      npm: "",
      download: "https://yoinkr.online/download/yoinkr-mac-universal-0.1.0.dmg",
    },
  },
  {
    slug: "peepin",
    name: "PeepIn",
    tagline: "",
    logo: "",
    image: "",
    gif: "",
    video: "",
    description: "",
    features: [],
    techStack: [],
    year: "",
    status: "",
    installCommand: "",
    downloadLabel: "",
    downloadNote: "",
    disclaimer: "",
    links: { website: "", github: "", demo: "", appStore: "", playStore: "", npm: "", download: "" },
  },
  {
    slug: "fortunecaster",
    name: "Fortune Caster",
    tagline: "A playful fortune cookie experience that lives inside Farcaster.",
    logo: "https://raw.githubusercontent.com/harshitbwc/fortune-caster/main/public/icon.svg",
    image: "https://raw.githubusercontent.com/harshitbwc/fortune-caster/main/public/home.png",
    gif: "",
    video: "",
    description:
      "Fortune Caster turns a daily bit of luck into a small ritual. Tap to break open a fortune cookie, reveal a message meant just for you, and share it with your friends on Farcaster. The cookies are rendered in 3D, with a soft glowing atmosphere and light animations that make each crack feel satisfying. It's built mobile-first, so it opens inside the Farcaster app and is ready in seconds.",
    features: [
      "Interactive 3D fortune cookies with a satisfying crack animation",
      "A fresh fortune with every cookie",
      "One-tap sharing to Farcaster",
      "Atmospheric visuals with animated particles and glow",
      "Opens instantly inside Farcaster, with no install",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Three.js", "Tailwind CSS", "Framer Motion", "Farcaster Mini App SDK"],
    year: "",
    status: "Live on Farcaster",
    installCommand: "",
    downloadLabel: "",
    downloadNote: "",
    disclaimer: "",
    links: {
      website: "",
      github: "https://github.com/harshitbwc/fortune-caster",
      demo: "",
      appStore: "",
      playStore: "",
      npm: "",
      download: "",
      farcaster: "https://fortune-caster.vercel.app",
    },
  },
  {
    slug: "what-are-the-odds",
    name: "What Are the Odds",
    tagline: "Dare your friends. Settle it on-chain.",
    logo: "https://raw.githubusercontent.com/harshitbwc/what-are-the-odds/main/public/icon-512.png",
    image: "https://raw.githubusercontent.com/harshitbwc/what-are-the-odds/main/public/hero.png",
    gif: "",
    video: "https://raw.githubusercontent.com/harshitbwc/what-are-the-odds/main/public/hero.mp4",
    description:
      "A social betting app where anyone can turn \"bet you can't…\" into a real wager. Post a bet, let others pick Yes or No, and winners get paid automatically.\n\n\"What are the odds?\" turns everyday dares and predictions into friendly wagers. You post a bet, and others back it or fade it with a Yes or No. When it's over, the creator closes it and winners claim their payout. The money sits in a smart contract on Base, so nobody has to chase a friend for what they're owed. It has a mobile-first feed, a personal dashboard to track your bets and winnings, and a short rules page.\n\nIt's like TikTok for bets. Swipe up and a new bet appears, with Yes and No right there. Put money on it in a tap, then keep scrolling. It's a simple scroll app and there's nothing to learn.\n\nWe all say \"bet you can't…\" a dozen times a day. Most of those deals are verbal agreements, and verbal agreements lead to arguments. Web3 fits this problem, because the bet goes on-chain and the money is handled in crypto. It's easy, it's fun, and nobody has to chase anyone.",
    features: [
      "Create a bet in seconds with a plain-text description",
      "Scroll a live feed, one bet per screen, and back Yes or No",
      "Dashboard for your bets and winnings",
      "Winners claim payouts with one tap",
      "Wallet sign-in, with no accounts or passwords",
      "Installable on your phone like a native app",
    ],
    techStack: ["Next.js", "React", "Solidity", "Base", "wagmi", "RainbowKit"],
    year: "",
    status: "Live",
    installCommand: "",
    downloadLabel: "",
    downloadNote: "",
    disclaimer: "",
    links: {
      website: "https://www.whataretheodds.be/",
      github: "https://github.com/harshitbwc/what-are-the-odds",
      demo: "",
      appStore: "",
      playStore: "",
      npm: "",
      download: "",
    },
  },
  {
    slug: "headshots-ai",
    name: "Headshots.ai",
    tagline: "",
    logo: "",
    image: "",
    gif: "",
    video: "",
    description: "",
    features: [],
    techStack: [],
    year: "",
    status: "",
    installCommand: "",
    downloadLabel: "",
    downloadNote: "",
    disclaimer: "",
    links: { website: "", github: "", demo: "", appStore: "", playStore: "", npm: "", download: "" },
  },
  {
    slug: "pether-ai",
    name: "Pether.AI",
    tagline: "A GPT-backed assistant that actually answers web3 questions.",
    logo: "",
    image: "",
    gif: "",
    video: "",
    description: "",
    features: [],
    techStack: [],
    year: "",
    status: "",
    installCommand: "",
    downloadLabel: "",
    downloadNote: "",
    disclaimer: "",
    links: { website: "", github: "", demo: "", appStore: "", playStore: "", npm: "", download: "" },
  },
  {
    slug: "solmate",
    name: "SolMate",
    tagline: "An NFT-based dating app on Solana. Rust contracts, because why not.",
    logo: "",
    image: "",
    gif: "",
    video: "",
    description: "",
    features: [],
    techStack: [],
    year: "",
    status: "",
    installCommand: "",
    downloadLabel: "",
    downloadNote: "",
    disclaimer: "",
    links: { website: "", github: "", demo: "", appStore: "", playStore: "", npm: "", download: "" },
  },
  {
    slug: "position-watcher",
    name: "Position Watcher",
    tagline: "Watches a Uniswap V3 position and exits it once a set loss threshold hits, so I don't have to.",
    logo: "",
    image: "",
    gif: "",
    video: "",
    description: "",
    features: [],
    techStack: [],
    year: "",
    status: "",
    installCommand: "",
    downloadLabel: "",
    downloadNote: "",
    disclaimer: "",
    links: { website: "", github: "", demo: "", appStore: "", playStore: "", npm: "", download: "" },
  },
  {
    slug: "clippooor",
    name: "Clippooor",
    tagline: "Turn one long video into a week of Shorts and Reels, on autopilot.",
    logo: "",
    image: "",
    gif: "",
    video: "",
    description:
      "Clippooor takes a long video and turns it into a steady stream of short-form content. Upload a file or paste a YouTube link. Clippooor cuts it into vertical clips, adds captions and a call-to-action, and posts them to YouTube Shorts and Instagram Reels at the times you choose.\n\nEach brand gets its own channel with its own accounts and schedule. You set it up once, and it keeps your pages active without you editing or posting by hand.",
    features: [
      "Upload a video or paste a YouTube link",
      "Auto-clipped into vertical, social-ready parts",
      "Captions burned in automatically",
      "Custom call-to-action on every clip",
      "Scheduled posting to YouTube Shorts and Instagram Reels",
      "Multiple brand channels, each with its own accounts and post times",
      "Dashboard to track every clip from draft to posted",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL (Neon)",
      "Drizzle ORM",
      "Inngest",
      "Modal",
      "FFmpeg",
      "Whisper",
      "Cloudflare R2",
      "YouTube API",
      "Instagram API",
    ],
    year: "",
    status: "In development",
    // Needs a deploy URL and a public (secrets-scrubbed) repo from Harshit
    // before these can go live — see ProductDetail's status panel for how
    // that reads to a visitor in the meantime.
    installCommand: "",
    downloadLabel: "",
    downloadNote: "",
    disclaimer: "",
    links: { website: "", github: "", demo: "", appStore: "", playStore: "", npm: "", download: "" },
  },
];

export const socials = {
  email: "blockchainworld911@gmail.com",
  twitter: "https://x.com/harshxeth_",
  instagram: "https://instagram.com/blockchainworldco",
  github: "https://github.com/harry91198",
  linkedin: "https://www.linkedin.com/in/harshit-sharma-a3b982155/",
  farcaster: "https://farcaster.xyz/harsh9",
};
