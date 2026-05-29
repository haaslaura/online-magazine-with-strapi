import { getArticles } from '@/lib/strapi';
import ArticleCard from '@/components/ArticleCard';
import styles from './page.module.css';

export const revalidate = 60;

export default async function HomePage() {
    let articles: import('@/types/strapi').Article[] = [];
    try {
        const res = await getArticles({ 'pagination[pageSize]': '12' });
        articles = res.data ?? [];
    } catch (error) {
        console.error("Error fetching articles:", error);
    }

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <span className="eyebrow">Pour une culture du vivant</span>
                <h1 className={styles.heroTitle}>L&apos;Appel d&apos;Être magazine</h1>
                <p className={styles.heroSubtitle}>
                    L&apos;Appel d&apos;être est est un magazine en ligne consacré au vivant, à la biodiversité et à recréer du lien avec la nature.
                </p>
            </section>

            <section className={styles.section}>
                <div className="section-heading">
                    <h2 className={styles.sectionTitle}>Derniers articles</h2>
                    <p>
                        Une grille d&apos;articles pensee pour mettre en avant les categories, les auteurs et la
                        hierarchie des contenus sans surcharger l&apos;interface.
                    </p>
                </div>
                {articles.length > 0 ? (
                    <div className={styles.grid}>
                        {articles.map((article) => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                            />
                        ))}
                    </div>
                ) : (
                    <p className={styles.empty}>
                        No articles yet. Add content in the{' '}
                        <a
                            href="http://localhost:1337/admin"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Strapi admin panel
                        </a>
                        .
                    </p>
                )}
            </section>
        </div>
    );
}
