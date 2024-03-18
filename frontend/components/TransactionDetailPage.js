
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionDetailPage = ({ route }) => {
  const { transaction } = route.params;

  return (
    <View style={styles.container}>
      <Text>Date: {transaction.date}</Text>
      <Text>Amount: {transaction.amount}</Text>
      <Text>Category: {transaction.category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionDetailPage;