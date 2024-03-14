import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userInfo, navigation) => {
    try {
      const { email, password } = userInfo;
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      Alert.alert("Login Success", "You're logged in!");
      navigation.navigate("Dashboard");
    } catch (error) {
      console.log(error.message);
      Alert.alert("Login Failed", error.message);
    }
  };

  const signup = (values) => {
    return fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (!data) {
          throw new Error("No data returned from signup");
        }
        setUser(data);
        console.log(user);
        navigation.navigate("Dashboard");

        return true;
      })
      .catch((error) => {
        Alert.alert("Error", "Sign up failed. Please try again.");
        return false;
      });
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
