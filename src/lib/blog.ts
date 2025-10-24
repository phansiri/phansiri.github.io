import { getCollection } from 'astro:content';

export interface BlogPost {
  slug: string;
  data: {
    title: string;
    description: string;
    publishDate: Date;
    updatedDate?: Date;
    tags: string[];
    category: string;
    featured: boolean;
    readingTime?: number;
    image?: string;
    imageAlt?: string;
    author: string;
    draft: boolean;
  };
  body: string;
}

export interface PaginationConfig {
  postsPerPage: number;
  currentPage: number;
}

export interface PaginationResult {
  posts: BlogPost[];
  totalPosts: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  paginationUrls: Array<{
    label: string;
    url: string;
    type: 'page' | 'prev' | 'next';
    current?: boolean;
  }>;
}

export async function getPaginatedPosts(config: PaginationConfig): Promise<PaginationResult> {
  const { postsPerPage, currentPage } = config;
  
  // Get all blog posts
  const allPosts = await getCollection('blog');
  const publishedPosts = allPosts
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  // Calculate pagination
  const totalPosts = publishedPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = publishedPosts.slice(startIndex, endIndex);

  // Generate pagination URLs
  const paginationUrls = generatePaginationUrls(currentPage, totalPages);

  return {
    posts,
    totalPosts,
    totalPages,
    startIndex,
    endIndex,
    paginationUrls
  };
}

export function generatePaginationUrls(currentPage: number, totalPages: number) {
  const urls = [];
  
  // Previous page
  if (currentPage > 1) {
    urls.push({
      label: 'Previous',
      url: currentPage === 2 ? '/blog' : `/blog/page/${currentPage - 1}`,
      type: 'prev' as const
    });
  }
  
  // Page numbers
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);
  
  for (let i = startPage; i <= endPage; i++) {
    urls.push({
      label: i.toString(),
      url: i === 1 ? '/blog' : `/blog/page/${i}`,
      type: 'page' as const,
      current: i === currentPage
    });
  }
  
  // Next page
  if (currentPage < totalPages) {
    urls.push({
      label: 'Next',
      url: `/blog/page/${currentPage + 1}`,
      type: 'next' as const
    });
  }
  
  return urls;
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    'AI/ML': '🤖',
    'Computer Systems': '💻',
    'Data Science': '📊',
    'Technology': '⚡',
    'Career': '🚀',
    'Tutorial': '📚'
  };
  return emojis[category] || '📝';
}

export function groupPostsByCategory(posts: any[]) {
  return posts.reduce((acc, post) => {
    const category = post.data.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(post);
    return acc;
  }, {} as Record<string, any[]>);
}
