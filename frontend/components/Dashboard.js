import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Dashboard = () => {
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
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
