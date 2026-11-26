/* ==========================================================================
   English Content Module — Single Source of Truth (Resume + Brief Verified)
   ========================================================================== */

export const PROFILE = {
  name: "Alireza Mohammadzade Farshchi",
  shortName: "Alireza Farshchi",
  initials: "AF",
  title: "Product Designer",
  experienceYears: "5+",
  email: "farshchi78@gmail.com",
  phone: "+98 937 168 2373",
  resumeUrl: "https://drive.google.com/file/d/1l_vHvNvdeZDBxC2FAK6AmJw1lYfKdraR/view?usp=sharing",
  linkedin: "https://www.linkedin.com/in/alireza-mohammadzade-farshchi/",
  bento: "https://bento.me/alireza4064",
  dribbble: "https://dribbble.com/alireza4064",
  behance: "https://www.behance.net/alireza4064",
  domain: "alirezafarshchi.ir",
};

export const CONTENT_EN = {
  lang: "en",
  dir: "ltr",
  arrow: "→",
  backArrow: "←",
  skipToContent: "Skip to content",

  nav: {
    home: "Home",
    work: "Work",
    about: "About",
    contact: "Contact",
    resume: "Resume",
    cta: "Let's talk",
    menu: "Menu",
    close: "Close",
    switchLang: "فارسی",
  },

  hero: {
    eyebrow: "PRODUCT DESIGNER · SYSTEMS THINKER",
    headline: "Making complex products clearer, more connected, and easier to scale.",
    intro: [
      "I'm Alireza, a Product Designer with 5+ years of experience across B2B, B2C, fintech, gaming, AI, and digital services.",
      "I bring product thinking, research, and systems design together to turn complex problems into thoughtful, scalable experiences.",
    ],
    primaryCta: "Explore my work",
    secondaryCta: "More about me",
    sculptureAlt: "Abstract ceramic and frosted-glass sculpture with cobalt blue light refractions",
  },

  audience: {
    eyebrow: "TAILORED PERSPECTIVE",
    heading: "What brings you here?",
    supporting: "Different perspectives, different things to explore. Choose yours.",
    recommendedLabel: "Recommended starting points",
    items: [
      {
        id: "hiring-managers",
        title: "Hiring Managers",
        shortDesc: "See how I take ownership, navigate complexity, and contribute to product outcomes.",
        headline: "Ownership from ambiguous problem framing to measurable product outcomes.",
        summary:
          "Over 5+ years across GovTech, IT infrastructure, B2B commerce, fintech, and mobile products, I have operated as a hands-on designer who owns design systems, research, and cross-functional delivery.",
        points: [
          "Led a quarterly UX review of the redesigned IranServer homepage using GA4, Microsoft Clarity, and heatmaps — reporting +22% users and an 18.5 percentage-point reduction in bounce rate.",
          "Owned both product design and PRD/test-writing responsibilities at Farano, shortening the path from spec to testable flow with AI-assisted flow testing.",
          "Independently built Made In Iran's first design system from scratch across 4 surfaces (26 components) and mentored junior designers at Part Software Group.",
        ],
        links: [
          { label: "IranServer — Redesign & System Ownership", href: "/en/work/iranserver/" },
          { label: "Full Experience & Resume", href: "/en/about/" },
          { label: "Download PDF Resume", href: PROFILE.resumeUrl, external: true },
        ],
      },
      {
        id: "product-managers",
        title: "Product Managers",
        shortDesc: "Explore how I approach ambiguous problems, shape user flows, and collaborate across teams.",
        headline: "Turning conflicting requirements and funnel drop-offs into validated product flows.",
        summary:
          "I work upstream of screens — partnering in retrospectives, refining PRDs, running heuristic evaluations, and aligning business constraints with real user behavior.",
        points: [
          "At Farano, I surface and resolve conflicting stakeholder requirements through research and shape IA around privacy, security, and access control from day one.",
          "At IranServer, I ran Nielsen heuristic evaluations, competitive benchmarking, and GA4 purchase-funnel analysis across cart, checkout, and cloud-service flows.",
          "On Word+, I wore both Product Designer and Product Manager hats — interviewing 8 users to uncover a key conversion blocker in premium messaging and shaping the product roadmap.",
        ],
        links: [
          { label: "Farano — GovTech Flows & AI-Assisted PRDs", href: "/en/work/farano/" },
          { label: "Word+ — Product Design & PM Ownership", href: "/en/work/word-plus/" },
          { label: "Explore All Projects", href: "/en/work/" },
        ],
      },
      {
        id: "design-leaders",
        title: "Design Leaders",
        shortDesc: "Take a closer look at my work on design systems, design processes, and team collaboration.",
        headline: "Scalable design systems, practical token workflows, and healthier design operations.",
        summary:
          "I care deeply about how design teams scale quality across surfaces without slowing engineering down — from token architecture to mentoring and internal workshops.",
        points: [
          "Owned the IranServer design system end-to-end (components, tokens, styles) while factoring in real connectivity and infrastructure constraints.",
          "Built Made In Iran's first token-based design system (26 components across buyer, supplier, admin, and public web) aligned with Material Design and Tailwind conventions.",
          "Created a Figma plugin-based token workflow at Part Software Group prior to native token support, mentored 2 junior designers, and taught internal courses on Information Architecture and Design Systems.",
        ],
        links: [
          { label: "Made In Iran — 0-to-1 Design System", href: "/en/work/made-in-iran/" },
          { label: "IranServer — Ecosystem Design System", href: "/en/work/iranserver/" },
          { label: "Design Approach & Principles", href: "#approach" },
        ],
      },
      {
        id: "product-designers",
        title: "Product Designers",
        shortDesc: "Explore my approach to research, interaction design, visual craft, and building scalable experiences.",
        headline: "Systems thinking paired with usability rigor and AI-augmented exploration.",
        summary:
          "Whether auditing a 10-heuristic mobile flow, prototyping a UIKit component library, or simulating persona flows with AI before dev handoff, I love crafting coherent end-to-end systems.",
        points: [
          "Combine qualitative research (user interviews, usability testing, playtesting) with behavioral analytics (GA4, Clarity heatmaps) to ground design decisions.",
          "Use AI-assisted A/B flow testing, persona-based flow simulations, and test-case generation to catch edge cases early.",
          "Contributed across 20+ products at Part Software Group — from fintech (Signal, Merat) and OCR/AI tools (Avasho, Avanegar) to mobile games (Khiaar, Freedom Park).",
        ],
        links: [
          { label: "Browse All Projects", href: "/en/work/" },
          { label: "How I Approach Design", href: "#approach" },
          { label: "About My Journey", href: "/en/about/" },
        ],
      },
    ],
  },

  selectedWork: {
    eyebrow: "SELECTED WORK",
    heading: "A closer look at the problems I've worked on.",
    description:
      "From digital services to complex platforms, these projects reflect how I approach different product challenges through research, design, and systems thinking.",
    cardCta: "View project overview",
    closingCta: "Explore all projects",
    protectedBadge: "Full case study protected",
  },

  approach: {
    eyebrow: "DESIGN APPROACH",
    heading: "Good design starts with understanding the system behind the problem.",
    description:
      "I don't see design as a series of isolated screens. I look at the relationships between users, business goals, product logic, and the systems that bring everything together.",
    principles: [
      {
        num: "01",
        title: "Understand the context",
        description:
          "Explore user needs, business constraints, and the environment in which the product operates.",
      },
      {
        num: "02",
        title: "Make complexity visible",
        description:
          "Break down ambiguous problems, uncover dependencies, and create a shared understanding across teams.",
      },
      {
        num: "03",
        title: "Build with consistency",
        description:
          "Use clear patterns, thoughtful interactions, and scalable design systems to create cohesive experiences.",
      },
      {
        num: "04",
        title: "Collaborate to move forward",
        description:
          "Work closely with product and engineering to turn decisions into practical, implementable solutions.",
      },
      {
        num: "05",
        title: "Learn and evolve",
        description:
          "Use research, feedback, and product signals to improve what has been built.",
      },
    ],
  },

  experience: {
    eyebrow: "EXPERIENCE",
    heading: "Experience across products, teams, and industries.",
    description:
      "I've worked with teams of different sizes and across different domains, contributing to product experiences, design systems, and the processes behind them.",
    entries: [
      {
        company: "Farano",
        role: "Senior Product Designer",
        period: "Mar 2026 — Present",
        domain: "GovTech · Digital Government Services",
        location: "Remote",
        highlights: [
          "Surface and resolve ambiguous or conflicting stakeholder requirements through research on the Iran Digital Console.",
          "Shape flow design and information architecture around security, data-privacy, and access-control requirements from day one.",
          "Embed AI-assisted A/B flow testing, persona-based simulations, PRD refinement, and test-case writing into the product workflow.",
          "Own both product design and PRD/test-writing responsibilities to shorten the cycle from spec to testable flow.",
        ],
      },
      {
        company: "IranServer",
        role: "Senior Product Designer",
        period: "May 2025 — Mar 2026",
        domain: "Web Hosting · IT Infrastructure",
        location: "Mashhad, Iran",
        highlights: [
          "Owned design tooling, processes, and cross-functional collaboration in a 2-person product design team alongside the team lead.",
          "Owned the IranServer design system end-to-end (components, tokens, styles) while factoring in real connectivity constraints.",
          "Redesigned core user portal and website flows across hosting, domains, VPS, dedicated servers, and marketing landing pages.",
          "Led a quarterly UX review of the redesigned homepage (GA4, Microsoft Clarity, heatmaps): +22% users, -18.5pt bounce rate, and reduced dead clicks (-6.7pts).",
          "Conducted Nielsen heuristic evaluations and competitive benchmarking on cart, checkout, and cloud-service purchase flows.",
        ],
      },
      {
        company: "Made In Iran",
        role: "Product Designer",
        period: "Jan 2025 — Mar 2025",
        domain: "B2B · B2C · E-commerce",
        location: "Mashhad, Iran",
        highlights: [
          "Built the product's first design system from scratch for a B2B platform connecting Iranian manufacturers with international buyers.",
          "Independently designed 26 components across 4 surfaces (buyer, supplier, admin, public site) with Material Design & Tailwind token conventions.",
          "Unified inconsistent phase-by-phase UI into one visual language in direct collaboration with developers.",
        ],
      },
      {
        company: "Part Software Group",
        role: "Product Designer",
        period: "Dec 2021 — Jan 2025",
        domain: "Fintech · Gaming · EdTech · B2B",
        location: "Mashhad, Iran",
        highlights: [
          "Contributed to 20+ projects including Signal (5M+ users), Merat/Ara, Pulse, Avasho, Avanegar, iCup, Word+, and mobile games.",
          "Built a Figma plugin-based token workflow prior to native token support and a lightweight UIKit component library.",
          "Combined Product Designer and PM responsibilities for Word+, owning its Material 3 design system and user research.",
          "Mentored 2 junior designers and delivered internal courses on Information Architecture and Building Design Systems.",
        ],
      },
    ],
    additionalLabel: "Additional & Overlapping Freelance Engagements:",
    additionalNote:
      "Freelance and remote product design engagements across GovTech, legal services, accounting applications, and super apps — some undertaken alongside full-time employment (not consecutive full-time roles).",
    freelanceEntries: [
      {
        company: "Kanon Ghazaei (National Judicial Services Portal)",
        role: "Freelance Product Designer",
        period: "Sep 2025 — Dec 2025",
        domain: "GovTech · Legal Services",
        overlapNote: "Side freelance engagement alongside full-time Senior Product Designer role at IranServer.",
        summary:
          "Designed the public-facing portal including homepage, services directory, appointment booking flow, service center locator, and responsive mobile views.",
      },
      {
        company: "Accounting Applications (Hulo & Parmis)",
        role: "Freelance Product Designer",
        period: "Sep 2022 — Apr 2023",
        domain: "Accounting · B2B Software",
        overlapNote: "Freelance engagement alongside employment at Part Software Group.",
        summary: "Designed and prototyped accounting applications including Hulo and Parmis.",
      },
      {
        company: "Bejatoo",
        role: "UI/UX Designer (Remote · Australia)",
        period: "Mar 2022 — Jul 2022",
        domain: "Super App · Outsourcing Marketplace",
        overlapNote: "Remote engagement alongside employment at Part Software Group.",
        summary:
          "Led UX/UI design and user research for an outsourcing super app, guiding a non-design product owner toward a streamlined experience.",
      },
    ],
    cta: "View full resume",
  },

  about: {
    eyebrow: "ABOUT",
    heading: "Curious by nature. Structured by design.",
    paragraphs: [
      "I'm interested in understanding how things work — not just how they look.",
      "My journey in product design has taken me across different industries, product types, and team structures. Along the way, I've worked on user research, product flows, design systems, and cross-functional collaboration.",
      "I enjoy bringing structure to ambiguity, connecting details to the bigger picture, and helping teams move from ideas to well-considered solutions.",
      "Outside individual projects, I'm also interested in improving the way design work happens — from shared systems and documentation to AI-assisted workflows.",
    ],
    sculptureAlt: "Minimalist architectural sculpture of matte ceramic and cobalt-tinted frosted glass",
    moreCta: "Read full story & credentials",
  },

  contact: {
    eyebrow: "CONTACT",
    heading: "Have a complex problem worth solving?",
    body: "I'm always open to meaningful conversations, thoughtful collaborations, and opportunities to build better products together.",
    cta: "Let's talk",
    links: [
      { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
      { label: "LinkedIn", value: "alireza-mohammadzade-farshchi", href: PROFILE.linkedin, external: true },
      { label: "Resume (PDF)", value: "Google Drive", href: PROFILE.resumeUrl, external: true },
    ],
  },

  footer: {
    tagline: "Designed with curiosity, clarity, and a systems mindset.",
    copyright: `© ${new Date().getFullYear()} Alireza Mohammadzade Farshchi`,
  },

  workPage: {
    eyebrow: "SELECTED & ARCHIVE WORK",
    heading: "Products, systems, and research across complex domains.",
    description:
      "Public overviews highlight scope, problem framing, and publicly shareable outcomes. Detailed internal flows, research artifacts, and confidential materials are password protected.",
    allFilter: "All",
    categories: ["Product Design", "Fintech", "B2B", "Design Systems", "GovTech", "AI"],
    emptyState: "No projects match this filter yet.",
  },

  overviewPage: {
    backToWork: "Back to all work",
    industry: "Industry",
    role: "Role",
    timeline: "Timeline",
    scope: "Scope",
    problemTitle: "Problem Overview",
    contributionTitle: "My Contribution",
    outcomesTitle: "Publicly Shareable Outcomes",
    visualNoteTitle: "Visual Materials",
    visualNoteBody:
      "Abstract editorial artwork is used publicly to respect confidentiality agreements. Approved product screens and internal documentation are available inside the protected case study.",
    protectedTitle: "Need the full case study?",
    protectedDesc:
      "Detailed user research, internal flows, architecture decisions, and private screens are password protected to respect company confidentiality.",
    openCaseStudy: "Open protected case study",
    requestAccess: "Request access via email",
    liveLinksTitle: "Public Store / Product Links",
  },

  caseStudyPage: {
    backToOverview: "Back to project overview",
    eyebrow: "PROTECTED CASE STUDY",
    titlePrefix: "Confidential Case Study — ",
    subtitle:
      "This case study contains protected research, internal product flows, and confidential design decisions. Enter the project passphrase to decrypt the content locally.",
    inputPlaceholder: "Enter project passphrase",
    unlockBtn: "Unlock case study",
    requestBtn: "Request access via email",
    emptyError: "Please enter a passphrase.",
    notConfiguredInfo:
      "The encrypted payload for this case study has not been published yet. Please request a private walkthrough or access password via email.",
    wrongPasswordError:
      "Incorrect passphrase. The encrypted content could not be decrypted. Double-check the password or request access via email.",
    securityNote:
      "Privacy note: Protected case studies are encrypted with AES-256-GCM (PBKDF2-SHA256) so no confidential text is exposed in public page source, metadata, or unauthenticated responses.",
  },

  aboutPage: {
    eyebrow: "ABOUT ALIREZA",
    heading: "Product Designer with a systems mindset.",
    lead:
      "5+ years designing B2B, B2C, GovTech, fintech, gaming, and AI-enabled digital products — uniting research, systems architecture, and cross-functional collaboration.",
    experienceHeading: "Full Professional Timeline",
    freelanceHeading: "Additional & Overlapping Freelance Work",
    skillsHeading: "Capabilities & Tooling",
    educationHeading: "Education & Certifications",
    education: {
      school: "Ferdowsi University of Mashhad",
      degree: "B.S. in Computer Engineering",
      period: "2017 — 2023",
      location: "Mashhad, Iran",
    },
    certifications: [
      {
        org: "IBM",
        title: "Enterprise Design Thinking Co-Creator",
        url: "https://www.credly.com/badges/6268260e-be34-4ed5-9837-8f4d9416196f/linked_in_profile",
      },
      {
        org: "IBM",
        title: "Enterprise Design Thinking Practitioner",
        url: "https://www.credly.com/badges/24bd2f4c-a5dc-49be-9e0e-917d28b0322d/linked_in_profile",
      },
      {
        org: "Part Software Group",
        title: "you.I — UX/UI Design & Interface Training Program (1 of 17 selected from 300 applicants)",
      },
      {
        org: "Part Software Group College",
        title: "Certificate of Appreciation — UI/UX Instructor (Information Architecture & Design Systems, Oct 2023)",
        image: "/assets/certificate-part-college.jpg",
      },
    ],
    skillGroups: [
      {
        title: "AI-Augmented Workflow",
        items: [
          "AI-assisted A/B flow testing",
          "Persona-based flow simulation",
          "PRD & user-story refinement",
          "AI-assisted test-case writing",
        ],
      },
      {
        title: "Design & Research",
        items: [
          "UI Design",
          "UX Research",
          "Wireframing",
          "Prototyping",
          "Interaction Design",
          "Design Systems",
          "Usability Testing",
          "Persona Development",
          "Competitive Analysis",
          "Information Architecture",
        ],
      },
      {
        title: "Technical",
        items: [
          "Figma",
          "Adobe XD",
          "Design Tokens",
          "Material Design",
          "Tailwind conventions",
          "UIKit component libraries",
          "Rapid Prototyping",
        ],
      },
      {
        title: "Leadership",
        items: [
          "Team Leadership",
          "Mentoring",
          "Stakeholder Communication",
          "Cross-functional Collaboration",
          "Public Speaking",
          "Decision-Making",
        ],
      },
    ],
  },
};
