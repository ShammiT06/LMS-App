import {
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    TextInput,
    Modal
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function SignUp() {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [role] = useState("student");
    const [university,setUniversity] = useState("Thirdviz");
    const [errorModal, setErrorModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [errMsg, setErrMsg] = useState("");


    const handleRegister = async () => {

        if (!name || !phone || !email || !password) {
            setErrMsg("Please fill all fields!");
            setErrorModal(true);
            return;
        }

        try {

            const res = await fetch("https://lms.thirdvizion.com/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, phone, email, password,user_type:role,university })
            });

            const data = await res.json();

            if (!res.ok) {
                setErrMsg(data?.message || "Registration failed!");
                setErrorModal(true);
                return;
            }


            setSuccessModal(true);


            setTimeout(() => {
                setSuccessModal(false);
            }, 2000);

        } catch (error) {
            setErrMsg("Network error! Please try again.");
            console.log(error)
            setErrorModal(true);
        }
    };

    return (
        <ImageBackground
            source={require("../../assets/Auth/Signup.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.overlay}>
                <View style={styles.card}>

                    <Text style={styles.title}>Sign Up</Text>

                    <Text style={styles.subtitle}>
                        Already have an account? <Text style={styles.link}>Log In</Text>
                    </Text>


                    <TextInput
                        placeholder="Name"
                        placeholderTextColor="#aaa"
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />


                    <TextInput
                        placeholder="Phone"
                        placeholderTextColor="#aaa"
                        style={styles.input}
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />


                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#aaa"
                        style={styles.input}
                        keyboardType="email-address"
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


                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={handleRegister}
                    >
                        <Text style={styles.loginText}>Sign Up</Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>


            <Modal transparent visible={errorModal} animationType="fade">
                <View style={styles.modalWrapper}>
                    <View style={styles.modalBox}>
                        <Text style={styles.errorTitle}>Error</Text>
                        <Text style={styles.errorMsg}>{errMsg}</Text>

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
                        <Text style={styles.successMsg}>Account Created!</Text>
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
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
        marginBottom: 5,
    },
    subtitle: {
        textAlign: "center",
        color: "#E0E0E0",
        marginBottom: 20,
    },
    link: {
        color: "#fff",
        fontWeight: "bold",
        textDecorationLine: "underline",
    },

    input: {
        backgroundColor: "rgba(255,255,255,0.9)",
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
        color: "#000",
    },

    passwordBox: {
        backgroundColor: "rgba(255,255,255,0.9)",
        padding: 12,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    passwordInput: {
        flex: 1,
        color: "#000",
    },

    loginBtn: {
        backgroundColor: "#DA7A23",
        paddingVertical: 12,
        borderRadius: 10,
    },
    loginText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
    },

    // MODALS
    modalWrapper: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        backgroundColor: "#fff",
        padding: 25,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },

    errorTitle: { fontSize: 22, fontWeight: "bold", color: "red" },
    successTitle: { fontSize: 22, fontWeight: "bold", color: "green" },

    errorMsg: { marginTop: 10, fontSize: 16, color: "#333", textAlign: "center" },
    successMsg: { marginTop: 10, fontSize: 16, color: "#333" },

    closeBtn: {
        marginTop: 20,
        backgroundColor: "red",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    closeText: { color: "white", fontWeight: "bold" },
});
