import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import OpenAiChat from "../../components/OpenAiChat";
import LinkedAccount from "../../components/LinkedAccount";

export default function Tab() {
  const [accountDetails, setAccountDetails] = useState(null);

  useEffect(() => {
    const userId = "1";
    const accountId = "1";

    const url = `http://127.0.0.1:5555/api/users/${userId}/accounts/${accountId}`;

    // Fetch account details from your API
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAccountDetails(data);
        console.log("Data: ", data);
      })
      .catch((error) =>
        console.error("Error fetching account details:", error)
      );
  }, []);

  return (
    <ScrollView>
      <Text>Manual account</Text>
      {accountDetails ? (
        <LinkedAccount account={accountDetails} />
      ) : (
        <Text>No account details found.</Text>
      )}
      <OpenAiChat />
    </ScrollView>
  );
}
