import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles, getCategoryHref, getStrapiImageUrl } from '@/lib/strapi';
import styles from './page.module.css';

export const revalidate = 60;

interface Props {
    params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
    try {
        const res = await getArticles({ 'pagination[pageSize]': '100' });
        return (res.data ?? [])
            .filter((article) => article.category?.slug)
            .map((article) => ({ category: article.category!.slug, slug: article.slug }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: Props) {
    const { category, slug } = await params;

    try {
        const res = await getArticleBySlug(slug);
        const article = res.data?.[0];

        if (!article || article.category?.slug !== category) {
            return {};
        }

        return {
            title: `${article.title} | L'Appel d'Etre`,
            description: article.excerpt,
        };
    } catch {
        return {};
    }
}

export default async function ArticlePage({ params }: Props) {
    const { category, slug } = await params;

    let article;
    try {
        const res = await getArticleBySlug(slug);
        article = res.data?.[0];
    } catch {
        notFound();
    }

    if (!article || article.category?.slug !== category) {
        notFound();
    }

    const coverUrl = getStrapiImageUrl(article.cover?.formats?.large?.url || article.cover?.url);

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumb}>
                <Link href="/">Accueil</Link>
                <span> / </span>
                <Link href={getCategoryHref(article.category.slug)}>{article.category.name}</Link>
                <span> / </span>
                <span>{article.title}</span>
            </div>

            <article className={styles.article}>
                <Link
                    href={getCategoryHref(article.category.slug)}
                    className={styles.categoryBadge}
                >
                    {article.category.name}
                </Link>

                <h1 className={styles.title}>{article.title}</h1>

                <div className={styles.meta}>
                    {article.author && <span className={styles.author}>Par {article.author.name}</span>}
                    <time dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
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