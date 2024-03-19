import { useContext } from 'react'
import { View, Image } from 'react-native'
import { Button } from 'react-native-paper'
import { router } from 'expo-router'
import { GlobalState } from '../global-provider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect } from 'expo-router'

export default function App() {
  const global = useContext(GlobalState)
  //change true to false to imitate logged in state
  if (global.state.isLoggedIn === true) {
    return <Redirect href='/dashboard' />
  }
  return (
    <SafeAreaView className='bg-mint-green justify-center flex-1'>
      <View className='p-3 bg-money-green w-1/2 mx-auto rounded-2xl mb-3'>
        <Image
          className='w-44 h-44'
          source={require('../assets/Logo.png')}
          onError={(e) => console.log(e.nativeEvent.error)} // Log image loading errors
        />
      </View>
      <Button
        className='m-5 bg-magnetic-grey'
        mode='elevated'
        onPress={() => router.navigate('login')}
      >
        Login
      </Button>
      <Button
        className='m-5 bg-magnetic-grey'
        title='Sign Up'
        mode='elevated'
        onPress={() => router.navigate('signup')}
      >
        Sign Up
      </Button>
    </SafeAreaView>
  )
}
