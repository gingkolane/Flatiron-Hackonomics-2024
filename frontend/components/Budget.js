import React, { Component } from "react";
import { Text, View } from "react-native";

export class Budget extends Component {
  render() {
    return (
      <View className="bg-mint-green flex-1">
        <Text className="bg-magnetic-plum p-5 m-4 text-magnetic-grey">
          textInComponent
        </Text>
      </View>
    );
  }
}

export default Budget;
