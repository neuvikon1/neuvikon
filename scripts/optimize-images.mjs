// Usage: node scripts/optimize-images.mjs [--keep] — converts PNG/JPG under public/apps (icons, 384px) and public/media (long edge 1600px) to WebP q80 and deletes the originals; then update references in lib/content.*.ts.
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const keepOriginals = process.argv.includes("--keep");

/**
 * App icons render at most 112 CSS px (project page, md:size-28), so 384px
 * covers 3x screens. Screenshots open full-size in the gallery viewer, so
 * they keep up to 1600px on the long edge.
 */
const targets = [
  { dir: "public/apps", maxEdge: 384, quality: 82 },
  { dir: "public/media", maxEdge: 1600, quality: 80 },
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let before = 0;
let after = 0;
for (const { dir, maxEdge, quality } of targets) {
  for await (const file of walk(path.join(root, dir))) {
    if (!/\.(png|jpe?g)$/i.test(file)) continue;
    const out = file.replace(/\.(png|jpe?g)$/i, ".webp");
    const info = await sharp(file)
      .rotate()
      .resize(maxEdge, maxEdge, { fit: "inside", withoutEnlargement: true })
      .webp({ quality, effort: 6, smartSubsample: true })
      .toFile(out);
    const oldSize = (await stat(file)).size;
    before += oldSize;
    after += info.size;
    console.log(
      `${path.relative(root, file)} -> ${path.basename(out)}  ${(oldSize / 1024).toFixed(0)} KB -> ${(info.size / 1024).toFixed(0)} KB (${info.width}x${info.height})`,
    );
    if (!keepOriginals) await unlink(file);
  }
}
console.log(`total ${(before / 1048576).toFixed(2)} MB -> ${(after / 1048576).toFixed(2)} MB`);
