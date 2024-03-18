import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || "";
    }

    return "";
  };

  const login = async (userInfo, navigation) => {
    try {
      const csrfToken = await AsyncStorage.getItem("csrfToken");
      const { email, password } = userInfo;
      const response = await fetch("http://127.0.0.1:5555/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      console.log(data);
      if (!data.accessToken || !data.refreshToken) {
        throw new Error("Missing access tokens");
      }
      await AsyncStorage.setItem("token", data.accessToken);
      await AsyncStorage.setItem("refreshToken", data.refreshToken);
      setUser(data);
      Alert.alert("Login Success", "You're logged in!");
      navigation.navigate("Dashboard");
    } catch (error) {
      console.error(error.message);
      Alert.alert("Login Failed", error.message);
    }
  };

  const signup = async (values, navigation) => {
    try {
      const csrfToken = (await AsyncStorage.getItem("csrfToken")) || "";
      const response = await fetch("http://127.0.0.1:5555/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        const errorMessage = data.error || "Signup failed due to server error";
        console.error(errorMessage); // Use console.error for errors
        Alert.alert("Signup Error", errorMessage);
        return; // Early return on error
      }

      if (
        data.Success &&
        data.Success.accessToken &&
        data.Success.refreshToken
      ) {
        await AsyncStorage.multiSet([
          ["token", data.Success.accessToken],
          ["refreshToken", data.Success.refreshToken],
        ]);

        setUser(data.Success);
        navigation.navigate("Dashboard");
      } else {
        console.error("Missing tokens in response"); // Use console.error for errors
        throw new Error(
          "Signup succeeded, but tokens are missing in the response."
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Signup Failed",
        error.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  const logout = async () => {
    try {
      // Example fetch call to notify backend about logout
      const response = await fetch("http://127.0.0.1:5555/user/logout", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        // Clear AsyncStorage tokens
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("refreshToken");
        // Update user state
        setUser(null);
        // Optionally navigate to login screen or another appropriate screen
      } else {
        console.error("Logout failed with response:", response.status);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const refreshUser = () => {
    return fetch("/user", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            if (!loadingLogout) {
              setUser(data);
              return true;
            }
          });
        } else {
          if (res.status === 401) {
            fetch("/refresh", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshToken}`,
                "X-CSRF-TOKEN": getCookie("csrf_refresh_token"),
              },
              credentials: "include",
            })
              .then((res) => {
                if (res.ok) {
                  return res.json().then((data) => {
                    if (!loadingLogout) {
                      setUser(data);
                      return true;
                    }
                  });
                } else {
                  setUser(null);
                  return false;
                }
              })
              .catch((e) => {
                console.error(e);
                return false;
              });
          } else {
            return false;
          }
        }
      })
      .catch((e) => {
        console.error(e);
        return false;
      });
  };

  //   const fetchUserNameByID = async () => {
  //     try {
  //       const response = await fetch(`/users/${selectedPost.user_id}`);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setUserNameById(data.username);
  //     } catch (error) {
  //       console.error(
  //         "There was an error",
  //         error
  //       );
  //     }
  //   };

  //   fetchUserNameByID();
  // }
  // }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        getCookie,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
