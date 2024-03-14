import { StatusBar } from "expo-status-bar";
import { Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import "./app.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // some test tailwind classes
    <SafeAreaView className="flex h-screen justify-center bg-money-green">
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Welcome to Money Magnet" }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: "Sign In" }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: "Sign Up" }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ title: "Dashboard" }}
          />
        </Stack.Navigator>

        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaView>
  );
}
