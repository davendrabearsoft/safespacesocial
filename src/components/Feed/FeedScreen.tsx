// src/components/Feed/FeedScreen.tsx
import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { CreatePost } from './CreatePost';
import { PostList } from './PostList';
import { FeedHeader } from './FeedHeader';
import { Post } from '../../types/post';

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'top' | 'trending'>('newest');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = [...posts];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply tag filter
    if (selectedTag) {
      filtered = filtered.filter(post => 
        post.tags.includes(selectedTag)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'top':
        return filtered.sort((a, b) => 
          (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
        );
      case 'trending':
        return filtered.sort((a, b) => {
          const scoreA = getTrendingScore(a);
          const scoreB = getTrendingScore(b);
          return scoreB - scoreA;
        });
      case 'newest':
      default:
        return filtered.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
    }
  }, [posts, searchQuery, sortBy, selectedTag]);

  // Calculate trending score based on time and votes
  const getTrendingScore = (post: Post) => {
    const hoursOld = (new Date().getTime() - new Date(post.timestamp).getTime()) / (1000 * 60 * 60);
    const score = post.upvotes - post.downvotes;
    return score / Math.pow(hoursOld + 2, 1.8); // Similar to Reddit's algorithm
  };

  const handleCreatePost = (content: string, tags: string[], mediaUrls: string[]) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content,
      author: 'Current User',
      timestamp: new Date(),
      upvotes: 0,
      downvotes: 0,
      tags: tags || [],
      mediaUrls: mediaUrls || [],
      comments: [],
      saved: false
    };

    setPosts([newPost, ...posts]);
  };

  const handleUpvote = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, upvotes: post.upvotes + 1 }
        : post
    ));
  };

  const handleDownvote = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, downvotes: post.downvotes + 1 }
        : post
    ));
  };

  const handleSave = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, saved: !post.saved }
        : post
    ));
  };

  const handleComment = (postId: string, content: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now().toString(),
                content,
                author: 'Current User',
                timestamp: new Date(),
                upvotes: 0,
                downvotes: 0
              }
            ]
          }
        : post
    ));
  };

  return (
    <View style={styles.container}>
      <FeedHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        selectedTag={selectedTag}
        onTagSelect={setSelectedTag}
      />
      <CreatePost onSubmit={handleCreatePost} />
      <PostList 
        posts={filteredAndSortedPosts}
        onUpvote={handleUpvote}
        onDownvote={handleDownvote}
        onSave={handleSave}
        onComment={handleComment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});