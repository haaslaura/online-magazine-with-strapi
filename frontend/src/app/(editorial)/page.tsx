import Link from 'next/link';
import { getArticles } from '@/lib/strapi';
import ArticleCard from '@/components/ArticleCard';
import styles from './page.module.css';

export const revalidate = 60;

interface HomePageProps {
    searchParams: Promise<{ q?: string | string[] }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
    const resolvedSearchParams = await searchParams;
    const rawQuery = Array.isArray(resolvedSearchParams.q) ? resolvedSearchParams.q[0] : resolvedSearchParams.q;
    const query = rawQuery?.trim() ?? '';
    const hasQuery = query.length > 0;

    let articles: import('@/types/strapi').Article[] = [];
    try {
        const res = await getArticles({
            'pagination[pageSize]': hasQuery ? '24' : '12',
            ...(hasQuery
                ? {
                      'filters[$or][0][title][$containsi]': query,
                      'filters[$or][1][excerpt][$containsi]': query,
                  }
                : {}),
        });
        articles = res.data ?? [];
    } catch (error) {
        console.error('Error fetching articles:', error);
    }

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <span className="eyebrow">Pour une culture du vivant</span>
                <h1 className={styles.heroTitle}>L&apos;Appel d&apos;Etre magazine</h1>
                <p className={styles.heroSubtitle}>
                    L&apos;Appel d&apos;etre est est un magazine en ligne consacre au vivant, a la biodiversite et a
                    recreer du lien avec la nature.
                </p>
            </section>

            <section className={styles.section}>
                <div className="section-heading">
                    <h2 className={styles.sectionTitle}>{hasQuery ? `Recherche : ${query}` : 'Derniers articles'}</h2>
                    <p>
                        {hasQuery
                            ? 'Consultez les articles qui correspondent a votre recherche, avec une lecture pensee d abord pour le mobile.'
                            : 'Une grille d articles pensee pour mettre en avant les categories, les auteurs et la hierarchie des contenus sans surcharger l interface.'}
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
                        {hasQuery ? (
                            <>
                                Aucun article ne correspond a votre recherche. Revenez a{' '}
                                <Link href="/">la selection editoriale</Link>.
                            </>
                        ) : (
                            <>
                                No articles yet. Add content in the{' '}
                                <a
                                    href="http://localhost:1337/admin"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Strapi admin panel
                                </a>
                                .
                            </>
                        )}
                    </p>
                )}
            </section>
        </div>
    );
}