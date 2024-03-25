import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const OpenAiChat = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const userData = {
      user: {},
      achievement: {},
    };
    fetch("http://127.0.0.1:5555/user/1/achievement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  console.log(response);
  return (
    <View>
      <Text>{response}</Text>
    </View>
  );
};

export default OpenAiChat;

const styles = StyleSheet.create({});
