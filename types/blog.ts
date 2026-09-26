export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    role: string;
  };
  introParagraphs: string[];
  sections: BlogSection[];
}
