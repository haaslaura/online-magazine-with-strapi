import Link from 'next/link';
import styles from './(pages)/static-page.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <span className="eyebrow">404</span>
                <h1 className={styles.title}>Cette page n existe pas</h1>
                <p className={styles.lead}>
                    Le contenu demande est introuvable. Vous pouvez revenir a l accueil ou parcourir les pages du
                    magazine a partir des categories disponibles.
                </p>
            </section>

            <div className={styles.actions}>
                <Link
                    href="/"
                    className={styles.button}
                >
                    Retour a l accueil
                </Link>
                <Link
                    href="/a-propos"
                    className={styles.link}
                >
                    Aller a la page A propos
                </Link>
            </div>
        </div>
    );
}