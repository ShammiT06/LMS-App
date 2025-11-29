import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function CertificateView({ course, onBackHome }) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Certificate of Completion</Text>

                <Text style={styles.sub}>This certifies that</Text>

                <Text style={styles.name}>Student Name</Text>

                <Text style={styles.sub}>
                    has successfully completed the course
                </Text>

                <Text style={styles.courseName}>{course.name}</Text>

                <Text style={styles.footer}>Congratulations! 🎉</Text>
            </View>

            {/* BACK HOME BUTTON */}
            <TouchableOpacity style={styles.btn} onPress={onBackHome}>
                <Text style={styles.btnText}>Go to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 40,
    },
    card: {
        width: "90%",
        backgroundColor: "#FFF7EE",
        padding: 25,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#CE6013",
        alignItems: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#2A346D",
        marginBottom: 10,
    },
    sub: {
        fontSize: 16,
        color: "#555",
        marginBottom: 5,
    },
    name: {
        fontSize: 24,
        fontWeight: "700",
        color: "#CE6013",
        marginBottom: 10,
    },
    courseName: {
        fontSize: 20,
        fontWeight: "700",
        color: "#2A346D",
        marginVertical: 10,
    },
    footer: {
        fontSize: 16,
        color: "#777",
        marginTop: 15,
    },
    btn: {
        marginTop: 25,
        backgroundColor: "#CE6013",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    btnText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },
});
