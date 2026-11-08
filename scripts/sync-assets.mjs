/** Restore the locally hosted design assets (fonts, decorative SVGs, flower videos). Existing files are kept.
 * TREO photography is restored with scripts/scrape_treo_assets.py instead. */
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { flowers } from '../src/data/flowers.js';

const root = fileURLToPath(new URL("../", import.meta.url));
const manifest = JSON.parse(
  await readFile(resolve(root, "src/data/asset-manifest.json"), "utf8"),
);


const queue = Object.entries(manifest);
for (const flower of Object.values(flowers)) {
  for (const format of ['webm', 'mov']) {
    queue.push([
      `https://assets.example.com/flowers/${flower[format].split('/').pop()}`,
      flower[format],
    ]);
  }
}
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const [url, localPath] = queue.shift();
      const destination = resolve(root, "public", localPath.slice(1));
      if (await stat(destination).catch(() => null)) continue;
      await mkdir(dirname(destination), { recursive: true });
      if (url.includes("/plugins/Basic/assets/placeholder")) {
        await writeFile(
          destination,
          '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>',
        );
        continue;
      }
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Failed to download ${url}: ${response.status}`);
      await writeFile(destination, Buffer.from(await response.arrayBuffer()));
      console.log(`Saved ${localPath}`);
    }
  }),
);
