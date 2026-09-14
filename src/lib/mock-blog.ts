export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  tags: string[];
  author: string;
  date: string;
  readTimeMinutes: number;
}

export const blogPosts: BlogPost[] = [];
