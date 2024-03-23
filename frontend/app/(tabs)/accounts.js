import { View, Text } from "react-native";
import LinkedAccount from "../../components/LinkedAccount";

export default function Tab() {
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
      <LinkedAccount />
      <Text className="mb-3 font-bold scale-125 p-2">Linked Credit cards</Text>
      <LinkedAccount />
      <LinkedAccount />
      <Text className="mb-3 font-bold scale-125 p-2">
        Linked Investment accounts
      </Text>
      <LinkedAccount />
    </View>
  );
}
