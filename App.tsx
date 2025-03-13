import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthStack from './src/navigation/AuthStack';
import MainStack from './src/navigation/MainStack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <Stack.Screen 
              name="Auth" 
              component={(props) => (
                <AuthStack {...props} onLogin={() => setIsAuthenticated(true)} />
              )}
            />
          ) : (
            <Stack.Screen 
              name="Main" 
              component={(props) => (
                <MainStack {...props} onLogout={() => setIsAuthenticated(false)} />
              )}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}