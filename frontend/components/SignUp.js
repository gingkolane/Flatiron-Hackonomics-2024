import React, { useState } from "react";
import { Formik } from "formik";
import { TextInput, Button, Text, Chip } from "react-native-paper";

import { View, Alert, SafeAreaView, StyleSheet } from "react-native";
import { useAuth } from "./AuthContext";
import * as Yup from "yup";
import { Link } from "@react-navigation/native";

const SignUp = ({ navigation }) => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .required("Required"),
  });

  const handleSignUp = () => {
    const values = { email, password, firstName, lastName };
    signup(values).then((success) => {
      if (success) {
        console.log("Sign up successful");
      } else {
        console.log("Sign up failed");
      }
    });
  };

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center px-4 bg-white"
      style={styles.container}
    >
      <Text variant="displayMedium" style={styles.title}>
        Sign Up
      </Text>
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          signup(values).then((success) => {
            if (success) {
              console.log("Sign up successful");
            } else {
              console.log("Sign up failed");
            }
          });
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
              className="border border-gray-300  p-2 w-full mb-4"
              style={styles.input}
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
              placeholder="First Name"
            />

            {touched.firstName && errors.firstName && (
              <Chip style={styles.error}>{errors.firstName}</Chip>
            )}
            <TextInput
              className="border border-gray-300  p-2 w-full mb-4"
              style={styles.input}
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
              placeholder="Last Name"
            />

            {touched.lastName && errors.lastName && (
              <Chip style={styles.error}>{errors.lastName}</Chip>
            )}
            <TextInput
              className="border border-gray-300  p-2 w-full mb-4"
              style={styles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Email"
            />

            {touched.email && errors.email && (
              <Chip style={styles.error}>{errors.email}</Chip>
            )}
            <TextInput
              className="border border-gray-300  p-2 w-full mb-4"
              style={styles.input}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="password"
            />

            {touched.password && errors.password && (
              <Chip style={styles.error}>{errors.password}</Chip>
            )}

            <Button mode="contained" onPress={handleSubmit}>
              Sign up
            </Button>
          </>
        )}
      </Formik>
      <Text>Already a member? </Text>
      <Button
        title="Sign In"
        onPress={() => navigation.navigate("SignIn", { name: "Sign In" })}
      >
        Sign in
      </Button>
    </SafeAreaView>
  );
};

export default SignUp;
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
