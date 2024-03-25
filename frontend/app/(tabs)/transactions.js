import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card, Paragraph } from "react-native-paper";
import ReceiptScanner from "../../components/ReceiptScanner";
import { Link } from "expo-router";

export default function Tab() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Mock data that mimics the structure you expect from your backend
  const mockTransactions = [
    { id: 1, date: "2024-03-14", amount: "50.00", category: "Groceries" },
    { id: 2, date: "2024-03-15", amount: "150.00", category: "Utilities" },
    { id: 3, date: "2024-03-16", amount: "20.00", category: "Entertainment" },
    { id: 4, date: "2024-03-14", amount: "100.00", category: "Groceries" },
    { id: 5, date: "2024-03-16", amount: "10.00", category: "Entertainment" },
    { id: 6, date: "2024-03-16", amount: "40.00", category: "Transportation" },
  ];

  useEffect(() => {
    // Simulate fetching data by setting the mock data after a delay
    const timer = setTimeout(() => {
      setTransactions(mockTransactions);
      setIsLoading(false);
    }, 1000); // 1 second delay to simulate loading

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleCameraActiveChange = (isActive) => {
    setIsCameraActive(isActive); // Update based on camera's active state
  };

  return (
    <View style={styles.container}>
      <ReceiptScanner onCameraActiveChange={handleCameraActiveChange} />
      {!isCameraActive &&
        (isLoading ? (
          <ActivityIndicator size="large" color="#6200ee" />
        ) : (
          <View className="">
            <Card className="w-screen shadow-lg p-3 mt-5">
              <Link href="/transactions/1">
                <Card.Content>
                  <Paragraph>Date: </Paragraph>
                  <Paragraph>Amount: </Paragraph>
                  <Paragraph>Category: </Paragraph>
                </Card.Content>
              </Link>
            </Card>
            <Card className="w-screen shadow-lg p-3 mt-5">
              <Link href="/transactions/2">
                <Card.Content>
                  <Paragraph>Date: </Paragraph>
                  <Paragraph>Amount: </Paragraph>
                  <Paragraph>Category: </Paragraph>
                </Card.Content>
              </Link>
            </Card>
          </View>
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
