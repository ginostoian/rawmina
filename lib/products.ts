export type Category =
  | "torturi"
  | "torturi-decor-copii"
  | "prajituri"
  | "bomboane-raw"
  | "creme-tartinabile"
  | "inghetata"
  | "biscuiti-si-briose"
  | "specialitati"
  | "platouri-asortate"
  | "de-sezon"
  | "de-oferit";

export type Season = "vara" | "paste" | "craciun";
export type SalesMode = "weight" | "piece";

export interface Product {
  slug: string;
  name: string;
  category: Category;
  price: number;
  priceUnit?: string;
  salesMode: SalesMode;
  unitWeightGrams?: number;
  shortDescription: string;
  ingredients: string;
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
  "torturi-decor-copii": {
    label: "Torturi decor copii",
    accent: "mango",
    cover: "/products/mix-felii-raw.jpg",
    description: "Torturi vesele, create pentru aniversările celor mici.",
  },
  prajituri: {
    label: "Prăjituri",
    accent: "apricot",
    cover: "/products/negresa-din-quinoa.jpg",
    description: "Bucăți delicate pentru cafea, cadou sau poftă de după-amiază.",
  },
  "bomboane-raw": {
    label: "Bomboane raw",
    accent: "matcha",
    cover: "/products/tarte-si-cozonac-raw.jpg",
    description: "Bomboane fine cu nuci, cacao, cocos și fructe uscate.",
  },
  "creme-tartinabile": {
    label: "Creme tartinabile",
    accent: "apricot",
    cover: "/products/negresa-din-quinoa.jpg",
    description: "Borcanul de ținut aproape: alune, cacao raw și dulceață naturală.",
  },
  inghetata: {
    label: "Înghețată",
    accent: "blueberry",
    cover: "/products/mix-felii-raw.jpg",
    description: "Înghețată raw-vegană, rece, cremoasă și plină de fructe.",
  },
  "biscuiti-si-briose": {
    label: "Biscuiți și brioșe",
    accent: "matcha",
    cover: "/products/negresa-din-quinoa.jpg",
    description: "Deserturi mici, hrănitoare, potrivite pentru o gustare dulce.",
  },
  specialitati: {
    label: "Specialități",
    accent: "mango",
    cover: "/products/mix-felii-raw.jpg",
    description: "Tiramisu, chia pudding și deserturi cu texturi surprinzătoare.",
  },
  "platouri-asortate": {
    label: "Platouri asortate",
    accent: "apricot",
    cover: "/products/tarte-si-cozonac-raw.jpg",
    description: "Mai multe arome într-un platou pregătit pentru împărțit.",
  },
  "de-sezon": {
    label: "De sezon",
    accent: "mango",
    cover: "/products/tarte-si-cozonac-raw.jpg",
    description: "Ediții pregătite în ritmul sărbătorilor și al anotimpurilor.",
  },
  "de-oferit": {
    label: "De oferit",
    accent: "blueberry",
    cover: "/products/mix-felii-raw.jpg",
    description: "Cadouri dulci, create cu grijă pentru oamenii dragi.",
  },
};

const rawVeganBadges = ["raw vegan", "fără zahăr rafinat"];

const menuProducts: Array<Omit<Product, "price" | "priceUnit" | "salesMode" | "unitWeightGrams">> = [
  {
    slug: "snickers",
    name: "Snickers",
    category: "torturi",
    shortDescription: "O felie intensă, cu arahide, cacao și cremă fină de caju.",
    ingredients: "Arahide, curmale, cacao, carob, unt de cacao, ulei de cocos, caju, lapte vegetal, miere, unt de arahide, agave BIO, vanilie.",
    image: "/products/mix-felii-raw.jpg",
    imageAlt: "Felie de tort raw vegan Snickers cu arahide",
    badges: rawVeganBadges,
    available: true,
    featured: true,
  },
  {
    slug: "fructe-padure-ciocolata-alba-cocos",
    name: "Fructe de pădure + ciocolată albă sau cocos",
    category: "torturi",
    shortDescription: "Cremă de caju și fructe de pădure, cu alegere între ciocolată albă sau cocos.",
    ingredients: "Migdale, fulgi de cocos și de ovăz, curmale, caju, ulei de cocos, fructe de pădure, lămâie, unt de cacao, lapte vegetal, miere, agave BIO, vanilie.",
    image: "/products/mix-felii-raw.jpg",
    imageAlt: "Felie raw vegană cu fructe de pădure și ciocolată albă",
    badges: rawVeganBadges,
    available: true,
  },
  {
    slug: "lamaie-si-vanilie",
    name: "Lămâie și vanilie",
    category: "torturi",
    shortDescription: "O combinație luminoasă de lămâie, vanilie și cremă de cocos.",
    ingredients: "Fistic, caju, cocos, curmale, lămâie, ulei de cocos, cremă de cocos, lapte de orez, turmeric, miere, vanilie, sare.",
    image: "/products/tarte-si-cozonac-raw.jpg",
    imageAlt: "Felie raw vegană cu lămâie și vanilie",
    badges: rawVeganBadges,
    available: true,
  },
  {
    slug: "lime-si-cocos",
    name: "Lime și cocos",
    category: "torturi",
    shortDescription: "Proaspăt, cremos și tropical, cu lime și cocos.",
    ingredients: "Fistic, caju, cocos, curmale, lime, ulei de cocos, cremă de cocos, lapte de orez, turmeric, miere, vanilie, sare.",
    image: "/products/tarte-si-cozonac-raw.jpg",
    imageAlt: "Felie raw vegană cu lime și cocos",
    badges: rawVeganBadges,
    available: true,
  },
  {
    slug: "portocala-si-ciocolata",
    name: "Portocală și ciocolată",
    category: "torturi",
    shortDescription: "Ciocolată catifelată, portocală parfumată și note de cocos.",
    ingredients: "Nucă românească, curmale, portocală, caju, lapte de orez, cacao, carob, unt de cacao, ulei de cocos, miere, suc de portocală, turmeric, unt de cocos.",
    image: "/products/mix-felii-raw.jpg",
    imageAlt: "Felie raw vegană cu portocală și ciocolată",
    badges: rawVeganBadges,
    available: true,
  },
  {
    slug: "fructe-padure-si-banana",
    name: "Fructe de pădure și banană",
    category: "torturi",
    shortDescription: "Fructe de pădure, banană și un strat cremos de caju.",
    ingredients: "Nuci, fulgi de cocos și de ovăz, curmale, caju, ulei de cocos, banane, lămâie, turmeric, fructe de pădure, miere, sare.",
    image: "/products/mix-felii-raw.jpg",
    imageAlt: "Felie raw vegană cu fructe de pădure și banană",
    badges: rawVeganBadges,
    available: true,
  },
  {
    slug: "ciocolata-si-cocos",
    name: "Ciocolată și cocos",
    category: "torturi",
    shortDescription: "Straturi delicate de cacao și cocos, cu textură cremoasă.",
    ingredients: "Hrișcă, cacao, fulgi de ovăz, curmale, caju, ulei de cocos, unt de cacao, miere, lapte vegetal, cocos, lămâie, sare.",
    image: "/products/mix-felii-raw.jpg",
    imageAlt: "Felie raw vegană cu ciocolată și cocos",
    badges: rawVeganBadges,
    available: true,
    featured: true,
  },
  {
    slug: "ciocolata-si-caramel",
    name: "Ciocolată și caramel",
    category: "torturi",
    shortDescription: "Cremă de cacao și caramel natural din curmale.",
    ingredients: "Migdale, curmale, unt de cacao, unt de arahide, cacao, caju, ulei de cocos, miere, sare, vanilie.",
    image: "/products/negresa-din-quinoa.jpg",
    imageAlt: "Felie raw vegană cu ciocolată și caramel",
    badges: rawVeganBadges,
    available: true,
  },
  {
    slug: "banana-si-ciocolata",
    name: "Banană și ciocolată",
    category: "torturi",
    shortDescription: "Banană dulce, cacao și nuci, într-o felie sățioasă.",
    ingredients: "Migdale, semințe floarea-soarelui, arahide, fulgi de ovăz, curmale, cacao, carob, unt de cacao, ulei de cocos, caju, lapte vegetal, banane, miere, turmeric, lămâie.",
    image: "/products/negresa-din-quinoa.jpg",
    imageAlt: "Felie raw vegană cu banană și ciocolată",
    badges: rawVeganBadges,
    available: true,
  },
  {
    slug: "espresso-cake",
    name: "Espresso cake",
    category: "torturi",
    shortDescription: "Cacao, cafea și vanilie într-un desert cu personalitate.",
    ingredients: "Nuci, fulgi de ovăz, cafea, caju, ulei de cocos, miere, vanilie, cremă de caju, lapte vegetal, cacao alcalină, carob, scorțișoară.",
    image: "/products/negresa-din-quinoa.jpg",
    imageAlt: "Felie raw vegană espresso cake",
    badges: rawVeganBadges,
    available: true,
  },
  {
    slug: "cheesecake-fructe-padure-portocala",
    name: "Cheesecake – fructe de pădure / portocală",
    category: "torturi",
    shortDescription: "Cheesecake raw cu alegere între fructe de pădure și portocală.",
    ingredients: "Migdale, semințe de floarea-soarelui, arahide, fulgi de cocos, curmale, caju, lămâie, lapte vegetal, ulei de cocos, miere, vanilie, sare, fructe de pădure sau portocală, agar-agar, agave BIO.",
    image: "/products/tarte-si-cozonac-raw.jpg",
    imageAlt: "Cheesecake raw vegan cu fructe de pădure",
    badges: rawVeganBadges,
    available: true,
  },
  {
    slug: "fructe-padure-si-ciocolata",
    name: "Fructe de pădure și ciocolată",
    category: "torturi",
    shortDescription: "Cacao și fructe de pădure, într-un contrast dulce-acrișor.",
    ingredients: "Migdale, fulgi de cocos și de ovăz, curmale, caju, ulei de cocos, fructe de pădure, lămâie, unt de cacao, lapte vegetal, miere, agave BIO, vanilie.",
    image: "/products/mix-felii-raw.jpg",
    imageAlt: "Felie raw vegană cu fructe de pădure și ciocolată",
    badges: rawVeganBadges,
    available: true,
    featured: true,
  },
  {
    slug: "tort-kinder",
    name: "Tort Kinder",
    category: "torturi-decor-copii",
    shortDescription: "Tort cremos de inspirație Kinder, potrivit pentru aniversări.",
    ingredients: "Migdale, curmale, fulgi de ovăz, fulgi de cocos, caju, ciocolată, cacao, ulei de cocos, lapte vegetal, miere, vanilie, sare.",
    image: "/products/mix-felii-raw.jpg",
    imageAlt: "Felie de tort raw vegan Kinder",
    badges: rawVeganBadges,
    available: true,
    featured: true,
  },
  {
    slug: "tort-cioco-fistic",
    name: "Tort cioco-fistic",
    category: "torturi",
    shortDescription: "Cacao intensă și fistic, cu cremă fină de caju.",
    ingredients: "Fistic, caju, fulgi de ovăz, curmale, cacao, ulei de cocos, lapte vegetal, miere, vanilie, sare.",
    image: "/products/negresa-din-quinoa.jpg",
    imageAlt: "Felie de tort raw vegan cu ciocolată și fistic",
    badges: rawVeganBadges,
    available: true,
  },
  {
    slug: "cioco-si-jeleu-fructe",
    name: "Cioco și jeleu de fructe",
    category: "torturi",
    shortDescription: "Ciocolată, fructe și un strat de jeleu delicat.",
    ingredients: "Făină de ovăz, curmale, cacao, caju, fructe de pădure, agar-agar, ulei de cocos, miere, vanilie.",
    image: "/products/mix-felii-raw.jpg",
    imageAlt: "Felie raw vegană cu ciocolată și jeleu de fructe",
    badges: rawVeganBadges,
    available: true,
  },
  {
    slug: "fistic-si-zmeura",
    name: "Fistic și zmeură",
    category: "torturi",
    shortDescription: "Fistic cremos, zmeură și o bază de nuci.",
    ingredients: "Fistic, caju, fulgi de ovăz, curmale, zmeură, ulei de cocos, lapte vegetal, miere, agar-agar, vanilie, sare.",
    image: "/products/tarte-si-cozonac-raw.jpg",
    imageAlt: "Felie raw vegană cu fistic și zmeură",
    badges: rawVeganBadges,
    available: true,
  },
  {
    slug: "tarta-banoffee",
    name: "Tartă Banoffee",
    category: "prajituri",
    shortDescription: "Banane, caramel natural și cremă de caju.",
    ingredients: "Migdale, semințe de floarea-soarelui, curmale, banane, caju, ulei de cocos, miere, vanilie, cacao, lapte vegetal.",
    image: "/products/tarte-si-cozonac-raw.jpg",
    imageAlt: "Tartă raw vegană Banoffee",
    badges: rawVeganBadges,
    available: true,
  },
  {
    slug: "amandina-raw-vegan",
    name: "Amandină Raw Vegan",
    category: "prajituri",
    shortDescription: "Amandină raw cu ciocolată, rom și nuci.",
    ingredients: "Fulgi de ovăz, curmale, caju, ulei de cocos, cacao, rom, nuci, lapte vegetal, miere, sare, vanilie.",
    image: "/products/negresa-din-quinoa.jpg",
    imageAlt: "Amandină raw vegană cu ciocolată",
    badges: rawVeganBadges,
    available: true,
    featured: true,
  },
  {
    slug: "menta-si-ciocolata",
    name: "Mentă și ciocolată",
    category: "prajituri",
    shortDescription: "Mentă răcoritoare și cacao, într-o felie catifelată.",
    ingredients: "Migdale, semințe de floarea-soarelui, curmale, fulgi de ovăz, caju, cacao, ulei de cocos, lapte vegetal, miere, mentă, lămâie, sare.",
    image: "/products/tarte-si-cozonac-raw.jpg",
    imageAlt: "Felie raw vegană cu mentă și ciocolată",
    badges: rawVeganBadges,
    available: true,
  },
  {
    slug: "diplomat-raw-vegan",
    name: "Diplomat Raw Vegan",
    category: "prajituri",
    shortDescription: "Cremă lejeră de caju, fructe și aromă de vanilie.",
    ingredients: "Fulgi de ovăz, semințe de floarea-soarelui, curmale, caju, lapte vegetal, ulei de cocos, miere, vanilie, fructe, lămâie.",
    image: "/products/tarte-si-cozonac-raw.jpg",
    imageAlt: "Felie de diplomat raw vegan",
    badges: rawVeganBadges,
    available: true,
  },
  {
    slug: "trufe",
    name: "Trufe",
    category: "bomboane-raw",
    shortDescription: "Bunătăți extra, pregătite pentru un răsfăț mic și intens.",
    ingredients: "Detalii despre ingrediente disponibile la cerere.",
    image: "/products/negresa-din-quinoa.jpg",
    imageAlt: "Desert raw vegan cu ciocolată",
    badges: ["bunătăți extra"],
    available: true,
  },
  {
    slug: "negresa-vegan",
    name: "Negresă vegană",
    category: "biscuiti-si-briose",
    shortDescription: "Negresă vegană din selecția de bunătăți extra.",
    ingredients: "Detalii despre ingrediente disponibile la cerere.",
    image: "/products/negresa-din-quinoa.jpg",
    imageAlt: "Negresă vegană RawMina",
    badges: ["bunătăți extra"],
    available: true,
  },
  {
    slug: "bounty",
    name: "Bounty",
    category: "bomboane-raw",
    shortDescription: "Cocos și ciocolată, în selecția de bunătăți extra.",
    ingredients: "Detalii despre ingrediente disponibile la cerere.",
    image: "/products/mix-felii-raw.jpg",
    imageAlt: "Desert raw vegan cu ciocolată și cocos",
    badges: ["bunătăți extra"],
    available: true,
  },
  {
    slug: "toffifee",
    name: "Toffifee",
    category: "bomboane-raw",
    shortDescription: "O bunătate extra cu arome de nuci, caramel și cacao.",
    ingredients: "Detalii despre ingrediente disponibile la cerere.",
    image: "/products/mix-felii-raw.jpg",
    imageAlt: "Desert raw vegan cu arahide și cacao",
    badges: ["bunătăți extra"],
    available: true,
  },
  {
    slug: "prune-in-ciocolata",
    name: "Prune în ciocolată",
    category: "bomboane-raw",
    shortDescription: "Prune învelite în ciocolată, din selecția de bunătăți extra.",
    ingredients: "Detalii despre ingrediente disponibile la cerere.",
    image: "/products/negresa-din-quinoa.jpg",
    imageAlt: "Desert raw vegan cu ciocolată",
    badges: ["bunătăți extra"],
    available: true,
  },
];

export const products: Product[] = menuProducts.map((product) => ({
  ...product,
  price: 170,
  salesMode: product.category === "torturi" || product.category === "torturi-decor-copii" ? "weight" : "piece",
  priceUnit: product.category === "torturi" || product.category === "torturi-decor-copii" ? " / kg" : " / buc",
  unitWeightGrams: product.category === "torturi" || product.category === "torturi-decor-copii" ? undefined : 150,
}));

export const featuredProducts = products.filter((product) => product.featured);

export function productsByCategory(category: Category | "toate") {
  if (category === "toate") {
    return products;
  }

  return products.filter((product) => product.category === category);
}
