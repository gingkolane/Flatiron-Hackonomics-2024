import { View, Text } from "react-native";
import OpenAiChat from "../../components/OpenAiChat";

export default function Tab() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>
        <OpenAiChat />
      </Text>
    </View>
  );
}
