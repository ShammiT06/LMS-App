import {
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    TextInput,
    Modal,
    Dimensions
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";





export default function Index() {
    const { width, height } = Dimensions.get("window");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [user_type] = useState("student");


    const [login_time] = useState(
        new Date().toLocaleTimeString("en-US", { hour12: false })
    );

    const [errorModal, setErrorModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");


    const API_URL = "https://lms.thirdvizion.com/api/login/";

    // const handleLogin = async () => {
    //     if (!email || !password) {
    //         setErrorMsg("Please enter email and password");
    //         setErrorModal(true);
    //         return;
    //     }

    //     try {
    //         const response = await fetch(API_URL, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 email,
    //                 password,
    //                 user_type,
    //                 login_time,
    //             })
    //         });

    //         const data = await response.json();

    //         console.log(data);

    //         if (!response.ok) {
    //             setErrorMsg(data.error || "Invalid login");
    //             setErrorModal(true);
    //             return;
    //         }


    //         await AsyncStorage.setItem("user_name", data.user.name);

   
    //         await AsyncStorage.setItem("access_token", data.access);

    //         setSuccessModal(true);

    //         setTimeout(() => {
    //             setSuccessModal(false);
    //             router.push("/(tabs)");
    //             setTimeout(() => {
    //                 router.push("/(modals)/suggestion");
    //             }, 500);
    //         }, 1500);

    //     } catch (err) {
    //         setErrorMsg("Network error");
    //         setErrorModal(true);
    //         console.log("error Message :", err)
    //     }
    // };






    const handleLogin = () =>{
        router.push("/(tabs)")
    }

    
    const navigateSignUp = () => {
        router.push("(auth)/SignUp");
    };

    return (
        <ImageBackground
            source={require("../../assets/Auth/login.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.overlay}>
                <View style={styles.card}>

                    <Text style={styles.title}>Sign in to your Account</Text>
                    <Text style={styles.subtitle}>Enter your email and password to log in</Text>


                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#aaa"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <View style={styles.passwordBox}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#aaa"
                            secureTextEntry={!showPassword}
                            style={styles.passwordInput}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons
                                name={showPassword ? "eye-outline" : "eye-off-outline"}
                                size={22}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                        <Text style={styles.loginText}>Log In</Text>
                    </TouchableOpacity>


                    <View style={styles.bottomRow}>
                        <Text style={{ color: "#B4B4B4" }}>Don’t have an account? </Text>
                        <TouchableOpacity onPress={navigateSignUp}>
                            <Text style={styles.signup}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>


            <Modal transparent visible={errorModal} animationType="fade">
                <View style={styles.modalWrapper}>
                    <View style={styles.modalBox}>
                        <Text style={styles.errorTitle}>Login Failed</Text>
                        <Text style={styles.errorMsg}>{errorMsg}</Text>

                        <TouchableOpacity
                            onPress={() => setErrorModal(false)}
                            style={styles.closeBtn}
                        >
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            <Modal transparent visible={successModal} animationType="fade">
                <View style={styles.modalWrapper}>
                    <View style={styles.modalBox}>
                        <Text style={styles.successTitle}>Success</Text>
                        <Text style={styles.successMsg}>Login Successful!</Text>
                    </View>
                </View>
            </Modal>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    overlay: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
    card: {
        backgroundColor: "rgba(255,255,255,0.15)",
        padding: 25,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
    },
    title: {
        fontSize: 26, fontWeight: "bold",
        textAlign: "center", color: "#fff",
        marginBottom: 5,
    },
    subtitle: { textAlign: "center", color: "#B4B4B4", marginBottom: 20 },

    input: {
        backgroundColor: "rgba(255,255,255,0.9)",
        padding: 12, borderRadius: 10,
        marginBottom: 15, color: "#000",
    },

    passwordBox: {
        backgroundColor: "rgba(255,255,255,0.9)",
        padding: 12, borderRadius: 10,
        flexDirection: "row", justifyContent: "space-between",
        alignItems: "center", marginBottom: 15,
    },
    passwordInput: { flex: 1, color: "#000" },

    loginBtn: {
        backgroundColor: "#DA7A23",
        paddingVertical: 12, borderRadius: 10,
    },
    loginText: { color: "white", fontSize: 18, textAlign: "center", fontWeight: "bold" },

    bottomRow: { flexDirection: "row", justifyContent: "center", marginTop: 15 },
    signup: { color: "#4A6CFF", fontWeight: "bold" },

    modalWrapper: {
        flex: 1, backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center", alignItems: "center",
    },
    modalBox: {
        backgroundColor: "#fff",
        padding: 25, borderRadius: 10,
        width: "80%", alignItems: "center",
    },
    errorTitle: { fontSize: 22, fontWeight: "bold", color: "red" },
    successTitle: { fontSize: 22, fontWeight: "bold", color: "green" },
    errorMsg: { marginTop: 10, fontSize: 16, textAlign: "center" },
    successMsg: { marginTop: 10, fontSize: 16, textAlign: "center" },
    closeBtn: {
        marginTop: 20, backgroundColor: "red",
        paddingVertical: 8, paddingHorizontal: 20,
        borderRadius: 6,
    },
    closeText: { color: "white", fontWeight: "bold" },
});
