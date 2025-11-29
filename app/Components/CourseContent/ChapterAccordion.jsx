import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ChapterAccordion({ chapter, onSelect, closeDrawer }) {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        LayoutAnimation.easeInEaseOut();
        setOpen(!open);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggle}>
                <Text style={styles.title}>{chapter.title}</Text>
                <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color="#FF6A00" />
            </TouchableOpacity>

            {open && (
                <View style={styles.content}>

                    {chapter.videos?.map((video) => (
                        <TouchableOpacity
                            key={video.id}
                            style={styles.row}
                            onPress={() => {
                                onSelect({ type: "video", data: video });
                                closeDrawer();
                            }}
                        >
                            <Ionicons name="play" size={16} color="#FF6A00" />
                            <Text style={styles.rowText}>{video.video_name}</Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => {
                            onSelect({ type: "quiz" });
                            closeDrawer();
                        }}
                    >
                        <Ionicons name="help-circle-outline" size={16} color="#CE6013" />
                        <Text style={styles.rowText}>Quiz</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.row}
                        onPress={() => {
                            onSelect({ type: "note" });
                            closeDrawer();
                        }}
                    >
                        <Ionicons name="book-outline" size={16} color="#2A346D" />
                        <Text style={styles.rowText}>Notes</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 10 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    title: { fontSize: 16, fontWeight: "600" },
    content: { paddingLeft: 10 },
    row: { flexDirection: "row", alignItems: "center", paddingVertical: 6 },
    rowText: { marginLeft: 10, fontSize: 14 },
});
