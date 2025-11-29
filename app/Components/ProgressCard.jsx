// Components/CourseRowCard.jsx
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function ProgressCard({ course, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>

            {/* LEFT: Thumbnail */}
            <Image
                source={{ uri: course.image || "https://via.placeholder.com/120" }}
                style={styles.thumbnail}
            />

            {/* RIGHT: Content */}
            <View style={styles.details}>
                <Text style={styles.title}>{course.name}</Text>
                <Text style={styles.progress}>Progress: {course.progress || 0}%</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#FFF",
        padding: 12,
        borderRadius: 16,
        marginBottom: 15,
        marginHorizontal: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },

    thumbnail: {
        width: 110,
        height: 110,
        borderRadius: 12,
        backgroundColor: "#eee",
    },

    details: {
        flex: 1,
        marginLeft: 15,
        justifyContent: "space-between",
    },

    title: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: "700",
        color: "#2A346D",
    },

    category: {
        fontSize: 13,
        marginTop: 4,
        color: "#FF6A00",
        fontWeight: "500",
    },

    description: {
        marginTop: 6,
        fontSize: 13,
        color: "#555",
    },

    progress: {
        marginTop: 0,
        fontSize: 12,
        fontWeight: "600",
        color: "#CE6013",
    },
});
