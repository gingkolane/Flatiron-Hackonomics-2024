import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Pressable, // Import Text for displaying non-Paragraph elements if needed
} from "react-native";
import { Button, Card, Paragraph } from "react-native-paper";
import ReceiptScanner from "../../components/ReceiptScanner";
import { Link, router } from "expo-router";

export default function Tab() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Mock data
  const mockTransactions = [
    { id: 1, date: "2024-03-14", amount: "50.00", category: "Groceries" },
    { id: 2, date: "2024-03-15", amount: "150.00", category: "Utilities" },
    { id: 3, date: "2024-03-16", amount: "20.00", category: "Entertainment" },
    { id: 4, date: "2024-03-14", amount: "100.00", category: "Groceries" },
    { id: 5, date: "2024-03-16", amount: "10.00", category: "Entertainment" },
    { id: 6, date: "2024-03-16", amount: "40.00", category: "Transportation" },
  ];

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setTransactions(mockTransactions);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCameraActiveChange = (isActive) => {
    setIsCameraActive(isActive);
  };

  const renderTransaction = ({ item }) => (
    <TouchableOpacity>
      <Card style={styles.card}>
        <Link
          href={`/transactions/${item.id}`}
          style={{ textDecoration: "none" }}
        >
          <Card.Content>
            <Paragraph>Date: {item.date}</Paragraph>
            <Paragraph>Amount: ${item.amount}</Paragraph>
            <Paragraph>Category: {item.category}</Paragraph>
          </Card.Content>
        </Link>
        <Pressable
          onPress={() =>
            router.push({
              pathname: `/transactions/${item.id}`,
              params: {
                id: mockTransactions[(0, 1, 2, 3, 4, 5)].id,
                amount: mockTransactions[(0, 1, 2, 3, 4, 5)].amount,
                date: mockTransactions[(0, 1, 2, 3, 4, 5)].date,
                category: mockTransactions[(0, 1, 2, 3, 4, 5)].category,
              },
            })
          }
        >
          <Button className="bg-forest-green">
            <Text className="text-white">View transaction details</Text>
          </Button>
        </Pressable>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ReceiptScanner onCameraActiveChange={handleCameraActiveChange} />
      {!isCameraActive &&
        (isLoading ? (
          <ActivityIndicator size="large" color="#6200ee" />
        ) : (
          <FlatList
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContent}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  card: {
    margin: 8,
    elevation: 2,
  },
  flatListContent: {
    paddingTop: 10,
  },
});
