import { S3Client } from '@aws-sdk/client-s3';

// DigitalOcean Spaces (S3-compatible). The SDK's default checksum headers are
// not accepted by every S3-compatible service, so only send them when required.
export const spaces = new S3Client({
  endpoint: 'https://sgp1.digitaloceanspaces.com',
  region: 'sgp1',
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY ?? '',
    secretAccessKey: process.env.DO_SPACES_SECRET ?? '',
  },
  requestChecksumCalculation: 'WHEN_REQUIRED',
  responseChecksumValidation: 'WHEN_REQUIRED',
});
