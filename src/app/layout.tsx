import type { Metadata } from 'next';
import '../index.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ThemeProvider } from '../components/ThemeProvider';
import { SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from '../data/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: '/assets/favicon.svg',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: ['/assets/letter-g.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/assets/letter-g.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] overflow-x-clip">
        <ThemeProvider>
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-[200] -translate-y-20 rounded-lg
                       bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white
                       shadow-lg outline-none transition-transform duration-150
                       focus-visible:translate-y-0"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1 overflow-x-clip pt-[5rem] sm:pt-[5.5rem]" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
