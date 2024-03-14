import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";

const SignIn = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      // Handle success, e.g., navigate, save tokens, etc.
      Alert.alert("Login Success", "You're logged in!");
      // Example navigation
      navigation.navigate("Dashboard");
    } catch (error) {
      //   Alert.alert("Login Failed", error.message);
      console.log(error);
    }
  };
  const handleLogin = () => {
    login();
    Alert.alert("Login Attempt", `Email: ${email}, Password: ${password}`);
  };

  return (
    <View style={styles.container}>
      <Image src="frontend/assets/image.png" />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default SignIn;

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
