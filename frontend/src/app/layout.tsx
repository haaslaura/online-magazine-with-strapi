import type { Metadata } from 'next';
import Link from 'next/link';
import { Lato, Playfair_Display } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { getCategories } from '@/lib/strapi';
import './globals.css';

const bodyFont = Lato({
    subsets: ['latin'],
    weight: ['400', '700', '900'],
    variable: '--font-sans',
});

const displayFont = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-display',
});

export const metadata: Metadata = {
    title: "L'Appel d'être magazine | Pour une culture du vivant",
    description: "L'Appel d'être est est un magazine en ligne consacré au vivant, à la biodiversité et à recréer du lien avec la nature.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let categories: import('@/types/strapi').Category[] = [];
    try {
        const res = await getCategories();
        categories = res.data ?? [];
    } catch {
        // Strapi may not be running during build; gracefully degrade
    }

    return (
        <html lang="fr">
            <body className={`${bodyFont.variable} ${displayFont.variable}`}>
                <Navbar categories={categories} />
                <main className="page-shell">{children}</main>
                <footer className="site-footer">
                    <div className="content-container site-footer-inner">
                        <nav
                            className="footer-links"
                            aria-label="Liens secondaires"
                        >
                            <Link href="/a-propos">A propos</Link>
                            <Link href="/espace-professionnel">Espace professionnel</Link>
                            <Link href="/mentions-legales">Mentions legales</Link>
                            <Link href="/confidentialite">Confidentialite</Link>
                        </nav>
                        <p>
                            © {new Date().getFullYear()} L&apos;Appel d&apos;Être, est un projet du collectif Les
                            Œuvres Vives. Site realise par Laura Haas.
                        </p>
                    </div>
                </footer>
            </body>
        </html>
    );
}
