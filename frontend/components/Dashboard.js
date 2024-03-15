import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import BottomNav from "./BottomNav";

const Dashboard = ({ navigation }) => {
  return (
    <View className="bg-mint-green flex-1 justify-evenly">
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
      </Button>
      <Button
        mode="elevated"
        title="Go to Transactions"
        onPress={() => navigation.navigate("TransactionPage")}
      >
        Transactions
      </Button>
      {/* <BottomNav /> */}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
