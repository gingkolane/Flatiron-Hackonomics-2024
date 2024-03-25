import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const TransactionsPage = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>TransactionsPage - {id} </Text>
    </View>
  );
};

export default TransactionsPage;

const styles = StyleSheet.create({});
