import { siteConfig } from "@/lib/config";

export const BLOG_PAGE_SIZE = 6;

export type BlogCategorySlug =
  | "raw-vegan"
  | "fara-zahar"
  | "ingrediente"
  | "alergii"
  | "baby-friendly"
  | "comenzi-torturi";

export type BlogTagSlug =
  | "deserturi-raw"
  | "torturi-raw-vegane"
  | "prajituri-fara-zahar"
  | "nuci-si-alergeni"
  | "copii"
  | "ingrediente-naturale"
  | "educatie";

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategorySlug;
  tags: BlogTagSlug[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  image: {
    src: string;
    alt: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  faq: BlogFaq[];
  content: BlogBlock[];
}

export const blogCategories: Record<BlogCategorySlug, { slug: BlogCategorySlug; label: string; description: string }> = {
  "raw-vegan": {
    slug: "raw-vegan",
    label: "Raw vegan",
    description: "Ghiduri despre deserturi fără coacere, ingrediente vii și alegeri vegane.",
  },
  "fara-zahar": {
    slug: "fara-zahar",
    label: "Fără zahăr",
    description: "Articole despre deserturi îndulcite natural și alternative la zahărul rafinat.",
  },
  ingrediente: {
    slug: "ingrediente",
    label: "Ingrediente",
    description: "Explicații simple despre nuci, fructe, cacao, semințe și superalimente.",
  },
  alergii: {
    slug: "alergii",
    label: "Alergii",
    description: "Informații utile pentru persoane cu alergii sau intoleranțe alimentare.",
  },
  "baby-friendly": {
    slug: "baby-friendly",
    label: "Baby friendly",
    description: "Idei pentru aniversări, torturi și prăjituri potrivite pentru cei mici.",
  },
  "comenzi-torturi": {
    slug: "comenzi-torturi",
    label: "Comenzi torturi",
    description: "Recomandări pentru alegerea, personalizarea și planificarea torturilor.",
  },
};

export const blogTags: Record<BlogTagSlug, { slug: BlogTagSlug; label: string; description: string }> = {
  "deserturi-raw": {
    slug: "deserturi-raw",
    label: "Deserturi raw",
    description: "Articole despre preparate dulci fără coacere.",
  },
  "torturi-raw-vegane": {
    slug: "torturi-raw-vegane",
    label: "Torturi raw vegane",
    description: "Ghiduri și inspirație pentru torturi raw vegane.",
  },
  "prajituri-fara-zahar": {
    slug: "prajituri-fara-zahar",
    label: "Prăjituri fără zahăr",
    description: "Informații despre prăjituri fără zahăr rafinat.",
  },
  "nuci-si-alergeni": {
    slug: "nuci-si-alergeni",
    label: "Nuci și alergeni",
    description: "Ce trebuie știut despre alergeni în deserturile pe bază de nuci.",
  },
  copii: {
    slug: "copii",
    label: "Copii",
    description: "Deserturi și aniversări gândite pentru familii.",
  },
  "ingrediente-naturale": {
    slug: "ingrediente-naturale",
    label: "Ingrediente naturale",
    description: "Explicații despre ingrediente curate și neprocesate agresiv.",
  },
  educatie: {
    slug: "educatie",
    label: "Educație",
    description: "Articole explicative pentru alegeri mai informate.",
  },
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "ce-inseamna-raw-vegan",
    title: "Ce înseamnă raw vegan și de ce contează la deserturi",
    excerpt:
      "Raw vegan nu înseamnă doar fără coacere. Înseamnă ingrediente vegetale, temperaturi blânde și rețete construite ca să păstreze gustul viu al fructelor, nucilor și semințelor.",
    category: "raw-vegan",
    tags: ["deserturi-raw", "torturi-raw-vegane", "ingrediente-naturale", "educatie"],
    author: "Echipa RawMina",
    publishedAt: "2026-06-25",
    updatedAt: "2026-06-25",
    readingMinutes: 5,
    image: {
      src: "/blog/ce-inseamna-raw-vegan.png",
      alt: "Felie de tort raw vegan cu zmeură, cacao, curmale, caju și cocos pe blat crem",
    },
    seo: {
      title: "Ce înseamnă raw vegan la deserturi",
      description:
        "Află ce înseamnă raw vegan, cum se fac torturile fără coacere și de ce ingredientele naturale schimbă gustul unui desert.",
      keywords: ["ce înseamnă raw vegan", "deserturi raw vegane", "tort raw vegan", "prăjituri fără coacere"],
    },
    faq: [
      {
        question: "Un desert raw vegan este complet crud?",
        answer:
          "În mod obișnuit, deserturile raw vegane sunt pregătite fără coacere și cu temperaturi blânde, pentru a păstra cât mai mult din textura și aroma ingredientelor.",
      },
      {
        question: "Raw vegan înseamnă automat fără zahăr?",
        answer:
          "Nu automat. La RawMina, deserturile sunt raw vegane și fără zahăr rafinat, dar conceptul raw vegan se referă în primul rând la ingrediente vegetale și preparare fără coacere.",
      },
    ],
    content: [
      {
        type: "paragraph",
        text: "Un desert raw vegan este pregătit din ingrediente vegetale și nu trece prin coacere clasică. În loc de făină albă, ouă, unt sau frișcă, rețetele folosesc nuci, semințe, fructe, cacao, cocos, curmale sau îndulcitori naturali.",
      },
      {
        type: "heading",
        text: "De ce se simte diferit gustul",
      },
      {
        type: "paragraph",
        text: "Când ingredientele nu sunt arse sau ascunse sub cantități mari de zahăr, aromele rămân mai clare. Zmeura are aciditate, caju-ul dă cremozitate, cacaoa aduce profunzime, iar curmalele sau fructele pot rotunji gustul fără să îl acopere.",
      },
      {
        type: "list",
        items: [
          "Baza cremoasă vine frecvent din caju hidratat, cocos sau unturi din nuci.",
          "Blaturile se pot face din nuci, migdale, curmale, cacao sau fulgi de cocos.",
          "Aromele sunt construite din fructe, citrice, vanilie, cacao, cafea, mentă sau condimente naturale.",
        ],
      },
      {
        type: "heading",
        text: "Ce nu promite un desert raw vegan",
      },
      {
        type: "paragraph",
        text: "Un desert raw vegan nu este o scuză pentru porții nelimitate și nu înlocuiește recomandările medicale. Este, însă, o alternativă mai atentă pentru oamenii care vor deserturi fără lactate, fără ouă și fără zahăr rafinat.",
      },
      {
        type: "paragraph",
        text: "Pentru RawMina, raw vegan înseamnă gust intens, textură bogată și ingrediente recognoscibile. Tocmai de aceea fiecare tort trebuie ales și în funcție de preferințe, alergii și ocazia pentru care este comandat.",
      },
    ],
  },
  {
    slug: "alergii-comune-deserturi-raw-vegane",
    title: "Cele mai comune alergii de luat în calcul la deserturile raw vegane",
    excerpt:
      "Deserturile raw vegane sunt fără lactate și ouă, dar pot conține nuci, arahide, cocos sau alte ingrediente cu potențial alergen. Comunicarea clară este esențială înainte de comandă.",
    category: "alergii",
    tags: ["nuci-si-alergeni", "ingrediente-naturale", "educatie", "deserturi-raw"],
    author: "Echipa RawMina",
    publishedAt: "2026-06-25",
    updatedAt: "2026-06-25",
    readingMinutes: 6,
    image: {
      src: "/blog/alergii-deserturi-raw-vegane.png",
      alt: "Boluri separate cu caju, migdale, nuci, alune, cocos și fructe lângă o felie de tort raw",
    },
    seo: {
      title: "Alergii comune în deserturile raw vegane",
      description:
        "Ghid despre alergeni în deserturile raw vegane: nuci, caju, migdale, cocos, arahide, gluten la cerere și comunicarea corectă înainte de comandă.",
      keywords: ["alergii deserturi raw vegane", "nuci alergeni", "tort fără lactate", "prăjituri vegane alergii"],
    },
    faq: [
      {
        question: "Produsele raw vegane sunt potrivite pentru persoane alergice la nuci?",
        answer:
          "Nu întotdeauna. Multe deserturi raw vegane folosesc caju, migdale, nuci sau alune. Persoanele cu alergii trebuie să anunțe explicit înainte de comandă.",
      },
      {
        question: "Fără lactate și fără ouă înseamnă fără alergeni?",
        answer:
          "Nu. Lipsa lactatelor și ouălor nu elimină alți alergeni posibili, precum nucile, arahidele, susanul, soia, cocosul sau urmele de gluten.",
      },
      {
        question: "Se pot face deserturi fără gluten?",
        answer:
          "Unele produse pot fi pregătite fără gluten la cerere, dar este importantă confirmarea pentru fiecare comandă în parte.",
      },
    ],
    content: [
      {
        type: "paragraph",
        text: "Raw vegan este o alegere bună pentru mulți oameni care evită lactatele, ouăle sau zahărul rafinat. Totuși, o parte importantă din textura acestor deserturi vine din nuci și semințe, iar acestea pot fi alergeni serioși pentru unele persoane.",
      },
      {
        type: "heading",
        text: "Alergenii care apar cel mai des",
      },
      {
        type: "list",
        items: [
          "Caju, migdale, nuci, alune de pădure, fistic sau macadamia.",
          "Arahide, acolo unde rețeta sau decorul le include.",
          "Cocos, unt de cacao, cacao, susan, soia sau alte ingrediente vegetale specifice.",
          "Gluten sau urme de gluten, în funcție de ingrediente și de mediul de lucru.",
        ],
      },
      {
        type: "heading",
        text: "De ce trebuie discutată comanda din timp",
      },
      {
        type: "paragraph",
        text: "Pentru o comandă responsabilă, alergiile trebuie comunicate clar înainte de stabilirea produsului. Nu este suficient să alegem o categorie generală, cum ar fi raw vegan sau fără zahăr. Contează rețeta exactă, ingredientele, decorul și riscul de contact cu alte ingrediente.",
      },
      {
        type: "paragraph",
        text: "Acest articol are rol educativ și nu înlocuiește sfatul medicului alergolog. Dacă alergia este severă, recomandarea noastră este să discuți înainte cu specialistul și să ne transmiți toate restricțiile în scris.",
      },
      {
        type: "heading",
        text: "Cum ajută transparența",
      },
      {
        type: "paragraph",
        text: "O listă clară de ingrediente, întrebările puse din timp și confirmarea în scris reduc riscul de neînțelegeri. Când vom adăuga CMS-ul, aceste informații vor putea fi actualizate ușor pentru fiecare articol și fiecare produs.",
      },
    ],
  },
  {
    slug: "torturi-prajituri-baby-friendly",
    title: "Torturi și prăjituri baby friendly: ce merită întrebat înainte de comandă",
    excerpt:
      "Pentru aniversările copiilor mici, desertul trebuie ales cu grijă: ingrediente simple, gust blând, fără zahăr rafinat și cu atenție la alergii, vârstă și preferințele familiei.",
    category: "baby-friendly",
    tags: ["copii", "prajituri-fara-zahar", "torturi-raw-vegane", "ingrediente-naturale"],
    author: "Echipa RawMina",
    publishedAt: "2026-06-25",
    updatedAt: "2026-06-25",
    readingMinutes: 5,
    image: {
      src: "/blog/torturi-prajituri-baby-friendly.png",
      alt: "Tort raw vegan cu fructe proaspete, banane și fructe de pădure pe masă luminoasă",
    },
    seo: {
      title: "Torturi și prăjituri baby friendly fără zahăr rafinat",
      description:
        "Cum alegi un tort baby friendly: ingrediente simple, fără zahăr rafinat, texturi potrivite și întrebări utile înainte de comandă.",
      keywords: ["tort baby friendly", "prăjituri baby friendly", "tort fără zahăr copii", "tort raw vegan copii"],
    },
    faq: [
      {
        question: "Ce înseamnă baby friendly la un tort?",
        answer:
          "Înseamnă o rețetă gândită cu ingrediente simple, gust blând, fără zahăr rafinat și cu atenție la vârsta copilului și la eventualele alergii.",
      },
      {
        question: "Pot copiii mici să mănânce nuci în desert?",
        answer:
          "Depinde de vârstă, recomandările medicului și istoricul de alergii. Pentru copii mici, părinții trebuie să confirme ingredientele acceptate înainte de comandă.",
      },
    ],
    content: [
      {
        type: "paragraph",
        text: "Un tort baby friendly nu este doar un tort mai mic. Este un desert în care ingredientele, textura și nivelul de dulceață sunt alese cu mai multă atenție, mai ales pentru aniversări de 1 an, 2 ani sau petreceri cu mulți copii.",
      },
      {
        type: "heading",
        text: "Întrebările care contează înainte de comandă",
      },
      {
        type: "list",
        items: [
          "Ce ingrediente a mai mâncat copilul fără probleme?",
          "Există alergii cunoscute în familie sau recomandări speciale de la medic?",
          "Preferă familia un gust mai fructat, mai cremos sau mai ciocolatos?",
          "Desertul este pentru copil, pentru invitați sau pentru ambele situații?",
        ],
      },
      {
        type: "heading",
        text: "De ce fără zahăr rafinat",
      },
      {
        type: "paragraph",
        text: "Pentru multe familii, primele aniversări vin cu dorința de a evita zahărul rafinat. Un tort raw vegan poate folosi fructe, banane, curmale sau alte surse naturale de dulceață, dar gustul trebuie să rămână echilibrat.",
      },
      {
        type: "paragraph",
        text: "Totuși, baby friendly nu înseamnă automat potrivit pentru orice copil. Nucile, caju-ul, migdalele, cacaoa sau fructele specifice trebuie discutate înainte, mai ales când desertul este pentru copii foarte mici.",
      },
      {
        type: "heading",
        text: "Cum alegem o variantă potrivită",
      },
      {
        type: "paragraph",
        text: "Cel mai bun punct de pornire este o conversație sinceră despre vârsta copilului, invitați, alergii și gusturile familiei. De acolo, se poate alege un tort cu fructe, o prăjitură mai blândă sau un platou care să mulțumească și adulții.",
      },
    ],
  },
];

export function getPublishedArticles() {
  return [...blogArticles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogArticle(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: BlogCategorySlug) {
  return getPublishedArticles().filter((article) => article.category === category);
}

export function getArticlesByTag(tag: BlogTagSlug) {
  return getPublishedArticles().filter((article) => article.tags.includes(tag));
}

export function paginateArticles(articles: BlogArticle[], page: number) {
  const totalPages = Math.max(1, Math.ceil(articles.length / BLOG_PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * BLOG_PAGE_SIZE;

  return {
    articles: articles.slice(start, start + BLOG_PAGE_SIZE),
    currentPage,
    totalPages,
  };
}

export function getAbsoluteUrl(path = "") {
  return `${siteConfig.url}${path}`;
}
