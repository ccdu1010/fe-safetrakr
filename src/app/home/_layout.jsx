// Root Layout
// you can use the Root Layout (app/_layout.js) to add providers which can be accessed by any route in the app.
// https://docs.expo.dev/router/advanced/root-layout/

import { Slot, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { auth } from "../../firebase";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { StyleSheet } from "react-native";

export default function AppLayout() {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            href: "/home",
            tabBarLabel: "Home",
            headerTitle: `Welcome ${
              currentUser ? currentUser.displayName : "!"
            }`,
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesome
                size={28}
                style={{ marginBottom: -3 }}
                name="home"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="contacts"
          options={{
            href: "/home/contacts",
            tabBarLabel: "Contacts",
            headerTitle: "Contacts",
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesome
                size={28}
                style={{ marginBottom: -3 }}
                name="users"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            href: null,
            headerTitle: "Profile",
          }}
        />
        <Tabs.Screen
          name="destinations"
          options={{
            href: "/home/destinations",
            tabBarLabel: "Destinations",
            headerTitle: "Destinations",
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesome
                size={28}
                style={{ marginBottom: -3 }}
                name="location-arrow"
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 55,
  },
  headerTitle: {
    height: 50,
  },
});
