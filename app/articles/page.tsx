import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Articles & Guides',
  description:
    'Practical guides on German immigration, visas, and bureaucracy — written from real community experiences.',
};

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

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-inner">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span>Articles</span>
          </nav>
          <div className="page-eyebrow">Guides</div>
          <h1 className="page-title">Articles &amp; Guides</h1>
          <p className="page-subtitle">
            Practical guides on German immigration, visas, and bureaucracy — written from real
            community experiences, not generic legal advice.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          {articles.length === 0 ? (
            <div className="alert alert-info">
              <span className="alert-icon">📝</span>
              <p className="alert-text">No articles have been published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="card-grid">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="article-card"
                >
                  <div className="article-card-category">{article.category}</div>
                  <h2 className="article-card-title">{article.title}</h2>
                  <p className="article-card-description">{article.description}</p>
                  <div className="article-card-footer">
                    <span>{formatDate(article.date)}</span>
                    <span className="article-read-more">Read guide</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
