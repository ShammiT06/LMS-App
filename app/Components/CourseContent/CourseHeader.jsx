import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CourseHeader({ title, onBack, onMenu }) {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onBack}>
                <Ionicons name="chevron-back" size={26} color="#FF6A00" />
            </TouchableOpacity>

            {/* <Text style={styles.title}>{title}</Text> */}

            <TouchableOpacity onPress={onMenu}>
                <Ionicons name="menu" size={28} color="#FF6A00" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#FFF",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#FF6A00",
    },
});
