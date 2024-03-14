import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState("");

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

  const signup = (values) => {
    return fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (!data) {
          throw new Error("No data returned from signup");
        }
        setUser(data);
        console.log(user);
        navigation.navigate("Dashboard");

        return true;
      })
      .catch((error) => {
        Alert.alert("Error", "Sign up failed. Please try again.");
        return false;
      });
  };

  const handleSignUp = () => {
    const values = { email, password, firstName, lastName };
    signup(values).then((success) => {
      if (success) {
        console.log("Sign up successful");
        // Optionally navigate to another screen or show a success message
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
      <Text className="text-xl font-bold mb-4" style={styles.title}>
        Sign Up
      </Text>
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          signup(values).then((success) => {
            if (success) {
              console.log("Sign up successful");
              // Optionally navigate to another screen or show a success message
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
            {/* Add error handling */}
            {touched.firstName && errors.firstName && (
              <Text>{errors.firstName}</Text>
            )}
            <TextInput
              className="border border-gray-300  p-2 w-full mb-4"
              style={styles.input}
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
              placeholder="Last Name"
            />
            {/* Add error handling */}
            {touched.lastName && errors.lastName && (
              <Text>{errors.lastName}</Text>
            )}
            <TextInput
              className="border border-gray-300  p-2 w-full mb-4"
              style={styles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Email"
            />
            {/* Add error handling */}
            {touched.email && errors.email && <Text>{errors.email}</Text>}
            <TextInput
              className="border border-gray-300  p-2 w-full mb-4"
              style={styles.input}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="password"
            />
            {/* Add error handling */}
            {touched.password && errors.password && (
              <Text>{errors.password}</Text>
            )}

            {/* Repeat for lastName, email, and password */}

            <Button title="Sign Up" onPress={handleSubmit} />
          </>
        )}
      </Formik>
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
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
