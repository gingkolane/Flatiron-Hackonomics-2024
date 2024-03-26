import { StyleSheet, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import LinkedAccount from "../../components/LinkedAccount";
import AccountDetails from "./AccountDetails";
import IconCoins from "../../assets/icons/coins.svg";
import IconTravel from "../../assets/icons/travel.svg";
import IconWallet from "../../assets/icons/wallet.svg";
import { Text } from "react-native-paper";
import VisaCard from "./VisaCard";
import RecentTransaction from "./RecentTransactions";

const AccountPage = ({}) => {
  const { id, name, type, limit, currency, balance } = useLocalSearchParams();

  return (
    <View className="h-screen bg-magnetic-grey">
      <View className="p-5 ">
        <VisaCard />
      </View>

      <View>
        <Text>Your recent transactions</Text>
        <View className="flex-row w-full">
          <RecentTransaction />
        </View>
      </View>
    </View>
  );
};

export default AccountPage;

const styles = StyleSheet.create({});
