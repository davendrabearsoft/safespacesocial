// src/components/Feed/PostDetail.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Post } from '../../types/post';

interface PostDetailProps {
  post: Post;
}

export function PostDetail({ post }: PostDetailProps) {
  const getEngagementRate = () => {
    const totalVotes = post.upvotes + post.downvotes;
    const totalInteractions = totalVotes + post.comments.length;
    return ((totalInteractions / post.views) * 100).toFixed(1);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Post Content */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Post Content</Text>
        <Text style={styles.content}>{post.content}</Text>
      </View>

      {/* Analytics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Analytics</Text>
        
        <View style={styles.stat}>
          <MaterialCommunityIcons name="eye" size={20} color="#6366f1" />
          <Text style={styles.statLabel}>Views</Text>
          <Text style={styles.statValue}>{post.views}</Text>
        </View>

        <View style={styles.stat}>
          <MaterialCommunityIcons name="arrow-up-bold" size={20} color="#6366f1" />
          <Text style={styles.statLabel}>Upvote Rate</Text>
          <Text style={styles.statValue}>
            {((post.upvotes / (post.upvotes + post.downvotes)) * 100).toFixed(1)}%
          </Text>
        </View>

        <View style={styles.stat}>
          <MaterialCommunityIcons name="comment-multiple" size={20} color="#6366f1" />
          <Text style={styles.statLabel}>Comments</Text>
          <Text style={styles.statValue}>{post.comments.length}</Text>
        </View>

        <View style={styles.stat}>
          <MaterialCommunityIcons name="chart-line" size={20} color="#6366f1" />
          <Text style={styles.statLabel}>Engagement Rate</Text>
          <Text style={styles.statValue}>{getEngagementRate()}%</Text>
        </View>
      </View>

      {/* Interaction Timeline */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interaction Timeline</Text>
        {post.interactions.map((interaction, index) => (
          <View key={index} style={styles.timelineItem}>
            <MaterialCommunityIcons 
              name={interaction.type === 'upvote' ? 'arrow-up-bold' : 
                    interaction.type === 'downvote' ? 'arrow-down-bold' : 
                    'comment'}
              size={16} 
              color="#6366f1" 
            />
            <Text style={styles.timelineText}>
              {interaction.type === 'comment' ? 'New comment' : `${interaction.type}`}
            </Text>
            <Text style={styles.timelineTime}>
              {new Date(interaction.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statLabel: {
    marginLeft: 10,
    flex: 1,
    color: '#4B5563',
  },
  statValue: {
    fontWeight: 'bold',
    color: '#6366f1',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  timelineText: {
    marginLeft: 10,
    flex: 1,
  },
  timelineTime: {
    color: '#9CA3AF',
    fontSize: 12,
  },
});