// src/screens/EditJournalScreen.tsx
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

interface Journal {
  _id: string;
  title: string;
  content: string;
  category: string;
}

const EditJournalScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { journalId } = route.params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchJournal();
  }, []);

  const fetchJournal = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/api/journal/${journalId}`
      );
      const journalData: Journal = response.data;
      setTitle(journalData.title);
      setContent(journalData.content);
      setCategory(journalData.category);
    } catch (error) {
      console.error("Failed to fetch journal:", error);
      // Handle error
    }
  };

  const handleUpdateJournal = async () => {
    try {
      await axios.put(`http://127.0.0.1:3000/api/journals/${journalId}`, {
        title,
        content,
        category,
      });
      // Optionally navigate to list screen or show success message
    } catch (error) {
      console.error("Failed to update journal:", error);
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
      <Button title="Update Journal" onPress={handleUpdateJournal} />
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

export default EditJournalScreen;
