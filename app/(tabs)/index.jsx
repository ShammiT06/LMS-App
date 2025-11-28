import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Index() {

  const [name, setName] = useState("");

  useEffect(() => {
    const loadName = async () => {
      const storedName = await AsyncStorage.getItem("user_name");
      if (storedName) {
        setName(storedName);
      }
    };

    loadName();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>
        Welcome {name}
      </Text>
    </SafeAreaView>
  );
}
