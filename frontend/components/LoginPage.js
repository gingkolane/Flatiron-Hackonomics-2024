import { StyleSheet, View, Alert, Image } from "react-native";

import { TextInput, Button, Text, Snackbar, Chip } from "react-native-paper";
import * as Yup from "yup";

import React, { useState } from "react";
import { Formik } from "formik";
import { useAuth } from "./AuthContext";

const LoginPage = ({ navigation, route }) => {
  const { login } = useAuth();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(2, "Too Short!").required("Required"),
  });

  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          login(values, navigation).finally(() => setSubmitting(false));
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
            <Image />
            <Text variant="displayMedium" style={styles.title}>
              Login
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Email"
              keyboardType="email-address"
            />
            {touched.email && errors.email && (
              <Chip style={styles.error}>{errors.email}</Chip>
            )}
            <TextInput
              style={styles.input}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Password"
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Chip style={styles.error}>{errors.password}</Chip>
            )}
            <Button mode="contained" title="Login" onPress={handleSubmit}>
              Login
            </Button>
            <Snackbar
              visible={visible}
              onDismiss={onDismissSnackBar}
              action={{
                label: "Undo",
                onPress: () => {
                  // Do something
                },
              }}
            >
              Hey there! I'm a Snackbar.
            </Snackbar>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  error: {
    color: "red",
  },
});
