import { Alert } from 'react-native'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default async function login(credentials) {
  try {
    console.log('form values:', credentials)
    const csrfToken = await AsyncStorage.getItem('csrfToken')
    const response = await fetch('http://127.0.0.1:5555/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify(credentials),
    })
    console.log('response', response)
    if (!response.ok) {
      throw new Error('Login failed')
    }
    const data = await response.json()
    console.log('data', data)

    if (!data.accessToken || !data.refreshToken) {
      throw new Error('Missing access tokens')
    }
    await AsyncStorage.setItem('token', data.accessToken)
    await AsyncStorage.setItem('refreshToken', data.refreshToken)
    router.navigate('/dashboard')
  } catch (error) {
    console.error(error.message)
    Alert.alert('Login Failed', error.message)
  }
}
