import type { ServiceGuideCopy } from "./i18n";

/** English serviceGuide blocks — single source for React + prerender. */
export const enServiceGuides: Record<
  "social" | "content" | "performance" | "web",
  ServiceGuideCopy
> = {
  social: {
    intro:
      "We run your business's social media from start to finish: strategy, content, publishing, replies and a monthly report. We're based in Athens and work with founders and businesses across Greece, so you keep a steady presence without having to chase it every day.",
    cta: "Book a short call",
    includesTitle: "What's included every month",
    includes: [
      "Strategy and a monthly posting plan",
      "8–20 posts/Reels a month plus stories, depending on the package (Essential: 8–12 posts and 8 basic stories · Standard: 12–16 posts/Reels · Premium: 16–20 posts/Reels)",
      "Captions, hashtags and scheduling",
      "Replies to comments and messages, as part of the community work in your package",
      "A monthly report on what worked and what we'll change next month",
    ],
    audienceTitle: "Who it's for",
    audienceBody:
      "For founders who don't have time to run their own social media, for local businesses in Athens that want to be found and trusted, and for B2B companies that want a serious, consistent presence.",
    platformsTitle: "Which platform fits you",
    platforms: [
      {
        name: "Instagram: ",
        detail: "for local businesses, hospitality, retail and visual brands.",
      },
      {
        name: "TikTok: ",
        detail:
          "for brands that can show their product or behind the scenes in short videos.",
      },
      {
        name: "Facebook: ",
        detail: "for older audiences and local communities.",
      },
      {
        name: "LinkedIn: ",
        detail: "for B2B and for founders building their personal profile.",
      },
    ],
    processTitle: "How we get started",
    process: [
      {
        title: "Intro: ",
        body: "a call about your business, your customers and your goals.",
      },
      {
        title: "Strategy: ",
        body: "which platforms, what content and in what tone.",
      },
      {
        title: "Plan: ",
        body: "your first monthly plan, for your approval.",
      },
      {
        title: "Publishing: ",
        body: "we start posting based on the approved plan.",
      },
    ],
    costTitle: "Pricing",
    costBody:
      "Social media management starts at €450 a month. The final price depends on the package, the number of platforms and the volume of content.",
    costLinkLabel: "See all packages →",
    costLinkHref: "/pricing/",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Is there a minimum commitment?",
        a: "Yes — a 3-month minimum on retainers.",
      },
      {
        q: "Who makes the photos and videos?",
        a: "We create and publish the content for your management package. Creative can be included in the package or billed per asset. For a dedicated photo or video shoot, there's our ",
        aLink: { label: "Content Creation", href: "/content/" },
      },
      {
        q: "How soon will I see results?",
        a: "In the first month we set up a steady presence. It usually takes a few months of consistent work to get a clear picture.",
      },
      {
        q: "Do you only work with businesses in Athens?",
        a: "No. We're based in Athens and work with businesses across Greece. Calls happen online.",
      },
      {
        q: "Do you also run social media ads?",
        a: "Yes. Ad management starts at €300 a month, and the business pays the ad budget directly to the platforms. See ",
        aLink: { label: "Performance Marketing", href: "/performance/" },
      },
    ],
    relatedTitle: "Related services",
    related: [
      {
        label: "Content Creation",
        href: "/content/",
        blurb: "Photo, video and Reels from concept to post.",
      },
      {
        label: "Performance Marketing",
        href: "/performance/",
        blurb: "Meta Ads and Google Ads with clear cost and results.",
      },
      {
        label: "Web Development",
        href: "/web/",
        blurb: "Fast websites and landing pages with SEO.",
      },
    ],
    finalTitle: "Want to see what your social media needs?",
  },
  content: {
    intro:
      "We create photos, videos and Reels that are ready to post, run as ads or use on your website. We start from the idea, shoot at your location and deliver files in the right format for every channel. We're based in Athens and shoot wherever your product or space needs us, across Greece.",
    cta: "Book a short call",
    blocksTitle: "What we do",
    blocks: [
      {
        title: "Concept and script",
        body: "Before the camera rolls, we prepare ideas, scripts and a shot list. That keeps shoot day fast and the footage consistent.",
      },
      {
        title: "Photo and video",
        body: "We shoot product, people and place at your location for Instagram, TikTok, ads and your website, so one shoot day feeds every channel.",
      },
      {
        title: "Editing",
        body: "Reels, stories, posts, ads and website videos, cut to the right length and format for every placement.",
      },
      {
        title: "Ready-to-use files",
        body: "Photos, carousels, motion graphics, titles and thumbnails, organised so you can find and use them.",
      },
    ],
    audienceTitle: "Who it's for",
    audienceBody:
      "For businesses that want social media without stock photos, for brands running ads that constantly need fresh material, and for anyone building a website who wants real photos of their space, team and products.",
    processTitle: "How we work",
    process: [
      {
        title: "Intro: ",
        body: "what you want to show, where it will be posted and who it's for.",
      },
      { body: "Ideas and a shot list for your approval." },
      { body: "The shoot, at your location." },
      { body: "Editing and post-production." },
      { body: "Delivery of ready-to-use files for every channel." },
    ],
    costTitle: "Pricing",
    costBody:
      "A shoot day costs €200 and content packages start at €350. The final price depends on the number of shoot days, the number of final videos and photos, and how much editing is needed.",
    costLinkLabel: "See all packages →",
    costLinkHref: "/pricing/",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How much does a shoot cost?",
        a: "A shoot day costs €200 and packages start at €350, depending on how much content you need.",
      },
      {
        q: "Who owns the photos and videos?",
        a: "You do. After delivery and payment, you can use them on social media, in ads and on your website.",
      },
      {
        q: "Do you shoot outside Athens?",
        a: "Yes. We're based in Athens and shoot wherever your product or space needs us, across Greece.",
      },
      {
        q: "How much content comes out of one shoot?",
        a: "It depends on the goal. We plan it in advance with a shot list, so one day gives you material for posts, Reels and ads.",
      },
      {
        q: "Can content be part of my monthly social media management?",
        a: "Yes. It can be included in your management package or billed separately per shoot. See ",
        aLink: { label: "Social Media Management", href: "/social/" },
      },
    ],
    relatedTitle: "Related services",
    related: [
      {
        label: "Social Media Management",
        href: "/social/",
        blurb: "Strategy, content, community and monthly reporting.",
      },
      {
        label: "Performance Marketing",
        href: "/performance/",
        blurb: "Meta Ads and Google Ads with clear cost and results.",
      },
      {
        label: "Web Development",
        href: "/web/",
        blurb: "Fast websites and landing pages with SEO.",
      },
    ],
    finalTitle: "Want to see what content your brand needs?",
  },
  performance: {
    intro:
      "We set up and run ads on Google, Facebook and Instagram that bring in leads and sales, not just clicks. We test, keep what works and show you clearly what you got for your money. We're based in Athens and work with businesses across Greece.",
    cta: "Book a short call",
    blocksTitle: "What we do",
    blocks: [
      {
        title: "Meta Ads and Google Ads",
        body: "Campaigns for visits, leads and sales on Facebook, Instagram and Google. We set up accounts, audiences, keywords and budgets properly, so we only scale what works.",
      },
      {
        title: "Ad testing",
        body: "We keep testing different images, videos, copy and offers. We keep what brings results and stop the rest.",
      },
      {
        title: "From click to customer",
        body: "Landing page, form, thank-you page and proper tracking (pixel, GA4, Google Ads tags), so interest turns into customers and we know where they came from.",
      },
      {
        title: "Clear reports",
        body: "How much was spent, how many leads or sales came in and what each one cost, in plain language. Every week we decide what to keep, what to cut and what to scale.",
      },
    ],
    audienceTitle: "Who it's for",
    audienceBody:
      "For local businesses that want phone calls and bookings, for online shops that want sales, and for founders who want to test a new service or offer quickly before investing more.",
    platformsTitle: "Google or Meta?",
    platforms: [
      {
        name: "Google Ads: ",
        detail: "when people are already searching for what you sell.",
      },
      {
        name: "Meta Ads (Facebook, Instagram): ",
        detail: "when you want to reach people who aren't looking for you yet.",
      },
      {
        name: "",
        detail: "Often the two work best together.",
      },
    ],
    processTitle: "How we work",
    process: [
      { title: "Intro: ", body: "goal, customers, budget." },
      { title: "Setup: ", body: "accounts, tracking and first campaigns." },
      { body: "Testing in the first weeks." },
      { body: "We keep what works and move the budget there." },
      { body: "Weekly report and decisions." },
    ],
    costTitle: "Pricing",
    costBody:
      "Setup costs €200 one-off and management starts at €300 a month. You pay the ad budget directly to Google or Meta, separately from our fee.",
    costLinkLabel: "See all packages →",
    costLinkHref: "/pricing/",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How much should I spend on ads?",
        a: "We agree the budget together, based on your goal and your market. We start with an amount that's enough for testing and only increase it once it's clear what works.",
      },
      {
        q: "Is there a minimum commitment?",
        a: "Yes, 3 months. Ads need time to learn and we need time to test, so a clear picture can emerge.",
      },
      {
        q: "How soon will I see results?",
        a: "The first data shows up in the first weeks. A stable picture usually takes a few weeks of testing.",
      },
      {
        q: "Who owns the ad account?",
        a: "You do. The accounts and data stay in your name, and we work with access.",
      },
      {
        q: "Do you also make the images and videos for the ads?",
        a: "Yes, through our ",
        aLink: {
          label: "Content Creation",
          href: "/content/",
          after: " service. We can also work with material you already have.",
        },
      },
    ],
    relatedTitle: "Related services",
    related: [
      {
        label: "Social Media Management",
        href: "/social/",
        blurb: "Strategy, content, community and monthly reporting.",
      },
      {
        label: "Content Creation",
        href: "/content/",
        blurb: "Photo, video and Reels from concept to post.",
      },
      {
        label: "Web Development",
        href: "/web/",
        blurb: "Fast websites and landing pages with SEO.",
      },
    ],
    finalTitle: "Want to see if ads are right for your business?",
  },
  web: {
    intro:
      "We build websites that load fast, look right on mobile and are set up from day one to be found on Google. We're based in Athens and work with founders and businesses across Greece.",
    cta: "Book a short call",
    blocksTitle: "What we build",
    blocks: [
      {
        title: "Business websites",
        body: "We design business websites that load fast, work properly on mobile and desktop, and lead visitors to get in touch, request a quote or buy. A clear page structure and copy that both people and Google understand.",
      },
      {
        title: "Landing pages",
        body: "One page for one offer or campaign, for Google Ads, Meta ads or email. Fast loading and tracking (GA4, pixels), so you can see which campaign brings results.",
      },
      {
        title: "SEO from the ground up",
        body: "Site structure, titles and descriptions, headings, internal links, speed, schema markup and Google Search Console setup. Local SEO when you serve a specific area.",
      },
      {
        title: "Care after launch",
        body: "Content updates, speed improvements, SEO fixes, security and small changes as your business grows.",
      },
    ],
    audienceTitle: "Who it's for",
    audienceBody:
      "For founders who are just starting and need a site that convinces from day one, for local businesses in Athens that want to be found on Google, and for companies whose site has fallen behind and no longer brings in enquiries.",
    processTitle: "How we work",
    process: [
      {
        title: "Intro: ",
        body: "a call about your business, your customers and what the site needs to do.",
      },
      {
        title: "Structure and copy: ",
        body: "which pages you need and what each one says.",
      },
      {
        title: "Design: ",
        body: "you see how it will look before we build it.",
      },
      { body: "Build and testing on every device." },
      { body: "Launch and connection to Google." },
    ],
    costTitle: "Pricing",
    costBody:
      "A landing page costs €700–1,200 and a multi-page site about €700 per page. For an online shop, we price it once we've seen what you need.",
    costLinkLabel: "See all packages →",
    costLinkHref: "/pricing/",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How long does it take to build the site?",
        a: "A landing page is usually ready within a few weeks, while a business website with more pages takes a little longer. We agree the exact timeline at the start, based on the number of pages and how quickly we get the copy and photos.",
      },
      {
        q: "Will the site show up on Google?",
        a: "We set it up properly for Google from the start and connect it to Search Console. Rankings build over time, and no one can guarantee the top spot.",
      },
      {
        q: "Will I be able to change text and photos myself?",
        a: "If you want to make changes yourself, we set it up that way from the start. Otherwise, we handle changes as part of our care after launch.",
      },
      {
        q: "Who writes the copy?",
        a: "We write it together. You give us the information about your business and we shape it so it's clear for visitors and right for Google. If you also need photos or videos, there's our ",
        aLink: { label: "Content Creation", href: "/content/" },
      },
      {
        q: "Do you only work with businesses in Athens?",
        a: "No. We're based in Athens and work with businesses across Greece. Calls happen online.",
      },
    ],
    readMoreTitle: "Read more",
    readMore: {
      label:
        "Website creation in Athens: what it includes, where SEO fits and what drives the price",
      href: "/articles/dimiourgia-istoselidas-athina/",
    },
    relatedTitle: "Related services",
    related: [
      {
        label: "Social Media Management",
        href: "/social/",
        blurb: "Strategy, content, community and monthly reporting.",
      },
      {
        label: "Content Creation",
        href: "/content/",
        blurb: "Photo, video and Reels from concept to post.",
      },
      {
        label: "Performance Marketing",
        href: "/performance/",
        blurb: "Meta Ads and Google Ads with clear cost and results.",
      },
    ],
    finalTitle: "Want to see what kind of website your business needs?",
  },
};
