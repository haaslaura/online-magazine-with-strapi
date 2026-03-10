import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getCategoryBySlug,
  getCategories,
  getArticlesByCategory,
} from '@/lib/strapi';
import ArticleCard from '@/components/ArticleCard';
import styles from './page.module.css';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await getCategories();
    return (res.data ?? []).map((cat) => ({ slug: cat.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const res = await getCategoryBySlug(slug);
    const category = res.data?.[0];
    if (!category) return {};
    return {
      title: `${category.name} | Online Magazine`,
      description: category.description || `Articles in ${category.name}`,
    };
  } catch {
    return {};
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  let category;
  let articles: import("@/types/strapi").Article[] = [];

  try {
    const [catRes, artRes] = await Promise.all([
      getCategoryBySlug(slug),
      getArticlesByCategory(slug),
    ]);
    category = catRes.data?.[0];
    articles = artRes.data ?? [];
  } catch {
    notFound();
  }

  if (!category) notFound();

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span> / </span>
        <span>{category.name}</span>
      </div>

      <div className={styles.header}>
        <span className={styles.label}>Category</span>
        <h1 className={styles.title}>{category.name}</h1>
        {category.description && (
          <p className={styles.description}>{category.description}</p>
        )}
      </div>

      {articles.length > 0 ? (
        <div className={styles.grid}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No articles in this category yet.</p>
      )}
    </div>
  );
}
