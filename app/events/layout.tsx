import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata(
  '/events',
  "Events",
  "See the latest events, exhibits and photo galleries from Biosite Medical Instruments, Inc.",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
