import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import baseUrl from "../constants/network";

const AddJournalScreen = ({ navigation }: { navigation: any }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const { token } = useAuth();

  const handleAddJournal = async () => {
    try {
      await axios.post(
        `${baseUrl}/api/journal`,
        {
          title,
          content,
          category,
          date: new Date(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigation.navigate("Home");
    } catch (error) {
      console.error("Failed to add journal:", error);
      alert("There was an error updating your journal");
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
