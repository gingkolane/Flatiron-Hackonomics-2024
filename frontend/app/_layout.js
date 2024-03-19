import { useEffect } from 'react'
import { SplashScreen, Slot, Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PaperProvider } from 'react-native-paper'
import { DispatchProvider } from '../global-provider'

SplashScreen.preventAutoHideAsync()

export default function AppLayout() {
  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <DispatchProvider>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: '#c0ffd0',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              },
            }}
          >
            <Stack.Screen
              name='(tabs)'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='index'
              options={{ headerShown: false, title: 'Index' }}
            />
            <Stack.Screen
              name='login'
              options={{ title: 'Login' }}
            />
            <Stack.Screen
              name='signup'
              options={{ title: 'Sign Up' }}
            />
          </Stack>
        </DispatchProvider>
      </PaperProvider>
    </SafeAreaProvider>
  )
}
