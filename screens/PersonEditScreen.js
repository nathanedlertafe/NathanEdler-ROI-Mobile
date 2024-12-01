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
import {
  fetchPersonById,
  addPerson,
  updatePerson,
  fetchDepartments,
} from "../utils/api";

export default function PersonEditScreen(props) {
  const { id } = props.route.params;

  theme = useTheme();

  const [person, setPerson] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    departmentId: 1,
  });
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDepartments = await fetchDepartments(setOffline); // offline mode
        setDepartments(fetchedDepartments);
        setSelectedDepartment(fetchedDepartments[0].id);

        if (id !== -1) {
          const data = await fetchPersonById(id, setOffline); // offline mode
          setPerson(data);
          setSelectedDepartment(data.departmentId); // Set initial category
          console.log("edit person", data);
          console.log(data.departmentId);
        } else {
          console.log("new person", person);
        }
      } catch (err) {
        console.error(err);
        setOffline(true); // offline mode
        setError("Unable to fetch data, offline mode");
      }
    };

    fetchData();
  }, []);

  function showPeopleView() {
    props.navigation.navigate("PeopleView");
  }

  async function handleSubmit() {
    try {
      const updatedPerson = { ...person, departmentId: selectedDepartment };
      if (id === -1) {
        await addPerson(updatedPerson);
      } else {
        await updatePerson(id, updatedPerson);
      }
      props.navigation.goBack();
    } catch (err) {
      console.error(err);
      setError("Failed to save data.");
    }
  }

  if (!departments || departments.length === 0) {
    return <Text>No departments available.</Text>; // Or handle accordingly
  }

  return (
    <Surface style={{ flex: 1, padding: 16 }}>
      <Text
        variant="headlineLarge"
        style={{
          marginHorizontal: 10,
          marginBottom: 24,
          fontWeight: "bold",
          color: theme.colors.primary,
        }}
      >
        {id === -1 ? "New Person" : person.name}
      </Text>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 34 }}
      >
        <TextInput
          label="Name"
          value={person.name}
          onChangeText={(text) => setPerson({ ...person, name: text })}
          mode="outlined"
          keyboardType="numeric"
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="Phone"
          value={person.phone}
          onChangeText={(text) => setPerson({ ...person, phone: text })}
          mode="outlined"
          keyboardType="numeric"
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="Street"
          value={person.street}
          onChangeText={(text) => setPerson({ ...person, street: text })}
          mode="outlined"
          keyboardType="numeric"
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="City"
          value={person.city}
          onChangeText={(text) => setPerson({ ...person, city: text })}
          mode="outlined"
          keyboardType="numeric"
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="Zip"
          value={person.zip}
          onChangeText={(text) => setPerson({ ...person, zip: text })}
          mode="outlined"
          keyboardType="numeric"
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="Country"
          value={person.country}
          onChangeText={(text) => setPerson({ ...person, country: text })}
          mode="outlined"
          keyboardType="numeric"
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="State"
          value={person.state}
          onChangeText={(text) => setPerson({ ...person, state: text })}
          mode="outlined"
          keyboardType="numeric"
          style={{ marginBottom: 16 }}
        />
        <Dropdown
          label="Department"
          mode="outlined"
          value={selectedDepartment}
          onSelect={setSelectedDepartment}
          options={departments.map((dep) => ({
            label: dep.name,
            value: dep.id,
          }))}
        />
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <Button mode="outlined" icon="cancel" onPress={showPeopleView}>
            Cancel
          </Button>
        </View>
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <Button mode="contained" icon="content-save" onPress={handleSubmit}>
            Ok
          </Button>
        </View>
      </View>
    </Surface>
  );
}