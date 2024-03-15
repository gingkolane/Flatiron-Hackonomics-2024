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
      const csrfToken = await AsyncStorage.getItem("csrfToken"); // Assuming you store CSRF token on login
      const { email, password } = userInfo;
      const response = await fetch("http://127.0.0.1:5555/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken, // Adjust as per your CSRF token handling
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      await AsyncStorage.setItem("token", data.accessToken); // Assuming these tokens are returned
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
      const csrfToken = await AsyncStorage.getItem("csrfToken");
      const response = await fetch("http://127.0.0.1:5555/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUser(data);
      await AsyncStorage.setItem("token", data.accessToken);
      await AsyncStorage.setItem("refreshToken", data.refreshToken);
      navigation.navigate("Dashboard");
    } catch (error) {
      Alert.alert("Error", "Sign up failed. Please try again.");
    }
  };

  const logout = () => {
    setLoadingLogout(true);
    return fetch("/user/logout", {
      method: "DELETE",
    })
      .then((resp) => {
        if (resp.ok) {
          setUser(null);
          return true;
        } else {
          return false;
        }
      })
      .catch(() => false)
      .finally(() => {});
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
