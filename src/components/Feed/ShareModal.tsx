// src/components/Feed/ShareModal.tsx
import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
  onShare: (platform: 'copy' | 'twitter' | 'facebook' | 'whatsapp') => void;
}

export function ShareModal({ visible, onClose, onShare }: ShareModalProps) {
  const ShareOption = ({ 
    platform, 
    icon, 
    color, 
    label 
  }: { 
    platform: 'copy' | 'twitter' | 'facebook' | 'whatsapp';
    icon: string;
    color: string;
    label: string;
  }) => (
    <Pressable 
      style={styles.shareOption} 
      onPress={() => onShare(platform)}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <MaterialCommunityIcons name={icon} size={24} color="white" />
      </View>
      <Text style={styles.shareLabel}>{label}</Text>
    </Pressable>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <View style={styles.handle} />
          <Text style={styles.title}>Share Post</Text>
          
          <View style={styles.optionsContainer}>
            <ShareOption
              platform="copy"
              icon="content-copy"
              color="#6B7280"
              label="Copy Link"
            />
            <ShareOption
              platform="twitter"
              icon="twitter"
              color="#1DA1F2"
              label="Twitter"
            />
            <ShareOption
              platform="facebook"
              icon="facebook"
              color="#4267B2"
              label="Facebook"
            />
            <ShareOption
              platform="whatsapp"
              icon="whatsapp"
              color="#25D366"
              label="WhatsApp"
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 300,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 20,
  },
  shareOption: {
    alignItems: 'center',
    width: '25%',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  shareLabel: {
    fontSize: 12,
    color: '#4B5563',
  },
});