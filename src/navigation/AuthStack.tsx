import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function LoginScreen({ navigation, onLogin }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SafeSpace</Text>
      <Button 
        title="Go to Register" 
        onPress={() => navigation.navigate('Register')}
      />
      <View style={styles.spacing} />
      <Button 
        title="Login" 
        onPress={onLogin}
      />
    </View>
  );
}

function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function AuthStack({ onLogin }: { onLogin?: () => void }) {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={(props) => <LoginScreen {...props} onLogin={onLogin} />}
        options={{
          title: 'Welcome'
        }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{
          title: 'Sign Up'
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  spacing: {
    height: 20,
  },
});