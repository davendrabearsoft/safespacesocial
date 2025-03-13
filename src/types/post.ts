// src/types/post.ts
export interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  upvotes: number;
  downvotes: number;
  tags: string[];
  mediaUrls?: string[];
  comments: Comment[];
  saved: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  upvotes: number;
  downvotes: number;
}

export type SortOption = 'newest' | 'top' | 'trending';

export const AVAILABLE_TAGS = [
  'Community',
  'Events',
  'Support',
  'Discussion',
  'News',
  'Resource',
  'Question',
  'Social'
];