import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

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

  const login = async (userInfo, navigation) => {
    try {
      const { email, password } = userInfo;
      const response = await fetch("http://127.0.0.1:5555/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-CSRF-TOKEN": getCookie("csrf_refresh_token"),
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
    return fetch("http://127.0.0.1:5555/register", {
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
        console.log(response);
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
        getCookie,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
