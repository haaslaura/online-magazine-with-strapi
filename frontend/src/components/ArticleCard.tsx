import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/types/strapi';
import { getStrapiImageUrl } from '@/lib/strapi';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const coverUrl = getStrapiImageUrl(
    article.cover?.formats?.medium?.url || article.cover?.url
  );

  return (
    <article className={styles.card}>
      {coverUrl && (
        <Link href={`/articles/${article.slug}`} className={styles.imageLink}>
          <Image
            src={coverUrl}
            alt={article.cover?.alternativeText || article.title}
            width={640}
            height={360}
            className={styles.image}
          />
        </Link>
      )}
      <div className={styles.content}>
        {article.category && (
          <Link
            href={`/categories/${article.category.slug}`}
            className={styles.category}
          >
            {article.category.name}
          </Link>
        )}
        <h2 className={styles.title}>
          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
        </h2>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <div className={styles.meta}>
          {article.author && (
            <span className={styles.author}>By {article.author.name}</span>
          )}
          <time className={styles.date} dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </div>
    </article>
  );
}
