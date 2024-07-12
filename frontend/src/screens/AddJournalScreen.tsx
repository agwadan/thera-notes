// src/screens/AddJournalScreen.tsx
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AddJournalScreen = ({ navigation }: { navigation: any }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const { token } = useAuth();

  const handleAddJournal = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:3000/api/journal",
        {
          title,
          content,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the request headers
          },
        }
      );
      // Optionally navigate to the home screen or show a success message
      navigation.navigate("Home");
    } catch (error) {
      console.error("Failed to add journal:", error);
      // Handle error
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        multiline
        numberOfLines={4}
        value={content}
        onChangeText={setContent}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <Button title="Add Journal" onPress={handleAddJournal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddJournalScreen;
