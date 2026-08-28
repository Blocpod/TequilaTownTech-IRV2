import sharp from 'sharp';

const [input, output] = process.argv.slice(2);

if (!input || !output) {
  throw new Error('Usage: node scripts/extract-logo-alpha.mjs <input> <output>');
}

const source = sharp(input);
const { data, info } = await source.raw().toBuffer({ resolveWithObject: true });
const rgba = Buffer.alloc(info.width * info.height * 4);

let minX = info.width;
let minY = info.height;
let maxX = 0;
let maxY = 0;

for (let i = 0; i < info.width * info.height; i += 1) {
  const r = data[i * info.channels];
  const g = data[i * info.channels + 1];
  const b = data[i * info.channels + 2];
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  const alpha = Math.max(0, Math.min(255, Math.round((chroma - 3) * 7.4)));

  rgba[i * 4] = r;
  rgba[i * 4 + 1] = g;
  rgba[i * 4 + 2] = b;
  rgba[i * 4 + 3] = alpha;

  if (alpha > 10) {
    const x = i % info.width;
    const y = Math.floor(i / info.width);
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
}

const pad = 28;
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const width = Math.min(info.width - left, maxX - minX + 1 + pad * 2);
const height = Math.min(info.height - top, maxY - minY + 1 + pad * 2);

await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
  .extract({ left, top, width, height })
  .png({ compressionLevel: 9 })
  .toFile(output);
