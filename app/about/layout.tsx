import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata(
  '/about',
  "About Us",
  "Biosite Medical Instruments, Inc. provides advanced diagnostic and medical equipment to laboratories and hospitals across the Philippines, with offices in Manila, Cebu and Davao.",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
