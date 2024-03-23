import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IconCoins from "../assets/icons/coins.svg";

const LinkedAccount = () => {
  return (
    <View className="flex-1">
      <View className="p-3 flex-row bg-magnetic-grey drop-shadow-md rounded-lg">
        <IconCoins />
        <View className="align-middle">
          <Text className="text-lg ml-2">Cash 1</Text>
          <Text>Selling income</Text>
        </View>
        <Text className="ml-44 pt-3 justify-end">560 euros</Text>
      </View>
    </View>
  );
};

export default LinkedAccount;

const styles = StyleSheet.create({});
