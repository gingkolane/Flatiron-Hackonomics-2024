import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import IconCoins from "../assets/icons/coins.svg";

import { Link, router } from "expo-router";

const LinkedAccount = ({ account_info }) => {
  return (
    <View className="flex-1">
      <View className="p-3 flex-row bg-magnetic-grey   rounded-lg">
        <IconCoins />
        <View className="align-middle">
          <Text className="text-lg ml-2">{account_info.name}</Text>
          <Text>{account_info.desc}</Text>
        </View>
        <Text className="ml-40 pt-3">{account_info.balance}</Text>
      </View>
      <Pressable
        onPress={() =>
          router.push({
            pathname: `/accounts/${account_info.id}/`,
            params: {
              id: account_info.id,
              name: account_info.name,
              type: account_info.type || null,
              limit: account_info.limit || null,
              currency: account_info.currency || null,
              desc: account_info.desc,
              balance: account_info.balance,
            },
          })
        }
      >
        <Text>Click to view account details</Text>
      </Pressable>
    </View>
  );
};

export default LinkedAccount;

const styles = StyleSheet.create({});
