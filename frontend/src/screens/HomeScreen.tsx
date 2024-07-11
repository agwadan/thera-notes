import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { isAuthenticated, logout, token } = useAuth();
  const [journals, setJournals] = useState<any[]>([]);

  useEffect(() => {
    const fetchJournals = async () => {
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
    };

    if (isAuthenticated && token) {
      fetchJournals();
    }
  }, [isAuthenticated, token]);

  const handleAddJournal = () => {
    navigation.navigate("AddJournal");
  };

  const handleEditJournal = (journalId: string) => {
    navigation.navigate("EditJournal", { journalId });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Button title="Add Journal" onPress={handleAddJournal} />
      <Button title="Logout" onPress={logout} />
      <FlatList
        data={journals}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEditJournal(item._id)}>
            <View style={styles.journalItem}>
              <Text style={styles.journalTitle}>{item.title}</Text>
              <Text>{item.content}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
  },
  journalTitle: {
    fontWeight: "bold",
  },
});

export default HomeScreen;
