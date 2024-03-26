import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import IconCoins from "../assets/icons/coins.svg";

import { Link, router } from "expo-router";

const LinkedAccount = ({ account }) => {
  console.log("Name: ", account);
  return (
    <View className="flex-1">
      <Pressable
        onPress={() =>
          router.push({
            pathname: `/accounts/${account.id}/`,
            params: {
              id: account.id,
              name: account.name,
              type: account.type || null,
              limit: account.limit || null,
              currency: account.currency || null,
              balance: account.balance,
            },
          })
        }
      >
        <View className="p-3 flex-row bg-magnetic-grey   rounded-lg">
          <IconCoins />
          <View className="align-middle">
            <Text className="text-lg ml-2">{account.name}</Text>
            <Text className="text-lg ml-2">{account.currency}</Text>
          </View>
          <Text className="ml-40 pt-3">${account.balance}</Text>
          <Text className="ml-40 pt-3">${account.type}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default LinkedAccount;

const styles = StyleSheet.create({});
