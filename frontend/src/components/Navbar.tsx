import Link from 'next/link';
import type { Category } from '@/types/strapi';
import styles from './Navbar.module.css';

interface NavbarProps {
    categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
    const instagramHref = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/';

    return (
        <header className={styles.header}>
            <nav
                className={styles.nav}
                aria-label="Navigation principale"
            >
                <div className={styles.topRow}>
                    <Link
                        href="/"
                        className={styles.logo}
                    >
                        L&apos;Appel d&apos;Être
                    </Link>

                    <div className={styles.quickLinks}>
                        <Link
                            href="/nous-soutenir"
                            className={`${styles.utilityLink} ${styles.supportLink}`}
                        >
                            Nous soutenir
                        </Link>
                        <a
                            href={instagramHref}
                            target="_blank"
                            rel="noreferrer"
                            className={`${styles.utilityLink} ${styles.instagramLink}`}
                        >
                            Instagram
                        </a>
                    </div>
                </div>

                <form
                    action="/"
                    method="get"
                    className={styles.searchForm}
                    role="search"
                >
                    <label
                        htmlFor="site-search"
                        className={styles.srOnly}
                    >
                        Rechercher un article
                    </label>
                    <input
                        id="site-search"
                        type="search"
                        name="q"
                        placeholder="Rechercher un article"
                        className={styles.searchInput}
                    />
                    <button
                        type="submit"
                        className={styles.searchButton}
                    >
                        Recherche
                    </button>
                </form>

                <ul className={styles.links}>
                    <li>
                        <Link
                            href="/"
                            className={styles.link}
                        >
                            Accueil
                        </Link>
                    </li>
                    {categories.map((cat) => (
                        <li key={cat.id}>
                            <Link
                                href={`/categories/${cat.slug}`}
                                className={styles.link}
                            >
                                {cat.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
