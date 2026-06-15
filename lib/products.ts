export type Category =
  | "torturi"
  | "prajituri"
  | "sezoniere"
  | "raw-bars"
  | "bomboane"
  | "creme"
  | "specialitati";

export type Season = "vara" | "paste" | "craciun";

export interface Product {
  slug: string;
  name: string;
  category: Category;
  price: number;
  priceUnit?: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  badges?: string[];
  available: boolean;
  season?: Season;
  featured?: boolean;
}

export const CATEGORIES: Record<
  Category,
  { label: string; accent: "matcha" | "mango" | "blueberry" | "apricot"; cover: string; description: string }
> = {
  torturi: {
    label: "Torturi",
    accent: "blueberry",
    cover: "/products/mix-felii-raw.jpg",
    description: "Torturi raw întregi, colorate natural cu fructe, cacao și nuci.",
  },
  prajituri: {
    label: "Prăjituri",
    accent: "apricot",
    cover: "/products/negresa-din-quinoa.jpg",
    description: "Bucăți delicate pentru cafea, cadou sau poftă de după-amiază.",
  },
  sezoniere: {
    label: "Sezoniere",
    accent: "mango",
    cover: "/products/tarte-si-cozonac-raw.jpg",
    description: "Pască, cozonac, înghețată și ediții scurte, în ritmul sezonului.",
  },
  "raw-bars": {
    label: "Raw Bars",
    accent: "matcha",
    cover: "/products/tarte-si-cozonac-raw.jpg",
    description: "Felii compacte, dense și hrănitoare, bune de luat la drum.",
  },
  bomboane: {
    label: "Bomboane raw",
    accent: "blueberry",
    cover: "/products/mix-felii-raw.jpg",
    description: "Biluțe fine cu nuci, cacao, cocos și fructe uscate.",
  },
  creme: {
    label: "Creme",
    accent: "apricot",
    cover: "/products/negresa-din-quinoa.jpg",
    description: "Borcanul de ținut aproape: alune, cacao raw și dulceață naturală.",
  },
  specialitati: {
    label: "Specialități",
    accent: "mango",
    cover: "/products/mix-felii-raw.jpg",
    description: "Tiramisu, chia pudding și deserturi cu texturi surprinzătoare.",
  },
};

export const products: Product[] = [
  {
    slug: "tort-curcubeu-raw",
    name: "Tort curcubeu raw",
    category: "torturi",
    price: 180,
    priceUnit: "/ tort",
    shortDescription: "Felii multicolore cu fructe, cacao, matcha și cremă de caju.",
    image: "/products/mix-felii-raw.jpg",
    imageAlt: "Tort raw vegan cu felii colorate și fructe",
    badges: ["raw", "fără zahăr"],
    available: true,
    featured: true,
  },
  {
    slug: "tort-ciocolata-zmeura",
    name: "Tort ciocolată și zmeură",
    category: "torturi",
    price: 165,
    priceUnit: "/ tort",
    shortDescription: "Cacao raw, zmeură acrișoară și blat dens de nuci.",
    image: "/products/tarte-si-cozonac-raw.jpg",
    imageAlt: "Tort raw vegan de ciocolată decorat cu fructe roșii",
    badges: ["vegan", "îndulcit natural"],
    available: true,
    featured: true,
  },
  {
    slug: "negresa-din-quinoa",
    name: "Negresă din quinoa",
    category: "prajituri",
    price: 18,
    priceUnit: "/ buc",
    shortDescription: "Textură catifelată, glazură de cacao și strat fin de fructe roșii.",
    image: "/products/negresa-din-quinoa.jpg",
    imageAlt: "Negresă raw din quinoa cu glazură de cacao și fructe roșii",
    badges: ["raw", "fără zahăr"],
    available: true,
    featured: true,
  },
  {
    slug: "tarta-lamaie-caju",
    name: "Tartă lămâie și caju",
    category: "prajituri",
    price: 20,
    priceUnit: "/ felie",
    shortDescription: "Cremă luminoasă de lămâie, crustă de migdale și note de vanilie.",
    image: "/products/tarte-si-cozonac-raw.jpg",
    imageAlt: "Tartă raw vegană cu cremă galbenă de lămâie",
    badges: ["cremă de caju"],
    available: true,
    featured: true,
  },
  {
    slug: "inghetata-zmeura-cocos",
    name: "Înghețată zmeură și cocos",
    category: "sezoniere",
    price: 22,
    priceUnit: "/ porție",
    shortDescription: "Rece, fructată și cremoasă, pregătită fără lapte și fără zahăr.",
    image: "/products/mix-felii-raw.jpg",
    imageAlt: "Desert raw vegan roz cu zmeură și cocos",
    badges: ["de sezon"],
    available: true,
    season: "vara",
  },
  {
    slug: "pasca-raw",
    name: "Pască raw",
    category: "sezoniere",
    price: 140,
    priceUnit: "/ bucată",
    shortDescription: "Interpretare raw vegană, cu stafide, caju și crustă de nuci.",
    image: "/products/tarte-si-cozonac-raw.jpg",
    imageAlt: "Pască raw vegană pe blat de nuci",
    badges: ["Paște"],
    available: false,
    season: "paste",
  },
  {
    slug: "raw-bar-cacao-visine",
    name: "Raw bar cacao și vișine",
    category: "raw-bars",
    price: 16,
    priceUnit: "/ buc",
    shortDescription: "Bară densă cu cacao, vișine și semințe, pentru energie curată.",
    image: "/products/negresa-din-quinoa.jpg",
    imageAlt: "Raw bar cu cacao și fructe roșii",
    badges: ["fără gluten"],
    available: true,
    featured: true,
  },
  {
    slug: "raw-bar-fistic-matcha",
    name: "Raw bar fistic și matcha",
    category: "raw-bars",
    price: 17,
    priceUnit: "/ buc",
    shortDescription: "Verde discret, aromă de fistic și dulceață din curmale.",
    image: "/products/mix-felii-raw.jpg",
    imageAlt: "Desert raw vegan verde cu fistic și matcha",
    badges: ["matcha"],
    available: true,
  },
  {
    slug: "bomboane-cacao-cocos",
    name: "Bomboane cacao și cocos",
    category: "bomboane",
    price: 45,
    priceUnit: "/ cutie",
    shortDescription: "Biluțe fine, rostogolite în cocos, cacao și fructe liofilizate.",
    image: "/products/tarte-si-cozonac-raw.jpg",
    imageAlt: "Cutie cu bomboane raw de cacao și cocos",
    badges: ["cadou"],
    available: true,
  },
  {
    slug: "crema-alune-cacao",
    name: "Cremă de alune și cacao",
    category: "creme",
    price: 38,
    priceUnit: "/ borcan",
    shortDescription: "Cremă tartinabilă cu alune coapte, cacao raw și curmale.",
    image: "/products/negresa-din-quinoa.jpg",
    imageAlt: "Cremă raw de alune și cacao într-un borcan",
    badges: ["fără ulei de palmier"],
    available: true,
  },
  {
    slug: "tiramisu-raw",
    name: "Tiramisu raw",
    category: "specialitati",
    price: 24,
    priceUnit: "/ cupă",
    shortDescription: "Caju, cacao, cafea blândă și straturi reci, fără mascarpone.",
    image: "/products/mix-felii-raw.jpg",
    imageAlt: "Tiramisu raw vegan cu cacao",
    badges: ["specialitate"],
    available: true,
    featured: true,
  },
  {
    slug: "budinca-chia-mango",
    name: "Budincă de chia și mango",
    category: "specialitati",
    price: 21,
    priceUnit: "/ porție",
    shortDescription: "Chia hidratată, mango parfumat și cremă fină de cocos.",
    image: "/products/tarte-si-cozonac-raw.jpg",
    imageAlt: "Budincă raw vegană cu chia și mango",
    badges: ["ușor"],
    available: true,
  },
];

export const featuredProducts = products.filter((product) => product.featured);

export function productsByCategory(category: Category | "toate") {
  if (category === "toate") {
    return products;
  }

  return products.filter((product) => product.category === category);
}
