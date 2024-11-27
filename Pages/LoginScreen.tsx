import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ImageBackground,
} from "react-native";

const LoginScreen: React.FC = () => {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.dataContainer}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/6415/6415824.png",
              }}
              style={styles.logo}
            />
          </View>

          {/* Heading */}
          <Text style={styles.heading}>Welcome back to E-Com!</Text>
          <Text style={styles.subHeading}>Sign in to continue</Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Your Email / Phone Number"
              style={styles.input}
              placeholderTextColor="#A0A0A0"
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              placeholderTextColor="#A0A0A0"
              secureTextEntry
            />
            <View style={styles.optionsContainer}>
              <View style={styles.rememberMe}>
                <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
                <Text style={styles.rememberMeText}>Remember Me</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* OR Separator */}
          <View style={styles.separatorContainer}>
            <View style={styles.separator} />
            <Text style={styles.separatorText}>OR</Text>
            <View style={styles.separator} />
          </View>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/0/747.png",
                }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/733/733547.png",
                }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/281/281764.png",
                }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Register Link */}
          <Text style={styles.registerText}>
            Don't have an account?{" "}
            <Text style={styles.registerLink}>Register</Text>
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  dataContainer: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  logoContainer: {
    marginBottom: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 64,
    height: 64,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#001E6C",
    textAlign: "center",
  },
  subHeading: {
    fontSize: 14,
    color: "#A0A0A0",
    textAlign: "center",
    marginBottom: 32,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: "#000",
    fontSize: 14,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 4,
    marginRight: 8,
  },
  rememberMeText: {
    fontSize: 12,
    color: "#606060",
  },
  forgotPassword: {
    fontSize: 12,
    color: "#001E6C",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#001E6C",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    width: "100%",
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "#D0D0D0",
  },
  separatorText: {
    marginHorizontal: 8,
    color: "#A0A0A0",
    fontSize: 12,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginBottom: 24,
  },
  socialButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  registerText: {
    fontSize: 12,
    color: "#A0A0A0",
  },
  registerLink: {
    color: "#001E6C",
    fontWeight: "bold",
  },
});

export default LoginScreen;
