// src/components/Feed/ImagePicker.tsx
import React from 'react';
import { View, Image, StyleSheet, Pressable, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ImagePickerProps {
  images: string[];
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
}

export function ImagePicker({ images, onAddImage, onRemoveImage }: ImagePickerProps) {
  return (
    <View style={styles.container}>
      {/* Image Preview */}
      <View style={styles.imageGrid}>
        {images.map((uri, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri }} style={styles.image} />
            <Pressable
              style={styles.removeButton}
              onPress={() => onRemoveImage(index)}
            >
              <MaterialCommunityIcons name="close-circle" size={20} color="white" />
            </Pressable>
          </View>
        ))}
        
        {/* Add Image Button */}
        {images.length < 4 && (
          <Pressable style={styles.addButton} onPress={onAddImage}>
            <MaterialCommunityIcons name="image-plus" size={24} color="#6366f1" />
            <Text style={styles.addButtonText}>Add Image</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
  },
  addButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  addButtonText: {
    color: '#6366f1',
    fontSize: 12,
    marginTop: 4,
  },
});