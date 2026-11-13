export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Commercial' | 'Creators' | 'UX';
  client: string;
  clientUrl?: string;
  year: string;
  duration: string;
  role: string;
  metrics: string;
  description: string;
  aspectRatio: '16:9';
  thumbnailUrl: string;
  videoUrl: string;
  tags: string[];
}

export interface CareerTrack {
  id: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  trackType: 'Video' | 'UX' | 'Live Events';
  color: string;
  highlights: string[];
}

export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  description: string;
  startingPrice: string;
  deliveryTime: string;
  features: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  initials: string;
  studio: string;
  badgeColor: string;
}

export interface FAQItem {
  id: string;
  num: string;
  question: string;
  answer: string;
}

export const KUNAL_PROFILE = {
  name: "Kunal",
  agency: "UX Designer & Video Editor",
  tagline: "UX DESIGNER · VIDEO EDITOR · CONTENT CREATOR",
  subheading:
    "UX designer and video editor with 4+ years of experience editing short- and long-form video content, combining research-driven Figma UX design with storytelling in Premiere Pro and After Effects.",
  location: "Edinburgh, United Kingdom",
  currentDegree: "MSc User Experience Design, Edinburgh Napier University (01/2025 - 06/2025)",
  email: "kunalvips1406@gmail.com",
  phone: "",
  portfolioLink:
    "https://www.figma.com/proto/jQimrENE5lLEQazv0nwj4d/Untitled?node-id=1-55&viewport=447,168,0.68&t=LJ9qXY2xL2RjRPE9-1&scaling=min-zoom&content-scaling=fixed&page-id=0:1",
  portfolioLinkLabel: "Figma UX Portfolio Prototype",
  verifiedRating: "Edinburgh, UK",
  experienceLabel: "4+ YEARS EXPERIENCE",
  skills: [
    { name: "Figma & UX Prototyping", level: 90, category: "UX & Design", icon: "layout" },
    { name: "Adobe Premiere Pro", level: 95, category: "Video Editing", icon: "video" },
    { name: "Adobe After Effects", level: 90, category: "Motion Graphics", icon: "wand2" },
    { name: "Color Grading & Sound Design", level: 88, category: "Post-Production", icon: "palette" },
    { name: "Adobe Photoshop & CorelDraw", level: 88, category: "Visual Assets", icon: "image" },
    { name: "User Research & Usability Testing", level: 90, category: "UX Methodology", icon: "volume2" }
  ],
  skillGroups: [
    {
      id: "ux",
      code: "UXD",
      title: "UX & Interaction Design",
      subtitle: "Edinburgh Napier University MSc",
      description:
        "Research-driven product design connecting user research, wireframing, usability testing, and interactive prototyping in Figma.",
      items: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Usability Testing",
        "Information Architecture",
        "Interaction Design",
        "Figma"
      ]
    },
    {
      id: "video",
      code: "VID",
      title: "Video & Post-Production",
      subtitle: "4+ Years End-to-End Editing",
      description:
        "Short- and long-form narrative editing, motion graphics, color grading, and sound design from raw footage to multi-platform delivery.",
      items: [
        "Adobe Premiere Pro",
        "Adobe After Effects",
        "Motion Graphics",
        "Color Grading",
        "Sound Design",
        "Short & Long-Form Editing",
        "Content Strategy"
      ]
    },
    {
      id: "visual",
      code: "VIS",
      title: "Visual & Graphic Design",
      subtitle: "BA Journalism & Mass Comm",
      description:
        "Brand visual assets, social layouts, artist promotional graphics, and publication workflows honed across freelance and agency teams.",
      items: [
        "Adobe Photoshop",
        "CorelDraw",
        "Visual Storytelling",
        "Brand Storytelling",
        "Audience Engagement",
        "MS Office"
      ]
    },
    {
      id: "profile",
      code: "PRO",
      title: "Languages & Core Strengths",
      subtitle: "Multilingual & Production Ready",
      description:
        "Collaborative creative problem-solving, tight deadline management, and cross-cultural communication across international media teams.",
      items: [
        "English",
        "Hindi",
        "Ukrainian",
        "Creative Problem-Solving",
        "Critical Thinking",
        "Time Management",
        "Active Listening"
      ]
    }
  ],
  categories: [
    {
      id: "commercial",
      name: "COMMERCIAL & BRAND",
      badge: "POST-PRODUCTION",
      desc: "Brand campaigns, travel promos, and entertainment edits with end-to-end grading and audio mix.",
      count: "Sun n Sky & Clients"
    },
    {
      id: "creators",
      name: "YOUTUBE & CREATORS",
      badge: "CHANNEL GROWTH",
      desc: "Long- and short-form edits for monetized YouTube channels including Urban Pulse and Just Drama.",
      count: "Music, Gaming, Sports"
    },
    {
      id: "sports",
      name: "SPORTS & LIVE EVENTS",
      badge: "FAST TURNAROUND",
      desc: "Sports highlight promos for Hypd Sports and on-ground management for Moto GP Bharat, Zomaland & MTV Hustle 3.0.",
      count: "Live & Digital"
    },
    {
      id: "ux",
      name: "UX & INTERACTION",
      badge: "EDINBURGH NAPIER MSC",
      desc: "User research, information architecture, wireframing, usability testing, and interactive Figma prototypes.",
      count: "Figma Portfolio"
    }
  ],
  stats: [
    { label: "Editing Experience", value: "4+ YRS" },
    { label: "Work & Intern Roles", value: "06" },
    { label: "Current Degree", value: "MSc UX" },
    { label: "Languages Spoken", value: "03" }
  ],
  brands: [
    "Sun n Sky Entertainment",
    "Gulmohar Digitech",
    "International Schooling",
    "Hypd Sports",
    "Zoomthing",
    "Urban Pulse",
    "Just Drama",
    "Moto GP Bharat",
    "Zomaland",
    "MTV Hustle 3.0",
    "Edinburgh Napier University",
    "VIPS TC (GGSIPU)"
  ]
};

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "master-showreel",
    title: "SHOWREEL ARCHIVE",
    subtitle: "Commercial, Creator & Motion Editing Highlights",
    category: "Commercial",
    client: "Selected Production Works",
    year: "2024",
    duration: "01' 24\"",
    role: "Video Editor • Motion & Sound",
    metrics: "Showreel • 16:9",
    description:
      "Compilation of commercial storytelling, pacing cuts, motion graphics, and audio mixing in Adobe Premiere Pro and After Effects.",
    aspectRatio: "16:9",
    thumbnailUrl: "/assets/poster-showreel.webp",
    videoUrl: "/assets/kunal-showreel.mp4",
    tags: ["Premiere Pro", "After Effects", "Showreel", "Sound Design"]
  },
  {
    id: "jet2-holidays",
    title: "JET2 HOLIDAYS × SDP",
    subtitle: "Travel & Lifestyle Video Edit",
    category: "Commercial",
    client: "Jet2 Holidays / SDP",
    year: "2025",
    duration: "00' 45\"",
    role: "Video Editor • Color Grading",
    metrics: "Commercial • 16:9",
    description:
      "Clean narrative pacing, voice-led storytelling, and balanced color grading tailored for travel and lifestyle social audiences.",
    aspectRatio: "16:9",
    thumbnailUrl: "/assets/poster-jet2.webp",
    videoUrl: "/assets/jet2-holidays-reel.mp4",
    tags: ["Commercial", "Color Grading", "Storytelling", "Premiere Pro"]
  },
  {
    id: "social-hook-reel",
    title: "SHORT-FORM SOCIAL REEL",
    subtitle: "Fast-Paced Social & Caption Edit",
    category: "Creators",
    client: "Social Media Content",
    year: "2024",
    duration: "00' 32\"",
    role: "Short-Form Video Editor",
    metrics: "Short-Form • 00' 32\"",
    description:
      "Social-first pacing with crisp rhythm cuts, kinetic typography captions, and platform-tailored sound design.",
    aspectRatio: "16:9",
    thumbnailUrl: "/assets/poster-social.webp",
    videoUrl: "/assets/social-reel-1.mp4",
    tags: ["Short-Form", "Motion Graphics", "Captions", "After Effects"]
  },
  {
    id: "anuv-jain-visualizer",
    title: "ANUV JAIN VISUALIZER",
    subtitle: "Music Visualizer & Atmospheric Grading",
    category: "Commercial",
    client: "Music Visuals",
    year: "2024",
    duration: "02' 14\"",
    role: "Video Editor • Visual Packaging",
    metrics: "Music • 02' 14\"",
    description:
      "Mood-driven color grading, atmosphere building, and music-synced visual storytelling built for indie music distribution.",
    aspectRatio: "16:9",
    thumbnailUrl: "/assets/poster-anuv.webp",
    videoUrl: "/assets/anuv-jain-visualizer.mp4",
    tags: ["Music Video", "Color Grading", "Visual Storytelling"]
  },
  {
    id: "jassi-paaji-after-movie",
    title: "JASBIR JASSI / LIVE CUT",
    subtitle: "Artist & Concert Event Visuals",
    category: "Creators",
    client: "Zoomthing / Artist Content",
    year: "2023",
    duration: "03' 20\"",
    role: "Video Editor • Event Coverage",
    metrics: "Live Event • 03' 20\"",
    description:
      "Concert highlights and artist-focused promotional cut built around live stage performance energy and crowd atmosphere.",
    aspectRatio: "16:9",
    thumbnailUrl: "/assets/poster-jassi.webp",
    videoUrl: "/assets/jassi-after-movie.mp4",
    tags: ["Live Event", "Artist Promo", "Audio Mix", "Premiere Pro"]
  }
];

export const EDUCATION_LIST = [
  {
    id: "edu-msc",
    period: "01/2025 TO 06/2025",
    degree: "MSc User Experience Design",
    institution: "Edinburgh Napier University",
    location: "Edinburgh, United Kingdom",
    details: "Research-driven UX design, usability testing, information architecture, interaction design, and Figma prototyping."
  },
  {
    id: "edu-ba",
    period: "09/2021 TO 09/2024",
    degree: "BA Journalism & Mass Communication",
    institution: "VIPS TC / GGS Indraprastha University",
    location: "New Delhi, India",
    details: "CGPA: 7.32 · Studied mass media and communication; Production Team Member in Enactus Society."
  },
  {
    id: "edu-nios",
    period: "2020 TO 2021",
    degree: "Senior Secondary Education (Science Non-Medical)",
    institution: "National Institute of Open Schooling (NIOS)",
    location: "New Delhi, India",
    details: "Completed Higher Secondary qualification (61.4%)."
  }
];

export const EXTRACURRICULARS_AND_CERTS = {
  events: [
    { title: "Moto GP Bharat", role: "Bar Management · BookMyShow", year: "2023" },
    { title: "Zomaland", role: "Box Office Volunteer · Zomato Live", year: "2023" },
    { title: "MTV Hustle 3.0", role: "Artist Management · VIPS Event", year: "2023" },
    { title: "Vrajanand Mahotsav", role: "Event Management · VYO", year: "2023" },
    { title: "Enactus Society (Envision)", role: "Production Team Member · VIPS", year: "2021" },
    { title: "Heal the Globe Foundation", role: "Fundraising Outreach Coordinator", year: "2022" }
  ],
  certifications: [
    { title: "RJ Hunt, Spandan", year: "2021" },
    { title: "Jashn-E-Tasveer", year: "2022" },
    { title: "Donation Drive, Heal the Globe Foundation", year: "2022" },
    { title: "Production, Spandan", year: "2023" }
  ]
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "s1",
    num: "[001]",
    title: "UX & Interaction Design",
    description:
      "End-to-end UX design grounded in user research, clear information architecture, interactive Figma prototyping, and usability testing.",
    startingPrice: "Figma & Research",
    deliveryTime: "MSc UX Design",
    features: [
      "User Research",
      "Wireframing",
      "Figma Prototyping",
      "Usability Testing",
      "Information Architecture",
      "Interaction Design"
    ]
  },
  {
    id: "s2",
    num: "[002]",
    title: "Video Editing (Short & Long-Form)",
    description:
      "Full post-production workflow from raw footage assembly to final delivery for YouTube channels, brands, and educational series.",
    startingPrice: "Premiere Pro",
    deliveryTime: "4+ Years Experience",
    features: [
      "YouTube & Monetized Channels",
      "Short-Form Social Edits",
      "Educational Video Content",
      "Multi-Platform Formatting",
      "Pacing & Captioning",
      "Full Post-Production"
    ]
  },
  {
    id: "s3",
    num: "[003]",
    title: "Motion Graphics, Color & Sound",
    description:
      "Consistent visual brand polish with After Effects motion graphics, balanced color grading, and clear sound design across releases.",
    startingPrice: "After Effects",
    deliveryTime: "Post-Production",
    features: [
      "Motion Graphics",
      "Color Grading",
      "Sound Design",
      "Kinetic Captions",
      "Brand Visual Consistency",
      "Artist Visual Content"
    ]
  },
  {
    id: "s4",
    num: "[004]",
    title: "Graphic & Visual Design",
    description:
      "Supporting visual identity, digital layouts, and creative problem-solving across Adobe Photoshop and CorelDraw workflows.",
    startingPrice: "Visual Assets",
    deliveryTime: "Graphic Design",
    features: [
      "Adobe Photoshop",
      "CorelDraw",
      "Brand Storytelling",
      "Audience Engagement",
      "Visual Asset Preparation",
      "Creative Direction Support"
    ]
  }
];

export const TESTIMONIALS_LIST: TestimonialItem[] = [];

export const FAQ_LIST: FAQItem[] = [];

export const CAREER_TIMELINE: CareerTrack[] = [
  {
    id: "c1",
    period: "2020 TO 2024",
    title: "Video Editor & Content Creator",
    organization: "Sun n Sky Entertainment",
    location: "Florida, USA (Remote)",
    trackType: "Video",
    color: "#2B47FF",
    highlights: [
      "Edited short- and long-form video content for entertainment brands and social channels, owning the full post-production workflow from raw footage to final delivery.",
      "Produced motion graphics, color grading, and sound design in Adobe Premiere Pro and After Effects to maintain a consistent brand style across releases."
    ]
  },
  {
    id: "c2",
    period: "2024",
    title: "Video Editor",
    organization: "Gulmohar Digitech",
    location: "New Delhi / Remote",
    trackType: "Video",
    color: "#FF4D00",
    highlights: [
      "Edited marketing and social media videos, optimizing pacing, captions, and formatting for platform-specific engagement."
    ]
  },
  {
    id: "c3",
    period: "2024",
    title: "Content / Video Editor",
    organization: "International Schooling",
    location: "Remote",
    trackType: "Video",
    color: "#2B47FF",
    highlights: [
      "Created and edited educational video content, improving clarity and viewer retention for an online learning audience."
    ]
  },
  {
    id: "c4",
    period: "2023",
    title: "Video Editor",
    organization: "Hypd Sports",
    location: "India",
    trackType: "Live Events",
    color: "#FF4D00",
    highlights: [
      "Edited fast-paced sports highlight and promotional videos optimized for social media distribution."
    ]
  },
  {
    id: "c5",
    period: "2020 TO PRESENT",
    title: "Freelance Video Editor & Content Creator",
    organization: "YouTube Channels (Urban Pulse, Just Drama, Music & Gaming)",
    location: "Remote",
    trackType: "Video",
    color: "#0A0A0A",
    highlights: [
      "Edited entertaining videos for high-traffic YouTube channels such as Urban Pulse and Just Drama, growing watch time, subscribers, and analytics."
    ]
  },
  {
    id: "c6",
    period: "AUG 2022 TO NOV 2022",
    title: "Video Editor Intern",
    organization: "Zoomthing",
    location: "New Delhi, India",
    trackType: "Video",
    color: "#FFAE00",
    highlights: [
      "Edited short-form video content and supported the content team with post-production and asset preparation.",
      "Developed innovative visual content tailored for artists and influencers: Madhur Sharma, Jasbir Jassi, and Inder Chahal."
    ]
  }
];
