import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const OpenAiChat = () => {
  const [aiResponse, setAiResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/api/get-response", {
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log("DATA: ", data);
        setAiResponse(`Ai Data: ${data || "No response"}`);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setErrorMessage("Failed to fetch AI response. Please try again later.");
      }
    };

    fetchData();
  }, []);
  console.log("AI Response:", aiResponse);
  return (
    <View style={styles.container}>
      <Text>OpenAI Chat Response:</Text>
      <Text style={styles.responseText}>{aiResponse}</Text>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default OpenAiChat;

const styles = StyleSheet.create({
  container: { padding: 20 },
  responseText: { marginTop: 10 },
  errorText: { marginTop: 10, color: "red" },
});
