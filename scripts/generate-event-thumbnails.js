/**
 * Generate web-sized copies of the Events gallery photos in DigitalOcean Spaces.
 *
 * The gallery originals are straight-off-the-camera JPGs (7–11 MB each). The
 * page only needs a small thumbnail for the scrolling rows and a screen-sized
 * image for the lightbox, so for every original this writes:
 *
 *   biosite-web/events/events-gallery-optimized/<folder>/<name>.thumb.webp  (640px wide)
 *   biosite-web/events/events-gallery-optimized/<folder>/<name>.large.webp  (1920px wide)
 *
 * Originals are never modified. /api/event-gallery picks the copies up
 * automatically and falls back to the original for any photo without one.
 *
 * Run after uploading new event photos:
 *   node scripts/generate-event-thumbnails.js
 *
 * Needs DO_SPACES_KEY / DO_SPACES_SECRET (read from .env.local if present).
 * Already-generated photos are skipped, so re-running is cheap.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const S3 = require('aws-sdk/clients/s3');

const envFile = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '');
  }
}

const BUCKET = 'biositeassets';
const SOURCE_PREFIX = 'biosite-web/events/events-gallery/';
const OUTPUT_PREFIX = 'biosite-web/events/events-gallery-optimized/';
const IMAGE_EXT = /\.(jpe?g|png|gif|webp|bmp)$/i;
const SIZES = [
  { suffix: 'thumb', width: 640, quality: 70 },
  { suffix: 'large', width: 1920, quality: 80 },
];
const CONCURRENCY = 4;

const s3 = new S3({
  endpoint: 'https://sgp1.digitaloceanspaces.com',
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

async function listAll(prefix) {
  const keys = [];
  let token;
  do {
    const res = await s3.listObjectsV2({ Bucket: BUCKET, Prefix: prefix, ContinuationToken: token }).promise();
    keys.push(...(res.Contents || []).map((o) => o.Key));
    token = res.NextContinuationToken;
  } while (token);
  return keys;
}

/** biosite-web/events/events-gallery/Slide2/JAC01603.JPG -> .../events-gallery-optimized/Slide2/JAC01603.JPG.thumb.webp */
const outputKey = (sourceKey, suffix) => `${OUTPUT_PREFIX}${sourceKey.slice(SOURCE_PREFIX.length)}.${suffix}.webp`;

async function main() {
  if (!process.env.DO_SPACES_KEY || !process.env.DO_SPACES_SECRET) {
    throw new Error('DO_SPACES_KEY / DO_SPACES_SECRET are not set');
  }

  const sources = (await listAll(SOURCE_PREFIX)).filter((k) => IMAGE_EXT.test(k));
  const existing = new Set(await listAll(OUTPUT_PREFIX));
  const todo = sources.filter((k) => SIZES.some((s) => !existing.has(outputKey(k, s.suffix))));

  console.log(`${sources.length} gallery photos, ${todo.length} need web copies.`);

  let done = 0;
  let savedBytes = 0;
  const queue = [...todo];
  const worker = async () => {
    while (queue.length) {
      const key = queue.shift();
      try {
        const original = await s3.getObject({ Bucket: BUCKET, Key: key }).promise();
        for (const { suffix, width, quality } of SIZES) {
          const body = await sharp(original.Body)
            .rotate() // honour the camera's EXIF orientation
            .resize({ width, withoutEnlargement: true })
            .webp({ quality })
            .toBuffer();
          await s3
            .putObject({
              Bucket: BUCKET,
              Key: outputKey(key, suffix),
              Body: body,
              ACL: 'public-read',
              ContentType: 'image/webp',
              CacheControl: 'public, max-age=31536000, immutable',
            })
            .promise();
          if (suffix === 'thumb') savedBytes += original.ContentLength - body.length;
        }
        done++;
        console.log(`[${done}/${todo.length}] ${key.slice(SOURCE_PREFIX.length)}`);
      } catch (err) {
        console.error(`FAILED ${key}:`, err.message);
      }
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  console.log(`Done. Thumbnails are ~${Math.round(savedBytes / 1048576)} MB smaller than the originals in total.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
