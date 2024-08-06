import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import axios from "axios";
import colors from "../constants/colors";
import { useAuth } from "../context/AuthContext";

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/auth/login",
        {
          username,
          password,
        }
      );
      const { token } = response.data;
      await login(token);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logos/logo-colored.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={colors.purpleLight}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.purpleLight}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}>Register</Text>
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
    paddingHorizontal: 20,
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
  logo: {
    color: colors.primaryColor,
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
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 12,
  },
  registerText: {
    marginRight: 5,
  },
  registerLink: {
    color: colors.primaryColor,
    textDecorationLine: "none",
  },
});

export default LoginScreen;
