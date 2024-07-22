import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
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
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
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
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  registerText: {
    marginRight: 5,
  },
  registerLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
