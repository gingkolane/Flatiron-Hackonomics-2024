import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="bg-mint-green">
      <Button
        title="Sign In"
        onPress={() => navigation.navigate("SignIn", { name: "Sign In" })}
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate("SignUp", { name: "Sign Up" })}
      />
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({});
