import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  IconButton,
  FAB,
  Snackbar,
  TextInput,
  Dialog,
  Portal,
  Button,
  Text,
  Surface,
  Divider,
  Searchbar,
  useTheme,
} from "react-native-paper";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { fetchPeople, deletePerson } from "../utils/api";

export default function PeopleViewScreen(props) {
  const [offline, setOffline] = useState(false);
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [selectedPersonName, setSelectedPersonName] = useState("");
  const isFocused = useIsFocused();

  const fetchData = async () => {
    try {
      const data = await fetchPeople(setOffline); //offline mode
      setPeople(data);
    } catch (err) {
      console.error(err);
      setOffline(true); //offline mode
      setError("Unable to fetch data, offline mode");
    }
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  function showAddPerson() {
    props.navigation.navigate("PersonEdit", { id: -1 });
  }

  function showEditPerson(id) {
    props.navigation.navigate("PersonEdit", { id: id });
  }

  function ShowViewPerson(id) {
    props.navigation.navigate("PersonView", { id: id });
  }

  function showDialog(id, name) {
    setSelectedPersonId(id);
    setSelectedPersonName(name);
    setVisible(true);
  }
  function hideDialog() {
    setVisible(false);
    setSelectedPersonId(null);
  }

  async function handleDelete() {
    if (selectedPersonId !== null) {
      try {
        const success = await deletePerson(selectedPersonId);
        if (success) {
          fetchData();
          hideDialog();
        } else {
          setError("Failed to delete. Please try again.");
        }
      } catch (err) {
        console.error("Error deleting:", err);
        setError("Failed to delete. Check your connection.");
        hideDialog();
      }
    }
  }

  theme = useTheme();
  return (
    <Surface style={{ flex: 1, padding: 16 }} mode="flat" elevation={1}>
      {/* offline mode */}
      {offline && (
        <View
          style={{
            backgroundColor: theme.colors.error,
            alignItems: "center",
            marginBottom: 10,
            borderRadius: 5,
          }}
        >
          <Text
            variant="bodyLarge"
            style={{ color: theme.colors.onError, paddingVertical: 12 }}
          >
            Offline Mode
          </Text>
        </View>
      )}
      <Text
        variant="headlineLarge"
        style={{
          marginBottom: 24,
          fontWeight: "bold",
          color: theme.colors.primary,
          fontFamily: "Trebuchet MS",
        }}
      >
        Staff Directory
      </Text>
      <ScrollView style={{ flex: 1 }}>
        {people.map((person) => (
          <View
            key={people.id}
            style={{
              flex: 1,
              flexDirection: "row",
              marginHorizontal: 10,
              marginTop: 10,
              backgroundColor: theme.colors.elevation.level2,
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 10,
              }}
            >
              <TouchableOpacity onPress={() => ShowViewPerson(person.id)}>
                <Avatar.Icon size={48} icon="folder-open-outline" />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginLeft: 10, padding: 10 }}>
              <Text variant="titleMedium">{person.name}</Text>
              <Text variant="titleMedium">{person.department}</Text>
              <Text variant="titleMedium">{person.number}</Text>
            </View>
            <View>
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <IconButton
                      icon="pencil"
                      mode="contained"
                      iconColor={theme.colors.onSecondary}
                      size={24}
                      onPress={() => {
                        showEditPerson(person.id);
                      }}
                      disabled={offline}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <IconButton
                      icon="delete"
                      mode="contained"
                      iconColor={theme.colors.onSecondary}
                      size={24}
                      onPress={() => {
                        showDialog(person.id, person.name);
                      }}
                      disabled={offline}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* Add FAB Button */}
      <FAB
        icon="plus"
        onPress={() => showAddPerson()}
        disabled={offline}
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Confirm Deletion</Dialog.Title>
          <Dialog.Content>
            <Text style={{ marginBottom: 10 }}>
              Are you sure you want to delete?
            </Text>
            <Text style={{ fontWeight: "bold" }}>{selectedPersonName}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleDelete}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Surface>
  );
}
