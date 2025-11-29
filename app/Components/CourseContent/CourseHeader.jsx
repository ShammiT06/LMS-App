import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CourseHeader({ title, onBack, onMenu, progress = 0 }) {
    const widthAnim = React.useRef(new Animated.Value(progress)).current;

    // Animate whenever progress updates
    React.useEffect(() => {
        Animated.timing(widthAnim, {
            toValue: progress,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [progress]);

    return (
        <View>
            {/* TOP Header Row */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack}>
                    <Ionicons name="chevron-back" size={26} color="#FF6A00" />
                </TouchableOpacity>

                {/* <Text style={styles.title}>{title}</Text> */}

                <TouchableOpacity onPress={onMenu}>
                    <Ionicons name="menu" size={28} color="#FF6A00" />
                </TouchableOpacity>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBackground}>
                <Animated.View
                    style={[
                        styles.progressFill,
                        { width: widthAnim.interpolate({
                            inputRange: [0, 100],
                            outputRange: ["0%", "100%"],
                        }) },
                    ]}
                />
            </View>
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

    progressBackground: {
        width: "100%",
        height: 4,
        backgroundColor: "#FFE3CC", // light orange behind
    },

    progressFill: {
        height: 4,
        backgroundColor: "#FF6A00", // brand color
    },
});
