import './globals.css';
import { AppProvider } from '@/components/app-provider';
import { Navbar, Footer } from '@/components/chrome';
export const metadata = { title: 'FitLog — Workout Library', description: 'Train with intent. Log every set.' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><AppProvider><Navbar /><main>{children}</main><Footer /></AppProvider></body></html>; }