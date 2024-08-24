import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import colors from "../constants/colors";
import baseUrl from "../constants/network";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { isAuthenticated, logout, token } = useAuth();
  const [journals, setJournals] = useState<any[]>([]);

  const fetchJournals = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/journal`, {
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
              <Text style={styles.journalBody}>{item.content}</Text>
              <View style={styles.rowThree}>
                <View style={styles.sourceLine}></View>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => handleEditJournal(item.id)}>
                    <Image
                      source={require("../../assets/icons/icon-edit-white.png")}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteJournal(item.id)}
                  >
                    <Image
                      source={require("../../assets/icons/icon-delete-white.png")}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.footerNavigation}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Image
            source={require("../../assets/icons/icon-home-purple.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAddJournal}>
          <Image
            source={require("../../assets/icons/icon-add-note-purple.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log(`Profile`)}>
          <Image
            source={require("../../assets/icons/icon-user-purple.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={logout}>
          <Image
            source={require("../../assets/icons/icon-logout-purple.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyLight,
    padding: 24,
  },
  journalItem: {
    padding: 16,
    backgroundColor: colors.purpleLight,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    borderRadius: 12,
  },
  journalTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  journalBody: {
    color: colors.white,
    fontStyle: "italic",
    marginTop: 16,
  },
  rowThree: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  sourceLine: {
    height: 2,
    width: "75%",
    backgroundColor: colors.greyLight,
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  footerNavigation: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
    paddingVertical: 10,
    bottom: 0,
    left: 0,
    right: 0,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default HomeScreen;
