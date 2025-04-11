import { QueryProvider } from '@/providers/QueryProvider';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'National Football Championship Manager',
  description: 'Manage national football championships',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='{inter.className}'>
        <QueryProvider>
          <Navbar />
          <main className='container mx-auto p-4'>{children}</main>
        </QueryProvider>
        
      </body>
    </html>
  );
}
