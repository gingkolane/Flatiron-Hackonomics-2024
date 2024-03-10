import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  return (
    // some test tailwind classes
    <View className='bg-green-700 flex h-screen justify-center'>
      <Text className='text-red-700 text-2xl font-bold self-center'>
        Tailwind in React Native
      </Text>
      <StatusBar style='auto' />
    </View>
  )
}
