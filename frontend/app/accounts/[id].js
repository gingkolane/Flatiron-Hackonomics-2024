import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import LinkedAccount from "../../components/LinkedAccount";
import AccountDetails from "./AccountDetails";
import IconCoins from "../../assets/icons/coins.svg";
import IconTravel from "../../assets/icons/travel.svg";
import IconWallet from "../../assets/icons/wallet.svg";

const AccountPage = ({ account_info }) => {
  const { id, name, desc, balance } = useLocalSearchParams();

  return (
    <View>
      <Text>
        AccountPage - {id} {name}
      </Text>
      <View className="bg-mint-green h-screen p-5">
        <Text>Balance: {balance}</Text>
        <IconCoins />
      </View>
      <Text>Name: {name}</Text>

      <View>
        <Text>Your recent transactions</Text>
        <View className="flex-row w-full">
          <IconTravel />
          <Text>{desc}</Text>
          <Text>03-23-24</Text>
          <IconWallet />
        </View>
      </View>
    </View>
  );
};

export default AccountPage;

const styles = StyleSheet.create({});
