import { redirect } from 'next/navigation';

export default function Home() {
  // Direct redirect to about page as the landing page
  redirect('/user/about');
  return null;
}