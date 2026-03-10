import type { StrapiResponse, Article, Category, Author } from '@/types/strapi';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

async function fetchAPI<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const searchParams = new URLSearchParams(params);
  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const url = `${STRAPI_URL}/api${endpoint}${query}`;

  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function getArticles(params: Record<string, string> = {}): Promise<StrapiResponse<Article[]>> {
  return fetchAPI<StrapiResponse<Article[]>>('/articles', {
    'populate[cover]': '*',
    'populate[author][fields][0]': 'name',
    'populate[category][fields][0]': 'name',
    'populate[category][fields][1]': 'slug',
    'sort': 'publishedAt:desc',
    ...params,
  });
}

export async function getArticleBySlug(slug: string): Promise<StrapiResponse<Article[]>> {
  return fetchAPI<StrapiResponse<Article[]>>('/articles', {
    'filters[slug][$eq]': slug,
    'populate[cover]': '*',
    'populate[author][fields][0]': 'name',
    'populate[author][fields][1]': 'bio',
    'populate[author][populate][avatar]': '*',
    'populate[category][fields][0]': 'name',
    'populate[category][fields][1]': 'slug',
  });
}

export async function getCategories(): Promise<StrapiResponse<Category[]>> {
  return fetchAPI<StrapiResponse<Category[]>>('/categories');
}

export async function getCategoryBySlug(slug: string): Promise<StrapiResponse<Category[]>> {
  return fetchAPI<StrapiResponse<Category[]>>('/categories', {
    'filters[slug][$eq]': slug,
  });
}

export async function getArticlesByCategory(
  categorySlug: string,
  params: Record<string, string> = {}
): Promise<StrapiResponse<Article[]>> {
  return fetchAPI<StrapiResponse<Article[]>>('/articles', {
    'filters[category][slug][$eq]': categorySlug,
    'populate[cover]': '*',
    'populate[author][fields][0]': 'name',
    'populate[category][fields][0]': 'name',
    'populate[category][fields][1]': 'slug',
    'sort': 'publishedAt:desc',
    ...params,
  });
}

export function getStrapiImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}
