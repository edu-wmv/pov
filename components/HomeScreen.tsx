import React from "react";
import { ProView, Text } from "./Themed";
import { StyleSheet, View } from "react-native";
import Logo from "@/assets/svg/title.svg";

export default function HomeView() {
  return (
    <ProView style={styles.container}>
      <Logo style={styles.logo} width={90*.9} height={35*.9}/>
      
    </ProView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    marginTop: 25
  },
});