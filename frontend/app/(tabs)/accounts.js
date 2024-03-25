import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import OpenAiChat from "../../components/OpenAiChat";
import LinkedAccount from "../../components/LinkedAccount";

export default function Tab() {
  const [accountDetails, setAccountDetails] = useState("");

  useEffect(() => {
    const userId = "1";
    const accountId = "1";

    const url = `http://127.0.0.1:5555/api/users/${userId}/accounts/${accountId}`;

    // Fetch account details from your API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAccountDetails(data);
      })
      .catch((error) =>
        console.error("Error fetching account details:", error)
      );
  }, []);

  return (
    <ScrollView>
      <Text>Manual account</Text>
      {accountDetails.length > 0 ? (
        accountDetails.map((account, index) => (
          <LinkedAccount key={index} account_info={account} />
        ))
      ) : (
        <Text>No accounts found.</Text>
      )}
      {/* <OpenAiChat /> */}
    </ScrollView>
  );
}
