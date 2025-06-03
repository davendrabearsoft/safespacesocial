import { View, StyleSheet } from 'react-native';
import FeedScreen from '../../src/components/Feed/FeedScreen';

export default function TabFeedScreen() {
  return (
    <View style={styles.container}>
      <FeedScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
});