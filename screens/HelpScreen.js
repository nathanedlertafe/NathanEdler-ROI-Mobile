import React, { useEffect, useState } from 'react';
import {Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme } from "react-native-paper";
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { Switch } from 'react-native-paper';

export default function HelpScreen(props) {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  theme = useTheme();

  return (
    <Surface elevation={1} style={{ flex: 1, padding: 20 }}>
      <Text
        variant="headlineLarge"
        style={{
          marginBottom: 24,
          fontWeight: "bold",
          color: theme.colors.primary,
          fontFamily: "Trebuchet MS",
        }}
      >
        Help Screen
      </Text>

      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontFamily: "Trebuchet MS",
            fontSize: isSwitchOn ? 16 : 14,
            marginRight: 10,
          }}
        >
          Font Size
        </Text>
        <Switch
          value={isSwitchOn}
          onValueChange={() => setIsSwitchOn(!isSwitchOn)}
        />
      </View>

      <View>
        <Text
          variant="headlineSmall"
          style={{ paddingVertical: 10, fontFamily: "Trebuchet MS" }}
        >
          1. Staff Directory
        </Text>

        <Text
          style={{ fontFamily: "Trebuchet MS", fontSize: isSwitchOn ? 16 : 14 }}
        >
          The Staff Directory feature allows you to brows a list of all
          employees in the organization. You can search for specific staff
          members and view their detailed information, including their roles,
          contact details, and departments.
        </Text>
      </View>
      <View>
        <Text
          variant="headlineSmall"
          style={{ paddingVertical: 10, fontFamily: "Trebuchet MS" }}
        >
          2. Add New Staff
        </Text>
        <Text
          style={{ fontFamily: "Trebuchet MS", fontSize: isSwitchOn ? 16 : 14 }}
        >
          This feature enables you to add a new staff member to the
          directory. To do so, tap on the "+" icon or the "Add Staff" Button,
          fill in the required details such as name, position, department,
          and contact information, and save the entry.
        </Text>
      </View>
      <View>
        <Text
          variant="headlineSmall"
          style={{ paddingVertical: 10, fontFamily: "Trebuchet MS" }}
        >
          3. Update Staff Information
        </Text>
        <Text
          style={{ fontFamily: "Trebuchet MS", fontSize: isSwitchOn ? 16 : 14 }}
        >
          You can update an existing staff member's information by navigating
          to their profile and selecting the "Edit" option. Make the necessary
          changes and ensure to save them to keep the directory current.
        </Text>
      </View>
      <View>
        <Text variant="headlineSmall" style={{ paddingVertical: 10 }}>
          4. Delete Staff Entry
        </Text>
        <Text
          style={{ fontFamily: "Trebuchet MS", fontSize: isSwitchOn ? 16 : 14 }}
        >
          To remove a staff member from the directory, go to their profile, tap
          the "Delete" button, and confirm the action. This will permanently
          remove the staff member from the directory.
        </Text>
      </View>
    </Surface>
  );
}