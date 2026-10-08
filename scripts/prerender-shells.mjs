import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const origin = "https://omnidot.gr";
const phone = "+306970862839";

const navEn = [
  { href: "/social/", label: "Social Media Management" },
  { href: "/content/", label: "Content Creation" },
  { href: "/performance/", label: "Performance Marketing" },
  { href: "/web/", label: "Web Development" },
  { href: "/pricing/", label: "Packages & pricing" },
  { href: "/articles/", label: "Articles" },
  { href: "/about/", label: "About / Contact" },
  { href: "/privacy/", label: "Privacy" },
];

const navEl = [
  { href: "/el/social/", label: "Διαχείριση Social Media" },
  { href: "/el/content/", label: "Δημιουργία Περιεχομένου" },
  { href: "/el/performance/", label: "Performance Marketing" },
  { href: "/el/web/", label: "Ανάπτυξη Ιστοσελίδων" },
  { href: "/el/pricing/", label: "Πακέτα & τιμές" },
  { href: "/el/articles/", label: "Άρθρα" },
  { href: "/el/about/", label: "Σχετικά / Επικοινωνία" },
  { href: "/el/privacy/", label: "Απόρρητο" },
];

function withTrailingSlash(path) {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

/** Keep in sync with src/i18n.ts — build-time crawlable shells. */
const routeDefs = [
  {
    id: "home",
    enPath: "/",
    elPath: "/el/",
    enFile: "index.html",
    elFile: "el/index.html",
    image: `${origin}/images/work-omnidot.jpg`,
    en: {
      title: "omnidot. — Marketing Agency Athens | Social, Ads & Web",
      description:
        "Athens marketing agency for social media management, content creation, Meta & Google Ads, and SEO websites. Clear packages, remote-friendly, measurable growth.",
      h1: "omnidot.",
      body: "Athens marketing agency for web, SEO, social media and performance ads — one partner for brands that want to grow. Founders and local brands, Athens and remote.",
      story: "",
    },
    el: {
      title: "omnidot. — Διαφημιστική στην Αθήνα | Social, Ads & Web",
      description:
        "Διαφημιστική στην Αθήνα για διαχείριση social media, παραγωγή περιεχομένου, Meta & Google Ads και ιστοσελίδες με SEO. Καθαρά πακέτα, remote, μετρήσιμη ανάπτυξη.",
      h1: "omnidot.",
      body: "Διαφημιστική στην Αθήνα για web, SEO, social media και performance ads — ένας συνεργάτης για brands που θέλουν να αναπτυχθούν. Αθήνα και remote.",
      story: "",
    },
    type: "org",
  },
  {
    id: "social",
    enPath: "/social/",
    elPath: "/el/social/",
    enFile: "social/index.html",
    elFile: "el/social/index.html",
    image: `${origin}/images/social.jpg`,
    en: {
      title: "Social Media Management — Instagram & TikTok | omnidot.",
      description:
        "Social media management for Instagram, TikTok, Facebook & LinkedIn: strategy, Reels, community and growth. Athens & remote. From €450/mo.",
      h1: "Social Media Management",
      body: "Instagram, TikTok, Facebook and LinkedIn management — strategy, publishing, growth and monthly reporting from omnidot. Athens & remote.",
      story:
        "Europatch sells cold asphalt to B2B buyers — a category that rarely goes viral. We built a steady organic presence around real product use and how-to content. In one year: 4.5M Facebook and 2.5M Instagram views, 100% organic.",
      points: [
        {
          name: "Strategy",
          detail: "Positioning, pillars, calendar",
          body: "Social media strategy for Instagram, TikTok, Facebook and LinkedIn: brand voice, content pillars, posting calendar and community rules. We plan what to say, where it lives, and how often — so your social media management is consistent, not random posts.",
        },
        {
          name: "Publishing",
          detail: "Feed, stories, community",
          body: "We create and publish feed posts, Reels, Stories and carousels, and we reply in comments and DMs. Copy, visuals and timing stay on-brand so the account feels active and trustworthy to followers and new visitors from search or ads.",
        },
        {
          name: "Growth",
          detail: "Reels, UGC, collaborations",
          body: "Growth through short-form video, Reels, user-generated content and creator collaborations. We test formats that expand reach on Instagram and TikTok and bring in people who already care about your category — organic first, ads when it makes sense.",
        },
        {
          name: "Reporting",
          detail: "Monthly clarity, not vanity",
          body: "Monthly social media reporting with reach, engagement, saves, profile visits and what to change next. Plain language for founders and marketing leads — useful metrics, clear next steps, no vanity dashboards.",
        },
      ],
    },
    el: {
      title: "Διαχείριση Social Media στην Αθήνα | omnidot.",
      description:
        "Διαχείριση Instagram, TikTok, Facebook και LinkedIn για επιχειρήσεις σε όλη την Ελλάδα. Στρατηγική, περιεχόμενο, community και μηνιαίο reporting. Από €450/μήνα.",
      h1: "Διαχείριση Social Media για επιχειρήσεις",
      body: "Αναλαμβάνουμε τα social της επιχείρησής σου από την αρχή ως το τέλος: στρατηγική, περιεχόμενο, δημοσίευση, απαντήσεις και μηνιαία αναφορά. Είμαστε στην Αθήνα και συνεργαζόμαστε με founders και επιχειρήσεις σε όλη την Ελλάδα, ώστε να έχεις σταθερή παρουσία χωρίς να το κυνηγάς εσύ κάθε μέρα.",
      story:
        "Η Europatch πουλάει ψυχρή άσφαλτο σε B2B πελάτες — κατηγορία που σπάνια γίνεται viral online. Χτίσαμε σταθερή οργανική παρουσία γύρω από πραγματική χρήση προϊόντος και how-to περιεχόμενο. Σε έναν χρόνο: 4.5 εκ. views στο Facebook και 2.5 εκ. στο Instagram, 100% organic.",
      points: [
        {
          name: "Στρατηγική",
          detail: "Θέση, πυλώνες, ημερολόγιο",
          body: "Στρατηγική social media για Instagram, TikTok, Facebook και LinkedIn: φωνή brand, πυλώνες περιεχομένου, ημερολόγιο δημοσιεύσεων και κανόνες κοινότητας. Ορίζουμε τι λέμε, πού ανεβαίνει και πόσο συχνά — ώστε η διαχείριση social media να είναι σταθερή, όχι τυχαία posts.",
        },
        {
          name: "Δημοσίευση",
          detail: "Feed, stories, κοινότητα",
          body: "Δημιουργούμε και ανεβάζουμε feed posts, Reels, Stories και carousels, και απαντάμε σε σχόλια και DMs. Κείμενα, εικόνες και timing μένουν on-brand ώστε ο λογαριασμός να φαίνεται ζωντανός σε followers και σε νέους επισκέπτες από αναζήτηση ή διαφημίσεις.",
        },
        {
          name: "Ανάπτυξη",
          detail: "Reels, UGC, συνεργασίες",
          body: "Ανάπτυξη μέσω short video, Reels, user-generated content και συνεργασιών με creators. Δοκιμάζουμε φόρμες που ανοίγουν reach σε Instagram και TikTok και φέρνουν κόσμο που ήδη νοιάζεται για την κατηγορία — πρώτα organic, ads όταν έχει νόημα.",
        },
        {
          name: "Reporting",
          detail: "Μηνιαία καθαρότητα, όχι vanity",
          body: "Μηνιαίο social media reporting με reach, engagement, αποθηκεύσεις, επισκέψεις προφίλ και τι αλλάζουμε μετά. Απλή γλώσσα για founders και marketing — χρήσιμα metrics, καθαρά επόμενα βήματα, χωρίς vanity dashboards.",
        },
      ],
      guide: {
        includesTitle: "Τι περιλαμβάνει κάθε μήνα",
        includes: [
          "Στρατηγική και μηνιαίο πρόγραμμα δημοσιεύσεων",
          "8–20 posts/Reels τον μήνα και stories, ανάλογα με το πακέτο (Essential: 8–12 posts και 8 basic stories · Standard: 12–16 posts/reels · Premium: 16–20 posts/reels)",
          "Κείμενα, hashtags και προγραμματισμός δημοσιεύσεων",
          "Απαντήσεις σε σχόλια και μηνύματα ως μέρος του community στο πακέτο",
          "Μηνιαία αναφορά με το τι δούλεψε και τι αλλάζουμε τον επόμενο μήνα",
        ],
        audienceTitle: "Για ποιον είναι",
        audienceBody:
          "Για founders που δεν έχουν χρόνο να τρέχουν τα social τους, για τοπικές επιχειρήσεις στην Αθήνα που θέλουν να τις βρίσκουν και να τις εμπιστεύονται, και για B2B εταιρείες που θέλουν σοβαρή, σταθερή παρουσία.",
        platformsTitle: "Ποια πλατφόρμα σου ταιριάζει",
        platforms: [
          "Instagram: για τοπικές επιχειρήσεις, εστίαση, λιανική και brands με εικόνα.",
          "TikTok: για brands που μπορούν να δείξουν προϊόν ή παρασκήνιο σε σύντομο βίντεο.",
          "Facebook: για κοινό μεγαλύτερης ηλικίας και τοπικές κοινότητες.",
          "LinkedIn: για B2B και για founders που χτίζουν το προσωπικό τους προφίλ.",
        ],
        processTitle: "Πώς ξεκινάμε",
        process: [
          "Γνωριμία: ένα call για την επιχείρηση, τους πελάτες και τους στόχους σου.",
          "Στρατηγική: ποιες πλατφόρμες, τι περιεχόμενο και με ποιο ύφος.",
          "Πρόγραμμα: το πρώτο μηνιαίο πλάνο για έγκριση.",
          "Δημοσιεύσεις: ξεκινάμε να ανεβάζουμε με βάση το εγκεκριμένο πλάνο.",
        ],
        costTitle: "Πόσο κοστίζει",
        costBody:
          "Η διαχείριση social media ξεκινά από €450 τον μήνα. Η τελική τιμή εξαρτάται από το πακέτο, τον αριθμό πλατφορμών και τον όγκο περιεχομένου.",
        costLinkLabel: "Δες όλα τα πακέτα →",
        costLinkHref: "/el/pricing/",
        faqTitle: "Συχνές ερωτήσεις",
        faq: [
          {
            q: "Υπάρχει ελάχιστη διάρκεια συνεργασίας;",
            a: "Ναι — minimum 3 μήνες στα retainers.",
          },
          {
            q: "Ποιος φτιάχνει τις φωτογραφίες και τα βίντεο;",
            a: "Εμείς δημιουργούμε και ανεβάζουμε το περιεχόμενο της διαχείρισης. Το creative μπορεί να μπει στο πακέτο ή να χρεωθεί ανά asset· για ξεχωριστή φωτογράφιση ή βίντεο υπάρχει η υπηρεσία Δημιουργία Περιεχομένου.",
          },
          {
            q: "Σε πόσο καιρό φαίνονται αποτελέσματα;",
            a: "Τον πρώτο μήνα στήνουμε σταθερή παρουσία. Συνήθως χρειάζονται μερικοί μήνες συνεπούς δουλειάς για να φανεί καθαρή εικόνα.",
          },
          {
            q: "Δουλεύετε μόνο με επιχειρήσεις στην Αθήνα;",
            a: "Όχι. Συνεργαζόμαστε με επιχειρήσεις σε όλη την Ελλάδα και τα calls γίνονται online.",
          },
          {
            q: "Κάνετε και διαφημίσεις στα social;",
            a: "Ναι. Η διαχείριση διαφημίσεων ξεκινά από €300 τον μήνα και τα χρήματα των διαφημίσεων τα πληρώνει απευθείας η επιχείρηση. Δες τη σελίδα Performance.",
          },
        ],
        relatedTitle: "Σχετικές υπηρεσίες",
        related: [
          {
            label: "Δημιουργία Περιεχομένου",
            href: "/el/content/",
            blurb: "Φωτογραφία, video και Reels από concept έως ανάρτηση.",
          },
          {
            label: "Performance Marketing",
            href: "/el/performance/",
            blurb: "Meta Ads και Google Ads με καθαρό κόστος και απόδοση.",
          },
          {
            label: "Ανάπτυξη Ιστοσελίδων",
            href: "/el/web/",
            blurb: "Γρήγορα sites και landing pages με SEO.",
          },
        ],
        finalTitle: "Θες να δούμε τι χρειάζονται τα social σου;",
        cta: "Κλείσε ένα σύντομο call",
      },
    },
    type: "service",
    serviceName: {
      en: "Social Media Management",
      el: "Διαχείριση Social Media για επιχειρήσεις",
    },
  },
  {
    id: "content",
    enPath: "/content/",
    elPath: "/el/content/",
    enFile: "content/index.html",
    elFile: "el/content/index.html",
    image: `${origin}/images/content.jpg`,
    en: {
      title: "Content Creation — Photo, Video & Reels | omnidot.",
      description:
        "Content creation for Instagram Reels, ads and web: photo, video and edit from concept to ready-to-post. Shoot day €200. Packs from €350. Athens.",
      h1: "Content Creation",
      body: "Photo, video and Reels content creation — concept, capture, edit and assets ready to post for social, ads and web.",
      story:
        "Same Europatch partnership from the content side: how-to reels on the road, product in use, cuts built for feed and Reels. That library powered the organic reach — including one reel to 397.9K.",
      points: [
        {
          name: "Concept",
          detail: "Ideas, scripts, shot lists",
          body: "Content creation starts with concept: creative ideas, scripts, shot lists and brand guidelines before the camera rolls. That keeps photo and video production fast and consistent for social media, ads and the website.",
        },
        {
          name: "Capture",
          detail: "Photo, video, on-site",
          body: "On-location photography and videography — product, people, space. We shoot for Instagram, TikTok, Facebook ads, Google campaigns and your site so one production day feeds every channel.",
        },
        {
          name: "Edit",
          detail: "Cuts for feed, ads, web",
          body: "Editing and post-production for each format: Reels, Stories, feed posts, YouTube cuts, paid ads and web hero videos. Same brand world, right length and aspect ratio for every placement.",
        },
        {
          name: "Assets",
          detail: "Stills, carousels, motion",
          body: "A usable content library: stills, carousels, motion graphics, titles and thumbnails ready to post or run as ads — organized files you can actually use.",
        },
      ],
    },
    el: {
      title: "Παραγωγή Περιεχομένου — Reels, Video & Φωτο | omnidot.",
      description:
        "Παραγωγή περιεχομένου για Instagram Reels, ads και web: φωτογραφία, video και μοντάζ από concept έως ανάρτηση. Γύρισμα €200. Πακέτα από €350. Αθήνα.",
      h1: "Δημιουργία Περιεχομένου",
      body: "Παραγωγή περιεχομένου — φωτογραφία, video και Reels από concept έως assets έτοιμα για ανάρτηση σε social, ads και web.",
      story:
        "Η ίδια συνεργασία Europatch από την πλευρά του content: how-to reels στον δρόμο, προϊόν σε χρήση, cuts για feed και Reels. Αυτή η βιβλιοθήκη στήριξε την οργανική εμβέλεια — με ένα reel στα 397.9K.",
      points: [
        {
          name: "Concept",
          detail: "Ιδέες, σενάρια, shot lists",
          body: "Η δημιουργία περιεχομένου ξεκινά από το concept: ιδέες, σενάρια, shot lists και brand guidelines πριν γυρίσει κάμερα. Έτσι η παραγωγή φωτογραφίας και video μένει γρήγορη και σταθερή για social media, διαφημίσεις και την ιστοσελίδα.",
        },
        {
          name: "Λήψη",
          detail: "Φωτογραφία, video, on-site",
          body: "Φωτογράφιση και βιντεοσκόπηση on-location — προϊόν, άνθρωποι, χώρος. Γυρίζουμε για Instagram, TikTok, Facebook ads, Google καμπάνιες και το site σας, ώστε μία μέρα παραγωγής να τροφοδοτεί όλα τα κανάλια.",
        },
        {
          name: "Μοντάζ",
          detail: "Cuts για feed, ads, web",
          body: "Μοντάζ και post-production για κάθε μορφή: Reels, Stories, feed posts, YouTube, paid ads και hero videos για το web. Ίδιος κόσμος brand, σωστό μήκος και αναλογία για κάθε placement.",
        },
        {
          name: "Assets",
          detail: "Stills, carousels, motion",
          body: "Χρήσιμη βιβλιοθήκη περιεχομένου: stills, carousels, motion graphics, τίτλοι και thumbnails έτοιμα για ανάρτηση ή διαφήμιση — τακτοποιημένα αρχεία που χρησιμοποιούνται πραγματικά.",
        },
      ],
    },
    type: "service",
    serviceName: { en: "Content Creation", el: "Δημιουργία Περιεχομένου" },
  },
  {
    id: "performance",
    enPath: "/performance/",
    elPath: "/el/performance/",
    enFile: "performance/index.html",
    elFile: "el/performance/index.html",
    image: `${origin}/images/performance.jpg`,
    en: {
      title: "Meta & Google Ads Management — omnidot. Athens",
      description:
        "Performance marketing with Meta Ads and Google Ads. Setup €200 once, management from €300/mo. Your ad spend stays yours. Conversion-focused for Greek brands.",
      h1: "Performance Marketing",
      body: "Meta Ads and Google Ads management with clear cost, return and next moves. Setup once, then monthly optimization.",
      story:
        "Pyrgiotis OE needed paid acquisition a founder could read without a deck. We ran Meta and Google with tight creative tests and a clean landing path. In 30 days on Meta: 1,791 landing-page views at €0.08 each on €148 spend — plus Google search at 3.23% CTR.",
      points: [
        {
          name: "Meta & Google",
          detail: "Acquisition that compounds",
          body: "Performance marketing on Meta Ads (Facebook & Instagram) and Google Ads: campaigns for traffic, leads and sales. Account structure, audiences, keywords and budgets built so you can grow when something clearly works — paid social and search together.",
        },
        {
          name: "Creative testing",
          detail: "Iterate what converts",
          body: "Ongoing A/B tests on hooks, creatives, copy and offers. We keep ads that convert, pause the rest, and refresh weekly so CPA and ROAS improve from data — not from one big launch.",
        },
        {
          name: "Funnel setup",
          detail: "Landing → lead → sale",
          body: "Ads need a clean path after the click: landing page, form, thank-you flow and conversion tracking (pixels, GA4, Google Ads tags). We align creative, landing and CRM follow-up so interest becomes a customer.",
        },
        {
          name: "Analytics",
          detail: "ROAS, CPA, clear next steps",
          body: "Clear reporting on spend, CPA, ROAS, CTR and conversions — in language a founder can use. Each week: what to keep, kill or scale. If a metric does not change a decision, we do not parade it.",
        },
      ],
    },
    el: {
      title: "Google Ads & Meta Ads — Διαχείριση | omnidot. Αθήνα",
      description:
        "Διαχείριση Google Ads και Meta Ads. Setup €200 μία φορά, management από €300/μήνα. Το ad spend μένει δικό σας. Διαφημίσεις με στόχο conversions.",
      h1: "Performance Marketing",
      body: "Διαχείριση Meta Ads και Google Ads με καθαρό κόστος, απόδοση και επόμενα βήματα. Setup μία φορά, μετά μηνιαία βελτιστοποίηση.",
      story:
        "Ο Πυργιώτης ΟΕ ήθελε paid acquisition που να διαβάζει ένας founder χωρίς 40σέλιδο deck. Τρέξαμε Meta και Google με σφιχτά creative tests και καθαρό landing path. Σε 30 ημέρες στο Meta: 1.791 landing-page views στα €0,08 το καθένα με €148 spend — και Google search με 3,23% CTR.",
      points: [
        {
          name: "Meta & Google",
          detail: "Acquisition που συσσωρεύεται",
          body: "Performance marketing σε Meta Ads (Facebook & Instagram) και Google Ads: καμπάνιες για traffic, leads και πωλήσεις. Δομή λογαριασμών, κοινά, λέξεις-κλειδιά και budgets ώστε να μεγαλώνετε όταν κάτι δουλεύει ξεκάθαρα — paid social και search μαζί.",
        },
        {
          name: "Creative testing",
          detail: "Επαναλαμβάνουμε ό,τι πουλάει",
          body: "Συνεχή A/B tests σε hooks, creatives, κείμενα και προσφορές. Κρατάμε ό,τι μετατρέπει, σταματάμε τα υπόλοιπα και ανανεώνουμε κάθε εβδομάδα ώστε CPA και ROAS να βελτιώνονται από δεδομένα — όχι από ένα μεγάλο launch.",
        },
        {
          name: "Funnel",
          detail: "Landing → lead → πώληση",
          body: "Οι διαφημίσεις χρειάζονται καθαρή διαδρομή μετά το κλικ: landing page, φόρμα, thank-you και conversion tracking (pixels, GA4, Google Ads tags). Δένουμε creative, landing και follow-up ώστε το ενδιαφέρον να γίνει πελάτης.",
        },
        {
          name: "Analytics",
          detail: "ROAS, CPA, επόμενα βήματα",
          body: "Καθαρό reporting σε spend, CPA, ROAS, CTR και conversions — σε γλώσσα που χρησιμοποιεί ένας founder. Κάθε εβδομάδα: τι κρατάμε, κόβουμε ή μεγαλώνουμε. Αν ένας αριθμός δεν αλλάζει απόφαση, δεν τον κάνουμε παράσταση.",
        },
      ],
    },
    type: "service",
    serviceName: { en: "Performance Marketing", el: "Performance Marketing" },
  },
  {
    id: "web",
    enPath: "/web/",
    elPath: "/el/web/",
    enFile: "web/index.html",
    elFile: "el/web/index.html",
    image: `${origin}/images/web.jpg`,
    en: {
      title: "Web Development & SEO — Athens | omnidot.",
      description:
        "Website development and SEO: fast sites, landing pages and Google-ready structure. Landing from €700, multi-page ≈ €700/page. Athens & remote.",
      h1: "Web Development",
      body: "Website development and SEO — fast, editorial sites and landing pages built to rank, load quickly and convert.",
      story: "",
      points: [
        {
          name: "Websites",
          detail: "Corporate sites & brand pages",
          body: "We design and build corporate websites and brand sites that load fast, look clean on mobile and desktop, and guide visitors to contact, quote or purchase. Clear information architecture, strong calls to action, and pages written so Google and people can both understand what you offer.",
        },
        {
          name: "SEO",
          detail: "Technical SEO + content that ranks",
          body: "Search engine optimization from the ground up: site structure, title tags, meta descriptions, headings, internal links, Core Web Vitals, schema markup and crawlable pages. We combine technical SEO with content for the keywords your customers actually search — local SEO included when you serve a place or region.",
        },
        {
          name: "Landing pages",
          detail: "Campaign & ads landing pages",
          body: "Dedicated landing pages for Google Ads, Meta ads and email campaigns — one offer, one path, fast load. Built to turn paid traffic and organic search into leads or sales, with tracking (GA4, pixels) so you see which campaign and keyword convert.",
        },
        {
          name: "Care",
          detail: "Updates, speed & ongoing SEO",
          body: "After launch we keep the site healthy: content updates, performance and speed fixes, SEO improvements, security and small UX changes as campaigns and products evolve. A website is a channel, not a one-off brochure.",
        },
      ],
    },
    el: {
      title: "Κατασκευή Ιστοσελίδας στην Αθήνα | omnidot.",
      description:
        "Κατασκευή ιστοσελίδας για επιχειρήσεις σε όλη την Ελλάδα: γρήγορα sites, landing pages και σωστή δομή για τη Google. Landing page από €700.",
      h1: "Κατασκευή Ιστοσελίδας για επιχειρήσεις",
      body: "Φτιάχνουμε ιστοσελίδες που φορτώνουν γρήγορα, δείχνουν σωστά στο κινητό και είναι στημένες από την αρχή για να τις βρίσκει η Google. Είμαστε στην Αθήνα και συνεργαζόμαστε με founders και επιχειρήσεις σε όλη την Ελλάδα.",
      story: "",
      cases: [
        {
          client: "dotxi.app",
          story:
            "Ιστοσελίδα για ψηφιακή υπηρεσία, με καθαρή δομή που εξηγεί γρήγορα τι κάνει και οδηγεί τον επισκέπτη στο επόμενο βήμα.",
          href: "https://dotxi.app/",
          label: "dotxi.app",
        },
        {
          client: "Πυργιώτης ΟΕ",
          story:
            "Εταιρική ιστοσελίδα που παρουσιάζει την επιχείρηση και τις υπηρεσίες της και διευκολύνει την επικοινωνία με νέους πελάτες.",
          href: "https://pyrgiotisoe.com/",
          label: "pyrgiotisoe.com",
        },
      ],
      guide: {
        blocksTitle: "Τι φτιάχνουμε",
        blocks: [
          {
            title: "Εταιρικές ιστοσελίδες",
            body: "Σχεδιάζουμε εταιρικά sites που φορτώνουν γρήγορα, δουλεύουν σωστά σε κινητό και υπολογιστή και οδηγούν τον επισκέπτη σε επικοινωνία, προσφορά ή αγορά. Καθαρή δομή σελίδων και κείμενα που τα καταλαβαίνουν και οι άνθρωποι και η Google.",
          },
          {
            title: "Landing pages",
            body: "Μία σελίδα για μία προσφορά ή καμπάνια, για Google Ads, Meta ads ή email. Γρήγορο φόρτωμα και μέτρηση (GA4, pixels), ώστε να βλέπεις ποια καμπάνια φέρνει αποτέλεσμα.",
          },
          {
            title: "SEO από τη βάση",
            body: "Δομή site, τίτλοι και περιγραφές, επικεφαλίδες, εσωτερικά links, ταχύτητα, schema markup και σύνδεση με Google Search Console. Τοπικό SEO όταν εξυπηρετείς συγκεκριμένη περιοχή.",
          },
          {
            title: "Φροντίδα μετά το launch",
            body: "Ενημερώσεις περιεχομένου, βελτιώσεις ταχύτητας, SEO διορθώσεις, ασφάλεια και μικρές αλλαγές, όσο εξελίσσεται η επιχείρησή σου.",
          },
        ],
        audienceTitle: "Για ποιον είναι",
        audienceBody:
          "Για founders που ξεκινούν και χρειάζονται ένα site που πείθει από την πρώτη μέρα, για τοπικές επιχειρήσεις στην Αθήνα που θέλουν να τις βρίσκουν στη Google, και για εταιρείες που το site τους έχει μείνει πίσω και δεν φέρνει επαφές.",
        processTitle: "Πώς δουλεύουμε",
        process: [
          "Γνωριμία: ένα call για την επιχείρηση, τους πελάτες σου και τι πρέπει να κάνει το site.",
          "Δομή και κείμενα: ποιες σελίδες χρειάζονται και τι λέει η καθεμία.",
          "Σχέδιο: βλέπεις πώς θα είναι πριν το χτίσουμε.",
          "Κατασκευή και έλεγχος σε όλες τις συσκευές.",
          "Ανέβασμα και σύνδεση με τη Google.",
        ],
        costTitle: "Πόσο κοστίζει",
        costBody:
          "Μια landing page κοστίζει €700–1.200 και ένα site με πολλές σελίδες περίπου €700 ανά σελίδα. Για e-shop η τιμή βγαίνει αφού δούμε τι χρειάζεσαι.",
        costLinkLabel: "Δες όλα τα πακέτα →",
        costLinkHref: "/el/pricing/",
        faqTitle: "Συχνές ερωτήσεις",
        faq: [
          {
            q: "Σε πόσο καιρό είναι έτοιμο το site;",
            a: "Μια landing page είναι συνήθως έτοιμη μέσα σε λίγες εβδομάδες, ενώ ένα εταιρικό site με περισσότερες σελίδες θέλει λίγο περισσότερο. Τον ακριβή χρόνο τον συμφωνούμε από την αρχή, ανάλογα με τις σελίδες και το πόσο γρήγορα έχουμε τα κείμενα και τις φωτογραφίες.",
          },
          {
            q: "Θα βγαίνει το site στη Google;",
            a: "Το στήνουμε σωστά για τη Google από την αρχή και το συνδέουμε με το Search Console. Η θέση στα αποτελέσματα χτίζεται με τον καιρό και κανείς δεν μπορεί να εγγυηθεί την πρώτη θέση.",
          },
          {
            q: "Θα μπορώ να αλλάζω μόνος μου κείμενα και φωτογραφίες;",
            a: "Αν θέλεις να κάνεις αλλαγές μόνος σου, το στήνουμε έτσι από την αρχή. Διαφορετικά, τις αλλαγές τις αναλαμβάνουμε εμείς μέσα από τη φροντίδα μετά το launch.",
          },
          {
            q: "Ποιος γράφει τα κείμενα;",
            a: "Τα γράφουμε μαζί. Εσύ μας δίνεις τις πληροφορίες για την επιχείρηση και εμείς τα δουλεύουμε ώστε να είναι καθαρά για τον επισκέπτη και σωστά για τη Google. Αν χρειάζεσαι και φωτογραφίες ή βίντεο, υπάρχει η υπηρεσία ",
            aLink: {
              label: "Δημιουργία Περιεχομένου",
              href: "/el/content/",
            },
          },
          {
            q: "Δουλεύετε μόνο με επιχειρήσεις στην Αθήνα;",
            a: "Όχι. Συνεργαζόμαστε με επιχειρήσεις σε όλη την Ελλάδα και τα calls γίνονται online.",
          },
        ],
        readMoreTitle: "Διάβασε περισσότερα",
        readMore: {
          label:
            "Δημιουργία ιστοσελίδας στην Αθήνα: τι περιλαμβάνει στην πράξη, πώς δένει με το SEO και τι καθορίζει την τιμή",
          href: "/el/articles/dimiourgia-istoselidas-athina/",
        },
        relatedTitle: "Σχετικές υπηρεσίες",
        related: [
          {
            label: "Διαχείριση Social Media",
            href: "/el/social/",
            blurb: "Στρατηγική, περιεχόμενο, community και μηνιαίο reporting.",
          },
          {
            label: "Δημιουργία Περιεχομένου",
            href: "/el/content/",
            blurb: "Φωτογραφία, video και Reels από concept έως ανάρτηση.",
          },
          {
            label: "Performance Marketing",
            href: "/el/performance/",
            blurb: "Meta Ads και Google Ads με καθαρό κόστος και απόδοση.",
          },
        ],
        finalTitle: "Θες να δούμε τι site χρειάζεται η επιχείρησή σου;",
        cta: "Κλείσε ένα σύντομο call",
      },
    },
    type: "service",
    serviceName: {
      en: "Web Development",
      el: "Κατασκευή Ιστοσελίδας για επιχειρήσεις",
    },
  },
  {
    id: "about",
    enPath: "/about/",
    elPath: "/el/about/",
    enFile: "about/index.html",
    elFile: "el/about/index.html",
    image: `${origin}/images/work-omnidot.jpg`,
    en: {
      title: "About & Contact — Marketing Agency Athens | omnidot.",
      description:
        "About omnidot. — Athens marketing agency for founders and local brands. Contact us for social media, content, Meta & Google Ads, and SEO websites.",
      h1: "About omnidot.",
      body: "Athens marketing agency for founders and local brands. From SEO websites to social media and Meta & Google Ads. Start a brief with omnidot.",
      story: "",
    },
    el: {
      title: "Σχετικά & Επικοινωνία — Διαφημιστική στην Αθήνα | omnidot.",
      description:
        "Σχετικά με την omnidot. — διαφημιστική στην Αθήνα για founders και τοπικά brands. Επικοινωνία για social media, content, Meta & Google Ads και ιστοσελίδες με SEO.",
      h1: "Σχετικά με το omnidot.",
      body: "Διαφημιστική στην Αθήνα για founders και τοπικά brands. Από ιστοσελίδες με SEO μέχρι social media και Meta & Google Ads. Ξεκίνα ένα brief με το omnidot.",
      story: "",
    },
    type: "about",
  },
  {
    id: "pricing",
    enPath: "/pricing/",
    elPath: "/el/pricing/",
    enFile: "pricing/index.html",
    elFile: "el/pricing/index.html",
    image: `${origin}/images/work-omnidot.jpg`,
    en: {
      title: "Marketing Agency Pricing — Packages | omnidot. Athens",
      description:
        "Marketing agency pricing in Athens: social media from €450/mo, content packs from €350, Meta & Google Ads from €300/mo, SEO websites from €700. Ad spend separate.",
      h1: "Packages & pricing",
      body: "Clear marketing agency packages for social, content, ads and web. Ad spend is always separate. Social from €450/mo, content from €350, performance from €300/mo, web from €700.",
      story: "",
    },
    el: {
      title: "Τιμές Διαφημιστικής — Πακέτα | omnidot. Αθήνα",
      description:
        "Τιμές διαφημιστικής στην Αθήνα: social media από €450/μήνα, content από €350, Meta & Google Ads από €300/μήνα, ιστοσελίδες SEO από €700. Ad spend ξεχωριστά.",
      h1: "Πακέτα & τιμές",
      body: "Καθαρά πακέτα διαφημιστικής για social, content, ads και web. Το ad spend είναι πάντα ξεχωριστά. Social από €450/μήνα, content από €350, performance από €300/μήνα, web από €700.",
      story: "",
    },
    type: "pricing",
  },
  {
    id: "articles",
    enPath: "/articles/",
    elPath: "/el/articles/",
    enFile: "articles/index.html",
    elFile: "el/articles/index.html",
    image: `${origin}/images/work-omnidot.jpg`,
    en: {
      title: "Articles — omnidot.",
      description:
        "Articles from omnidot. on Meta & Google Ads, social media, SEO websites and marketing for Athens brands.",
      h1: "Articles",
      body: "Short reads on social, ads, SEO and websites — practical notes from how we work with founders and local brands.",
      story: "",
    },
    el: {
      title: "Άρθρα — omnidot.",
      description:
        "Άρθρα από την omnidot. για Meta & Google Ads, social media, ιστοσελίδες με SEO και marketing για brands στην Αθήνα.",
      h1: "Άρθρα",
      body: "Σύντομα κείμενα για social, ads, SEO και ιστοσελίδες — πρακτικές σημειώσεις από τη δουλειά μας με founders και τοπικά brands.",
      story: "",
    },
    type: "articles",
  },
  {
    id: "article-website-athens",
    enPath: "/articles/dimiourgia-istoselidas-athina/",
    elPath: "/el/articles/dimiourgia-istoselidas-athina/",
    enFile: "articles/dimiourgia-istoselidas-athina/index.html",
    elFile: "el/articles/dimiourgia-istoselidas-athina/index.html",
    image: `${origin}/images/articles/dimiourgia-istoselidas-athina.jpg`,
    en: {
      title:
        "Website creation in Athens: what it includes, SEO and price — omnidot.",
      description:
        "What a real website build in Athens includes, where SEO fits from day one, and what drives the price — from omnidot.",
      h1: "Website creation in Athens",
      subtitle:
        "what it actually includes, how it ties to SEO, and what drives the price",
      body: "A website for a business in Athens has one job: turn whoever finds it into someone who calls, messages or buys. What the build includes, where SEO fits, and what shapes the price.",
      story: "",
    },
    el: {
      title:
        "Δημιουργία ιστοσελίδας στην Αθήνα: SEO και τιμή — omnidot.",
      description:
        "Τι περιλαμβάνει στην πράξη η κατασκευή ιστοσελίδας στην Αθήνα, πώς δένει με το SEO και τι καθορίζει την τιμή — από την omnidot.",
      h1: "Δημιουργία ιστοσελίδας στην Αθήνα",
      subtitle:
        "τι περιλαμβάνει στην πράξη, πώς δένει με το SEO και τι καθορίζει την τιμή",
      body: "Μια ιστοσελίδα για επιχείρηση στην Αθήνα έχει μία δουλειά: να μετατρέπει όποιον τη βρίσκει σε κάποιον που σε παίρνει τηλέφωνο, σου στέλνει μήνυμα ή αγοράζει. Τι περιλαμβάνει η κατασκευή, πού μπαίνει το SEO και τι καθορίζει την τιμή.",
      story: "",
    },
    type: "articles",
  },
  {
    id: "privacy",
    enPath: "/privacy/",
    elPath: "/el/privacy/",
    enFile: "privacy/index.html",
    elFile: "el/privacy/index.html",
    image: `${origin}/images/work-omnidot.jpg`,
    en: {
      title: "Website terms, privacy & cookies - omnidot.",
      description:
        "Terms of use, privacy policy and cookies for omnidot. — how we process contact data under GDPR.",
      h1: "Website terms, privacy & cookies",
      body: "How omnidot. processes contact form data under GDPR. Data controller: Antonios Syrianos, sole proprietorship. Contact: info@omnidot.gr.",
      story: "",
    },
    el: {
      title: "Όροι χρήσης, πολιτική απορρήτου & cookies - omnidot.",
      description:
        "Όροι χρήσης, πολιτική απορρήτου και cookies του omnidot. — πώς επεξεργαζόμαστε δεδομένα επικοινωνίας βάσει GDPR.",
      h1: "Όροι χρήσης, πολιτική απορρήτου & cookies",
      body: "Πώς το omnidot. επεξεργάζεται δεδομένα φόρμας επικοινωνίας βάσει GDPR. Υπεύθυνος: Συριανός Αντώνιος, ατομική επιχείρηση. Επικοινωνία: info@omnidot.gr.",
      story: "",
    },
    type: "privacy",
  },
];

function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

function stripPrior(html) {
  return html
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="alternate"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:url"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:title"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:description"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="robots"[^>]*>\s*/gi, "")
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, "")
    .replace(/<main\s+id="prerender">[\s\S]*?<\/main>\s*/gi, "");
}

function jsonLdFor(def, locale) {
  const copy = def[locale];
  const path = locale === "el" ? def.elPath : def.enPath;
  const url = `${origin}${path === "/" ? "/" : path}`;
  if (def.type === "org") {
    return {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "omnidot.",
      legalName: "Antonios Syrianos",
      url: origin,
      description: copy.description,
      image: def.image,
      logo: `${origin}/images/omnidot-logo.svg`,
      telephone: phone,
      email: "info@omnidot.gr",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Athens",
        addressRegion: "Attica",
        addressCountry: "GR",
      },
      areaServed: [
        { "@type": "City", name: "Athens" },
        { "@type": "Country", name: "Greece" },
      ],
      priceRange: "€€",
    };
  }
  if (def.type === "about") {
    return {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: locale === "el" ? "Σχετικά" : "About",
      url,
      isPartOf: { "@type": "WebSite", name: "omnidot.", url: origin },
    };
  }
  if (def.type === "pricing") {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: locale === "el" ? "Πακέτα & τιμές" : "Packages & pricing",
      description: copy.description,
      url,
      isPartOf: { "@type": "WebSite", name: "omnidot.", url: origin },
    };
  }
  if (def.type === "articles") {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: copy.h1,
      description: copy.description,
      url,
      isPartOf: { "@type": "WebSite", name: "omnidot.", url: origin },
    };
  }
  if (def.type === "privacy") {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: copy.h1,
      description: copy.description,
      url,
      isPartOf: { "@type": "WebSite", name: "omnidot.", url: origin },
    };
  }
  const serviceLd = {
    "@type": "Service",
    name: def.serviceName[locale],
    description: (copy.story || copy.body).slice(0, 300),
    provider: {
      "@type": "ProfessionalService",
      name: "omnidot.",
      url: origin,
      telephone: phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Athens",
        addressRegion: "Attica",
        addressCountry: "GR",
      },
    },
    areaServed: "GR",
    url,
    image: def.image,
  };
  if (copy.guide?.faq?.length) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        serviceLd,
        {
          "@type": "FAQPage",
          mainEntity: copy.guide.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.aLink
                ? `${item.a}${item.aLink.label}.`
                : item.a,
            },
          })),
        },
      ],
    };
  }
  return {
    "@context": "https://schema.org",
    ...serviceLd,
  };
}

function articleRouteDefs() {
  return routeDefs.filter(
    (def) =>
      def.enPath.startsWith("/articles/") && def.enPath !== "/articles/",
  );
}

function crawlPoints(points) {
  if (!points?.length) return "";
  const items = points
    .map(
      (item) =>
        `<li><h3>${escapeHtml(item.name)}${
          item.detail ? ` — ${escapeHtml(item.detail)}` : ""
        }</h3><p>${escapeHtml(item.body)}</p></li>`,
    )
    .join("");
  return `<section aria-label="What we do"><ol>${items}</ol></section>`;
}

function crawlGuide(guide) {
  if (!guide) return "";
  const parts = [];
  if (guide.blocksTitle && guide.blocks?.length) {
    parts.push(
      `<section><h2>${escapeHtml(guide.blocksTitle)}</h2>${guide.blocks
        .map(
          (block) =>
            `<h3>${escapeHtml(block.title)}</h3><p>${escapeHtml(block.body)}</p>`,
        )
        .join("")}</section>`,
    );
  }
  if (guide.includesTitle && guide.includes?.length) {
    parts.push(
      `<section><h2>${escapeHtml(guide.includesTitle)}</h2><ul>${guide.includes
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}</ul></section>`,
    );
  }
  if (guide.audienceTitle) {
    parts.push(
      `<section><h2>${escapeHtml(guide.audienceTitle)}</h2><p>${escapeHtml(
        guide.audienceBody || "",
      )}</p>`,
    );
    if (guide.platformsTitle && guide.platforms?.length) {
      parts.push(
        `<h3>${escapeHtml(guide.platformsTitle)}</h3><ul>${guide.platforms
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join("")}</ul>`,
      );
    }
    parts.push(`</section>`);
  }
  if (guide.processTitle && guide.process?.length) {
    parts.push(
      `<section><h2>${escapeHtml(guide.processTitle)}</h2><ol>${guide.process
        .map((item) => {
          if (typeof item === "string") return `<li>${escapeHtml(item)}</li>`;
          return `<li><strong>${escapeHtml(item.title || "")}</strong>${escapeHtml(
            item.body || "",
          )}</li>`;
        })
        .join("")}</ol></section>`,
    );
  }
  if (guide.costTitle) {
    parts.push(
      `<section><h2>${escapeHtml(guide.costTitle)}</h2><p>${escapeHtml(
        guide.costBody || "",
      )}</p>${
        guide.costLinkHref
          ? `<p><a href="${escapeAttr(guide.costLinkHref)}">${escapeHtml(
              guide.costLinkLabel || guide.costLinkHref,
            )}</a></p>`
          : ""
      }</section>`,
    );
  }
  if (guide.faqTitle && guide.faq?.length) {
    parts.push(
      `<section><h2>${escapeHtml(guide.faqTitle)}</h2><dl>${guide.faq
            .map(
              (item) =>
            `<dt>${escapeHtml(item.q)}</dt><dd>${escapeHtml(item.a)}${
              item.aLink
                ? `<a href="${escapeAttr(item.aLink.href)}">${escapeHtml(item.aLink.label)}</a>.`
                : ""
            }</dd>`,
        )
        .join("")}</dl></section>`,
    );
  }
  if (guide.readMoreTitle && guide.readMore) {
    parts.push(
      `<section><h2>${escapeHtml(guide.readMoreTitle)}</h2><p><a href="${escapeAttr(
        guide.readMore.href,
      )}">${escapeHtml(guide.readMore.label)}</a></p></section>`,
    );
  }
  if (guide.relatedTitle && guide.related?.length) {
    parts.push(
      `<section><h2>${escapeHtml(guide.relatedTitle)}</h2><ul>${guide.related
        .map(
          (item) =>
            `<li><a href="${escapeAttr(item.href)}">${escapeHtml(
              item.label,
            )}</a> — ${escapeHtml(item.blurb)}</li>`,
        )
        .join("")}</ul></section>`,
    );
  }
  if (guide.finalTitle) {
    parts.push(
      `<section><h2>${escapeHtml(guide.finalTitle)}</h2>${
        guide.cta ? `<p>${escapeHtml(guide.cta)}</p>` : ""
      }</section>`,
    );
  }
  return parts.join("");
}

function crawlCases(cases) {
  if (!cases?.length) return "";
  const items = cases
    .map((item) => {
      const link = item.href
        ? ` <a href="${escapeAttr(item.href)}">${escapeHtml(item.label || item.href)}</a>`
        : "";
      return `<li><strong>${escapeHtml(item.client)}</strong> — ${escapeHtml(
        item.story || item.value || "",
      )}${link}</li>`;
    })
    .join("");
  return `<section aria-label="Selected work"><ul>${items}</ul></section>`;
}

function crawlBody(def, locale) {
  const copy = def[locale];
  const nav = locale === "el" ? navEl : navEn;
  const links = nav
    .map((item) => `<a href="${item.href}">${escapeHtml(item.label)}</a>`)
    .join(" · ");
  const story = copy.story
    ? `<p class="prerender-story">${escapeHtml(copy.story)}</p>`
    : "";
  const parts = [
    `<main id="prerender">`,
    `<h1>${escapeHtml(copy.h1)}</h1>`,
    copy.subtitle ? `<p>${escapeHtml(copy.subtitle)}</p>` : "",
    `<p>${escapeHtml(copy.body)}</p>`,
  ].filter(Boolean);

  // Case folder near the top (same order as on-page guide layouts).
  if (copy.cases?.length) {
    parts.push(crawlCases(copy.cases));
  } else if (story) {
    parts.push(story);
  }

  // Full service guide (all FAQ / section text in HTML for crawlers).
  if (copy.guide) {
    parts.push(crawlGuide(copy.guide));
  } else {
    // Accordion “what we do” bodies — always in prerender HTML (not click-loaded).
    parts.push(crawlPoints(copy.points));
  }

  parts.push(`<nav aria-label="Services">${links}</nav>`);

  // Plain HTML article links so Google can crawl /articles/ without JS.
  if (def.id === "articles") {
    const prefix = locale === "el" ? "/el" : "";
    const items = articleRouteDefs()
      .map((article) => {
        const href = withTrailingSlash(
          `${prefix}/articles/${article.enPath.split("/").filter(Boolean).pop()}`,
        );
        const title = article[locale].h1;
        return `<li><a href="${href}">${escapeHtml(title)}</a></li>`;
      })
      .join("");
    parts.push(
      `<nav aria-label="${locale === "el" ? "Άρθρα" : "Articles"}"><ul>${items}</ul></nav>`,
    );
  }

  parts.push(`</main>`);
  return parts.join("");
}

function patchHtml(html, def, locale) {
  const copy = def[locale];
  const path = withTrailingSlash(locale === "el" ? def.elPath : def.enPath);
  const file = locale === "el" ? def.elFile : def.enFile;
  const canonical = `${origin}${path}`;
  const enUrl = `${origin}${withTrailingSlash(def.enPath)}`;
  const elUrl = `${origin}${withTrailingSlash(def.elPath)}`;
  let out = stripPrior(html);

  out = out.replace(/<html[^>]*>/, `<html lang="${locale === "el" ? "el" : "en"}">`);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(copy.title)}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeAttr(copy.description)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeAttr(copy.title)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeAttr(copy.description)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image" content="${escapeAttr(def.image)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:locale" content="${locale === "el" ? "el_GR" : "en_US"}" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:card"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:card" content="summary_large_image" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:image" content="${escapeAttr(def.image)}" />`,
  );

  const headExtras = [
    `    <link rel="canonical" href="${canonical}" />`,
    `    <link rel="alternate" hreflang="en" href="${enUrl}" />`,
    `    <link rel="alternate" hreflang="el" href="${elUrl}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${enUrl}" />`,
    `    <meta property="og:url" content="${canonical}" />`,
    `    <meta name="twitter:title" content="${escapeAttr(copy.title)}" />`,
    `    <meta name="twitter:description" content="${escapeAttr(copy.description)}" />`,
    `    <script type="application/ld+json">${JSON.stringify(jsonLdFor(def, locale))}</script>`,
  ].join("\n");

  out = out.replace("</head>", `${headExtras}\n  </head>`);
  out = out.replace(
    '<div id="root"></div>',
    `${crawlBody(def, locale)}\n    <div id="root"></div>`,
  );
  return { file, html: out };
}

function patch404(html) {
  let out = stripPrior(html);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>Page not found - omnidot.</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="This URL is not a page on omnidot." />`,
  );
  const extras = [
    `    <meta name="robots" content="noindex, follow" />`,
    `    <link rel="canonical" href="${origin}/" />`,
  ].join("\n");
  out = out.replace("</head>", `${extras}\n  </head>`);
  out = out.replace(
    '<div id="root"></div>',
    `<main id="prerender"><h1>Page not found</h1><p>This URL isn’t a page on omnidot.</p><nav><a href="/">Home</a> · <a href="/el/">Αρχική</a></nav></main>\n    <div id="root"></div>`,
  );
  return out;
}

function absoluteUrl(path) {
  return `${origin}${withTrailingSlash(path)}`;
}

function sitemapPriority(def) {
  if (def.id === "home") return "1.0";
  if (def.type === "service" || def.type === "pricing") return "0.9";
  if (def.type === "about" || def.id === "articles") return "0.8";
  if (def.enPath.includes("/articles/") && def.enPath !== "/articles/") return "0.7";
  if (def.type === "privacy") return "0.3";
  return "0.5";
}

function sitemapChangefreq(def) {
  if (def.id === "home") return "weekly";
  if (def.type === "privacy") return "yearly";
  return "monthly";
}

function writeSitemap() {
  const urls = [];
  for (const def of routeDefs) {
    for (const locale of ["en", "el"]) {
      const path = withTrailingSlash(locale === "el" ? def.elPath : def.enPath);
      const loc = absoluteUrl(path);
      const enUrl = absoluteUrl(def.enPath);
      const elUrl = absoluteUrl(def.elPath);
      urls.push({
        loc,
        enUrl,
        elUrl,
        changefreq: sitemapChangefreq(def),
        priority: sitemapPriority(def),
      });
    }
  }

  const body = urls
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${entry.enUrl}" />
    <xhtml:link rel="alternate" hreflang="el" href="${entry.elUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${entry.enUrl}" />
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;

  writeFileSync(join(dist, "sitemap.xml"), xml, "utf8");
  writeFileSync(join(root, "public/sitemap.xml"), xml, "utf8");
  console.log(`sitemap: ${urls.length} URLs`);
  for (const entry of urls) console.log(`  ${entry.loc}`);
}

function writeRedirects() {
  // Explicit non-slash → slash 301s (no wildcards that could touch assets).
  const barePaths = new Set();
  for (const def of routeDefs) {
    for (const path of [def.enPath, def.elPath]) {
      const slashed = withTrailingSlash(path);
      if (slashed === "/") continue;
      barePaths.add(slashed.replace(/\/$/, ""));
    }
  }

  const lines = [
    "# Trailing-slash canonicals — non-slash → slash (301).",
    "# Listed explicitly so asset URLs (e.g. /sitemap.xml) are never rewritten.",
  ];
  for (const bare of [...barePaths].sort()) {
    lines.push(`${bare}  ${bare}/  301`);
  }
  lines.push("");
  lines.push("# SPA fallback for client-side routes");
  lines.push("/*    /index.html   200");
  lines.push("");

  const text = lines.join("\n");
  writeFileSync(join(dist, "_redirects"), text, "utf8");
  writeFileSync(join(root, "public/_redirects"), text, "utf8");
  console.log(`redirects: ${barePaths.size} trailing-slash rules`);
}

const template = stripPrior(readFileSync(join(dist, "index.html"), "utf8"));

for (const def of routeDefs) {
  for (const locale of ["en", "el"]) {
    const { file, html } = patchHtml(template, def, locale);
    const outPath = join(dist, file);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf8");
    console.log(`prerender: ${file}`);
  }
}

writeFileSync(join(dist, "404.html"), patch404(template), "utf8");
console.log("prerender: 404.html");

writeSitemap();
writeRedirects();
