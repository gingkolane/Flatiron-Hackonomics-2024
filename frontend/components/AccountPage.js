import React from "react";

import { View, Text, StyleSheet, Button, Image } from "react-native";
import { Card, Divider, Avatar } from "react-native-paper"; // Assuming you're using react-native-paper for UI components

const AccountPage = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Profile" subtitle="Your personal information" />
          <Card.Content>
            <View style={styles.profileSection}>
              <Avatar.Image
                size={64}
                source={{ uri: "https://i.imgur.com/UjHoQLk.png" }}
              />
              <View>
                <Text>Alberto Sierra</Text>
                <Text>Alberto@example.com</Text>
              </View>
            </View>
            <Divider />
            <View>{/* Implement icons and stats rows here */}</View>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Title title="Budget" />
          <Card.Content>
            <Text>Example budget text</Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Title
            title="Recent Transactions"
            subtitle="View your recent transactions"
          />
          <Card.Content>
            <Button
              mode="elevated"
              title="Go to Transactions"
              onPress={() => navigation.navigate("TransactionPage")}
            ></Button>
          </Card.Content>
        </Card>
      </View>
    </>
  );
};

export default AccountPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  card: {
    margin: 8,
    elevation: 2,
  },
});
