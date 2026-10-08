import type { Locale } from "./i18n";

/**
 * How to add an article (chat workflow):
 * 1. User sends title, body (EL and/or EN), topic, optional date, and a thumbnail image.
 * 2. Save the image under `public/images/articles/<slug>.jpg` (or .png/.webp).
 * 3. Append one entry to `articles` below with `image: "/images/articles/<slug>.jpg"`.
 * 4. List page shows the thumbnail; detail page is text only.
 */
export type ArticleBlock =
  | string
  | { section: string };

export type Article = {
  slug: string;
  date: string;
  /** List thumbnail — file under /public/images/articles/ */
  image: string;
  topic: string;
  title: string;
  excerpt: string;
  readMinutes: number;
  body: ArticleBlock[];
};

type ArticleSource = {
  slug: string;
  date: string;
  image: string;
  readMinutes: number;
  en: Omit<Article, "slug" | "date" | "image" | "readMinutes">;
  el: Omit<Article, "slug" | "date" | "image" | "readMinutes">;
};

const articles: ArticleSource[] = [
  {
    slug: "dimiourgia-istoselidas-athina",
    date: "2026-10-07",
    image: "/images/articles/dimiourgia-istoselidas-athina.jpg",
    readMinutes: 14,
    el: {
      topic: "Web & SEO",
      title:
        "Δημιουργία ιστοσελίδας στην Αθήνα: τι περιλαμβάνει στην πράξη, πώς δένει με το SEO και τι καθορίζει την τιμή",
      excerpt:
        "Οι περισσότερες συζητήσεις για καινούργιο site ξεκινούν από το λάθος σημείο. Τι περιλαμβάνει πραγματικά η κατασκευή, πού μπαίνει το SEO και τι ανεβάζει την τιμή.",
      body: [
        "Οι περισσότερες συζητήσεις για καινούργιο site ξεκινούν από το λάθος σημείο. Πρώτα έρχεται το «πόσο κοστίζει» και αμέσως μετά το «θέλω κάτι μοντέρνο». Αυτά είναι εύλογα ερωτήματα, όμως δεν σου λένε αν το site θα σου φέρει δουλειά. Μια ιστοσελίδα για επιχείρηση στην Αθήνα, είτε είναι γραφείο, κατάστημα, ιατρείο, εστίαση ή B2B εταιρεία, έχει μία δουλειά: να μετατρέπει όποιον τη βρίσκει, από Google, Instagram ή διαφήμιση, σε κάποιον που σε παίρνει τηλέφωνο, σου στέλνει μήνυμα ή αγοράζει.",
        "Σε αυτό το κείμενο εξηγούμε τι πραγματικά περιλαμβάνει η κατασκευή ενός site, πού μπαίνει το SEO, τι ανεβάζει ή κατεβάζει την τιμή και ποιες ερωτήσεις αξίζει να κάνεις σε όποιον σου το φτιάξει, ακόμα κι αν αυτός δεν είμαστε εμείς.",
        { section: "1. Ξεκίνα από τη δουλειά που θα κάνει το site" },
        "Πριν από χρώματα, γραμματοσειρές και «θέλω σαν αυτό το site που είδα», χρειάζονται τρεις απαντήσεις:",
        "Ποιος έρχεται; Κάποιος που σε έψαξε στο Google με συγκεκριμένη ανάγκη («λογιστής Χαλάνδρι», «ψυχρή άσφαλτος για λακκούβες»), κάποιος που είδε ένα Reel σου ή κάποιος που πάτησε μια διαφήμιση;",
        "Τι θέλεις να κάνει; Να καλέσει, να κλείσει ραντεβού, να ζητήσει προσφορά ή να αγοράσει. Διάλεξε μία κύρια ενέργεια και το πολύ μία δεύτερη.",
        "Τι τον σταματά σήμερα; Συνήθως είναι η έλλειψη εμπιστοσύνης, η ασάφεια για την τιμή ή τη διαδικασία, ή ένα site που στο κινητό είναι αργό και μπερδεμένο.",
        "Όταν τα ξέρεις αυτά, το design έχει πλέον κάτι να εξυπηρετήσει.",
        { section: "2. Τι περιλαμβάνει μια σωστή κατασκευή ιστοσελίδας" },
        "Ένα επαγγελματικό site δεν είναι ένα template με το logo σου. Στην πράξη η δουλειά έχει αυτά τα κομμάτια:",
        "Δομή σελίδων (αρχιτεκτονική). Ποιες σελίδες χρειάζονται και γιατί. Για τις περισσότερες τοπικές επιχειρήσεις αυτό σημαίνει αρχική, μία σελίδα ανά βασική υπηρεσία, σελίδα «ποιοι είμαστε» με πραγματικούς ανθρώπους και χώρο, επικοινωνία και, αν έχεις, σελίδα με δουλειές ή αποτελέσματα. Μία σελίδα ανά υπηρεσία δεν μπαίνει για να «φουσκώσει» το site. Υπάρχει επειδή κάθε υπηρεσία ψάχγεται διαφορετικά στο Google.",
        "Κείμενα. Είναι το πιο υποτιμημένο κομμάτι. Τα κείμενα πρέπει να απαντούν σε ό,τι ρωτάει ο πελάτης στο τηλέφωνο: τι ακριβώς κάνεις, για ποιον, πώς δουλεύεις, πόσο περίπου κοστίζει και τι γίνεται μετά. Γράφονται για ανθρώπους και δομούνται ώστε να τα καταλαβαίνει και η Google.",
        "Σχεδιασμός. Δεν μετράει μόνο το «ωραίο». Μετράει η ιεραρχία: τι βλέπει ο επισκέπτης στην πρώτη οθόνη του κινητού, πού βρίσκεται το κουμπί επικοινωνίας και πού μπαίνει η απόδειξη ότι ξέρεις τη δουλειά σου (έργα, κριτικές, γνωστοί πελάτες). Ακολουθούμε την αισθητική και τον τόνο του brand σου, δεν τον αντικαθιστούμε με ένα trend.",
        "Ανάπτυξη. Το site πρέπει να φορτώνει γρήγορα, να δουλεύει σωστά σε κινητό και desktop και να έχει φόρμες που πραγματικά φτάνουν στο inbox σου. Τα απαραίτητα cookies και το consent πρέπει να είναι στημένα σωστά για GDPR.",
        "Βάση SEO. Θα τη δούμε αναλυτικά παρακάτω. Το σημαντικό είναι ότι στήνεται από την πρώτη μέρα και δεν «προστίθεται μετά».",
        "Μέτρηση. Χρειάζονται GA4, conversion tracking για φόρμες και κλήσεις και pixels αν σκοπεύεις να τρέξεις Meta ή Google Ads. Χωρίς αυτά δεν θα ξέρεις ποτέ αν το site φέρνει δουλειά ή απλώς επισκέψεις.",
        "Launch και μετά. Ανακατευθύνσεις από το παλιό site (αν υπάρχει) ώστε να μη χαθεί ό,τι είχες κερδίσει στο Google, έλεγχος indexing και μετά ενημερώσεις, ταχύτητα, ασφάλεια και μικρές αλλαγές όσο αλλάζουν οι υπηρεσίες και οι καμπάνιες σου. Το site είναι κανάλι πωλήσεων, όχι ένα brochure που φτιάχνεις μία φορά και ξεχνάς.",
        { section: "3. Σχεδιασμός που πουλάει: πέντε πράγματα που ελέγχουμε πάντα" },
        "1. Η πρώτη οθόνη στο κινητό λέει τι κάνεις και για ποιον σε μία πρόταση και έχει ορατό κουμπί για την κύρια ενέργεια.",
        "2. Πραγματικές φωτογραφίες του χώρου, της ομάδας και του προϊόντος σε χρήση αντί για stock. Ο επισκέπτης καταλαβαίνει τη διαφορά αμέσως. Εδώ το site συναντά την παραγωγή περιεχομένου: μία μέρα γυρίσματος μπορεί να τροφοδοτήσει και το site και τα social.",
        "3. Απόδειξη κοντά στο κουμπί. Ένα έργο, μια κριτική ή ένα όνομα πελάτη ακριβώς εκεί που ζητάς από κάποιον να σου εμπιστευτεί τα στοιχεία του.",
        "4. Καθαρή διαδρομή. Κάθε σελίδα έχει ένα προφανές επόμενο βήμα. Όχι πέντε κουμπιά που ανταγωνίζονται μεταξύ τους.",
        "5. Τιμή ή εύρος τιμής όπου γίνεται. Όταν δεν υπάρχει καμία ένδειξη, πολλοί φεύγουν αντί να ρωτήσουν. Εμείς βάζουμε τις τιμές μας δημόσια ακριβώς γι' αυτό.",
        { section: "4. SEO από την πρώτη μέρα (και τι σημαίνει «τοπικό» για την Αθήνα)" },
        "Το SEO δεν είναι μια υπηρεσία που αγοράζεις αφού τελειώσει το site. Οι περισσότερες αποφάσεις που επηρεάζουν το αν θα βγεις στο Google παίρνονται κατά την κατασκευή.",
        "Τεχνική βάση: σωστά title tags και meta descriptions σε κάθε σελίδα, γραμμένα για το τι ψάχνει ο πελάτης και όχι για το όνομα της εταιρείας σου· μία κύρια επικεφαλίδα (H1) ανά σελίδα και λογική ιεραρχία από κάτω· εσωτερικά links που συνδέουν υπηρεσίες, έργα και επικοινωνία· schema markup (δομημένα δεδομένα), ώστε η Google να καταλαβαίνει ότι είσαι τοπική επιχείρηση, με ποια διεύθυνση, ωράριο και υπηρεσίες· Core Web Vitals, δηλαδή η ταχύτητα και η σταθερότητα της σελίδας όπως τη μετράει η Google· καθαρά URLs, sitemap και σελίδες που το Googlebot διαβάζει χωρίς εμπόδια.",
        "Περιεχόμενο που rankάρει: μία σελίδα ανά υπηρεσία, με τις λέξεις που χρησιμοποιούν πραγματικά οι πελάτες σου. Αυτές συχνά διαφέρουν από τις λέξεις που χρησιμοποιείς εσύ στο γραφείο. Ο πελάτης γράφει «κατασκευή ιστοσελίδας», όχι «ψηφιακή παρουσία».",
        "Τοπικό SEO για Αθήνα: το όνομα, η διεύθυνση και το τηλέφωνο πρέπει να είναι ίδια παντού — στο site, στο Google Business Profile, στα social και στους καταλόγους. Σελίδες για περιοχές («Γλυφάδα», «Μαρούσι», «Πειραιάς») έχουν νόημα μόνο αν πραγματικά εξυπηρετείς εκεί και έχεις κάτι συγκεκριμένο να πεις για την καθεμία. Δεκάδες αντίγραφα της ίδιας σελίδας με αλλαγμένο όνομα περιοχής δεν βοηθούν και μπορεί να σε βλάψουν. Οι κριτικές στο Google Business Profile και η σύνδεσή τους με το site είναι συχνά πιο σημαντικές για μια τοπική επιχείρηση από οποιοδήποτε «κόλπο».",
        "Ένα ειλικρινές σημείο: κανείς δεν μπορεί να σου εγγυηθεί πρώτη θέση στο Google. Μπορεί όμως να σου στήσει ένα site που δεν έχει τεχνικά εμπόδια, που απαντά καλύτερα από τους ανταγωνιστές σου σε αυτό που ψάχνει ο πελάτης και που μετράει τι συμβαίνει. Από εκεί και πέρα το SEO είναι συνεχής δουλειά.",
        { section: "5. Τι διαμορφώνει την τιμή μιας ιστοσελίδας" },
        "Δύο προσφορές για «ένα site» μπορεί να απέχουν πολύ μεταξύ τους, γιατί συχνά περιγράφουν διαφορετική δουλειά. Αυτά είναι τα βασικά που ανεβάζουν ή κατεβάζουν την τιμή: αριθμός σελίδων και πόση δουλειά θέλει η καθεμία· ποιος γράφει τα κείμενα· φωτογραφίες και video· λειτουργίες (κρατήσεις, πολυγλωσσία, CRM)· e-shop· βάθος SEO· και τι συμβαίνει μετά το launch.",
        "Πώς το τιμολογούμε στην omnidot. Τα νούμερα είναι δημόσια στη σελίδα πακέτων: Landing page €700–1.200· site 4–6 σελίδων περίπου €700 ανά σελίδα (π.χ. ένα site 5 σελίδων κινείται ενδεικτικά γύρω στα €3.500)· e-shop κατόπιν συνεννόησης. Οι τιμές είναι χωρίς ΦΠΑ όπου εφαρμόζεται. Αν αργότερα τρέξεις διαφημίσεις, το ad spend είναι πάντα ξεχωριστό και πληρώνεται απευθείας στις πλατφόρμες. Το scope γράφεται πριν ξεκινήσουμε, ώστε να ξέρεις τι παίρνεις, και το site μένει δικό σου.",
        { section: "6. Landing page ή πολυσέλιδο site;" },
        "Μια landing page αρκεί όταν έχεις μία βασική υπηρεσία ή μία προσφορά, σκοπεύεις να φέρνεις κόσμο κυρίως από διαφημίσεις ή social, και θέλεις να ξεκινήσεις γρήγορα και να δοκιμάσεις την αγορά.",
        "Χρειάζεσαι πολυσέλιδο site όταν έχεις περισσότερες από μία υπηρεσίες που ψάχνονται διαφορετικά στο Google, θέλεις οργανική επισκεψιμότητα σε βάθος χρόνου, και ο πελάτης χρειάζεται να δει έργα, ομάδα και διαδικασία πριν σε εμπιστευτεί.",
        "Πολλές επιχειρήσεις ξεκινούν σωστά με μια landing page και μεγαλώνουν το site όταν φανεί τι δουλεύει. Αυτό είναι απολύτως εντάξει, αρκεί η πρώτη σελίδα να είναι στημένη έτσι ώστε να μπορεί να μεγαλώσει.",
        { section: "7. Το site δεν δουλεύει μόνο του: πώς δένει με social και διαφημίσεις" },
        "Το site είναι το σημείο όπου καταλήγουν όλα τα άλλα κανάλια. Ένα Reel που πήγε καλά ή μια καμπάνια στο Google αξίζουν τόσο όσο η σελίδα στην οποία οδηγούν.",
        "Ένα παράδειγμα από δική μας δουλειά. Για τον Πυργιώτη ΟΕ τρέξαμε Meta και Google με λίγες εικόνες και κείμενα και μια καθαρή διαδρομή προς την ιστοσελίδα. Σε 30 ημέρες στο Meta η σελίδα είχε 1.791 επισκέψεις, με €0,08 η καθεμία και συνολικά €148. Στο Google, το 3,23% όσων είδαν την αγγελία την πάτησαν (298 κλικ σε 9,24 χιλ. εμφανίσεις). Το συμπέρασμα δεν είναι ότι «οι διαφημίσεις κάνουν θαύματα». Όταν η διαφήμιση και η σελίδα προορισμού λένε το ίδιο πράγμα με τον ίδιο τρόπο, κάθε ευρώ πάει πιο μακριά.",
        "Γενική πρακτική για όποιον σχεδιάζει διαφημίσεις: φτιάξε ξεχωριστή landing page για κάθε βασική προσφορά, αντί να στέλνεις όλα τα κλικ στην αρχική· βάλε σωστή μέτρηση (GA4, pixels, Google Ads tags) πριν ξοδέψεις το πρώτο ευρώ· φρόντισε η σελίδα να φορτώνει γρήγορα στο κινητό, γιατί από εκεί έρχεται το μεγαλύτερο μέρος του κόσμου από τα social.",
        { section: "8. Οκτώ ερωτήσεις να κάνεις πριν αναθέσεις το site σου" },
        "1. Ποιος κατέχει το domain, το hosting και τον κώδικα ή το περιεχόμενο μετά την παράδοση;",
        "2. Τι ακριβώς περιλαμβάνει το SEO της προσφοράς; Ζήτα λίστα, όχι μια λέξη.",
        "3. Ποιος γράφει τα κείμενα και ποιος βάζει τις φωτογραφίες;",
        "4. Θα στηθεί μέτρηση (GA4, conversions) και θα έχω πρόσβαση;",
        "5. Τι γίνεται με τα URLs του παλιού site;",
        "6. Πόσοι γύροι διορθώσεων περιλαμβάνονται;",
        "7. Τι κοστίζει μια αλλαγή μετά το launch και ποιος την κάνει;",
        "8. Μπορώ να δω ένα site που φτιάξατε, να το ανοίξω στο κινητό μου και να το βρω στο Google;",
        "Αν οι απαντήσεις είναι θολές, η τελική τιμή συνήθως θα είναι κι αυτή.",
        { section: "9. Τι να ετοιμάσεις πριν ζητήσεις προσφορά" },
        "Τους στόχους σου σε μία πρόταση (π.χ. «θέλω περισσότερα αιτήματα προσφοράς για ανακαινίσεις στα βόρεια προάστια»). Τις υπηρεσίες σου με σειρά προτεραιότητας. 2–3 sites που σου αρέσουν και τι ακριβώς σου αρέσει σε αυτά. 2–3 ανταγωνιστές σου. Ό,τι υλικό έχεις: logo, φωτογραφίες, κείμενα, κριτικές. Πότε θέλεις να είναι έτοιμο και αν σχεδιάζεις διαφημίσεις μετά.",
        "Με αυτά, όποια ομάδα κι αν επιλέξεις μπορεί να σου δώσει μια προσφορά που αντιστοιχεί σε πραγματικό scope και όχι σε μαντεψιά.",
        "Η omnidot φτιάχνει ιστοσελίδες με SEO για επιχειρήσεις στην Αθήνα και remote, και τις δένει με social media και διαφημίσεις σε ένα σύστημα. Στείλε μας brief με στόχους, links και χρονοδιάγραμμα, και θα σου απαντήσουμε με scope, πακέτο και πρώτα βήματα, χωρίς μακροσκελείς παρουσιάσεις πριν καταλάβουμε τη δουλειά.",
      ],
    },
    en: {
      topic: "Web & SEO",
      title:
        "Website creation in Athens: what it actually includes, how it ties to SEO, and what drives the price",
      excerpt:
        "Most new-site conversations start in the wrong place. What real website builds include, where SEO fits, and what moves the price up or down.",
      body: [
        "Most conversations about a new website start in the wrong place. First comes “how much does it cost,” then “I want something modern.” Fair questions — but they don’t tell you whether the site will bring work. A website for a business in Athens — office, shop, clinic, hospitality or B2B — has one job: turn whoever finds it, from Google, Instagram or ads, into someone who calls, messages or buys.",
        "This piece explains what building a site actually includes, where SEO fits, what raises or lowers the price, and which questions to ask whoever builds it — even if that isn’t us.",
        { section: "1. Start from the job the site must do" },
        "Before colours, fonts and “I want a site like that one I saw,” you need three answers:",
        "Who arrives? Someone who searched Google with a specific need, someone who saw a Reel, or someone who clicked an ad?",
        "What should they do? Call, book, request a quote or buy. Pick one primary action and at most one secondary.",
        "What stops them today? Usually trust, unclear price or process, or a site that’s slow and confusing on mobile.",
        "Once you know those, design has something to serve.",
        { section: "2. What a proper website build includes" },
        "A professional site isn’t a template with your logo. In practice the work includes: page architecture (home, one page per core service, about, contact, proof); copy that answers what clients ask on the phone; design hierarchy on the first mobile screen; development that loads fast with forms that actually reach your inbox and GDPR-ready consent; SEO foundations from day one; measurement (GA4, conversions, pixels); and launch plus ongoing updates. The site is a sales channel, not a brochure you build once and forget.",
        { section: "3. Design that sells: five things we always check" },
        "1. The first mobile screen says what you do and for whom in one line, with a clear primary CTA.",
        "2. Real photos of the space, team and product in use — not stock.",
        "3. Proof near the button: a project, a review or a client name where you ask for contact details.",
        "4. A clean path: every page has one obvious next step.",
        "5. Price or a price range when possible. We publish our packages for exactly that reason.",
        { section: "4. SEO from day one (and what “local” means for Athens)" },
        "SEO isn’t a service you buy after the site is finished. Most ranking decisions happen during the build: titles and metas written for what clients search; one H1 per page; internal links; local business schema; Core Web Vitals; clean URLs and a readable sitemap. Content that ranks means one page per service, in the words clients actually type — “website creation,” not “digital presence.”",
        "Local SEO for Athens: name, address and phone must match everywhere — site, Google Business Profile, social and directories. Area pages (“Glyfada,” “Marousi,” “Piraeus”) only help if you truly serve there and have something specific to say. Dozens of cloned pages with a swapped place name can hurt you. Reviews on Google Business Profile often matter more than any trick.",
        "An honest note: nobody can guarantee #1 on Google. They can build a site without technical blockers that answers search intent better than competitors and measures what happens. From there, SEO is ongoing work.",
        { section: "5. What shapes the price of a website" },
        "Two quotes for “a website” can be far apart because they describe different work: number of pages, who writes the copy, photos and video, features, e-shop complexity, SEO depth, and what happens after launch.",
        "How we price at omnidot (public on our packages page): landing page €700–1,200; 4–6 page site about €700 per page (e.g. five pages around €3,500); e-shop by scope. Prices exclude VAT where applicable. Ad spend stays separate. Scope is written before we start, and the site remains yours.",
        { section: "6. Landing page or multi-page site?" },
        "A landing page is enough when you have one core offer, plan to send traffic mainly from ads or social, and want to start fast. You need a multi-page site when several services are searched differently on Google, you want organic traffic over time, and clients need proof before they trust you. Many businesses start with a landing page and grow the site once something works — that’s fine if the first page can scale.",
        { section: "7. The site doesn’t work alone: social and ads" },
        "The site is where every other channel lands. A strong Reel or Google campaign is only as good as the page it sends people to.",
        "One example from our work: for Pyrgiotis OE we ran Meta and Google with a few creatives and a clean path to the site. In 30 days on Meta: 1,791 page visits at €0.08 each on €148 total. On Google, 3.23% of people who saw the ad clicked (298 clicks on 9.24k impressions). Ads don’t work miracles — when the ad and the landing page say the same thing the same way, every euro goes further.",
        "Practical rule: a separate landing page per core offer; measurement before the first euro of spend; fast mobile load for social traffic.",
        { section: "8. Eight questions before you hire anyone" },
        "1. Who owns the domain, hosting and code or content after delivery?",
        "2. What exactly does “SEO” in the quote include? Ask for a list.",
        "3. Who writes the copy and who supplies photos?",
        "4. Will measurement (GA4, conversions) be set up — and will I have access?",
        "5. What happens to old site URLs?",
        "6. How many revision rounds are included?",
        "7. What does a change cost after launch, and who does it?",
        "8. Can I see a site you built, open it on my phone, and find it on Google?",
        "If the answers are vague, the final price usually will be too.",
        { section: "9. What to prepare before you ask for a quote" },
        "Your goal in one sentence. Services in priority order. 2–3 sites you like and why. 2–3 competitors. Assets you already have. When you need it live and whether ads come next. With that, any team can quote real scope — not a guess.",
        "omnidot builds SEO websites for Athens and remote businesses, and ties them to social and ads as one system. Send a brief with goals, links and timeline — we’ll reply with scope, package and first steps, without long decks before we understand the work.",
      ],
    },
  },
];

function toArticle(source: ArticleSource, locale: Locale): Article {
  const copy = locale === "el" ? source.el : source.en;
  return {
    slug: source.slug,
    date: source.date,
    image: source.image,
    readMinutes: source.readMinutes,
    ...copy,
  };
}


export function articleBlockText(block: ArticleBlock): string {
  return typeof block === "string" ? block : block.section;
}

export function isArticleSection(
  block: ArticleBlock,
): block is { section: string } {
  return typeof block === "object" && "section" in block;
}

export function articlesFor(locale: Locale): Article[] {
  return articles.map((item) => toArticle(item, locale));
}

export function articleSlugs(): string[] {
  return articles.map((item) => item.slug);
}

export function articleBySlug(locale: Locale, slug: string): Article | undefined {
  const source = articles.find((a) => a.slug === slug);
  return source ? toArticle(source, locale) : undefined;
}

export function formatArticleDate(locale: Locale, iso: string): string {
  const date = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat(locale === "el" ? "el-GR" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
