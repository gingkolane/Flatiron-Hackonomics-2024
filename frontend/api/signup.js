import { Alert } from 'react-native'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default async function signup(credentials) {
  try {
    const csrfToken = (await AsyncStorage.getItem('csrfToken')) || ''
    const response = await fetch('http://127.0.0.1:5555/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const errorMessage = data.error || 'Signup failed due to server error'
      console.error(errorMessage) // Use console.error for errors
      Alert.alert('Signup Error', errorMessage)
      return // Early return on error
    }

    const data = await response.json()
    console.log(data)

    if (data.accessToken && data.refreshToken) {
      await AsyncStorage.multiSet([
        ['accessToken', data.accessToken],
        ['refreshToken', data.refreshToken],
      ])
      router.navigate('/dashboard')
    } else {
      console.error('Missing tokens in response') // Use console.error for errors
      throw new Error(
        'Signup succeeded, but tokens are missing in the response.'
      )
    }
  } catch (error) {
    console.error(error)
    Alert.alert(
      'Signup Failed',
      error.message || 'An unexpected error occurred. Please try again.'
    )
  }
}
