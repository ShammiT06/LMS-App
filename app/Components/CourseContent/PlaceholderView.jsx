import React from "react";
import { Text, StyleSheet } from "react-native";

export default function PlaceholderView() {
    return (
        <Text style={styles.text}>
            Select something from the menu
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        marginTop: 50,
        textAlign: "center",
        fontSize: 16,
        color: "#777",
    },
});

