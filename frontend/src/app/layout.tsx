import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Layout from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
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
          
          
          {children}  
    
        
      </body>
    </html>
  );
}
