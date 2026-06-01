import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../static-page.module.css';

export const metadata: Metadata = {
    title: 'Espace professionnel | L\'Appel d\'Etre',
    description: 'Informations de contact et de collaboration pour les partenaires, auteurs et structures culturelles.',
};

export default function ProfessionalPage() {
    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <span className="eyebrow">Espace professionnel</span>
                <h1 className={styles.title}>Collaborer avec le magazine</h1>
                <p className={styles.lead}>
                    Cette page centralise les informations utiles pour les partenaires editoriaux, les institutions,
                    les auteurs et les structures qui souhaitent contribuer au projet.
                </p>
            </section>

            <section className={styles.grid}>
                <article className={`${styles.card} surface-card`}>
                    <h2 className={styles.cardTitle}>Contributions</h2>
                    <p className={styles.copy}>
                        Propositions de sujets, contributions redactionnelles et collaborations ponctuelles peuvent
                        etre presentees ici avec un cadre editorial et des contacts dedies.
                    </p>
                </article>

                <article className={`${styles.card} surface-card`}>
                    <h2 className={styles.cardTitle}>Partenariats</h2>
                    <p className={styles.copy}>
                        Diffusion, coproduction, interventions et relais institutionnels peuvent y etre documentes,
                        avec les attentes et modalites de prise de contact.
                    </p>
                </article>
            </section>

            <div className={styles.actions}>
                <Link
                    href="/a-propos"
                    className={styles.link}
                >
                    En savoir plus sur le projet
                </Link>
            </div>
        </div>
    );
}