import React, { useState } from "react";
import { Formik } from "formik";
import { TextInput, Button, Text, Chip } from "react-native-paper";

import { View, Alert, SafeAreaView, StyleSheet } from "react-native";
import { useAuth } from "./AuthContext";
import * as Yup from "yup";

const SignUp = ({ navigation }) => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [last_name, setlast_name] = useState("");

  const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    last_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .required("Required"),
  });

  return (
    <SafeAreaView className="flex-1 justify-center items-center px-4 bg-mint-green">
      <Text variant="displayMedium" style={styles.title}>
        Sign Up
      </Text>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        }}
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
              className="w-3/4 mb-5 bg-magnetic-grey"
              onChangeText={handleChange("first_name")}
              onBlur={handleBlur("first_name")}
              value={values.first_name}
              placeholder="First Name"
            />

            {touched.first_name && errors.first_name && (
              <Chip style={styles.error} className="mb-4 bg-magnetic-grey">
                {errors.first_name}
              </Chip>
            )}
            <TextInput
              className="w-3/4 mb-5 bg-magnetic-grey"
              onChangeText={handleChange("last_name")}
              onBlur={handleBlur("last_name")}
              value={values.last_name}
              placeholder="Last Name"
            />

            {touched.last_name && errors.last_name && (
              <Chip style={styles.error} className="mb-4 bg-magnetic-grey">
                {errors.last_name}
              </Chip>
            )}
            <TextInput
              className="w-3/4 mb-5 bg-magnetic-grey"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Email"
            />

            {touched.email && errors.email && (
              <Chip style={styles.error} className="mb-4 bg-magnetic-grey">
                {errors.email}
              </Chip>
            )}
            <TextInput
              className="w-3/4 mb-5 bg-magnetic-grey"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="password"
            />

            {touched.password && errors.password && (
              <Chip style={styles.error} className="mb-4 bg-magnetic-grey">
                {errors.password}
              </Chip>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit}
              className="bg-magnetic-plum"
            >
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
    borderWidth: 0,
    padding: 10,
  },
  error: {
    color: "red",
  },
});
