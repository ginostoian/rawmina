import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "public", "products", "recreated");
const sources = {
  collageA: "/Users/gino_s/Downloads/IMG_2718.JPG",
  collageB: "/Users/gino_s/Downloads/IMG_2717.JPG",
};

const products = [
  {
    source: "collageA",
    name: "tort Kinder",
    slug: "tort-kinder",
    crop: { left: 7, top: 42, width: 106, height: 96 },
  },
  {
    source: "collageA",
    name: "tarta Banoffee",
    slug: "tarta-banoffee",
    crop: { left: 0, top: 184, width: 113, height: 92 },
  },
  {
    source: "collageA",
    name: "menta si ciocolata",
    slug: "menta-si-ciocolata",
    crop: { left: 8, top: 353, width: 105, height: 97 },
  },
  {
    source: "collageA",
    name: "fistic si zmeura",
    slug: "fistic-si-zmeura",
    crop: { left: 120, top: 0, width: 105, height: 94 },
  },
  {
    source: "collageA",
    name: "amandina RawVegan",
    slug: "amandina-rawvegan",
    crop: { left: 119, top: 140, width: 104, height: 80 },
  },
  {
    source: "collageA",
    name: "diplomat RawVegan",
    slug: "diplomat-rawvegan",
    crop: { left: 121, top: 310, width: 104, height: 79 },
  },
  {
    source: "collageA",
    name: "tort cioco-fistic",
    slug: "tort-cioco-fistic",
    crop: { left: 229, top: 52, width: 106, height: 86 },
  },
  {
    source: "collageA",
    name: "cioco si jeleu fructe",
    slug: "cioco-si-jeleu-fructe",
    crop: { left: 347, top: 5, width: 95, height: 95 },
  },
  {
    source: "collageB",
    name: "snickers",
    slug: "snickers",
    crop: { left: 6, top: 63, width: 154, height: 128 },
  },
  {
    source: "collageB",
    name: "portocala si ciocolata",
    slug: "portocala-si-ciocolata",
    crop: { left: 12, top: 274, width: 140, height: 130 },
  },
  {
    source: "collageB",
    name: "banana si ciocolata",
    slug: "banana-si-ciocolata",
    crop: { left: 8, top: 508, width: 150, height: 132 },
  },
  {
    source: "collageB",
    name: "fructe de padure + ciocolata alba sau cocos",
    slug: "fructe-de-padure-ciocolata-alba-sau-cocos",
    crop: { left: 176, top: 0, width: 134, height: 130 },
  },
  {
    source: "collageB",
    name: "ciocolata si cocos",
    slug: "ciocolata-si-cocos",
    crop: { left: 168, top: 226, width: 138, height: 128 },
  },
  {
    source: "collageB",
    name: "cheesecake fructe de padure / portocala",
    slug: "cheesecake-fructe-de-padure-portocala",
    crop: { left: 174, top: 459, width: 136, height: 102 },
  },
  {
    source: "collageB",
    name: "lamaie si vanilie",
    slug: "lamaie-si-vanilie",
    crop: { left: 327, top: 85, width: 145, height: 116 },
  },
  {
    source: "collageB",
    name: "fructe de padure si banana",
    slug: "fructe-de-padure-si-banana",
    crop: { left: 343, top: 291, width: 126, height: 96 },
  },
  {
    source: "collageB",
    name: "espresso cake",
    slug: "espresso-cake",
    crop: { left: 320, top: 512, width: 146, height: 128 },
  },
  {
    source: "collageB",
    name: "lime si cocos",
    slug: "lime-si-cocos",
    crop: { left: 480, top: 0, width: 160, height: 146 },
  },
  {
    source: "collageB",
    name: "ciocolata si caramel",
    slug: "ciocolata-si-caramel",
    crop: { left: 492, top: 208, width: 135, height: 124 },
  },
  {
    source: "collageB",
    name: "fructe de padure si ciocolata",
    slug: "fructe-de-padure-si-ciocolata",
    crop: { left: 480, top: 433, width: 160, height: 119 },
  },
];

async function makeProductImage(product) {
  const sourcePath = sources[product.source];
  const crop = await sharp(sourcePath).extract(product.crop).rotate().toBuffer();

  const output = await sharp(crop)
    .resize(1200, 1200, {
      fit: "cover",
      position: "center",
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 0.8, m1: 0.6, m2: 1.2 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();

  const out = path.join(outDir, `${product.slug}.jpg`);
  await fs.writeFile(out, output);
  return { ...product, file: out };
}

function escapeXml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function makeContactSheet(items) {
  const tile = 220;
  const labelHeight = 44;
  const gap = 18;
  const columns = 4;
  const rows = Math.ceil(items.length / columns);
  const width = columns * tile + (columns + 1) * gap;
  const height = rows * (tile + labelHeight) + (rows + 1) * gap;

  const composites = [];
  for (const [index, item] of items.entries()) {
    const col = index % columns;
    const row = Math.floor(index / columns);
    const left = gap + col * (tile + gap);
    const top = gap + row * (tile + labelHeight + gap);
    const thumb = await sharp(item.file)
      .resize(tile, tile, { fit: "cover" })
      .jpeg({ quality: 86 })
      .toBuffer();

    const label = Buffer.from(`
      <svg width="${tile}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">
        <style>
          text { font-family: Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 700; fill: #5d2b2c; }
        </style>
        <rect width="100%" height="100%" fill="#fbf7f0"/>
        <text x="8" y="25">${escapeXml(item.name)}</text>
      </svg>
    `);

    composites.push({ input: thumb, left, top });
    composites.push({ input: label, left, top: top + tile });
  }

  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: "#f2eadf",
    },
  })
    .composite(composites)
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(outDir, "contact-sheet.jpg"));
}

await fs.mkdir(outDir, { recursive: true });
const exported = [];
for (const product of products) {
  exported.push(await makeProductImage(product));
}

await makeContactSheet(exported);
await fs.writeFile(
  path.join(outDir, "products.json"),
  `${JSON.stringify(
    exported.map(({ name, slug, file }) => ({
      name,
      slug,
      image: `/products/recreated/${path.basename(file)}`,
    })),
    null,
    2,
  )}\n`,
);

console.log(`Exported ${exported.length} product images to ${outDir}`);
