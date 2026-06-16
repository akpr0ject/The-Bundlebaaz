import { useState, FormEvent, useEffect } from "react";
import { Search, ArrowLeft, Download, ShoppingBag, ArrowUpRight, Check, Star, BookOpen, Layers, Award, Sparkles, X } from "lucide-react";
import { Bundle, BundleCategory } from "../types";

interface CoursesPageProps {
  onBack: () => void;
  initialTab?: "store" | "premium";
  onCheckoutOpen?: (isOpen: boolean) => void;
}

const COURSES_DATA: Bundle[] = [
  // AI & Animation Reels
  {
    id: "ai-hindi-story",
    title: "AI Hindi Story Reels Bundle",
    description: "Creative AI-generated Hindi storytelling reels ready for social media. Capture massive views with highly engaging cultural and moral stories narrated with lifelike AI voiceovers.",
    category: "ai-animation",
    originalPrice: "₹199",
    price: "₹39",
    rating: "4.9",
    reviews: "3,420",
    itemsCount: "500+ Reels",
    badge: "Bestseller",
    contents: [
      "500+ Viral AI Hindi Storytelling video files (MP4 format)",
      "High-converting Hindi text subtitles and overlays",
      "Engaging cultural, historical, and folklore scripts",
      "Bonus: High-retention audio beats ready to background sync"
    ],
    features: [
      "No Watermark on any files",
      "Ready to upload directly on Instagram/YouTube/TikTok",
      "Lifetime secure Drive folder access"
    ]
  },
  {
    id: "ai-scientist-voice",
    title: "AI Scientist Voice Reels Bundle",
    description: "Science-focused AI voiceover reels with engaging high-definition visuals. Ideal to dominate the educational, workspace, and space exploration content niche.",
    category: "ai-animation",
    originalPrice: "₹149",
    price: "₹29",
    rating: "4.8",
    reviews: "2,110",
    itemsCount: "1500+ Reels",
    badge: "Trending",
    contents: [
      "1500+ Space, Physics, and Tech voiceover reels",
      "High-definition space and laboratory motion graphics",
      "Synchronized high-impact visual captions",
      "Pre-mixed deep ambient audio tracks"
    ],
    features: [
      "Ultra HD 1080p resolution",
      "100% copyright-free clips",
      "Instant checkout email link"
    ]
  },
  {
    id: "ai-reporting",
    title: "AI Reporting Reels Bundle",
    description: "News-style AI-generated reporting reels. Present shocking news, historical facts, and current affairs in a viral news broadcasting format.",
    category: "ai-animation",
    originalPrice: "₹199",
    price: "₹39",
    rating: "4.7",
    reviews: "1,540",
    itemsCount: "1000+ Reels",
    badge: "Viral Release",
    contents: [
      "1000+ Breaking News reporting format reels",
      "Professional-looking digital AI news anchor clips",
      "High-contrast lower-thirds and custom frames",
      "Trending mystery and global news audio presets"
    ],
    features: [
      "Fully polished news style layouts",
      "Ready-to-upload raw MP4s",
      "Regular updates with trending news style variants"
    ]
  },
  {
    id: "ai-monkey",
    title: "AI Monkey Reels Bundle",
    description: "Funny and hyper-realistic AI monkey-themed viral reels. The perfect assets to skyrocket views on theme pages, meme accounts, and casual shorts.",
    category: "ai-animation",
    originalPrice: "₹149",
    price: "₹29",
    rating: "4.9",
    reviews: "1,890",
    itemsCount: "1000+ Reels",
    badge: "Hot Niche",
    contents: [
      "1000+ Viral high-expression AI Monkey video files",
      "Humorous, relatable, and sarcastic pre-written text prompts",
      "Ultra-crisp cinematic lighting & render style files",
      "Trending modern audio integration clips"
    ],
    features: [
      "Massive conversion & click attraction rate",
      "Ready to publish without watermark",
      "Instant payment access link"
    ]
  },
  {
    id: "ai-dance",
    title: "AI Dance Reels Bundle",
    description: "AI-generated energetic dance and performance content. Mind-bending visual transformations and neon-infused rhythmic dance movements.",
    category: "ai-animation",
    originalPrice: "₹149",
    price: "₹29",
    rating: "4.6",
    reviews: "980",
    itemsCount: "1000+ Reels",
    badge: "Visually Stunning",
    contents: [
      "1000+ Trippy neon/cyberpunk aesthetic dance video loops",
      "Seamless rhythm transitions matching any background sound",
      "Highly fluid AI interpolation style animations",
      "Perfect for electronic music, fashion, and visual arts"
    ],
    features: [
      "Commercial reuse license",
      "Beautiful vivid color grading",
      "High frame rate rendering"
    ]
  },
  {
    id: "ai-cat",
    title: "AI Cat Reels Bundle",
    description: "Cute and funny AI cat animations and viral shorts. Pet niche is one of the highest-earning categories on social platforms with massive visual retention.",
    category: "ai-animation",
    originalPrice: "₹99",
    price: "₹20",
    rating: "4.8",
    reviews: "3,204",
    itemsCount: "800+ Reels",
    badge: "Super Viral",
    contents: [
      "800+ High-retention cat animation files",
      "Wholesome, funny, and emotional storytelling templates",
      "Engaging sound effects ready to publish",
      "Cute character renderings with incredible detail"
    ],
    features: [
      "Zero editing skills required",
      "100% non-copyright background tracks included",
      "High CTR guarantee"
    ]
  },

  // Motivation & Self Growth
  {
    id: "sigma-male",
    title: "Sigma Male Reels Bundle",
    description: "Mindset, discipline, and motivational content. Designed for masculine focus channels, gym aesthetics, and high-performance lifestyle accounts.",
    category: "motivation-growth",
    originalPrice: "₹99",
    price: "₹20",
    rating: "4.9",
    reviews: "4,210",
    itemsCount: "1500+ Reels",
    badge: "Popular Elite",
    contents: [
      "1500+ High-contrast dark cinematic reels",
      "Powerful motivational quotes and success rules overlays",
      "Background sound tracks featuring epic, slow-mo, and phonk beats",
      "Success advice from top global entrepreneurs"
    ],
    features: [
      "No watermarks or credentials",
      "Ready in vertical 9:16 format",
      "High retention, perfect loop cuts"
    ]
  },
  {
    id: "respect-motivation",
    title: "Respect & Motivation Reels Bundle",
    description: "Positive, emotional, and inspirational reels. Highly emotional stories that command viewers to leave likes and share.",
    category: "motivation-growth",
    originalPrice: "₹149",
    price: "₹29",
    rating: "4.8",
    reviews: "2,540",
    itemsCount: "1400+ Reels",
    badge: "Aesthetic Vibe",
    contents: [
      "1400+ Wholesome respect stories and acts of kindness",
      "Inspirational captions and clean subtitles",
      "Deep emotional acoustic background soundtracks",
      "Ideal to build trusted, long-term positive accounts"
    ],
    features: [
      "Prepaid updates for life",
      "Clean metadata tracking tags",
      "Direct drive download links"
    ]
  },
  {
    id: "psychology-mindset",
    title: "Psychology & Mindset Reels Bundle",
    description: "Intriguing psychology facts, human behavior analysis, and mindset-building content. Hook readers on complex interesting ideas.",
    category: "motivation-growth",
    originalPrice: "₹149",
    price: "₹29",
    rating: "4.9",
    reviews: "2,130",
    itemsCount: "1600+ Reels",
    badge: "Intellectual Pack",
    contents: [
      "1600+ Scientific psychology files and visual layouts",
      "Clean typographic display layout with deep background elements",
      "Calm background tones and professional narrations",
      "Highly educational insights that promote saves and bookmark downloads"
    ],
    features: [
      "Stretched 9:16 vertical layout",
      "All text highly readable for mobile",
      "Commercial copyright protection"
    ]
  },

  // Fitness & Health
  {
    id: "3d-health-awareness",
    title: "3D Health Awareness Reels Bundle",
    description: "Beautiful animated 3D healthcare, diet, and anatomy awareness reels. Explain health concepts clearly using ultra-premium animated videos.",
    category: "fitness-health",
    originalPrice: "₹199",
    price: "₹39",
    rating: "4.8",
    reviews: "1,670",
    itemsCount: "500+ Reels",
    badge: "High CPM Niche",
    contents: [
      "500+ 3D Health and Anatomy animated clips",
      "Nutrition, organic eating, and body function videos",
      "Scientifically verified explanations and easy subtitles",
      "Clear, professional narration tracks"
    ],
    features: [
      "Vivid 3D visuals",
      "Excellent CTR and save ratios",
      "Instant email delivery"
    ]
  },
  {
    id: "gym-fitness-raw",
    title: "Gym Fitness Reels Bundle",
    description: "Workout motivation, hardcore lifting, and aesthetic lifestyle clips. Keep your followers engaged with pure energy and grit sports reels.",
    category: "fitness-health",
    originalPrice: "₹99",
    price: "₹20",
    rating: "4.9",
    reviews: "3,890",
    itemsCount: "2500+ Reels",
    badge: "Hardcore Energy",
    contents: [
      "2500+ Aesthetic workout and bodybuilding videos",
      "Trending phonk and high-energy electronic backing audio",
      "Inspirational workout headers and bold overlay titles",
      "Clips with extreme physical action from top creator camps"
    ],
    features: [
      "Commercial reuse rights",
      "Clean file names & metadata",
      "High resolution format"
    ]
  },
  {
    id: "3d-gym-fitness",
    title: "3D Gym Fitness Reels Bundle",
    description: "3D animated fitness, joint health, and workout posture content. Highly unique and educational style perfect for coaches, gyms, and physiotherapists.",
    category: "fitness-health",
    originalPrice: "₹149",
    price: "₹29",
    rating: "4.7",
    reviews: "1,120",
    itemsCount: "1500+ Reels",
    badge: "Premium Animation",
    contents: [
      "1500+ 3D skeleton and muscle active workout graphics",
      "Proper posture and injury prevention explanation clips",
      "Premium aesthetic dark minimalist templates",
      "Engaging sports audio overlay tracks"
    ],
    features: [
      "Perfect for specialized fitness channels",
      "No watermarks",
      "Ultra-clear vector style rendering"
    ]
  },

  // Entertainment & Storytelling
  {
    id: "hulk-hindi-story",
    title: "Hulk Hindi Story Reels Bundle",
    description: "Action-packed Hulk adventure story videos in Hindi. Superheroes storytelling dominates global entertainment charts.",
    category: "entertainment",
    originalPrice: "₹149",
    price: "₹29",
    rating: "4.9",
    reviews: "2,760",
    itemsCount: "1000+ Reels",
    badge: "Kids Favorite",
    contents: [
      "1000+ Hulk and superhero combat and moral stories",
      "High energy Hindi voiceovers with incredible expression",
      "Synchronized colored subtitles for dynamic reading",
      "Background sound effects (punches, action horns)"
    ],
    features: [
      "Guaranteed highly engaging for young audiences",
      "Compatible with YouTube Shorts and IG Reels",
      "Fast cloud downloads"
    ]
  },
  {
    id: "horror-stories",
    title: "Horror Stories Reels Bundle",
    description: "Spooky dark mystery stories and urban legends. Creepy audio soundscapes combined with cinematic visual fragments for guaranteed midnight attention.",
    category: "entertainment",
    originalPrice: "₹149",
    price: "₹29",
    rating: "4.8",
    reviews: "1,940",
    itemsCount: "1000+ Reels",
    badge: "High Night Engagement",
    contents: [
      "1000+ Spine-chilling short horror tales",
      "Eerie sound effects and whispering voiceover tracks (Hindi/English text)",
      "Dark atmospheric imagery and spooky transitions",
      "Aesthetic script cards ready for customization"
    ],
    features: [
      "Excellent sharing ratios",
      "No attribution required",
      "Clean structural categorization"
    ]
  },
  {
    id: "hindi-moral-stories",
    title: "Hindi Moral Stories Bundle",
    description: "Massive library of animated moral stories for kids. Create complete automated channels or resource portals with thousands of unique files.",
    category: "entertainment",
    originalPrice: "₹499",
    price: "₹99",
    rating: "4.9",
    reviews: "5,820",
    itemsCount: "5000+ Reels",
    badge: "Mega Collection",
    contents: [
      "5000+ Short animated moral fable clips",
      "Traditional Indian storytelling narrations",
      "Clear, readable subtitles and interactive cues",
      "Beautiful cartoon assets, sound effects, and folk backing tracks"
    ],
    features: [
      "Commercial licensing included",
      "Unlimited updates & bonus stories added monthly",
      "Massive revenue generation potentials"
    ]
  },
  {
    id: "cartoon-story-explanation",
    title: "Cartoon Story Explanation Reels Bundle",
    description: "Interesting summaries and narrative breakdowns of popular cartoons. Highly nostalgic content with extremely high viewer retention rates.",
    category: "entertainment",
    originalPrice: "₹199",
    price: "₹39",
    rating: "4.6",
    reviews: "1,340",
    itemsCount: "1600+ Reels",
    badge: "Most Nostalgic",
    contents: [
      "1600+ Animated cartoon highlight analysis videos",
      "Engaging plot theories and behind-the-scenes narration scripts",
      "Subtitles configured specifically for fast social feed scrolling",
      "Rich secondary animations and filters"
    ],
    features: [
      "Perfect for cinema reviews & trivia pages",
      "Instant checkout download",
      "High resolution format"
    ]
  },

  // Movies, Anime & Cartoons
  {
    id: "movie-clips-viral",
    title: "Movie Clip Reels Bundle",
    description: "Dramatic dialogues, action sequences, and high-intensity movie highlights. Trimmed and edited to absolute visual perfection to capture social feeds.",
    category: "movies-anime",
    originalPrice: "₹149",
    price: "₹29",
    rating: "4.8",
    reviews: "2,040",
    itemsCount: "2000+ Reels",
    badge: "Film Fanatic Only",
    contents: [
      "2000+ Cinematic high-retention movie scenes",
      "Preloaded color gradings and custom dark borders",
      "Perfect background audio tracks for intense vibes",
      "Ideal for quick compilation reels and reactions"
    ],
    features: [
      "Ready to post on any network",
      "Organized folders by genre",
      "Unlimited download access"
    ]
  },
  {
    id: "anime-4k-edits",
    title: "4K Anime Reels Bundle",
    description: "Ultra high definition 4K anime edits. Perfect rhythmic music sync, dynamic neon lighting, and high-octane fight segments.",
    category: "movies-anime",
    originalPrice: "₹299",
    price: "₹59",
    rating: "4.9",
    reviews: "4,610",
    itemsCount: "3000+ Reels",
    badge: "Otaku Special",
    contents: [
      "3000+ Custom 4K anime dynamic combat & aesthetic clips",
      "Sync-to-beat modern lo-fi, EDM, and phonk background tracks",
      "Ultra fluid keyframing and advanced software filters",
      "No copyright strikes guaranteed on compilation edits"
    ],
    features: [
      "Breathtaking 4K definition (60fps feel)",
      "Extremely popular with younger demographics",
      "Direct GDrive sync links"
    ]
  },
  {
    id: "tom-and-jerry-reels",
    title: "Tom & Jerry Reels Bundle",
    description: "Nostalgic, hilarious slapstick moments of classic Tom and Jerry cartoon adventures. Guaranteed wholesome laughs that generate massive viral spreads.",
    category: "movies-anime",
    originalPrice: "₹199",
    price: "₹39",
    rating: "4.8",
    reviews: "1,880",
    itemsCount: "1500+ Reels",
    badge: "Nostalgia Bait",
    contents: [
      "1500+ Handpicked funniest cartoon chase scene files",
      "High resolution restoration filters",
      "Ready-to-use sound effect overlays and funny audio tracks",
      "Bonus: Clean intro and outro templates for your pages"
    ],
    features: [
      "Instant social media utility",
      "High share ratios of nostalgic files",
      "Lifetime updates"
    ]
  },
  {
    id: "long-movie-clips",
    title: "Long Movies Clips Bundle",
    description: "Extended cinematic summaries and movie segments. Perfect for creators building long form movie explanation channels on Facebook/YouTube.",
    category: "movies-anime",
    originalPrice: "₹199",
    price: "₹39",
    rating: "4.7",
    reviews: "2,240",
    itemsCount: "5000+ Reels",
    badge: "Extended Pack",
    contents: [
      "5000+ Extended movie highlight sequences",
      "Prepaid non-copyright ambient soundtrack guides",
      "Formatted text outlines and scene breakdowns",
      "Super organized high capacity storage system"
    ],
    features: [
      "Incredible volume collection",
      "Excellent for Facebook monetization",
      "One-click zip extraction"
    ]
  },

  // Sports Reels
  {
    id: "cricket-reels-super",
    title: "Cricket Reels Bundle",
    description: "Incredible match moments, slow-motion bowling curves, massive sixes, and cricket legend clips. Target the immense global cricket fan base.",
    category: "sports",
    originalPrice: "₹99",
    price: "₹20",
    rating: "4.9",
    reviews: "3,120",
    itemsCount: "2000+ Reels",
    badge: "Stadium Vibe",
    contents: [
      "2000+ High contrast match recordings & epic wins",
      "Perfect slow-mo focus and background edit styles",
      "Epic commentary audios mixed with modern synth layers",
      "Covers IPL, Test, ODI, & legendary moments"
    ],
    features: [
      "No logo or branding on files",
      "Optimized file weight for easy storage",
      "Lifetime secure cloud database"
    ]
  },
  {
    id: "football-reels-classic",
    title: "Football Reels Bundle",
    description: "World cup goals, legends skill showcases, training clips, and dynamic football edits. Create beautiful, high intensity sports accounts.",
    category: "sports",
    originalPrice: "₹149",
    price: "₹29",
    rating: "4.8",
    reviews: "2,050",
    itemsCount: "1300+ Reels",
    badge: "Championship Vibe",
    contents: [
      "1300+ Fast-paced football action clips",
      "Vivid color filters and stadium ambient overlays",
      "Copyright-free electronic and hip-hop backing beats",
      "Pre-cut clip formats perfect for viral reels/Tiktok shorts"
    ],
    features: [
      "Full high definition assets",
      "Clean naming organization",
      "Instant access email copy"
    ]
  },
  {
    id: "wrestling-reels",
    title: "Wrestling Reels Bundle",
    description: "Jaw-dropping raw wrestle ring combat edits, dramatic moments, and superstar entrance clips. Tap into highly loyal sports fandoms.",
    category: "sports",
    originalPrice: "₹99",
    price: "₹20",
    rating: "4.7",
    reviews: "1,440",
    itemsCount: "3500+ Reels",
    badge: "Extreme Force",
    contents: [
      "3500+ Wrestling action edits and historic segments",
      "Trending phonk enter beats and crowd volume layers",
      "Ultra-dynamic visual zooms and raw edit overlays",
      "Covers all your favorite heavy-weight stars and legends"
    ],
    features: [
      "Raw high-volume collection pack",
      "Instant checkout dispatch",
      "Excellent viral retention ratings"
    ]
  },

  // Business & Learning
  {
    id: "trading-knowledge",
    title: "Trading Knowledge Reels Bundle",
    description: "Forex, cryptocurrency, chart indicators, and stock trading techniques. Visual diagrams combined with highly educational trading masterclass tips.",
    category: "business-learning",
    originalPrice: "₹99",
    price: "₹20",
    rating: "4.9",
    reviews: "2,980",
    itemsCount: "1000+ Reels",
    badge: "Wealth Formula",
    contents: [
      "1000+ Technical analysis charts and crypto reels",
      "Clean dynamic overlays illustrating buy and sell signals",
      "Informative trading advice and micro-lesson scripts",
      "Nostalgic electronic and deep tech backing audio"
    ],
    features: [
      "Premium dark design aesthetic",
      "Highly educational - huge saves metric",
      "Instant secure link delivery"
    ]
  },
  {
    id: "dropshipping-reels",
    title: "Dropshipping Reels Bundle",
    description: "Winning Shopify/dropshipping products, shop models, and viral product ads. Clean aesthetic layout which promotes e-commerce sales.",
    category: "business-learning",
    originalPrice: "₹49",
    price: "₹10",
    rating: "4.8",
    reviews: "1,110",
    itemsCount: "1000+ Reels",
    badge: "E-Com Accelerator",
    contents: [
      "1000+ Top winning viral product demonstration loops",
      "Engaging text call-to-actions hooks and templates",
      "Prepaid updates on trending products monthly",
      "Bonus: High conversions script guide pdf"
    ],
    features: [
      "Unbelievable dynamic price",
      "Direct sales generating formulas",
      "No royalties forever"
    ]
  },
  {
    id: "affiliate-marketing",
    title: "Affiliate Marketing Reels Bundle",
    description: "Passive income strategies, visual earnings guides, mindset hacks, and systematic lead capture tricks. Build highly converting affiliate profiles.",
    category: "business-learning",
    originalPrice: "₹99",
    price: "₹20",
    rating: "4.7",
    reviews: "1,350",
    itemsCount: "1300+ Reels",
    badge: "Passive Formula",
    contents: [
      "1300+ Affiliate mindset tips and wealth formula clips",
      "Aesthetic workspace video backgrounds & high lifestyle overlays",
      "Actionable hooks urging visitors to click profile links",
      "Tested marketing copy scripts included"
    ],
    features: [
      "Proven layout architecture",
      "Clean file exports",
      "Secure payment processing"
    ]
  },
  {
    id: "business-tips-reels",
    title: "Business Tips Reels Bundle",
    description: "Startup guidance, business frameworks, legendary advice, and micro wealth tips. Boost conversions and attract ambitious subscribers.",
    category: "business-learning",
    originalPrice: "₹49",
    price: "₹10",
    rating: "4.8",
    reviews: "1,520",
    itemsCount: "3000+ Reels",
    badge: "Success Blueprint",
    contents: [
      "3000+ Business strategy tips and case studies clips",
      "Minimalist high contrast typographic card layouts",
      "Calm background soundtracks ready to sync",
      "Powerful mindset rules for high-achieving startups"
    ],
    features: [
      "Massive collection",
      "Incredibly safe files",
      "Optimized drive file weights"
    ]
  },

  // Premium Digital Products
  {
    id: "mega-digital-product-bundle",
    title: "Mega Digital Product Bundle 2.0",
    description: "The absolute motherlode of premium digital resources. Over 100,000 graphic assets, fonts, vector files, templates, and creator tools to power any creative or marketing project.",
    category: "premium-digital",
    originalPrice: "₹599",
    price: "₹109",
    rating: "4.9",
    reviews: "7,840",
    itemsCount: "100,000+ Resources",
    badge: "All-In-One Apex",
    contents: [
      "Over 100K high-resolution graphic overlay components",
      "1000+ Designer premium custom fonts (.TTF / .OTF)",
      "Ready-to-resell templates with full commercial rights",
      "Premium vector asset libraries, website overlays, and web assets"
    ],
    features: [
      "Master Resell Rights (MRR) pack",
      "Instant single download directory link",
      "Free future asset expansions"
    ]
  },
  {
    id: "3-lakh-ai-prompts",
    title: "3 Lakh+ AI Prompts Mega Pack",
    description: "Supercharge your business, coding, graphic art, and writing. The ultimate organized direct database of 300,000+ dynamic professional AI prompts.",
    category: "premium-digital",
    originalPrice: "₹499",
    price: "₹97",
    rating: "4.9",
    reviews: "5,110",
    itemsCount: "300,000+ Prompts",
    badge: "Unlimited Automation",
    contents: [
      "300,000+ Highly structured prompts for ChatGPT, Claude, and Gemini",
      "Perfect Midjourney, Stable Diffusion, and Dall-E image prompt kits",
      "Copywriting, financial, software coding, and marketing blueprints",
      "Extremely organized excel/notion datasets categorized by field"
    ],
    features: [
      "One click copy-paste format",
      "100% updated for modern AI models",
      "Highest quality prompts verified by hand"
    ]
  },
  {
    id: "30k-canva-templates",
    title: "30,000+ Canva Templates Bundle",
    description: "Design social media banners, pitch decks, business cards, posters, and web templates in seconds. Drag-and-drop templates customizable directly on Canva.",
    category: "premium-digital",
    originalPrice: "₹499",
    price: "₹99",
    rating: "4.8",
    reviews: "3,590",
    itemsCount: "30,000+ Templates",
    badge: "Design Masterclass",
    contents: [
      "30,000+ Easy drag and drop custom Canva links",
      "Premium slides, business pitch layouts, and presentation packs",
      "Instagram story posts, carousels, and YouTube cover arts",
      "Completely editable colors, fonts, margins, and graphics"
    ],
    features: [
      "Safe direct access Canva share tokens",
      "Modern high converting aesthetic designs Only",
      "No Canva subscription required to edit"
    ]
  },
  {
    id: "8-lakh-ebooks-collection",
    title: "8 Lakh+ eBooks Collection",
    description: "The absolute grand digital library. Access over 800,000 ebooks on wealth, wellness, technology, business, self-help, and fiction.",
    category: "premium-digital",
    originalPrice: "₹599",
    price: "₹109",
    rating: "4.9",
    reviews: "6,410",
    itemsCount: "800,000+ eBooks",
    badge: "World Library",
    contents: [
      "800,000+ Master Resell Rights (MRR) books in PDF & EPUB formats",
      "Complete educational course manuals, academic briefs, and startup blueprints",
      "Nicely organized metadata collections searchable by topic",
      "Resell files individually to generate high volume independent income"
    ],
    features: [
      "Ultimate learning asset library",
      "100% legal ownership redistribution rights",
      "Instant lifetime drive access"
    ]
  }
];

const PREMIUM_PRODUCTS_DATA: Bundle[] = [
  {
    id: "pm-moral-cartoon",
    title: "5000+ Long Moral Stories Cartoon Bundle",
    description: "Discover thousands of engaging cartoon-based moral stories perfect for content creation, storytelling channels, and educational use.",
    category: "premium-product",
    originalPrice: "₹499",
    price: "₹99",
    rating: "4.9",
    reviews: "4,120",
    itemsCount: "5000+ Stories",
    badge: "Bestseller Moral Pack",
    contents: [
      "5000+ HD animated moral cartoon videos",
      "Traditional Indian storytelling templates & scripts",
      "Ready-to-resell formats with Master Resell Rights",
      "Engaging pre-built background audio & sound effects"
    ],
    features: [
      "Instant download after payment",
      "Lifetime access to purchased resources",
      "One-time payment, no subscriptions",
      "Regularly updated digital resources",
      "Beginner-friendly and ready to use"
    ]
  },
  {
    id: "pm-mega-digital",
    title: "Mega Digital Product Bundle 2.0",
    description: "Get access to an extensive collection of premium digital resources including templates, tools, graphics, business assets, marketing materials, and more.",
    category: "premium-product",
    originalPrice: "₹599",
    price: "₹109",
    rating: "4.9",
    reviews: "8,920",
    itemsCount: "100,000+ Resources",
    badge: "Apex Digital Resource",
    contents: [
      "100K+ Graphic elements, high-resolution vector assets",
      "1000+ Premium designer and workspace fonts (.TTF/.OTF)",
      "Ready-to-resell templates with full commercial rights",
      "Durable lifetime library of creator assets"
    ],
    features: [
      "Instant download after payment",
      "Lifetime access to purchased resources",
      "One-time payment, no subscriptions",
      "Regularly updated digital resources",
      "Beginner-friendly and ready to use"
    ]
  },
  {
    id: "pm-combo-reels",
    title: "30+ Categories Combo Reels Bundle Pack",
    description: "A massive collection of reels across multiple niches including motivation, fitness, AI, anime, business, spirituality, education, sports, and entertainment.",
    category: "premium-product",
    originalPrice: "₹799",
    price: "₹149",
    rating: "4.9",
    reviews: "12,410",
    itemsCount: "40,000+ Combined Reels",
    badge: "Ultimate Reels Library",
    contents: [
      "Covers 30+ highly lucrative internet niches",
      "Includes spirituality, tech, fitness, and animated shorts",
      "100% pre-edited with captions and sound effects",
      "Perfect compilation folders ready to drive social traffic"
    ],
    features: [
      "Instant download after payment",
      "Lifetime access to purchased resources",
      "One-time payment, no subscriptions",
      "Regularly updated digital resources",
      "Beginner-friendly and ready to use"
    ]
  },
  {
    id: "pm-ai-prompts",
    title: "3 Lakh+ AI Prompts Mega Pack",
    description: "Access over 300,000 carefully curated AI prompts for ChatGPT, Midjourney, content creation, marketing, business automation, coding, and productivity.",
    category: "premium-product",
    originalPrice: "₹499",
    price: "₹97",
    rating: "4.8",
    reviews: "5,302",
    itemsCount: "300,000+ Prompts",
    badge: "Smart Automation",
    contents: [
      "300,000+ Highly structured prompts for ChatGPT, Claude, and Gemini",
      "Perfect Midjourney, Stable Diffusion, and Dall-E image prompt kits",
      "Copywriting, financial, software coding, and marketing blueprints",
      "Extremely organized excel/notion datasets categorized by field"
    ],
    features: [
      "Instant download after payment",
      "Lifetime access to purchased resources",
      "One-time payment, no subscriptions",
      "Regularly updated digital resources",
      "Beginner-friendly and ready to use"
    ]
  },
  {
    id: "pm-canva-templates",
    title: "30,000+ Editable Canva Templates Bundle",
    description: "Professionally designed Canva templates for social media, business branding, presentations, marketing campaigns, and content creation.",
    category: "premium-product",
    originalPrice: "₹499",
    price: "₹99",
    rating: "4.8",
    reviews: "3,890",
    itemsCount: "30,005+ Templates",
    badge: "Canva Pro",
    contents: [
      "30,000+ Easy drag and drop custom Canva links",
      "Premium slides, business pitch layouts, and presentation packs",
      "Instagram story posts, carousels, and YouTube cover arts",
      "Completely editable colors, fonts, margins, and graphics"
    ],
    features: [
      "Instant download after payment",
      "Lifetime access to purchased resources",
      "One-time payment, no subscriptions",
      "Regularly updated digital resources",
      "Beginner-friendly and ready to use"
    ]
  },
  {
    id: "pm-udemy-courses",
    title: "5000+ Udemy Courses Bundle",
    description: "A huge collection of premium learning resources covering business, technology, programming, AI, marketing, design, productivity, and more.",
    category: "premium-product",
    originalPrice: "₹999",
    price: "₹199",
    rating: "4.9",
    reviews: "6,740",
    itemsCount: "5000+ Premium Courses",
    badge: "Knowledge Vault",
    contents: [
      "E-learning, development, cloud computing, and IT certification",
      "Business strategy, marketing mastery, and entrepreneur models",
      "Design systems, high converting copywriting guides, & productivity",
      "Access full video downloads and exercise kits directly"
    ],
    features: [
      "Instant download after payment",
      "Lifetime access to purchased resources",
      "One-time payment, no subscriptions",
      "Regularly updated digital resources",
      "Beginner-friendly and ready to use"
    ]
  },
  {
    id: "pm-video-assets",
    title: "World's Biggest Video Editing Assets Bundle",
    description: "Includes transitions, presets, LUTs, overlays, motion graphics, sound effects, stock assets, and professional editing resources.",
    category: "premium-product",
    originalPrice: "₹899",
    price: "₹149",
    rating: "4.9",
    reviews: "9,120",
    itemsCount: "150,000+ Cinematic Assets",
    badge: "Pro Video Suite",
    contents: [
      "Ultra-professional CUBE color correction LUTs",
      "1000+ High fidelity motion graphics transitions & lower thirds",
      "Specialized sound effects (SFX) & cinematic audio cues",
      "Ready-to-use overlay textures, cinematic leaks, and grains"
    ],
    features: [
      "Instant download after payment",
      "Lifetime access to purchased resources",
      "One-time payment, no subscriptions",
      "Regularly updated digital resources",
      "Beginner-friendly and ready to use"
    ]
  },
  {
    id: "pm-iit-jee-neet",
    title: "Ultimate IIT JEE & NEET Preparation Bundle 2024-2025",
    description: "Comprehensive study materials, notes, mock tests, question banks, PYQs, practice papers, and preparation resources for competitive exams.",
    category: "premium-product",
    originalPrice: "₹699",
    price: "₹129",
    rating: "4.9",
    reviews: "5,410",
    itemsCount: "Full Prep Vault",
    badge: "Academic Booster",
    contents: [
      "High detailed subject notes (Physics, Chemistry, Biology)",
      "Thousands of custom practice questions & PYQs with solutions",
      "Interactive mock test sheets & regular updates",
      "Covers comprehensive formula books and scoring cheat templates"
    ],
    features: [
      "Instant download after payment",
      "Lifetime access to purchased resources",
      "One-time payment, no subscriptions",
      "Regularly updated digital resources",
      "Beginner-friendly and ready to use"
    ]
  }
];

interface CoursesPageProps {
  onBack: () => void;
  initialTab?: "store" | "premium";
  onCheckoutOpen?: (isOpen: boolean) => void;
}

export function CoursesPage({ onBack, initialTab = "store", onCheckoutOpen }: CoursesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVaultTab, setActiveVaultTab] = useState<"store" | "premium">(initialTab);
  const [activeCategory, setActiveCategory] = useState<BundleCategory>("all");
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  
  // Checkout flow states
  const [checkoutBundle, setCheckoutBundle] = useState<Bundle | null>(null);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutPaymentStep, setCheckoutPaymentStep] = useState<"form" | "confirming" | "success">("form");
  const [downloadLink, setDownloadLink] = useState("");

  // Notify parent component when checkout modal or details modal is active
  useEffect(() => {
    if (onCheckoutOpen) {
      onCheckoutOpen(!!checkoutBundle || !!selectedBundle);
    }
  }, [checkoutBundle, selectedBundle, onCheckoutOpen]);

  const filteredBundles = (activeVaultTab === "store" ? COURSES_DATA : PREMIUM_PRODUCTS_DATA).filter(bundle => {
    const matchesSearch = bundle.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          bundle.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bundle.contents.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === "all" ? true : bundle.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories: { label: string; value: BundleCategory }[] = [
    { label: "All Bundles", value: "all" },
    { label: "AI & Animation", value: "ai-animation" },
    { label: "Motivation & Growth", value: "motivation-growth" },
    { label: "Fitness & Health", value: "fitness-health" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Movies & Anime", value: "movies-anime" },
    { label: "Sports Reels", value: "sports" },
    { label: "Business & Learning", value: "business-learning" },
    { label: "Premium Digital", value: "premium-digital" },
  ];

  const triggerCheckout = (bundle: Bundle) => {
    if (bundle.externalLink) {
      window.open(bundle.externalLink, "_blank");
      return;
    }
    setCheckoutBundle(bundle);
    setCheckoutEmail("");
    setCheckoutPaymentStep("form");
    setDownloadLink("");
  };

  const handlePay = (e: FormEvent) => {
    e.preventDefault();
    if (!checkoutEmail) return;

    // Simulate instant payment confirmation 1.5 seconds later
    setCheckoutPaymentStep("confirming");
    setTimeout(() => {
      setCheckoutPaymentStep("success");
      // Generated high-fidelity instant link for physical feel
      setDownloadLink(`https://download.thebundlebaaz.space/file/${checkoutBundle?.id}_bundle_v1.0.4.zip?key=${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1500);
  };

  return (
    <>
      <div id="courses-view-root" className="relative z-10 flex-1 flex flex-col items-center justify-start py-[3vh] px-4 md:px-8 w-full max-w-6xl mx-auto overflow-y-auto max-h-[85vh] scrollbar-thin">
      
      {/* HEADER CONTROLS */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pt-2">
        <button
          id="btn-back-home"
          onClick={onBack}
          className="liquid-glass rounded-full px-5 py-2.5 text-xs font-semibold md:text-sm text-white/90 hover:text-white hover:bg-white/5 active:scale-95 transition-all flex items-center gap-2 self-start"
        >
          <ArrowLeft className="w-4 h-4 text-[#f3b33e]" />
          <span>Back to Home</span>
        </button>

        {/* Search input with transparent architecture */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-[18px] top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            id="bundle-search-bar"
            type="text"
            placeholder="Search courses, templates, eBooks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="liquid-glass rounded-full pl-12 pr-6 py-2.5 w-full text-xs md:text-sm text-white placeholder:text-white/40 focus:outline-none transition-all placeholder-shown:text-white/40"
          />
        </div>
      </div>

      <div className="w-full text-center space-y-2 mb-6">
        <h2 
          style={{ fontFamily: "'Instrument Serif', serif" }} 
          className="text-4xl md:text-5xl text-white italic tracking-tight font-light"
        >
          {activeVaultTab === "premium" ? "Premium Digital" : "Premium Creator"} <span className="not-italic bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent font-normal">Vault</span>
        </h2>
        <p className="text-white/60 text-xs md:text-sm max-w-lg mx-auto">
          {activeVaultTab === "premium" 
            ? "Unlock high-value digital resources, templates, courses, creative assets, and educational materials designed to help creators, marketers, students, and business owners save time and grow faster."
            : "Explore expertly-curated resource packs, templates, and courses engineered with visual perfection and professional utility. Secure instant downloads upon checkout."
          }
        </p>
      </div>

      {/* DIRECT VAULT SELECTION SEGMENTS (STYLISH GLASS SLIDER) */}
      <div className="flex bg-white/[0.03] border border-white/10 p-1 rounded-full mb-8 max-w-md w-full relative z-10">
        <button
          onClick={() => {
            setActiveVaultTab("store");
            setActiveCategory("all");
          }}
          className={`flex-1 rounded-full py-2.5 text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center ${
            activeVaultTab === "store"
              ? "bg-[#f3b33e] text-black shadow-lg font-bold"
              : "text-white/60 hover:text-white"
          }`}
        >
          <span>Store</span>
        </button>
        <button
          onClick={() => {
            setActiveVaultTab("premium");
            setActiveCategory("all");
          }}
          className={`flex-1 rounded-full py-2.5 text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center ${
            activeVaultTab === "premium"
              ? "bg-[#f3b33e] text-black shadow-lg font-bold"
              : "text-white/60 hover:text-white"
          }`}
        >
          <span>Premium Products</span>
        </button>
      </div>



      {/* BUNDLE LISTING GRID */}
      {filteredBundles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full pb-12">
          {filteredBundles.map((bundle) => (
            <div 
              key={bundle.id}
              id={`bundle-card-${bundle.id}`}
              className="liquid-glass rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.01] transition-all duration-300 relative group"
            >
              {/* Badge & Rating overlay */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-neutral-400 border border-white/10 px-2.5 py-0.5 rounded-full bg-white/[0.02]">
                  {bundle.badge}
                </span>
                <span className="flex items-center gap-1 text-[#f3b33e] text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{bundle.rating}</span>
                  <span className="text-white/40 text-[10px]">({bundle.reviews})</span>
                </span>
              </div>

              {/* Title & Desc */}
              <div className="space-y-2 mb-4 text-left">
                <h3 className="text-white text-base font-semibold tracking-wide leading-snug group-hover:text-[#f3b33e] transition-colors">
                  {bundle.title}
                </h3>
                <p className="text-white/70 text-xs leading-relaxed line-clamp-3">
                  {bundle.description}
                </p>
              </div>

              {/* Contents quick preview & item count */}
              <div className="border-t border-white/10 pt-3 mt-3 mb-5 text-left">
                <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] font-mono uppercase tracking-wider mb-2">
                  <Layers className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{bundle.itemsCount}</span>
                </div>
                <ul className="text-white/60 text-[11px] space-y-1.5 pl-1">
                  {bundle.contents.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                      <span className="text-[#f3b33e] font-bold text-[10px] pt-[1px]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  {bundle.contents.length > 3 && (
                    <li className="text-[#f3b33e] hover:underline font-medium text-[10px] cursor-pointer" onClick={() => setSelectedBundle(bundle)}>
                      + See {bundle.contents.length - 3} more modules...
                    </li>
                  )}
                </ul>
              </div>

              {/* Prices & Action Button */}
              <div className="flex flex-col gap-3 mt-auto pt-3 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs text-neutral-500 line-through">
                      {bundle.originalPrice}
                    </span>
                    <span className="text-lg md:text-xl font-semibold text-white">
                      {bundle.price}
                    </span>
                    {(() => {
                      const originalVal = parseFloat(bundle.originalPrice.replace(/[^0-9.]/g, ""));
                      const currentVal = parseFloat(bundle.price.replace(/[^0-9.]/g, ""));
                      const discountPercent = !isNaN(originalVal) && !isNaN(currentVal) 
                        ? Math.round(((originalVal - currentVal) / originalVal) * 100) 
                        : null;
                      return discountPercent ? (
                        <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded ml-1">
                          {discountPercent}% OFF
                        </span>
                      ) : null;
                    })()}
                  </div>
                  
                  <div className="flex gap-1.5">
                    <button
                      id={`btn-info-${bundle.id}`}
                      onClick={() => setSelectedBundle(bundle)}
                      className="liquid-glass rounded-full p-2.5 text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all text-xs"
                      title="View Details"
                    >
                      <BookOpen className="w-4 h-4" />
                    </button>
                    {bundle.externalLink ? (
                      <a
                        id={`btn-buy-${bundle.id}`}
                        href={bundle.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#f3b33e] hover:bg-[#f3b33e]/90 text-black font-semibold text-xs rounded-full px-4 py-2 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer inline-flex whitespace-nowrap"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Buy Bundle</span>
                        <ArrowUpRight className="w-3 h-3 text-black/70 ml-0.5" />
                      </a>
                    ) : (
                      <button
                        id={`btn-buy-${bundle.id}`}
                        onClick={() => triggerCheckout(bundle)}
                        className="bg-[#f3b33e] hover:bg-[#f3b33e]/90 text-black font-semibold text-xs rounded-full px-4 py-2 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Get Now</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-white/50 space-y-2">
          <Sparkles className="w-10 h-10 text-neutral-600 mx-auto animate-pulse" />
          <p className="font-mono text-xs">No matching resource bundles found.</p>
          <button onClick={() => setSearchQuery("")} className="text-[#f3b33e] text-xs hover:underline pt-2 cursor-pointer">
            Reset search query
          </button>
        </div>
      )}

      </div>

      {/* SINGLE BUNDLE DETAIL DIALOG MODAL */}
      {selectedBundle && (
        <div 
          id="detail-modal-backdrop"
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedBundle(null)}
        >
          <div 
            id="detail-modal-card"
            className="liquid-glass rounded-3xl p-6 md:p-8 max-w-2xl w-full relative z-50 text-white animate-fade-in text-left max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="detail-modal-close"
              onClick={() => setSelectedBundle(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-[#f3b33e] border border-[#f3b33e]/30 px-3 py-0.5 rounded-full bg-[#f3b33e]/5">
                  {selectedBundle.badge}
                </span>
                <h3 className="text-2xl font-bold mt-3 leading-snug">{selectedBundle.title}</h3>
                <p className="text-white/70 text-xs md:text-sm mt-2 leading-relaxed">{selectedBundle.description}</p>
              </div>

              {/* Exact inclusions List */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-[#f3b33e] font-mono font-semibold">Everything You Get:</h4>
                <div className="space-y-2 max-h-[25vh] overflow-y-auto pr-2 scrollbar-thin">
                  {selectedBundle.contents.map((item, id) => (
                    <div key={id} className="flex items-start gap-2 text-xs md:text-sm text-neutral-300">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features and specifications list */}
              <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-3 text-xs text-neutral-400">
                {selectedBundle.features.map((feat, id) => (
                  <div key={id} className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#f3b33e]/80" />
                    <span className="capitalize">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Footer pricing & actions */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-4">
                <div>
                  <span className="text-xs text-neutral-500 line-through mr-1.5">{selectedBundle.originalPrice}</span>
                  <span className="text-2xl font-bold text-white">{selectedBundle.price}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold block uppercase">instant zip deliver</span>
                </div>
                {selectedBundle.externalLink ? (
                  <a
                    id="modal-buy-now"
                    href={selectedBundle.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSelectedBundle(null)}
                    className="bg-[#f3b33e] hover:bg-[#f3b33e]/90 text-black font-bold text-xs md:text-sm rounded-full px-6 py-3 flex items-center gap-2 active:scale-95 transition-all cursor-pointer inline-flex whitespace-nowrap"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Buy Securely on Cosmofeed</span>
                    <ArrowUpRight className="w-4 h-4 text-black/70" />
                  </a>
                ) : (
                  <button
                    id="modal-buy-now"
                    onClick={() => {
                      const b = selectedBundle;
                      setSelectedBundle(null);
                      triggerCheckout(b);
                    }}
                    className="bg-[#f3b33e] hover:bg-[#f3b33e]/90 text-black font-bold text-sm rounded-full px-6 py-3 flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Get Instant Download Link</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT SIMPLIFIED LIQUID GLASS MODAL */}
      {checkoutBundle && (
        <div 
          id="checkout-modal-backdrop"
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setCheckoutBundle(null)}
        >
          <div 
            id="checkout-modal-card"
            className="liquid-glass rounded-3xl p-6 md:p-8 max-w-md w-full relative z-50 text-white text-left max-h-[90vh] overflow-y-auto scrollbar-thin"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="checkout-modal-close"
              onClick={() => setCheckoutBundle(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {checkoutPaymentStep === "form" && (
              <form onSubmit={handlePay} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400">SECURE DEMO CHECKOUT</span>
                  <h3 className="text-lg font-bold leading-snug">Confirm Your Purchase</h3>
                  <div className="space-y-2 mt-1.5 border-l border-[#f3b33e]/50 pl-2.5">
                    <p className="text-xs text-neutral-300 font-light leading-relaxed">
                      You're seconds away from securing <strong className="text-white">{checkoutBundle.title}</strong>
                    </p>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed italic">
                      {checkoutBundle.description}
                    </p>
                  </div>
                </div>

                <div className="border border-white/5 rounded-xl p-4 bg-white/[0.01] space-y-2">
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Bundle Product</span>
                    <span className="line-clamp-1 max-w-[180px] text-white font-medium">{checkoutBundle.title}</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Delivery System</span>
                    <span className="text-emerald-400 font-semibold uppercase text-[10px]">Instant Download</span>
                  </div>
                  <div className="border-t border-white/5 pt-2 mt-2 flex justify-between text-sm">
                    <span className="text-neutral-300 font-medium">Total Charge</span>
                    <span className="font-bold text-[#f3b33e] text-base">{checkoutBundle.price}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="checkout-email" className="block text-xs uppercase tracking-wider text-neutral-400 font-mono font-medium">
                    Send Download Link To:
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    placeholder="Enter your billing email address"
                    value={checkoutEmail}
                    onChange={(e) => setCheckoutEmail(e.target.value)}
                    className="liquid-glass rounded-xl px-4 py-2.5 w-full text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#f3b33e]"
                  />
                  <p className="text-[10px] text-neutral-500 font-light">Make sure this email is accurate; the backup copy is sent here as well.</p>
                </div>

                <button
                  id="checkout-btn-pay"
                  type="submit"
                  className="w-full bg-[#f3b33e] hover:bg-[#f3b33e]/90 text-black font-bold text-xs md:text-sm py-3 rounded-full flex items-center justify-center gap-2 active:scale-95 transition-all mt-6 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Payment & Generate Link ({checkoutBundle.price})</span>
                </button>
              </form>
            )}

            {checkoutPaymentStep === "confirming" && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-neutral-800 border-t-[#f3b33e] animate-spin"></div>
                  <ShoppingBag className="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-mono text-neutral-400">PROCESSING SECURE DEMO PAYMENT</p>
                  <h4 className="text-base font-semibold">Generating Your Secure Zip Link</h4>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto">Connecting with confirm servers to release your courses instantly...</p>
                </div>
              </div>
            )}

            {checkoutPaymentStep === "success" && (
              <div className="space-y-5 py-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <div className="p-1 rounded-full bg-emerald-950/50 border border-emerald-500/35">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 block">DEMO PAYMENT CONFIRMED</span>
                    <h4 className="text-base font-bold text-white">Purchase Successful</h4>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed font-light">
                  Thank you! Your transaction has been confirmed successfully. You can download <strong className="text-white">{checkoutBundle?.title}</strong> instantly below.
                </p>

                <div className="liquid-glass rounded-xl p-4 border border-white/5 space-y-3">
                  <span className="text-[10px] font-mono text-[#f3b33e] block uppercase">instant resource link</span>
                  <a
                    id="checkout-btn-download"
                    href={downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#f3b33e] hover:bg-[#f3b33e]/90 text-black font-bold text-xs py-3 rounded-full flex items-center justify-center gap-2 active:scale-95 transition-all text-center"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Bundle Zip Now</span>
                  </a>
                  <p className="text-[10px] text-neutral-500 font-medium text-center italic break-all px-1">
                    Backup link is dispatched successfully to {checkoutEmail}
                  </p>
                </div>

                <button
                  id="checkout-success-close"
                  onClick={() => setCheckoutBundle(null)}
                  className="w-full border border-white/10 hover:bg-white/5 text-xs text-white/80 hover:text-white py-2.5 rounded-full transition-colors font-medium cursor-pointer"
                >
                  Continue Browsing Vault
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
