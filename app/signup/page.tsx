import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleSignUp = () => {
    console.log({ name, email, password });
    // After logic, navigate to home
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#292526" />
          </TouchableOpacity>

          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.brandName}>CLOTHING</Text>
            <Text style={styles.title}>CREATE ACCOUNT</Text>
            <Text style={styles.subtitle}>Join our community of fashion enthusiasts</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>FULL NAME</Text>
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor="#A0A0A0"
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#A0A0A0"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>PASSWORD</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  placeholder="Create a password"
                  placeholderTextColor="#A0A0A0"
                  style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
                  <Ionicons 
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#292526" 
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.underline} />
            </View>

            <Text style={styles.termsText}>
              By signing up, you agree to our{" "}
              <Text style={styles.boldTerms}>Terms of Service</Text> and{" "}
              <Text style={styles.boldTerms}>Privacy Policy</Text>.
            </Text>

            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
              <Text style={styles.signUpButtonText}>CREATE ACCOUNT</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Section */}
          <TouchableOpacity 
            onPress={() => router.push("/login/page")}
            style={styles.footer}
          >
            <Text style={styles.footerText}>
              Already a member? <Text style={styles.linkText}>SIGN IN</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    marginBottom: 20,
  },
  headerSection: {
    marginBottom: 40,
  },
  brandName: {
    fontSize: 14,
    fontWeight: "300",
    color: "#292526",
    letterSpacing: 4,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#292526",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#292526",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  input: {
    fontSize: 15,
    color: "#292526",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  underline: {
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  termsText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    lineHeight: 18,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  boldTerms: {
    color: "#292526",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  signUpButton: {
    backgroundColor: "#292526",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    marginTop: 10,
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 2,
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
    paddingTop: 40,
  },
  footerText: {
    fontSize: 12,
    color: "#888",
    letterSpacing: 0.5,
  },
  linkText: {
    color: "#292526",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});