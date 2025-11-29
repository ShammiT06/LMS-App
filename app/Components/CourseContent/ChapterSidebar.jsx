import React, { useRef, useEffect } from "react";
import {
    Animated,
    Dimensions,
    Pressable,
    View,
    Text,
    ScrollView,
    StyleSheet,
} from "react-native";
import ChapterAccordion from "./ChapterAccordion";

const { width } = Dimensions.get("window");

export default function ChapterSidebar({ course, isOpen, onClose, onSelect }) {
    const drawerX = useRef(new Animated.Value(-width)).current;

    useEffect(() => {
        Animated.timing(drawerX, {
            toValue: isOpen ? 0 : -width,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [isOpen, drawerX]);

    return (
        <>
            {isOpen && <Pressable style={styles.overlay} onPress={onClose} />}

            <Animated.View
                style={[
                    styles.drawer,
                    { transform: [{ translateX: drawerX }] },
                ]}
            >
                <Text style={styles.title}>Chapters</Text>

                <ScrollView>
                    {course.chapters?.map((chapter) => (
                        <ChapterAccordion
                            key={chapter.id}
                            chapter={chapter}
                            onSelect={onSelect}
                            closeDrawer={onClose}
                        />
                    ))}
                </ScrollView>
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    drawer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: width * 0.85,
        height: "100%",
        backgroundColor: "#FFF7EE",
        padding: 20,
        zIndex: 10,
    },
    overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#FF6A00",
        marginBottom: 15,
    },
});
