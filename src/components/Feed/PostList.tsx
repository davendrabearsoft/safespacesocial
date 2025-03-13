// src/components/Feed/PostList.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Post, Comment } from '../../types/post';
import { ShareModal } from './ShareModal';

interface PostListProps {
  posts: Post[];
  onUpvote: (postId: string) => void;
  onDownvote: (postId: string) => void;
  onSave: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
}

export function PostList({ posts, onUpvote, onDownvote, onSave, onComment }: PostListProps) {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleSubmitComment = (postId: string) => {
    if (commentText.trim()) {
      onComment(postId, commentText);
      setCommentText('');
    }
  };

  const renderPost = (post: Post) => (
    <View key={post.id} style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.authorInfo}>
          <MaterialCommunityIcons name="account-circle" size={24} color="#6366f1" />
          <Text style={styles.author}>{post.author}</Text>
          <Text style={styles.timestamp}>{formatTimestamp(post.timestamp)}</Text>
        </View>
        <Pressable onPress={() => onSave(post.id)}>
          <MaterialCommunityIcons 
            name={post.saved ? "bookmark" : "bookmark-outline"} 
            size={24} 
            color={post.saved ? "#6366f1" : "gray"} 
          />
        </Pressable>
      </View>

      {/* Post Content */}
      <Text style={styles.content}>{post.content}</Text>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tagsContainer}
        >
          {post.tags.map(tag => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Media */}
      {post.mediaUrls && post.mediaUrls.length > 0 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.mediaContainer}
        >
          {post.mediaUrls.map((url, index) => (
            <Image 
              key={index}
              source={{ uri: url }} 
              style={styles.mediaImage} 
            />
          ))}
        </ScrollView>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.votingContainer}>
          <Pressable style={styles.actionButton} onPress={() => onUpvote(post.id)}>
            <MaterialCommunityIcons name="arrow-up-bold" size={24} color="gray" />
            <Text style={styles.voteCount}>{post.upvotes}</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => onDownvote(post.id)}>
            <MaterialCommunityIcons name="arrow-down-bold" size={24} color="gray" />
            <Text style={styles.voteCount}>{post.downvotes}</Text>
          </Pressable>
        </View>
        
        <Pressable 
          style={styles.actionButton} 
          onPress={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
        >
          <MaterialCommunityIcons name="comment-outline" size={24} color="gray" />
          <Text style={styles.commentCount}>{post.comments?.length || 0}</Text>
        </Pressable>

        <Pressable 
          style={styles.actionButton} 
          onPress={() => {
            setSelectedPostId(post.id);
            setShareModalVisible(true);
          }}
        >
          <MaterialCommunityIcons name="share-variant" size={24} color="gray" />
        </Pressable>
      </View>

      {/* Comments Section */}
      {expandedPost === post.id && (
        <View style={styles.commentsSection}>
          {post.comments && post.comments.map((comment: Comment) => (
            <View key={comment.id} style={styles.comment}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentAuthor}>{comment.author}</Text>
                <Text style={styles.commentTimestamp}>
                  {formatTimestamp(comment.timestamp)}
                </Text>
              </View>
              <Text style={styles.commentContent}>{comment.content}</Text>
            </View>
          ))}
          {/* Comment Input */}
          <View style={styles.commentInput}>
            <TextInput
              style={styles.input}
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Add a comment..."
              multiline
            />
            <Pressable 
              style={styles.sendButton}
              onPress={() => handleSubmitComment(post.id)}
            >
              <MaterialCommunityIcons name="send" size={24} color="#6366f1" />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {posts.map(renderPost)}
      
      <ShareModal
        visible={shareModalVisible}
        onClose={() => setShareModalVisible(false)}
        onShare={(platform) => {
          // Handle share action based on platform
          console.log(`Sharing on ${platform}`);
          setShareModalVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    fontWeight: 'bold',
    marginLeft: 8,
    marginRight: 8,
  },
  timestamp: {
    color: 'gray',
    fontSize: 12,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
  },
  tagText: {
    color: '#4b5563',
    fontSize: 12,
  },
  mediaContainer: {
    marginBottom: 10,
  },
  mediaImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 10,
  },
  votingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginRight: 15,
  },
  voteCount: {
    marginLeft: 5,
    color: 'gray',
  },
  commentCount: {
    marginLeft: 5,
    color: 'gray',
  },
  commentsSection: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 10,
  },
  comment: {
    padding: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  commentAuthor: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  commentTimestamp: {
    color: 'gray',
    fontSize: 10,
  },
  commentContent: {
    fontSize: 14,
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: 'white',
  },
  sendButton: {
    padding: 5,
  }
});