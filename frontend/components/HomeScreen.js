import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="bg-mint-green justify-center flex-1">
      <View className="p-3 bg-money-green w-1/2 mx-auto rounded-2xl mb-5">
        <Image
          className=" w-44 h-44 "
          source={require('../assets/Logo.png')}
          onError={(e) => console.log(e.nativeEvent.error)} // Log image loading errors
        />
      </View>
      <Button
        className="m-5 bg-magnetic-grey"
        mode="elevated"
        onPress={() => navigation.navigate("Login", { name: "Login" })}
      >
        Login
      </Button>
      <Button
        className="m-5 bg-magnetic-grey"
        title="Sign Up"
        mode="elevated"
        onPress={() => navigation.navigate("SignUp", { name: "Sign Up" })}
      >
        Sign Up
      </Button>
      {/* <Button
        mode="elevated"
        title="Go to Transactions"
        onPress={() => navigation.navigate("TransactionPage")}
      >
        Transactions
      </Button> */}
      {/* <Button
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
      <Button
        mode="elevated"
        title="Budget"
        onPress={() => navigation.navigate("Budget")}
      >
        Budget
      </Button> */}
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({});
