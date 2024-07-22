import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/auth/register",
        {
          username,
          password,
        }
      );
      Alert.alert("Registration Successful", "You can now log in.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration error", error);
      /*  setError(error.response?.data?.message || "An error occurred"); */
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Register" onPress={handleRegister} />
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginText: {
    marginRight: 5,
  },
  loginLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
