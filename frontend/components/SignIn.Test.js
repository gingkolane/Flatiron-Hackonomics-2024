import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import LoginPage from "./LoginPage";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

const mockedNavigate = jest.fn();

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
);

test("login function gets called and navigates on successful login", async () => {
  const { getByPlaceholderText, getByText } = render(
    <LoginPage navigation={{ navigate: mockedNavigate }} />
  );

  fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
  fireEvent.changeText(getByPlaceholderText("Password"), "password123");
  fireEvent.press(getByText("Login"));

  await waitFor(() => {
    expect(mockedNavigate).toHaveBeenCalledWith("Dashboard");
  });
});
