// src/components/Feed/CreatePost.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text, Pressable, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AVAILABLE_TAGS } from '../../types/post';

interface CreatePostProps {
  onSubmit: (content: string, tags: string[], mediaUrls: string[]) => void;
}

export function CreatePost({ onSubmit }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content, selectedTags, mediaUrls);
      setContent('');
      setSelectedTags([]);
      setMediaUrls([]);
      setIsExpanded(false);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Placeholder for image upload - in real app, implement proper image upload
  const handleAddImage = () => {
    setMediaUrls([...mediaUrls, '/api/placeholder/400/300']);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="What's on your mind?"
        multiline
        numberOfLines={3}
        onFocus={() => setIsExpanded(true)}
      />
      
      {isExpanded && (
        <>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.tagsContainer}
          >
            {AVAILABLE_TAGS.map(tag => (
              <Pressable
                key={tag}
                style={[
                  styles.tag,
                  selectedTags.includes(tag) && styles.tagSelected
                ]}
                onPress={() => toggleTag(tag)}
              >
                <Text style={[
                  styles.tagText,
                  selectedTags.includes(tag) && styles.tagTextSelected
                ]}>
                  {tag}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {mediaUrls.length > 0 && (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.mediaPreview}
            >
              {mediaUrls.map((url, index) => (
                <View key={index} style={styles.mediaItem}>
                  <Image source={{ uri: url }} style={styles.mediaImage} />
                  <Pressable
                    style={styles.removeMedia}
                    onPress={() => setMediaUrls(mediaUrls.filter((_, i) => i !== index))}
                  >
                    <MaterialCommunityIcons name="close-circle" size={20} color="white" />
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          )}

          <View style={styles.actions}>
            <Pressable style={styles.actionButton} onPress={handleAddImage}>
              <MaterialCommunityIcons name="image-plus" size={24} color="#6366f1" />
            </Pressable>
            <Button title="Post" onPress={handleSubmit} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 80,
    textAlignVertical: 'top',
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
  tagSelected: {
    backgroundColor: '#6366f1',
  },
  tagText: {
    color: '#4b5563',
  },
  tagTextSelected: {
    color: 'white',
  },
  mediaPreview: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  mediaItem: {
    marginRight: 10,
    position: 'relative',
  },
  mediaImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  removeMedia: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
  },
});