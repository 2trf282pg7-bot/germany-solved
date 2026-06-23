import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticleSlugs } from '@/lib/articles';

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: article.title,
    description: article.description,
  };
}

function formatDate(value: string): string {
  if (!value) return '';
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <Link href="/articles">Articles</Link>
            <span className="breadcrumb-sep">/</span>
            <span>{article.category}</span>
          </nav>
          <div className="page-eyebrow">{article.category}</div>
          <h1 className="page-title">{article.title}</h1>
          {article.description && (
            <p className="page-subtitle">{article.description}</p>
          )}
          {article.date && (
            <div
              className="page-meta"
              style={{ marginTop: '16px', color: 'var(--ink-light)', fontSize: '0.875rem' }}
            >
              Last updated {formatDate(article.date)}
            </div>
          )}
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <article
            className="content-body"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
          <div style={{ maxWidth: 'var(--content-width)', margin: '40px auto 0' }}>
            <Link href="/articles" className="btn-secondary">
              ← All Articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
