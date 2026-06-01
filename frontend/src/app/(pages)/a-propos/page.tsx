import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../static-page.module.css';

export const metadata: Metadata = {
    title: 'A propos | L\'Appel d\'Etre',
    description: 'Presentation du magazine, de sa ligne editoriale et de sa mission autour du vivant.',
};

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <span className="eyebrow">A propos</span>
                <h1 className={styles.title}>Un magazine pour relier recits, pratiques et culture du vivant</h1>
                <p className={styles.lead}>
                    L&apos;Appel d&apos;Etre publie des articles, entretiens et ressources qui aident a retisser un lien
                    sensible, politique et pratique avec le vivant.
                </p>
            </section>

            <section className={styles.grid}>
                <article className={`${styles.card} surface-card`}>
                    <h2 className={styles.cardTitle}>La ligne editoriale</h2>
                    <p className={styles.copy}>
                        Le magazine privilegie des formats longs, une lecture confortable et une navigation qui met
                        les categories et les parcours de lecture au premier plan.
                    </p>
                </article>

                <article className={`${styles.card} surface-card`}>
                    <h2 className={styles.cardTitle}>Le projet</h2>
                    <p className={styles.copy}>
                        Le site est pense comme une publication evolutive : chaque categorie constitue une entree de
                        lecture, et chaque article conserve une mise en page editoriale stable.
                    </p>
                </article>
            </section>

            <div className={styles.actions}>
                <Link
                    href="/"
                    className={styles.button}
                >
                    Retour a l accueil
                </Link>
                <Link
                    href="/espace-professionnel"
                    className={styles.link}
                >
                    Voir l espace professionnel
                </Link>
            </div>
        </div>
    );
}