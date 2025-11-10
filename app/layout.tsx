import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import MotionProvider from '@/components/MotionProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AssistantButton from '@/components/AssistantButton';
import FloatingActions from '@/components/FloatingActions';
import { CartProvider } from '@/components/CartContext';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { AuthProvider } from '@/components/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Monga Electricals | Sirsa',
  description: 'Your trusted electricals partner in Sirsa — MCBs, Wires, Lighting, Fans, and more.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'Monga Electricals | Sirsa',
    description: 'Your trusted electricals partner in Sirsa — MCBs, Wires, Lighting, Fans, and more.',
    siteName: 'Monga Electricals',
    locale: 'en_IN',
    type: 'website',
  },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <MotionProvider>
          <CartProvider>
            <GoogleAnalytics />
            <AuthProvider>
              <Navbar />
              <main className="pt-16">{/* offset for fixed navbar (h-16) */}
                {children}
              </main>
              <Footer />
              <FloatingActions />
              <AssistantButton />
            </AuthProvider>
          </CartProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
