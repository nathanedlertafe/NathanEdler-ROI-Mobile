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
import { fetchPersonById } from "../utils/api";

export default function PersonViewScreen(props) {
  const { id } = [props.route.params];
  const [person, setPerson] = useState(null);
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);
  const isFocused = useIsFocused();
  theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPersonById(id, setOffline); // offline mode
        setPerson(data);
        console.log("view person", data);
        console.log("id", id);
      } catch (err) {
        console.error(err);
        setOffline(true); // offline mode
        setError("Unable to fetch data, offline mode");
      }
    };

    fetchData();
  }, [isFocused]);
  function showPeopleView(id) {
    props.navigation.navigate("PeopleViewScreen", { id: id });
  }
  if (!person) {
    return (
      <Surface
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Loading profile...</Text>
      </Surface>
    );
  }
  return (
    <Surface elevation={1} style={{ flex: 1, padding: 16 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 34 }}>
        <Text
          variant="headlineLarge"
          style={{
            marginHorizontal: 10,
            marginBottom: 24,
            fontWeight: "bold",
            color: theme.colors.primary,
          }}
        >
          {person.name}
        </Text>

        <Divider style={{ marginVertical: 16 }} />
        <View style={{ padding: 10 }}>
          <View style={{ flex: 1, marginTop: 24 }}>
            {[
              { label: "Phone:", value: person.phone },
              { label: "Street:", value: person.street },
              { label: "City:", value: person.city },
              { label: "State:", value: person.state },
              { label: "Zip:", value: person.zip },
              { label: "Country:", value: person.country },
              { label: "Department:", value: person.Department?.name },
            ].map(({ label, value }, index) => (
              <View
                key={index}
                style={{ marginBottom: 20, paddingHorizontal: 12 }}
              >
                <Text
                  variant="bodyMedium"
                  style={{
                    fontWeight: "bold",
                    marginBottom: 6,
                    color: "#5D5D5D",
                    fontSize: 16,
                  }}
                >
                  {label}
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{
                    color: "#2C3E50",
                    fontSize: 14,
                    lineHeight: 22,
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#BDC3C7",
                  }}
                >
                  {value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={{ padding: 10 }}>
        <Button
          mode="contained"
          icon="keyboard-return"
          onPress={showPeopleView}
          style={{
            width: "100%",
          }}
        >
          Go Back
        </Button>
      </View>
    </Surface>
  );
}
