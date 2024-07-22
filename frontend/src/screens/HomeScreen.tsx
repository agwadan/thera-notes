import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { isAuthenticated, logout, token } = useAuth();
  const [journals, setJournals] = useState<any[]>([]);

  const fetchJournals = useCallback(async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/journal", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJournals(response.data);
    } catch (error) {
      console.error("Failed to fetch journals:", error);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated && token) {
        fetchJournals();
      }
    }, [isAuthenticated, token, fetchJournals])
  );

  const handleAddJournal = () => {
    navigation.navigate("AddJournal");
  };

  const handleEditJournal = (journalId: string) => {
    navigation.navigate("EditJournal", {
      journalId,
    });
  };

  const handleDeleteJournal = async (journalId: string) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/journal/${journalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJournals((prevJournals) =>
        prevJournals.filter((journal) => journal.id !== journalId)
      );
    } catch (error) {
      console.error("Failed to delete journal:", error);
      Alert.alert("Error", "Failed to delete journal. Please try again.");
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={journals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEditJournal(item.id)}>
            <View style={styles.journalItem}>
              <Text style={styles.journalTitle}>{item.title}</Text>
              <Text>{item.content}</Text>
              <Button
                title="Delete"
                onPress={() => handleDeleteJournal(item.id)}
                color="red"
              />
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Journal" onPress={handleAddJournal} />
        <Button title="Logout" onPress={logout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  journalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  journalTitle: {
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
});

export default HomeScreen;
