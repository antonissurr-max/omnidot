import type { Locale } from "./i18n";

export type Article = {
  slug: string;
  date: string;
  topic: string;
  title: string;
  excerpt: string;
  readMinutes: number;
  body: string[];
};

const articlesEn: Article[] = [
  {
    slug: "meta-ads-for-local-business",
    date: "2026-09-18",
    topic: "Performance",
    title: "Meta Ads for local businesses: start with one clear offer",
    excerpt:
      "Before you scale spend, lock the offer, the audience, and the landing page. Here’s the short path we use with Athens brands.",
    readMinutes: 5,
    body: [
      "Most local Meta campaigns fail for a boring reason: the ad asks for too much, from people who don’t know you yet. A clear offer beats a clever caption.",
      "Start with one service people already search for — not your full menu. Pair it with a single landing page that repeats the same promise, proof, and next step. If the ad says “static study in Karditsa,” the page should not open on a generic homepage.",
      "Audience next. For a city or region, a tight geo radius plus interest or lookalike layers usually beats broad “everyone 25–55.” Keep creative simple: one strong visual, one sentence of context, one CTA.",
      "Then read the first 7–14 days for learning, not for vanity. Cost per result, landing-page views, and message quality tell you whether to rewrite the offer, the page, or the targeting — not whether ads “work.”",
      "When those three pieces hold, scaling spend is the easy part. Until then, more budget only buys louder confusion.",
    ],
  },
  {
    slug: "seo-before-ads",
    date: "2026-08-28",
    topic: "Web & SEO",
    title: "Fix the website before you pour money into ads",
    excerpt:
      "Ads can buy clicks tomorrow. They can’t fix a slow page, a vague offer, or a contact form nobody trusts.",
    readMinutes: 4,
    body: [
      "Paid media amplifies whatever you already are. If the site is slow, unclear, or hard to contact on mobile, ads simply pay to show that friction to more people.",
      "Before a serious ad budget, we check three basics: does the page load fast on a phone, does the headline match the ad, and can someone enquire in under a minute? Those are conversion problems, not media problems.",
      "SEO and structure matter even when ads are the growth engine. Clear service pages, sensible titles, and real local proof help Google — and they give Meta and Google Ads a trustworthy destination.",
      "Think of the website as the sales floor. Ads are the people you invite in. No amount of invitation budget fixes a locked door.",
    ],
  },
  {
    slug: "social-content-cadence",
    date: "2026-07-10",
    topic: "Social",
    title: "A social content cadence that doesn’t burn the team",
    excerpt:
      "Posting every day is not a strategy. A repeatable weekly rhythm — with room for Reels — is.",
    readMinutes: 6,
    body: [
      "Founders often ask for “more posts.” What they usually need is a calendar they can keep when the week gets busy. Volume without pillars becomes noise.",
      "A practical cadence for many local brands: three intentional feed pieces a week, one short-form video, and Stories that answer real questions. Not every slot needs a campaign — some should simply stay useful.",
      "Build pillars first: proof, process, offer, and people. Then rotate. Proof builds trust, process shows how you work, offer drives enquiries, people make the brand feel human.",
      "Batch what you can. Shoot once, cut for feed and Stories, write captions in one sitting. Consistency comes from systems, not from heroic last-minute posts.",
      "Measure replies, profile visits, and enquiries — not only likes. Social should warm the path to a brief, a call, or a site visit.",
    ],
  },
];

const articlesEl: Article[] = [
  {
    slug: "meta-ads-for-local-business",
    date: "2026-09-18",
    topic: "Performance",
    title: "Meta Ads για τοπικές επιχειρήσεις: ξεκίνα από μία καθαρή προσφορά",
    excerpt:
      "Πριν ανεβάσεις budget, κλείδωσε προσφορά, κοινό και σελίδα προορισμού. Αυτός είναι ο σύντομος δρόμος που ακολουθούμε με brands στην Ελλάδα.",
    readMinutes: 5,
    body: [
      "Οι περισσότερες τοπικές καμπάνιες στο Meta σκοντάφτουν για βαρετό λόγο: η διαφήμιση ζητάει πολλά, από ανθρώπους που δεν σε ξέρουν ακόμα. Μία καθαρή προσφορά κερδίζει το έξυπνο caption.",
      "Ξεκίνα από μία υπηρεσία που ήδη ψάχνει ο κόσμος — όχι από όλο το μενού. Σύνδεσέ την με μία σελίδα που επαναλαμβάνει την ίδια υπόσχεση, απόδειξη και επόμενο βήμα. Αν η διαφήμιση λέει «στατική μελέτη στην Καρδίτσα», η σελίδα δεν πρέπει να ανοίγει σε γενική αρχική.",
      "Μετά το κοινό. Για πόλη ή περιοχή, ένα σφιχτό geo plus ενδιαφέροντα ή lookalike συνήθως κερδίζει το πλατύ «όλοι 25–55». Κράτα το creative απλό: μία δυνατή εικόνα, μία πρόταση πλαισίου, ένα CTA.",
      "Στις πρώτες 7–14 μέρες διάβασε μάθηση, όχι vanity. Cost per result, επισκέψεις στη σελίδα και ποιότητα μηνυμάτων σου λένε αν θα ξαναγράψεις την προσφορά, τη σελίδα ή το targeting — όχι αν «δουλεύουν οι διαφημίσεις».",
      "Όταν αυτά τα τρία κρατάνε, το scale του budget είναι το εύκολο κομμάτι. Μέχρι τότε, περισσότερα χρήματα αγοράζουν πιο δυνατό μπέρδεμα.",
    ],
  },
  {
    slug: "seo-before-ads",
    date: "2026-08-28",
    topic: "Web & SEO",
    title: "Φτιάξε την ιστοσελίδα πριν ρίξεις λεφτά σε ads",
    excerpt:
      "Τα ads μπορούν να φέρουν κλικ αύριο. Δεν διορθώνουν αργή σελίδα, ασαφή προσφορά ή φόρμα που κανείς δεν εμπιστεύεται.",
    readMinutes: 4,
    body: [
      "Το paid media μεγεθύνει αυτό που ήδη είσαι. Αν η σελίδα είναι αργή, ασαφής ή δύσκολη στο κινητό, τα ads απλώς πληρώνουν για να δείξεις αυτή την τριβή σε περισσότερους.",
      "Πριν σοβαρό ad budget, κοιτάμε τρία βασικά: φορτώνει γρήγορα στο κινητό, ταιριάζει ο τίτλος με τη διαφήμιση, και μπορεί κάποιος να επικοινωνήσει σε λιγότερο από ένα λεπτό; Αυτά είναι θέματα conversion, όχι media.",
      "Το SEO και η δομή μετράνε ακόμα κι όταν τα ads είναι η μηχανή ανάπτυξης. Καθαρές σελίδες υπηρεσιών, σωστοί τίτλοι και τοπική απόδειξη βοηθούν τη Google — και δίνουν στα Meta/Google Ads έναν προορισμό που εμπνέει εμπιστοσύνη.",
      "Σκέψου την ιστοσελίδα ως πάτωμα πωλήσεων. Τα ads είναι η πρόσκληση. Κανένα budget πρόσκλησης δεν ανοίγει κλειδωμένη πόρτα.",
    ],
  },
  {
    slug: "social-content-cadence",
    date: "2026-07-10",
    topic: "Social",
    title: "Ρυθμός social content που δεν καίει την ομάδα",
    excerpt:
      "Το «κάθε μέρα post» δεν είναι στρατηγική. Ένας επαναλαμβανόμενος εβδομαδιαίος ρυθμός — με χώρο για Reels — είναι.",
    readMinutes: 6,
    body: [
      "Οι founders συχνά ζητούν «περισσότερα posts». Συνήθως χρειάζονται ένα ημερολόγιο που αντέχει όταν η εβδομάδα στριμώχνει. Όγκος χωρίς πυλώνες γίνεται θόρυβος.",
      "Ένας πρακτικός ρυθμός για πολλά τοπικά brands: τρία σκόπιμα feed pieces την εβδομάδα, ένα short-form video, και Stories που απαντούν πραγματικές ερωτήσεις. Δεν χρειάζεται κάθε slot να είναι καμπάνια — κάποια απλώς μένουν χρήσιμα.",
      "Πρώτα οι πυλώνες: απόδειξη, διαδικασία, προσφορά, άνθρωποι. Μετά εναλλαγή. Η απόδειξη χτίζει εμπιστοσύνη, η διαδικασία δείχνει πώς δουλεύετε, η προσφορά φέρνει enquiries, οι άνθρωποι κάνουν το brand ανθρώπινο.",
      "Κάνε batch ό,τι γίνεται. Γύρισμα μία φορά, κόψιμο για feed και Stories, captions σε μία καθισιά. Η συνέπεια έρχεται από συστήματα, όχι από ηρωικά last-minute posts.",
      "Μέτρα απαντήσεις, επισκέψεις προφίλ και enquiries — όχι μόνο likes. Το social πρέπει να ζεσταίνει τον δρόμο προς brief, κλήση ή επίσκεψη στο site.",
    ],
  },
];

export function articlesFor(locale: Locale): Article[] {
  return locale === "el" ? articlesEl : articlesEn;
}

export function articleBySlug(locale: Locale, slug: string): Article | undefined {
  return articlesFor(locale).find((a) => a.slug === slug);
}

export function formatArticleDate(locale: Locale, iso: string): string {
  const date = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat(locale === "el" ? "el-GR" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
