import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles, getStrapiImageUrl } from '@/lib/strapi';
import styles from './page.module.css';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await getArticles({ 'pagination[pageSize]': '100' });
    return (res.data ?? []).map((article) => ({ slug: article.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const res = await getArticleBySlug(slug);
    const article = res.data?.[0];
    if (!article) return {};
    return {
      title: `${article.title} | Online Magazine`,
      description: article.excerpt,
    };
  } catch {
    return {};
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  let article;
  try {
    const res = await getArticleBySlug(slug);
    article = res.data?.[0];
  } catch {
    notFound();
  }

  if (!article) notFound();

  const coverUrl = getStrapiImageUrl(
    article.cover?.formats?.large?.url || article.cover?.url
  );

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        {article.category && (
          <>
            <span> / </span>
            <Link href={`/categories/${article.category.slug}`}>
              {article.category.name}
            </Link>
          </>
        )}
        <span> / </span>
        <span>{article.title}</span>
      </div>

      <article className={styles.article}>
        {article.category && (
          <Link
            href={`/categories/${article.category.slug}`}
            className={styles.categoryBadge}
          >
            {article.category.name}
          </Link>
        )}

        <h1 className={styles.title}>{article.title}</h1>

        <div className={styles.meta}>
          {article.author && (
            <span className={styles.author}>By {article.author.name}</span>
          )}
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        {coverUrl && (
          <div className={styles.cover}>
            <Image
              src={coverUrl}
              alt={article.cover?.alternativeText || article.title}
              width={1200}
              height={630}
              className={styles.coverImage}
              priority
            />
          </div>
        )}

        <p className={styles.excerpt}>{article.excerpt}</p>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </div>
  );
}
