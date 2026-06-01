import type { Metadata } from 'next';
import styles from '../static-page.module.css';

export const metadata: Metadata = {
    title: 'Confidentialite | L\'Appel d\'Etre',
    description: 'Informations sur la collecte, l usage et la conservation des donnees personnelles du site.',
};

export default function PrivacyPage() {
    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <span className="eyebrow">Confidentialite</span>
                <h1 className={styles.title}>Protection des donnees et usages du site</h1>
                <p className={styles.lead}>
                    Cette page documente la collecte eventuelle de donnees, les outils de mesure d audience et les
                    modalites de conservation ou de suppression appliquees au front.
                </p>
            </section>

            <section className={styles.grid}>
                <article className={`${styles.card} surface-card`}>
                    <h2 className={styles.cardTitle}>Donnees collectees</h2>
                    <p className={styles.copy}>
                        Preciser ici les donnees traitees par le site, les formulaires concernes et la base legale
                        associee a chaque usage lorsque le produit evoluera.
                    </p>
                </article>

                <article className={`${styles.card} surface-card`}>
                    <h2 className={styles.cardTitle}>Droits des utilisateurs</h2>
                    <p className={styles.copy}>
                        Indiquer ici les modalites pour exercer les droits d acces, de rectification, d opposition et
                        d effacement, ainsi que le contact de reference.
                    </p>
                </article>
            </section>
        </div>
    );
}