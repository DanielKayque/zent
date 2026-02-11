import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import "@/app/globals.css";
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import PrivateRoute from '../components/Auth/PrivateRoute';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Zent | Gestão de eventos e check-in via QR Code',
  description:
    'A plataforma mais simples para criar eventos, vender ingressos e fazer check-in via QR Code. Foco total na experiência do seu participante.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrivateRoute>
      <div className={'antialiased' + inter.variable}>
        {children}
        <Footer />
      </div>
    </PrivateRoute>
  );
}
