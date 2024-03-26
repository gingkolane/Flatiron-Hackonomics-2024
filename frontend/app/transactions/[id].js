import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const TransactionsPage = () => {
  const { id, mockTransactions, date, amount, category } =
    useLocalSearchParams();
  const transactions = JSON.parse(mockTransactions || "[]");

  console.log(transactions[0]);
  return (
    <View className=" bg-magnetic-grey mx-auto p-5 rounded-lg mt-5 ">
      <View key={id} style={styles.transactionContainer}>
        <Text>Date: {date}</Text>
        <Text>Amount: ${amount}</Text>
        <Text>Category: {category}</Text>
      </View>
    </View>
  );
};

export default TransactionsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
