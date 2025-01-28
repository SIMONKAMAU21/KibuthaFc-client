import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

export const tokenValidation = async () => {
  const token = await SecureStore.getItemAsync("userToken");
  console.log('token', token)
  const expiry = await SecureStore.getItemAsync("tokenExpiry");
  console.log('expiry', expiry)
  if (token && expiry) {
    const currentTime = new Date().getTime();

    if (currentTime < parseInt(expiry)) {
      return true; // Token is still valid
    } else {
      await logoutUser(); // Token expired
      return false;
    }
  }

  return false; // No token or invalid
};

export const logoutUser = async () => {
  // Clear stored data
  await SecureStore.deleteItemAsync("userToken");
  await SecureStore.deleteItemAsync("userData");
  await SecureStore.deleteItemAsync("tokenExpiry");

  // Navigate to login screen
  router.replace("/signin");
};
