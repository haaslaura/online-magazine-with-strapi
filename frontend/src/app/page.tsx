import { getArticles } from '@/lib/strapi';
import ArticleCard from '@/components/ArticleCard';
import styles from './page.module.css';

export const revalidate = 60;

export default async function HomePage() {
  let articles: import("@/types/strapi").Article[] = [];
  try {
    const res = await getArticles({ 'pagination[pageSize]': '12' });
    articles = res.data ?? [];
  } catch {
    // Strapi may not be running; render empty state
  }

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Online Magazine</h1>
        <p className={styles.heroSubtitle}>
          Discover the latest articles, stories, and insights.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Latest Articles</h2>
        {articles.length > 0 ? (
          <div className={styles.grid}>
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>
            No articles yet. Add content in the{' '}
            <a href="http://localhost:1337/admin" target="_blank" rel="noreferrer">
              Strapi admin panel
            </a>
            .
          </p>
        )}
      </section>
    </div>
  );
}
