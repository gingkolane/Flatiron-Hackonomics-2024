import { View, Text } from "react-native";
import LinkedAccount from "../../components/LinkedAccount";

export default function Tab() {
  const account1_info = {
    name: "Cash 2",
    desc: "Selling income",
    balance: "560 euros",
  };
  const account2_info = {
    name: "Credit card",
    desc: "Discover Card",
    balance: "5,000 euros",
  };
  const account3_info = {
    name: "Fidelity",
    desc: "Retirement fund",
    balance: "20,000 euros",
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "start",
        flex: 1,
        marginLeft: 20,
      }}
    >
      <Text className="mb-3 font-bold scale-125 p-2">Manual account</Text>
      <LinkedAccount account_info={account1_info} />
      <Text className="mb-3 font-bold scale-125 p-2">Linked Credit cards</Text>
      <LinkedAccount account_info={account2_info} />

      <Text className="mb-3 font-bold scale-125 p-2">
        Linked Investment accounts
      </Text>
      <LinkedAccount account_info={account3_info} />
    </View>
  );
}
