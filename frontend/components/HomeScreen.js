import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="bg-mint-green">
      <Image source={{ uri: "https://i.imgur.com/UjHoQLkh.png" }} />
      <Button
        className="p-5"
        title="Sign In"
        mode="elevated"
        onPress={() => navigation.navigate("SignIn", { name: "Sign In" })}
      >
        Sign In
      </Button>
      <Button
        title="Sign Up"
        mode="elevated"
        onPress={() => navigation.navigate("SignUp", { name: "Sign Up" })}
      >
        Sign Up
      </Button>
      <Button
        mode="elevated"
        title="Go to Transactions"
        onPress={() => navigation.navigate("TransactionPage")}
      >
        Transactions
      </Button>
      <Button
        mode="elevated"
        title="Dashboard"
        onPress={() => navigation.navigate("Dashboard")}
      >
        Dashboard
      </Button>
      <Button
        mode="elevated"
        title="Account"
        onPress={() => navigation.navigate("Account")}
      >
        Account
      </Button>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({});
