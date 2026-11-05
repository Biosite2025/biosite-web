import type { Metadata } from 'next';

export const SITE_URL = 'https://biositeph.com';
export const SITE_NAME = 'Biosite Medical Instruments, Inc.';

/** Title, description and self-referencing canonical for one page. */
export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { title, description },
  };
}
