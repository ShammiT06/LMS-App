import { Stack, router } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";  

export default function RootLayout() {

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("access_token");
      console.log("Stored Token:", token);

      if (token) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)");
      }
    };

    checkLogin();
  }, []);

  return (
    <>
      <StatusBar style="light" backgroundColor="#000" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
