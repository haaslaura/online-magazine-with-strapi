import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticlesByCategory, getCategories, getCategoryBySlug } from '@/lib/strapi';
import ArticleCard from '@/components/ArticleCard';
import styles from './page.module.css';

export const revalidate = 60;

interface Props {
    params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
    try {
        const res = await getCategories();
        return (res.data ?? []).map((category) => ({ category: category.slug }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: Props) {
    const { category } = await params;

    try {
        const res = await getCategoryBySlug(category);
        const currentCategory = res.data?.[0];
        if (!currentCategory) {
            return {};
        }

        return {
            title: `${currentCategory.name} | L'Appel d'Etre`,
            description: currentCategory.description || `Articles de la categorie ${currentCategory.name}`,
        };
    } catch {
        return {};
    }
}

export default async function CategoryPage({ params }: Props) {
    const { category } = await params;

    let currentCategory;
    let articles: import('@/types/strapi').Article[] = [];

    try {
        const [categoryResponse, articlesResponse] = await Promise.all([
            getCategoryBySlug(category),
            getArticlesByCategory(category),
        ]);
        currentCategory = categoryResponse.data?.[0];
        articles = articlesResponse.data ?? [];
    } catch {
        notFound();
    }

    if (!currentCategory) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumb}>
                <Link href="/">Accueil</Link>
                <span> / </span>
                <span>{currentCategory.name}</span>
            </div>

            <div className={styles.header}>
                <span className={styles.label}>Categorie</span>
                <h1 className={styles.title}>{currentCategory.name}</h1>
                {currentCategory.description && <p className={styles.description}>{currentCategory.description}</p>}
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
                <p className={styles.empty}>Aucun article n est encore publie dans cette categorie.</p>
            )}
        </div>
    );
}