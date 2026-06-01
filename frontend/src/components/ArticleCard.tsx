import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/types/strapi';
import { getArticleHref, getCategoryHref, getStrapiImageUrl } from '@/lib/strapi';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
    article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
    const coverUrl = getStrapiImageUrl(article.cover?.formats?.medium?.url || article.cover?.url);
    const blurCoverUrl = getStrapiImageUrl(article.cover?.formats?.thumbnail?.url || article.cover?.url);
    const articleHref = getArticleHref(article);

    return (
        <article className={styles.card}>
            {coverUrl && (
                <Link
                    href={articleHref}
                    className={styles.imageLink}
                >
                    <Image
                        src={coverUrl}
                        alt=""
                        width={640}
                        height={360}
                        className={styles.image}
                        placeholder='blur'
                        blurDataURL={blurCoverUrl}
                    />
                </Link>
            )}
            <div className={styles.content}>
                {article.category && (
                    <Link
                        href={getCategoryHref(article.category.slug)}
                        className={styles.category}
                    >
                        {article.category.name}
                    </Link>
                )}
                <h2 className={styles.title}>
                    <Link href={articleHref}>{article.title}</Link>
                </h2>
                <p className={styles.excerpt}>{article.excerpt}</p>
                <div className={styles.meta}>
                    {article.author && <span className={styles.author}>By {article.author.name}</span>}
                    <time
                        className={styles.date}
                        dateTime={article.publishedAt}
                    >
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
