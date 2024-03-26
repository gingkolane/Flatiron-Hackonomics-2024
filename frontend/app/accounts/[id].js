import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import LinkedAccount from "../../components/LinkedAccount";
import AccountDetails from "./AccountDetails";
import IconCoins from "../../assets/icons/coins.svg";
import IconTravel from "../../assets/icons/travel.svg";
import IconWallet from "../../assets/icons/wallet.svg";

const AccountPage = ({}) => {
  const { id, name, type, limit, currency, balance } = useLocalSearchParams();

  return (
    <View className="h-screen bg-magnetic-grey">
      <View className="p-5 ">
        <IconCoins />
        <Text>Name: {name}</Text>
        <Text>Balance: ${balance}</Text>
        <Text>{currency}</Text>
        <Text>{type}</Text>
        <Text>{limit}</Text>
      </View>

      <View>
        <Text>Your recent transactions</Text>
        <View className="flex-row w-full">
          <IconTravel />
          <IconWallet />
        </View>
      </View>
    </View>
  );
};

export default AccountPage;

const styles = StyleSheet.create({});
