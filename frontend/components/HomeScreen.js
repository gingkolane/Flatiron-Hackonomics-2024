import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const HomeScreen = ({ navigation }) => {
  return (
    <View className="bg-black">
      <Button
        title="Sign In"
        onPress={() => navigation.navigate("SignIn", { name: "Sign In" })}
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate("SignUp", { name: "Sign Up" })}
      />
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({});
