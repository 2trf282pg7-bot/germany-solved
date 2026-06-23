import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { renderMarkdown } from './markdown';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
}

export interface Article extends ArticleMeta {
  html: string;
}

// Returns the .md filenames in the articles directory, or [] if the directory
// is missing or empty (so pages never crash when there are zero articles).
function listFiles(): string[] {
  try {
    return fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md'));
  } catch {
    return [];
  }
}

function toMeta(file: string): ArticleMeta {
  const fileSlug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');
  const { data } = matter(raw);
  return {
    slug: (data.slug as string) || fileSlug,
    title: (data.title as string) || fileSlug,
    date: (data.date as string) || '',
    description: (data.description as string) || '',
    category: (data.category as string) || 'Guide',
  };
}

export function getAllArticles(): ArticleMeta[] {
  return listFiles()
    .map(toMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}

export function getArticleSlugs(): string[] {
  return listFiles().map((f) => f.replace(/\.md$/, ''));
}

export function getArticleBySlug(slug: string): Article | null {
  const files = listFiles();
  // Match by filename first, then fall back to the frontmatter slug.
  let file = files.find((f) => f.replace(/\.md$/, '') === slug);
  if (!file) {
    file = files.find((f) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, f), 'utf8');
      return matter(raw).data.slug === slug;
    });
  }
  if (!file) return null;

  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  return {
    slug: (data.slug as string) || file.replace(/\.md$/, ''),
    title: (data.title as string) || file,
    date: (data.date as string) || '',
    description: (data.description as string) || '',
    category: (data.category as string) || 'Guide',
    html: renderMarkdown(content),
  };
}
