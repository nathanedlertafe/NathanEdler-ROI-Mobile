import React, { useEffect, useState } from 'react';
import { Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme } from "react-native-paper";
import { View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { fetchPersonById } from '../utils/api';

export default function PersonViewScreen(props) {
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
        <Surface style={{ flex: 1, padding:16 }}>
                    <Text
                      variant="headlineLarge"
                      style={{
                        marginHorizontal: 10,
                        marginBottom: 24,
                        fontWeight: "bold",
                        color: theme.colors.primary,
                      }}
                    >
                      Record
                    </Text>
                    <View style={{ padding: 10 }}>
                            <Button
                              mode="contained"
                              icon="keyboard-return"
                              onPress={goBackFunction}
                              style={{
                                width: "100%",
                              }}
                            >
                              Go Back
                            </Button>
                          </View>
        </Surface>
    )
    
}