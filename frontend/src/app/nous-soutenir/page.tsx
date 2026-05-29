import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Nous soutenir | L\'Appel d\'Être',
    description: 'Soutenir le magazine pour faire grandir une culture du vivant, indépendante et accessible.',
};

export default function SupportPage() {
    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <span className="eyebrow">Nous soutenir</span>
                <h1 className={styles.title}>Faire vivre un magazine independant sur le vivant</h1>
                <p className={styles.lead}>
                    Votre soutien permet de financer la publication, l&apos;edition et la diffusion d&apos;articles qui
                    renforcent le lien au vivant.
                </p>
            </section>

            <section className={styles.grid}>
                <article className={`${styles.card} surface-card`}>
                    <h2 className={styles.cardTitle}>Pourquoi soutenir le magazine</h2>
                    <p>
                        Pour conserver une ligne editoriale exigeante, publier dans la duree et garder une
                        experience de lecture sobre, claire et accessible sur mobile comme sur desktop.
                    </p>
                </article>

                <article className={`${styles.card} surface-card`}>
                    <h2 className={styles.cardTitle}>Formes de soutien</h2>
                    <p>
                        Vous pouvez relayer les articles, partager le compte Instagram du magazine et preparer une
                        future campagne de contribution lorsque le dispositif sera ouvert.
                    </p>
                </article>
            </section>

            <div className={styles.actions}>
                <Link
                    href="/"
                    className={styles.backLink}
                >
                    Retour au magazine
                </Link>
            </div>
        </div>
    );
}