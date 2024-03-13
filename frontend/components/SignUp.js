import React, { useState } from "react";
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
      <TextInput
        className="border border-gray-300 p-2 w-full mb-4"
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First Name"
      />
      <TextInput
        className="border border-gray-300 p-2 w-full mb-4"
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last Name"
      />
      <TextInput
        className="border border-gray-300 p-2 w-full mb-4"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        className="border border-gray-300 p-2 w-full mb-6"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
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
