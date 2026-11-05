import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata(
  '/contact',
  "Contact Us",
  "Contact Biosite Medical Instruments, Inc. for quotations, sales and technical service. Offices in Manila, Cebu and Davao, Philippines.",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
