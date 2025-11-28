// components/CourseCard.jsx
import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function CourseCard({ course, onPress }) {
    if (!course) return null;

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => onPress && onPress(course)}
        >
            <Image
                source={{
                    uri: course.image || "https://via.placeholder.com/150",
                }}
                style={styles.image}
            />

            <Text style={styles.rating}>⭐ {course.ratings}</Text>
            <Text numberOfLines={2} style={styles.name}>
                {course.name}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 170,
        borderRadius: 15,
        marginHorizontal: 10,
    },
    image: {
        width: "100%",
        height: 100,
        borderRadius: 10,
        backgroundColor: "#DDD",
    },
    rating: {
        color: "#666",
        fontSize: 12,
        marginTop: 6,
    },
    name: {
        fontWeight: "600",
        fontSize: 14,
        marginTop: 4,
    },
});
