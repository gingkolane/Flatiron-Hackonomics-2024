import {useState} from 'react'
import { View, Image, ScrollView } from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper'
import { Formik } from 'formik'
import { useAuth } from './AuthContext'
import * as Yup from 'yup'

export default function SignUp({ navigation }) {
  const { signup } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    last_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    zipcode: Yup.string()
    .matches(/^[0-9]+$/, 'Your 5-digit zipcode must be a number')
      .min(5, 'Your 5-digit zipcode must be a number')
      .max(5, 'Your 5-digit zipcode must be a number')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .required('Required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character'
      ),
  })

  return (
    <ScrollView className='bg-mint-green'>
      <View className='p-2 bg-money-green w-1/2 mx-auto rounded-2xl my-2'>
        <Image
          className='w-44 h-44'
          source={require('../assets/Logo.png')}
          onError={(e) => console.log(e.nativeEvent.error)} // Log image loading errors
        />
      </View>
      <View className='items-center'>
        <Text
          className='mb-2'
          variant='headlineMedium'
        >
          Sign Up
        </Text>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            zipcode: '',
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            signup(values, navigation).then((success) => {
              if (success) {
                console.log('Sign up successful')
              } else {
                console.log('Sign up failed')
              }
            })
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                mode='outlined'
                className='w-3/4'
                onChangeText={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                value={values.first_name}
                placeholder='First Name'
                error={touched.first_name && errors.first_name}
                left={<TextInput.Icon icon='account' />}
              />
              <Text className='text-error-red my-1'>
                {touched.first_name && errors.first_name
                  ? errors.first_name
                  : ' '}
              </Text>
              <TextInput
                mode='outlined'
                className='w-3/4'
                onChangeText={handleChange('last_name')}
                onBlur={handleBlur('last_name')}
                value={values.last_name}
                placeholder='Last Name'
                error={touched.last_name && errors.last_name}
                left={<TextInput.Icon icon='account' />}
              />
              <Text className='text-error-red my-1'>
                {touched.last_name && errors.last_name ? errors.last_name : ' '}
              </Text>
              <TextInput
                mode='outlined'
                className='w-3/4'
                onChangeText={handleChange('zipcode')}
                onBlur={handleBlur('zipcode')}
                value={values.zipcode}
                placeholder='Zipcode'
                error={touched.zipcode && errors.zipcode}
                left={<TextInput.Icon icon='map-marker-radius-outline' />}
              />
              <Text className='text-error-red my-1'>
                {touched.zipcode && errors.zipcode ? errors.zipcode : ' '}
              </Text>
              <TextInput
                mode='outlined'
                className='w-3/4'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder='Email'
                error={touched.email && errors.email}
                left={<TextInput.Icon icon='email' />}
              />
              <Text className='text-error-red my-1'>
                {touched.email && errors.email ? errors.email : ' '}
              </Text>
              <TextInput
                mode='outlined'
                className='w-3/4'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder='Password'
                secureTextEntry={showPassword}
                error={touched.password && errors.password}
                left={<TextInput.Icon icon='lock' />}
                right={<TextInput.Icon icon='eye' onPress={() => setShowPassword(!showPassword)} />}
              />
              <Text className='text-error-red my-1'>
                {touched.password && errors.password ? errors.password : ' '}
              </Text>

              <Button
                className='bg-magnetic-plum my-2 w-3/4'
                mode='contained'
                title='SignUp'
                onPress={handleSubmit}
              >
                Sign Up
              </Button>
            </>
          )}
        </Formik>
        <Text>Already a member? </Text>
        <Button
          title='Sign In'
          onPress={() => navigation.navigate('SignIn', { name: 'Sign In' })}
        >
          Sign in
        </Button>
      </View>
    </ScrollView>
  )
}
