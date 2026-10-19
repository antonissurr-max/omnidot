import type { Locale } from "./i18n";
import {
  type ArticleBlock,
  slugifyHeading,
} from "./articleBlocks";

export type { ArticleBlock, InlinePart } from "./articleBlocks";
export {
  extractH2s,
  isSourcesHeading,
  midCtaAfterIndex,
  parseInlineParts,
  plainTextFromBlocks,
  slugifyHeading,
  splitLeadIn,
  splitUrlToken,
} from "./articleBlocks";

/**
 * How to add an article (chat workflow):
 * 1. User sends title, body (EL and/or EN), topic, optional date, and a thumbnail image.
 * 2. Save the image under `public/images/articles/<slug>.jpg` (or .png/.webp).
 * 3. Append one entry to `articles` below with typed body blocks.
 * 4. List page shows the thumbnail; detail page renders the reading template.
 */
export type Article = {
  slug: string;
  date: string;
  dateModified?: string;
  /** List thumbnail — file under /public/images/articles/ */
  image: string;
  topic: string;
  title: string;
  /** Optional dek under the H1 on the detail page */
  subtitle?: string;
  excerpt: string;
  /** Optional document <title>; fallback `${title} — omnidot.` */
  seoTitle?: string;
  /** Optional meta description (≤155); fallback word-trimmed excerpt */
  seoDescription?: string;
  readMinutes: number;
  /** “Με μια ματιά” takeaways under the intro */
  takeaways?: string[];
  body: ArticleBlock[];
  relatedServices?: { label: string; href: string; blurb: string }[];
};

type ArticleSource = {
  slug: string;
  date: string;
  dateModified?: string;
  image: string;
  readMinutes: number;
  en: Omit<Article, "slug" | "date" | "dateModified" | "image" | "readMinutes">;
  el: Omit<Article, "slug" | "date" | "dateModified" | "image" | "readMinutes">;
};

function h2(text: string): ArticleBlock {
  return { type: "h2", text, id: slugifyHeading(text) };
}

function h3(text: string): ArticleBlock {
  return { type: "h3", text, id: slugifyHeading(text) };
}

function p(text: string): ArticleBlock {
  return { type: "p", text };
}

const articles: ArticleSource[] = [
  {
    slug: "dimiourgia-istoselidas-athina",
    date: "2026-10-07",
    image: "/images/articles/dimiourgia-istoselidas-athina.jpg",
    readMinutes: 14,
    el: {
      topic: "Web & SEO",
      title: "Δημιουργία ιστοσελίδας στην Αθήνα",
      subtitle:
        "τι περιλαμβάνει στην πράξη, πώς δένει με το SEO και τι καθορίζει την τιμή",
      seoTitle: "Δημιουργία ιστοσελίδας στην Αθήνα: SEO και τιμή — omnidot.",
      seoDescription:
        "Τι περιλαμβάνει στην πράξη η κατασκευή ιστοσελίδας στην Αθήνα, πώς δένει με το SEO και τι καθορίζει την τιμή — από την omnidot.",
      excerpt:
        "Οι περισσότερες συζητήσεις για καινούργιο site ξεκινούν από το λάθος σημείο. Τι περιλαμβάνει πραγματικά η κατασκευή, πού μπαίνει το SEO και τι ανεβάζει την τιμή.",
      takeaways: [
        "Ξεκίνα από το τι πρέπει να κάνει το site, όχι από το design.",
        "Το SEO στήνεται από την πρώτη μέρα, δεν προστίθεται μετά.",
        "Η τιμή εξαρτάται από σελίδες, κείμενα και λειτουργίες.",
        "Ζήτα ξεκάθαρες απαντήσεις πριν αναθέσεις το site.",
      ],
      relatedServices: [
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
      body: [
        p(
          "Οι περισσότερες συζητήσεις για καινούργιο site ξεκινούν από το λάθος σημείο. Πρώτα έρχεται το «πόσο κοστίζει» και αμέσως μετά το «θέλω κάτι μοντέρνο». Αυτά είναι εύλογα ερωτήματα, όμως δεν σου λένε αν το site θα σου φέρει δουλειά. Μια ιστοσελίδα για επιχείρηση στην Αθήνα, είτε είναι γραφείο, κατάστημα, ιατρείο, εστίαση ή B2B εταιρεία, έχει μία δουλειά: να μετατρέπει όποιον τη βρίσκει, από Google, Instagram ή διαφήμιση, σε κάποιον που σε παίρνει τηλέφωνο, σου στέλνει μήνυμα ή αγοράζει.",
        ),
        p(
          "Σε αυτό το κείμενο εξηγούμε τι πραγματικά περιλαμβάνει η κατασκευή ενός site, πού μπαίνει το SEO, τι ανεβάζει ή κατεβάζει την τιμή και ποιες ερωτήσεις αξίζει να κάνεις σε όποιον σου το φτιάξει, ακόμα κι αν αυτός δεν είμαστε εμείς.",
        ),
        h2("1. Ξεκίνα από τη δουλειά που θα κάνει το site"),
        p(
          "Πριν από χρώματα, γραμματοσειρές και «θέλω σαν αυτό το site που είδα», χρειάζονται τρεις απαντήσεις:",
        ),
        h3("Ποιος έρχεται;"),
        p(
          "Κάποιος που σε έψαξε στο Google με συγκεκριμένη ανάγκη («λογιστής Χαλάνδρι», «ψυχρή άσφαλτος για λακκούβες»), κάποιος που είδε ένα Reel σου ή κάποιος που πάτησε μια διαφήμιση;",
        ),
        h3("Τι θέλεις να κάνει;"),
        p(
          "Να καλέσει, να κλείσει ραντεβού, να ζητήσει προσφορά ή να αγοράσει. Διάλεξε μία κύρια ενέργεια και το πολύ μία δεύτερη.",
        ),
        h3("Τι τον σταματά σήμερα;"),
        p(
          "Συνήθως είναι η έλλειψη εμπιστοσύνης, η ασάφεια για την τιμή ή τη διαδικασία, ή ένα site που στο κινητό είναι αργό και μπερδεμένο.",
        ),
        p("Όταν τα ξέρεις αυτά, το design έχει πλέον κάτι να εξυπηρετήσει."),
        h2("2. Τι περιλαμβάνει μια σωστή κατασκευή ιστοσελίδας"),
        p(
          "Ένα επαγγελματικό site δεν είναι ένα template με το logo σου. Στην πράξη η δουλειά έχει αυτά τα κομμάτια:",
        ),
        p(
          "Δομή σελίδων (αρχιτεκτονική). Ποιες σελίδες χρειάζονται και γιατί. Για τις περισσότερες τοπικές επιχειρήσεις αυτό σημαίνει αρχική, μία σελίδα ανά βασική υπηρεσία, σελίδα «ποιοι είμαστε» με πραγματικούς ανθρώπους και χώρο, επικοινωνία και, αν έχεις, σελίδα με δουλειές ή αποτελέσματα. Μία σελίδα ανά υπηρεσία δεν μπαίνει για να «φουσκώσει» το site. Υπάρχει επειδή κάθε υπηρεσία ψάχγεται διαφορετικά στο Google.",
        ),
        p(
          "Κείμενα. Είναι το πιο υποτιμημένο κομμάτι. Τα κείμενα πρέπει να απαντούν σε ό,τι ρωτάει ο πελάτης στο τηλέφωνο: τι ακριβώς κάνεις, για ποιον, πώς δουλεύεις, πόσο περίπου κοστίζει και τι γίνεται μετά. Γράφονται για ανθρώπους και δομούνται ώστε να τα καταλαβαίνει και η Google.",
        ),
        p(
          "Σχεδιασμός. Δεν μετράει μόνο το «ωραίο». Μετράει η ιεραρχία: τι βλέπει ο επισκέπτης στην πρώτη οθόνη του κινητού, πού βρίσκεται το κουμπί επικοινωνίας και πού μπαίνει η απόδειξη ότι ξέρεις τη δουλειά σου (έργα, κριτικές, γνωστοί πελάτες). Ακολουθούμε την αισθητική και τον τόνο του brand σου, δεν τον αντικαθιστούμε με ένα trend.",
        ),
        p(
          "Ανάπτυξη. Το site πρέπει να φορτώνει γρήγορα, να δουλεύει σωστά σε κινητό και desktop και να έχει φόρμες που πραγματικά φτάνουν στο inbox σου. Τα απαραίτητα cookies και το consent πρέπει να είναι στημένα σωστά για GDPR.",
        ),
        p(
          "Βάση SEO. Θα τη δούμε αναλυτικά παρακάτω. Το σημαντικό είναι ότι στήνεται από την πρώτη μέρα και δεν «προστίθεται μετά».",
        ),
        p(
          "Μέτρηση. Χρειάζονται GA4, conversion tracking για φόρμες και κλήσεις και pixels αν σκοπεύεις να τρέξεις Meta ή Google Ads. Χωρίς αυτά δεν θα ξέρεις ποτέ αν το site φέρνει δουλειά ή απλώς επισκέψεις.",
        ),
        p(
          "Launch και μετά. Ανακατευθύνσεις από το παλιό site (αν υπάρχει) ώστε να μη χαθεί ό,τι είχες κερδίσει στο Google, έλεγχος indexing και μετά ενημερώσεις, ταχύτητα, ασφάλεια και μικρές αλλαγές όσο αλλάζουν οι υπηρεσίες και οι καμπάνιες σου. Το site είναι κανάλι πωλήσεων, όχι ένα brochure που φτιάχνεις μία φορά και ξεχνάς.",
        ),
        h2("3. Σχεδιασμός που πουλάει: πέντε πράγματα που ελέγχουμε πάντα"),
        {
          type: "ol",
          items: [
            "Η πρώτη οθόνη στο κινητό λέει τι κάνεις και για ποιον σε μία πρόταση και έχει ορατό κουμπί για την κύρια ενέργεια.",
            "Πραγματικές φωτογραφίες του χώρου, της ομάδας και του προϊόντος σε χρήση αντί για stock. Ο επισκέπτης καταλαβαίνει τη διαφορά αμέσως. Εδώ το site συναντά την παραγωγή περιεχομένου: μία μέρα γυρίσματος μπορεί να τροφοδοτήσει και το site και τα social.",
            "Απόδειξη κοντά στο κουμπί. Ένα έργο, μια κριτική ή ένα όνομα πελάτη ακριβώς εκεί που ζητάς από κάποιον να σου εμπιστευτεί τα στοιχεία του.",
            "Καθαρή διαδρομή. Κάθε σελίδα έχει ένα προφανές επόμενο βήμα. Όχι πέντε κουμπιά που ανταγωνίζονται μεταξύ τους.",
            "Τιμή ή εύρος τιμής όπου γίνεται. Όταν δεν υπάρχει καμία ένδειξη, πολλοί φεύγουν αντί να ρωτήσουν. Μια καθαρή ένδειξη ή πρόσκληση σε σύντομη συζήτηση συχνά δουλεύει καλύτερα από μια κενή φόρμα προσφοράς.",
          ],
        },
        h2("4. SEO από την πρώτη μέρα (και τι σημαίνει «τοπικό» για την Αθήνα)"),
        p(
          "Το SEO δεν είναι μια υπηρεσία που αγοράζεις αφού τελειώσει το site. Οι περισσότερες αποφάσεις που επηρεάζουν το αν θα βγεις στο Google παίρνονται κατά την κατασκευή.",
        ),
        p(
          "Τεχνική βάση: σωστά title tags και meta descriptions σε κάθε σελίδα, γραμμένα για το τι ψάχνει ο πελάτης και όχι για το όνομα της εταιρείας σου· μία κύρια επικεφαλίδα (H1) ανά σελίδα και λογική ιεραρχία από κάτω· εσωτερικά links που συνδέουν υπηρεσίες, έργα και επικοινωνία· schema markup (δομημένα δεδομένα), ώστε η Google να καταλαβαίνει ότι είσαι τοπική επιχείρηση, με ποια διεύθυνση, ωράριο και υπηρεσίες· Core Web Vitals, δηλαδή η ταχύτητα και η σταθερότητα της σελίδας όπως τη μετράει η Google· καθαρά URLs, sitemap και σελίδες που το Googlebot διαβάζει χωρίς εμπόδια.",
        ),
        p(
          "Περιεχόμενο που rankάρει: μία σελίδα ανά υπηρεσία, με τις λέξεις που χρησιμοποιούν πραγματικά οι πελάτες σου. Αυτές συχνά διαφέρουν από τις λέξεις που χρησιμοποιείς εσύ στο γραφείο. Ο πελάτης γράφει «κατασκευή ιστοσελίδας», όχι «ψηφιακή παρουσία».",
        ),
        p(
          "Τοπικό SEO για Αθήνα: το όνομα, η διεύθυνση και το τηλέφωνο πρέπει να είναι ίδια παντού — στο site, στο Google Business Profile, στα social και στους καταλόγους. Σελίδες για περιοχές («Γλυφάδα», «Μαρούσι», «Πειραιάς») έχουν νόημα μόνο αν πραγματικά εξυπηρετείς εκεί και έχεις κάτι συγκεκριμένο να πεις για την καθεμία. Δεκάδες αντίγραφα της ίδιας σελίδας με αλλαγμένο όνομα περιοχής δεν βοηθούν και μπορεί να σε βλάψουν. Οι κριτικές στο Google Business Profile και η σύνδεσή τους με το site είναι συχνά πιο σημαντικές για μια τοπική επιχείρηση από οποιοδήποτε «κόλπο».",
        ),
        {
          type: "callout",
          tone: "info",
          text: "Ένα ειλικρινές σημείο: κανείς δεν μπορεί να σου εγγυηθεί πρώτη θέση στο Google. Μπορεί όμως να σου στήσει ένα site που δεν έχει τεχνικά εμπόδια, που απαντά καλύτερα από τους ανταγωνιστές σου σε αυτό που ψάχνει ο πελάτης και που μετράει τι συμβαίνει. Από εκεί και πέρα το SEO είναι συνεχής δουλειά.",
        },
        h2("5. Τι διαμορφώνει την τιμή μιας ιστοσελίδας"),
        p(
          "Δύο προσφορές για «ένα site» μπορεί να απέχουν πολύ μεταξύ τους, γιατί συχνά περιγράφουν διαφορετική δουλειά. Αυτά είναι τα βασικά που ανεβάζουν ή κατεβάζουν την τιμή: αριθμός σελίδων και πόση δουλειά θέλει η καθεμία· ποιος γράφει τα κείμενα· φωτογραφίες και video· λειτουργίες (κρατήσεις, πολυγλωσσία, CRM)· e-shop· βάθος SEO· και τι συμβαίνει μετά το launch.",
        ),
        p(
          "Στην omnidot κάνουμε πρόταση στα μέτρα κάθε πελάτη, με βάση σελίδες, κείμενα και λειτουργίες. Δείτε την υπηρεσία κατασκευής ιστοσελίδας: https://omnidot.gr/el/web/",
        ),
        h2("6. Landing page ή πολυσέλιδο site;"),
        p(
          "Μια landing page αρκεί όταν έχεις μία βασική υπηρεσία ή μία προσφορά, σκοπεύεις να φέρνεις κόσμο κυρίως από διαφημίσεις ή social, και θέλεις να ξεκινήσεις γρήγορα και να δοκιμάσεις την αγορά.",
        ),
        p(
          "Χρειάζεσαι πολυσέλιδο site όταν έχεις περισσότερες από μία υπηρεσίες που ψάχνονται διαφορετικά στο Google, θέλεις οργανική επισκεψιμότητα σε βάθος χρόνου, και ο πελάτης χρειάζεται να δει έργα, ομάδα και διαδικασία πριν σε εμπιστευτεί.",
        ),
        {
          type: "table",
          caption: "Πότε ταιριάζει το καθένα",
          headers: ["", "Landing page", "Πολυσέλιδο site"],
          rows: [
            [
              "Πότε",
              "Μία βασική υπηρεσία ή προσφορά",
              "Περισσότερες υπηρεσίες που ψάχνονται διαφορετικά",
            ],
            [
              "Κίνηση",
              "Κυρίως από διαφημίσεις ή social",
              "Οργανική επισκεψιμότητα σε βάθος χρόνου",
            ],
            [
              "Στόχος",
              "Να ξεκινήσεις γρήγορα και να δοκιμάσεις την αγορά",
              "Ο πελάτης να δει έργα, ομάδα και διαδικασία",
            ],
          ],
        },
        p(
          "Πολλές επιχειρήσεις ξεκινούν σωστά με μια landing page και μεγαλώνουν το site όταν φανεί τι δουλεύει. Αυτό είναι απολύτως εντάξει, αρκεί η πρώτη σελίδα να είναι στημένη έτσι ώστε να μπορεί να μεγαλώσει.",
        ),
        h2("7. Το site δεν δουλεύει μόνο του: πώς δένει με social και διαφημίσεις"),
        p(
          "Το site είναι το σημείο όπου καταλήγουν όλα τα άλλα κανάλια. Ένα Reel που πήγε καλά ή μια καμπάνια στο Google αξίζουν τόσο όσο η σελίδα στην οποία οδηγούν.",
        ),
        p(
          "Ένα παράδειγμα από δική μας δουλειά. Για τον Πυργιώτη ΟΕ τρέξαμε Meta και Google με λίγες εικόνες και κείμενα και μια καθαρή διαδρομή προς την ιστοσελίδα. Σε 30 ημέρες στο Meta η σελίδα είχε 1.791 επισκέψεις, με €0,08 η καθεμία και συνολικά €148. Στο Google, το 3,23% όσων είδαν την αγγελία την πάτησαν (298 κλικ σε 9,24 χιλ. εμφανίσεις). Το συμπέρασμα δεν είναι ότι «οι διαφημίσεις κάνουν θαύματα». Όταν η διαφήμιση και η σελίδα προορισμού λένε το ίδιο πράγμα με τον ίδιο τρόπο, κάθε ευρώ πάει πιο μακριά.",
        ),
        p(
          "Γενική πρακτική για όποιον σχεδιάζει διαφημίσεις: φτιάξε ξεχωριστή landing page για κάθε βασική προσφορά, αντί να στέλνεις όλα τα κλικ στην αρχική· βάλε σωστή μέτρηση (GA4, pixels, Google Ads tags) πριν ξοδέψεις το πρώτο ευρώ· φρόντισε η σελίδα να φορτώνει γρήγορα στο κινητό, γιατί από εκεί έρχεται το μεγαλύτερο μέρος του κόσμου από τα social.",
        ),
        h2("8. Οκτώ ερωτήσεις να κάνεις πριν αναθέσεις το site σου"),
        {
          type: "checklist",
          items: [
            "Ποιος κατέχει το domain, το hosting και τον κώδικα ή το περιεχόμενο μετά την παράδοση;",
            "Τι ακριβώς περιλαμβάνει το SEO της προσφοράς; Ζήτα λίστα, όχι μια λέξη.",
            "Ποιος γράφει τα κείμενα και ποιος βάζει τις φωτογραφίες;",
            "Θα στηθεί μέτρηση (GA4, conversions) και θα έχω πρόσβαση;",
            "Τι γίνεται με τα URLs του παλιού site;",
            "Πόσοι γύροι διορθώσεων περιλαμβάνονται;",
            "Τι κοστίζει μια αλλαγή μετά το launch και ποιος την κάνει;",
            "Μπορώ να δω ένα site που φτιάξατε, να το ανοίξω στο κινητό μου και να το βρω στο Google;",
          ],
        },
        p(
          "Αν οι απαντήσεις είναι θολές, η τελική τιμή συνήθως θα είναι κι αυτή.",
        ),
        h2("9. Τι να ετοιμάσεις πριν ζητήσεις προσφορά"),
        p(
          "Τους στόχους σου σε μία πρόταση (π.χ. «θέλω περισσότερα αιτήματα προσφοράς για ανακαινίσεις στα βόρεια προάστια»). Τις υπηρεσίες σου με σειρά προτεραιότητας. 2–3 sites που σου αρέσουν και τι ακριβώς σου αρέσει σε αυτά. 2–3 ανταγωνιστές σου. Ό,τι υλικό έχεις: logo, φωτογραφίες, κείμενα, κριτικές. Πότε θέλεις να είναι έτοιμο και αν σχεδιάζεις διαφημίσεις μετά.",
        ),
        p(
          "Με αυτά, όποια ομάδα κι αν επιλέξεις μπορεί να σου δώσει μια προσφορά που αντιστοιχεί σε πραγματικό scope και όχι σε μαντεψιά.",
        ),
        p(
          "Η omnidot φτιάχνει ιστοσελίδες με SEO για επιχειρήσεις στην Αθήνα και σε όλη την Ελλάδα, και τις δένει με social media και διαφημίσεις σε ένα σύστημα. Στείλε μας brief με στόχους, links και χρονοδιάγραμμα, και θα σου απαντήσουμε με scope, πακέτο και πρώτα βήματα, χωρίς μακροσκελείς παρουσιάσεις πριν καταλάβουμε τη δουλειά.",
        ),
      ],
    },
    en: {
      topic: "Web & SEO",
      title: "Website creation in Athens",
      subtitle:
        "what it actually includes, how it ties to SEO, and what drives the price",
      seoTitle: "Website creation in Athens: SEO and price — omnidot.",
      seoDescription:
        "What a real website build in Athens includes, where SEO fits from day one, and what drives the price — from omnidot.",
      excerpt:
        "Most new-site conversations start in the wrong place. What real website builds include, where SEO fits, and what moves the price up or down.",
      takeaways: [
        "Start from what the site must do, not from the design.",
        "SEO is built in from day one — it isn’t bolted on later.",
        "Price depends on pages, copy and features.",
        "Ask clear questions before you hire anyone.",
      ],
      relatedServices: [
        {
          label: "Social Media Management",
          href: "/social/",
          blurb: "Strategy, content, community and monthly reporting.",
        },
        {
          label: "Content Creation",
          href: "/content/",
          blurb: "Photo, video and Reels from concept to post-ready.",
        },
        {
          label: "Performance Marketing",
          href: "/performance/",
          blurb: "Meta Ads and Google Ads with clear cost and return.",
        },
      ],
      body: [
        p(
          "Most conversations about a new website start in the wrong place. First comes “how much does it cost,” then “I want something modern.” Fair questions — but they don’t tell you whether the site will bring work. A website for a business in Athens — office, shop, clinic, hospitality or B2B — has one job: turn whoever finds it, from Google, Instagram or ads, into someone who calls, messages or buys.",
        ),
        p(
          "This piece explains what building a site actually includes, where SEO fits, what raises or lowers the price, and which questions to ask whoever builds it — even if that isn’t us.",
        ),
        h2("1. Start from the job the site must do"),
        p(
          "Before colours, fonts and “I want a site like that one I saw,” you need three answers:",
        ),
        h3("Who arrives?"),
        p(
          "Someone who searched Google with a specific need, someone who saw a Reel, or someone who clicked an ad?",
        ),
        h3("What should they do?"),
        p(
          "Call, book, request a quote or buy. Pick one primary action and at most one secondary.",
        ),
        h3("What stops them today?"),
        p(
          "Usually trust, unclear price or process, or a site that’s slow and confusing on mobile.",
        ),
        p("Once you know those, design has something to serve."),
        h2("2. What a proper website build includes"),
        p(
          "A professional site isn’t a template with your logo. In practice the work includes page architecture, copy, design hierarchy, development, SEO foundations, measurement, and launch plus ongoing updates.",
        ),
        p(
          "Page architecture. Which pages you need and why — home, one page per core service, about, contact, proof.",
        ),
        p(
          "Copy. Answers what clients ask on the phone, written for people and structured so Google can follow.",
        ),
        p(
          "Design. Hierarchy on the first mobile screen, a clear CTA, and proof near the ask.",
        ),
        p(
          "Development. Fast load, working forms, GDPR-ready consent.",
        ),
        p(
          "SEO foundations. Built from day one — not added later.",
        ),
        p(
          "Measurement. GA4, conversions, pixels when you plan ads.",
        ),
        p(
          "Launch and after. Redirects, indexing checks, updates as products and campaigns change.",
        ),
        h2("3. Design that sells: five things we always check"),
        {
          type: "ol",
          items: [
            "The first mobile screen says what you do and for whom in one line, with a clear primary CTA.",
            "Real photos of the space, team and product in use — not stock.",
            "Proof near the button: a project, a review or a client name where you ask for contact details.",
            "A clean path: every page has one obvious next step.",
            "Price or a price range when possible. When there’s no indication at all, many people leave instead of asking. A clear hint or an invite to a short conversation often works better than a blank quote form.",
          ],
        },
        h2("4. SEO from day one (and what “local” means for Athens)"),
        p(
          "SEO isn’t a service you buy after the site is finished. Most ranking decisions happen during the build.",
        ),
        p(
          "Technical base: titles and metas for what clients search; one H1 per page; internal links; local business schema; Core Web Vitals; clean URLs and a readable sitemap.",
        ),
        p(
          "Content that ranks means one page per service, in the words clients actually type — “website creation,” not “digital presence.”",
        ),
        p(
          "Local SEO for Athens: name, address and phone must match everywhere. Area pages only help if you truly serve there. Reviews on Google Business Profile often matter more than any trick.",
        ),
        {
          type: "callout",
          tone: "info",
          text: "An honest note: nobody can guarantee #1 on Google. They can build a site without technical blockers that answers search intent better than competitors and measures what happens. From there, SEO is ongoing work.",
        },
        h2("5. What shapes the price of a website"),
        p(
          "Two quotes for “a website” can be far apart because they describe different work: number of pages, who writes the copy, photos and video, features, e-shop complexity, SEO depth, and what happens after launch.",
        ),
        p(
          "At omnidot we quote each project on its own scope — pages, copy and features. See our website development service: https://omnidot.gr/web/",
        ),
        h2("6. Landing page or multi-page site?"),
        p(
          "A landing page is enough when you have one core offer, plan to send traffic mainly from ads or social, and want to start fast.",
        ),
        p(
          "You need a multi-page site when several services are searched differently on Google, you want organic traffic over time, and clients need proof before they trust you.",
        ),
        {
          type: "table",
          caption: "When each fits",
          headers: ["", "Landing page", "Multi-page site"],
          rows: [
            [
              "When",
              "One core offer",
              "Several services searched differently",
            ],
            [
              "Traffic",
              "Mostly from ads or social",
              "Organic traffic over time",
            ],
            [
              "Goal",
              "Start fast and test the market",
              "Clients need proof before they trust you",
            ],
          ],
        },
        p(
          "Many businesses start with a landing page and grow the site once something works — that’s fine if the first page can scale.",
        ),
        h2("7. The site doesn’t work alone: social and ads"),
        p(
          "The site is where every other channel lands. A strong Reel or Google campaign is only as good as the page it sends people to.",
        ),
        p(
          "One example from our work: for Pyrgiotis OE we ran Meta and Google with a few creatives and a clean path to the site. In 30 days on Meta: 1,791 page visits at €0.08 each on €148 total. On Google, 3.23% of people who saw the ad clicked (298 clicks on 9.24k impressions). Ads don’t work miracles — when the ad and the landing page say the same thing the same way, every euro goes further.",
        ),
        p(
          "Practical rule: a separate landing page per core offer; measurement before the first euro of spend; fast mobile load for social traffic.",
        ),
        h2("8. Eight questions before you hire anyone"),
        {
          type: "checklist",
          items: [
            "Who owns the domain, hosting and code or content after delivery?",
            "What exactly does “SEO” in the quote include? Ask for a list.",
            "Who writes the copy and who supplies photos?",
            "Will measurement (GA4, conversions) be set up — and will I have access?",
            "What happens to old site URLs?",
            "How many revision rounds are included?",
            "What does a change cost after launch, and who does it?",
            "Can I see a site you built, open it on my phone, and find it on Google?",
          ],
        },
        p("If the answers are vague, the final price usually will be too."),
        h2("9. What to prepare before you ask for a quote"),
        p(
          "Your goal in one sentence. Services in priority order. 2–3 sites you like and why. 2–3 competitors. Assets you already have. When you need it live and whether ads come next. With that, any team can quote real scope — not a guess.",
        ),
        p(
          "omnidot builds SEO websites for businesses in Athens and across Greece, and ties them to social and ads as one system. Send a brief with goals, links and timeline — we’ll reply with scope, package and first steps, without long decks before we understand the work.",
        ),
      ],
    },
  },
  {
    slug: "meta-one-links",
    date: "2026-10-14",
    image: "/images/articles/meta-one-links.jpg",
    readMinutes: 9,
    el: {
      topic: "Social Media",
      title:
        "Meta One: αξίζει να πληρώσεις για links σε Instagram/Facebook;",
      seoTitle: "Meta One: links σε Instagram & Facebook | omnidot.",
      seoDescription:
        "Μετά το Meta One, τα links σε Instagram και Facebook δεν είναι αυτονόητα. Τι άλλαξε, τι κοστίζει και αν αξίζει για μικρή επιχείρηση.",
      excerpt:
        "Από τα μέσα Σεπτεμβρίου η Meta πουλάει συνδρομές Meta One για επιχειρήσεις, και τα clickable links σε posts δεν είναι πια αυτονόητα. Δεν χρειάζεται να πληρώσεις αμέσως — μέτρα τι φέρνουν τα links σου.",
      takeaways: [
        "Δεν χρειάζεται να πληρώσεις αμέσως· πρώτα μέτρα τι φέρνουν τα links.",
        "Στο Instagram, clickable links σε posts θέλουν Meta One Advanced ή μεγαλύτερο.",
        "Στο Facebook, πολλές σελίδες έχουν έως 2 posts με link τον μήνα χωρίς συνδρομή.",
        "Με λίγα links τον μήνα, η σελίδα που ανοίγει μετράει περισσότερο.",
      ],
      relatedServices: [
        {
          label: "Διαχείριση Social Media",
          href: "/el/social/",
          blurb: "Στρατηγική, περιεχόμενο, community και μηνιαίο reporting.",
        },
        {
          label: "Κατασκευή Ιστοσελίδας",
          href: "/el/web/",
          blurb: "Landing pages και sites που φορτώνουν γρήγορα και πουλάνε.",
        },
        {
          label: "Performance Marketing",
          href: "/el/performance/",
          blurb: "Meta Ads και Google Ads με καθαρό κόστος και απόδοση.",
        },
      ],
      body: [
        p(
          "Από τα μέσα Σεπτεμβρίου η Meta πουλάει συνδρομές Meta One για επιχειρήσεις, και τα clickable links σε posts δεν είναι πια αυτονόητα. Στο Instagram ανοίγουν μόνο με πληρωμένο πακέτο. Στο Facebook, όσες σελίδες βλέπουν το νέο όριο έχουν δύο posts με link τον μήνα χωρίς συνδρομή.",
        ),
        p(
          "Το σύντομο συμπέρασμα: δεν χρειάζεται να πληρώσεις αμέσως. Μέτρα τι φέρνουν τα links σου και φρόντισε να καταλήγουν σε σελίδα που δουλεύει.",
        ),
        h2("Τι άλλαξε τον Σεπτέμβριο του 2026"),
        p(
          "Στις 15 Σεπτεμβρίου 2026 η Meta ανακοίνωσε το Meta One, μια συνδρομητική υπηρεσία που προσθέτει λειτουργίες πάνω από τις δωρεάν εφαρμογές της [1]. Η εταιρεία γράφει ότι η βασική χρήση σε Instagram, Facebook, WhatsApp και Meta AI μένει δωρεάν.",
        ),
        p(
          "Υπάρχουν πακέτα για ιδιώτες και ξεχωριστά για creators και επιχειρήσεις, όπως κατέγραψε και το TechCrunch [8]. Εδώ μας ενδιαφέρουν μόνο τα δεύτερα. Σύμφωνα με τη σελίδα της Meta για επιχειρήσεις, η τιμή είναι ανά προφίλ: κάθε πακέτο καλύπτει έναν λογαριασμό [2].",
        ),
        p(
          "Η ίδια σελίδα αναφέρει ότι οι δυνατότητες του Meta Verified περνούν σταδιακά στο Meta One. Για όσους έχουν ήδη Meta Verified, προς το παρόν δεν αλλάζει τίποτα [2].",
        ),
        p(
          "Για την Ελλάδα, το κρίσιμο είναι η διάθεση. Η ανακοίνωση μιλά για σταδιακή διάθεση σε όλο τον κόσμο, με πακέτα, τιμές και παροχές που διαφέρουν ανά περιοχή, εφαρμογή και λογαριασμό [1]. Το Help Center της Meta, όμως, περιγράφει ακόμα το Meta One ως υπηρεσία σε περιορισμένη δοκιμή, που δεν είναι διαθέσιμη παντού [4]. Ο αξιόπιστος έλεγχος γίνεται μέσα από την εφαρμογή, στον λογαριασμό σου.",
        ),
        h2("Τα 4 πακέτα για επιχειρήσεις, απλά"),
        p(
          "Οι τιμές σε δολάρια προέρχονται από τη Meta [1] [2]. Οι τιμές σε ευρώ προέρχονται από δημοσιεύματα για την ευρωπαϊκή τιμολόγηση, όπως του FreakUnboxer και του Search Engine Watch [7] [9], και δεν τις βρήκαμε σε σελίδα της Meta. Ελέγξτε την τρέχουσα τιμή για τον λογαριασμό σας μέσα στην εφαρμογή.",
        ),
        {
          type: "table",
          caption: "Πακέτα Meta One για επιχειρήσεις",
          headers: ["Πακέτο", "Τιμή τον μήνα", "Τι μετράει για μικρή επιχείρηση"],
          rows: [
            [
              "Essential",
              "από $14,99 (σύμφωνα με δημοσιεύματα, από €16,99 στην Ευρώπη)",
              "Verified badge, προστασία από πλαστά προφίλ, verified channel στο WhatsApp Business, περισσότερες απαντήσεις από το Meta Business Agent. Δεν δίνει links σε posts.",
            ],
            [
              "Advanced",
              "από $49,99 (σύμφωνα με δημοσιεύματα, από €54,99)",
              "Links σε οργανικά posts και Reels, προγραμματισμός Stories έως 30 ημέρες πριν, εξαγωγή analytics, πρόσβαση ομάδας στο Instagram χωρίς κοινό κωδικό.",
            ],
            [
              "Expert",
              "από περίπου $149 (σύμφωνα με δημοσιεύματα, από €169)",
              "Υψηλότερα όρια και ανθρώπινη υποστήριξη λογαριασμού, για ομάδες με πολλά posts.",
            ],
            [
              "Max",
              "από περίπου $499 (σύμφωνα με δημοσιεύματα, από €549)",
              "Τα υψηλότερα όρια, για ομάδες που δουλεύουν σε μεγάλη κλίμακα.",
            ],
          ],
        },
        p(
          "Το Meta Business Agent είναι εργαλείο AI που απαντά σε μηνύματα πελατών στο WhatsApp Business. Ξεκινά δωρεάν και η συνδρομή δίνει περισσότερες απαντήσεις [2].",
        ),
        p(
          "Για τα Expert και Max, η ανακοίνωση γράφει $149 και $499, ενώ το Help Center του Facebook γράφει $149,99 και $499,99 [3]. Γι' αυτό τα αναφέρουμε ως «περίπου». Για τις περισσότερες μικρές επιχειρήσεις, αυτά τα δύο πακέτα δεν χρειάζονται.",
        ),
        h2("Links: τι ισχύει τώρα σε Instagram και Facebook"),
        p(
          "Instagram. Η Meta επιβεβαιώνει ότι το Advanced περιλαμβάνει links σε οργανικά posts και Reels, χωρίς να δίνει αριθμό στην ανακοίνωσή της [2]. Τα όρια τα δημοσίευσε το Social Media Today: σύμφωνα με το site, το Advanced δίνει links σε 4 posts και 4 Reels τον μήνα, το Expert σε 8 και 8 και το Max σε 12 και 12 [5]. Το link στο bio μένει δωρεάν.",
        ),
        p(
          "Facebook. Στις 17 Σεπτεμβρίου το Social Media Today έγραψε ότι περισσότερες σελίδες βλέπουν ειδοποίηση για όριο δύο posts με link τον μήνα, αν δεν πληρώνουν [6]. Σύμφωνα με το ίδιο δημοσίευμα, η Meta δοκίμαζε τέτοιο όριο σε ορισμένες σελίδες από τον Δεκέμβριο του 2025, και οι σελίδες εκδοτών εξαιρούνται.",
        ),
        p(
          "Το Help Center του Facebook περιγράφει πλέον τους κανόνες [3]. Αν η σελίδα σου βλέπει το όριο, μπορείς να βάλεις links σε έως 2 οργανικά posts ή σχόλια τον μήνα. Με Essential το όριο μένει 2, με Advanced γίνεται 8, με Expert 20 και με Max δεν υπάρχει όριο.",
        ),
        p("Κατά τη Meta, στο όριο δεν μετράνε:"),
        {
          type: "ul",
          items: [
            "επιπλέον links στα σχόλια ενός post που έχει ήδη link,",
            "links προς Facebook, Instagram, WhatsApp και Threads,",
            "links συνεργατών μέσω του affiliate προγράμματος του Facebook,",
            "links σε διαφημίσεις.",
          ],
        },
        p(
          "Το δωρεάν όριο ξεκινά από την αρχή την 1η κάθε μήνα. Με Meta One ξεκινά από την αρχή στην ημερομηνία ανανέωσης της συνδρομής. Ό,τι δεν χρησιμοποιήσεις δεν μεταφέρεται [3].",
        ),
        p(
          "Το όριο δεν ισχύει απαραίτητα σε κάθε σελίδα. Κοίτα αν σου εμφανίστηκε η ειδοποίηση.",
        ),
        p(
          "Για πλαίσιο: σύμφωνα με το Social Media Today, με βάση την έκθεση Widely Viewed Content της Meta για το α' τρίμηνο 2026, το 98,7% των προβολών posts στο Facebook στις ΗΠΑ αφορούσε posts χωρίς εξωτερικό link [6]. Το στοιχείο αφορά τις ΗΠΑ, όχι την Ελλάδα. Δείχνει όμως ότι τα posts με link είχαν ήδη μικρή προβολή, άρα το όριο ίσως αλλάζει λιγότερα απ' όσα φαίνεται.",
        ),
        h2("Αξίζει για τη δική σου επιχείρηση; Ένας γρήγορος έλεγχος"),
        p(
          "Δεν υπάρχει μία απάντηση για όλους. Απάντησε για τον δικό σου λογαριασμό.",
        ),
        {
          type: "ul",
          items: [
            "Πόσα posts με link έβαλες τον τελευταίο μήνα; Αν ήταν δύο ή λιγότερα, το όριο του Facebook σχεδόν δεν σε αγγίζει.",
            "Φέρνουν αυτά τα links επισκέψεις ή μηνύματα; Αν δεν το ξέρεις, πρόσθεσε παραμέτρους UTM στα links και δες τα αποτελέσματα στο analytics της ιστοσελίδας σου, όχι μόνο τα clicks που δείχνει η πλατφόρμα.",
            "Πουλάς ή κλείνεις ραντεβού από το Instagram; Τότε τα links του Advanced μπορεί να αξίζουν. Κράτησέ τα για τα σημαντικά: νέο προϊόν, προσφορά με ημερομηνία λήξης, κρατήσεις.",
            "Απαντάς σε πολλά μηνύματα στο WhatsApp; Τότε το Essential μπορεί να έχει νόημα για το Business Agent, όχι για τα links.",
            "Δουλεύουν πολλοί άνθρωποι στον ίδιο λογαριασμό; Η πρόσβαση ομάδας του Advanced βοηθά.",
            "Τι θα κόστιζε μια διαφήμιση στη θέση της συνδρομής; Σύγκρινε το κόστος του Advanced με την προώθηση του καλύτερου post με link. Τα links στις διαφημίσεις δεν μετράνε στο όριο.",
            "Μπορείς να δοκιμάσεις σε ένα προφίλ; Επειδή η τιμή είναι ανά προφίλ, δοκίμασε σε έναν λογαριασμό για δύο με τρεις μήνες πριν βάλεις συνδρομή παντού.",
          ],
        },
        h2("Τα links έγιναν λίγα. Η σελίδα που ανοίγει μετράει περισσότερο"),
        p(
          "Η πρακτική αλλαγή είναι ότι τα links έγιναν σπάνια. Με δύο έως οκτώ links τον μήνα, κάθε click πρέπει να καταλήγει κάπου που δουλεύει: σε σελίδα που φορτώνει γρήγορα στο κινητό, με ένα μήνυμα και ένα κουμπί για κλήση, κράτηση, αγορά ή φόρμα.",
        ),
        p(
          "Ένα link προς την αρχική σελίδα συνήθως πάει χαμένο. Καλύτερα μία σελίδα για μία προσφορά ή υπηρεσία.",
        ),
        p(
          "Το link στο bio μένει δωρεάν. Η Meta προσθέτει και μια σελίδα συνδέσμων στο προφίλ του Instagram, με έως 20 links, ως μέρος του Meta One [2].",
        ),
        p(
          "Όταν ένα post δεν έχει link, γράψε το όνομα του site ή «στείλε μήνυμα». Αυτό ζητά ένα βήμα παραπάνω, άρα το site πρέπει να βρίσκεται εύκολα.",
        ),
        p(
          "Στο omnidot φτιάχνουμε και τα social και τις ιστοσελίδες, οπότε βλέπουμε και τις δύο άκρες: το post και τη σελίδα που ανοίγει μετά. Δείτε περισσότερα στη σελίδα κατασκευής ιστοσελίδων: https://omnidot.gr/el/web/",
        ),
        h2("Τι αλλάζει στη διαχείριση των social"),
        p(
          "Τα links μπαίνουν πλέον στο μηνιαίο πλάνο από την αρχή: αποφασίζεις ποια δύο, τέσσερα ή οκτώ posts παίρνουν link.",
        ),
        p(
          "Τα υπόλοιπα posts έχουν άλλο στόχο: να χτίσουν εμπιστοσύνη, να απαντήσουν σε ερωτήσεις, να κρατήσουν την επιχείρηση στη μνήμη του κοινού. Γι' αυτό το μηνιαίο report δεν πρέπει να τα κρίνει μόνο με βάση τα clicks.",
        ),
        p(
          "Αν ο πελάτης βάλει πακέτο Meta One, αυτό είναι κόστος της πλατφόρμας, όπως το ad spend: το βλέπει χωριστά και δεν «χάνεται» μέσα στη μηνιαία αμοιβή.",
        ),
        p(
          "Στο omnidot φτιάχνουμε εξατομικευμένη πρόταση για τη διαχείριση social, ανάλογα με τις πλατφόρμες και τον όγκο περιεχομένου. Δείτε την υπηρεσία social media: https://omnidot.gr/el/social/",
        ),
        h2("Συχνές ερωτήσεις"),
        h3("Τι είναι το Meta One για επιχειρήσεις;"),
        p(
          "Συνδρομή της Meta από τις 15 Σεπτεμβρίου 2026 με επιπλέον εργαλεία σε Instagram, Facebook και WhatsApp. Η βασική χρήση των εφαρμογών μένει δωρεάν [1].",
        ),
        h3("Πρέπει να πληρώσω για να βάλω link σε post στο Instagram;"),
        p(
          "Ναι, για clickable link μέσα σε post ή Reel χρειάζεται Meta One Advanced ή μεγαλύτερο πακέτο [2]. Το link στο bio μένει δωρεάν.",
        ),
        h3("Πόσα posts με link μπορώ να κάνω στο Facebook χωρίς συνδρομή;"),
        p(
          "Αν η σελίδα σου έχει το όριο, δύο τον μήνα, σε posts ή σχόλια. Το όριο ξεκινά από την αρχή την 1η κάθε μήνα [3].",
        ),
        h3("Αξίζει το Meta One για μικρή επιχείρηση;"),
        p(
          "Εξαρτάται από το πόσα links στέλνεις και αν φέρνουν πελάτες. Για τις περισσότερες, πρώτα μετράς και μετά πληρώνεις για ένα προφίλ.",
        ),
        h3("Υπάρχει το Meta One στην Ελλάδα και πόσο κοστίζει;"),
        p(
          "Η Meta μιλά για σταδιακή διάθεση παγκοσμίως, αλλά το Help Center της το περιγράφει ακόμα ως περιορισμένη δοκιμή [4], οπότε ελέγχεις στην εφαρμογή. Σύμφωνα με δημοσιεύματα, στην Ευρώπη το Essential ξεκινά από €16,99 και το Advanced από €54,99 τον μήνα [9]. Ελέγξτε την τελική τιμή στην εφαρμογή.",
        ),
        h3("Τι γίνεται με το Meta Verified;"),
        p(
          "Η Meta το ενσωματώνει στο Meta One. Όσοι το έχουν ήδη δεν χρειάζεται να κάνουν κάτι τώρα [2].",
        ),
        p(
          "Θες να δούμε μαζί αν τα links σου φέρνουν πελάτες και πού πρέπει να καταλήγουν; Πες μας για τη σελίδα σου. Αν δεν έχεις ακόμα site, δες πώς δουλεύουμε τις ιστοσελίδες.",
        ),
        h2("Πηγές"),
        {
          type: "ol",
          items: [
            "«Introducing Meta One: A Subscription Service With More Features and AI to Create, Connect, and Stand Out», Meta Newsroom, 15 Σεπτεμβρίου 2026 (ενημέρωση 16 Σεπτεμβρίου 2026). https://about.fb.com/news/2026/09/introducing-meta-one-subscription-service-more-features-ai/",
            "«Introducing Meta One plans for businesses», Meta for Business, 15 Σεπτεμβρίου 2026. https://www.facebook.com/business/news/introducing-meta-one-plans-for-businesses",
            "«About links in organic Facebook Page posts and comments», Facebook Help Center, χωρίς ημερομηνία, ελέγχθηκε 5 Οκτωβρίου 2026. https://www.facebook.com/help/1929252614431792",
            "«About Meta One plans», Meta Help Center, χωρίς ημερομηνία, ελέγχθηκε 5 Οκτωβρίου 2026. https://www.meta.com/help/subscriptions/960854640235758/",
            "«Meta launches Meta One for Business add-on packages», Social Media Today (Andrew Hutchinson), 15 Σεπτεμβρίου 2026. https://www.socialmediatoday.com/news/meta-launches-meta-one-for-business-add-on-packages/830469/",
            "«Facebook Pages get charged for link posts», Social Media Today (Andrew Hutchinson), 17 Σεπτεμβρίου 2026. https://www.socialmediatoday.com/news/facebook-pages-get-charged-for-link-posts/830743/",
            "«Meta One turns Instagram post links into a paid feature», Search Engine Watch (Radu Tyrsina), 17 Σεπτεμβρίου 2026. https://searchenginewatch.com/meta-one-turns-instagram-post-links-into-a-paid-feature/",
            "«Meta expands subscription push with new AI-focused plans», TechCrunch (Sarah Perez), 15 Σεπτεμβρίου 2026. https://techcrunch.com/2026/09/15/meta-expands-subscription-push-with-new-ai-focused-plans/",
            "«Meta One: 50+ λειτουργίες από 2,49€ τον μήνα», FreakUnboxer (Μάριος Βίγκλας), 17 Σεπτεμβρίου 2026. https://freakunboxer.gr/2026/09/meta-one-times-instagram-whatsapp-facebook/",
          ],
        },
      ],
    },
    en: {
      topic: "Social Media",
      title:
        "Meta One: is it worth paying for links on Instagram and Facebook?",
      seoTitle: "Meta One links on Instagram & Facebook | omnidot.",
      seoDescription:
        "After Meta One, Instagram and Facebook links aren’t automatic. What changed, what it costs, and if it’s worth it for a small business.",
      excerpt:
        "Since mid-September Meta has been selling Meta One subscriptions for businesses, and clickable links in posts are no longer a given. You don’t need to pay right away — measure what your links bring in.",
      takeaways: [
        "You don’t need to pay right away; measure what your links deliver first.",
        "On Instagram, clickable links in posts need Meta One Advanced or higher.",
        "On Facebook, many Pages get up to 2 link posts a month without a subscription.",
        "With fewer links each month, the page that opens matters more.",
      ],
      relatedServices: [
        {
          label: "Social Media Management",
          href: "/social/",
          blurb: "Strategy, content, community and monthly reporting.",
        },
        {
          label: "Website Development",
          href: "/web/",
          blurb: "Landing pages and sites that load fast and convert.",
        },
        {
          label: "Performance Marketing",
          href: "/performance/",
          blurb: "Meta Ads and Google Ads with clear cost and return.",
        },
      ],
      body: [
        p(
          "Since mid-September Meta has been selling Meta One subscriptions for businesses, and clickable links in posts are no longer a given. On Instagram they open only with a paid plan. On Facebook, Pages that see the new limit get two link posts a month without a subscription.",
        ),
        p(
          "The short takeaway: you don’t need to pay right away. Measure what your links bring in, and make sure they land on a page that works.",
        ),
        h2("What changed in September 2026"),
        p(
          "On 15 September 2026 Meta announced Meta One, a subscription that adds features on top of its free apps [1]. The company says basic use of Instagram, Facebook, WhatsApp and Meta AI stays free.",
        ),
        p(
          "There are plans for individuals and separate ones for creators and businesses, as TechCrunch also reported [8]. Here we care only about the business plans. According to Meta’s business page, pricing is per profile: each plan covers one account [2].",
        ),
        p(
          "The same page says Meta Verified features are gradually moving into Meta One. For anyone who already has Meta Verified, nothing changes for now [2].",
        ),
        p(
          "For Greece, availability is the key question. The announcement talks about a gradual worldwide rollout, with plans, prices and benefits that differ by region, app and account [1]. Meta’s Help Center still describes Meta One as a limited trial that isn’t available everywhere [4]. The reliable check is inside the app, on your account.",
        ),
        h2("The 4 business plans, simply"),
        p(
          "Dollar prices come from Meta [1] [2]. Euro prices come from coverage of European pricing, such as FreakUnboxer and Search Engine Watch [7] [9], and we did not find them on a Meta page. Check the current price for your account inside the app.",
        ),
        {
          type: "table",
          caption: "Meta One plans for businesses",
          headers: ["Plan", "Monthly price", "What matters for a small business"],
          rows: [
            [
              "Essential",
              "from $14.99 (per reports, from €16.99 in Europe)",
              "Verified badge, protection from fake profiles, verified WhatsApp Business channel, more replies from Meta Business Agent. Does not include links in posts.",
            ],
            [
              "Advanced",
              "from $49.99 (per reports, from €54.99)",
              "Links in organic posts and Reels, Stories scheduling up to 30 days ahead, analytics export, Instagram team access without a shared password.",
            ],
            [
              "Expert",
              "from about $149 (per reports, from €169)",
              "Higher limits and human account support, for teams that post a lot.",
            ],
            [
              "Max",
              "from about $499 (per reports, from €549)",
              "The highest limits, for teams working at large scale.",
            ],
          ],
        },
        p(
          "Meta Business Agent is an AI tool that replies to customer messages on WhatsApp Business. It starts free and the subscription adds more replies [2].",
        ),
        p(
          "For Expert and Max, the announcement says $149 and $499, while Facebook Help Center says $149.99 and $499.99 [3]. That is why we say “about.” For most small businesses, those two plans are not needed.",
        ),
        h2("Links: what applies now on Instagram and Facebook"),
        p(
          "Instagram. Meta confirms Advanced includes links in organic posts and Reels, without giving a number in its announcement [2]. Social Media Today published the limits: according to the site, Advanced gives links on 4 posts and 4 Reels a month, Expert 8 and 8, and Max 12 and 12 [5]. The link in bio stays free.",
        ),
        p(
          "Facebook. On 17 September Social Media Today wrote that more Pages are seeing a notice about a limit of two link posts a month if they don’t pay [6]. According to the same report, Meta had been testing such a limit on some Pages since December 2025, and publisher Pages are excluded.",
        ),
        p(
          "Facebook Help Center now describes the rules [3]. If your Page sees the limit, you can put links in up to 2 organic posts or comments a month. With Essential the limit stays 2, with Advanced it becomes 8, with Expert 20, and with Max there is no limit.",
        ),
        p("According to Meta, these do not count toward the limit:"),
        {
          type: "ul",
          items: [
            "extra links in the comments of a post that already has a link,",
            "links to Facebook, Instagram, WhatsApp and Threads,",
            "partner links through Facebook’s affiliate programme,",
            "links in ads.",
          ],
        },
        p(
          "The free allowance resets on the 1st of each month. With Meta One it resets on the subscription renewal date. Unused links do not roll over [3].",
        ),
        p(
          "The limit does not necessarily apply to every Page. Check whether you have seen the notice.",
        ),
        p(
          "For context: according to Social Media Today, citing Meta’s Widely Viewed Content report for Q1 2026, 98.7% of post views on Facebook in the US were of posts without an external link [6]. That figure is for the US, not Greece. It does show that posts with links already had little reach, so the limit may change less than it seems.",
        ),
        h2("Is it worth it for your business? A quick check"),
        p(
          "There is no single answer for everyone. Answer for your own account.",
        ),
        {
          type: "ul",
          items: [
            "How many link posts did you publish last month? If it was two or fewer, Facebook’s limit barely touches you.",
            "Do those links bring visits or messages? If you don’t know, add UTM parameters and check results in your website analytics — not only the clicks the platform shows.",
            "Do you sell or book appointments from Instagram? Then Advanced links may be worth it. Save them for what matters: a new product, a time-limited offer, bookings.",
            "Do you answer a lot of WhatsApp messages? Then Essential may make sense for Business Agent, not for links.",
            "Do several people work on the same account? Advanced team access helps.",
            "What would an ad cost instead of the subscription? Compare Advanced with boosting your best link post. Links in ads do not count toward the limit.",
            "Can you test on one profile? Because pricing is per profile, try one account for two to three months before subscribing everywhere.",
          ],
        },
        h2("Links got scarce. The page that opens matters more"),
        p(
          "The practical change is that links became scarce. With two to eight links a month, every click must land somewhere that works: a page that loads fast on mobile, with one message and one button for a call, booking, purchase or form.",
        ),
        p(
          "A link to the homepage is usually wasted. Better: one page for one offer or service.",
        ),
        p(
          "The link in bio stays free. Meta is also adding a links page on the Instagram profile, with up to 20 links, as part of Meta One [2].",
        ),
        p(
          "When a post has no link, write the site name or “send a message.” That asks for an extra step, so the site must be easy to find.",
        ),
        p(
          "At omnidot we build both social and websites, so we see both ends: the post and the page that opens after. See more on our website development page: https://omnidot.gr/web/",
        ),
        h2("What changes in social media management"),
        p(
          "Links now go into the monthly plan from the start: you decide which two, four or eight posts get a link.",
        ),
        p(
          "The other posts have a different job: build trust, answer questions, keep the business in people’s minds. That is why the monthly report should not judge them only by clicks.",
        ),
        p(
          "If the client takes a Meta One plan, that is a platform cost, like ad spend: they see it separately and it does not get lost inside the monthly fee.",
        ),
        p(
          "At omnidot we put together a tailored proposal for social media management, based on platforms and content volume. See our social media service: https://omnidot.gr/social/",
        ),
        h2("Frequently asked questions"),
        h3("What is Meta One for businesses?"),
        p(
          "A Meta subscription from 15 September 2026 with extra tools on Instagram, Facebook and WhatsApp. Basic use of the apps stays free [1].",
        ),
        h3("Do I have to pay to put a link in an Instagram post?"),
        p(
          "Yes — for a clickable link inside a post or Reel you need Meta One Advanced or a higher plan [2]. The link in bio stays free.",
        ),
        h3("How many link posts can I make on Facebook without a subscription?"),
        p(
          "If your Page has the limit, two a month, in posts or comments. The allowance resets on the 1st of each month [3].",
        ),
        h3("Is Meta One worth it for a small business?"),
        p(
          "It depends on how many links you send and whether they bring customers. For most, measure first, then pay for one profile.",
        ),
        h3("Is Meta One available in Greece, and what does it cost?"),
        p(
          "Meta talks about a gradual worldwide rollout, but its Help Center still describes it as a limited trial [4], so you check in the app. Per reports, in Europe Essential starts from €16.99 and Advanced from €54.99 a month [9]. Check the final price in the app.",
        ),
        h3("What happens to Meta Verified?"),
        p(
          "Meta is folding it into Meta One. Anyone who already has it does not need to do anything now [2].",
        ),
        p(
          "Want to look together at whether your links bring customers and where they should land? Tell us about your Page. If you don’t have a site yet, see how we build websites.",
        ),
        h2("Sources"),
        {
          type: "ol",
          items: [
            "“Introducing Meta One: A Subscription Service With More Features and AI to Create, Connect, and Stand Out”, Meta Newsroom, 15 September 2026 (updated 16 September 2026). https://about.fb.com/news/2026/09/introducing-meta-one-subscription-service-more-features-ai/",
            "“Introducing Meta One plans for businesses”, Meta for Business, 15 September 2026. https://www.facebook.com/business/news/introducing-meta-one-plans-for-businesses",
            "“About links in organic Facebook Page posts and comments”, Facebook Help Center, undated, checked 5 October 2026. https://www.facebook.com/help/1929252614431792",
            "“About Meta One plans”, Meta Help Center, undated, checked 5 October 2026. https://www.meta.com/help/subscriptions/960854640235758/",
            "“Meta launches Meta One for Business add-on packages”, Social Media Today (Andrew Hutchinson), 15 September 2026. https://www.socialmediatoday.com/news/meta-launches-meta-one-for-business-add-on-packages/830469/",
            "“Facebook Pages get charged for link posts”, Social Media Today (Andrew Hutchinson), 17 September 2026. https://www.socialmediatoday.com/news/facebook-pages-get-charged-for-link-posts/830743/",
            "“Meta One turns Instagram post links into a paid feature”, Search Engine Watch (Radu Tyrsina), 17 September 2026. https://searchenginewatch.com/meta-one-turns-instagram-post-links-into-a-paid-feature/",
            "“Meta expands subscription push with new AI-focused plans”, TechCrunch (Sarah Perez), 15 September 2026. https://techcrunch.com/2026/09/15/meta-expands-subscription-push-with-new-ai-focused-plans/",
            "“Meta One: 50+ features from €2.49 a month”, FreakUnboxer (Marios Viglas), 17 September 2026. https://freakunboxer.gr/2026/09/meta-one-times-instagram-whatsapp-facebook/",
          ],
        },
      ],
    },
  },
];

function toArticle(source: ArticleSource, locale: Locale): Article {
  const copy = locale === "el" ? source.el : source.en;
  return {
    slug: source.slug,
    date: source.date,
    dateModified: source.dateModified,
    image: source.image,
    readMinutes: source.readMinutes,
    ...copy,
  };
}

/** Full headline for SEO / share when a subtitle is present. */
export function articleHeadline(article: Pick<Article, "title" | "subtitle">) {
  return article.subtitle
    ? `${article.title}: ${article.subtitle}`
    : article.title;
}

/** Trim at a word boundary; append … when shortened. Never cuts mid-word. */
function trimAtWordBoundary(text: string, maxChars: number): string {
  const chars = [...text];
  if (chars.length <= maxChars) return text;
  const budget = Math.max(1, maxChars - 1); // room for …
  let end = budget;
  while (end > 0 && !/\s/u.test(chars[end - 1])) end -= 1;
  while (end > 0 && /\s/u.test(chars[end - 1])) end -= 1;
  if (end === 0) end = budget;
  return `${chars.slice(0, end).join("")}…`;
}

/** Document title + meta description — shared by client SEO and prerender. */
export function articleSeo(article: Article): {
  title: string;
  description: string;
} {
  return {
    title: article.seoTitle ?? `${article.title} — omnidot.`,
    description:
      article.seoDescription ?? trimAtWordBoundary(article.excerpt, 155),
  };
}

export function articlesFor(locale: Locale): Article[] {
  return articles
    .map((item) => toArticle(item, locale))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
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
