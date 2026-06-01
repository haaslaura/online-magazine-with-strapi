import type { Metadata } from 'next';
import styles from '../static-page.module.css';

export const metadata: Metadata = {
    title: 'Mentions legales | L\'Appel d\'Etre',
    description: 'Informations legales relatives a l edition et a l hebergement du site.',
};

export default function LegalPage() {
    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <span className="eyebrow">Mentions legales</span>
                <h1 className={styles.title}>Cadre legal du site</h1>
                <p className={styles.lead}>
                    Cette page rassemble les informations d edition, d hebergement et de responsabilite necessaires
                    au fonctionnement du magazine.
                </p>
            </section>

            <section className={styles.grid}>
                <article className={`${styles.card} surface-card`}>
                    <h2 className={styles.cardTitle}>Edition</h2>
                    <p className={styles.copy}>
                        Renseigner ici le nom de la structure editrice, le responsable de publication et les moyens de
                        contact officiels utilises par le magazine.
                    </p>
                </article>

                <article className={`${styles.card} surface-card`}>
                    <h2 className={styles.cardTitle}>Hebergement</h2>
                    <p className={styles.copy}>
                        Renseigner ici le nom de l hebergeur, son adresse et ses coordonnees, puis completer au besoin
                        les informations relatives a la propriete intellectuelle.
                    </p>
                </article>
            </section>
        </div>
    );
}