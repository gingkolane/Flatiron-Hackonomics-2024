import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const Dashboard = ({ navigation }) => {
  return (
    <View>
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
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
