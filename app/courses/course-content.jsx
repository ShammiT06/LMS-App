import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";

import CourseHeader from "../Components/CourseContent/CourseHeader.jsx";
import ChapterSidebar from "../Components/CourseContent/ChapterSidebar.jsx";
import VideoContainer from "../Components/CourseContent/VideoContainer.jsx";
import PlaceholderView from "../Components/CourseContent/PlaceholderView.jsx";

export default function CourseContent() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [course, setCourse] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [progress, setProgress] = useState(0);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);



    // Fetch course + auto-select first video
    useEffect(() => {
        const username = "admin";
        const password = "admin@123";
        const token = btoa(`${username}:${password}`);

        axios
            .get(`https://lms.thirdvizion.com/api/course/${id}/`, {
                headers: { Authorization: `Basic ${token}` },
            })
            .then((res) => {
                const data = res.data;
                setCourse(data);

                // Auto select first chapter → first video
                if (data?.chapters?.length > 0) {
                    const firstChapter = data.chapters[0];
                    if (firstChapter?.videos?.length > 0) {
                        setSelectedItem({
                            type: "video",
                            data: firstChapter.videos[0],
                            chapterIndex: 0,
                        });
                    }
                }
            })
            .catch((err) => console.log(err));
    }, [id]);

    // Reset orientation on unmount
    useEffect(() => {
        return () => {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        };
    }, []);

    const getTotalVideos = (course) => {
        let count = 0;
        course.chapters?.forEach((ch) => {
            count += ch.videos?.length || 0;
        });
        return count;
    };

    // update progress whenever a video is selected
    useEffect(() => {
        if (!selectedItem || !course) return;

        const totalVideos = getTotalVideos(course);
        if (totalVideos === 0) return;

        // find index of selected video
        let index = 0;
        let found = false;

        course.chapters.forEach((ch) => {
            ch.videos.forEach((v) => {
                if (!found) {
                    index++;
                    if (v.id === selectedItem?.data?.id) {
                        found = true;
                    }
                }
            });
        });

        const percent = Math.floor((index / totalVideos) * 100);
        setProgress(percent);

    }, [selectedItem, course]);



    if (!course) return null;

    return (
        <View style={styles.page}>
            <CourseHeader
                title={course.name}
                onBack={() => router.back()}
                onMenu={() => setDrawerOpen(true)}
                progress={progress}
            />

            <ChapterSidebar
                course={course}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onSelect={setSelectedItem}
            />

            <ScrollView style={styles.contentScroll}>
                {!selectedItem ? (
                    <PlaceholderView />
                ) : (
                    <VideoContainer
                        selectedItem={selectedItem}
                        goToNextChapter={() => {
                            const next = selectedItem.chapterIndex + 1;

                            if (next < course.chapters.length) {
                                const nextChap = course.chapters[next];

                                // Go to first video if available
                                if (nextChap.videos?.length > 0) {
                                    setSelectedItem({
                                        type: "video",
                                        data: nextChap.videos[0],
                                        chapterIndex: next
                                    });
                                } else {
                                    // Otherwise go to quiz
                                    setSelectedItem({
                                        type: "quiz",
                                        chapterIndex: next
                                    });
                                }
                            } else {
                                setSelectedItem({
    type: "certificate"
});

                            }
                        }}
                        course={course}

                    />
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    contentScroll: {
        padding: 15,
    },
});
