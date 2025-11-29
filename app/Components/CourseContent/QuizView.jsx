import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DEFAULT_QUIZ = {
    title: "Quick Knowledge Check",
    description: "Answer the following questions to test your understanding.",
    questions: [
        {
            question: "1. What is Python mainly used for?",
            options: [
                "Web development",
                "Data Science",
                "Automation",
                "All of the above"
            ],
            correct: 3,
        },
        {
            question: "2. Which one is a Python data type?",
            options: ["Tree", "Integer", "Laptop", "Road"],
            correct: 1,
        },
        {
            question: "3. What keyword is used to define a function in Python?",
            options: ["func", "def", "define", "method"],
            correct: 1,
        },
    ],
};

export default function QuizView({ onNextChapter }) {
    const quiz = DEFAULT_QUIZ;

    const [index, setIndex] = useState(0); // current question
    const [selected, setSelected] = useState(null); // user selected option
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const current = quiz.questions[index];

    const handleOptionPress = (idx) => {
        if (selected !== null) return; // prevent double selecting

        setSelected(idx);

        if (idx === current.correct) {
            setScore(score + 1);
        }

        // Move to next after a short delay
        setTimeout(() => {
            if (index + 1 < quiz.questions.length) {
                setIndex(index + 1);
                setSelected(null);
            } else {
                setShowResult(true);
            }
        }, 800);
    };

    // FINAL SCORE SCREEN
    if (showResult) {
        return (
            <View style={styles.resultBox}>
                <Ionicons name="trophy" size={70} color="#CE6013" />

                <Text style={styles.scoreTitle}>Quiz Completed!</Text>

                <Text style={styles.scoreText}>
                    Your Score: {score} / {quiz.questions.length}
                </Text>

                {/* NEXT CHAPTER BUTTON */}
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={onNextChapter}
                >
                    <Text style={styles.nextButtonText}>Next Chapter</Text>
                </TouchableOpacity>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            {/* QUIZ TITLE */}
            <Text style={styles.quizTitle}>{quiz.title}</Text>

            {/* DESCRIPTION */}
            <Text style={styles.quizDescription}>{quiz.description}</Text>

            {/* QUESTION */}
            <View style={styles.questionBox}>
                <Text style={styles.questionText}>{current.question}</Text>

                {/* OPTIONS */}
                {current.options.map((opt, idx) => {
                    const isCorrect = selected === current.correct && idx === selected;
                    const isWrong = selected !== current.correct && idx === selected;

                    return (
                        <TouchableOpacity
                            key={idx}
                            style={[
                                styles.optionBtn,
                                selected !== null && isCorrect && styles.correctOption,
                                selected !== null && isWrong && styles.wrongOption,
                            ]}
                            onPress={() => handleOptionPress(idx)}
                            disabled={selected !== null}
                        >
                            <Text style={styles.optionText}>{opt}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Question Counter */}
            <Text style={styles.counterText}>
                Question {index + 1} of {quiz.questions.length}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
    },

    quizTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#2A346D",
        marginBottom: 10,
    },

    quizDescription: {
        fontSize: 15,
        lineHeight: 22,
        color: "#444",
        backgroundColor: "#FFF7EE",
        padding: 12,
        borderRadius: 10,
        marginBottom: 20,
    },

    questionBox: {
        marginBottom: 20,
    },

    questionText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2A346D",
        marginBottom: 12,
    },

    optionBtn: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#CE6013",
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },

    optionText: {
        fontSize: 15,
        color: "#333",
    },

    correctOption: {
        backgroundColor: "#D4F8D4",
        borderColor: "green",
    },

    wrongOption: {
        backgroundColor: "#FFE1E1",
        borderColor: "red",
    },

    counterText: {
        marginTop: 10,
        fontSize: 14,
        textAlign: "center",
        color: "#777",
    },

    resultBox: {
        alignItems: "center",
        marginTop: 40,
    },

    scoreTitle: {
        fontSize: 26,
        fontWeight: "700",
        color: "#2A346D",
        marginTop: 20,
    },

    scoreText: {
        fontSize: 18,
        marginTop: 10,
        color: "#CE6013",
    },
    nextButton: {
        marginTop: 25,
        backgroundColor: "#CE6013",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    nextButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },

});
