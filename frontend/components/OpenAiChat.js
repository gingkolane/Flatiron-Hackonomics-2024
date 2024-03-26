import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import OpenAiIcon from "../assets/icons/openai-svgrepo-com.svg";
const OpenAiChat = () => {
  const [aiResponse, setAiResponse] = useState(); // Default suggestions to empty array
  const [errorMessage, setErrorMessage] = useState(""); // To handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/api/get-response", {
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setAiResponse(` ${data || "No response"}`);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setErrorMessage("Failed to fetch AI response. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView className="h-fit">
      <View className=" bg-magnetic-grey flex-1 justify-center h-screen">
        <View className=" bg-mint-green p-5 shadow-lg m-5 rounded-lg">
          <Text className=" text-magnetic-plum">{aiResponse}</Text>
        </View>
        <Text className="mx-auto ">Powered by OpenAI</Text>
      </View>
      <View className="mx-auto bg-mint-green shadow-lg rounded-full">
        <OpenAiIcon />
      </View>
    </ScrollView>
  );
};

export default OpenAiChat;

const styles = StyleSheet.create({
  container: { padding: 20 },
  responseText: { marginTop: 10 },
  errorText: { marginTop: 10, color: "red" },
});
