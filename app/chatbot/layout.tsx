import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata(
  '/chatbot',
  "Ask Biomi",
  "Ask Biomi, the Biosite virtual assistant, about our products, offices and careers.",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
