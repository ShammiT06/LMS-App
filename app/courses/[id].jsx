import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function CourseDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [course, setCourse] = useState(null);

    const username = "admin";
    const password = "admin@123";
    const token = btoa(`${username}:${password}`);

    useEffect(() => {
        axios
            .get(`https://lms.thirdvizion.com/api/course/${id}/`, {
                headers: { Authorization: `Basic ${token}` },
            })
            .then((res) => setCourse(res.data))
            .catch((err) => console.log(err));
    }, [id, token]);

    if (!course) return null;

    return (
        <ScrollView style={styles.container}>
            {/* Back button */}
            <View style={styles.header}>
                <Ionicons
                    name="chevron-back"
                    size={28}
                    color="#FF6A00"
                    onPress={() => router.back()}
                />
                <Text style={styles.title}>{course.name}</Text>
            </View>

            <Image source={{ uri: course.image }} style={styles.image} />

            <Text style={styles.description}>{course.description}</Text>

            <Text style={styles.sectionTitle}>Ratings: ⭐ {course.ratings}</Text>

            <Text style={styles.sectionTitle}>Chapters</Text>
            {course.chapters.map((ch) => (
                <View key={ch.id} style={styles.chapter}>
                    <Text style={styles.chapterTitle}>{ch.title}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 10,
        color: "#FF6A00",
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: "#444",
        marginBottom: 20,
        lineHeight: 22,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
    chapter: {
        padding: 12,
        backgroundColor: "#FFF7EE",
        borderRadius: 8,
        marginBottom: 10,
    },
    chapterTitle: {
        fontWeight: "600",
    },
});
