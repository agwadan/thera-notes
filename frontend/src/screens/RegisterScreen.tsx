import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import colors from "../constants/colors";
import baseUrl from "../constants/network";

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/auth/register`, {
        username,
        password,
      });
      Alert.alert("Registration Successful", "You can now log in.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration error", error);
      /*  setError(error.response?.data?.message || "An error occurred"); */
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logos/logo-colored.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
        placeholderTextColor={colors.purpleLight}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor={colors.purpleLight}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    marginBottom: 40,
    width: 120,
    height: 120,
  },
  button: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    color: colors.white,
  },
  buttonText: {
    color: colors.white,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: colors.primaryColor,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: colors.primaryColor,
    borderWidth: 1,
    borderRadius: 60,
    margin: 12,
    paddingHorizontal: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 12,
  },
  loginText: {
    marginRight: 5,
  },
  loginLink: {
    color: colors.primaryColor,
    textDecorationLine: "none",
  },
});

export default RegisterScreen;
