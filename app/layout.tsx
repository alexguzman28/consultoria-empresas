import type { Metadata } from 'next';
import { JetBrains_Mono, Public_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-public-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vértice | Toma Decisiones Empresariales con Datos y Ejecución Real',
  description:
    'Consultoría de inteligencia operativa, analítica financiera en tiempo real y reestructuración de empresas para maximizar EBITDA y flujo de efectivo.',
};

export interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="es-MX"
      className={`${publicSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#09090B] text-white antialiased selection:bg-[#F27427] selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[#F27427] focus:px-4 focus:py-2.5 focus:text-xs focus:font-bold focus:text-white"
        >
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
