import React, { useState } from 'react'
import { StyleSheet, View, Alert, Image } from 'react-native'
import { TextInput, Button, Text, Snackbar, Chip } from 'react-native-paper'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { useAuth } from './AuthContext'

export default function LoginPage({ navigation, route }) {
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .required('Required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character'
      ),
  })

  const [visible, setVisible] = useState(false)

  const onToggleSnackBar = () => setVisible(!visible)

  const onDismissSnackBar = () => setVisible(false)
  return (
    <View className='bg-mint-green h-full items-center'>
      <View className='p-2 bg-money-green w-1/2 mx-auto rounded-2xl my-2'>
        <Image
          className='w-44 h-44'
          source={require('../assets/Logo.png')}
          onError={(e) => console.log(e.nativeEvent.error)} // Log image loading errors
        />
      </View>
      <Text
        className='mb-2'
        variant='headlineMedium'
      >
        Login
      </Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          login(values, navigation).finally(() => setSubmitting(false))
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
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType='email-address'
              autoCapitalize='none'
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
              secureTextEntry={!showPassword}
              error={touched.password && errors.password}
              left={<TextInput.Icon icon='lock' />}
              right={
                <TextInput.Icon
                  icon='eye'
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            <Text className='text-error-red my-1'>
              {touched.password && errors.password ? errors.password : ' '}
            </Text>
            <Button
              className='bg-magnetic-plum my-2 w-3/4'
              mode='contained'
              title='Login'
              onPress={handleSubmit}
            >
              Login
            </Button>
            {/* <Snackbar
              visible={visible}
              onDismiss={onDismissSnackBar}
              action={{
                label: 'Undo',
                onPress: () => {
                  // Do something
                },
              }}
            >
              Hey there! I'm a Snackbar.
            </Snackbar> */}
          </>
        )}
      </Formik>
      <Text>Not a member yet? </Text>
      <Button
        onPress={() => navigation.navigate('SignUp', { name: 'Sign Up' })}
      >
        Sign up
      </Button>
    </View>
  )
}
