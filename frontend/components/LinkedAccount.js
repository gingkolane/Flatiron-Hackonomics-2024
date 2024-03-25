import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IconCoins from "../assets/icons/coins.svg";

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
    </View>
  );
};

export default LinkedAccount;

const styles = StyleSheet.create({});
