import React from "react";
import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";

export default function HomeView() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});