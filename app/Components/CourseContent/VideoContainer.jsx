// Components/CourseContent/VideoContainer.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import VideoPlayer from "./VideoPlayer";
import QuizView from "./QuizView";
import CertificateView from "./CertificateView";
import { useRouter } from "expo-router";


export default function VideoContainer({ selectedItem, goToNextChapter, course }) {

    const router = useRouter();

    if (!selectedItem) return null;

    // VIDEO
    if (selectedItem.type === "video") {
        const videoData = selectedItem.data;
        console.log(videoData)

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

    if (selectedItem.type === "quiz") {
        return (
            <QuizView
                onNextChapter={goToNextChapter}
            />
        );
    }

    // NOTES
    if (selectedItem.type === "note") {
        return <Text style={styles.placeholder}>Notes Content Coming Soon</Text>;
    }

    if (selectedItem.type === "certificate") {
        return (
            <CertificateView
                course={course}
                onBackHome={() => router.replace("/")}
            />
        );
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
