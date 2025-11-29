// Components/CourseContent/VideoContainer.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import VideoPlayer from "./VideoPlayer";

export default function VideoContainer({ selectedItem }) {
    if (!selectedItem) return null;

    // VIDEO
    if (selectedItem.type === "video") {
        const videoData = selectedItem.data;

        return (
            <View>
                {/* VIDEO PLAYER */}
                <VideoPlayer video={videoData} />

                {/* TITLE */}
                <Text style={styles.videoTitle}>{videoData.video_name}</Text>

                {/* DESCRIPTION */}
                <Text style={styles.videoDescription}>
                    {videoData.description?.trim() || "No description available."}
                </Text>
            </View>
        );
    }

    // QUIZ
    if (selectedItem.type === "quiz") {
        return <Text style={styles.placeholder}>Quiz Content Coming Soon</Text>;
    }

    // NOTES
    if (selectedItem.type === "note") {
        return <Text style={styles.placeholder}>Notes Content Coming Soon</Text>;
    }

    return null;
}

const styles = StyleSheet.create({
    videoTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#2A346D",
        marginTop: 20,
        marginBottom: 8,
    },
    videoDescription: {
        fontSize: 15,
        lineHeight: 22,
        color: "#444",
        backgroundColor: "#FFF7EE",
        padding: 12,
        borderRadius: 10,
        marginBottom: 20,
    },
    placeholder: {
        marginTop: 30,
        fontSize: 16,
        textAlign: "center",
        color: "#777",
    },
});
