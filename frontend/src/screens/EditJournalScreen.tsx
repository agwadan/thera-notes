import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Keyboard,
} from "react-native";
import axios from "axios";
import baseUrl from "../constants/network";
import { useAuth } from "../context/AuthContext";

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
  const [isEditing, setIsEditing] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    fetchJournal();
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardDidHide
    );
    /* const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardDidShow
    );
 */
    // Cleanup the listeners on component unmount
    return () => {
      keyboardDidHideListener.remove();
      /* keyboardDidShowListener.remove(); */
    };
  }, []);

  const fetchJournal = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/journal/${journalId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const journalData: Journal = response.data;
      setTitle(journalData.title);
      setContent(journalData.content);
      setCategory(journalData.category);
    } catch (error) {
      console.error("Failed to fetch journal:", error);
    }
  };

  const handleUpdateJournal = async () => {
    try {
      await axios.put(
        `${baseUrl}/api/journal/${journalId}`,
        { title, content, category },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Journal updated successfully");
    } catch (error) {
      console.error("Failed to update journal:", error);
    }
  };

  const toggleEditing = () => setIsEditing(!isEditing);

  const handleKeyboardDidHide = () => {
    console.log("====================================");
    console.log(`keyboard: Hidden`);
    console.log("====================================");
    if (isEditing) {
      setIsEditing(false);
      handleUpdateJournal(); // Update journal when editing stops
    }
  };

  /* const handleKeyboardDidShow = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  }; */

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={toggleEditing}>
        {isEditing ? (
          <TextInput
            style={styles.sharedStyle}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            /*    onBlur={handleUpdateJournal} // Trigger update on blur */
          />
        ) : (
          <Text style={styles.sharedStyle}>{title || "Untitled Journal"}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleEditing} style={{ flex: 1 }}>
        {isEditing ? (
          <TextInput
            style={[styles.sharedStyle, styles.contentInput]}
            placeholder="Content"
            multiline
            value={content}
            onChangeText={setContent}
            /*   onBlur={handleUpdateJournal} // Trigger update on blur */
          />
        ) : (
          <ScrollView
            style={[styles.sharedStyle, styles.contentInput]}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <Text>{content || "No content available"}</Text>
          </ScrollView>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleEditing}>
        {isEditing ? (
          <TextInput
            style={styles.sharedStyle}
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
            /* onBlur={handleUpdateJournal} // Trigger update on blur */
          />
        ) : (
          <Text style={styles.sharedStyle}>
            {category || "No category specified"}
          </Text>
        )}
      </TouchableOpacity>

      {isEditing && (
        <Button title="Update Journal" onPress={handleUpdateJournal} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  sharedStyle: {
    fontSize: 16,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  contentInput: {
    height: 500, // Adjusted height to ensure consistency between viewing and editing
    textAlignVertical: "top", // Ensure the text starts at the top
  },
});

export default EditJournalScreen;
