import { PaperProvider } from 'react-native-paper'

import { StatusBar } from 'expo-status-bar'
import { Text, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './components/HomeScreen'
import './app.css'

import SignUp from './components/SignUp'

import Dashboard from './components/Dashboard'

import TransactionPage from './components/TransactionPage'
import AccountPage from './components/AccountPage'
import { AuthProvider } from './components/AuthContext'
import LoginPage from './components/LoginPage'
import { SafeAreaView } from 'react-native-safe-area-context'
import Budget from './components/Budget'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <SafeAreaView className='flex h-screen justify-center bg-mint-green'>
          <NavigationContainer>
            <View>
              <Image source={{ uri: 'https://i.imgur.com/UjHoQLkh.png' }} />
            </View>
            <Stack.Navigator>
              <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{
                  title: 'Welcome to Money Magnet',
                  headerStyle: {
                    backgroundColor: '#c0ffd0',
                  },
                  headerTintColor: '#009933',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 22,
                  },
                  // headerTitleAlign: 'center',

                  // headerShadowVisible: true,
                  headerElevation: 2,
                }}
              />

              <Stack.Screen
                name='Login'
                component={LoginPage}
                options={{
                  title: '',
                  headerStyle: {
                    backgroundColor: '#c0ffd0',
                  },
                  headerTintColor: '#009933',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 22,
                  },
                  headerTitleAlign: 'center',

                  headerShadowVisible: true,
                  headerElevation: 4,
                }}
              />
              <Stack.Screen
                name='SignUp'
                component={SignUp}
                options={{
                  title: '',
                  headerStyle: {
                    backgroundColor: '#c0ffd0',
                  },
                  headerTintColor: '#009933',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 22,
                  },
                  headerTitleAlign: 'center',

                  headerShadowVisible: true,
                  headerElevation: 4,
                }}
              />
              <Stack.Screen
                name='TransactionPage'
                component={TransactionPage}
                options={{
                  title: 'Transactions',
                  headerStyle: {
                    backgroundColor: '#009933',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 22,
                  },
                  headerTitleAlign: 'center',

                  headerShadowVisible: true,
                  headerElevation: 4,
                }}
              />
              <Stack.Screen
                name='Dashboard'
                component={Dashboard}
                options={{
                  title: 'Dashboard',
                  headerStyle: {
                    backgroundColor: '#009933',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 22,
                  },
                  headerTitleAlign: 'center',

                  headerShadowVisible: true,
                  headerElevation: 4,
                }}
              />
              <Stack.Screen
                name='Account'
                component={AccountPage}
                options={{
                  title: 'Account',
                  headerStyle: {
                    backgroundColor: '#009933',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 22,
                  },
                  headerTitleAlign: 'center',

                  headerShadowVisible: true,
                  headerElevation: 4,
                }}
              />
              <Stack.Screen
                name='Budget'
                component={Budget}
                options={{
                  title: 'Budget',
                  headerStyle: {
                    backgroundColor: '#009933',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 22,
                  },
                  headerTitleAlign: 'center',

                  headerShadowVisible: true,
                  headerElevation: 4,
                }}
              />
            </Stack.Navigator>

            <StatusBar style='auto' />
          </NavigationContainer>
        </SafeAreaView>
      </AuthProvider>
    </PaperProvider>
  )
}
