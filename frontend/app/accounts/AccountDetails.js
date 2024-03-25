import React from "react";
import { View, Text } from "react-native";
import IconCoins from "../../assets/icons/coins.svg";
import IconTravel from "../../assets/icons/travel.svg";
import IconWallet from "../../assets/icons/wallet.svg";

const AccountDetails = ({ route }) => {
  const accountInfo = {
    id: "1",
    name: "Cash 2",
    desc: "Selling income",
    balance: "560 euros",
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View className="bg-mint-green h-screen p-5">
        <Text>Balance: {accountInfo.balance}</Text>
        <IconCoins />
      </View>
      <Text>Name: {accountInfo.name}</Text>

      <View>
        <Text>Your recent transactions</Text>
        <View className="flex-row w-full">
          <IconTravel />
          <Text>Travel</Text>
          <Text>03-23-24</Text>
          <IconWallet />
        </View>
      </View>
    </View>
  );
};

export default AccountDetails;
