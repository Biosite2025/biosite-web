import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/user/about');
  return null;
}