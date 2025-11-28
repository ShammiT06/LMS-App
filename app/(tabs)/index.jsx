import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Welcome, {name}
      </Text>
    </View>
  );
}
