import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata(
  '/career',
  "Careers",
  "Join Biosite Medical Instruments, Inc. Browse current job openings and apply online.",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
