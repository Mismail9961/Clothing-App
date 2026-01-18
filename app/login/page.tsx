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

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    // Navigate to Home/Shop
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
          
          {/* Brand Header */}
          <View style={styles.headerSection}>
            <View style={styles.brandIcon}>
              <Ionicons name="bag-handle-sharp" size={32} color="#292526" />
            </View>
            <Text style={styles.brandName}>CLOTHING</Text>
            <Text style={styles.subtitle}>Curated fashion for your lifestyle</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>EMAIL</Text>
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
                  placeholder="Enter password"
                  placeholderTextColor="#A0A0A0"
                  style={[styles.input, { flex: 1, borderBottomWidth: 0, marginBottom: 0 }]}
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

            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Forgot your password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>SIGN IN</Text>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR SIGN IN WITH</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.socialGrid}>
              <TouchableOpacity style={styles.socialBox}>
                <Ionicons name="logo-google" size={20} color="#292526" />
                <Text style={styles.socialLabel}>GOOGLE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBox}>
                <Ionicons name="logo-apple" size={20} color="#292526" />
                <Text style={styles.socialLabel}>APPLE</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Create Account Link */}
          <TouchableOpacity 
            onPress={() => router.push("/signup/page")}
            style={styles.footer}
          >
            <Text style={styles.footerText}>
              Don't have an account? <Text style={styles.linkText}>JOIN NOW</Text>
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
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 50,
  },
  brandIcon: {
    marginBottom: 10,
  },
  brandName: {
    fontSize: 24,
    fontWeight: "300", // Light weight for high-fashion look
    color: "#292526",
    letterSpacing: 6, // Spaced out letters like luxury brands
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
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
    marginBottom: 10,
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
  forgotBtn: {
    alignSelf: "flex-end",
    marginTop: -10,
    marginBottom: 40,
  },
  forgotText: {
    color: "#888",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#292526",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0, // Sharp edges often look more high-end in fashion
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 2,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 40,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  orText: {
    fontSize: 10,
    color: "#BBB",
    marginHorizontal: 15,
    letterSpacing: 1,
  },
  socialGrid: {
    flexDirection: "row",
    gap: 15,
  },
  socialBox: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  socialLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#292526",
    letterSpacing: 1,
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